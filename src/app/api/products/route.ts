import { NextRequest, NextResponse } from 'next/server';

const WOOCOMMERCE_API_URL = (
  process.env.WOOCOMMERCE_API_URL ||
  'https://www.bukanbarukitchen.com/wp-json/wc/v3'
).replace(/\/$/, '');

const METADATA_PER_PAGE = 100;
const PRODUCT_META_FILTER_PAGE_SIZE = 100;
const PRODUCT_CACHE_REVALIDATE_SECONDS = 60;

const ACF_STATUS_OPTIONS = ['READY', 'DP', 'SOLD'] as const;
const ACF_CONDITION_OPTIONS = ['BARU', 'BEKAS'] as const;
const ACF_LOCATION_OPTIONS = ['PAMULANG 2', 'KEDAUNG', 'SAWANGAN', 'SETU', 'PAMULANG BARAT'] as const;
const TOP_LEVEL_CATEGORY_ORDER = ['Meja Stainless', 'Sink Stainless', 'Rak Stainless', 'Hood Stainless', 'Kompor', 'Chiller', 'Ice System', 'Freezer', 'Showcase', 'Peralatan Dapur Bekas Lainnya'] as const;

function getWooCommerceAuthHeader(): string | null {
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;
  if (!consumerKey || !consumerSecret) return null;
  return `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`;
}

function normalizeText(value: string): string { return value.trim().toLowerCase().replace(/\s+/g, ' '); }
function normalizeUnitCode(value: string): string { return value.toUpperCase().replace(/[^A-Z0-9]/g, ''); }
function isUnitCodeQuery(value: string): boolean { const normalized = normalizeUnitCode(value); return normalized.length >= 4 && /^BBK\d+$/.test(normalized); }
function appendIfPresent(source: URLSearchParams, target: URLSearchParams, key: string): void { const value = source.get(key); if (value !== null && value.trim() !== '') target.set(key, value); }
function getProductMetaValue(product: { meta_data?: Array<{ key: string; value: string | number | boolean | null }> }, keys: string[]): string { const normalizedKeys = keys.map(normalizeText); const entry = product.meta_data?.find((item) => normalizedKeys.includes(normalizeText(item.key))); if (entry?.value === null || entry?.value === undefined) return ''; return String(entry.value).trim(); }
function matchesMetaFilter(product: { meta_data?: Array<{ key: string; value: string | number | boolean | null }> }, key: string, expected: string | null): boolean { if (!expected || normalizeText(expected) === 'semua' || normalizeText(expected).startsWith('semua ')) return true; return normalizeText(getProductMetaValue(product, [key])) === normalizeText(expected); }
function matchesUnitCodeQuery(product: { meta_data?: Array<{ key: string; value: string | number | boolean | null }> }, query: string): boolean { return Boolean(getProductMetaValue(product, ['kode_unit'])) && normalizeUnitCode(getProductMetaValue(product, ['kode_unit'])) === normalizeUnitCode(query); }

async function resolveWooCommerceCategoryId(categoryName: string, authorization: string): Promise<number | null> {
  const trimmedName = categoryName.trim();
  if (!trimmedName || normalizeText(trimmedName) === 'semua') return null;
  if (/^\d+$/.test(trimmedName)) return Number(trimmedName);
  const params = new URLSearchParams({ search: trimmedName, per_page: '100' });
  const response = await fetch(`${WOOCOMMERCE_API_URL}/products/categories?${params.toString()}`, { headers: { Accept: 'application/json', Authorization: authorization }, next: { revalidate: PRODUCT_CACHE_REVALIDATE_SECONDS } });
  if (!response.ok) throw new Error(`WooCommerce category lookup gagal: ${response.status} ${response.statusText}`);
  const categories = (await response.json()) as Array<{ id: number; name: string }>;
  return categories.find((item) => normalizeText(item.name) === normalizeText(trimmedName))?.id ?? null;
}

