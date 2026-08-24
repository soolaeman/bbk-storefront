import { NextResponse } from 'next/server';

const SITE_URL = 'https://www.bukanbarukitchen.com';
const API_PAGE_SIZE = 100;
const PRODUCTS_PER_SITEMAP = 500;
const API_PAGES_PER_SITEMAP = PRODUCTS_PER_SITEMAP / API_PAGE_SIZE;
const SITEMAP_REVALIDATE_SECONDS = 86400;

type Product = { slug?: string; date_modified?: string };

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function fetchProducts(page: number): Promise<Product[]> {
  const response = await fetch(
    `${SITE_URL}/api/products?status=publish&per_page=${API_PAGE_SIZE}&page=${page}&orderby=date&order=desc`,
    { headers: { Accept: 'application/json' }, next: { revalidate: SITEMAP_REVALIDATE_SECONDS } },
  );

  if (!response.ok) throw new Error(`Product sitemap page ${page} failed: ${response.status}`);
  return (await response.json()) as Product[];
}

export async function GET(_request: Request, context: { params: Promise<{ path?: string[] }> }) {
  try {
    const { path = [] } = await context.params;
    const rawPage = path.at(-1)?.replace(/\.xml$/i, '');
    const sitemapPage = Math.max(Number(rawPage) || 1, 1);
    const firstApiPage = (sitemapPage - 1) * API_PAGES_PER_SITEMAP + 1;

    const batches = await Promise.all(
      Array.from({ length: API_PAGES_PER_SITEMAP }, (_, index) => fetchProducts(firstApiPage + index)),
    );
    const products = batches.flat().filter((product) => product.slug);

    if (products.length === 0 && sitemapPage > 1) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const urls = products.map((product) => {
      const lastmod = product.date_modified
        ? `<lastmod>${xmlEscape(new Date(product.date_modified).toISOString())}</lastmod>`
        : '';
      return `  <url><loc>${xmlEscape(`${SITE_URL}/shop/${product.slug}`)}</loc>${lastmod}<changefreq>weekly</changefreq><priority>0.8</priority></url>`;
    });

    const body =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': `public, max-age=${SITEMAP_REVALIDATE_SECONDS}, s-maxage=${SITEMAP_REVALIDATE_SECONDS}, stale-while-revalidate=604800`,
      },
    });
  } catch (error) {
    console.error('Product sitemap generation failed:', error);
    return new NextResponse('Sitemap generation failed', { status: 502 });
  }
}
