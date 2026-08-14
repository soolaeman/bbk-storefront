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

function normalizeKey(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\\s-]+/g, '_');
}

function getMeta(
  product: WooCommerceProduct,
  keys: string[],
): string {
  const normalizedKeys = keys.map(normalizeKey);

  const item = product.meta_data?.find((entry) =>
    normalizedKeys.includes(normalizeKey(entry.key)),
  );

  if (item?.value === null || item?.value === undefined) {
    return '';
  }

  return String(item.value).trim();
}

function getAttribute(
  product: WooCommerceProduct,
  keys: string[],
): string {
  const normalizedKeys = keys.map(normalizeKey);

  const attribute = product.attributes?.find((entry) =>
    normalizedKeys.includes(normalizeKey(entry.name)),
  );

  if (!attribute) {
    return '';
  }

  if (attribute.option?.trim()) {
    return attribute.option.trim();
  }

  if (attribute.options?.length) {
    return attribute.options.join(', ').trim();
  }

  return '';
}

function getProductField(
  product: WooCommerceProduct,
  metaKeys: string[],
  attributeKeys: string[] = metaKeys,
): string {
  return (
    getMeta(product, metaKeys) ||
    getAttribute(product, attributeKeys)
  );
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

/**
 * IMPORTANT:
 * WooCommerce/ACF adalah source of truth.
 *
 * Jangan lagi melakukan fallback berbasis nama produk,
 * deskripsi, keyword, atau stock_status untuk mengganti
 * nilai metadata bisnis yang sudah tersedia.
 */
function mapStatus(
  value: string,
  stockStatus: string,
): AvailabilityStatus {
  const normalized = value.trim().toUpperCase();

  if (normalized) {
    return normalized as AvailabilityStatus;
  }

  // Hanya fallback ketika ACF/meta status memang kosong.
  return stockStatus === 'instock'
    ? 'READY'
    : 'SOLD';
}

/**
 * Kondisi diambil langsung dari ACF/meta.
 *
 * Tidak lagi menebak kondisi dari nama produk.
 */
function mapCondition(
  value: string,
): ProductCondition {
  return value.trim() as ProductCondition;
}

/**
 * Category sekarang mengambil kategori WooCommerce ASLI.
 *
 * Tidak lagi:
 * - mencocokkan keyword nama produk
 * - memaksa "sink" menjadi Washing & Sink
 * - memaksa semua yang tidak dikenal menjadi Stainless Fabrication
 */
function mapCategory(
  product: WooCommerceProduct,
): EquipmentCategory {
  const category = product.categories?.[0]?.name?.trim() || 'Semua';

  return category as EquipmentCategory;
}

/**
 * Power type hanya mengambil field ACF/meta.
 *
 * Tidak menebak dari description atau nama produk.
 */
function mapPowerType(
  product: WooCommerceProduct,
): Product['powerType'] {
  const value = getProductField(
    product,
    [
      'power_type',
      'jenis_daya',
      'sumber_daya',
      'tipe_daya',
    ],
    [
      'Power Type',
      'Jenis Daya',
      'Sumber Daya',
      'Tipe Daya',
    ],
  );

  return (
    value.trim() ||
    'Manual / Tanpa Daya'
  ) as Product['powerType'];
}

function parsePrice(
  product: WooCommerceProduct,
): number | null {
  const raw = product.price || product.regular_price;

  if (!raw) {
    return null;
  }

  const value = Number(raw);

  return Number.isFinite(value)
    ? value
    : null;
}

function mapProduct(
  product: WooCommerceProduct,
): Product {
  /**
   * ================================
   * ACF / META SOURCE OF TRUTH
   * ================================
   */

  const kodeUnit = getProductField(
    product,
    ['kode_unit', 'sku_unit'],
    ['Kode Unit', 'SKU Unit'],
  );

  const statusUnit = getProductField(
    product,
    [
      'status_unit',
      'availability_status',
      'ketersediaan',
    ],
    [
      'Status Unit',
      'Availability Status',
      'Ketersediaan',
    ],
  );

  const lokasiUnit = getProductField(
    product,
    [
      'lokasi_unit',
      'lokasi',
      'location',
    ],
    [
      'Lokasi Unit',
      'Lokasi',
      'Location',
    ],
  );

  const kondisiUnit = getProductField(
    product,
    [
      'kondisi_unit',
      'kondisi',
      'condition',
    ],
    [
      'Kondisi Unit',
      'Kondisi',
      'Condition',
    ],
  );

  const linkTelegram = getProductField(
    product,
    [
      'link_telegram',
      'telegram',
      'telegram_link',
    ],
    [
      'Link Telegram',
      'Telegram',
      'Telegram Link',
    ],
  );

  const brand = getProductField(
    product,
    [
      'brand',
      'merek',
      'merk',
    ],
    [
      'Brand',
      'Merek',
      'Merk',
    ],
  );

  const dimensions = getProductField(
    product,
    [
      'dimensi',
      'dimensions',
      'ukuran',
    ],
    [
      'Dimensi',
      'Dimensions',
      'Ukuran',
    ],
  );

  const material = getProductField(
    product,
    [
      'material',
      'bahan',
    ],
    [
      'Material',
      'Bahan',
    ],
  );

  const powerWattage = getProductField(
    product,
    [
      'power_wattage',
      'daya',
      'wattage',
      'spesifikasi_daya',
    ],
    [
      'Power Wattage',
      'Daya',
      'Wattage',
      'Spesifikasi Daya',
    ],
  );

  const testedFunctionsRaw = getProductField(
    product,
    [
      'tested_functions',
      'fungsi_teruji',
      'hasil_inspeksi',
      'uji_fungsi',
    ],
    [
      'Tested Functions',
      'Fungsi Teruji',
      'Hasil Inspeksi',
      'Uji Fungsi',
    ],
  );

  /**
   * ================================
   * WOOCOMMERCE NATIVE DATA
   * ================================
   */

  const summary =
    stripHtml(product.short_description || '') ||
    stripHtml(product.description || '');

  const description = stripHtml(
    product.description || '',
  );

  const status = mapStatus(
    statusUnit,
    product.stock_status,
  );

  const condition = mapCondition(
    kondisiUnit,
  );

  const category = mapCategory(
    product,
  );

  const powerType = mapPowerType(
    product,
  );

  const images = (
    product.images || []
  )
    .map((image) => image.src)
    .filter(Boolean);

  const testedFunctions = testedFunctionsRaw
    ? testedFunctionsRaw
        .split(/\r?\n|[,;|]/)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  return {
    id: String(product.id),

    /**
     * Prefer ACF kode_unit.
     * WooCommerce SKU menjadi fallback teknis.
     */
    sku:
      kodeUnit ||
      product.sku ||
      `BBK-${product.id}`,

    name: stripHtml(
      product.name || '',
    ),

    /**
     * RAW WooCommerce category.
     *
     * Jangan normalisasi di sini.
     */
    category,

    brand:
      brand ||
      'Tidak tercantum',

    price: parsePrice(
      product,
    ),

    originalPriceEstimate:
      null,

    /**
     * RAW ACF status_unit.
     */
    status,

    /**
     * RAW ACF kondisi_unit.
     */
    condition,

    /**
     * Kondisi rating belum tersedia
     * sebagai field ACF yang terverifikasi.
     * Jangan mengarang rating.
     */
    conditionRating: 0,

    /**
     * RAW ACF lokasi_unit.
     */
    location:
      lokasiUnit ||
      'Tidak tercantum',

    /**
     * RAW ACF sumber daya.
     */
    powerType,

    powerWattage:
      powerWattage ||
      undefined,

    dimensions:
      dimensions ||
      undefined,

    material:
      material ||
      undefined,

    summary,

    description,

    testedFunctions,

    images,

    dateAdded:
      product.date_created ||
      product.date_modified ||
      new Date().toISOString(),

    /**
     * Simpan kondisi asli ACF
     * sebagai previousUsage untuk sementara,
     * sampai model Product berikutnya memiliki
     * field metadata ACF khusus.
     */
    previousUsage:
      kondisiUnit ||
      undefined,

    /**
     * Link Telegram berasal dari ACF/meta.
     *
     * Field ini sudah tersedia di Product model
     * untuk kebutuhan admin/reference.
     */
    adminTelegramRef:
      linkTelegram ||
      undefined,

    featured: false,
  };
}

export async function getWooCommerceProducts(
  options?: {
    perPage?: number;
    page?: number;
  },
): Promise<Product[]> {
  const perPage =
    options?.perPage ?? 24;

  const page =
    options?.page ?? 1;

  const url = new URL(
    '/api/products',
    'http://localhost',
  );

  url.searchParams.set(
    'status',
    'publish',
  );

  url.searchParams.set(
    'per_page',
    String(perPage),
  );

  url.searchParams.set(
    'page',
    String(page),
  );

  const response = await fetch(
    url.toString().replace(
      'http://localhost',
      '',
    ),
    {
      headers: {
        Accept:
          'application/json',
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error(
      `WooCommerce proxy gagal: ${response.status} ${response.statusText}`,
    );
  }

  const products =
    (await response.json()) as WooCommerceProduct[];

  return products.map(
    mapProduct,
  );
}

export async function getWooCommerceProductById(
  id: string | number,
): Promise<Product> {
  throw new Error(
    `getWooCommerceProductById belum dipindahkan ke server-side proxy: ${id}`,
  );
}
