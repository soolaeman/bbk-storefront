import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { getWordPressPages } from '../../../lib/wordpress';

interface MbgPage {
  id: number;
  title: { rendered: string };
  excerpt?: { rendered?: string };
  content: { rendered: string };
  link: string;
  parent: number;
  slug: string;
}

interface Params {
  slug: string[];
}

const PUBLIC_SITE_ORIGIN = 'https://www.bukanbarukitchen.com';

async function getMbgPage(slugs: string[]): Promise<MbgPage | undefined> {
  const parents = await getWordPressPages({ slug: 'solusi-peralatan-dapur-mbg', parent: 0 });
  const root = parents[0] as MbgPage | undefined;
  if (!root) return undefined;

  let parentId = root.id;
  let page: MbgPage | undefined;

  for (const slug of slugs) {
    const pages = await getWordPressPages({ slug, parent: parentId });
    page = pages[0] as MbgPage | undefined;
    if (!page) return undefined;
    parentId = page.id;
  }

  return page;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getMbgPage(slug);
  if (!page) return {};

  const canonical = `${PUBLIC_SITE_ORIGIN}/solusi-peralatan-dapur-mbg/${slug.join('/')}/`;
  return {
    title: page.title?.rendered,
    description: page.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim(),
    alternates: { canonical },
  };
}

export default async function MbgHierarchicalPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = await getMbgPage(slug);
  if (!page) notFound();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Header />
      <article className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <a href="/">Home</a> <span className="mx-1">/</span>
          <a href="/solusi-peralatan-dapur-mbg/">Solusi Peralatan Dapur MBG</a>
          {slug.map((segment, index) => (
            <span key={`${segment}-${index}`}>
              <span className="mx-1">/</span>
              <span className={index === slug.length - 1 ? 'font-medium text-slate-700' : undefined}>
                {segment.replace(/-/g, ' ')}
              </span>
            </span>
          ))}
        </nav>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-black leading-tight sm:text-4xl" dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
        </header>
        <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      </article>
      <Footer onSelectCategory={() => undefined} />
    </main>
  );
}
