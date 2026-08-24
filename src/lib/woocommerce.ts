import type { AvailabilityStatus, EquipmentCategory, Product, ProductCondition } from '../types';

interface WooCommerceMeta { key: string; value: string | number | boolean | null; }
interface WooCommerceImage { src: string; }
interface WooCommerceCategory { id?: number; name: string; slug?: string; }
interface WooCommerceProduct {
  id: number; name: string; slug: string; sku: string; price: string; regular_price: string;
  short_description: string; description: string; images: WooCommerceImage[];
  categories: WooCommerceCategory[]; stock_status: string; date_created?: string;
  date_modified?: string; meta_data?: WooCommerceMeta[];
}

export interface WooCommerceProductsQuery {
  perPage?: number; page?: number; search?: string; slug?: string; category?: string; stockStatus?: string;
  orderby?: 'date' | 'title' | 'price' | 'id'; order?: 'asc' | 'desc'; sku?: string;
  featured?: boolean; minPrice?: string; maxPrice?: string; tag?: string; attribute?: string;
  attributeTerm?: string; condition?: string; location?: string; powerType?: string;
  statusFilter?: 'ALL' | 'READY_ONLY' | 'INCLUDE_SOLD'; minPriceNumber?: number | null;
  maxPriceNumber?: number | null; sortBy?: 'latest' | 'price_low' | 'price_high' | 'condition';
}

export interface WooCommerceProductsResult { products: Product[]; total: number | null; totalPages: number | null; }

const normalizeKey = (value: string) => value.toLowerCase().trim().replace(/[\s-]+/g, '_');

function getMeta(product: WooCommerceProduct, keys: string[]): string {
  const normalizedKeys = keys.map(normalizeKey);
  const item = product.meta_data?.find((entry) => normalizedKeys.includes(normalizeKey(entry.key)));
  if (item?.value === null || item?.value === undefined) return '';
  return String(item.value).trim();
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/\s+/g, ' ').trim();
}

function mapStatus(value: string): AvailabilityStatus {
  const normalized = value.trim().toUpperCase();
  if (normalized === 'SOLD') return 'SOLD';
  if (normalized === 'BOOKED') return 'BOOKED';
  if (normalized === 'CONFIRMING' || normalized === 'DP') return 'CONFIRMING';
  return 'READY';
}

function mapCondition(value: string): ProductCondition {
  const normalized = value.trim().toUpperCase();
  if (normalized === 'BEKAS') return 'Bekas Original';
  if (normalized === 'BARU') return 'Baru Sisa Proyek / Lelang';
  return 'Bekas Original';
}

function mapCategory(product: WooCommerceProduct): EquipmentCategory {
  return (product.categories?.[0]?.name?.trim() || 'Semua') as EquipmentCategory;
}

