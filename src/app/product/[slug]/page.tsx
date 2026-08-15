import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '../../../components/Header';

const WOOCOMMERCE_API_URL =
  process.env.WOOCOMMERCE_API_URL ||
  'https://www.bukanbarukitchen.com/wp-json/wc/v3';

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

function getAuthorization(): string | null {
  const key = process.env.WC_CONSUMER_KEY;
  const secret = process.env.WC_CONSUMER_SECRET;
  if (!key || !secret) return null;
  return `Basic ${Buffer.from(`${key}:${secret}`).toString('base64')}`;
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
  const authorization = getAuthorization();
  if (!authorization) throw new Error('WooCommerce credentials belum dikonfigurasi.');

  const params = new URLSearchParams({ slug, status: 'publish', per_page: '1' });
  const response = await fetch(`${WOOCOMMERCE_API_URL}/products?${params.toString()}`, {
    headers: { Accept: 'application/json', Authorization: authorization },
    cache: 'no-store',
  });

  if (!response.ok) throw new Error(`WooCommerce product lookup gagal: ${response.status}`);

  const products = (await response.json()) as WooCommerceProduct[];
  return products[0] ?? null;
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

  const rawCondition = getMeta(product, 'kondisi_unit');
  const rawStatus = getMeta(product, 'status_unit');
  const location = getMeta(product, 'lokasi_unit');
  const kodeUnit = getMeta(product, 'kode_unit') || product.sku;
  const category = product.categories[0]?.name || 'Peralatan Dapur Komersial';
  const shortDescription = product.short_description || product.description || '';
  const price = product.price || product.regular_price;
  const condition = normalizeCondition(rawCondition);
  const status = normalizeStatus(rawStatus, product.stock_status);
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-9">
        <nav className="mb-4 flex min-w-0 items-center gap-1.5 overflow-x-auto whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[11px] font-medium text-slate-500 shadow-sm sm:gap-2 sm:px-4 sm:text-xs" aria-label="Breadcrumb">
          <a href="/" className="shrink-0 hover:text-emerald-700">Home</a>
          <span className="shrink-0 text-slate-300">›</span>
          <a href="/#catalog" className="shrink-0 hover:text-emerald-700">Katalog</a>
          <span className="shrink-0 text-slate-300">›</span>
          <a href="/#catalog" className="max-w-[34vw] shrink-0 truncate hover:text-emerald-700">{category}</a>
          <span className="shrink-0 text-slate-300">›</span>
          <span className="min-w-0 truncate font-semibold text-slate-800" aria-current="page">{product.name}</span>
        </nav>

        <div className="mb-5 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 sm:py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-amber-600">Detail Unit BBKitchen</p>
              <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">{product.name}</h1>
            </div>
            <span className="w-fit max-w-full truncate rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-bold uppercase text-amber-700">{category}</span>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              {product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <div key={`${image.src}-${index}`} className="absolute inset-0">
                    <input id={`product-gallery-${index}`} name="product-gallery" type="radio" defaultChecked={index === 0} className="peer fixed left-0 top-0 h-px w-px opacity-0" />
                    <div className="pointer-events-none absolute inset-0 hidden peer-checked:block">
                      <img src={image.src} alt={image.alt || `${product.name} foto ${index + 1}`} className="h-full w-full object-contain" />
                      <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1.5 text-[10px] font-black text-white shadow-md sm:text-xs">● {status === 'READY' ? 'READY SIAP KIRIM' : status}</span>
                      <span className="absolute bottom-3 right-3 rounded-lg bg-slate-950/85 px-2.5 py-1.5 text-[10px] font-bold text-white">Foto Unit BBKitchen</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-500">Foto unit belum tersedia</div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6" aria-label="Pilih foto produk">
                {product.images.map((image, index) => (
                  <label key={`thumb-${image.src}-${index}`} htmlFor={`product-gallery-${index}`} className="cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-0.5 transition hover:border-amber-400 hover:ring-2 hover:ring-amber-100 focus-within:border-amber-500">
                    <img src={image.src} alt={`Pilih foto ${index + 1} ${product.name}`} className="aspect-square w-full rounded-md object-cover" />
                  </label>
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
                <div className="flex items-center justify-between gap-4 p-3.5 sm:p-4"><dt className="text-sm font-medium text-slate-500">SKU</dt><dd className="text-right text-sm font-black text-slate-900">{kodeUnit}</dd></div>
                <div className="flex items-center justify-between gap-4 p-3.5 sm:p-4"><dt className="text-sm font-medium text-slate-500">Kategori</dt><dd className="max-w-[65%] text-right text-sm font-bold text-slate-900">{category}</dd></div>
                <div className="flex items-center justify-between gap-4 p-3.5 sm:p-4"><dt className="text-sm font-medium text-slate-500">Lokasi Unit</dt><dd className="text-right text-sm font-bold text-slate-900">{location || 'Belum tercantum'}</dd></div>
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
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-xs font-black text-white shadow-sm transition hover:bg-emerald-400 sm:text-sm">☎ Tanya Harga &amp; Ketersediaan via WhatsApp</a>
            </div>
          </section>
        </div>

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-7">
          <div className="mb-5 flex items-center gap-3 border-b border-slate-200 pb-4">
            <span className="rounded-lg bg-amber-50 px-2.5 py-2 text-amber-600">▤</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-amber-600">Informasi Produk</p>
              <h2 className="text-lg font-black text-slate-950 sm:text-xl">Deskripsi &amp; Detail Unit</h2>
            </div>
          </div>
          <div className="prose prose-slate max-w-none text-sm leading-7 prose-headings:font-black prose-headings:text-slate-950 prose-a:text-emerald-700">
            {product.description ? <div dangerouslySetInnerHTML={{ __html: product.description }} /> : <p>{stripHtml(shortDescription) || 'Deskripsi unit belum tersedia.'}</p>}
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-7">
          <h2 className="text-lg font-black text-slate-950 sm:text-xl">Ringkasan Unit</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold text-slate-500">Kondisi</p><p className="mt-1 font-black text-slate-950">{condition}</p></div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold text-slate-500">Status</p><p className="mt-1 font-black text-emerald-700">{status}</p></div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold text-slate-500">Lokasi</p><p className="mt-1 font-black text-slate-950">{location || 'Belum tercantum'}</p></div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold text-slate-500">SKU</p><p className="mt-1 font-black text-slate-950">{kodeUnit}</p></div>
          </div>
        </section>
      </div>

      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-40 rounded-full bg-emerald-600 px-4 py-3 text-xs font-black text-white shadow-lg transition hover:bg-emerald-500 sm:right-8">Tanya via WhatsApp</a>
    </main>
  );
}
