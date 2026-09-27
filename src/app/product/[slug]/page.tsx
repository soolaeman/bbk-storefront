import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { ProductGallery } from '../../../components/ProductGallery';
import {
  getWooCommerceProductBySlug,
  getWooCommerceRelatedProducts,
  type WooCommerceProduct,
} from '../../../lib/woocommerce';
import {
  getTursoWooCommerceProductBySlug,
  getTursoWooCommerceRelatedProducts,
  formatCleanSeoTitle,
  formatCleanMetaDescription,
} from '../../../lib/turso';
import { MessageCircle, CheckCircle2, ShieldCheck, MapPin, Tag } from 'lucide-react';

const WHATSAPP_NUMBER = '6285122001051';
const PUBLIC_SITE_ORIGIN = 'https://bukanbarukitchen.com';

function getMeta(product: WooCommerceProduct, key: string): string {
  const item = product.meta_data?.find(
    (entry) => entry.key.trim().toLowerCase() === key.trim().toLowerCase()
  );
  return item?.value == null ? '' : String(item.value).trim();
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
  const tursoProduct = await getTursoWooCommerceProductBySlug(slug);
  if (tursoProduct) return tursoProduct;
  return getWooCommerceProductBySlug(slug);
}

async function getRelatedProducts(product: WooCommerceProduct): Promise<WooCommerceProduct[]> {
  const categoryId = product.categories[0]?.id;
  const categorySlug = product.categories[0]?.slug;
  if (!categoryId && !categorySlug) return [];
  const tursoRelated = await getTursoWooCommerceRelatedProducts(categorySlug || categoryId || '', product.sku, 4);
  if (tursoRelated.length > 0) return tursoRelated;
  return getWooCommerceRelatedProducts(categoryId || 0, product.id, 4);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: 'Unit Tidak Ditemukan | BBKitchen' };

  const condition = getMeta(product, 'kondisi_unit');
  const status = normalizeStatus(getMeta(product, 'status_unit'), product.stock_status);
  const location = getMeta(product, 'lokasi_unit');
  const rawSeoTitle = getMeta(product, 'seo_title');
  const seoTitle = formatCleanSeoTitle(rawSeoTitle, product.name, condition);

  const rawDesc = getMeta(product, 'yoast_description');
  const description = formatCleanMetaDescription(
    rawDesc || product.short_description || product.description,
    product.name,
    location,
    condition,
    status
  );

  const sku = (product.sku || '').trim();
  const hasSkuInTitle = sku && seoTitle.toLowerCase().includes(sku.toLowerCase());
  const shareTitle = sku && !hasSkuInTitle ? `[${sku}] ${seoTitle}` : seoTitle;

  const canonical = `${PUBLIC_SITE_ORIGIN}/shop/${product.slug}`;
  const rawFirstImage = product.images[0]?.src;
  const absoluteImageUrl = rawFirstImage
    ? (rawFirstImage.startsWith('http://') || rawFirstImage.startsWith('https://')
        ? rawFirstImage
        : `${PUBLIC_SITE_ORIGIN}${rawFirstImage.startsWith('/') ? '' : '/'}${rawFirstImage}`)
    : `${PUBLIC_SITE_ORIGIN}/api/cdn/${sku}_1.webp`;

  return {
    title: shareTitle,
    description: description,
    alternates: { canonical },
    openGraph: {
      title: shareTitle,
      description: description,
      url: canonical,
      siteName: 'BBKitchen (Bukan Baru Kitchen)',
      locale: 'id_ID',
      type: 'website',
      images: [
        {
          url: absoluteImageUrl,
          width: 800,
          height: 800,
          alt: shareTitle,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: shareTitle,
      description: description,
      images: [absoluteImageUrl],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
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
  const canonical = `${PUBLIC_SITE_ORIGIN}/shop/${product.slug}`;
  const whatsappText = `Halo BBKitchen, saya tertarik dengan unit ${product.name} (${kodeUnit}). Apakah unit masih ready di gudang ${location || 'Pamulang'}?`;

  const lowPrice = Number(getMeta(product, 'harga_display_low')) || null;
  const highPrice = Number(getMeta(product, 'harga_display_high')) || null;
  const estNewPrice = Number(getMeta(product, 'estimasi_harga_baru')) || null;

  const offers = (lowPrice && highPrice) ? {
    '@type': 'AggregateOffer',
    priceCurrency: 'IDR',
    lowPrice,
    highPrice,
    offerCount: 1,
    itemCondition: 'https://schema.org/UsedCondition',
    availability: status === 'SOLD' ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
    url: canonical,
  } : (price ? {
    '@type': 'Offer',
    priceCurrency: 'IDR',
    price,
    itemCondition: 'https://schema.org/UsedCondition',
    availability: status === 'SOLD' ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
    url: canonical,
  } : undefined);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: stripHtml(shortDescription),
    sku: kodeUnit,
    category,
    image: product.images.map((image) => image.src),
    url: canonical,
    offers,
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 pb-20 sm:pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-5 sm:py-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-3 flex min-w-0 items-center gap-1.5 overflow-x-auto whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium text-slate-500 shadow-2xs sm:text-xs" aria-label="Breadcrumb">
          <Link href="/" className="shrink-0 hover:text-emerald-700 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/katalog" className="shrink-0 hover:text-emerald-700 transition-colors">Katalog</Link>
          <span>›</span>
          <span className="min-w-0 truncate font-semibold text-slate-800">{product.name}</span>
        </nav>

        {/* Title Card */}
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs sm:p-5">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
              Detail Unit BBKitchen
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              SKU: {kodeUnit}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight tracking-tight text-slate-950">
            {product.name}
          </h1>
        </div>

        {/* 2-Column Gallery + Details */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <ProductGallery images={product.images} productName={product.name} status={status} />

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs sm:p-5 md:p-6 flex flex-col justify-between">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`rounded-full px-3 py-1 text-xs font-black text-white ${status === 'READY' ? 'bg-emerald-600' : 'bg-slate-700'}`}>
                  {status === 'READY' ? '● READY SIAP KIRIM' : status}
                </span>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                  {condition}
                </span>
                {location && (
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {location}
                  </span>
                )}
              </div>

              {/* Specs Table */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 overflow-hidden mb-4">
                <dl className="divide-y divide-slate-200/80 text-xs sm:text-sm">
                  <div className="flex justify-between gap-4 p-3 sm:p-3.5">
                    <dt className="text-slate-500 font-medium flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-slate-400" /> Kode Unit</dt>
                    <dd className="text-right font-black text-slate-900">{kodeUnit}</dd>
                  </div>
                  <div className="flex justify-between gap-4 p-3 sm:p-3.5">
                    <dt className="text-slate-500 font-medium">Kategori</dt>
                    <dd className="text-right font-bold text-slate-800">{category}</dd>
                  </div>
                  <div className="flex justify-between gap-4 p-3 sm:p-3.5">
                    <dt className="text-slate-500 font-medium">Lokasi Gudang</dt>
                    <dd className="text-right font-bold text-slate-800">{location || 'Pamulang, Tangsel'}</dd>
                  </div>
                </dl>
              </div>

              {/* Value Proposition & Price Benchmark */}
              {lowPrice && highPrice && (
                <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 mb-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-amber-800">
                    Panduan Anggaran &amp; Nilai Pasar
                  </p>
                  <div className="mt-2 space-y-1.5 text-xs text-slate-700">
                    {estNewPrice && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Estimasi Unit Baru:</span>
                        <span className="font-semibold text-slate-500 line-through">
                          ~Rp {estNewPrice.toLocaleString('id-ID')}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-baseline">
                      <span className="text-slate-700 font-medium">Rentang Pasar Second:</span>
                      <span className="text-sm sm:text-base font-black text-emerald-800">
                        Rp {lowPrice.toLocaleString('id-ID')} – Rp {highPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                    {estNewPrice && (
                      <p className="text-[11px] font-bold text-emerald-700 pt-1.5 border-t border-amber-200/60">
                        💰 Potensi Efisiensi: Hemat hingga {Math.round((1 - lowPrice / estNewPrice) * 100)}% dari harga baru
                      </p>
                    )}
                  </div>
                  <p className="mt-2 text-[10px] text-slate-500 italic">
                    *Penawaran final bergantung pada kondisi fisik, aksesoris, dan paket garansi servis.
                  </p>
                </div>
              )}

              {/* Short Summary */}
              {shortDescription && (
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 mb-4">
                  <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-slate-400">
                    Ringkasan Unit
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                    {stripHtml(shortDescription)}
                  </p>
                </div>
              )}
            </div>

            {/* Desktop CTA Card */}
            <div className="rounded-xl bg-slate-950 p-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <p className="text-xs font-bold text-slate-200">Lolos Uji Fungsi &amp; Siap Kirim</p>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Hubungi konsultan kami untuk video tes unit, foto detail, dan negosiasi.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-3 text-xs sm:text-sm font-black text-white shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Tanya Harga &amp; Ketersediaan via WhatsApp</span>
              </a>
            </div>
          </section>
        </div>

        {/* Detailed Description */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs sm:p-6 md:p-7">
          <p className="text-[10px] font-bold uppercase tracking-wide text-amber-600">Informasi Produk</p>
          <h2 className="mt-1 text-lg font-black text-slate-950 sm:text-xl">Deskripsi &amp; Detail Unit</h2>
          <div className="prose prose-slate mt-4 max-w-none text-xs sm:text-sm leading-relaxed prose-headings:font-black prose-headings:text-slate-950 prose-a:text-emerald-700">
            {product.description ? (
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            ) : (
              <p>{stripHtml(shortDescription) || 'Deskripsi unit belum tersedia.'}</p>
            )}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs sm:p-6 md:p-7" aria-labelledby="related-products-heading">
            <div className="mb-4 flex items-end justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-600">Pilihan Lain di Kategori Ini</p>
                <h2 id="related-products-heading" className="text-lg sm:text-xl font-black tracking-tight text-slate-950">
                  Unit Terkait
                </h2>
              </div>
              <Link href="/katalog" className="text-xs font-bold text-amber-600 hover:text-amber-700">
                Lihat Semua →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/shop/${encodeURIComponent(relatedProduct.slug)}`}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-sm"
                >
                  <div className="aspect-square overflow-hidden bg-slate-100">
                    {relatedProduct.images[0]?.src ? (
                      <img
                        src={relatedProduct.images[0].src}
                        alt={relatedProduct.images[0].alt || relatedProduct.name}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <div className="p-3">
                    <p className="mb-0.5 line-clamp-1 text-[10px] font-bold uppercase tracking-wide text-amber-600">
                      {relatedProduct.categories[0]?.name || category}
                    </p>
                    <h3 className="line-clamp-2 text-xs sm:text-sm font-bold leading-snug text-slate-900 group-hover:text-amber-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="mt-2 text-[11px] font-bold text-slate-500">Lihat detail →</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer onSelectCategory={() => undefined} />

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden shadow-lg">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-slate-500 truncate">{product.name}</p>
            <p className="text-xs font-black text-emerald-700">
              {lowPrice ? `Rp ${lowPrice.toLocaleString('id-ID')}` : 'Tanya Harga Unit'}
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white text-xs font-black shrink-0 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tanya via WhatsApp</span>
          </a>
        </div>
      </div>
    </main>
  );
}
