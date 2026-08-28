import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { getWordPressPages, type WordPressPage } from '../../lib/wordpress';

const SITE_URL = 'https://www.bukanbarukitchen.com';
const ITEMS_PER_PAGE = 24;

export const metadata: Metadata = {
  title: 'Jual Barang Bekas Restoran',
  description:
    'Kumpulan halaman dan artikel BBKitchen tentang jual barang bekas restoran dan peralatan dapur komersial.',
  alternates: {
    canonical: `${SITE_URL}/jual-barang-bekas-restoran/`,
  },
};

function firstH2(contentHtml: string) {
  const match = contentHtml.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i);
  if (!match) return '';

  return match[1]
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function getDescendants(pages: WordPressPage[], rootId: number) {
  const byId = new Map(pages.map((page) => [page.id, page]));
  return pages.filter((page) => {
    if (page.id === rootId) return false;

    let parentId = page.parent;
    const visited = new Set<number>();

    while (parentId && !visited.has(parentId)) {
      if (parentId === rootId) return true;
      visited.add(parentId);
      parentId = byId.get(parentId)?.parent ?? 0;
    }

    return false;
  });
}

async function getArticleIndex() {
  const roots = await getWordPressPages({
    slug: 'jual-barang-bekas-restoran',
    parent: 0,
    perPage: 10,
  });

  const root = roots[0];
  if (!root) return [];

  // Jangan mengambil 100 halaman sekaligus: respons WordPress bisa >2 MB
  // dan membuat Next.js Data Cache gagal. Ambil batch kecil secara paralel.
  const allPages: WordPressPage[] = [];
  const BATCH_SIZE = 20;
  const MAX_BATCHES = 15;

  for (let startBatch = 1; startBatch <= MAX_BATCHES; startBatch += 5) {
    const batchNumbers = Array.from(
      { length: Math.min(5, MAX_BATCHES - startBatch + 1) },
      (_, index) => startBatch + index,
    );

    const batches = await Promise.all(
      batchNumbers.map((page) =>
        getWordPressPages({
          perPage: BATCH_SIZE,
          page,
          orderby: 'menu_order',
          order: 'asc',
          fields: 'id,parent,slug,content,link',
        }),
      ),
    );

    for (const batch of batches) {
      allPages.push(...batch);
    }

    if (batches.some((batch) => batch.length < BATCH_SIZE)) break;
  }

  const descendants = getDescendants(allPages, root.id);
  const seen = new Set<string>();
  const items: { id: number; title: string; href: string }[] = [];

  for (const page of descendants) {
    const title = firstH2(page.content?.rendered ?? '');
    if (!title) continue;

    const key = title.toLocaleLowerCase('id-ID');
    if (seen.has(key)) continue;

    seen.add(key);
    const href = (() => { try { const path = new URL(page.link).pathname; return path.endsWith('/') ? path : `${path}/`; } catch { return ''; } })();
    if (!href) continue;
    items.push({ id: page.id, title, href });
  }

  return items;
}

function pageNumbers(current: number, total: number) {
  const pages = new Set<number>([1, total, current]);
  if (current > 1) pages.add(current - 1);
  if (current < total) pages.add(current + 1);
  if (current > 2) pages.add(2);
  if (current < total - 1) pages.add(total - 1);

  return [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
}

export default async function JualBarangBekasRestoranPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string | string[] }>;
}) {
  const articles = await getArticleIndex();
  const params = searchParams ? await searchParams : {};
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const requestedPage = Number.parseInt(rawPage ?? '1', 10);
  const totalPages = Math.max(1, Math.ceil(articles.length / ITEMS_PER_PAGE));
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleArticles = articles.slice(start, start + ITEMS_PER_PAGE);
  const numbers = pageNumbers(currentPage, totalPages);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Header />

      <main>
        <article className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 overflow-x-auto text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="inline-flex min-w-max items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-600">
              <Link href="/" className="font-medium hover:text-slate-950">
                Home
              </Link>
              <span aria-hidden="true" className="text-slate-300">
                /
              </span>
              <span aria-current="page" className="font-semibold text-slate-900">
                Jual Barang Bekas Restoran
              </span>
            </div>
          </nav>

          <header className="mb-10 border-b border-slate-200 pb-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-amber-600">
              Artikel &amp; Tips
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Jual Barang Bekas Restoran
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              Temukan panduan, solusi, dan informasi seputar peralatan restoran
              bekas yang dikurasi dari halaman BBKitchen.
            </p>
          </header>

          <section aria-labelledby="article-index-title">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2
                  id="article-index-title"
                  className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl"
                >
                  Artikel &amp; Tips
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Judul kartu diambil dari H2 pertama setiap halaman dan mengarah ke halaman aslinya.
                </p>
              </div>
              <span className="hidden shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 sm:inline-flex">
                {articles.length} artikel
              </span>
            </div>

            {visibleArticles.length > 0 ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleArticles.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-black leading-snug text-slate-950 group-hover:text-emerald-700">
                          {item.title}
                        </h3>
                        <span className="shrink-0 text-sm font-bold text-emerald-700">
                          Baca →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav
                    aria-label="Pagination artikel"
                    className="mt-10 flex flex-wrap items-center justify-center gap-2"
                  >
                    {currentPage > 1 ? (
                      <Link
                        href={currentPage === 2 ? '?' : `?page=${currentPage - 1}`}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:border-emerald-200 hover:text-emerald-700"
                      >
                        ← Sebelumnya
                      </Link>
                    ) : (
                      <span className="rounded-xl border border-slate-100 px-4 py-2 text-sm font-bold text-slate-300">
                        ← Sebelumnya
                      </span>
                    )}

                    {numbers.map((number, index) => {
                      const previous = numbers[index - 1];
                      const needsGap = previous !== undefined && number - previous > 1;

                      return (
                        <span key={number} className="contents">
                          {needsGap && (
                            <span className="px-1 text-slate-400" aria-hidden="true">
                              …
                            </span>
                          )}
                          <Link
                            href={number === 1 ? '?' : `?page=${number}`}
                            aria-current={number === currentPage ? 'page' : undefined}
                            className={
                              number === currentPage
                                ? 'rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white'
                                : 'rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:border-emerald-200 hover:text-emerald-700'
                            }
                          >
                            {number}
                          </Link>
                        </span>
                      );
                    })}

                    {currentPage < totalPages ? (
                      <Link
                        href={`?page=${currentPage + 1}`}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:border-emerald-200 hover:text-emerald-700"
                      >
                        Berikutnya →
                      </Link>
                    ) : (
                      <span className="rounded-xl border border-slate-100 px-4 py-2 text-sm font-bold text-slate-300">
                        Berikutnya →
                      </span>
                    )}
                  </nav>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm text-slate-600">
                Belum ada halaman artikel yang tersedia.
              </div>
            )}
          </section>
        </article>
      </main>

      <Footer onSelectCategory={() => undefined} />
    </div>
  );
}
