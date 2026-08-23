import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_WOOCOMMERCE_API_ORIGIN = 'https://origin.bukanbarukitchen.com';

const WOOCOMMERCE_API_ORIGIN = (
  process.env.WOOCOMMERCE_API_URL || DEFAULT_WOOCOMMERCE_API_ORIGIN
)
  .replace(/\/$/, '')
  .replace(/\/wp-json\/wc\/v3$/i, '');

function hasWooCommerceCredentials(): boolean {
  return Boolean(process.env.WC_CONSUMER_KEY && process.env.WC_CONSUMER_SECRET);
}

function getWooCommerceHeaders(): HeadersInit {
  return {
    Accept: 'application/json',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  };
}

function buildWooCommerceUrl(resource: string, params?: URLSearchParams): string {
  const baseUrl = `${WOOCOMMERCE_API_ORIGIN}/wp-json/wc/v3/${resource}`;
  const query = new URLSearchParams(params);

  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;
  if (consumerKey && consumerSecret) {
    query.set('consumer_key', consumerKey);
    query.set('consumer_secret', consumerSecret);
  }

  const queryString = query.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!hasWooCommerceCredentials()) {
    return NextResponse.json(
      { error: 'WooCommerce credentials belum dikonfigurasi di environment server.' },
      { status: 500 },
    );
  }

  const { slug } = await params;
  const normalizedSlug = slug?.trim();

  if (!normalizedSlug) {
    return NextResponse.json({ error: 'Slug produk tidak ditemukan.' }, { status: 400 });
  }

  try {
    const query = new URLSearchParams({
      slug: normalizedSlug,
      status: 'publish',
      per_page: '1',
    });

    const response = await fetch(buildWooCommerceUrl('products', query), {
      headers: getWooCommerceHeaders(),
      next: { revalidate: 60 },
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error(
        `WooCommerce single product lookup failed (${response.status}):`,
        responseText.slice(0, 300),
      );
      return NextResponse.json(
        { error: `Gagal mengambil detail produk dari WooCommerce (${response.status})` },
        { status: response.status },
      );
    }

    let products: unknown;
    try {
      products = JSON.parse(responseText);
    } catch {
      console.error(
        'WooCommerce single product response bukan JSON:',
        responseText.slice(0, 300),
      );
      return NextResponse.json(
        { error: 'Format respon WooCommerce tidak valid (HTML/non-JSON).' },
        { status: 502 },
      );
    }

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: 'Produk tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json(products[0], {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('WooCommerce single product proxy failed:', error);
    return NextResponse.json(
      { error: 'Gagal menghubungi WooCommerce API untuk detail produk.' },
      { status: 502 },
    );
  }
}
