import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { getTursoClient } from '../../../lib/turso';

const WHATSAPP_NUMBER = '6285122001051';
const PUBLIC_SITE_ORIGIN = 'https://bukanbarukitchen.com';

interface ArticleRecord {
  id: number;
  slug: string;
  title: string;
  seo_title: string;
  category_slug: string;
  article_type: string;
  summary: string;
  content_markdown: string;
  faq_json: string;
  target_keywords: string;
  status: string;
  published_at?: string;
  created_at: string;
}

interface LiveProduct {
  sku: string;
  title: string;
  slug: string;
  category_slug: string;
  lokasi_unit: string;
  harga_buka_wa: number;
  harga_display_low: number;
  harga_display_high: number;
  featured_image: string;
  status_unit: string;
}

async function getArticle(slug: string): Promise<ArticleRecord | null> {
  try {
    const client = getTursoClient();
    const res = await client.execute({
      sql: `SELECT * FROM content_articles WHERE slug = ? LIMIT 1`,
      args: [slug],
    });
    if (res.rows.length > 0) {
      const r = res.rows[0];
      return {
        id: Number(r.id),
        slug: String(r.slug),
        title: String(r.title),
        seo_title: String(r.seo_title || r.title),
        category_slug: String(r.category_slug || 'umum'),
        article_type: String(r.article_type || 'CLUSTER'),
        summary: String(r.summary || ''),
        content_markdown: String(r.content_markdown || ''),
        faq_json: String(r.faq_json || '[]'),
        target_keywords: String(r.target_keywords || ''),
        status: String(r.status || 'DRAFT'),
        published_at: r.published_at ? String(r.published_at) : undefined,
        created_at: String(r.created_at || ''),
      };
    }
  } catch (err) {
    console.error('Failed to query content_articles:', err);
  }

  // Hardened Fallback if SQLite query fails or table is building
  if (slug.includes('upright-chiller')) {
    return {
      id: 1,
      slug: 'panduan-memilih-upright-chiller-bekas-resto-berkualitas',
      title: 'Panduan Lengkap Memilih Upright Chiller Bekas Restoran Bergaransi',
      seo_title: 'Panduan Beli Upright Chiller Bekas Resto Bergaransi | BBKitchen',
      category_slug: 'upright-chiller',
      article_type: 'BUYER_GUIDE',
      summary: 'Tips praktis inspeksi kompresor, kondisi karet pintu, thermostat digital, dan uji suhu operasional kulkas resto komersial bekas.',
      content_markdown: `Membuka restoran atau kafe baru membutuhkan alokasi modal yang terukur. Salah satu pos pengeluaran terbesar adalah peralatan pendingin (chiller & freezer). Unit upright chiller baru berkapasitas 2-4 pintu dapat mencapai Rp 25 juta hingga Rp 45 juta. Dengan memilih unit bekas berkualitas dari BBKitchen, Anda menghemat 50-65% Capex tanpa mengorbankan performa.\n\n### 4 Titik Kritis yang Wajib Diperiksa Sebelum Membeli:\n\n1. **Kompresor & Tekanan Freon:** Pastikan tidak ada kebocoran oli pada sambungan pipa tembaga dan suara mesin halus.\n2. **Kondensor & Fan Motor:** Sirkulasi udara pendingin harus lancar dan kisi-kisi kondensor bersih dari kerak lemak.\n3. **Karet Pintu (Door Gasket Magnetic):** Kerapatan segel pintu menjaga suhu internal stabil antara +2°C hingga +8°C.\n4. **Digital Thermostat & Evaporator:** Sensor defrost otomatis berfungsi normal tanpa bunga es berlebih.\n\nBBKitchen melakukan tes fungsi 24 jam untuk seluruh unit pendingin sebelum dikirim ke dapur Anda.`,
      faq_json: JSON.stringify([
        {
          q: 'Berapa lama masa garansi unit pendingin di BBKitchen?',
          a: 'BBKitchen memberikan garansi fungsi resmi 1 hingga 3 bulan mencakup kompresor dan sistem pendingin.',
        },
        {
          q: 'Apakah unit bisa dikirim ke luar Jabodetabek?',
          a: 'Bisa. Kami bekerjasama dengan ekspedisi kargo khusus (Sentral Cargo / Dakota) dengan packing kayu aman.',
        },
      ]),
      target_keywords: 'upright chiller bekas, chiller resto bekas, kulkas komersial bekas bergaransi',
      status: 'PUBLISHED',
      created_at: new Date().toISOString(),
    };
  }

  return null;
}

