'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductSkeletonGrid } from './components/ProductSkeletonGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RequestUnitModal } from './components/RequestUnitModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { KitchenConsultationBanner } from './components/KitchenConsultationBanner';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { SocialMediaSection } from './components/SocialMediaSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { getWooCommerceProductsResult, getCatalogMetadata, CatalogMetadata } from './lib/woocommerce';
import { Product, FilterState } from './types';
import { PackageOpen, RotateCcw, Loader2, ChevronDown } from 'lucide-react';

const PRODUCTS_PER_PAGE = 8;

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [productLoadError, setProductLoadError] = useState<string | null>(null);
  const [catalogPage, setCatalogPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [catalogMetadata, setCatalogMetadata] = useState<CatalogMetadata>({
    categories: [],
    conditionOptions: [],
    locationOptions: [],
    totalProducts: null,
  });
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    category: 'Semua',
    condition: 'Semua Kondisi',
    location: 'Semua Lokasi',
    powerType: 'Semua Sumber Daya',
    statusFilter: 'READY_ONLY',
    minPrice: null,
    maxPrice: null,
    sortBy: 'latest',
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleFilterChange = (updates: Partial<FilterState>) =>
    setFilterState((prev) => ({ ...prev, ...updates }));

  const handleResetFilters = () =>
    setFilterState({
      searchQuery: '',
      category: 'Semua',
      condition: 'Semua Kondisi',
      location: 'Semua Lokasi',
      powerType: 'Semua Sumber Daya',
      statusFilter: 'READY_ONLY',
      minPrice: null,
      maxPrice: null,
      sortBy: 'latest',
    });

  useEffect(() => {
    let cancelled = false;
    const loadMetadata = async () => {
      try {
        const data = await getCatalogMetadata();
        if (!cancelled) setCatalogMetadata(data);
      } catch (error) {
        console.error('Failed to load catalog metadata:', error);
      }
    };
    void loadMetadata();
    return () => {
      cancelled = true;
    };
  }, []);

  const loadInitialProducts = async () => {
    setIsLoadingInitial(true);
    setProductLoadError(null);
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
    } catch (error) {
      console.error('Failed to load initial products:', error);
      setProducts([]);
      setTotalResults(null);
      setTotalPages(null);
      setHasNextPage(false);
      setProductLoadError('Katalog unit sedang tidak dapat dimuat. Silakan coba lagi atau hubungi Tim BBKitchen.');
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
    } catch (error) {
      console.error('Failed to load more products:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadInitialProducts();
    }, filterState.searchQuery.trim() ? 250 : 0);

    return () => clearTimeout(timer);
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

  const handleToggleStatus = (productId: string, newStatus: 'READY' | 'SOLD') => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, status: newStatus } : p))
    );
    if (selectedProduct?.id === productId) {
      setSelectedProduct((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleAddProduct = (newProduct: Product) => setProducts((prev) => [newProduct, ...prev]);
  const handleResetToDefault = () => void loadInitialProducts();

  const categoryCounts = useMemo(
    () =>
      products.reduce<Record<string, number>>((counts, product) => {
        counts[product.category] = (counts[product.category] || 0) + 1;
        return counts;
      }, {}),
    [products]
  );

  const liveCategoryOptions = useMemo(
    () =>
      catalogMetadata.categories
        .filter((category) => category.name.trim() && category.name.trim() !== 'Semua')
        .map((category) => ({
          id: category.id,
          name: category.name.trim(),
          parentId: category.parent,
          count: category.count ?? categoryCounts[category.name.trim()] ?? 0,
        })),
    [catalogMetadata.categories, categoryCounts]
  );

  const liveConditionOptions = useMemo(
    () => Array.from(new Set(catalogMetadata.conditionOptions.map((v) => v.trim()).filter(Boolean))),
    [catalogMetadata.conditionOptions]
  );

  const liveLocationOptions = useMemo(
    () => Array.from(new Set(catalogMetadata.locationOptions.map((v) => v.trim()).filter(Boolean))),
    [catalogMetadata.locationOptions]
  );

  const livePowerTypeOptions = useMemo(
    () => Array.from(new Set(products.map((p) => p.powerType.trim()).filter(Boolean))),
    [products]
  );

  const liveRequestCategoryOptions = useMemo(
    () => liveCategoryOptions.map((c) => c.name),
    [liveCategoryOptions]
  );

  const totalCountLabel = totalResults ?? catalogMetadata.totalProducts ?? products.length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      <Header
        searchQuery={filterState.searchQuery}
        onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
        onRequestUnitClick={() => setIsRequestModalOpen(true)}
        isAdminMode={isAdminMode}
        onToggleAdminMode={() => setIsAdminMode(!isAdminMode)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      <HeroSection
        onSelectCategory={(cat) => {
          handleFilterChange({ category: cat });
          window.scrollTo({ top: 120, behavior: 'smooth' });
        }}
        onRequestUnitClick={() => setIsRequestModalOpen(true)}
      />

      <CategoryFilter
        filterState={filterState}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResultsCount={totalCountLabel}
        categoryCounts={categoryCounts}
        categories={liveCategoryOptions}
        conditionOptions={liveConditionOptions}
        locationOptions={liveLocationOptions}
        powerTypeOptions={livePowerTypeOptions}
      />

      {/* Main Catalog Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-4 sm:py-6">
        {isLoadingInitial ? (
          <ProductSkeletonGrid count={8} />
        ) : productLoadError ? (
          <div className="bg-white rounded-2xl border border-red-200 p-8 text-center max-w-xl mx-auto space-y-3 shadow-xs my-4">
            <h3 className="text-sm font-bold text-slate-900">Katalog belum dapat dimuat</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">{productLoadError}</p>
            <button
              type="button"
              onClick={() => void loadInitialProducts()}
              className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl inline-flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Coba Lagi</span>
            </button>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetail={(p) => setSelectedProduct(p)}
                  isAdminMode={isAdminMode}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>

            {/* Load More Toolbar & Progress Indicator */}
            {totalResults !== null && totalResults > 0 && (
              <div className="mt-8 flex flex-col items-center justify-center space-y-3 max-w-md mx-auto">
                <div className="w-full flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
                  <span>
                    Menampilkan <strong className="text-slate-900">{products.length}</strong> dari{' '}
                    <strong className="text-slate-900">{totalResults}</strong> unit ready
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
                    id="btn-load-more"
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
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-xs my-4">
            <PackageOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-900">Belum ada unit yang cocok</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Coba ubah kata kunci pencarian atau reset filter kategori.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}

        <div className="mt-8">
          <KitchenConsultationBanner />
        </div>
      </main>

      <TestimonialsSection />
      <GallerySection />
      <LocationSection />
      <SocialMediaSection />
      <FAQSection />
      <Footer onSelectCategory={(category) => handleFilterChange({ category })} />

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onToggleStatus={handleToggleStatus}
          isAdminMode={isAdminMode}
        />
      )}

      {isRequestModalOpen && (
        <RequestUnitModal
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
          categoryOptions={liveRequestCategoryOptions}
        />
      )}

      {isAdminPanelOpen && (
        <AdminPanelModal
          isOpen={isAdminPanelOpen}
          onClose={() => setIsAdminPanelOpen(false)}
          products={products}
          onToggleStatus={handleToggleStatus}
          onAddProduct={handleAddProduct}
          onResetToDefault={handleResetToDefault}
          categoryOptions={liveCategoryOptions}
        />
      )}
    </div>
  );
}
