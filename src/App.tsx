'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RequestUnitModal } from './components/RequestUnitModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { KitchenConsultationBanner } from './components/KitchenConsultationBanner';
import { TrustSection } from './components/TrustSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { getWooCommerceProducts } from './lib/woocommerce';
import { Product, EquipmentCategory, FilterState } from './types';
import { PackageOpen, RotateCcw, PlusCircle, Phone, Sparkles, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateWhatsAppConsultationLink } from './utils/formatters';

const PRODUCTS_PER_PAGE = 8;

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productLoadError, setProductLoadError] = useState<string | null>(null);
  const [catalogPage, setCatalogPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const loadProducts = async (page = catalogPage) => {
    setIsLoadingProducts(true);
    setProductLoadError(null);

    try {
      const liveProducts = await getWooCommerceProducts({
        perPage: PRODUCTS_PER_PAGE,
        page,
      });
      setProducts(liveProducts);
      setCatalogPage(page);
      setHasNextPage(liveProducts.length === PRODUCTS_PER_PAGE);
    } catch (error) {
      console.error('Failed to load WooCommerce products:', error);
      setProductLoadError(
        'Katalog unit sedang tidak dapat dimuat. Silakan coba lagi atau hubungi Tim BBKitchen.'
      );
      setHasNextPage(false);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    void loadProducts(1);
  }, []);

  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    category: 'Semua',
    condition: 'Semua Kondisi',
    location: 'Semua Lokasi',
    powerType: 'Semua Sumber Daya',
    statusFilter: 'READY_ONLY',
    minPrice: null,
    maxPrice: null,
    sortBy: 'latest'
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilterState(prev => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilterState({
      searchQuery: '',
      category: 'Semua',
      condition: 'Semua Kondisi',
      location: 'Semua Lokasi',
      powerType: 'Semua Sumber Daya',
      statusFilter: 'READY_ONLY',
      minPrice: null,
      maxPrice: null,
      sortBy: 'latest'
    });
  };

  const handleToggleStatus = (productId: string, newStatus: 'READY' | 'SOLD') => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, status: newStatus };
      }
      return p;
    }));

    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleResetToDefault = () => {
    void loadProducts(catalogPage);
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filterState.searchQuery.trim()) {
        const q = filterState.searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchSku = product.sku.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchSummary = product.summary.toLowerCase().includes(q);
        const matchLocation = product.location.toLowerCase().includes(q);
        if (!matchName && !matchSku && !matchBrand && !matchSummary && !matchLocation) {
          return false;
        }
      }

      if (filterState.category !== 'Semua' && product.category !== filterState.category) {
        return false;
      }

      if (filterState.condition !== 'Semua Kondisi' && product.condition !== filterState.condition) {
        return false;
      }

      if (filterState.location !== 'Semua Lokasi') {
        const locFilter = filterState.location.toLowerCase();
        const prodLoc = product.location.toLowerCase();
        if (!prodLoc.includes(locFilter.split(' ')[0])) {
          return false;
        }
      }

      if (filterState.powerType !== 'Semua Sumber Daya' && product.powerType !== filterState.powerType) {
        return false;
      }

      if (filterState.statusFilter === 'READY_ONLY' && product.status !== 'READY') {
        return false;
      }
      if (filterState.statusFilter === 'INCLUDE_SOLD' && product.status !== 'SOLD') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price_low') {
        const priceA = a.price ?? 999999999;
        const priceB = b.price ?? 999999999;
        return priceA - priceB;
      }
      if (filterState.sortBy === 'price_high') {
        const priceA = a.price ?? -1;
        const priceB = b.price ?? -1;
        return priceB - priceA;
      }
      if (filterState.sortBy === 'condition') {
        return b.conditionRating - a.conditionRating;
      }
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });
  }, [products, filterState]);

  const goToCatalogPage = (page: number) => {
    if (page < 1 || isLoadingProducts || (page > catalogPage && !hasNextPage)) return;
    window.scrollTo({ top: 380, behavior: 'smooth' });
    void loadProducts(page);
  };

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
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
        onRequestUnitClick={() => setIsRequestModalOpen(true)}
      />

      <CategoryFilter
        filterState={filterState}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResultsCount={filteredProducts.length}
        categoryCounts={categoryCounts}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Katalog Unit Dapur</span>
              {filterState.category !== 'Semua' && (
                <span className="text-amber-700 font-semibold">• {filterState.category}</span>
              )}
            </h2>
            <p className="text-xs text-slate-500">
              Halaman {catalogPage} • Menampilkan {filteredProducts.length} unit dari halaman ini
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsRequestModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Alat belum ada? Titip Sourcing</span>
          </button>
        </div>

        {isLoadingProducts ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-xs my-8">
            <Loader2 className="w-8 h-8 animate-spin text-amber-600 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-900">Memuat katalog unit BBKitchen...</p>
            <p className="text-xs text-slate-500 mt-1">Mengambil 8 unit per halaman dari WooCommerce.</p>
          </div>
        ) : productLoadError ? (
          <div className="bg-white rounded-2xl border border-red-200 p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4 shadow-xs my-8">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Katalog belum dapat dimuat</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">{productLoadError}</p>
            </div>
            <button
              type="button"
              onClick={() => void loadProducts(catalogPage)}
              className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl inline-flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Coba Lagi</span>
            </button>
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetail={(p) => setSelectedProduct(p)}
                  isAdminMode={isAdminMode}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-3" aria-label="Pagination katalog">
              <button
                type="button"
                onClick={() => goToCatalogPage(catalogPage - 1)}
                disabled={catalogPage === 1 || isLoadingProducts}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Sebelumnya
              </button>

              <span className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-black min-w-24 text-center">
                Halaman {catalogPage}
              </span>

              <button
                type="button"
                onClick={() => goToCatalogPage(catalogPage + 1)}
                disabled={!hasNextPage || isLoadingProducts}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                Berikutnya
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4 shadow-xs my-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
              <PackageOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Tidak ada unit yang cocok dengan filter</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Unit dengan kriteria yang Anda cari mungkin sedang proses inspeksi atau belum terupload di katalog online.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filter</span>
              </button>
              <button
                type="button"
                onClick={() => setIsRequestModalOpen(true)}
                className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md flex items-center gap-1.5 transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Titip Cari Unit ke Tim Sourcing</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <KitchenConsultationBanner />
      <TrustSection />
      <FAQSection />

      <Footer onSelectCategory={(cat) => handleFilterChange({ category: cat })} />

      <div className="fixed bottom-5 right-5 z-40">
        <a
          href={generateWhatsAppConsultationLink()}
          target="_blank"
          rel="noopener noreferrer"
          id="floating-wa-btn"
          className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-full shadow-2xl hover:scale-105 transition-all shadow-emerald-950/40 border border-emerald-400/40"
        >
          <Phone className="w-4 h-4 text-white animate-bounce" />
          <span className="hidden sm:inline">Tanya Unit via WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isAdminMode={isAdminMode}
        onToggleStatus={handleToggleStatus}
      />

      <RequestUnitModal isOpen={isRequestModalOpen} onClose={() => setIsRequestModalOpen(false)} />

      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        products={products}
        onToggleStatus={handleToggleStatus}
        onAddProduct={handleAddProduct}
        onResetToDefault={handleResetToDefault}
      />
    </div>
  );
}
