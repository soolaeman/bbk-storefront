import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

const WHATSAPP_NUMBER = '6281288889999';

interface WooCommerceMeta {
  key: string;
  value: string | number | boolean | null;
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
  permalink?: string;
  images: Array<{ src: string; alt?: string }>;
  categories: Array<{ id: number; name: string; slug: string }>;
  stock_status: string;
  date_created?: string;
  date_modified?: string;
  meta_data?: WooCommerceMeta[];
}

function getSiteBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

function getMeta(product: WooCommerceProduct, key: string): string {
  const item = product.meta_data?.find(
    (entry) => entry.key.trim().toLowerCase() === key.trim().toLowerCase(),
  );
  return item?.value === null || item?.value === undefined ? '' : String(item.value).trim();
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

function normalizeCondition(value: string): string {
  const normalized = value.trim().toUpperCase();
  if (normalized.includes('BEKAS')) return 'Bekas';
  if (normalized.includes('BARU')) return 'Baru';
  return value || 'Belum tercantum';
}

function normalizeStatus(value: string, stockStatus: string): string {
  if (value === 'SOLD') return 'SOLD';
  if (value === 'DP') return 'DP';
  if (value === 'READY') return 'READY';
  return stockStatus === 'outofstock' ? 'SOLD' : 'READY';
}

async function getProduct(slug: string): Promise<WooCommerceProduct | null> {
  const baseUrl = getSiteBaseUrl();
  const response = await fetch(
    `${baseUrl}/api/products?slug=${encodeURIComponent(slug)}&status=publish&per_page=1`,
    { next: { revalidate: 60 } },
  );

  if (!response.ok) return null;
  const products = (await response.json()) as WooCommerceProduct[];
  if (!Array.isArray(products) || products.length === 0) return null;
  return products[0] ?? null;
}

async function getRelatedProducts(product: WooCommerceProduct): Promise<WooCommerceProduct[]> {
  const categoryId = product.categories[0]?.id;
  if (!categoryId) return [];

  const baseUrl = getSiteBaseUrl();
  const response = await fetch(
    `${baseUrl}/api/products?category=${categoryId}&per_page=5&status=publish&orderby=date&order=desc`,
    { next: { revalidate: 60 } },
  );

  if (!response.ok) return [];
  const products = (await response.json()) as WooCommerceProduct[];
  if (!Array.isArray(products)) return [];
  return products.filter((item) => item.id !== product.id).slice(0, 4);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: 'Unit Tidak Ditemukan | BBKitchen' };

  const description = stripHtml(product.short_description || product.description || '').slice(0, 160);
  const canonical = `https://www.bukanbarukitchen.com/product/${product.slug}`;

  return {
    title: product.name,
    description,
    alternates: { canonical },
    openGraph: {
      title: product.name,
      description,
      url: canonical,
      type: 'website',
      images: product.images[0]?.src ? [{ url: product.images[0].src }] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product);
  const condition = normalizeCondition(getMeta(product, 'kondisi_unit'));
  const status = normalizeStatus(getMeta(product, 'status_unit'), product.stock_status);
  const location = getMeta(product, 'lokasi_unit');
  const kodeUnit = getMeta(product, 'kode_unit') || product.sku;
  const category = product.categories[0]?.name || 'Peralatan Dapur Komersial';
  const shortDescription = product.short_description || product.description || '';
  const price = product.price || product.regular_price;
  const canonical = `https://www.bukanbarukitchen.com/product/${product.slug}`;
  const whatsappText = `Halo BBKitchen, saya tertarik dengan unit ${product.name} (${kodeUnit}).`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: stripHtml(shortDescription),
    sku: kodeUnit,
    category,
    image: product.images.map((image) => image.src),
    url: canonical,
    offers: price
      ? {
          '@type': 'Offer',
          priceCurrency: 'IDR',
          price,
          availability:
            status === 'SOLD' ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
          url: canonical,
        }
      : undefined,
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-9">
        <nav className="mb-4 flex min-w-0 items-center gap-1.5 overflow-x-auto whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[11px] font-medium text-slate-500 shadow-sm sm:text-xs" aria-label="Breadcrumb">
          <a href="/" className="shrink-0 hover:text-emerald-700">Home</a>
          <span>›</span>
          <a href="/#catalog" className="shrink-0 hover:text-emerald-700">Katalog</a>
          <span>›</span>
          <span className="min-w-0 truncate font-semibold text-slate-800">{product.name}</span>
        </nav>

        <div className="mb-5 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 sm:py-5">
          <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-amber-600">Detail Unit BBKitchen</p>
          <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">{product.name}</h1>
          <span className="mt-2 inline-block rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-bold uppercase text-amber-700">{category}</span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              {product.images[0]?.src ? (
                <img src={product.images[0].src} alt={product.images[0].alt || product.name} className="h-full w-full object-contain" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-500">Foto unit belum tersedia</div>
              )}
              <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1.5 text-[10px] font-black text-white shadow-md sm:text-xs">● {status === 'READY' ? 'READY SIAP KIRIM' : status}</span>
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
                {product.images.map((image, index) => (
                  <img key={`${image.src}-${index}`} src={image.src} alt={`${product.name} foto ${index + 1}`} className="aspect-square w-full rounded-lg border border-slate-200 object-cover" loading="lazy" />
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-black text-white">{status}</span>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">{condition}</span>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50">
              <dl className="divide-y divide-slate-200">
                <div className="flex justify-between gap-4 p-4"><dt className="text-sm text-slate-500">SKU</dt><dd className="text-right text-sm font-black">{kodeUnit}</dd></div>
                <div className="flex justify-between gap-4 p-4"><dt className="text-sm text-slate-500">Kategori</dt><dd className="text-right text-sm font-bold">{category}</dd></div>
                <div className="flex justify-between gap-4 p-4"><dt className="text-sm text-slate-500">Lokasi Unit</dt><dd className="text-right text-sm font-bold">{location || 'Belum tercantum'}</dd></div>
              </dl>
            </div>

            {shortDescription && (
              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-slate-500">Ringkasan</p>
                <p className="line-clamp-5 text-sm leading-6 text-slate-600">{stripHtml(shortDescription)}</p>
              </div>
            )}

            <div className="mt-4 rounded-xl bg-slate-950 p-4">
              <p className="text-[10px] font-bold text-slate-400">Butuh unit ini?</p>
              <p className="mt-1 text-sm font-semibold text-white">Tanyakan harga, ketersediaan, dan detail unit ke tim BBKitchen.</p>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-xs font-black text-white sm:text-sm">☎ Tanya Harga &amp; Ketersediaan via WhatsApp</a>
            </div>
          </section>
        </div>

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-7">
          <p className="text-[10px] font-bold uppercase tracking-wide text-amber-600">Informasi Produk</p>
          <h2 className="mt-1 text-lg font-black text-slate-950 sm:text-xl">Deskripsi &amp; Detail Unit</h2>
          <div className="prose prose-slate mt-5 max-w-none text-sm leading-7 prose-headings:font-black prose-headings:text-slate-950 prose-a:text-emerald-700">
            {product.description ? <div dangerouslySetInnerHTML={{ __html: product.description }} /> : <p>{stripHtml(shortDescription) || 'Deskripsi unit belum tersedia.'}</p>}
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-7" aria-labelledby="related-products-heading">
            <div className="mb-5 flex items-end justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-600">Pilihan Lain di Kategori Ini</p>
                <h2 id="related-products-heading" className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">Produk Terkait</h2>
              </div>
              <Link href="/catalog" className="text-xs font-bold text-emerald-700">Lihat katalog →</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${encodeURIComponent(relatedProduct.slug)}`} className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
                  <div className="aspect-square overflow-hidden bg-slate-100">
                    {relatedProduct.images[0]?.src ? <img src={relatedProduct.images[0].src} alt={relatedProduct.images[0].alt || relatedProduct.name} className="h-full w-full object-contain" loading="lazy" /> : null}
                  </div>
                  <div className="p-3">
                    <p className="mb-1 line-clamp-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">{relatedProduct.categories[0]?.name || category}</p>
                    <h3 className="line-clamp-2 text-sm font-black leading-5 text-slate-900">{relatedProduct.name}</h3>
                    <p className="mt-2 text-xs font-bold text-slate-500">Lihat detail →</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer onSelectCategory={() => undefined} />
      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-40 rounded-full bg-emerald-600 px-4 py-3 text-xs font-black text-white shadow-lg sm:right-8">Tanya via WhatsApp</a>
    </main>
  );
}