async function getLiveCategoryProducts(categorySlug: string): Promise<LiveProduct[]> {
  try {
    const client = getTursoClient();
    const res = await client.execute({
      sql: `
        SELECT sku, title, slug, category_slug, lokasi_unit, harga_buka_wa, harga_display_low, harga_display_high, featured_image, status_unit
        FROM products 
        WHERE status_unit = 'AVAILABLE' 
        AND (category_slug = ? OR category_slug LIKE ?)
        ORDER BY RANDOM()
        LIMIT 3
      `,
      args: [categorySlug, `%${categorySlug}%`],
    });

    if (res.rows.length > 0) {
      return res.rows.map((r) => ({
        sku: String(r.sku),
        title: String(r.title),
        slug: String(r.slug || r.sku),
        category_slug: String(r.category_slug),
        lokasi_unit: String(r.lokasi_unit || 'Gudang Mitra'),
        harga_buka_wa: Number(r.harga_buka_wa || 0),
        harga_display_low: Number(r.harga_display_low || 0),
        harga_display_high: Number(r.harga_display_high || 0),
        featured_image: String(r.featured_image || `${r.sku}_1.webp`),
        status_unit: String(r.status_unit || 'AVAILABLE'),
      }));
    }
  } catch (err) {
    console.error('Failed to get live products for article:', err);
  }

  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: 'Artikel Tidak Ditemukan | BBKitchen' };

  const canonical = `${PUBLIC_SITE_ORIGIN}/posts/${article.slug}`;

  return {
    title: article.seo_title || `${article.title} | BBKitchen`,
    description: article.summary,
    alternates: { canonical },
    openGraph: {
      title: article.seo_title,
      description: article.summary,
      url: canonical,
      siteName: 'BBKitchen',
      locale: 'id_ID',
      type: 'article',
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const liveProducts = await getLiveCategoryProducts(article.category_slug);

  let faqs: Array<{ q: string; a: string }> = [];
  try {
    faqs = JSON.parse(article.faq_json || '[]');
  } catch {}

  const canonical = `${PUBLIC_SITE_ORIGIN}/posts/${article.slug}`;
  const whatsappText = `Halo BBKitchen, saya membaca artikel "${article.title}" dan ingin konsultasi ketersediaan unit peralatan dapur resto.`;

  // Schemas
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    url: canonical,
    datePublished: article.published_at || article.created_at,
    author: {
      '@type': 'Organization',
      name: 'BBKitchen Expert Culinary Logistics',
      url: PUBLIC_SITE_ORIGIN,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BBKitchen',
      logo: {
        '@type': 'ImageObject',
        url: `${PUBLIC_SITE_ORIGIN}/logo.png`,
      },
    },
  };

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  } : null;

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Header />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>›</span>
          <Link href="/shop" className="hover:text-emerald-700">Edukasi &amp; Panduan</Link>
          <span>›</span>
          <span className="text-slate-800 font-semibold truncate">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-100 text-purple-800 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
              {article.article_type}
            </span>
            <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
              Kategori: {article.category_slug}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {article.summary}
          </p>
        </header>

        {/* Article Body */}
        <article className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed prose-headings:font-black prose-headings:text-slate-950 prose-a:text-emerald-700 prose-img:rounded-2xl">
            <div className="whitespace-pre-wrap">
              {article.content_markdown}
            </div>
          </div>

          {/* Silo Interlink Box */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-amber-900">
                Eksplorasi Seluruh Stok Kategori {article.category_slug.toUpperCase()}
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                Lihat daftar unit ready stok bergaransi dengan harga terjangkau.
              </p>
            </div>
            <Link
              href={`/shop?category=${encodeURIComponent(article.category_slug)}`}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition shrink-0"
            >
              Lihat Stok Kategori →
            </Link>
          </div>
        </article>

        {/* 3 Live Product Cards Embed */}
        {liveProducts.length > 0 && (
          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-amber-600">
                  Unit Ready Terkait
                </p>
                <h2 className="text-lg font-black text-slate-950">
                  Stok Peralatan Siap Kirim Hari Ini
                </h2>
              </div>
              <Link href="/shop" className="text-xs font-bold text-emerald-700">
                Buka Katalog Lengkap →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {liveProducts.map((p) => (
                <Link
                  key={p.sku}
                  href={`/shop/${encodeURIComponent(p.slug)}`}
                  className="group rounded-2xl border border-slate-200 p-3 hover:border-emerald-500 hover:shadow-md transition bg-slate-50 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-full aspect-[4/3] bg-slate-900 rounded-xl overflow-hidden mb-2 flex items-center justify-center">
                      <img
                        src={`https://pub-946d1fe1a1b1461eb2cca6be4462ba11.r2.dev/${p.featured_image}`}
                        alt={p.title}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {p.sku} • {p.lokasi_unit}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 mt-1 line-clamp-2">
                      {p.title}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-700">
                      {p.harga_display_low > 0
                        ? `Rp ${p.harga_display_low.toLocaleString('id-ID')}`
                        : 'Hubungi Sales'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-emerald-700">
                      Detail →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Accordion Section */}
        {faqs.length > 0 && (
          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-slate-950">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    Q: {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <section className="mt-8 rounded-3xl bg-slate-950 p-6 sm:p-8 text-white text-center space-y-4 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Konsultasikan Kebutuhan Dapur Usaha Anda
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Dapatkan rekomendasi spek alat yang tepat, foto/video tes fungsi terkini, dan simulasi ongkir kargo teraman.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-sm transition shadow-lg shadow-emerald-500/30"
          >
            <span>Konsultasi via WhatsApp (Fast Response)</span>
          </a>
        </section>
      </div>

      <Footer onSelectCategory={() => undefined} />
    </main>
  );
}
