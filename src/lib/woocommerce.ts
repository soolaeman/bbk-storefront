import type {
  AvailabilityStatus,
  EquipmentCategory,
  Product,
  ProductCondition,
} from '../types';

interface WooCommerceMeta {
  key: string;
  value: string | number | boolean | null;
}

interface WooCommerceImage {
  src: string;
}

interface WooCommerceCategory {
  id?: number;
  name: string;
  slug?: string;
}

interface WooCommerceAttribute {
  name: string;
  option?: string;
  options?: string[];
}

interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: string;
  regular_price: string;
  short_description: string;
  description: string;
  images: WooCommerceImage[];
  categories: WooCommerceCategory[];
  attributes?: WooCommerceAttribute[];
  stock_status: string;
  date_created?: string;
  date_modified?: string;
  meta_data?: WooCommerceMeta[];
}

export interface WooCommerceProductsQuery {
  perPage?: number;
  page?: number;
  search?: string;
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
}

export interface WooCommerceProductsResult {
  products: Product[];
  total: number | null;
  totalPages: number | null;
}

function normalizeKey(value: string): string {
  return value.toLowerCase().trim().replace(/[\s-]+/g, '_');
}

function getMeta(product: WooCommerceProduct, keys: string[]): string {
  const normalizedKeys = keys.map(normalizeKey);
  const item = product.meta_data?.find((entry) => normalizedKeys.includes(normalizeKey(entry.key)));
  if (item?.value === null || item?.value === undefined) return '';
  return String(item.value).trim();
}

function getAttribute(product: WooCommerceProduct, keys: string[]): string {
  const normalizedKeys = keys.map(normalizeKey);
  const attribute = product.attributes?.find((entry) => normalizedKeys.includes(normalizeKey(entry.name)));
  if (!attribute) return '';
  if (attribute.option?.trim()) return attribute.option.trim();
  if (attribute.options?.length) return attribute.options.join(', ').trim();
  return '';
}

function getProductField(product: WooCommerceProduct, metaKeys: string[], attributeKeys: string[] = metaKeys): string {
  return getMeta(product, metaKeys) || getAttribute(product, attributeKeys);
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/\s+/g, ' ').trim();
}

function mapStatus(value: string, stockStatus: string): AvailabilityStatus {
  const normalized = value.trim().toUpperCase();
  if (normalized) return normalized as AvailabilityStatus;
  return stockStatus === 'instock' ? 'READY' : 'SOLD';
}

function mapCondition(value: string): ProductCondition {
  return value.trim() as ProductCondition;
}

function mapCategory(product: WooCommerceProduct): EquipmentCategory {
  return (product.categories?.[0]?.name?.trim() || 'Semua') as EquipmentCategory;
}

function mapPowerType(product: WooCommerceProduct): Product['powerType'] {
  const value = getProductField(product, ['power_type', 'jenis_daya', 'sumber_daya', 'tipe_daya'], ['Power Type', 'Jenis Daya', 'Sumber Daya', 'Tipe Daya']);
  return (value.trim() || 'Manual / Tanpa Daya') as Product['powerType'];
}

