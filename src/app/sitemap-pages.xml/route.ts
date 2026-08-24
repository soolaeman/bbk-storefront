import { NextResponse } from 'next/server';

const SITE_URL = 'https://www.bukanbarukitchen.com';
const WP_ORIGIN = 'https://origin.bukanbarukitchen.com';
const PER_PAGE = 100;
const REVALIDATE_SECONDS = 86400;

type WordPressPage = {
  slug?: string;
  link?: string;
  date_modified?: string;
};

function xmlEscape(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function toCanonicalUrl(page: WordPressPage): string | null {
  try {
    if (page.link) {
      const pathname = new URL(page.link).pathname;
      return `${SITE_URL}${pathname === '/' ? '/' : pathname.endsWith('/') ? pathname : `${pathname}/`}`;
    }
  } catch {
    // Fall back to the WordPress slug when a page link is malformed.
  }

  if (page.slug) return `${SITE_URL}/${page.slug}/`;
  return null;
}

async function fetchPages(page: number): Promise<{ pages: WordPressPage[]; totalPages: number }> {
  const response = await fetch(
    `${WP_ORIGIN}/wp-json/wp/v2/pages?status=publish&per_page=${PER_PAGE}&page=${page}&orderby=modified&order=desc&_fields=slug,link,date_modified`,
    { headers: { Accept: 'application/json' }, next: { revalidate: REVALIDATE_SECONDS } },
  );
  if (!response.ok) throw new Error(`Page sitemap source failed: ${response.status}`);
  const payload: unknown = await response.json();
  const pages = Array.isArray(payload) ? (payload as WordPressPage[]) : [];
  return { pages, totalPages: Number(response.headers.get('X-WP-TotalPages') || '1') };
}

export async function GET() {
  try {
    const first = await fetchPages(1);
    const batches = await Promise.all(
      Array.from({ length: Math.max(0, first.totalPages - 1) }, (_, index) => fetchPages(index + 2)),
    );
    const pages = first.pages.concat(batches.flatMap((batch) => batch.pages));
    const urls = pages
      .map((page) => {
        const canonicalUrl = toCanonicalUrl(page);
        if (!canonicalUrl) return null;
        const lastmod = page.date_modified ? `<lastmod>${xmlEscape(new Date(page.date_modified).toISOString())}</lastmod>` : '';
        return `  <url><loc>${xmlEscape(canonicalUrl)}</loc>${lastmod}<changefreq>monthly</changefreq><priority>0.5</priority></url>`;
      })
      .filter((url): url is string => Boolean(url));
    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
    return new NextResponse(body, { status: 200, headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': `public, max-age=${REVALIDATE_SECONDS}, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=604800` } });
  } catch (error) {
    console.error('Page sitemap generation failed:', error);
    return new NextResponse('Sitemap generation failed', { status: 502 });
  }
}