function parsePrice(product: WooCommerceProduct): number | null {
  const raw = product.price || product.regular_price;
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

function mapProduct(product: WooCommerceProduct): Product {
  const kodeUnit = getMeta(product, ['kode_unit']);
  const statusUnit = getMeta(product, ['status_unit']);
  const lokasiUnit = getMeta(product, ['lokasi_unit']);
  const kondisiUnit = getMeta(product, ['kondisi_unit']);
  const linkTelegram = getMeta(product, ['link_telegram']);
  const summary = stripHtml(product.short_description || '') || stripHtml(product.description || '');
  const description = stripHtml(product.description || '');

  return {
    id: String(product.id),
    slug: product.slug || undefined,
    sku: kodeUnit || product.sku || `BBK-${product.id}`,
    name: stripHtml(product.name || ''), category: mapCategory(product), brand: 'Tidak tercantum',
    price: parsePrice(product), originalPriceEstimate: null, status: mapStatus(statusUnit),
    condition: mapCondition(kondisiUnit), conditionRating: 0, location: lokasiUnit || 'Tidak tercantum',
    powerType: 'Manual / Tanpa Daya', powerWattage: undefined, dimensions: undefined, material: undefined,
    summary, description, testedFunctions: [], images: (product.images || []).map((image) => image.src).filter(Boolean),
    dateAdded: product.date_created || product.date_modified || new Date().toISOString(),
    previousUsage: kondisiUnit || undefined, adminTelegramRef: linkTelegram || undefined, featured: false,
  };
}

function appendQueryParam(url: URL, key: string, value: string | number | boolean | undefined): void {
  if (value === undefined || value === null) return;
  const stringValue = String(value).trim();
  if (stringValue) url.searchParams.set(key, stringValue);
}

let latestProductsRequestId = 0;
let latestProductsRequestPromise: Promise<WooCommerceProductsResult> | null = null;

export async function getWooCommerceProducts(options?: WooCommerceProductsQuery): Promise<Product[]> {
  return (await getWooCommerceProductsResult(options)).products;
}

export async function getWooCommerceProductsResult(options?: WooCommerceProductsQuery): Promise<WooCommerceProductsResult> {
  const requestId = ++latestProductsRequestId;

  const requestPromise = (async (): Promise<WooCommerceProductsResult> => {
    const url = new URL('/api/products', 'http://localhost');
    appendQueryParam(url, 'status', 'publish');
    appendQueryParam(url, 'per_page', options?.perPage ?? 8);
    appendQueryParam(url, 'page', options?.page ?? 1);
    appendQueryParam(url, 'search', options?.search);
    appendQueryParam(url, 'slug', options?.slug);
    appendQueryParam(url, 'category', options?.category);
    appendQueryParam(url, 'condition', options?.condition);
    appendQueryParam(url, 'location', options?.location);
    appendQueryParam(url, 'power_type', options?.powerType);
    appendQueryParam(url, 'status_unit', options?.statusFilter === 'READY_ONLY' ? 'READY' : options?.statusFilter === 'INCLUDE_SOLD' ? 'READY,DP,SOLD' : undefined);
    appendQueryParam(url, 'stock_status', options?.stockStatus);
    appendQueryParam(url, 'orderby', options?.orderby);
    appendQueryParam(url, 'order', options?.order);
    appendQueryParam(url, 'sku', options?.sku);
    appendQueryParam(url, 'featured', options?.featured);
    appendQueryParam(url, 'min_price', options?.minPrice ?? (options?.minPriceNumber != null ? String(options.minPriceNumber) : undefined));
    appendQueryParam(url, 'max_price', options?.maxPrice ?? (options?.maxPriceNumber != null ? String(options.maxPriceNumber) : undefined));
    appendQueryParam(url, 'tag', options?.tag);
    appendQueryParam(url, 'attribute', options?.attribute);
    appendQueryParam(url, 'attribute_term', options?.attributeTerm);

    const response = await fetch(url.toString().replace('http://localhost', ''), { headers: { Accept: 'application/json' }, cache: 'no-store' });
    if (!response.ok) throw new Error(`WooCommerce proxy gagal: ${response.status} ${response.statusText}`);

    const products = (await response.json()) as WooCommerceProduct[];
    const total = response.headers.get('X-WP-Total') ? Number(response.headers.get('X-WP-Total')) : null;
    const totalPages = response.headers.get('X-WP-TotalPages') ? Number(response.headers.get('X-WP-TotalPages')) : null;
    return { products: products.map(mapProduct), total: Number.isFinite(total) ? total : null, totalPages: Number.isFinite(totalPages) ? totalPages : null };
  })();

  latestProductsRequestPromise = requestPromise;
  const result = await requestPromise;

  // If another catalog/filter request started while this one was in flight,
  // return the newest request result so an older response cannot overwrite it.
  if (requestId !== latestProductsRequestId && latestProductsRequestPromise) {
    return latestProductsRequestPromise;
  }

  return result;
}

export async function getWooCommerceProductById(id: string | number): Promise<Product> {
  throw new Error(`getWooCommerceProductById belum dipindahkan ke server-side proxy: ${id}`);
}
