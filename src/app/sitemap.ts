import type { MetadataRoute } from 'next';

const SITE_URL = 'https://bukanbarukitchen.com';
const PRODUCTS_PER_PAGE = 100;

interface Product {
  slug?: string;
  date_modified?: string;
}

interface Category {
  slug?: string;
  parent?: number;
}

interface MetadataResponse {
  categories: Category[];
}

async function fetchJson<T>(url: string): Promise<{ data: T; headers: Headers }> {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Sitemap source failed: ${response.status} ${response.statusText}`);
  }

  return { data: (await response.json()) as T, headers: response.headers };
}

async function getAllProducts(): Promise<Product[]> {
  const products: Product[] = [];
  let page = 1;

  while (true) {
    const { data, headers } = await fetchJson<Product[]>(
      `${SITE_URL}/api/products?status=publish&per_page=${PRODUCTS_PER_PAGE}&page=${page}&orderby=date&order=desc`,
    );

    products.push(...data);

    const totalPages = Number(headers.get('X-WP-TotalPages') || '1');
    if (page >= totalPages || data.length === 0) break;
    page += 1;
  }

  return products;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/catalog`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/katalog`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/jual-barang-bekas-restoran`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/jual-unit`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/dapur-mbg`, changeFrequency: 'weekly', priority: 0.7 },
  ];

  try {
    const [{ data: metadata }, products] = await Promise.all([
      fetchJson<MetadataResponse>(`${SITE_URL}/api/products?metadata=1`),
      getAllProducts(),
    ]);

    const categoryUrls: MetadataRoute.Sitemap = (metadata.categories || [])
      .filter((category) => Boolean(category.slug))
      .map((category) => ({
        url: `${SITE_URL}/product-category/${category.slug}`,
        changeFrequency: 'daily' as const,
        priority: category.parent === 0 ? 0.8 : 0.7,
      }));

    const productUrls: MetadataRoute.Sitemap = products
      .filter((product) => Boolean(product.slug))
      .map((product) => ({
        url: `${SITE_URL}/shop/${product.slug}`,
        lastModified: product.date_modified ? new Date(product.date_modified) : undefined,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));

    return [...staticUrls, ...categoryUrls, ...productUrls];
  } catch (error) {
    console.error('Sitemap generation failed:', error);
    return staticUrls;
  }
}
