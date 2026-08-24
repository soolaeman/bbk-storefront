const DEFAULT_WOOCOMMERCE_API_ORIGIN = 'https://origin.bukanbarukitchen.com';

export const WOOCOMMERCE_API_ORIGIN = (
  process.env.WOOCOMMERCE_API_URL || DEFAULT_WOOCOMMERCE_API_ORIGIN
)
  .replace(/\/$/, '')
  .replace(/\/wp-json\/wc\/v3$/i, '');

export function hasWooCommerceCredentials(): boolean {
  return Boolean(process.env.WC_CONSUMER_KEY && process.env.WC_CONSUMER_SECRET);
}

export function getWooCommerceHeaders(): HeadersInit {
  return {
    Accept: 'application/json',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  };
}

export function buildWooCommerceUrl(resource: string, params?: URLSearchParams): string {
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

export async function fetchWooCommerceJson<T>(
  resource: string,
  params?: URLSearchParams,
  init?: RequestInit & { next?: { revalidate?: number } }
): Promise<Response> {
  return fetch(buildWooCommerceUrl(resource, params), {
    ...init,
    headers: init?.headers || getWooCommerceHeaders(),
  });
}
