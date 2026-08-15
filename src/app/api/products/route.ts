import { NextRequest, NextResponse } from 'next/server';

const WOOCOMMERCE_API_URL =
  process.env.WOOCOMMERCE_API_URL ||
  'https://www.bukanbarukitchen.com/wp-json/wc/v3';

const METADATA_PER_PAGE = 100;

const ACF_STATUS_OPTIONS = ['READY', 'DP', 'SOLD'] as const;
const ACF_CONDITION_OPTIONS = ['BARU', 'BEKAS'] as const;
const ACF_LOCATION_OPTIONS = [
  'PAMULANG 2',
  'KEDAUNG',
  'SAWANGAN',
  'SETU',
  'PAMULANG BARAT',
] as const;

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

    params.set('category', String(categoryId ?? -1));
  }

  const statusFilter = incomingParams.get('status_unit');

  if (statusFilter === 'READY') {
    params.set('stock_status', 'instock');
  } else if (statusFilter === 'SOLD') {
    params.set('stock_status', 'outofstock');
  }

  return params;
}

interface WooCommerceMetadataCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count?: number;
}

async function fetchWooCommerceCategories(
  authorization: string,
): Promise<WooCommerceMetadataCategory[]> {
  const categoriesResponse = await fetch(
    `${WOOCOMMERCE_API_URL}/products/categories?per_page=${METADATA_PER_PAGE}&hide_empty=false&orderby=name&order=asc`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: authorization,
      },
      next: { revalidate: 300 },
    },
  );

  if (!categoriesResponse.ok) {
    throw new Error(
      `WooCommerce metadata category lookup gagal: ${categoriesResponse.status} ${categoriesResponse.statusText}`,
    );
  }

  const categories = (await categoriesResponse.json()) as WooCommerceMetadataCategory[];
  const totalPages = Number(categoriesResponse.headers.get('X-WP-TotalPages') || '1');

  for (let page = 2; page <= totalPages; page += 1) {
    const response = await fetch(
      `${WOOCOMMERCE_API_URL}/products/categories?per_page=${METADATA_PER_PAGE}&page=${page}&hide_empty=false&orderby=name&order=asc`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: authorization,
        },
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) {
      throw new Error(
        `WooCommerce metadata category page ${page} gagal: ${response.status} ${response.statusText}`,
      );
    }

    categories.push(...((await response.json()) as WooCommerceMetadataCategory[]));
  }

  return categories;
}

async function fetchWooCommerceMetadata(
  authorization: string,
): Promise<{
  categories: WooCommerceMetadataCategory[];
  conditionOptions: string[];
  locationOptions: string[];
  statusOptions: string[];
}> {
  const categories = await fetchWooCommerceCategories(authorization);
  const topLevelCategories = categories.filter((category) => category.parent === 0);
  const categoryOrder = new Map(
    TOP_LEVEL_CATEGORY_ORDER.map((name, index) => [normalizeText(name), index]),
  );

  topLevelCategories.sort((a, b) => {
    const aOrder = categoryOrder.get(normalizeText(a.name));
    const bOrder = categoryOrder.get(normalizeText(b.name));

    if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
    if (aOrder !== undefined) return -1;
    if (bOrder !== undefined) return 1;
    return a.name.localeCompare(b.name, 'id');
  });

  const topLevelIds = new Set(topLevelCategories.map((category) => category.id));
  const childCategories = categories.filter(
    (category) => category.parent !== 0 && topLevelIds.has(category.parent),
  );

  return {
    // Expose top-level and direct child categories from WooCommerce. The UI
    // uses parent to render children beneath the selected top-level category.
    categories: [...topLevelCategories, ...childCategories],
    conditionOptions: [...ACF_CONDITION_OPTIONS],
    locationOptions: [...ACF_LOCATION_OPTIONS],
    statusOptions: [...ACF_STATUS_OPTIONS],
  };
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
    if (request.nextUrl.searchParams.get('metadata') === '1') {
      const metadata = await fetchWooCommerceMetadata(authorization);
      return NextResponse.json(metadata, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      });
    }

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
