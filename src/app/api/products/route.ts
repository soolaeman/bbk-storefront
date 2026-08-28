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
const IN_MEMORY_CACHE_TTL_MS = 60 * 1000; // 60 seconds
const METADATA_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

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

// In-Memory Query & Metadata Cache
interface CacheEntry {
  data: any;
  headers: Record<string, string>;
  timestamp: number;
}
const queryCache = new Map<string, CacheEntry>();
const metaProductCache = new Map<string, { data: WooCommerceProductForMetaFilter[]; timestamp: number }>();
const MAX_CACHE_ENTRIES = 150;
const MAX_META_CACHE_ENTRIES = 30;

let cachedMetadata: { data: any; timestamp: number } | null = null;
let cachedCategoryMap: Map<string, number> | null = null;

function setQueryCache(key: string, data: any, headers: Record<string, string>) {
  if (queryCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = queryCache.keys().next().value;
    if (oldestKey) queryCache.delete(oldestKey);
  }
  queryCache.set(key, { data, headers, timestamp: Date.now() });
}

function getQueryCache(key: string): CacheEntry | null {
  const entry = queryCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > IN_MEMORY_CACHE_TTL_MS) {
    queryCache.delete(key);
    return null;
  }
  return entry;
}

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

  const normalized = normalizeText(trimmedName);
  if (cachedCategoryMap && cachedCategoryMap.has(normalized)) {
    return cachedCategoryMap.get(normalized) ?? null;
  }

  // If not in cache, fetch categories to populate map
  const categories = await fetchWooCommerceCategories();
  const found = categories.find((item) => normalizeText(item.name) === normalized)?.id ?? null;
  return found;
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
    const resolvedId = await resolveWooCommerceCategoryId(category);
    params.set('category', String(resolvedId ?? -1));
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

  if (totalPages > 1) {
    const pagePromises: Promise<WooCommerceMetadataCategory[]>[] = [];
    for (let page = 2; page <= totalPages; page += 1) {
      const pageParams = new URLSearchParams(params);
      pageParams.set('page', String(page));
      pagePromises.push(
        fetch(buildWooCommerceUrl('products/categories', pageParams), {
          headers: getWooCommerceHeaders(),
          next: { revalidate: 300 },
        })
          .then((res) => (res.ok ? res.json() : []))
          .catch(() => [])
      );
    }
    const additionalCategories = await Promise.all(pagePromises);
    for (const batch of additionalCategories) {
      if (Array.isArray(batch)) categories.push(...batch);
    }
  }

  // Update in-memory category lookup map
  const catMap = new Map<string, number>();
  for (const cat of categories) {
    if (cat.name) catMap.set(normalizeText(cat.name), cat.id);
  }
  cachedCategoryMap = catMap;

  return categories;
}

async function fetchWooCommerceMetadata() {
  if (cachedMetadata && Date.now() - cachedMetadata.timestamp < METADATA_CACHE_TTL_MS) {
    return cachedMetadata.data;
  }

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

  const metadata = {
    categories: [...topLevelCategories, ...childCategories],
    conditionOptions: [...ACF_CONDITION_OPTIONS],
    locationOptions: [...ACF_LOCATION_OPTIONS],
    statusOptions: [...ACF_STATUS_OPTIONS],
  };

  cachedMetadata = { data: metadata, timestamp: Date.now() };
  return metadata;
}

interface WooCommerceProductForMetaFilter {
  id: number;
  meta_data?: Array<{ key: string; value: string | number | boolean | null }>;
}

function getMetaProductCacheKey(params: URLSearchParams): string {
  const normalized = new URLSearchParams(params);
  normalized.delete('page');
  normalized.set('per_page', String(PRODUCT_META_FILTER_PAGE_SIZE));
  return normalized.toString();
}

async function fetchAllProductsForMetaFiltering(params: URLSearchParams): Promise<WooCommerceProductForMetaFilter[]> {
  const cacheKey = getMetaProductCacheKey(params);
  const cached = metaProductCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < IN_MEMORY_CACHE_TTL_MS) {
    return cached.data;
  }
  const allProducts: WooCommerceProductForMetaFilter[] = [];
  const firstParams = new URLSearchParams(params);
  firstParams.set('per_page', String(PRODUCT_META_FILTER_PAGE_SIZE));
  firstParams.set('page', '1');

  const firstResponse = await fetch(buildWooCommerceUrl('products', firstParams), {
    headers: getWooCommerceHeaders(),
    next: { revalidate: 60 },
  });

  if (!firstResponse.ok) throw new Error(`WooCommerce metadata product lookup gagal: ${firstResponse.status}`);
  allProducts.push(...((await firstResponse.json()) as WooCommerceProductForMetaFilter[]));

  const totalPages = Number(firstResponse.headers.get('X-WP-TotalPages') || '1');
  if (totalPages > 1) {
    const pagePromises: Promise<WooCommerceProductForMetaFilter[]>[] = [];
    for (let page = 2; page <= totalPages; page += 1) {
      const pageParams = new URLSearchParams(firstParams);
      pageParams.set('page', String(page));
      pagePromises.push(
        fetch(buildWooCommerceUrl('products', pageParams), {
          headers: getWooCommerceHeaders(),
          next: { revalidate: 60 },
        })
          .then((res) => (res.ok ? res.json() : []))
          .catch(() => [])
      );
    }
    const additionalPages = await Promise.all(pagePromises);
    for (const batch of additionalPages) {
      if (Array.isArray(batch)) allProducts.push(...batch);
    }
  }
  if (metaProductCache.size >= MAX_META_CACHE_ENTRIES) {
    const oldestKey = metaProductCache.keys().next().value;
    if (oldestKey) metaProductCache.delete(oldestKey);
  }
  metaProductCache.set(cacheKey, { data: allProducts, timestamp: Date.now() });
  return allProducts;
}

