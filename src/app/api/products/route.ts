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
        (locationFilter && normalizeText(locationFilter) !== 'semua lokasi') ||
        (incomingParams.get('status_unit') && incomingParams.get('status_unit') !== 'READY')
    );

    const statusUnitParam = incomingParams.get('status_unit');
    const isDefaultCatalogLoad = !searchQuery && 
      (!conditionFilter || normalizeText(conditionFilter) === 'semua kondisi') &&
      (!locationFilter || normalizeText(locationFilter) === 'semua lokasi') &&
      statusUnitParam === 'READY,DP,SOLD';

    if (isDefaultCatalogLoad) {
      const requestedPage = Math.max(Number(incomingParams.get('page') || '1') || 1, 1);
      const requestedPerPage = Math.min(Math.max(Number(incomingParams.get('per_page') || '8') || 8, 1), 100);

      // 1. Get total ready and total sold counts
      const readyParams = new URLSearchParams(params);
      readyParams.set('stock_status', 'instock');
      readyParams.set('per_page', '1');
      readyParams.set('page', '1');
      
      const soldParams = new URLSearchParams(params);
      soldParams.set('stock_status', 'outofstock');
      soldParams.set('per_page', '1');
      soldParams.set('page', '1');

      const [readyRes, soldRes] = await Promise.all([
        fetch(buildWooCommerceUrl('products', readyParams), { headers: getWooCommerceHeaders() }),
        fetch(buildWooCommerceUrl('products', soldParams), { headers: getWooCommerceHeaders() })
      ]);

      const totalReady = Number(readyRes.headers.get('X-WP-Total') || '0');
      const totalSold = Number(soldRes.headers.get('X-WP-Total') || '0');
      const total = totalReady + totalSold;
      const totalPages = Math.ceil(total / requestedPerPage);

      let pageProducts: any[] = [];
      const skip = (requestedPage - 1) * requestedPerPage;
      const limit = requestedPerPage;

      if (skip + limit <= totalReady) {
        // Only ready products
        const fetchParams = new URLSearchParams(params);
        fetchParams.set('stock_status', 'instock');
        fetchParams.set('per_page', String(limit));
        fetchParams.set('page', String(requestedPage));
        const res = await fetch(buildWooCommerceUrl('products', fetchParams), { headers: getWooCommerceHeaders() });
        if (res.ok) pageProducts = await res.json();
      } else if (skip >= totalReady) {
        // Only sold products
        const soldSkip = skip - totalReady;
        const page1 = Math.floor(soldSkip / limit) + 1;
        const offsetInPage = soldSkip % limit;

        if (offsetInPage === 0) {
          const fetchParams = new URLSearchParams(params);
          fetchParams.set('stock_status', 'outofstock');
          fetchParams.set('per_page', String(limit));
          fetchParams.set('page', String(page1));
          const res = await fetch(buildWooCommerceUrl('products', fetchParams), { headers: getWooCommerceHeaders() });
          if (res.ok) pageProducts = await res.json();
        } else {
          // Crosses page boundary
          const fetchParams1 = new URLSearchParams(params);
          fetchParams1.set('stock_status', 'outofstock');
          fetchParams1.set('per_page', String(limit));
          fetchParams1.set('page', String(page1));

          const fetchParams2 = new URLSearchParams(params);
          fetchParams2.set('stock_status', 'outofstock');
          fetchParams2.set('per_page', String(limit));
          fetchParams2.set('page', String(page1 + 1));

          const [res1, res2] = await Promise.all([
            fetch(buildWooCommerceUrl('products', fetchParams1), { headers: getWooCommerceHeaders() }),
            fetch(buildWooCommerceUrl('products', fetchParams2), { headers: getWooCommerceHeaders() })
          ]);

          let items1: any[] = [];
          let items2: any[] = [];
          if (res1.ok) items1 = await res1.json();
          if (res2.ok) items2 = await res2.json();

          pageProducts = [...items1, ...items2].slice(offsetInPage, offsetInPage + limit);
        }
      } else {
        // Spans boundary
        const readyItemsNeeded = totalReady - skip;
        const soldItemsNeeded = limit - readyItemsNeeded;

        const lastReadyPage = Math.ceil(totalReady / limit);
        const fetchParamsReady = new URLSearchParams(params);
        fetchParamsReady.set('stock_status', 'instock');
        fetchParamsReady.set('per_page', String(limit));
        fetchParamsReady.set('page', String(lastReadyPage));

        const fetchParamsSold = new URLSearchParams(params);
        fetchParamsSold.set('stock_status', 'outofstock');
        fetchParamsSold.set('per_page', String(limit));
        fetchParamsSold.set('page', '1');

        const [resReady, resSold] = await Promise.all([
          fetch(buildWooCommerceUrl('products', fetchParamsReady), { headers: getWooCommerceHeaders() }),
          fetch(buildWooCommerceUrl('products', fetchParamsSold), { headers: getWooCommerceHeaders() })
        ]);

        let itemsReady: any[] = [];
        let itemsSold: any[] = [];
        if (resReady.ok) itemsReady = await resReady.json();
        if (resSold.ok) itemsSold = await resSold.json();

        // slice correct items
        const readySliced = itemsReady.slice(itemsReady.length - readyItemsNeeded);
        const soldSliced = itemsSold.slice(0, soldItemsNeeded);
        pageProducts = [...readySliced, ...soldSliced];
      }

      return NextResponse.json(pageProducts, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          'X-WP-Total': String(total),
          'X-WP-TotalPages': String(totalPages),
          'X-BBK-Meta-Filter': 'split-fetch',
        },
      });
    }

    if (needsMetaFiltering) {
      const requestedPage = Math.max(Number(incomingParams.get('page') || '1') || 1, 1);
      const requestedPerPage = Math.min(Math.max(Number(incomingParams.get('per_page') || '8') || 8, 1), 100);

      const metaFilterParams = new URLSearchParams(params);
      if (unitCodeSearch) {
        metaFilterParams.delete('search');
        metaFilterParams.set('sku', normalizeUnitCode(searchQuery));
        metaFilterParams.delete('stock_status');
      }
      const statusUnitParam = incomingParams.get('status_unit');
      if (statusUnitParam && statusUnitParam !== 'READY') {
        metaFilterParams.delete('stock_status');
      }

      const allProducts = await fetchAllProductsForMetaFiltering(metaFilterParams);
      const filteredProducts = allProducts.filter(
        (product) =>
          (!unitCodeSearch || matchesUnitCodeQuery(product, searchQuery)) &&
          matchesMetaFilter(product, 'kondisi_unit', conditionFilter) &&
          matchesMetaFilter(product, 'lokasi_unit', locationFilter)
      );

      // Sort: READY (and others) first, SOLD last
      filteredProducts.sort((a, b) => {
        const aStatus = getProductMetaValue(a, ['status_unit']).toUpperCase();
        const bStatus = getProductMetaValue(b, ['status_unit']).toUpperCase();
        const aIsSold = aStatus === 'SOLD';
        const bIsSold = bStatus === 'SOLD';
        
        if (aIsSold && !bIsSold) return 1;
        if (!aIsSold && bIsSold) return -1;
        return 0;
      });

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
      cache: 'no-store',
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
