import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

const PUBLIC_SITE_ORIGIN = 'https://www.bukanbarukitchen.com';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  images: Array<{ src: string; alt?: string }>;
}

interface CatalogMetadataCategory {
  id: number;
  name: string;
  slug?: string;
  parent?: number;
}

interface CatalogMetadataResponse {
  categories: CatalogMetadataCategory[];
}

async function getProducts(categorySlug: string): Promise<Product[]> {
  try {
    const metadataResponse = await fetch(`${PUBLIC_SITE_ORIGIN}/api/products?metadata=1`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!metadataResponse.ok) return [];

    const metadata = (await metadataResponse.json()) as CatalogMetadataResponse;
    const category = metadata.categories?.find((item) => item.slug === categorySlug);
    if (!category) return [];

    const params = new URLSearchParams({
      status: 'publish',
      category: String(category.id),
      per_page: '24',
      page: '1',
      orderby: 'date',
      order: 'desc',
    });

    const response = await fetch(`${PUBLIC_SITE_ORIGIN}/api/products?${params.toString()}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!response.ok) return [];

    return (await response.json()) as Product[];
  } catch (error) {
    console.error('Product category API lookup failed:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = `/product-category/${slug.join('/')}`;
  const canonical = `${PUBLIC_SITE_ORIGIN}${path}`;
  const title = slug.map((part) => part.replace(/-/g, ' ')).join(' / ');

  return {
    title: `${title} | BBKitchen`,
    description: `Produk kategori ${title} di BBKitchen.`,
    alternates: { canonical },
    openGraph: {
      title: `${title} | BBKitchen`,
      description: `Produk kategori ${title} di BBKitchen.`,
      url: canonical,
      type: 'website',
    },
  };
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const categorySlug = slug[slug.length - 1];
  const products = await getProducts(categorySlug);
  const title = slug.map((part) => part.replace(/-/g, ' ')).join(' / ');

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-5 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-emerald-700">Home</Link> <span className="mx-1">›</span>
          <span>Product Category</span> <span className="mx-1">›</span>
          <span className="font-semibold text-slate-800">{title}</span>
        </nav>
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-600">Kategori Produk</p>
          <h1 className="mt-1 text-2xl font-black capitalize text-slate-950 sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">{products.length} produk tersedia.</p>
        </div>
        {products.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">Produk kategori belum dapat dimuat.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Link key={product.id} href={`/shop/${product.slug}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="aspect-square bg-slate-100">
                  {product.images[0]?.src ? <img src={product.images[0].src} alt={product.images[0].alt || product.name} className="h-full w-full object-contain" /> : null}
                </div>
                <div className="p-4">
                  <h2 className="line-clamp-2 text-sm font-black text-slate-900">{product.name}</h2>
                  <p className="mt-2 text-sm font-bold text-emerald-700">{product.price || product.regular_price ? `Rp ${product.price || product.regular_price}` : 'Hubungi untuk harga'}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