export async function GET(request: NextRequest) {
  if (!hasWooCommerceCredentials()) {
    return NextResponse.json(
      { error: 'WooCommerce credentials belum dikonfigurasi di environment server.' },
      { status: 500 }
    );
  }

  const cacheKey = request.nextUrl.search;

  try {
    // Check in-memory query cache
    const cachedResponse = getQueryCache(cacheKey);
    if (cachedResponse) {
      const headers = new Headers(cachedResponse.headers);
      headers.set('X-BBK-Cache', 'HIT');
      return NextResponse.json(cachedResponse.data, {
        status: 200,
        headers,
      });
    }

    // Handling Metadata Request
    if (request.nextUrl.searchParams.get('metadata') === '1') {
      const metadata = await fetchWooCommerceMetadata();
      const headers = {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'X-BBK-Cache': 'MISS',
      };
      setQueryCache(cacheKey, metadata, headers);
      return NextResponse.json(metadata, { headers });
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
        fetch(buildWooCommerceUrl('products', readyParams), { headers: getWooCommerceHeaders(), next: { revalidate: 60 } }),
        fetch(buildWooCommerceUrl('products', soldParams), { headers: getWooCommerceHeaders(), next: { revalidate: 60 } })
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
        const res = await fetch(buildWooCommerceUrl('products', fetchParams), { headers: getWooCommerceHeaders(), next: { revalidate: 60 } });
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
          const res = await fetch(buildWooCommerceUrl('products', fetchParams), { headers: getWooCommerceHeaders(), next: { revalidate: 60 } });
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
            fetch(buildWooCommerceUrl('products', fetchParams1), { headers: getWooCommerceHeaders(), next: { revalidate: 60 } }),
            fetch(buildWooCommerceUrl('products', fetchParams2), { headers: getWooCommerceHeaders(), next: { revalidate: 60 } })
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
          fetch(buildWooCommerceUrl('products', fetchParamsReady), { headers: getWooCommerceHeaders(), next: { revalidate: 60 } }),
          fetch(buildWooCommerceUrl('products', fetchParamsSold), { headers: getWooCommerceHeaders(), next: { revalidate: 60 } })
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

      const responseHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'Cache-Control': `public, s-maxage=${PRODUCT_CACHE_REVALIDATE_SECONDS}, stale-while-revalidate=300`,
        'X-WP-Total': String(total),
        'X-WP-TotalPages': String(totalPages),
        'X-BBK-Meta-Filter': 'split-fetch',
        'X-BBK-Cache': 'MISS',
      };

      setQueryCache(cacheKey, pageProducts, responseHeaders);

      return NextResponse.json(pageProducts, {
        status: 200,
        headers: responseHeaders,
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

      const metaScanCacheKey = getMetaProductCacheKey(metaFilterParams);
      const metaScanWasCached = Boolean(metaProductCache.get(metaScanCacheKey) && Date.now() - (metaProductCache.get(metaScanCacheKey)?.timestamp || 0) < IN_MEMORY_CACHE_TTL_MS);
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

      const responseHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'Cache-Control': `public, s-maxage=${PRODUCT_CACHE_REVALIDATE_SECONDS}, stale-while-revalidate=300`,
        'X-WP-Total': String(total),
        'X-WP-TotalPages': String(totalPages),
        'X-BBK-Meta-Filter': unitCodeSearch ? 'unit-code/condition/location' : 'condition/location',
        'X-BBK-Meta-Scan-Cache': metaScanWasCached ? 'HIT' : 'MISS',
        'X-BBK-Cache': 'MISS',
      };

      setQueryCache(cacheKey, pageProducts, responseHeaders);

      return NextResponse.json(pageProducts, {
        status: 200,
        headers: responseHeaders,
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

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Cache-Control': `public, s-maxage=${PRODUCT_CACHE_REVALIDATE_SECONDS}, stale-while-revalidate=300`,
      'X-BBK-Cache': 'MISS',
    };

    const total = response.headers.get('X-WP-Total');
    const totalPages = response.headers.get('X-WP-TotalPages');
    if (total) headers['X-WP-Total'] = total;
    if (totalPages) headers['X-WP-TotalPages'] = totalPages;

    setQueryCache(cacheKey, jsonData, headers);

    return NextResponse.json(jsonData, { status: 200, headers });
  } catch (error) {
    console.error('WooCommerce proxy request failed:', error);
    return NextResponse.json({ error: 'Gagal menghubungi WooCommerce API.' }, { status: 502 });
  }
}
