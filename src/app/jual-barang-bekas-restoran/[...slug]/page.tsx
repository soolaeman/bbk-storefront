import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWordPressPages } from '../../../lib/wordpress';

interface LocationPageProps {
  params: Promise<{ slug: string[] }>;
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
  let page = undefined;

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

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <article className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1
            className="text-3xl font-black tracking-tight sm:text-4xl"
            dangerouslySetInnerHTML={{ __html: page.title.rendered }}
          />
        </header>

        <div
          className="prose prose-slate max-w-none rounded-2xl bg-white p-6 shadow-sm sm:p-8"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      </article>
    </main>
  );
}
