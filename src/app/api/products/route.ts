import { NextRequest, NextResponse } from 'next/server';

const WOOCOMMERCE_API_URL =
  process.env.WOOCOMMERCE_API_URL ||
  'https://www.bukanbarukitchen.com/wp-json/wc/v3';

const META_KEYS = {
  status: ['status_unit'],
  condition: ['kondisi_unit'],
  location: ['lokasi_unit'],
};

type MetaValue = string | number | boolean | null;
type ProductMeta = { key: string; value: MetaValue };

type WooProduct = {
  id: number;
  meta_data?: ProductMeta[];
};

function getWooCommerceAuthHeader(): string | null {
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) return null;

  return `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`;
}

function normalizeText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function copyPaginationHeaders(response: Response, headers: Headers): void {
  const total = response.headers.get('X-WP-Total');
  const totalPages = response.headers.get('X-WP-TotalPages');

  if (total) headers.set('X-WP-Total', total);
  if (totalPages) headers.set('X-WP-TotalPages', totalPages);
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

  const params = new URLSearchParams({ search: trimmedName, per_page: '100' });
  const response = await fetch(
    `${WOOCOMMERCE_API_URL}/products/categories?${params.toString()}`,
    {
      headers: { Accept: 'application/json', Authorization: authorization },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error(
      `WooCommerce category lookup gagal: ${response.status} ${response.statusText}`,
    );
  }

  const categories = (await response.json()) as Array<{ id: number; name: string }>;
  const exactMatch = categories.find(
    (item) => normalizeText(item.name) === normalizeText(trimmedName),
  );

  return exactMatch?.id ?? null;
}

async function buildWooCommerceParams(
  request: NextRequest,
  authorization: string,
  forceAllPages = false,
): Promise<URLSearchParams> {
  const incomingParams = request.nextUrl.searchParams;
  const params = new URLSearchParams();

  params.set('status', incomingParams.get('status') || 'publish');
  params.set('per_page', forceAllPages ? '100' : incomingParams.get('per_page') || '8');
  params.set('page', forceAllPages ? '1' : incomingParams.get('page') || '1');

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

    // Never silently fall back to the complete catalog for an unknown category.
    params.set('category', String(categoryId ?? -1));
  }

  return params;
}

async function fetchWooCommercePage(
  params: URLSearchParams,
  authorization: string,
): Promise<{
  response: Response;
  body: string;
  totalPages: number;
}> {
  const response = await fetch(`${WOOCOMMERCE_API_URL}/products?${params.toString()}`, {
    headers: { Accept: 'application/json', Authorization: authorization },
    cache: 'no-store',
  });

  const body = await response.text();
  const rawTotalPages = Number(response.headers.get('X-WP-TotalPages') || '1');
  const totalPages = Number.isFinite(rawTotalPages) && rawTotalPages > 0 ? rawTotalPages : 1;

  return { response, body, totalPages };
}

function getMetaValue(product: WooProduct, keys: string[]): string {
  const wantedKeys = keys.map(normalizeText);
  const entry = product.meta_data?.find((item) => wantedKeys.includes(normalizeText(item.key)));

  if (entry?.value === null || entry?.value === undefined) return '';
  return String(entry.value).trim();
}

function matchesOneOf(value: string, expected: string): boolean {
  const normalizedExpected = normalizeText(expected);

  if (!normalizedExpected) return true;

  const expectedValues = normalizedExpected
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return expectedValues.includes(normalizeText(value));
}

function matchesCustomFilters(
  product: WooProduct,
  filters: {
    status?: string;
    condition?: string;
    location?: string;
  },
): boolean {
  const status = getMetaValue(product, META_KEYS.status);
  const condition = getMetaValue(product, META_KEYS.condition);
  const location = getMetaValue(product, META_KEYS.location);

  return (
    (!filters.status || matchesOneOf(status, filters.status)) &&
    (!filters.condition || matchesOneOf(condition, filters.condition)) &&
    (!filters.location || matchesOneOf(location, filters.location))
  );
}

async function proxyWooCommerceProducts(
  request: NextRequest,
  authorization: string,
): Promise<NextResponse> {
  const params = await buildWooCommerceParams(request, authorization);
  const { response, body } = await fetchWooCommercePage(params, authorization);

  const headers = new Headers({
    'Content-Type': response.headers.get('content-type') || 'application/json',
    'Cache-Control': 'no-store',
  });

  copyPaginationHeaders(response, headers);

  return new NextResponse(body, { status: response.status, headers });
}

async function proxyWithCustomMetaFilters(
  request: NextRequest,
  authorization: string,
  filters: {
    status?: string;
    condition?: string;
    location?: string;
  },
): Promise<NextResponse> {
  const params = await buildWooCommerceParams(request, authorization, true);
  const firstPage = await fetchWooCommercePage(params, authorization);

  if (!firstPage.response.ok) {
    const headers = new Headers({
      'Content-Type': firstPage.response.headers.get('content-type') || 'application/json',
      'Cache-Control': 'no-store',
    });

    copyPaginationHeaders(firstPage.response, headers);

    return new NextResponse(firstPage.body, {
      status: firstPage.response.status,
      headers,
    });
  }

  let products = JSON.parse(firstPage.body) as WooProduct[];

  for (let page = 2; page <= firstPage.totalPages; page += 1) {
    params.set('page', String(page));

    const nextPage = await fetchWooCommercePage(params, authorization);

    if (!nextPage.response.ok) {
      return NextResponse.json(
        { error: 'Gagal mengambil seluruh katalog WooCommerce untuk filter metadata.' },
        { status: 502 },
      );
    }

    products = products.concat(JSON.parse(nextPage.body) as WooProduct[]);
  }

  const filtered = products.filter((product) => matchesCustomFilters(product, filters));
  const requestedPage = Math.max(1, Number(request.nextUrl.searchParams.get('page') || '1'));
  const requestedPerPage = Number(request.nextUrl.searchParams.get('per_page') || '8');
  const perPage = Math.min(100, Math.max(1, Number.isFinite(requestedPerPage) ? requestedPerPage : 8));
  const start = (requestedPage - 1) * perPage;
  const pagedProducts = filtered.slice(start, start + perPage);
  const totalPages = filtered.length > 0 ? Math.ceil(filtered.length / perPage) : 0;

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    'X-WP-Total': String(filtered.length),
    'X-WP-TotalPages': String(totalPages),
  });

  return new NextResponse(JSON.stringify(pagedProducts), {
    status: 200,
    headers,
  });
}

export async function GET(request: NextRequest) {
  const authorization = getWooCommerceAuthHeader();

  if (!authorization) {
    return NextResponse.json(
      { error: 'WooCommerce credentials belum dikonfigurasi di environment server.' },
      { status: 500 },
    );
  }

  const incomingParams = request.nextUrl.searchParams;

  // These filters are sourced from the live ACF/meta fields verified on WordPress:
  // status_unit, kondisi_unit, and lokasi_unit.
  const status = incomingParams.get('status_unit') || undefined;
  const condition = incomingParams.get('condition') || undefined;
  const location = incomingParams.get('location') || undefined;

  try {
    if (status || condition || location) {
      return await proxyWithCustomMetaFilters(request, authorization, {
        status,
        condition,
        location,
      });
    }

    return await proxyWooCommerceProducts(request, authorization);
  } catch (error) {
    console.error('WooCommerce proxy request failed:', error);

    return NextResponse.json(
      { error: 'Gagal menghubungi WooCommerce API.' },
      { status: 502 },
    );
  }
}
