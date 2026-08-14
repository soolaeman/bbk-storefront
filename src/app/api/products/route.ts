import { NextRequest, NextResponse } from 'next/server';

const WOOCOMMERCE_API_URL =
  process.env.WOOCOMMERCE_API_URL ||
  'https://www.bukanbarukitchen.com/wp-json/wc/v3';

function getWooCommerceAuthHeader(): string | null {
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    return null;
  }

  return `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`;
}

function copyPaginationHeaders(response: Response, headers: Headers): void {
  const total = response.headers.get('X-WP-Total');
  const totalPages = response.headers.get('X-WP-TotalPages');

  if (total) headers.set('X-WP-Total', total);
  if (totalPages) headers.set('X-WP-TotalPages', totalPages);
}

export async function GET(request: NextRequest) {
  const authorization = getWooCommerceAuthHeader();

  if (!authorization) {
    return NextResponse.json(
      {
        error:
          'WooCommerce credentials belum dikonfigurasi di environment server.',
      },
      { status: 500 },
    );
  }

  const incomingParams = request.nextUrl.searchParams;
  const params = new URLSearchParams();

  params.set('status', incomingParams.get('status') || 'publish');
  params.set('per_page', incomingParams.get('per_page') || '8');
  params.set('page', incomingParams.get('page') || '1');

  const url = `${WOOCOMMERCE_API_URL}/products?${params.toString()}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: authorization,
      },
      next: {
        revalidate: 60,
      },
    });

    const body = await response.text();
    const contentType = response.headers.get('content-type') || 'application/json';
    const responseHeaders = new Headers({
      'Content-Type': contentType,
    });

    copyPaginationHeaders(response, responseHeaders);

    if (!response.ok) {
      return new NextResponse(body, {
        status: response.status,
        headers: responseHeaders,
      });
    }

    responseHeaders.set(
      'Cache-Control',
      's-maxage=60, stale-while-revalidate=300',
    );

    return new NextResponse(body, {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('WooCommerce proxy request failed:', error);

    return NextResponse.json(
      {
        error: 'Gagal menghubungi WooCommerce API.',
      },
      { status: 502 },
    );
  }
}
