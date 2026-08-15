import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

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

  if (!response.ok) {
    throw new Error(`WooCommerce product lookup gagal: ${response.status}`);
  }

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

      <header className="sticky top-0 z-40 border-b border-slate-700/60 bg-slate-950 text-white shadow-lg">
        <div className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-xs lg:px-8">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-emerald-400">Katalog Update Harian</span>
              <span className="text-slate-600">•</span>
              <span>Peralatan Dapur Komersial Bekas &amp; Rekondisi Teruji</span>
            </div>
            <div className="hidden items-center gap-4 md:flex">
              <span className="font-semibold text-emerald-400">☎ Hotline WhatsApp: +62 812-8888-9999</span>
              <span className="text-slate-400">♙ Staff / Owner</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900">
          <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-4 lg:px-8">
            <a href="/" className="shrink-0 text-2xl font-black tracking-tight">
              BB<span className="text-amber-400">Kitchen</span>
            </a>
            <span className="hidden rounded border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-300 sm:inline-block">
              BUKAN BARU KITCHEN
            </span>
            <a
              href="/?focus=search"
              className="hidden min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-400 shadow-inner md:block"
            >
              🔎 Cari kompor 4 burner, deep fryer, chiller, mixer 20L, meja stainless...
            </a>
            <nav className="ml-auto hidden items-center gap-5 text-sm font-medium text-slate-300 lg:flex">
              <a href="/" className="hover:text-white">Home</a>
              <a href="/" className="font-bold text-amber-400">Katalog</a>
              <a href="/#cara-order" className="hover:text-white">Cara Order</a>
              <a href="/#lokasi" className="hover:text-white">Lokasi</a>
              <a href="/#dapur-mbg" className="hover:text-white">Dapur MBG</a>
              <a href="/#faq" className="hover:text-white">FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-7 lg:px-8 lg:py-9">
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500" aria-label="Breadcrumb">
          <a href="/" className="hover:text-emerald-700">Home</a>
          <span>/</span>
          <a href="/" className="hover:text-emerald-700">Katalog</a>
          <span>/</span>
          <span>{category}</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">{product.name}</span>
        </nav>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm md:px-7">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-600">Detail Unit BBKitchen</p>
              <h1 className="max-w-4xl text-2xl font-black leading-tight tracking-tight text-slate-950 md:text-4xl">
                {product.name}
              </h1>
            </div>
            <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
              {category}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              {product.images[0] ? (
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt || product.name}
                  className="aspect-square w-full object-contain"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center text-sm font-semibold text-slate-500">
                  Foto unit belum tersedia
                </div>
              )}
              <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-black text-white shadow-md">
                ● {status === 'READY' ? 'READY SIAP KIRIM' : status}
              </span>
              <span className="absolute bottom-3 right-3 rounded-lg bg-slate-950/85 px-3 py-1.5 text-[11px] font-bold text-white">
                Foto Unit BBKitchen
              </span>
            </div>

            {product.images.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
                {product.images.map((image, index) => (
                  <div key={`${image.src}-${index}`} className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                    <img
                      src={image.src}
                      alt={image.alt || `${product.name} foto ${index + 1}`}
                      className="aspect-square w-full rounded-md object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-black text-white">
                {status}
              </span>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                {condition}
              </span>
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50">
              <dl className="divide-y divide-slate-200">
                <div className="flex items-center justify-between gap-5 p-4">
                  <dt className="text-sm font-medium text-slate-500">SKU</dt>
                  <dd className="text-right text-sm font-black text-slate-900">{kodeUnit}</dd>
                </div>
                <div className="flex items-center justify-between gap-5 p-4">
                  <dt className="text-sm font-medium text-slate-500">Kategori</dt>
                  <dd className="max-w-[65%] text-right text-sm font-bold text-slate-900">{category}</dd>
                </div>
                <div className="flex items-center justify-between gap-5 p-4">
                  <dt className="text-sm font-medium text-slate-500">Lokasi Unit</dt>
                  <dd className="text-right text-sm font-bold text-slate-900">{location || 'Belum tercantum'}</dd>
                </div>
              </dl>
            </div>

            {shortDescription && (
              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">Ringkasan</p>
                <p className="line-clamp-5 text-sm leading-6 text-slate-600">{stripHtml(shortDescription)}</p>
              </div>
            )}

            <div className="mt-5 rounded-xl bg-slate-950 p-4">
              <p className="text-xs font-bold text-slate-400">Butuh unit ini?</p>
              <p className="mt-1 text-sm font-semibold text-white">Tanyakan harga, ketersediaan, dan detail unit ke tim BBKitchen.</p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`}
                className="mt-4 flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-emerald-400"
              >
                ☎ Tanya Harga &amp; Ketersediaan via WhatsApp
              </a>
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-5 flex items-center gap-3 border-b border-slate-200 pb-4">
            <span className="rounded-lg bg-amber-50 px-2.5 py-2 text-amber-600">▤</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-amber-600">Informasi Produk</p>
              <h2 className="text-xl font-black text-slate-950">Deskripsi &amp; Detail Unit</h2>
            </div>
          </div>
          <div className="prose prose-slate max-w-none text-sm leading-7 prose-headings:font-black prose-headings:text-slate-950 prose-a:text-emerald-700">
            {product.description ? (
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            ) : (
              <p>{stripHtml(shortDescription) || 'Deskripsi unit belum tersedia.'}</p>
            )}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-600">Data Live WooCommerce + ACF</p>
            <h2 className="mt-1 text-xl font-black text-slate-950">Ringkasan Unit</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-500">Kondisi</p>
              <p className="mt-1 font-black text-slate-950">{condition}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-500">Status</p>
              <p className="mt-1 font-black text-emerald-700">{status}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-500">Lokasi</p>
              <p className="mt-1 font-black text-slate-950">{location || 'Belum tercantum'}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-500">SKU</p>
              <p className="mt-1 font-black text-slate-950">{kodeUnit}</p>
            </div>
          </div>
        </section>
      </div>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-xl transition hover:bg-emerald-400"
      >
        ☎ Tanya Unit via WhatsApp
      </a>
    </main>
  );
}
