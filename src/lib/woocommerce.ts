import type {
  AvailabilityStatus,
  EquipmentCategory,
  Product,
  ProductCondition,
} from '../types';

const WOOCOMMERCE_API_URL =
  'https://www.bukanbarukitchen.com/wp-json/wc/v3';

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
  stock_status: string;
  date_created?: string;
  meta_data?: WooCommerceMeta[];
}

function getMeta(product: WooCommerceProduct, key: string): string {
  const value = product.meta_data?.find((item) => item.key === key)?.value;
  return value === null || value === undefined ? '' : String(value);
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

  if (normalized === 'SOLD') return 'SOLD';
  if (normalized === 'BOOKED') return 'BOOKED';
  if (normalized === 'CONFIRMING') return 'CONFIRMING';
  if (normalized === 'READY') return 'READY';

  return stockStatus === 'instock' ? 'READY' : 'SOLD';
}

function mapCondition(value: string, name: string): ProductCondition {
  const normalized = `${value} ${name}`.toLowerCase();

  if (normalized.includes('rekondisi')) return 'Rekondisi Siap Pakai';
  if (normalized.includes('ex-display') || normalized.includes('ex display')) {
    return 'Like New / Ex-Display';
  }
  if (normalized.includes('baru')) return 'Baru Sisa Proyek / Lelang';

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
  const status = getMeta(product, 'status_unit');
  const condition = getMeta(product, 'kondisi_unit');
  const location = getMeta(product, 'lokasi_unit') || 'Hubungi Admin';
  const summary = stripHtml(product.short_description) || stripHtml(product.description);
  const description = stripHtml(product.description);
  const categoryName = product.categories?.[0]?.name || '';

  return {
    id: String(product.id),
    sku: product.sku || getMeta(product, 'kode_unit') || `BBK-${product.id}`,
    name: stripHtml(product.name),
    category: mapCategory(categoryName, product.name),
    brand: 'BBKitchen',
    price: parsePrice(product),
    originalPriceEstimate: null,
    status: mapStatus(status, product.stock_status),
    condition: mapCondition(condition, product.name),
    conditionRating: 8.5,
    location,
    powerType: mapPowerType(product),
    powerWattage: undefined,
    dimensions: undefined,
    material: undefined,
    summary,
    description,
    testedFunctions: [],
    images: (product.images || []).map((image) => image.src),
    dateAdded: product.date_created || new Date().toISOString(),
    previousUsage: condition.toLowerCase().includes('bekas')
      ? 'Unit bekas restoran / usaha kuliner'
      : undefined,
    featured: false,
  };
}

export async function getWooCommerceProducts(options?: {
  perPage?: number;
  page?: number;
}): Promise<Product[]> {
  const perPage = options?.perPage ?? 24;
  const page = options?.page ?? 1;

  const url = new URL(`${WOOCOMMERCE_API_URL}/products`);
  url.searchParams.set('status', 'publish');
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('page', String(page));

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
    },
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(
      `WooCommerce API gagal: ${response.status} ${response.statusText}`,
    );
  }

  const products = (await response.json()) as WooCommerceProduct[];
  return products.map(mapProduct);
}

export async function getWooCommerceProductById(
  id: string | number,
): Promise<Product> {
  const response = await fetch(
    `${WOOCOMMERCE_API_URL}/products/${encodeURIComponent(String(id))}`,
    {
      headers: {
        Accept: 'application/json',
      },
      next: {
        revalidate: 60,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `WooCommerce product gagal diambil: ${response.status} ${response.statusText}`,
    );
  }

  const product = (await response.json()) as WooCommerceProduct;
  return mapProduct(product);
}
