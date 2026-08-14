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

  return `Basic ${Buffer.from(
    `${consumerKey}:${consumerSecret}`,
  ).toString('base64')}`;
}

function copyPaginationHeaders(
  response: Response,
  headers: Headers,
): void {
  const total = response.headers.get('X-WP-Total');
  const totalPages = response.headers.get('X-WP-TotalPages');

  if (total) {
    headers.set('X-WP-Total', total);
  }

  if (totalPages) {
    headers.set('X-WP-TotalPages', totalPages);
  }
}

function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

async function resolveWooCommerceCategoryId(
  categoryName: string,
  authorization: string,
): Promise<number | null> {
  const trimmedName = categoryName.trim();

  if (!trimmedName || normalizeText(trimmedName) === 'semua') {
    return null;
  }

  if (/^\d+$/.test(trimmedName)) {
    return Number(trimmedName);
  }

  const params = new URLSearchParams();

  params.set('search', trimmedName);
  params.set('per_page', '100');

  const response = await fetch(
    `${WOOCOMMERCE_API_URL}/products/categories?${params.toString()}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: authorization,
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error(
      `WooCommerce category lookup gagal: ${response.status} ${response.statusText}`,
    );
  }

  const categories = (await response.json()) as Array<{
    id: number;
    name: string;
  }>;

  const exactMatch = categories.find(
    (category) =>
      normalizeText(category.name) === normalizeText(trimmedName),
  );

  if (exactMatch) {
    return exactMatch.id;
  }

  return null;
}

function appendIfPresent(
  source: URLSearchParams,
  target: URLSearchParams,
  key: string,
): void {
  const value = source.get(key);

  if (value !== null && value.trim() !== '') {
    target.set(key, value);
  }
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

  /*
   * ================================
   * WOOCOMMERCE NATIVE PAGINATION
   * ================================
   */

  params.set(
    'status',
    incomingParams.get('status') || 'publish',
  );

  params.set(
    'per_page',
    incomingParams.get('per_page') || '8',
  );

  params.set(
    'page',
    incomingParams.get('page') || '1',
  );

  /*
   * ================================
   * WOOCOMMERCE LIVE SEARCH
   * ================================
   */

  appendIfPresent(
    incomingParams,
    params,
    'search',
  );

  /*
   * ================================
   * WOOCOMMERCE LIVE SORTING
   * ================================
   */

  appendIfPresent(
    incomingParams,
    params,
    'orderby',
  );

  appendIfPresent(
    incomingParams,
    params,
    'order',
  );

  /*
   * ================================
   * WOOCOMMERCE LIVE STOCK FILTER
   * ================================
   */

  appendIfPresent(
    incomingParams,
    params,
    'stock_status',
  );

  /*
   * ================================
   * OPTIONAL NATIVE WOOCOMMERCE
   * FILTERS
   * ================================
   */

  appendIfPresent(
    incomingParams,
    params,
    'sku',
  );

  appendIfPresent(
    incomingParams,
    params,
    'featured',
  );

  appendIfPresent(
    incomingParams,
    params,
    'min_price',
  );

  appendIfPresent(
    incomingParams,
    params,
    'max_price',
  );

  appendIfPresent(
    incomingParams,
    params,
    'tag',
  );

  appendIfPresent(
    incomingParams,
    params,
    'attribute',
  );

  appendIfPresent(
    incomingParams,
    params,
    'attribute_term',
  );

  /*
   * ================================
   * WOOCOMMERCE CATEGORY
   * ================================
   *
   * UI mengirim nama kategori.
   * WooCommerce products API membutuhkan ID.
   *
   * Jadi kita resolve nama kategori
   * ke ID kategori WooCommerce asli.
   */

  const category = incomingParams.get('category');

  if (
    category &&
    normalizeText(category) !== 'semua'
  ) {
    try {
      const categoryId =
        await resolveWooCommerceCategoryId(
          category,
          authorization,
        );

      /*
       * Tidak ada kategori WooCommerce
       * yang cocok = hasil memang kosong.
       *
       * Jangan fallback ke keyword nama produk.
       */

      if (categoryId === null) {
        const emptyHeaders = new Headers({
          'Content-Type': 'application/json',
          'X-WP-Total': '0',
          'X-WP-TotalPages': '0',
          'Cache-Control': 'no-store',
        });

        return new NextResponse('[]', {
          status: 200,
          headers: emptyHeaders,
        });
      }

      params.set(
        'category',
        String(categoryId),
      );
    } catch (error) {
      console.error(
        'WooCommerce category resolution failed:',
        error,
      );

      return NextResponse.json(
        {
          error:
            'Gagal mengambil kategori WooCommerce.',
        },
        { status: 502 },
      );
    }
  }

  const url =
    `${WOOCOMMERCE_API_URL}/products?` +
    params.toString();

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: authorization,
      },
      cache: 'no-store',
    });

    const body = await response.text();

    const contentType =
      response.headers.get('content-type') ||
      'application/json';

    const responseHeaders = new Headers({
      'Content-Type': contentType,
      'Cache-Control': 'no-store',
    });

    copyPaginationHeaders(
      response,
      responseHeaders,
    );

    if (!response.ok) {
      return new NextResponse(body, {
        status: response.status,
        headers: responseHeaders,
      });
    }

    return new NextResponse(body, {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(
      'WooCommerce proxy request failed:',
      error,
    );

    return NextResponse.json(
      {
        error:
          'Gagal menghubungi WooCommerce API.',
      },
      { status: 502 },
    );
  }
}
