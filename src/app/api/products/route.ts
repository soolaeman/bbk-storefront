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

function copyPaginationHeaders(response: Response, headers: Headers): void {
  const total = response.headers.get('X-WP-Total');
  const totalPages = response.headers.get('X-WP-TotalPages');
  if (total) headers.set('X-WP-Total', total);
  if (totalPages) headers.set('X-WP-TotalPages', totalPages);
}

function normalizeText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function appendIfPresent(source: URLSearchParams, target: URLSearchParams, key: string): void {
  const value = source.get(key);
  if (value !== null && value.trim() !== '') target.set(key, value);
}

async function resolveWooCommerceCategoryId(categoryName: string, authorization: string): Promise<number | null> {
  const trimmedName = categoryName.trim();
  if (!trimmedName || normalizeText(trimmedName) === 'semua') return null;
  if (/^\d+$/.test(trimmedName)) return Number(trimmedName);

  const params = new URLSearchParams({ search: trimmedName, per_page: '100' });
  const response = await fetch(`${WOOCOMMERCE_API_URL}/products/categories?${params.toString()}`, {
    headers: { Accept: 'application/json', Authorization: authorization },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`WooCommerce category lookup gagal: ${response.status} ${response.statusText}`);
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
    'search', 'orderby', 'order', 'stock_status', 'sku', 'featured',
    'min_price', 'max_price', 'tag', 'attribute', 'attribute_term',
  ]) {
    appendIfPresent(incomingParams, params, key);
  }

  const category = incomingParams.get('category');
  if (category && normalizeText(category) !== 'semua') {
    const categoryId = await resolveWooCommerceCategoryId(category, authorization);

    // An unknown category must produce zero results, never a fallback to all products.
    params.set('category', String(categoryId ?? -1));
  }

  return params;
}

async function fetchWooCommercePage(params: URLSearchParams, authorization: string): Promise<{
  response: Response;
  body: string;
  totalPages: number;
}> {
  const response = await fetch(`${WOOCOMMERCE_API_URL}/products?${params.toString()}`, {
    headers: { Accept: 'application/json', Authorization: authorization },
    cache: 'no-store',
  });

  const body = await response.text();
  const totalPages = Number(response.headers.get('X-WP-TotalPages') || '1');

  return {
    response,
    body,
    totalPages: Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1,
  };
}

function matchesMeta(
  metaData: Array<{ key: string; value: string | number | boolean | null }> | undefined,
  keys: string[],
  expected: string,
): boolean {
  const normalizedKeys = keys.map(normalizeText);
  const normalizedExpected = normalizeText(expected);

  return (metaData || [])
    .filter((entry) => normalizedKeys.includes(normalizeText(entry.key)))
    .map((entry) => String(entry.value ?? '').trim())
    .filter(Boolean)
    .some((value) => normalizeText(value) === normalizedExpected);
}

function matchesCustomFilters(
  product: { meta_data?: Array<{ key: string; value: string | number | boolean | null }> },
  filter: { condition?: string; location?: string; powerType?: string },
): boolean {
  return (
    (!filter.condition || matchesMeta(product.meta_data, ['kondisi_unit', 'kondisi', 'condition'], filter.condition)) &&
    (!filter.location || matchesMeta(product.meta_data, ['lokasi_unit', 'lokasi', 'location'], filter.location)) &&
    (!filter.powerType || matchesMeta(product.meta_data, ['power_type', 'jenis_daya', 'sumber_daya', 'tipe_daya'], filter.powerType))
  );
}

async function proxyWooCommerceProducts(request: NextRequest, authorization: string): Promise<NextResponse> {
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
  filter: { condition?: string; location?: string; powerType?: string },
): Promise<NextResponse> {
  const params = await buildWooCommerceParams(request, authorization, true);
  const firstPage = await fetchWooCommercePage(params, authorization);

  if (!firstPage.response.ok) {
    const headers = new Headers({
      'Content-Type': firstPage.response.headers.get('content-type') || 'application/json',
      'Cache-Control': 'no-store',
    });
    copyPaginationHeaders(firstPage.response, headers);
    return new NextResponse(firstPage.body, { status: firstPage.response.status, headers });
  }

  let products = JSON.parse(firstPage.body) as Array<{
    meta_data?: Array<{ key: string; value: string | number | boolean | null }>;
  }>;

  for (let page = 2; page <= firstPage.totalPages; page += 1) {
    params.set('page', String(page));
    const nextPage = await fetchWooCommercePage(params, authorization);
    if (!nextPage.response.ok) {
      return NextResponse.json(
        { error: 'Gagal mengambil seluruh katalog WooCommerce untuk filter metadata.' },
        { status: 502 },
      );
    }
    products = products.concat(JSON.parse(nextPage.body));
  }

  const filtered = products.filter((product) => matchesCustomFilters(product, filter));
  const requestedPage = Math.max(1, Number(request.nextUrl.searchParams.get('page') || '1'));
  const perPage = Math.min(100, Math.max(1, Number(request.nextUrl.searchParams.get('per_page') || '8')));
  const start = (requestedPage - 1) * perPage;
  const pagedProducts = filtered.slice(start, start + perPage);
  const totalPages = filtered.length ? Math.ceil(filtered.length / perPage) : 0;

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    'X-WP-Total': String(filtered.length),
    'X-WP-TotalPages': String(totalPages),
  });

  return new NextResponse(JSON.stringify(pagedProducts), { status: 200, headers });
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
  const condition = incomingParams.get('condition') || undefined;
  const location = incomingParams.get('location') || undefined;
  const powerType = incomingParams.get('power_type') || undefined;

  try {
    if (condition || location || powerType) {
      return await proxyWithCustomMetaFilters(request, authorization, {
        condition,
        location,
        powerType,
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
