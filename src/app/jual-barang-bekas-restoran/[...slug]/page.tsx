import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '../../../components/Header';
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
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Header simple />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <h1
              className="max-w-4xl text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
              dangerouslySetInnerHTML={{ __html: page.title.rendered }}
            />
          </header>

          <div
            className="prose max-w-none overflow-hidden text-[15px] leading-7 text-slate-700 sm:text-base sm:leading-8 [&_h1]:mb-6 [&_h1]:mt-10 [&_h1]:text-3xl [&_h1]:font-black [&_h1]:leading-tight [&_h1]:text-slate-900 [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:text-slate-900 [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:leading-tight [&_h3]:text-slate-900 [&_p]:mb-5 [&_p]:leading-7 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-2 [&_a]:break-words [&_a]:font-semibold [&_a]:text-emerald-700 [&_a]:underline [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-500 [&_blockquote]:pl-5 [&_blockquote]:italic [&_strong]:font-bold [&_img]:!mx-auto [&_img]:!h-auto [&_img]:!max-w-full [&_figure]:!mx-auto [&_figure]:!max-w-full [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-slate-500 [&_iframe]:!mx-auto [&_iframe]:!max-w-full [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:text-sm [&_video]:!mx-auto [&_video]:!max-w-full"
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        </article>
      </main>
    </div>
  );
}
