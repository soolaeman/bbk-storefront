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
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Header />
      <article className="mx-auto w-full max-w-5xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <nav aria-label="Breadcrumb" className="mb-6 overflow-x-auto text-xs leading-6 text-slate-500 sm:text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex min-w-max items-center whitespace-nowrap rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <a href="/" className="hover:text-emerald-700">Home</a>
            <span className="mx-1.5 text-slate-300">/</span>
            <a href="/solusi-peralatan-dapur-mbg/" className="hover:text-emerald-700">Solusi Peralatan Dapur MBG</a>
            {slug.map((segment, index) => (
              <span key={`${segment}-${index}`} className="inline-flex items-center">
                <span className="mx-1.5 text-slate-300">/</span>
                <span className={index === slug.length - 1 ? 'font-semibold text-slate-800' : undefined}>
                  {segment.replace(/-/g, ' ')}
                </span>
              </span>
            ))}
          </div>
        </nav>

        <header className="mb-6 border-b border-slate-200 pb-6 sm:mb-8 sm:pb-8">
          <h1
            className="max-w-4xl text-2xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            dangerouslySetInnerHTML={{ __html: page.title.rendered }}
          />
        </header>

        <div
          className="max-w-none overflow-hidden text-[15px] leading-7 text-slate-700 sm:text-base sm:leading-8
            [&_h1]:mb-5 [&_h1]:mt-8 [&_h1]:text-2xl [&_h1]:font-black [&_h1]:leading-tight [&_h1]:text-slate-950 sm:[&_h1]:text-3xl
            [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-black [&_h2]:leading-tight [&_h2]:text-slate-950 sm:[&_h2]:text-2xl
            [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:leading-tight [&_h3]:text-slate-950
            [&_p]:mb-4 [&_p]:max-w-none [&_p]:leading-7 sm:[&_p]:leading-8
            [&_ul]:my-5 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:mb-2
            [&_ol]:my-5 [&_ol]:pl-5 [&_ol]:list-decimal
            [&_a]:break-words [&_a]:font-semibold [&_a]:text-emerald-700 [&_a]:underline [&_a]:underline-offset-2
            [&_strong]:font-bold [&_strong]:text-slate-950
            [&_img]:block [&_img]:mx-auto [&_img]:h-auto [&_img]:w-full [&_img]:max-w-full [&_img]:rounded-xl
            [&_figure]:mx-auto [&_figure]:w-full [&_figure]:max-w-full
            [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-slate-500
            [&_table]:block [&_table]:w-full [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:text-sm
            [&_iframe]:block [&_iframe]:mx-auto [&_iframe]:max-w-full"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      </article>
      <Footer onSelectCategory={() => undefined} />
    </main>
  );
}
