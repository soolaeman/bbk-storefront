import { NextResponse } from 'next/server';

const SITE_URL = 'https://bukanbarukitchen.com';
const PRODUCTS_PER_API_PAGE = 100;
const PRODUCTS_PER_SITEMAP = 500;

function xmlEscape(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

async function getProductTotalPages(): Promise<number> {
  const response = await fetch(
    `${SITE_URL}/api/products?status=publish&per_page=${PRODUCTS_PER_API_PAGE}&page=1&orderby=date&order=desc`,
    { headers: { Accept: 'application/json' }, next: { revalidate: 3600 } },
  );

  if (!response.ok) throw new Error(`Products sitemap source failed: ${response.status}`);

  const totalPages = Number(response.headers.get('X-WP-TotalPages') || '1');
  const productsPerSitemap = Math.ceil(PRODUCTS_PER_SITEMAP / PRODUCTS_PER_API_PAGE);
  return Math.max(1, Math.ceil(totalPages / productsPerSitemap));
}

export async function GET() {
  try {
    const productSitemapCount = await getProductTotalPages();
    const entries = [
      `${SITE_URL}/sitemap-static.xml`,
      `${SITE_URL}/sitemap-categories.xml`,
      ...Array.from({ length: productSitemapCount }, (_, index) => `${SITE_URL}/sitemap-products/${index + 1}.xml`),
    ];

    const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      entries.map((url) => `  <sitemap><loc>${xmlEscape(url)}</loc></sitemap>`).join('\n') +
      `\n</sitemapindex>`;

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Sitemap index generation failed:', error);
    return new NextResponse('Sitemap generation failed', { status: 502 });
  }
}
