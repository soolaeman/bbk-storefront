import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { getTursoClient } from '../../lib/turso';

export const metadata: Metadata = {
  title: 'Pusat Edukasi & Panduan Peralatan Dapur Resto | BBKitchen',
  description: 'Kumpulan artikel panduan memilih chiller, oven komersial, meja stainless, dan tips efisiensi dapur usaha horeca.',
};

export default async function ArticlesIndexPage() {
  let articles: any[] = [];
  try {
    const client = getTursoClient();
    const res = await client.execute(`
      SELECT slug, title, summary, category_slug, article_type, created_at 
      FROM content_articles 
      WHERE status = 'PUBLISHED' 
      ORDER BY created_at DESC 
      LIMIT 20
    `);
    articles = res.rows.map((r) => ({
      slug: String(r.slug),
      title: String(r.title),
      summary: String(r.summary || ''),
      category_slug: String(r.category_slug || 'umum'),
      article_type: String(r.article_type || 'CLUSTER'),
      created_at: String(r.created_at || ''),
    }));
  } catch (err) {
    console.error('Failed to load articles index:', err);
  }

  if (articles.length === 0) {
    articles = [
      {
        slug: 'panduan-memilih-upright-chiller-bekas-resto-berkualitas',
        title: 'Panduan Lengkap Memilih Upright Chiller Bekas Restoran Bergaransi',
        summary: 'Tips praktis inspeksi kompresor, kondisi karet pintu, thermostat digital, dan uji suhu operasional kulkas resto komersial bekas.',
        category_slug: 'upright-chiller',
        article_type: 'BUYER_GUIDE',
        created_at: new Date().toISOString(),
      },
    ];
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <Header />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-3 mb-8">
          <span className="rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
            Knowledge Base &amp; Buyer Guides
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950">
            Panduan &amp; Edukasi Peralatan Dapur Restoran
          </h1>
          <p className="text-sm text-slate-600">
            Kumpulan panduan komprehensif dari tim teknis BBKitchen untuk membantu Anda memilih peralatan dapur komersial bekas yang awet, efisien, dan bergaransi resmi.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/posts/${encodeURIComponent(a.slug)}`}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-500 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wider">
                    {a.article_type}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {new Date(a.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-950 group-hover:text-emerald-700 transition line-clamp-2">
                  {a.title}
                </h2>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {a.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Baca Panduan Lengkap</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer onSelectCategory={() => undefined} />
    </main>
  );
}
