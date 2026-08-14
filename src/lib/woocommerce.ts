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
  name: string;
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
  meta_data?: WooCommerceMeta[];
}

function normalizeKey(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\s-]+/g, '_');
}

function getMeta(product: WooCommerceProduct, keys: string[]): string {
  const normalizedKeys = keys.map(normalizeKey);
  const item = product.meta_data?.find((entry) =>
    normalizedKeys.includes(normalizeKey(entry.key)),
  );

  if (item?.value === null || item?.value === undefined) return '';
  return String(item.value).trim();
}

function getAttribute(product: WooCommerceProduct, keys: string[]): string {
  const normalizedKeys = keys.map(normalizeKey);
  const attribute = product.attributes?.find((entry) =>
    normalizedKeys.includes(normalizeKey(entry.name)),
  );

  if (!attribute) return '';

  if (attribute.option?.trim()) return attribute.option.trim();
  if (attribute.options?.length) return attribute.options.join(', ').trim();

  return '';
}

function getProductField(
  product: WooCommerceProduct,
  metaKeys: string[],
  attributeKeys: string[] = metaKeys,
): string {
  return getMeta(product, metaKeys) || getAttribute(product, attributeKeys);
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function mapStatus(value: string, stockStatus: string): AvailabilityStatus {
  const normalized = value.trim().toUpperCase();

  if (normalized === 'SOLD' || normalized === 'TERJUAL') return 'SOLD';
  if (normalized === 'BOOKED' || normalized === 'DIBOOKING') return 'BOOKED';
  if (normalized === 'CONFIRMING' || normalized === 'KONFIRMASI') return 'CONFIRMING';
  if (normalized === 'READY' || normalized === 'TERSEDIA' || normalized === 'AVAILABLE') {
    return 'READY';
  }

  return stockStatus === 'instock' ? 'READY' : 'SOLD';
}

function mapCondition(value: string, name: string): ProductCondition {
  const normalized = value.trim().toLowerCase();

  if (normalized.includes('rekondisi')) return 'Rekondisi Siap Pakai';
  if (
    normalized.includes('ex-display') ||
    normalized.includes('ex display') ||
    normalized.includes('ex-display / like new') ||
    normalized.includes('like new')
  ) {
    return 'Like New / Ex-Display';
  }
  if (
    normalized.includes('baru') ||
    normalized.includes('new') ||
    normalized.includes('sisa proyek') ||
    normalized.includes('lelang')
  ) {
    return 'Baru Sisa Proyek / Lelang';
  }
  if (normalized.includes('bekas') || normalized.includes('second') || normalized.includes('used')) {
    return 'Bekas Original';
  }

  const nameFallback = name.toLowerCase();
  if (nameFallback.includes('rekondisi')) return 'Rekondisi Siap Pakai';
  if (nameFallback.includes('ex-display') || nameFallback.includes('ex display')) {
    return 'Like New / Ex-Display';
  }
  if (nameFallback.includes('baru')) return 'Baru Sisa Proyek / Lelang';

  return 'Bekas Original';
}

function mapCategory(categoryName: string, productName: string): EquipmentCategory {
  const value = `${categoryName} ${productName}`.toLowerCase();

  if (value.includes('kompor') || value.includes('burner') || value.includes('range')) {
    return 'Kompor & Burner';
  }
  if (value.includes('fryer')) return 'Deep Fryer';
  if (value.includes('oven') || value.includes('bakery')) return 'Oven & Bakery';
  if (value.includes('chiller') || value.includes('freezer')) return 'Chiller & Freezer';
  if (value.includes('showcase') || value.includes('display')) return 'Showcase & Display';
  if (value.includes('exhaust') || value.includes('blower')) return 'Exhaust & Blower';
  if (value.includes('mixer') || value.includes('mesin')) return 'Mesin Pemroses Makanan';
  if (value.includes('ice maker') || value.includes('ice machine')) return 'Ice Maker & Minuman';
  if (value.includes('sink') || value.includes('washing')) return 'Washing & Sink';

  return 'Stainless Fabrication';
}

function mapPowerType(product: WooCommerceProduct): Product['powerType'] {
  const explicitPowerType = getProductField(
    product,
    ['power_type', 'jenis_daya', 'sumber_daya'],
    ['Power Type', 'Jenis Daya', 'Sumber Daya'],
  ).toLowerCase();

  if (explicitPowerType.includes('gas') && explicitPowerType.includes('listrik')) {
    return 'Gas & Listrik';
  }
  if (explicitPowerType.includes('gas') || explicitPowerType.includes('lpg')) {
    return 'Gas';
  }
  if (explicitPowerType.includes('listrik') || explicitPowerType.includes('electric')) {
    return 'Listrik';
  }
  if (explicitPowerType.includes('manual') || explicitPowerType.includes('tanpa daya')) {
    return 'Manual / Tanpa Daya';
  }

  const text = `${product.name} ${stripHtml(product.description)}`.toLowerCase();

  if (text.includes('gas') && (text.includes('listrik') || text.includes('220v'))) {
    return 'Gas & Listrik';
  }
  if (text.includes('gas') || text.includes('lpg')) return 'Gas';
  if (text.includes('listrik') || text.includes('220v')) return 'Listrik';

  return 'Manual / Tanpa Daya';
}

function parsePrice(product: WooCommerceProduct): number | null {
  const raw = product.price || product.regular_price;
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function mapProduct(product: WooCommerceProduct): Product {
  const statusValue = getProductField(
    product,
    ['status_unit', 'status', 'availability_status', 'ketersediaan'],
    ['Status Unit', 'Status', 'Availability Status', 'Ketersediaan'],
  );

  const conditionValue = getProductField(
    product,
    ['kondisi_unit', 'kondisi', 'condition'],
    ['Kondisi Unit', 'Kondisi', 'Condition'],
  );

  const brand = getProductField(
    product,
    ['brand', 'merek', 'merk'],
    ['Brand', 'Merek', 'Merk'],
  );

  const location = getProductField(
    product,
    ['lokasi_unit', 'lokasi', 'location'],
    ['Lokasi Unit', 'Lokasi', 'Location'],
  ) || 'Hubungi Admin';

  const dimensions = getProductField(
    product,
    ['dimensi', 'dimensions', 'ukuran'],
    ['Dimensi', 'Dimensions', 'Ukuran'],
  );

  const material = getProductField(
    product,
    ['material', 'bahan'],
    ['Material', 'Bahan'],
  );

  const powerWattage = getProductField(
    product,
    ['power_wattage', 'daya', 'wattage', 'spesifikasi_daya'],
    ['Power Wattage', 'Daya', 'Wattage', 'Spesifikasi Daya'],
  );

  const summary = stripHtml(product.short_description) || stripHtml(product.description);
  const description = stripHtml(product.description);
  const categoryName = product.categories?.[0]?.name || '';
  const status = mapStatus(statusValue, product.stock_status);
  const condition = mapCondition(conditionValue, product.name);

  return {
    id: String(product.id),
    sku: product.sku || getProductField(product, ['kode_unit', 'sku_unit'], ['Kode Unit', 'SKU Unit']) || `BBK-${product.id}`,
    name: stripHtml(product.name),
    category: mapCategory(categoryName, product.name),
    brand: brand || 'Tidak tercantum',
    price: parsePrice(product),
    originalPriceEstimate: null,
    status,
    condition,
    conditionRating: 8.5,
    location,
    powerType: mapPowerType(product),
    powerWattage: powerWattage || undefined,
    dimensions: dimensions || undefined,
    material: material || undefined,
    summary,
    description,
    testedFunctions: [],
    images: (product.images || []).map((image) => image.src),
    dateAdded: product.date_created || new Date().toISOString(),
    previousUsage: conditionValue ? conditionValue : undefined,
    featured: false,
  };
}

export async function getWooCommerceProducts(options?: {
  perPage?: number;
  page?: number;
}): Promise<Product[]> {
  const perPage = options?.perPage ?? 24;
  const page = options?.page ?? 1;

  const url = new URL('/api/products', 'http://localhost');
  url.searchParams.set('status', 'publish');
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('page', String(page));

  const response = await fetch(url.toString().replace('http://localhost', ''), {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(
      `WooCommerce proxy gagal: ${response.status} ${response.statusText}`,
    );
  }

  const products = (await response.json()) as WooCommerceProduct[];
  return products.map(mapProduct);
}

export async function getWooCommerceProductById(
  id: string | number,
): Promise<Product> {
  throw new Error(
    `getWooCommerceProductById belum dipindahkan ke server-side proxy: ${id}`,
  );
}
