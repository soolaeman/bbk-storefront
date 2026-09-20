import type { AvailabilityStatus, EquipmentCategory, Product, ProductCondition } from '../types';
import {
  getTursoProductBySlug,
  getTursoRelatedProducts,
  getTursoWooCommerceProductBySlug,
  getTursoWooCommerceRelatedProducts,
  getTursoCatalogMetadata,
  queryTursoProducts,
  type CatalogMetadata,
  type CatalogMetadataCategory,
  type WooCommerceProduct,
} from './turso';

export type {
  CatalogMetadata,
  CatalogMetadataCategory,
  WooCommerceProduct,
};

export interface WooCommerceProductsQuery {
  perPage?: number;
  page?: number;
  search?: string;
  slug?: string;
  category?: string;
  stockStatus?: string;
  orderby?: 'date' | 'title' | 'price' | 'id';
  order?: 'asc' | 'desc';
  sku?: string;
  featured?: boolean;
  minPrice?: string;
  maxPrice?: string;
  tag?: string;
  attribute?: string;
  attributeTerm?: string;
  condition?: string;
  location?: string;
  powerType?: string;
  statusFilter?: 'ALL' | 'READY_ONLY' | 'INCLUDE_SOLD';
  minPriceNumber?: number | null;
  maxPriceNumber?: number | null;
  sortBy?: 'latest' | 'price_low' | 'price_high' | 'condition';
}

export interface WooCommerceProductsResult {
  products: Product[];
  total: number | null;
  totalPages: number | null;
}

export async function getWooCommerceProductBySlug(slug: string): Promise<WooCommerceProduct | null> {
  if (!slug) return null;
  return getTursoWooCommerceProductBySlug(slug);
}

export async function getWooCommerceRelatedProducts(
  categoryId: number,
  currentProductId: number | string,
  limit = 4
): Promise<WooCommerceProduct[]> {
  return getTursoWooCommerceRelatedProducts(categoryId, currentProductId, limit);
}

export async function getWooCommerceProducts(options?: WooCommerceProductsQuery): Promise<Product[]> {
  return (await getWooCommerceProductsResult(options)).products;
}

const clientResultCache = new Map<string, { result: WooCommerceProductsResult; timestamp: number }>();
const CLIENT_CACHE_TTL = 30 * 1000; // 30 seconds client-side memory cache

