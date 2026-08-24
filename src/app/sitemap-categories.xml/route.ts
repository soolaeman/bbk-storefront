import { NextResponse } from 'next/server';

const SITE_URL = 'https://www.bukanbarukitchen.com';

type Category = { slug?: string; parent?: number };

function xmlEscape(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export async function GET() {
  try {
    const response = await fetch(`${SITE_URL}/api/products?metadata=1`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`Category sitemap source failed: ${response.status}`);

    const metadata = (await response.json()) as { categories?: Category[] };
    const categories = (metadata.categories || []).filter((category) => category.slug);
    const urls = categories.map((category) =>
      `  <url><loc>${xmlEscape(`${SITE_URL}/product-category/${category.slug}`)}</loc><changefreq>daily</changefreq><priority>${category.parent === 0 ? '0.8' : '0.7'}</priority></url>`,
    );

    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Category sitemap generation failed:', error);
    return new NextResponse('Sitemap generation failed', { status: 502 });
  }
}
