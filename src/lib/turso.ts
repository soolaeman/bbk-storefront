import { createClient } from '@libsql/client';
import type { AvailabilityStatus, EquipmentCategory, Product, ProductCondition } from '../types';

const TURSO_URL = process.env.TURSO_DATABASE_URL || 'libsql://bbk-soolaeman.aws-ap-northeast-1.turso.io';
const TURSO_AUTH_TOKEN =
  process.env.TURSO_AUTH_TOKEN ||
  'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODk4MjI2ODcsImlkIjoiMDFhMGI5YmQtZTIwMS03ZjUxLWExMDQtMzk5NzlkNjAzMTNiIiwia2lkIjoickFjZFotQXpjdjkwZE5pLWd6aHF4ZWZPN1dzNTJnMjB3VmNtQld1bS1UcyIsInJpZCI6IjgwYzI0OTQ1LTRmMDctNGYwNy05YzJkLTdhYmFlZGFjMzNlYSJ9.qavUPG-VqnaFxPUHsi7OV_7uesPTMk2K3Tn35YueMnq4hR0KJDhZ-rc4zzCpatWWovjCCJQ0LTpINp_KRC2vCA';

export const R2_PHOTO_BASE_URL = (
  process.env.NEXT_PUBLIC_R2_PHOTO_BASE_URL ||
  'https://pub-946d1fe1a1b1461eb2cca6be4462ba11.r2.dev'
).replace(/\/$/, '');

let clientInstance: ReturnType<typeof createClient> | null = null;

export function getTursoClient() {
  if (!clientInstance) {
    clientInstance = createClient({
      url: TURSO_URL,
      authToken: TURSO_AUTH_TOKEN,
    });
  }
  return clientInstance;
}

