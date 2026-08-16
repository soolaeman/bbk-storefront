import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '../../../components/Header';
import { getWordPressPages } from '../../../lib/wordpress';

interface LocationPageProps {
  params: Promise<{ slug: string[] }>;
}

interface LocationPageData {
  id: number;
  title: { rendered: string };
  excerpt?: { rendered?: string };
  content: { rendered: string };
  link: string;
  parent: number;
  slug: string;
}

async function getLocationPage(slugPath: string[]) {
  if (slugPath.length === 0) return undefined;

  const roots = await getWordPressPages({
    slug: 'jual-barang-bekas-restoran',
    parent: 0,
  });

  const root = roots[0];
  if (!root) return undefined;

  let parentId = root.id;
  let page: LocationPageData | undefined;

  for (const segment of slugPath) {
    const pages = await getWordPressPages({
      slug: segment,
      parent: parentId,
    });

    page = pages[0];
    if (!page) return undefined;

    parentId = page.id;
  }

  return page;
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, '').trim();
}

function toBreadcrumbLabel(value: string) {
  return value
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getBreadcrumbItems(slugPath: string[]) {
  return [
    { label: 'Home', href: '/' },
    {
      label: 'Jual Barang Bekas Restoran',
      href: '/jual-barang-bekas-restoran',
    },
    ...slugPath.slice(0, -1).map((segment, index) => ({
      label: toBreadcrumbLabel(segment),
      href: `/jual-barang-bekas-restoran/${slugPath.slice(0, index + 1).join('/')}`,
    })),
    {
      label: toBreadcrumbLabel(slugPath[slugPath.length - 1] ?? ''),
      href: null,
    },
  ];
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLocationPage(slug);

  if (!page) return {};

  return {
    title: page.title?.rendered,
    description: page.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim(),
    alternates: {
      canonical: page.link,
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const page = await getLocationPage(slug);

  if (!page) notFound();

  const breadcrumbItems = getBreadcrumbItems(slug);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Header />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 rounded-2xl border border-slate-200/80 bg-white px-3 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/[0.02] sm:px-4"
          >
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs leading-6 sm:text-sm">
              {breadcrumbItems.map((item, index) => {
                const isCurrent = item.href === null;

                return (
                  <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1.5">
                    {index > 0 ? (
                      <span aria-hidden="true" className="px-0.5 text-slate-300">
                        /
                      </span>
                    ) : null}

                    {isCurrent ? (
                      <span
                        aria-current="page"
                        className="max-w-full truncate rounded-lg bg-slate-900 px-2.5 py-1 font-semibold text-white shadow-sm sm:px-3"
                      >
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="rounded-lg px-2 py-1 font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 sm:px-2.5"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <header className="mb-10 border-b border-slate-200 pb-8">
            <h1
              className="max-w-4xl text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
              dangerouslySetInnerHTML={{ __html: page.title.rendered }}
            />
          </header>

          <div
            className="prose prose-slate max-w-none overflow-hidden text-[15px] leading-7 sm:text-base sm:leading-8
              [&_h1]:mb-6 [&_h1]:mt-10 [&_h1]:text-3xl [&_h1]:font-black [&_h1]:leading-tight [&_h1]:text-slate-900
              [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:rounded-xl [&_h2]:border-l-4 [&_h2]:border-emerald-500 [&_h2]:bg-slate-50 [&_h2]:px-4 [&_h2]:py-3 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:text-slate-900
              [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:rounded-lg [&_h3]:bg-slate-50 [&_h3]:px-3 [&_h3]:py-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:leading-tight [&_h3]:text-slate-900
              [&_p]:mb-6 [&_p]:leading-8 [&_p]:text-slate-700
              [&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
              [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6
              [&_li]:my-0 [&_li]:pl-1
              [&_a]:break-words [&_a]:font-semibold [&_a]:text-emerald-700 [&_a]:underline [&_a]:underline-offset-2
              [&_blockquote]:my-8 [&_blockquote]:rounded-xl [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-500 [&_blockquote]:bg-emerald-50 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:italic
              [&_strong]:font-bold [&_img]:!mx-auto [&_img]:!h-auto [&_img]:!max-w-full
              [&_figure]:!mx-auto [&_figure]:!max-w-full [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-slate-500
              [&_iframe]:!mx-auto [&_iframe]:!max-w-full [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:text-sm [&_video]:!mx-auto [&_video]:!max-w-full"
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        </article>
      </main>
    </div>
  );
}
