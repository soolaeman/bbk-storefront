import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_WOOCOMMERCE_ORIGIN = 'https://jkt10.dewaweb.com';
const DEFAULT_WOOCOMMERCE_HOST = 'www.bukanbarukitchen.com';

const WOOCOMMERCE_ORIGIN = (
  process.env.WOOCOMMERCE_API_URL || DEFAULT_WOOCOMMERCE_ORIGIN
)
  .replace(/\/$/, '')
  .replace(/\/wp-json\/wc\/v3$/i, '');

const WOOCOMMERCE_HOST = process.env.WOOCOMMERCE_API_URL
  ? undefined
  : DEFAULT_WOOCOMMERCE_HOST;

function getAuthorization(): string | null {
  const key = process.env.WC_CONSUMER_KEY;
  const secret = process.env.WC_CONSUMER_SECRET;
  if (!key || !secret) return null;
  return `Basic ${Buffer.from(`${key}:${secret}`).toString('base64')}`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const authorization = getAuthorization();
  if (!authorization) {
    return NextResponse.json(
      { error: 'WooCommerce credentials belum dikonfigurasi di environment server.' },
      { status: 500 },
    );
  }

  try {
    const { slug } = await params;
    const route = slug.join('/');
    const target = new URL(`${WOOCOMMERCE_ORIGIN}/`);
    target.searchParams.set('rest_route', `/wc/v3/${route}`);
    request.nextUrl.searchParams.forEach((value, key) => {
      target.searchParams.set(key, value);
    });

    const response = await fetch(target, {
      headers: {
        Accept: 'application/json',
        Authorization: authorization,
        ...(WOOCOMMERCE_HOST ? { Host: WOOCOMMERCE_HOST } : {}),
      },
      cache: 'no-store',
    });

    const body = await response.text();
    const headers = new Headers({
      'Content-Type': response.headers.get('content-type') || 'application/json',
      'Cache-Control': 'no-store',
    });

    const total = response.headers.get('X-WP-Total');
    const totalPages = response.headers.get('X-WP-TotalPages');
    if (total) headers.set('X-WP-Total', total);
    if (totalPages) headers.set('X-WP-TotalPages', totalPages);

    return new NextResponse(body, { status: response.status, headers });
  } catch (error) {
    console.error('WooCommerce compatibility proxy failed:', error);
    return NextResponse.json(
      { error: 'Gagal menghubungi WooCommerce API.' },
      { status: 502 },
    );
  }
}
