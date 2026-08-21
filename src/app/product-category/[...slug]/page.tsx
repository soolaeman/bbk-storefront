import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

const WOOCOMMERCE_API_URL = (
  process.env.WOOCOMMERCE_API_URL ||
  'https://www.bukanbarukitchen.com/wp-json/wc/v3'
).replace(/\/$/, '');

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  images: Array<{ src: string; alt?: string }>;
}

function getAuthorization(): string | null {
  const key = process.env.WC_CONSUMER_KEY;
  const secret = process.env.WC_CONSUMER_SECRET;
  return key && secret ? `Basic ${Buffer.from(`${key}:${secret}`).toString('base64')}` : null;
}

async function getProducts(categorySlug: string): Promise<Product[]> {
  const authorization = getAuthorization();
  if (!authorization) return [];

  const categoryResponse = await fetch(
    `${WOOCOMMERCE_API_URL}/products/categories?slug=${encodeURIComponent(categorySlug)}&per_page=1`,
    { headers: { Accept: 'application/json', Authorization: authorization }, next: { revalidate: 60 } },
  );
  if (!categoryResponse.ok) return [];
  const categories = (await categoryResponse.json()) as Array<{ id: number }>;
  const categoryId = categories[0]?.id;
  if (!categoryId) return [];

  const response = await fetch(
    `${WOOCOMMERCE_API_URL}/products?status=publish&category=${categoryId}&per_page=24&orderby=date&order=desc`,
    { headers: { Accept: 'application/json', Authorization: authorization }, next: { revalidate: 60 } },
  );
  if (!response.ok) return [];
  return (await response.json()) as Product[];
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
