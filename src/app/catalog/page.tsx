'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Search, PackageOpen, ArrowLeft, Loader2, ChevronDown, RotateCcw } from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CategoryFilter, CategoryFilterOption } from '../../components/CategoryFilter';
import { ProductCard } from '../../components/ProductCard';
import { ProductSkeletonGrid } from '../../components/ProductSkeletonGrid';
import { Product, FilterState } from '../../types';
import { getWooCommerceProductsResult, getCatalogMetadata, CatalogMetadata } from '../../lib/woocommerce';

const PRODUCTS_PER_PAGE = 8;
const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  category: 'Semua',
  condition: 'Semua Kondisi',
  location: 'Semua Lokasi',
  powerType: 'Semua Sumber Daya',
  statusFilter: 'INCLUDE_SOLD',
  minPrice: null,
  maxPrice: null,
  sortBy: 'latest',
};

export default function CatalogPage() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [catalogPage, setCatalogPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [metadata, setMetadata] = useState<CatalogMetadata>({
    categories: [],
    conditionOptions: [],
    locationOptions: [],
    totalProducts: null,
  });
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTERS);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = (params.get('search') || '').trim();
    setQuery(search);
    setFilterState((current) => ({ ...current, searchQuery: search }));
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadMeta = async () => {
      try {
        const data = await getCatalogMetadata();
        if (!cancelled) setMetadata(data);
      } catch (metadataError) {
        console.error('Failed to load catalog metadata:', metadataError);
      }
    };
    void loadMeta();
    return () => {
      cancelled = true;
    };
  }, []);

  const loadInitialProducts = async () => {
    setIsLoadingInitial(true);
    setError(null);
    setCatalogPage(1);

    try {
      const result = await getWooCommerceProductsResult({
        perPage: PRODUCTS_PER_PAGE,
        page: 1,
        search: filterState.searchQuery.trim() || undefined,
        category: filterState.category !== 'Semua' ? filterState.category : undefined,
        condition: filterState.condition !== 'Semua Kondisi' ? filterState.condition : undefined,
        location: filterState.location !== 'Semua Lokasi' ? filterState.location : undefined,
        powerType: filterState.powerType !== 'Semua Sumber Daya' ? filterState.powerType : undefined,
        statusFilter: filterState.statusFilter,
        minPriceNumber: filterState.minPrice,
        maxPriceNumber: filterState.maxPrice,
        sortBy: filterState.sortBy,
      });

      setProducts(result.products);
      setTotalResults(result.total);
      setTotalPages(result.totalPages);
      setHasNextPage(
        result.totalPages !== null
          ? 1 < result.totalPages
          : result.products.length === PRODUCTS_PER_PAGE
      );
    } catch (loadError) {
      console.error('Failed to load catalog:', loadError);
      setProducts([]);
      setTotalResults(null);
      setTotalPages(null);
      setHasNextPage(false);
      setError('Katalog sedang mengalami kendala. Silakan coba lagi.');
    } finally {
      setIsLoadingInitial(false);
    }
  };

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasNextPage) return;
    setIsLoadingMore(true);
    const nextPage = catalogPage + 1;

    try {
      const result = await getWooCommerceProductsResult({
        perPage: PRODUCTS_PER_PAGE,
        page: nextPage,
        search: filterState.searchQuery.trim() || undefined,
        category: filterState.category !== 'Semua' ? filterState.category : undefined,
        condition: filterState.condition !== 'Semua Kondisi' ? filterState.condition : undefined,
        location: filterState.location !== 'Semua Lokasi' ? filterState.location : undefined,
        powerType: filterState.powerType !== 'Semua Sumber Daya' ? filterState.powerType : undefined,
        statusFilter: filterState.statusFilter,
        minPriceNumber: filterState.minPrice,
        maxPriceNumber: filterState.maxPrice,
        sortBy: filterState.sortBy,
      });

      setProducts((prev) => [...prev, ...result.products]);
      setCatalogPage(nextPage);
      setHasNextPage(
        result.totalPages !== null
          ? nextPage < result.totalPages
          : result.products.length === PRODUCTS_PER_PAGE
      );
    } catch (loadMoreError) {
      console.error('Failed to load more products in catalog:', loadMoreError);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    const delay = filterState.searchQuery.trim() ? 250 : 0;
    const timer = window.setTimeout(() => {
      void loadInitialProducts();
    }, delay);
    return () => window.clearTimeout(timer);
  }, [
    filterState.searchQuery,
    filterState.category,
    filterState.condition,
    filterState.location,
    filterState.powerType,
    filterState.statusFilter,
    filterState.minPrice,
    filterState.maxPrice,
    filterState.sortBy,
  ]);

  const categoryCounts = useMemo(
    () =>
      products.reduce<Record<string, number>>((counts, product) => {
        counts[product.category] = (counts[product.category] || 0) + 1;
        return counts;
      }, {}),
    [products]
  );

  const categories = useMemo<CategoryFilterOption[]>(
    () =>
      metadata.categories
        .filter((category) => category.name.trim() && category.name.trim() !== 'Semua')
        .map((category) => ({
          id: category.id,
          name: category.name.trim(),
          parentId: category.parent,
          count: category.count ?? categoryCounts[category.name.trim()] ?? 0,
        })),
    [metadata.categories, categoryCounts]
  );

  const conditionOptions = useMemo(
    () => Array.from(new Set(metadata.conditionOptions.map((v) => v.trim()).filter(Boolean))),
    [metadata.conditionOptions]
  );

  const locationOptions = useMemo(
    () => Array.from(new Set(metadata.locationOptions.map((v) => v.trim()).filter(Boolean))),
    [metadata.locationOptions]
  );

  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilterState((current) => ({ ...current, ...updates }));
    if (updates.searchQuery !== undefined) {
      setQuery(updates.searchQuery.trim());
    }
  };

  const handleResetFilters = () => {
    setFilterState(DEFAULT_FILTERS);
    setQuery('');
  };

  const isSearchMode = Boolean(query);
  const displayedCount = products.length;
  const totalCountLabel = totalResults ?? metadata.totalProducts ?? displayedCount;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex-1 w-full">
        {/* Title Header Card */}
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-2xs">
          <a
            href="/"
            className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-emerald-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Homepage</span>
          </a>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-[10px] font-black uppercase tracking-wider text-amber-600">
                {isSearchMode ? 'BBKitchen Search' : 'BBKitchen Catalog'}
              </p>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-950">
                {isSearchMode ? 'Hasil Pencarian Unit' : 'Katalog Peralatan Bekas Resto Komersial'}
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                {isSearchMode ? (
                  <>
                    Menampilkan unit yang cocok untuk <strong className="text-slate-900">“{query}”</strong>.
                  </>
                ) : (
                  'Temukan unit peralatan dapur bekas berkualitas, siap pakai, dan beberapa unit baru gress.'
                )}
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
              <Search className="h-3.5 w-3.5 text-amber-600" />
              <span>{totalResults === null ? 'Memuat...' : `${totalResults} unit tersedia`}</span>
            </div>
          </div>
        </div>

        {/* Sticky Filter Bar */}
        <CategoryFilter
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalResultsCount={totalCountLabel}
          categoryCounts={categoryCounts}
          categories={categories}
          conditionOptions={conditionOptions}
          locationOptions={locationOptions}
        />

        {/* Products Grid / Skeleton / Error */}
        <div className="mt-4">
          {isLoadingInitial ? (
            <ProductSkeletonGrid count={8} />
          ) : error ? (
            <div className="rounded-2xl border border-rose-200 bg-white p-8 text-center shadow-xs">
              <p className="text-sm font-semibold text-rose-700 mb-3">{error}</p>
              <button
                type="button"
                onClick={() => void loadInitialProducts()}
                className="px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-xl inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Coba Lagi</span>
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 shadow-xs">
              <div className="max-w-md text-center py-6">
                <PackageOpen className="mx-auto h-10 w-10 text-slate-400 mb-2" />
                <h2 className="text-base font-black text-slate-950">
                  {isSearchMode ? 'Unit belum ditemukan' : 'Belum ada unit tersedia'}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {isSearchMode
                    ? 'Coba gunakan kata kunci lain atau reset filter katalog.'
                    : 'Belum ada unit READY yang cocok dengan filter saat ini.'}
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          ) : (
            <section>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenDetail={(selectedProduct) => {
                      const detailSlug = selectedProduct.slug?.trim();
                      if (!detailSlug) return;
                      window.location.href = `/shop/${encodeURIComponent(detailSlug)}`;
                    }}
                    isAdminMode={false}
                  />
                ))}
              </div>

              {/* Load More Toolbar & Progress Indicator */}
              {totalResults !== null && totalResults > 0 && (
                <div className="mt-8 flex flex-col items-center justify-center space-y-3 max-w-md mx-auto">
                  <div className="w-full flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
                    <span>
                      Menampilkan <strong className="text-slate-900">{products.length}</strong> dari{' '}
                      <strong className="text-slate-900">{totalResults}</strong> unit
                    </span>
                    <span className="font-bold text-amber-600">
                      {Math.min(100, Math.round((products.length / totalResults) * 100))}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (products.length / totalResults) * 100)}%` }}
                    />
                  </div>

                  {hasNextPage ? (
                    <button
                      type="button"
                      id="btn-load-more-catalog"
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="mt-2 w-full sm:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                          <span>Memuat unit lainnya...</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 text-amber-400" />
                          <span>
                            Muat {Math.min(PRODUCTS_PER_PAGE, totalResults - products.length)} Unit Lainnya
                          </span>
                        </>
                      )}
                    </button>
                  ) : (
                    <p className="text-xs text-slate-500 font-medium pt-1 text-center flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Seluruh {totalResults} unit ready telah ditampilkan</span>
                    </p>
                  )}
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