export function stripHtml(value: string): string {
  if (!value) return '';
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

export function toTitleCase(value: string): string {
  if (!value) return '';
  return value
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getR2PhotoUrl(sku: string, index = 1): string {
  return `${R2_PHOTO_BASE_URL}/${sku}_${index}.webp`;
}

export function extractSlugFromLink(linkUnit: string | null | undefined, fallbackSku: string): string {
  if (linkUnit) {
    const trimmed = linkUnit.replace(/\/$/, '');
    const parts = trimmed.split('/');
    const last = parts[parts.length - 1];
    if (last && last.trim()) return last.trim().toLowerCase();
  }
  return fallbackSku.toLowerCase();
}

export function mapRowToProduct(row: Record<string, any>, isAdmin = false): Product {
  const sku = String(row.sku || '').trim();
  const title = String(row.title || '').trim();
  const statusUnit = String(row.status_unit || '').trim().toUpperCase();
  const kondisiUnit = String(row.kondisi_unit || '').trim().toUpperCase();
  const lokasiUnit = String(row.lokasi_unit || '').trim();
  const shortDesc = String(row.short_description || '').trim();
  const fullDesc = String(row.full_description || '').trim();
  const linkUnit = String(row.link_unit || '');
  const linkTelegram = String(row.link_telegram || '');
  const slug = extractSlugFromLink(linkUnit, sku);

  // Status mapping
  let status: AvailabilityStatus = 'READY';
  if (statusUnit === 'SOLD') status = 'SOLD';
  else if (statusUnit === 'DP' || statusUnit === 'CONFIRMING') status = 'CONFIRMING';
  else if (statusUnit === 'BOOKED') status = 'BOOKED';

  // Condition mapping
  let condition: ProductCondition = 'Bekas Original';
  if (kondisiUnit === 'BARU') condition = 'Baru Sisa Proyek / Lelang';

  // Category mapping
  let categoryName = 'Peralatan Dapur';
  if (row.child_name) {
    categoryName = toTitleCase(String(row.child_name));
  } else if (row.parent_name) {
    categoryName = toTitleCase(String(row.parent_name));
  } else if (row.category_slug) {
    categoryName = toTitleCase(String(row.category_slug).replace(/-/g, ' '));
  }

  // Cloudflare R2 WebP images
  const photoUrlsStr = String(row.photo_urls || '');
  let imageCount = 1;
  if (photoUrlsStr) {
    const parts = photoUrlsStr.split(',').map((p) => p.trim()).filter(Boolean);
    if (parts.length > 1) imageCount = parts.length;
  }
  const images: string[] = [];
  for (let i = 1; i <= imageCount; i++) {
    images.push(getR2PhotoUrl(sku, i));
  }

  // Dimensions from title
  const dimMatch = title.match(/(\d+\s*x\s*\d+(?:\s*x\s*\d+)?)/i);
  const dimensions = dimMatch ? `${dimMatch[1].replace(/\s+/g, '')} cm` : undefined;

  // Power type detection
  const lowerTitle = title.toLowerCase();
  let powerType: 'Gas' | 'Listrik' | 'Manual / Tanpa Daya' | 'Gas & Listrik' = 'Manual / Tanpa Daya';
  if (lowerTitle.includes('listrik') && lowerTitle.includes('gas')) {
    powerType = 'Gas & Listrik';
  } else if (lowerTitle.includes('listrik') || lowerTitle.includes('watt') || lowerTitle.includes('volt')) {
    powerType = 'Listrik';
  } else if (
    lowerTitle.includes('gas') ||
    lowerTitle.includes('burner') ||
    lowerTitle.includes('kompor') ||
    lowerTitle.includes('kwali')
  ) {
    powerType = 'Gas';
  }

  // Public price is strictly null (zero public pricing). Admin gets buka WA price
  const adminPrice = row.harga_buka_wa ? Number(row.harga_buka_wa) : null;
  const price = isAdmin ? adminPrice : null;

  return {
    id: sku,
    slug,
    sku,
    name: title,
    category: categoryName as EquipmentCategory,
    brand: 'Tidak tercantum',
    price,
    originalPriceEstimate: null,
    status,
    condition,
    conditionRating: 0,
    location: lokasiUnit || 'Tidak tercantum',
    powerType,
    powerWattage: undefined,
    dimensions,
    material: lowerTitle.includes('stainless') ? 'Stainless Steel' : undefined,
    summary: stripHtml(shortDesc) || stripHtml(fullDesc),
    description: fullDesc || shortDesc,
    testedFunctions: [],
    images,
    dateAdded: row.tanggal_masuk || new Date().toISOString(),
    previousUsage: kondisiUnit || undefined,
    adminTelegramRef: linkTelegram || undefined,
    adminInternalNotes: row.status_pipeline ? `Pipeline: ${row.status_pipeline}` : undefined,
    featured: false,
  };
}

export interface WooCommerceImage {
  src: string;
  alt?: string;
}

export interface WooCommerceCategory {
  id?: number;
  name: string;
  slug?: string;
}

export interface WooCommerceMeta {
  key: string;
  value: string | number | boolean | null;
}

export interface WooCommerceProduct {
  id: number | string;
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
  date_modified?: string;
  meta_data?: WooCommerceMeta[];
}

export function mapRowToWooCommerceProduct(row: Record<string, any>): WooCommerceProduct {
  const sku = String(row.sku || '').trim();
  const title = String(row.title || '').trim();
  const statusUnit = String(row.status_unit || '').trim().toUpperCase();
  const kondisiUnit = String(row.kondisi_unit || '').trim().toUpperCase();
  const lokasiUnit = String(row.lokasi_unit || '').trim();
  const shortDesc = String(row.short_description || '').trim();
  const fullDesc = String(row.full_description || '').trim();
  const linkUnit = String(row.link_unit || '');
  const linkTelegram = String(row.link_telegram || '');
  const slug = extractSlugFromLink(linkUnit, sku);

  let categoryName = 'Peralatan Dapur';
  if (row.child_name) categoryName = toTitleCase(String(row.child_name));
  else if (row.parent_name) categoryName = toTitleCase(String(row.parent_name));
  else if (row.category_slug) categoryName = toTitleCase(String(row.category_slug).replace(/-/g, ' '));

  const photoUrlsStr = String(row.photo_urls || '');
  let imageCount = 1;
  if (photoUrlsStr) {
    const parts = photoUrlsStr.split(',').map((p) => p.trim()).filter(Boolean);
    if (parts.length > 1) imageCount = parts.length;
  }
  const images: WooCommerceImage[] = [];
  for (let i = 1; i <= imageCount; i++) {
    images.push({
      src: getR2PhotoUrl(sku, i),
      alt: `${title} - Bukan Baru Kitchen`,
    });
  }

  const stock_status = statusUnit === 'SOLD' ? 'outofstock' : 'instock';

  return {
    id: sku,
    name: title,
    slug,
    sku,
    price: '', // Strictly no public pricing
    regular_price: '',
    short_description: shortDesc,
    description: fullDesc || shortDesc,
    images,
    categories: [
      {
        id: Number(row.cat_id || 0),
        name: categoryName,
        slug: String(row.category_slug || ''),
      },
    ],
    stock_status,
    date_created: row.tanggal_masuk,
    meta_data: [
      { key: 'kode_unit', value: sku },
      { key: 'status_unit', value: statusUnit },
      { key: 'lokasi_unit', value: lokasiUnit },
      { key: 'kondisi_unit', value: kondisiUnit },
      { key: 'link_telegram', value: linkTelegram },
    ],
  };
}

export interface TursoProductsQuery {
  perPage?: number;
  page?: number;
  search?: string;
  slug?: string;
  category?: string;
  condition?: string;
  location?: string;
  powerType?: string;
  statusFilter?: 'ALL' | 'READY_ONLY' | 'INCLUDE_SOLD';
  stockStatus?: string;
  minPriceNumber?: number | null;
  maxPriceNumber?: number | null;
  sortBy?: 'latest' | 'price_low' | 'price_high' | 'condition';
  sku?: string;
  featured?: boolean;
  isAdmin?: boolean;
}

export interface TursoProductsResult {
  products: Product[];
  total: number;
  totalPages: number;
}

export async function queryTursoProducts(options?: TursoProductsQuery): Promise<TursoProductsResult> {
  const client = getTursoClient();
  const perPage = Math.max(1, Math.min(100, options?.perPage ?? 8));
  const page = Math.max(1, options?.page ?? 1);
  const offset = (page - 1) * perPage;

  const whereClauses: string[] = ['1=1'];
  const args: any[] = [];

  // SKU exact filter
  if (options?.sku) {
    whereClauses.push('p.sku = ?');
    args.push(options.sku.trim().toUpperCase());
  }

  // Slug filter
  if (options?.slug) {
    const s = options.slug.trim().toLowerCase();
    whereClauses.push("(p.sku = ? OR p.link_unit LIKE '%' || ? || '/' OR p.link_unit LIKE '%' || ?)");
    args.push(s.toUpperCase(), s, s);
  }

  // Search filter
  if (options?.search) {
    const q = `%${options.search.trim()}%`;
    whereClauses.push(
      '(p.sku LIKE ? OR p.title LIKE ? OR p.short_description LIKE ? OR p.full_description LIKE ?)'
    );
    args.push(q, q, q, q);
  }

  // Category filter
  if (options?.category && options.category.trim() && options.category !== 'Semua') {
    const cat = options.category.trim();
    const catPattern = `%${cat}%`;
    const catSlug = cat.toLowerCase().replace(/[\s&]+/g, '-');
    whereClauses.push(`(
      p.category_slug = ? OR
      c.child_slug = ? OR
      c.parent_slug = ? OR
      c.child_name LIKE ? OR
      c.parent_name LIKE ?
    )`);
    args.push(catSlug, catSlug, catSlug, catPattern, catPattern);
  }

  // Condition filter
  if (options?.condition && options.condition !== 'Semua Kondisi') {
    const cond = options.condition.trim().toUpperCase();
    if (cond.includes('BARU')) {
      whereClauses.push("p.kondisi_unit = 'BARU'");
    } else if (cond.includes('BEKAS') || cond.includes('REKONDISI')) {
      whereClauses.push("p.kondisi_unit = 'BEKAS'");
    }
  }

  // Location filter
  if (options?.location && options.location !== 'Semua Lokasi') {
    whereClauses.push('p.lokasi_unit = ?');
    args.push(options.location.trim());
  }

  // Status filter
  if (options?.statusFilter === 'READY_ONLY') {
    whereClauses.push("p.status_unit = 'READY'");
  } else if (options?.stockStatus === 'instock') {
    whereClauses.push("p.status_unit = 'READY'");
  } else if (options?.stockStatus === 'outofstock') {
    whereClauses.push("p.status_unit = 'SOLD'");
  }

  const whereSql = whereClauses.join(' AND ');

  // Sorting: READY is always prioritized before SOLD!
  let orderSql = 'CASE WHEN p.status_unit = \'SOLD\' THEN 1 ELSE 0 END ASC';
  if (options?.sortBy === 'price_low') {
    orderSql += ', p.harga_buka_wa ASC';
  } else if (options?.sortBy === 'price_high') {
    orderSql += ', p.harga_buka_wa DESC';
  } else {
    orderSql += ', p.tanggal_masuk DESC, p.sku DESC';
  }

  // Count total query
  const countSql = `
    SELECT COUNT(*) as total
    FROM products p
    LEFT JOIN categories c ON p.category_slug = c.child_slug
    WHERE ${whereSql}
  `;

  // Select items query
  const selectSql = `
    SELECT 
      p.sku, p.title, p.category_slug, p.status_unit, p.status_pipeline,
      p.lokasi_unit, p.kondisi_unit, p.short_description, p.full_description,
      p.photo_urls, p.link_unit, p.link_telegram, p.tanggal_masuk, p.harga_buka_wa,
      c.id as cat_id, c.parent_name, c.parent_slug, c.child_name, c.child_slug
    FROM products p
    LEFT JOIN categories c ON p.category_slug = c.child_slug
    WHERE ${whereSql}
    ORDER BY ${orderSql}
    LIMIT ? OFFSET ?
  `;

  try {
    const [countResult, selectResult] = await Promise.all([
      client.execute({ sql: countSql, args }),
      client.execute({ sql: selectSql, args: [...args, perPage, offset] }),
    ]);

    const total = Number(countResult.rows[0]?.total ?? 0);
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const products = selectResult.rows.map((row) =>
      mapRowToProduct(row as unknown as Record<string, any>, Boolean(options?.isAdmin))
    );

    return { products, total, totalPages };
  } catch (error) {
    console.error('Error querying Turso products:', error);
    return { products: [], total: 0, totalPages: 1 };
  }
}

export async function queryTursoWooCommerceProducts(
  options?: TursoProductsQuery
): Promise<{ products: WooCommerceProduct[]; total: number; totalPages: number }> {
  const client = getTursoClient();
  const perPage = Math.max(1, Math.min(100, options?.perPage ?? 8));
  const page = Math.max(1, options?.page ?? 1);
  const offset = (page - 1) * perPage;

  const whereClauses: string[] = ['1=1'];
  const args: any[] = [];

  if (options?.sku) {
    whereClauses.push('p.sku = ?');
    args.push(options.sku.trim().toUpperCase());
  }

  if (options?.slug) {
    const s = options.slug.trim().toLowerCase();
    whereClauses.push("(p.sku = ? OR p.link_unit LIKE '%' || ? || '/' OR p.link_unit LIKE '%' || ?)");
    args.push(s.toUpperCase(), s, s);
  }

  if (options?.search) {
    const q = `%${options.search.trim()}%`;
    whereClauses.push(
      '(p.sku LIKE ? OR p.title LIKE ? OR p.short_description LIKE ? OR p.full_description LIKE ?)'
    );
    args.push(q, q, q, q);
  }

  if (options?.category && options.category.trim() && options.category !== 'Semua') {
    const cat = options.category.trim();
    const catPattern = `%${cat}%`;
    const catSlug = cat.toLowerCase().replace(/[\s&]+/g, '-');
    whereClauses.push(`(
      p.category_slug = ? OR
      c.child_slug = ? OR
      c.parent_slug = ? OR
      c.child_name LIKE ? OR
      c.parent_name LIKE ?
    )`);
    args.push(catSlug, catSlug, catSlug, catPattern, catPattern);
  }

  if (options?.condition && options.condition !== 'Semua Kondisi') {
    const cond = options.condition.trim().toUpperCase();
    if (cond.includes('BARU')) whereClauses.push("p.kondisi_unit = 'BARU'");
    else if (cond.includes('BEKAS') || cond.includes('REKONDISI')) whereClauses.push("p.kondisi_unit = 'BEKAS'");
  }

  if (options?.location && options.location !== 'Semua Lokasi') {
    whereClauses.push('p.lokasi_unit = ?');
    args.push(options.location.trim());
  }

  if (options?.statusFilter === 'READY_ONLY' || options?.stockStatus === 'instock') {
    whereClauses.push("p.status_unit = 'READY'");
  } else if (options?.stockStatus === 'outofstock') {
    whereClauses.push("p.status_unit = 'SOLD'");
  }

  const whereSql = whereClauses.join(' AND ');

  let orderSql = 'CASE WHEN p.status_unit = \'SOLD\' THEN 1 ELSE 0 END ASC, p.tanggal_masuk DESC, p.sku DESC';

  const countSql = `SELECT COUNT(*) as total FROM products p LEFT JOIN categories c ON p.category_slug = c.child_slug WHERE ${whereSql}`;
  const selectSql = `
    SELECT 
      p.sku, p.title, p.category_slug, p.status_unit, p.status_pipeline,
      p.lokasi_unit, p.kondisi_unit, p.short_description, p.full_description,
      p.photo_urls, p.link_unit, p.link_telegram, p.tanggal_masuk, p.harga_buka_wa,
      c.id as cat_id, c.parent_name, c.parent_slug, c.child_name, c.child_slug
    FROM products p
    LEFT JOIN categories c ON p.category_slug = c.child_slug
    WHERE ${whereSql}
    ORDER BY ${orderSql}
    LIMIT ? OFFSET ?
  `;

  try {
    const [countResult, selectResult] = await Promise.all([
      client.execute({ sql: countSql, args }),
      client.execute({ sql: selectSql, args: [...args, perPage, offset] }),
    ]);

    const total = Number(countResult.rows[0]?.total ?? 0);
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const products = selectResult.rows.map((row) =>
      mapRowToWooCommerceProduct(row as unknown as Record<string, any>)
    );

    return { products, total, totalPages };
  } catch (error) {
    console.error('Error querying Turso WooCommerce products:', error);
    return { products: [], total: 0, totalPages: 1 };
  }
}

export async function getTursoProductBySlug(slugOrSku: string): Promise<Product | null> {
  if (!slugOrSku) return null;
  const client = getTursoClient();
  const clean = slugOrSku.trim();

  const sql = `
    SELECT 
      p.sku, p.title, p.category_slug, p.status_unit, p.status_pipeline,
      p.lokasi_unit, p.kondisi_unit, p.short_description, p.full_description,
      p.photo_urls, p.link_unit, p.link_telegram, p.tanggal_masuk, p.harga_buka_wa,
      c.id as cat_id, c.parent_name, c.parent_slug, c.child_name, c.child_slug
    FROM products p
    LEFT JOIN categories c ON p.category_slug = c.child_slug
    WHERE p.sku = ? 
       OR p.link_unit LIKE '%' || ? || '/'
       OR p.link_unit LIKE '%' || ?
    LIMIT 1
  `;

  try {
    const res = await client.execute({
      sql,
      args: [clean.toUpperCase(), clean.toLowerCase(), clean.toLowerCase()],
    });

    if (res.rows.length === 0) return null;
    return mapRowToProduct(res.rows[0] as unknown as Record<string, any>);
  } catch (error) {
    console.error('Error fetching product by slug from Turso:', error);
    return null;
  }
}

export async function getTursoWooCommerceProductBySlug(slugOrSku: string): Promise<WooCommerceProduct | null> {
  if (!slugOrSku) return null;
  const client = getTursoClient();
  const clean = slugOrSku.trim();

  const sql = `
    SELECT 
      p.sku, p.title, p.category_slug, p.status_unit, p.status_pipeline,
      p.lokasi_unit, p.kondisi_unit, p.short_description, p.full_description,
      p.photo_urls, p.link_unit, p.link_telegram, p.tanggal_masuk, p.harga_buka_wa,
      c.id as cat_id, c.parent_name, c.parent_slug, c.child_name, c.child_slug
    FROM products p
    LEFT JOIN categories c ON p.category_slug = c.child_slug
    WHERE p.sku = ? 
       OR p.link_unit LIKE '%' || ? || '/'
       OR p.link_unit LIKE '%' || ?
    LIMIT 1
  `;

  try {
    const res = await client.execute({
      sql,
      args: [clean.toUpperCase(), clean.toLowerCase(), clean.toLowerCase()],
    });

    if (res.rows.length === 0) return null;
    return mapRowToWooCommerceProduct(res.rows[0] as unknown as Record<string, any>);
  } catch (error) {
    console.error('Error fetching WooCommerce product by slug from Turso:', error);
    return null;
  }
}

export async function getTursoRelatedProducts(
  categorySlug: string,
  excludeSku: string,
  limit = 4
): Promise<Product[]> {
  const client = getTursoClient();
  const sql = `
    SELECT 
      p.sku, p.title, p.category_slug, p.status_unit, p.status_pipeline,
      p.lokasi_unit, p.kondisi_unit, p.short_description, p.full_description,
      p.photo_urls, p.link_unit, p.link_telegram, p.tanggal_masuk, p.harga_buka_wa,
      c.id as cat_id, c.parent_name, c.parent_slug, c.child_name, c.child_slug
    FROM products p
    LEFT JOIN categories c ON p.category_slug = c.child_slug
    WHERE (p.category_slug = ? OR c.parent_slug = ?)
      AND p.sku != ?
    ORDER BY CASE WHEN p.status_unit = 'SOLD' THEN 1 ELSE 0 END ASC, p.tanggal_masuk DESC
    LIMIT ?
  `;

  try {
    const res = await client.execute({
      sql,
      args: [categorySlug, categorySlug, excludeSku, limit],
    });
    return res.rows.map((row) => mapRowToProduct(row as unknown as Record<string, any>));
  } catch (error) {
    console.error('Error fetching related products from Turso:', error);
    return [];
  }
}

export async function getTursoWooCommerceRelatedProducts(
  categorySlugOrId: string | number,
  excludeSkuOrId: string | number,
  limit = 4
): Promise<WooCommerceProduct[]> {
  const client = getTursoClient();
  const sql = `
    SELECT 
      p.sku, p.title, p.category_slug, p.status_unit, p.status_pipeline,
      p.lokasi_unit, p.kondisi_unit, p.short_description, p.full_description,
      p.photo_urls, p.link_unit, p.link_telegram, p.tanggal_masuk, p.harga_buka_wa,
      c.id as cat_id, c.parent_name, c.parent_slug, c.child_name, c.child_slug
    FROM products p
    LEFT JOIN categories c ON p.category_slug = c.child_slug
    WHERE (p.category_slug = ? OR c.parent_slug = ? OR c.id = ?)
      AND p.sku != ?
    ORDER BY CASE WHEN p.status_unit = 'SOLD' THEN 1 ELSE 0 END ASC, p.tanggal_masuk DESC
    LIMIT ?
  `;

  try {
    const param = String(categorySlugOrId);
    const exclude = String(excludeSkuOrId);
    const res = await client.execute({
      sql,
      args: [param, param, typeof categorySlugOrId === 'number' ? categorySlugOrId : -1, exclude, limit],
    });
    return res.rows.map((row) => mapRowToWooCommerceProduct(row as unknown as Record<string, any>));
  } catch (error) {
    console.error('Error fetching WooCommerce related products from Turso:', error);
    return [];
  }
}

export interface CatalogMetadataCategory {
  id: number;
  name: string;
  slug?: string;
  parent?: number;
  count?: number;
}

export interface CatalogMetadata {
  categories: CatalogMetadataCategory[];
  conditionOptions: string[];
  locationOptions: string[];
  totalProducts: number | null;
}

let cachedMetadata: { data: CatalogMetadata; timestamp: number } | null = null;
const METADATA_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function getTursoCatalogMetadata(): Promise<CatalogMetadata> {
  if (cachedMetadata && Date.now() - cachedMetadata.timestamp < METADATA_TTL_MS) {
    return cachedMetadata.data;
  }

  const client = getTursoClient();

  try {
    const [catRes, locRes, totalRes] = await Promise.all([
      client.execute(`
        SELECT c.id, c.parent_name, c.parent_slug, c.child_name, c.child_slug, COUNT(p.sku) as product_count
        FROM categories c
        LEFT JOIN products p ON p.category_slug = c.child_slug
        GROUP BY c.id
        ORDER BY c.parent_name, c.child_name
      `),
      client.execute('SELECT DISTINCT lokasi_unit FROM products WHERE lokasi_unit IS NOT NULL AND lokasi_unit != \'\' ORDER BY lokasi_unit'),
      client.execute('SELECT COUNT(*) as total FROM products WHERE status_unit = \'READY\''),
    ]);

    // Build parent and child category hierarchy
    const parentMap = new Map<string, { id: number; name: string; slug: string; count: number }>();
    const childList: CatalogMetadataCategory[] = [];
    let parentAutoId = 1;

    for (const r of catRes.rows) {
      const pName = r.parent_name ? toTitleCase(String(r.parent_name)) : 'Peralatan Dapur';
      const pSlug = String(r.parent_slug || pName.toLowerCase().replace(/[\s&]+/g, '-'));
      const cCount = Number(r.product_count || 0);

      if (!parentMap.has(pSlug)) {
        parentMap.set(pSlug, {
          id: parentAutoId++,
          name: pName,
          slug: pSlug,
          count: 0,
        });
      }

      const parentObj = parentMap.get(pSlug)!;
      parentObj.count += cCount;

      childList.push({
        id: Number(r.id),
        name: toTitleCase(String(r.child_name || '')),
        slug: String(r.child_slug || ''),
        parent: parentObj.id,
        count: cCount,
      });
    }

    const categories: CatalogMetadataCategory[] = [
      ...Array.from(parentMap.values()).map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        parent: 0,
        count: p.count,
      })),
      ...childList,
    ];

    const locationOptions = locRes.rows
      .map((r) => String(r.lokasi_unit || '').trim())
      .filter(Boolean);

    const conditionOptions = ['Baru', 'Bekas'];
    const totalProducts = Number(totalRes.rows[0]?.total ?? 0);

    const data: CatalogMetadata = {
      categories,
      conditionOptions,
      locationOptions,
      totalProducts,
    };

    cachedMetadata = { data, timestamp: Date.now() };
    return data;
  } catch (error) {
    console.error('Error fetching catalog metadata from Turso:', error);
    return {
      categories: [],
      conditionOptions: ['Baru', 'Bekas'],
      locationOptions: [],
      totalProducts: null,
    };
  }
}
