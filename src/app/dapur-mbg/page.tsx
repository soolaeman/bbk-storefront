import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { getWordPressPages } from '../../lib/wordpress';

const SITE_URL = 'https://www.bukanbarukitchen.com';
const CMS_SLUG = 'dapur-mbg';
const PUBLIC_PATH = '/solusi-peralatan-dapur-mbg/';

type WordPressPage = {
  id: number;
  slug: string;
  link: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
};

async function getMbgContentPage(): Promise<WordPressPage | undefined> {
  const pages = await getWordPressPages({ slug: CMS_SLUG, parent: 0 });
  return pages[0] as WordPressPage | undefined;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getMbgContentPage();
  if (!page) return {};

  const publicUrl = `${SITE_URL}${PUBLIC_PATH}`;
  return {
    title: page.title?.rendered,
    description: page.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim(),
    alternates: { canonical: publicUrl },
    openGraph: {
      title: page.title?.rendered,
      description: page.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim(),
      url: publicUrl,
      type: 'website',
    },
  };
}

export default async function DapurMbgPage() {
  const page = await getMbgContentPage();
  if (!page) notFound();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main>
        <article className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <header className="mb-8 border-b border-slate-200 pb-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">BBKitchen • Dapur MBG</p>
            <h1
              className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl"
              dangerouslySetInnerHTML={{ __html: page.title?.rendered || 'Dapur MBG' }}
            />
          </header>
          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content?.rendered || '' }}
          />
        </article>
      </main>
      <Footer onSelectCategory={() => undefined} />
    </div>
  );
}
