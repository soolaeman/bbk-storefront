import type { Metadata } from 'next';
import Link from 'next/link';
import { getWordPressPosts, type WordPressPost } from '../../lib/wordpress';

const SITE_URL = 'https://www.bukanbarukitchen.com';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Artikel BBKitchen | Peralatan Dapur Komersial',
  description:
    'Artikel dan informasi BBKitchen seputar peralatan dapur komersial, restoran, cafe, bakery, dan usaha kuliner.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Artikel BBKitchen | Peralatan Dapur Komersial',
    description:
      'Artikel dan informasi BBKitchen seputar peralatan dapur komersial, restoran, cafe, bakery, dan usaha kuliner.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function getExcerpt(post: WordPressPost) {
  const excerpt = stripHtml(post.excerpt.rendered);
  if (excerpt) return excerpt;

  const content = stripHtml(post.content.rendered);
  return content.length > 180 ? `${content.slice(0, 177)}...` : content;
}

export default async function BlogArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const parsedPage = Number(params.page || '1');
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  let posts: WordPressPost[] = [];
  let errorMessage = '';

  try {
    posts = await getWordPressPosts({
      page,
      perPage: 12,
      status: 'publish',
      orderby: 'date',
      order: 'desc',
    });
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'Artikel gagal dimuat.';
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
            BBKitchen Content
          </p>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Artikel &amp; Informasi Dapur Usaha
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Konten WordPress live BBKitchen untuk informasi peralatan dapur komersial,
            restoran, cafe, bakery, dan usaha kuliner.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        {errorMessage ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
            {errorMessage}
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            Belum ada artikel pada halaman ini.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  {formatDate(post.date)}
                </p>
                <h2 className="mt-2 text-lg font-extrabold leading-snug text-slate-900">
                  <Link href={`/blog/${post.slug}`} className="hover:text-emerald-700">
                    {post.title.rendered}
                  </Link>
                </h2>
                <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">
                  {getExcerpt(post)}
                </p>
                <div className="mt-auto pt-5">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    Baca artikel →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <nav className="mt-8 flex items-center justify-between" aria-label="Pagination artikel">
          {page > 1 ? (
            <Link
              href={`/blog?page=${page - 1}`}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              ← Sebelumnya
            </Link>
          ) : (
            <span />
          )}

          <span className="text-xs font-semibold text-slate-400">Halaman {page}</span>

          {posts.length === 12 ? (
            <Link
              href={`/blog?page=${page + 1}`}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Berikutnya →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </section>
    </main>
  );
}