export async function getWooCommerceProductsResult(
  options?: WooCommerceProductsQuery
): Promise<WooCommerceProductsResult> {
  // If running on server, query Turso directly for zero latency
  if (typeof window === 'undefined') {
    try {
      const res = await queryTursoProducts({
        perPage: options?.perPage ?? 8,
        page: options?.page ?? 1,
        search: options?.search,
        slug: options?.slug,
        category: options?.category,
        condition: options?.condition,
        location: options?.location,
        powerType: options?.powerType,
        statusFilter: options?.statusFilter,
        stockStatus: options?.stockStatus,
        sku: options?.sku,
        sortBy: options?.sortBy,
      });

      return {
        products: res.products,
        total: res.total,
        totalPages: res.totalPages,
      };
    } catch (e) {
      console.error('Server-side Turso query error in getWooCommerceProductsResult:', e);
    }
  }

  // Client-side fetch through /api/products
  const url = new URL('/api/products', 'http://localhost');
  if (options?.perPage) url.searchParams.set('per_page', String(options.perPage));
  if (options?.page) url.searchParams.set('page', String(options.page));
  if (options?.search) url.searchParams.set('search', options.search);
  if (options?.slug) url.searchParams.set('slug', options.slug);
  if (options?.category) url.searchParams.set('category', options.category);
  if (options?.condition) url.searchParams.set('condition', options.condition);
  if (options?.location) url.searchParams.set('location', options.location);
  if (options?.powerType) url.searchParams.set('power_type', options.powerType);
  if (options?.statusFilter) {
    url.searchParams.set(
      'status_unit',
      options.statusFilter === 'READY_ONLY' ? 'READY' : 'INCLUDE_SOLD'
    );
  }
  if (options?.stockStatus) url.searchParams.set('stock_status', options.stockStatus);
  if (options?.sku) url.searchParams.set('sku', options.sku);
  if (options?.sortBy) {
    if (options.sortBy === 'price_low') {
      url.searchParams.set('orderby', 'price');
      url.searchParams.set('order', 'asc');
    } else if (options.sortBy === 'price_high') {
      url.searchParams.set('orderby', 'price');
      url.searchParams.set('order', 'desc');
    }
  }

  const requestUrl = url.toString().replace('http://localhost', '');

  const cached = clientResultCache.get(requestUrl);
  if (cached && Date.now() - cached.timestamp < CLIENT_CACHE_TTL) {
    return cached.result;
  }

  const response = await fetch(requestUrl, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Products endpoint failed: ${response.status} ${response.statusText}`);
  }

  const rawProducts = (await response.json()) as WooCommerceProduct[];
  const totalHeader = response.headers.get('X-WP-Total');
  const totalPagesHeader = response.headers.get('X-WP-TotalPages');

  const total = totalHeader ? Number(totalHeader) : rawProducts.length;
  const totalPages = totalPagesHeader ? Number(totalPagesHeader) : 1;

  // Map WooCommerce-like objects to Product interface
  const products: Product[] = rawProducts.map((p) => {
    const kodeUnit = p.meta_data?.find((m) => m.key === 'kode_unit')?.value || p.sku;
    const statusUnit = p.meta_data?.find((m) => m.key === 'status_unit')?.value || (p.stock_status === 'outofstock' ? 'SOLD' : 'READY');
    const lokasiUnit = p.meta_data?.find((m) => m.key === 'lokasi_unit')?.value || 'Pamulang';
    const kondisiUnit = p.meta_data?.find((m) => m.key === 'kondisi_unit')?.value || 'Bekas';
    const linkTelegram = p.meta_data?.find((m) => m.key === 'link_telegram')?.value;

    const condUpper = String(kondisiUnit).toUpperCase();
    const condition: ProductCondition = condUpper.includes('BARU') ? 'Baru' : 'Bekas';

    const statUpper = String(statusUnit).toUpperCase();
    const status: AvailabilityStatus = statUpper === 'SOLD' ? 'SOLD' : 'READY';

    return {
      id: String(p.id || kodeUnit),
      slug: p.slug,
      sku: String(kodeUnit || p.sku),
      name: p.name,
      category: (p.categories?.[0]?.name || 'Peralatan Dapur') as EquipmentCategory,
      brand: 'Tidak tercantum',
      price: null, // Zero public pricing
      originalPriceEstimate: null,
      status,
      condition,
      conditionRating: 0,
      location: String(lokasiUnit),
      powerType: 'Manual / Tanpa Daya',
      summary: p.short_description || p.description || '',
      description: p.description || p.short_description || '',
      testedFunctions: [],
      images: (p.images || []).map((img) => img.src).filter(Boolean),
      dateAdded: p.date_created || new Date().toISOString(),
      previousUsage: String(kondisiUnit),
      adminTelegramRef: linkTelegram ? String(linkTelegram) : undefined,
      featured: false,
    };
  });

  const res: WooCommerceProductsResult = { products, total, totalPages };
  clientResultCache.set(requestUrl, { result: res, timestamp: Date.now() });
  return res;
}

export async function getWooCommerceProductById(id: string | number): Promise<Product> {
  const p = await getTursoProductBySlug(String(id));
  if (!p) throw new Error(`Product not found: ${id}`);
  return p;
}

export async function getCatalogMetadata(): Promise<CatalogMetadata> {
  if (typeof window === 'undefined') {
    return getTursoCatalogMetadata();
  }

  try {
    const response = await fetch('/api/products?metadata=1', {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`Metadata endpoint failed: ${response.status}`);
    return (await response.json()) as CatalogMetadata;
  } catch (error) {
    console.error('Failed to load catalog metadata:', error);
    return {
      categories: [],
      conditionOptions: ['Baru', 'Bekas'],
      locationOptions: [],
      totalProducts: null,
    };
  }
}
