import { NextResponse } from 'next/server';

const SITE_URL = 'https://www.bukanbarukitchen.com';

const staticUrls = [
  { path: '', changefreq: 'daily', priority: '1.0' },
  { path: '/katalog', changefreq: 'daily', priority: '0.9' },
  { path: '/jual-barang-bekas-restoran', changefreq: 'weekly', priority: '0.8' },
  { path: '/jual-unit', changefreq: 'weekly', priority: '0.7' },
  { path: '/dapur-mbg', changefreq: 'weekly', priority: '0.7' },
];

export async function GET() {
  const urls = staticUrls.map(
    ({ path, changefreq, priority }) =>
      `  <url><loc>${SITE_URL}${path}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`,
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
