import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const WOOCOMMERCE_API_URL =
  process.env.WOOCOMMERCE_API_URL ||
  'https://www.bukanbarukitchen.com/wp-json/wc/v3';

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

  if (!product) {
    return { title: 'Unit Tidak Ditemukan | BBKitchen' };
  }

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

  const condition = getMeta(product, 'kondisi_unit');
  const status = getMeta(product, 'status_unit');
  const location = getMeta(product, 'lokasi_unit');
  const kodeUnit = getMeta(product, 'kode_unit') || product.sku;
  const category = product.categories[0]?.name || 'Peralatan Dapur Komersial';
  const shortDescription = product.short_description || product.description || '';
  const price = product.price || product.regular_price;
  const statusLabel = status === 'SOLD' ? 'SOLD' : status === 'DP' ? 'DP' : 'READY';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: stripHtml(shortDescription),
    sku: kodeUnit,
    category,
    image: product.images.map((image) => image.src),
    url: `https://www.bukanbarukitchen.com/product/${product.slug}`,
    offers: price
      ? {
          '@type': 'Offer',
          priceCurrency: 'IDR',
          price,
          availability:
            status === 'SOLD'
              ? 'https://schema.org/OutOfStock'
              : 'https://schema.org/InStock',
          url: `https://www.bukanbarukitchen.com/product/${product.slug}`,
        }
      : undefined,
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
          <a href="/" className="hover:text-slate-900">Home</a>
          <span className="mx-2">/</span>
          <a href="/" className="hover:text-slate-900">Katalog</a>
          <span className="mx-2">/</span>
          <span>{category}</span>
          <span className="mx-2">/</span>
          <span className="text-slate-700">{product.name}</span>
        </nav>

        <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
          {product.name}
        </h1>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <section>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              {product.images[0] ? (
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt || product.name}
                  className="aspect-square w-full object-contain"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center text-sm text-slate-500">
                  Foto unit belum tersedia
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
                {product.images.map((image, index) => (
                  <img
                    key={`${image.src}-${index}`}
                    src={image.src}
                    alt={image.alt || `${product.name} foto ${index + 1}`}
                    className="aspect-square w-full rounded-lg border border-slate-200 object-cover"
                  />
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-bold text-white">
                  {statusLabel}
                </span>
                {condition && (
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700">
                    {condition === 'BEKAS' ? 'Bekas' : condition === 'BARU' ? 'Baru' : condition}
                  </span>
                )}
              </div>

              <dl className="divide-y divide-slate-200 rounded-xl border border-slate-200">
                <div className="flex justify-between gap-6 p-4">
                  <dt className="text-sm text-slate-500">SKU</dt>
                  <dd className="text-sm font-semibold text-slate-900">{kodeUnit}</dd>
                </div>
                <div className="flex justify-between gap-6 p-4">
                  <dt className="text-sm text-slate-500">Kategori</dt>
                  <dd className="text-right text-sm font-semibold text-slate-900">{category}</dd>
                </div>
                {location && (
                  <div className="flex justify-between gap-6 p-4">
                    <dt className="text-sm text-slate-500">Lokasi</dt>
                    <dd className="text-sm font-semibold text-slate-900">{location}</dd>
                  </div>
                )}
              </dl>

              {price && (
                <div>
                  <p className="text-sm text-slate-500">Harga</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">Rp {Number(price).toLocaleString('id-ID')}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/6281288889999?text=${encodeURIComponent(`Halo BBKitchen, saya tertarik dengan unit ${product.name} (${kodeUnit}).`)}`}
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                >
                  Chat Admin BBKitchen
                </a>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <div className="prose prose-slate max-w-none">
            <h2>Deskripsi {product.name}</h2>
            {product.description ? (
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            ) : (
              <p>{stripHtml(shortDescription) || 'Deskripsi unit belum tersedia.'}</p>
            )}
          </div>
        </section>

        <section className="mt-8 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold">Ringkasan Unit</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Kondisi</p><p className="mt-1 font-semibold">{condition || 'Belum tercantum'}</p></div>
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Status</p><p className="mt-1 font-semibold">{status || product.stock_status}</p></div>
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Lokasi</p><p className="mt-1 font-semibold">{location || 'Belum tercantum'}</p></div>
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">SKU</p><p className="mt-1 font-semibold">{kodeUnit}</p></div>
          </div>
        </section>
      </div>
    </main>
  );
}