async function buildWooCommerceParams(request: NextRequest, authorization: string): Promise<URLSearchParams> {
  const incomingParams = request.nextUrl.searchParams;
  const params = new URLSearchParams();
  params.set('status', incomingParams.get('status') || 'publish');
  params.set('per_page', incomingParams.get('per_page') || '8');
  params.set('page', incomingParams.get('page') || '1');
  for (const key of ['search', 'orderby', 'order', 'stock_status', 'sku', 'featured', 'min_price', 'max_price', 'tag', 'attribute', 'attribute_term']) appendIfPresent(incomingParams, params, key);
  const category = incomingParams.get('category');
  if (category && normalizeText(category) !== 'semua') params.set('category', String((await resolveWooCommerceCategoryId(category, authorization)) ?? -1));
  const statusFilter = incomingParams.get('status_unit');
  if (statusFilter === 'READY') params.set('stock_status', 'instock');
  else if (statusFilter === 'SOLD') params.set('stock_status', 'outofstock');
  return params;
}

interface WooCommerceMetadataCategory { id: number; name: string; slug: string; parent: number; count?: number; }

async function fetchWooCommerceCategories(authorization: string): Promise<WooCommerceMetadataCategory[]> {
  const categoriesResponse = await fetch(`${WOOCOMMERCE_API_URL}/products/categories?per_page=${METADATA_PER_PAGE}&hide_empty=false&orderby=name&order=asc`, { headers: { Accept: 'application/json', Authorization: authorization }, next: { revalidate: 300 } });
  if (!categoriesResponse.ok) throw new Error(`WooCommerce metadata category lookup gagal: ${categoriesResponse.status} ${categoriesResponse.statusText}`);
  const categories = (await categoriesResponse.json()) as WooCommerceMetadataCategory[];
  const totalPages = Number(categoriesResponse.headers.get('X-WP-TotalPages') || '1');
  for (let page = 2; page <= totalPages; page += 1) {
    const response = await fetch(`${WOOCOMMERCE_API_URL}/products/categories?per_page=${METADATA_PER_PAGE}&page=${page}&hide_empty=false&orderby=name&order=asc`, { headers: { Accept: 'application/json', Authorization: authorization }, next: { revalidate: 300 } });
    if (!response.ok) throw new Error(`WooCommerce metadata category page ${page} gagal: ${response.status} ${response.statusText}`);
    categories.push(...((await response.json()) as WooCommerceMetadataCategory[]));
  }
  return categories;
}

async function fetchWooCommerceMetadata(authorization: string) {
  const categories = await fetchWooCommerceCategories(authorization);
  const topLevelCategories = categories.filter((category) => category.parent === 0);
  const categoryOrder = new Map(TOP_LEVEL_CATEGORY_ORDER.map((name, index) => [normalizeText(name), index]));
  topLevelCategories.sort((a, b) => { const aOrder = categoryOrder.get(normalizeText(a.name)); const bOrder = categoryOrder.get(normalizeText(b.name)); if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder; if (aOrder !== undefined) return -1; if (bOrder !== undefined) return 1; return a.name.localeCompare(b.name, 'id'); });
  const topLevelIds = new Set(topLevelCategories.map((category) => category.id));
  const childCategories = categories.filter((category) => category.parent !== 0 && topLevelIds.has(category.parent));
  return { categories: [...topLevelCategories, ...childCategories], conditionOptions: [...ACF_CONDITION_OPTIONS], locationOptions: [...ACF_LOCATION_OPTIONS], statusOptions: [...ACF_STATUS_OPTIONS] };
}

