import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_WOOCOMMERCE_API_ORIGIN = 'https://origin.bukanbarukitchen.com';

// Bersihkan URL agar tidak ada trailing slash atau path rest_route yang tersisa
const WOOCOMMERCE_API_ORIGIN = (
  process.env.WOOCOMMERCE_API_URL || DEFAULT_WOOCOMMERCE_API_ORIGIN
)
  .replace(/\/$/, '')
  .replace(/\/wp-json\/wc\/v3$/i, '');

const METADATA_PER_PAGE = 100;
const PRODUCT_META_FILTER_PAGE_SIZE = 100;
const PRODUCT_CACHE_REVALIDATE_SECONDS = 60;

const ACF_STATUS_OPTIONS = ['READY', 'DP', 'SOLD'] as const;
const ACF_CONDITION_OPTIONS = ['BARU', 'BEKAS'] as const;
const ACF_LOCATION_OPTIONS = ['PAMULANG 2', 'KEDAUNG', 'SAWANGAN', 'SETU', 'PAMULANG BARAT'] as const;
const TOP_LEVEL_CATEGORY_ORDER = [
  'Meja Stainless',
  'Sink Stainless',
  'Rak Stainless',
  'Hood Stainless',
  'Kompor',
  'Chiller',
  'Ice System',
  'Freezer',
  'Showcase',
  'Peralatan Dapur Bekas Lainnya',
] as const;

function hasWooCommerceCredentials(): boolean {
  return Boolean(process.env.WC_CONSUMER_KEY && process.env.WC_CONSUMER_SECRET);
}

// 1. TAMBAHKAN USER-AGENT BROWSER (Mencegah Vercel/Cloudflare 403 Block)
function getWooCommerceHeaders(): HeadersInit {
  return {
    Accept: 'application/json',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  };
}

