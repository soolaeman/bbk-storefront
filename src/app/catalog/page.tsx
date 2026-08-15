'use client';

import React, { useEffect, useState } from 'react';
import { Search, Loader2, PackageOpen, ArrowLeft } from 'lucide-react';
import { Header } from '../../components/Header';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types';
import { getWooCommerceProductsResult } from '../../lib/woocommerce';

const PRODUCTS_PER_PAGE = 12;

export default function CatalogPage() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery((params.get('search') || '').trim());
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadSearchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getWooCommerceProductsResult({
          perPage: PRODUCTS_PER_PAGE,
          page: 1,
          search: query || undefined,
          statusFilter: 'READY_ONLY',
          sortBy: 'latest',
        });

        if (!cancelled) {
          setProducts(result.products);
          setTotalResults(result.total);
        }
      } catch (loadError) {
        console.error('Failed to load catalog search results:', loadError);
        if (!cancelled) {
          setProducts([]);
          setTotalResults(null);
          setError('Katalog sedang mengalami kendala. Silakan coba lagi.');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void loadSearchResults();

    return () => {
      cancelled = true;
    };
  }, [query]);

  const handleOpenDetail = (product: Product) => {
    window.location.href = `/product/${encodeURIComponent(product.id)}`;
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <a href="/" className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition-colors hover:text-emerald-700">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Homepage
          </a>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.16em] text-amber-600">BBKitchen Search</p>
              <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Hasil Pencarian Katalog</h1>
              <p className="mt-2 text-sm text-slate-500">
                {query ? <>Menampilkan hasil untuk <strong className="text-slate-900">“{query}”</strong>.</> : 'Cari unit peralatan dapur komersial dari katalog BBKitchen.'}
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-600">
              <Search className="h-4 w-4 text-amber-600" />
              {totalResults === null ? 'Memuat hasil...' : `${totalResults} unit ditemukan`}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col items-center gap-3 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              <p className="text-sm font-semibold text-slate-700">Mencari unit di katalog BBKitchen...</p>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-rose-700">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 shadow-sm">
            <div className="max-w-md text-center">
              <PackageOpen className="mx-auto h-10 w-10 text-slate-400" />
              <h2 className="mt-4 text-lg font-black text-slate-950">Unit belum ditemukan</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Coba gunakan kata kunci lain seperti kompor, meja stainless, sink, chiller, atau hood.</p>
              <a href="/" className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800">Lihat Semua Katalog</a>
            </div>
          </div>
        ) : (
          <section>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-black text-slate-950">Unit yang Relevan</h2>
              <span className="text-xs font-medium text-slate-500">{products.length} unit ditampilkan</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetail={handleOpenDetail}
                  isAdminMode={false}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
