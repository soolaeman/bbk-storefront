import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { getWordPressPages, getWordPressPosts } from '../../lib/wordpress';

interface RouteContent {
  title: string;
  content: string;
  excerpt: string;
  modified: string;
  type: 'page' | 'post';
  path: string;
}

async function resolveContent(slug: string[]): Promise<RouteContent | null> {
  const normalizedPath = `/${slug.join('/')}`;
  const leaf = slug[slug.length - 1];

  const pages = await getWordPressPages({ slug: leaf, perPage: 100 });
  const page = pages.find((item) => {
    const urlPath = new URL(item.link).pathname.replace(/\/$/, '') || '/';
    return urlPath === normalizedPath.replace(/\/$/, '') || slug.length === 1;
  });
  if (page) return { title: page.title.rendered, content: page.content.rendered, excerpt: page.excerpt.rendered, modified: page.modified, type: 'page', path: normalizedPath };

  const posts = await getWordPressPosts({ slug: leaf, perPage: 100 });
  const post = posts.find((item) => {
    const urlPath = new URL(item.link).pathname.replace(/\/$/, '');
    return urlPath === normalizedPath.replace(/\/$/, '') || slug.length === 1;
  });
  if (post) return { title: post.title.rendered, content: post.content.rendered, excerpt: post.excerpt.rendered, modified: post.modified, type: 'post', path: normalizedPath };

  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = await resolveContent(slug);
  if (!content) return { title: 'Halaman Tidak Ditemukan | BBKitchen' };
  return {
    title: content.title.replace(/<[^>]+>/g, ''),
    description: content.excerpt.replace(/<[^>]+>/g, '').slice(0, 160),
    alternates: { canonical: `https://www.bukanbarukitchen.com${content.path === '/' ? '/' : `${content.path.replace(/\/$/, '')}/`}` },
  };
}

export default async function WordPressContentPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const content = await resolveContent(slug);
  if (!content) notFound();

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <Header />
      <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-5 text-xs font-medium text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          {slug.map((part) => <span key={part} className="ml-2">› {part.replace(/-/g, ' ')}</span>)}
        </nav>
        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-600">{content.type === 'post' ? 'Artikel' : 'Halaman'}</p>
          <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-4xl" dangerouslySetInnerHTML={{ __html: content.title }} />
          <p className="mt-3 text-xs text-slate-500">Diperbarui {new Date(content.modified).toLocaleDateString('id-ID')}</p>
        </header>
        <div className="prose prose-slate mt-5 max-w-none rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 prose-headings:font-black prose-headings:text-slate-950 prose-a:text-emerald-700">
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
        </div>
      </article>
      <Footer />
    </main>
  );
}
