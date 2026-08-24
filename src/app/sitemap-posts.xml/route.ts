import { NextResponse } from 'next/server';

const SITE_URL = 'https://www.bukanbarukitchen.com';
const WP_ORIGIN = 'https://origin.bukanbarukitchen.com';
const PER_PAGE = 100;
const REVALIDATE_SECONDS = 86400;

type WordPressPost = { slug?: string; date_modified?: string };

function xmlEscape(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

async function fetchPosts(page: number): Promise<{ posts: WordPressPost[]; totalPages: number }> {
  const response = await fetch(
    `${WP_ORIGIN}/wp-json/wp/v2/posts?status=publish&per_page=${PER_PAGE}&page=${page}&orderby=date&order=desc&_fields=slug,date_modified`,
    { headers: { Accept: 'application/json' }, next: { revalidate: REVALIDATE_SECONDS } },
  );
  if (!response.ok) throw new Error(`Post sitemap source failed: ${response.status}`);
  const payload: unknown = await response.json();
  const posts = Array.isArray(payload) ? (payload as WordPressPost[]) : [];
  return { posts, totalPages: Number(response.headers.get('X-WP-TotalPages') || '1') };
}

export async function GET() {
  try {
    const first = await fetchPosts(1);
    const batches = await Promise.all(
      Array.from({ length: Math.max(0, first.totalPages - 1) }, (_, index) => fetchPosts(index + 2)),
    );
    const posts = [first.posts, ...batches.flatMap((batch) => batch.posts)].filter((post) => post.slug);
    const urls = posts.map((post) => {
      const lastmod = post.date_modified ? `<lastmod>${xmlEscape(new Date(post.date_modified).toISOString())}</lastmod>` : '';
      return `  <url><loc>${xmlEscape(`${SITE_URL}/${post.slug}`)}</loc>${lastmod}<changefreq>weekly</changefreq><priority>0.6</priority></url>`;
    });
    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
    return new NextResponse(body, { status: 200, headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': `public, max-age=${REVALIDATE_SECONDS}, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=604800` } });
  } catch (error) {
    console.error('Post sitemap generation failed:', error);
    return new NextResponse('Sitemap generation failed', { status: 502 });
  }
}