function parsePrice(product: WooCommerceProduct): number | null {
  const raw = product.price || product.regular_price;
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

function mapProduct(product: WooCommerceProduct): Product {
  const kodeUnit = getProductField(product, ['kode_unit', 'sku_unit'], ['Kode Unit', 'SKU Unit']);
  const statusUnit = getProductField(product, ['status_unit', 'availability_status', 'ketersediaan'], ['Status Unit', 'Availability Status', 'Ketersediaan']);
  const lokasiUnit = getProductField(product, ['lokasi_unit', 'lokasi', 'location'], ['Lokasi Unit', 'Lokasi', 'Location']);
  const kondisiUnit = getProductField(product, ['kondisi_unit', 'kondisi', 'condition'], ['Kondisi Unit', 'Kondisi', 'Condition']);
  const linkTelegram = getProductField(product, ['link_telegram', 'telegram', 'telegram_link'], ['Link Telegram', 'Telegram', 'Telegram Link']);
  const brand = getProductField(product, ['brand', 'merek', 'merk'], ['Brand', 'Merek', 'Merk']);
  const dimensions = getProductField(product, ['dimensi', 'dimensions', 'ukuran'], ['Dimensi', 'Dimensions', 'Ukuran']);
  const material = getProductField(product, ['material', 'bahan'], ['Material', 'Bahan']);
  const powerWattage = getProductField(product, ['power_wattage', 'daya', 'wattage', 'spesifikasi_daya'], ['Power Wattage', 'Daya', 'Wattage', 'Spesifikasi Daya']);
  const testedFunctionsRaw = getProductField(product, ['tested_functions', 'fungsi_teruji', 'hasil_inspeksi', 'uji_fungsi'], ['Tested Functions', 'Fungsi Teruji', 'Hasil Inspeksi', 'Uji Fungsi']);

  const summary = stripHtml(product.short_description || '') || stripHtml(product.description || '');
  const description = stripHtml(product.description || '');
  const status = mapStatus(statusUnit, product.stock_status);
  const condition = mapCondition(kondisiUnit);
  const category = mapCategory(product);
  const powerType = mapPowerType(product);
  const images = (product.images || []).map((image) => image.src).filter(Boolean);
  const testedFunctions = testedFunctionsRaw ? testedFunctionsRaw.split(/\r?\n|[,;|]/).map((item) => item.trim()).filter(Boolean) : [];

  return {
    id: String(product.id),
    sku: kodeUnit || product.sku || `BBK-${product.id}`,
    name: stripHtml(product.name || ''),
    category,
    brand: brand || 'Tidak tercantum',
    price: parsePrice(product),
    originalPriceEstimate: null,
    status,
    condition,
    conditionRating: 0,
    location: lokasiUnit || 'Tidak tercantum',
    powerType,
    powerWattage: powerWattage || undefined,
    dimensions: dimensions || undefined,
    material: material || undefined,
    summary,
    description,
    testedFunctions,
    images,
    dateAdded: product.date_created || product.date_modified || new Date().toISOString(),
    previousUsage: kondisiUnit || undefined,
    adminTelegramRef: linkTelegram || undefined,
    featured: false,
  };
}

function appendQueryParam(url: URL, key: string, value: string | number | boolean | undefined): void {
  if (value === undefined || value === null) return;
  const stringValue = String(value).trim();
  if (!stringValue) return;
  url.searchParams.set(key, stringValue);
}

export async function getWooCommerceProducts(options?: WooCommerceProductsQuery): Promise<Product[]> {
  const result = await getWooCommerceProductsResult(options);
  return result.products;
}

export async function getWooCommerceProductsResult(options?: WooCommerceProductsQuery): Promise<WooCommerceProductsResult> {
  const url = new URL('/api/products', 'http://localhost');
  appendQueryParam(url, 'status', 'publish');
  appendQueryParam(url, 'per_page', options?.perPage ?? 8);
  appendQueryParam(url, 'page', options?.page ?? 1);
  appendQueryParam(url, 'search', options?.search);
  appendQueryParam(url, 'category', options?.category);
  appendQueryParam(url, 'stock_status', options?.stockStatus);
  appendQueryParam(url, 'orderby', options?.orderby);
  appendQueryParam(url, 'order', options?.order);
  appendQueryParam(url, 'sku', options?.sku);
  appendQueryParam(url, 'featured', options?.featured);
  appendQueryParam(url, 'min_price', options?.minPrice);
  appendQueryParam(url, 'max_price', options?.maxPrice);
  appendQueryParam(url, 'tag', options?.tag);
  appendQueryParam(url, 'attribute', options?.attribute);
  appendQueryParam(url, 'attribute_term', options?.attributeTerm);

  const response = await fetch(url.toString().replace('http://localhost', ''), {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`WooCommerce proxy gagal: ${response.status} ${response.statusText}`);
  }

  const products = (await response.json()) as WooCommerceProduct[];
  const totalHeader = response.headers.get('X-WP-Total');
  const totalPagesHeader = response.headers.get('X-WP-TotalPages');
  const total = totalHeader ? Number(totalHeader) : null;
  const totalPages = totalPagesHeader ? Number(totalPagesHeader) : null;

  return {
    products: products.map(mapProduct),
    total: Number.isFinite(total) ? total : null,
    totalPages: Number.isFinite(totalPages) ? totalPages : null,
  };
}

export async function getWooCommerceProductById(id: string | number): Promise<Product> {
  throw new Error(`getWooCommerceProductById belum dipindahkan ke server-side proxy: ${id}`);
}
