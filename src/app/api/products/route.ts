import { NextRequest, NextResponse } from 'next/server';

const WOOCOMMERCE_API_URL =
  process.env.WOOCOMMERCE_API_URL ||
  'https://www.bukanbarukitchen.com/wp-json/wc/v3';

function getWooCommerceAuthHeader(): string | null {
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) return null;

  return `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`;
}

function normalizeText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function appendIfPresent(source: URLSearchParams, target: URLSearchParams, key: string): void {
  const value = source.get(key);
  if (value !== null && value.trim() !== '') target.set(key, value);
}

async function resolveWooCommerceCategoryId(
  categoryName: string,
  authorization: string,
): Promise<number | null> {
  const trimmedName = categoryName.trim();

  if (!trimmedName || normalizeText(trimmedName) === 'semua') return null;
  if (/^\d+$/.test(trimmedName)) return Number(trimmedName);

  const params = new URLSearchParams({
    search: trimmedName,
    per_page: '100',
  });

  const response = await fetch(
    `${WOOCOMMERCE_API_URL}/products/categories?${params.toString()}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: authorization,
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error(
      `WooCommerce category lookup gagal: ${response.status} ${response.statusText}`,
    );
  }

  const categories = (await response.json()) as Array<{
    id: number;
    name: string;
  }>;

  const exactMatch = categories.find(
    (item) => normalizeText(item.name) === normalizeText(trimmedName),
  );

  return exactMatch?.id ?? null;
}

async function buildWooCommerceParams(
  request: NextRequest,
  authorization: string,
): Promise<URLSearchParams> {
  const incomingParams = request.nextUrl.searchParams;
  const params = new URLSearchParams();

  params.set('status', incomingParams.get('status') || 'publish');
  params.set('per_page', incomingParams.get('per_page') || '8');
  params.set('page', incomingParams.get('page') || '1');

  for (const key of [
    'search',
    'orderby',
    'order',
    'stock_status',
    'sku',
    'featured',
    'min_price',
    'max_price',
    'tag',
    'attribute',
    'attribute_term',
  ]) {
    appendIfPresent(incomingParams, params, key);
  }

  const category = incomingParams.get('category');

  if (category && normalizeText(category) !== 'semua') {
    const categoryId = await resolveWooCommerceCategoryId(category, authorization);

    // Never silently turn an unknown category into the complete catalog.
    params.set('category', String(categoryId ?? -1));
  }

  const statusFilter = incomingParams.get('status_unit');

  // WooCommerce's native stock_status filter is reliable and keeps the default
  // READY catalog fast. The card still reads the live status_unit meta value.
  if (statusFilter === 'READY') {
    params.set('stock_status', 'instock');
  } else if (statusFilter === 'SOLD') {
    params.set('stock_status', 'outofstock');
  }

  return params;
}

export async function GET(request: NextRequest) {
  const authorization = getWooCommerceAuthHeader();

  if (!authorization) {
    return NextResponse.json(
      { error: 'WooCommerce credentials belum dikonfigurasi di environment server.' },
      { status: 500 },
    );
  }

  try {
    const incomingParams = request.nextUrl.searchParams;
    const params = await buildWooCommerceParams(request, authorization);

    const hasUnsupportedMetaFilters = Boolean(
      incomingParams.get('condition') || incomingParams.get('location'),
    );

    const response = await fetch(
      `${WOOCOMMERCE_API_URL}/products?${params.toString()}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: authorization,
        },
        cache: 'no-store',
      },
    );

    const body = await response.text();
    const headers = new Headers({
      'Content-Type': response.headers.get('content-type') || 'application/json',
      'Cache-Control': 'no-store',
    });

    const total = response.headers.get('X-WP-Total');
    const totalPages = response.headers.get('X-WP-TotalPages');

    if (total) headers.set('X-WP-Total', total);
    if (totalPages) headers.set('X-WP-TotalPages', totalPages);

    // Important: do not fetch all 2,500+ products just to emulate an ACF meta query.
    // The current WooCommerce REST product endpoint does not expose a verified
    // multi-meta query contract for these ACF fields. For this optimization step,
    // condition/location are therefore passed through as a safe fallback signal
    // instead of triggering a server-side pagination loop.
    if (hasUnsupportedMetaFilters) {
      headers.set('X-BBK-Meta-Filter-Fallback', 'true');
      headers.set(
        'X-BBK-Meta-Filter-Reason',
        'condition/location require a dedicated WordPress metadata endpoint',
      );
    }

    return new NextResponse(body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error('WooCommerce proxy request failed:', error);

    return NextResponse.json(
      { error: 'Gagal menghubungi WooCommerce API.' },
      { status: 502 },
    );
  }
}
