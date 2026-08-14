import { NextRequest, NextResponse } from 'next/server';

const WOOCOMMERCE_API_URL =
  process.env.WOOCOMMERCE_API_URL ||
  'https://www.bukanbarukitchen.com/wp-json/wc/v3';

function getWooCommerceAuthHeader(): string | null {
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    return null;
  }

  return `Basic ${Buffer.from(
    `${consumerKey}:${consumerSecret}`,
  ).toString('base64')}`;
}

function copyPaginationHeaders(
  response: Response,
  headers: Headers,
): void {
  const total = response.headers.get('X-WP-Total');
  const totalPages = response.headers.get('X-WP-TotalPages');

  if (total) headers.set('X-WP-Total', total);
  if (totalPages) headers.set('X-WP-TotalPages', totalPages);
}

function normalizeText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function appendIfPresent(
  source: URLSearchParams,
  target: URLSearchParams,
  key: string,
): void {
  const value = source.get(key);
  if (value !== null && value.trim() !== '') {
    target.set(key, value);
  }
}

async function resolveWooCommerceCategoryId(
  categoryName: string,
  authorization: string,
): Promise<number | null> {
  const trimmedName = categoryName.trim();

  if (!trimmedName || normalizeText(trimmedName) === 'semua') {
    return null;
  }

  if (/^\d+$/.test(trimmedName)) {
    return Number(trimmedName);
  }

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
    (item) =>
      normalizeText(item.name) === normalizeText(trimmedName),
  );

  return exactMatch?.id ?? null;
}

async function proxyWooCommerceProducts(
  request: NextRequest,
  authorization: string,
): Promise<NextResponse> {
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
    const categoryId = await resolveWooCommerceCategoryId(
      category,
      authorization,
    );

    if (categoryId === null) {
      const headers = new Headers({
        'Content-Type': 'application/json',
        'X-WP-Total': '0',
        'X-WP-TotalPages': '0',
        'Cache-Control': 'no-store',
      });

      return new NextResponse('[]', {
        status: 200,
        headers,
      });
    }

    params.set('category', String(categoryId));
  }

  const url = `${WOOCOMMERCE_API_URL}/products?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: authorization,
    },
    cache: 'no-store',
  });

  const body = await response.text();
  const headers = new Headers({
    'Content-Type': response.headers.get('content-type') || 'application/json',
    'Cache-Control': 'no-store',
  });

  copyPaginationHeaders(response, headers);

  return new NextResponse(body, {
    status: response.status,
    headers,
  });
}

function matchesMeta(
  metaData: Array<{ key: string; value: string | number | boolean | null }> | undefined,
  keys: string[],
  expected: string,
): boolean {
  const normalizedKeys = keys.map(normalizeText);
  const normalizedExpected = normalizeText(expected);

  const values = (metaData || [])
    .filter((entry) => normalizedKeys.includes(normalizeText(entry.key)))
    .map((entry) => String(entry.value ?? '').trim())
    .filter(Boolean);

  return values.some((value) => normalizeText(value) === normalizedExpected);
}

function filterMetaResponse(
  body: string,
  filter: { condition?: string; location?: string; powerType?: string },
): { body: string; total: number; totalPages: number } {
  const products = JSON.parse(body) as Array<{
    meta_data?: Array<{ key: string; value: string | number | boolean | null }>;
  }>;

  const filtered = products.filter((product) => {
    const conditionMatch =
      !filter.condition ||
      matchesMeta(
        product.meta_data,
        ['kondisi_unit', 'kondisi', 'condition'],
        filter.condition,
      );

    const locationMatch =
      !filter.location ||
      matchesMeta(
        product.meta_data,
        ['lokasi_unit', 'lokasi', 'location'],
        filter.location,
      );

    const powerMatch =
      !filter.powerType ||
      matchesMeta(
        product.meta_data,
        ['power_type', 'jenis_daya', 'sumber_daya', 'tipe_daya'],
        filter.powerType,
      );

    return conditionMatch && locationMatch && powerMatch;
  });

  return {
    body: JSON.stringify(filtered),
    total: filtered.length,
    totalPages: filtered.length ? 1 : 0,
  };
}

export async function GET(request: NextRequest) {
  const authorization = getWooCommerceAuthHeader();

  if (!authorization) {
    return NextResponse.json(
      {
        error:
          'WooCommerce credentials belum dikonfigurasi di environment server.',
      },
      { status: 500 },
    );
  }

  const incomingParams = request.nextUrl.searchParams;
  const condition = incomingParams.get('condition') || undefined;
  const location = incomingParams.get('location') || undefined;
  const powerType = incomingParams.get('power_type') || undefined;

  try {
    const hasCustomMetaFilter = Boolean(condition || location || powerType);

    if (!hasCustomMetaFilter) {
      return await proxyWooCommerceProducts(request, authorization);
    }

    const cleanParams = new URL(request.url);
    cleanParams.searchParams.delete('condition');
    cleanParams.searchParams.delete('location');
    cleanParams.searchParams.delete('power_type');

    const upstreamRequest = new NextRequest(cleanParams.toString(), {
      headers: request.headers,
    });

    const upstreamResponse = await proxyWooCommerceProducts(
      upstreamRequest,
      authorization,
    );

    const upstreamBody = await upstreamResponse.text();
    const filtered = filterMetaResponse(upstreamBody, {
      condition,
      location,
      powerType,
    });

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-WP-Total': String(filtered.total),
      'X-WP-TotalPages': String(filtered.totalPages),
    });

    return new NextResponse(filtered.body, {
      status: upstreamResponse.status,
      headers,
    });
  } catch (error) {
    console.error('WooCommerce proxy request failed:', error);

    return NextResponse.json(
      {
        error: 'Gagal menghubungi WooCommerce API.',
      },
      { status: 502 },
    );
  }
}