interface WooCommerceProductForMetaFilter { id: number; meta_data?: Array<{ key: string; value: string | number | boolean | null }>; }
async function fetchAllProductsForMetaFiltering(params: URLSearchParams, authorization: string): Promise<WooCommerceProductForMetaFilter[]> {
  const allProducts: WooCommerceProductForMetaFilter[] = [];
  const firstParams = new URLSearchParams(params); firstParams.set('per_page', String(PRODUCT_META_FILTER_PAGE_SIZE)); firstParams.set('page', '1');
  const firstResponse = await fetch(`${WOOCOMMERCE_API_URL}/products?${firstParams.toString()}`, { headers: { Accept: 'application/json', Authorization: authorization }, cache: 'no-store' });
  if (!firstResponse.ok) throw new Error(`WooCommerce metadata product lookup gagal: ${firstResponse.status} ${firstResponse.statusText}`);
  allProducts.push(...((await firstResponse.json()) as WooCommerceProductForMetaFilter[]));
  const totalPages = Number(firstResponse.headers.get('X-WP-TotalPages') || '1');
  for (let page = 2; page <= totalPages; page += 1) { const pageParams = new URLSearchParams(firstParams); pageParams.set('page', String(page)); const response = await fetch(`${WOOCOMMERCE_API_URL}/products?${pageParams.toString()}`, { headers: { Accept: 'application/json', Authorization: authorization }, cache: 'no-store' }); if (!response.ok) throw new Error(`WooCommerce metadata product page ${page} gagal: ${response.status} ${response.statusText}`); allProducts.push(...((await response.json()) as WooCommerceProductForMetaFilter[])); }
  return allProducts;
}

export async function GET(request: NextRequest) {
  const authorization = getWooCommerceAuthHeader();
  if (!authorization) return NextResponse.json({ error: 'WooCommerce credentials belum dikonfigurasi di environment server.' }, { status: 500 });
  try {
    if (request.nextUrl.searchParams.get('metadata') === '1') return NextResponse.json(await fetchWooCommerceMetadata(authorization), { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } });
    const incomingParams = request.nextUrl.searchParams;
    const params = await buildWooCommerceParams(request, authorization);
    const searchQuery = incomingParams.get('search')?.trim() || '';
    const conditionFilter = incomingParams.get('condition');
    const locationFilter = incomingParams.get('location');
    const unitCodeSearch = isUnitCodeQuery(searchQuery);
    const needsMetaFiltering = Boolean(unitCodeSearch || (conditionFilter && normalizeText(conditionFilter) !== 'semua kondisi') || (locationFilter && normalizeText(locationFilter) !== 'semua lokasi'));
    if (needsMetaFiltering) {
      const requestedPage = Math.max(Number(incomingParams.get('page') || '1') || 1, 1);
      const requestedPerPage = Math.min(Math.max(Number(incomingParams.get('per_page') || '8') || 8, 1), 100);
      const metaFilterParams = new URLSearchParams(params);
      if (unitCodeSearch) { metaFilterParams.delete('search'); metaFilterParams.set('sku', normalizeUnitCode(searchQuery)); }
      const allProducts = await fetchAllProductsForMetaFiltering(metaFilterParams, authorization);
      const filteredProducts = allProducts.filter((product) => (!unitCodeSearch || matchesUnitCodeQuery(product, searchQuery)) && matchesMetaFilter(product, 'kondisi_unit', conditionFilter) && matchesMetaFilter(product, 'lokasi_unit', locationFilter));
      const total = filteredProducts.length; const totalPages = Math.ceil(total / requestedPerPage); const start = (requestedPage - 1) * requestedPerPage; const pageProducts = filteredProducts.slice(start, start + requestedPerPage);
      return NextResponse.json(pageProducts, { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-WP-Total': String(total), 'X-WP-TotalPages': String(totalPages), 'X-BBK-Meta-Filter': unitCodeSearch ? 'unit-code/condition/location' : 'condition/location' } });
    }
    const response = await fetch(`${WOOCOMMERCE_API_URL}/products?${params.toString()}`, { headers: { Accept: 'application/json', Authorization: authorization }, next: { revalidate: PRODUCT_CACHE_REVALIDATE_SECONDS } });
    const body = await response.text();
    const headers = new Headers({ 'Content-Type': response.headers.get('content-type') || 'application/json', 'Cache-Control': `public, s-maxage=${PRODUCT_CACHE_REVALIDATE_SECONDS}, stale-while-revalidate=300` });
    const total = response.headers.get('X-WP-Total'); const totalPages = response.headers.get('X-WP-TotalPages'); if (total) headers.set('X-WP-Total', total); if (totalPages) headers.set('X-WP-TotalPages', totalPages);
    return new NextResponse(body, { status: response.status, headers });
  } catch (error) {
    console.error('WooCommerce proxy request failed:', error);
    return NextResponse.json({ error: 'Gagal menghubungi WooCommerce API.' }, { status: 502 });
  }
}
