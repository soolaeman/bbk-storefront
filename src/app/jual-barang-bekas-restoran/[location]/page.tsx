import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWordPressPages } from '../../../lib/wordpress';

interface LocationPageProps {
  params: Promise<{ location: string }>;
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { location } = await params;
  const pages = await getWordPressPages({ slug: `jual-barang-bekas-restoran-${location}` });
  const page = pages[0];

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
  const { location } = await params;
  const pages = await getWordPressPages({ slug: `jual-barang-bekas-restoran-${location}` });
  const page = pages[0];

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