// 2. PERBAIKI STRUKTUR URL KE REST API NATIVE (/wp-json/wc/v3/...)
function buildWooCommerceUrl(resource: string, params?: URLSearchParams): string {
  const baseUrl = `${WOOCOMMERCE_API_ORIGIN}/wp-json/wc/v3/${resource}`;
  const query = new URLSearchParams(params);

  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;
  if (consumerKey && consumerSecret) {
    query.set('consumer_key', consumerKey);
    query.set('consumer_secret', consumerSecret);
  }

  const queryString = query.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

function normalizeText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function normalizeUnitCode(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function isUnitCodeQuery(value: string): boolean {
  const normalized = normalizeUnitCode(value);
  return normalized.length >= 4 && /^BBK\d+$/.test(normalized);
}

function appendIfPresent(source: URLSearchParams, target: URLSearchParams, key: string): void {
  const value = source.get(key);
  if (value !== null && value.trim() !== '') target.set(key, value);
}

function getProductMetaValue(
  product: { meta_data?: Array<{ key: string; value: string | number | boolean | null }> },
  keys: string[]
): string {
  const normalizedKeys = keys.map(normalizeText);
  const entry = product.meta_data?.find((item) => normalizedKeys.includes(normalizeText(item.key)));
  if (entry?.value === null || entry?.value === undefined) return '';
  return String(entry.value).trim();
}

function matchesMetaFilter(
  product: { meta_data?: Array<{ key: string; value: string | number | boolean | null }> },
  key: string,
  expected: string | null
): boolean {
  if (!expected || normalizeText(expected) === 'semua' || normalizeText(expected).startsWith('semua ')) return true;
  return normalizeText(getProductMetaValue(product, [key])) === normalizeText(expected);
}

function matchesUnitCodeQuery(
  product: { meta_data?: Array<{ key: string; value: string | number | boolean | null }> },
  query: string
): boolean {
  return (
    Boolean(getProductMetaValue(product, ['kode_unit'])) &&
    normalizeUnitCode(getProductMetaValue(product, ['kode_unit'])) === normalizeUnitCode(query)
  );
}

async function resolveWooCommerceCategoryId(categoryName: string): Promise<number | null> {
  const trimmedName = categoryName.trim();
  if (!trimmedName || normalizeText(trimmedName) === 'semua') return null;
  if (/^\d+$/.test(trimmedName)) return Number(trimmedName);

  const params = new URLSearchParams({ search: trimmedName, per_page: '100' });
  const response = await fetch(buildWooCommerceUrl('products/categories', params), {
    headers: getWooCommerceHeaders(),
    next: { revalidate: PRODUCT_CACHE_REVALIDATE_SECONDS },
  });

  if (!response.ok) throw new Error(`WooCommerce category lookup gagal: ${response.status} ${response.statusText}`);
  const categories = (await response.json()) as Array<{ id: number; name: string }>;
  return categories.find((item) => normalizeText(item.name) === normalizeText(trimmedName))?.id ?? null;
}

async function buildWooCommerceParams(request: NextRequest): Promise<URLSearchParams> {
  const incomingParams = request.nextUrl.searchParams;
  const params = new URLSearchParams();

  params.set('status', incomingParams.get('status') || 'publish');
  params.set('per_page', incomingParams.get('per_page') || '8');
  params.set('page', incomingParams.get('page') || '1');

  for (const key of [
    'search',
    'slug',
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
    params.set('category', String((await resolveWooCommerceCategoryId(category)) ?? -1));
  }

  const statusFilter = incomingParams.get('status_unit');
  if (statusFilter === 'READY') params.set('stock_status', 'instock');
  else if (statusFilter === 'SOLD') params.set('stock_status', 'outofstock');

  return params;
}

interface WooCommerceMetadataCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count?: number;
}

async function fetchWooCommerceCategories(): Promise<WooCommerceMetadataCategory[]> {
  const params = new URLSearchParams({
    per_page: String(METADATA_PER_PAGE),
    hide_empty: 'false',
    orderby: 'name',
    order: 'asc',
  });

  const categoriesResponse = await fetch(buildWooCommerceUrl('products/categories', params), {
    headers: getWooCommerceHeaders(),
    next: { revalidate: 300 },
  });

  if (!categoriesResponse.ok)
    throw new Error(`WooCommerce metadata category lookup gagal: ${categoriesResponse.status}`);

  const categories = (await categoriesResponse.json()) as WooCommerceMetadataCategory[];
  const totalPages = Number(categoriesResponse.headers.get('X-WP-TotalPages') || '1');

  for (let page = 2; page <= totalPages; page += 1) {
    params.set('page', String(page));
    const response = await fetch(buildWooCommerceUrl('products/categories', params), {
      headers: getWooCommerceHeaders(),
      next: { revalidate: 300 },
    });
    if (!response.ok) break;
    categories.push(...((await response.json()) as WooCommerceMetadataCategory[]));
  }
  return categories;
}

async function fetchWooCommerceMetadata() {
  const categories = await fetchWooCommerceCategories();
  const topLevelCategories = categories.filter((category) => category.parent === 0);
  const categoryOrder = new Map(TOP_LEVEL_CATEGORY_ORDER.map((name, index) => [normalizeText(name), index]));

  topLevelCategories.sort((a, b) => {
    const aOrder = categoryOrder.get(normalizeText(a.name));
    const bOrder = categoryOrder.get(normalizeText(b.name));
    if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
    if (aOrder !== undefined) return -1;
    if (bOrder !== undefined) return 1;
    return a.name.localeCompare(b.name, 'id');
  });

  const topLevelIds = new Set(topLevelCategories.map((category) => category.id));
  const childCategories = categories.filter((category) => category.parent !== 0 && topLevelIds.has(category.parent));

  return {
    categories: [...topLevelCategories, ...childCategories],
    conditionOptions: [...ACF_CONDITION_OPTIONS],
    locationOptions: [...ACF_LOCATION_OPTIONS],
    statusOptions: [...ACF_STATUS_OPTIONS],
  };
}

interface WooCommerceProductForMetaFilter {
  id: number;
  meta_data?: Array<{ key: string; value: string | number | boolean | null }>;
}

async function fetchAllProductsForMetaFiltering(params: URLSearchParams): Promise<WooCommerceProductForMetaFilter[]> {
  const allProducts: WooCommerceProductForMetaFilter[] = [];
  const firstParams = new URLSearchParams(params);
  firstParams.set('per_page', String(PRODUCT_META_FILTER_PAGE_SIZE));
  firstParams.set('page', '1');

  const firstResponse = await fetch(buildWooCommerceUrl('products', firstParams), {
    headers: getWooCommerceHeaders(),
    cache: 'no-store',
  });

  if (!firstResponse.ok) throw new Error(`WooCommerce metadata product lookup gagal: ${firstResponse.status}`);
  allProducts.push(...((await firstResponse.json()) as WooCommerceProductForMetaFilter[]));

  const totalPages = Number(firstResponse.headers.get('X-WP-TotalPages') || '1');
  for (let page = 2; page <= totalPages; page += 1) {
    const pageParams = new URLSearchParams(firstParams);
    pageParams.set('page', String(page));
    const response = await fetch(buildWooCommerceUrl('products', pageParams), {
      headers: getWooCommerceHeaders(),
      cache: 'no-store',
    });
    if (!response.ok) break;
    allProducts.push(...((await response.json()) as WooCommerceProductForMetaFilter[]));
  }
  return allProducts;
}

export async function GET(request: NextRequest) {
  if (!hasWooCommerceCredentials()) {
    return NextResponse.json(
      { error: 'WooCommerce credentials belum dikonfigurasi di environment server.' },
      { status: 500 }
    );
  }

  try {
    // Handling Metadata Request
    if (request.nextUrl.searchParams.get('metadata') === '1') {
      const metadata = await fetchWooCommerceMetadata();
      return NextResponse.json(metadata, {
        headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
      });
    }

    const incomingParams = request.nextUrl.searchParams;
    const params = await buildWooCommerceParams(request);
    const searchQuery = incomingParams.get('search')?.trim() || '';
    const conditionFilter = incomingParams.get('condition');
    const locationFilter = incomingParams.get('location');
    const unitCodeSearch = isUnitCodeQuery(searchQuery);

    const needsMetaFiltering = Boolean(
      unitCodeSearch ||
        (conditionFilter && normalizeText(conditionFilter) !== 'semua kondisi') ||
        (locationFilter && normalizeText(locationFilter) !== 'semua lokasi')
    );

    if (needsMetaFiltering) {
      const requestedPage = Math.max(Number(incomingParams.get('page') || '1') || 1, 1);
      const requestedPerPage = Math.min(Math.max(Number(incomingParams.get('per_page') || '8') || 8, 1), 100);

      const metaFilterParams = new URLSearchParams(params);
      if (unitCodeSearch) {
        metaFilterParams.delete('search');
        metaFilterParams.set('sku', normalizeUnitCode(searchQuery));
      }

      const allProducts = await fetchAllProductsForMetaFiltering(metaFilterParams);
      const filteredProducts = allProducts.filter(
        (product) =>
          (!unitCodeSearch || matchesUnitCodeQuery(product, searchQuery)) &&
          matchesMetaFilter(product, 'kondisi_unit', conditionFilter) &&
          matchesMetaFilter(product, 'lokasi_unit', locationFilter)
      );

      const total = filteredProducts.length;
      const totalPages = Math.ceil(total / requestedPerPage);
      const start = (requestedPage - 1) * requestedPerPage;
      const pageProducts = filteredProducts.slice(start, start + requestedPerPage);

      return NextResponse.json(pageProducts, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          'X-WP-Total': String(total),
          'X-WP-TotalPages': String(totalPages),
          'X-BBK-Meta-Filter': unitCodeSearch ? 'unit-code/condition/location' : 'condition/location',
        },
      });
    }

    // 3. AMBIL DATA DARI WOOCOMMERCE & TANGKAP ERROR JIKA MENGERIMKAN NON-200 (HTML)
    const response = await fetch(buildWooCommerceUrl('products', params), {
      headers: getWooCommerceHeaders(),
      next: { revalidate: PRODUCT_CACHE_REVALIDATE_SECONDS },
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error(`WooCommerce API Error Response (${response.status}):`, responseText.slice(0, 300));
      return NextResponse.json(
        { error: `Gagal mengambil produk dari WooCommerce (${response.status})` },
        { status: response.status }
      );
    }

    // Pastikan payload berupa JSON valid
    let jsonData;
    try {
      jsonData = JSON.parse(responseText);
    } catch {
      console.error('WooCommerce mengembalikan HTML/bukan JSON:', responseText.slice(0, 300));
      return NextResponse.json(
        { error: 'Format respon dari server WooCommerce tidak valid (HTML).' },
        { status: 502 }
      );
    }

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-Control': `public, s-maxage=${PRODUCT_CACHE_REVALIDATE_SECONDS}, stale-while-revalidate=300`,
    });

    const total = response.headers.get('X-WP-Total');
    const totalPages = response.headers.get('X-WP-TotalPages');
    if (total) headers.set('X-WP-Total', total);
    if (totalPages) headers.set('X-WP-TotalPages', totalPages);

    return NextResponse.json(jsonData, { status: 200, headers });
  } catch (error) {
    console.error('WooCommerce proxy request failed:', error);
    return NextResponse.json({ error: 'Gagal menghubungi WooCommerce API.' }, { status: 502 });
  }
}
