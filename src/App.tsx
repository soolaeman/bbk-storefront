'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RequestUnitModal } from './components/RequestUnitModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { KitchenConsultationBanner } from './components/KitchenConsultationBanner';
import { TrustSection } from './components/TrustSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { getWooCommerceProductsResult } from './lib/woocommerce';
import { Product, FilterState } from './types';
import { PackageOpen, RotateCcw, PlusCircle, Phone, Sparkles, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateWhatsAppConsultationLink } from './utils/formatters';

const PRODUCTS_PER_PAGE = 8;

interface CatalogMetadataCategory { id: number; name: string; slug?: string; parent?: number; count?: number; }
interface CatalogMetadata { categories: CatalogMetadataCategory[]; conditionOptions: string[]; locationOptions: string[]; totalProducts: number | null; }

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productLoadError, setProductLoadError] = useState<string | null>(null);
  const [catalogPage, setCatalogPage] = useState(1);
  const [catalogPageInput, setCatalogPageInput] = useState('1');
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [catalogMetadata, setCatalogMetadata] = useState<CatalogMetadata>({ categories: [], conditionOptions: [], locationOptions: [], totalProducts: null });
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(true);
  const [filterState, setFilterState] = useState<FilterState>({ searchQuery: '', category: 'Semua', condition: 'Semua Kondisi', location: 'Semua Lokasi', powerType: 'Semua Sumber Daya', statusFilter: 'READY_ONLY', minPrice: null, maxPrice: null, sortBy: 'latest' });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleFilterChange = (updates: Partial<FilterState>) => setFilterState(prev => ({ ...prev, ...updates }));
  const handleResetFilters = () => setFilterState({ searchQuery: '', category: 'Semua', condition: 'Semua Kondisi', location: 'Semua Lokasi', powerType: 'Semua Sumber Daya', statusFilter: 'READY_ONLY', minPrice: null, maxPrice: null, sortBy: 'latest' });

  useEffect(() => {
    let cancelled = false;
    const loadCatalogMetadata = async () => {
      setIsLoadingMetadata(true);
      try {
        const response = await fetch('/api/products?metadata=1', { headers: { Accept: 'application/json' }, cache: 'no-store' });
        if (!response.ok) throw new Error(`Metadata endpoint gagal: ${response.status}`);
        const data = (await response.json()) as CatalogMetadata;
        if (!cancelled) setCatalogMetadata({ categories: Array.isArray(data.categories) ? data.categories : [], conditionOptions: Array.isArray(data.conditionOptions) ? data.conditionOptions : [], locationOptions: Array.isArray(data.locationOptions) ? data.locationOptions : [], totalProducts: typeof data.totalProducts === 'number' ? data.totalProducts : null });
      } catch (error) { console.error('Failed to load WooCommerce catalog metadata:', error); } finally { if (!cancelled) setIsLoadingMetadata(false); }
    };
    void loadCatalogMetadata();
    return () => { cancelled = true; };
  }, []);

  const loadProducts = async (page = 1) => {
    setIsLoadingProducts(true); setProductLoadError(null);
    try {
      const result = await getWooCommerceProductsResult({ perPage: PRODUCTS_PER_PAGE, page, search: filterState.searchQuery.trim() || undefined, category: filterState.category !== 'Semua' ? filterState.category : undefined, condition: filterState.condition !== 'Semua Kondisi' ? filterState.condition : undefined, location: filterState.location !== 'Semua Lokasi' ? filterState.location : undefined, powerType: filterState.powerType !== 'Semua Sumber Daya' ? filterState.powerType : undefined, statusFilter: filterState.statusFilter, minPriceNumber: filterState.minPrice, maxPriceNumber: filterState.maxPrice, sortBy: filterState.sortBy });
      setProducts(result.products); setTotalResults(result.total); setCatalogPage(page); setCatalogPageInput(String(page)); setTotalPages(result.totalPages); setHasNextPage(result.totalPages !== null ? page < result.totalPages : result.products.length === PRODUCTS_PER_PAGE);
    } catch (error) { console.error('Failed to load WooCommerce products:', error); setProducts([]); setTotalResults(null); setTotalPages(null); setHasNextPage(false); setProductLoadError('Katalog unit sedang tidak dapat dimuat. Silakan coba lagi atau hubungi Tim BBKitchen.'); } finally { setIsLoadingProducts(false); }
  };

  useEffect(() => { void loadProducts(1); }, [filterState.searchQuery, filterState.category, filterState.condition, filterState.location, filterState.powerType, filterState.statusFilter, filterState.minPrice, filterState.maxPrice, filterState.sortBy]);

  const handleToggleStatus = (productId: string, newStatus: 'READY' | 'SOLD') => { setProducts(prev => prev.map(p => p.id === productId ? { ...p, status: newStatus } : p)); if (selectedProduct?.id === productId) setSelectedProduct(prev => prev ? { ...prev, status: newStatus } : null); };
  const handleAddProduct = (newProduct: Product) => setProducts(prev => [newProduct, ...prev]);
  const handleResetToDefault = () => void loadProducts(catalogPage);
  const categoryCounts = useMemo(() => products.reduce<Record<string, number>>((counts, product) => { counts[product.category] = (counts[product.category] || 0) + 1; return counts; }, {}), [products]);
  const liveCategoryOptions = useMemo(() => catalogMetadata.categories.filter(category => category.name.trim() && category.name.trim() !== 'Semua').map(category => ({ id: category.id, name: category.name.trim(), parentId: category.parent, count: category.count ?? categoryCounts[category.name.trim()] ?? 0 })), [catalogMetadata.categories, categoryCounts]);
  const liveConditionOptions = useMemo(() => Array.from(new Set(catalogMetadata.conditionOptions.map(value => value.trim()).filter(Boolean))), [catalogMetadata.conditionOptions]);
  const liveLocationOptions = useMemo(() => Array.from(new Set(catalogMetadata.locationOptions.map(value => value.trim()).filter(Boolean))), [catalogMetadata.locationOptions]);
  const livePowerTypeOptions = useMemo(() => Array.from(new Set(products.map(product => product.powerType.trim()).filter(Boolean))), [products]);
  const liveRequestCategoryOptions = useMemo(() => liveCategoryOptions.map(category => category.name), [liveCategoryOptions]);
  const goToCatalogPage = (page: number) => { if (page < 1 || isLoadingProducts) return; if (totalPages !== null && page > totalPages) return; if (totalPages === null && page > catalogPage && !hasNextPage) return; window.scrollTo({ top: 380, behavior: 'smooth' }); void loadProducts(page); };
  const handleCatalogPageSubmit = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const requestedPage = Number.parseInt(catalogPageInput, 10); if (!Number.isFinite(requestedPage)) { setCatalogPageInput(String(catalogPage)); return; } const maxPage = totalPages ?? (hasNextPage ? requestedPage : catalogPage); const targetPage = Math.min(Math.max(requestedPage, 1), maxPage); setCatalogPageInput(String(targetPage)); goToCatalogPage(targetPage); };
  const displayedCount = products.length; const totalCountLabel = totalResults ?? catalogMetadata.totalProducts ?? displayedCount; const totalPageLabel = totalPages ?? (hasNextPage ? '…' : catalogPage);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      <Header searchQuery={filterState.searchQuery} onSearchChange={(q) => handleFilterChange({ searchQuery: q })} onRequestUnitClick={() => setIsRequestModalOpen(true)} isAdminMode={isAdminMode} onToggleAdminMode={() => setIsAdminMode(!isAdminMode)} onOpenAdminPanel={() => setIsAdminPanelOpen(true)} />
      <HeroSection onSelectCategory={(cat) => { handleFilterChange({ category: cat }); window.scrollTo({ top: 380, behavior: 'smooth' }); }} onRequestUnitClick={() => setIsRequestModalOpen(true)} />
      <CategoryFilter filterState={filterState} onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} totalResultsCount={totalCountLabel} categoryCounts={categoryCounts} categories={liveCategoryOptions} conditionOptions={liveConditionOptions} locationOptions={liveLocationOptions} powerTypeOptions={livePowerTypeOptions} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200"><div><h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2"><span>Katalog Unit Dapur</span>{filterState.category !== 'Semua' && <span className="text-amber-700 font-semibold">• {filterState.category}</span>}</h2><p className="text-xs text-slate-500">Halaman {catalogPage} • Menampilkan {displayedCount} dari {totalCountLabel} unit WooCommerce live{isLoadingMetadata ? ' • Menyiapkan filter metadata live...' : ''}</p></div><button type="button" onClick={() => setIsRequestModalOpen(true)} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-colors"><Sparkles className="w-3.5 h-3.5 text-amber-600" /><span>Alat belum ada? Titip Sourcing</span></button></div>
        {isLoadingProducts ? <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-xs my-8"><Loader2 className="w-8 h-8 animate-spin text-amber-600 mx-auto mb-3" /><p className="text-sm font-bold text-slate-900">Memuat katalog unit BBKitchen...</p><p className="text-xs text-slate-500 mt-1">Mengambil 8 unit per halaman dari WooCommerce.</p></div> : productLoadError ? <div className="bg-white rounded-2xl border border-red-200 p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4 shadow-xs my-8"><div className="space-y-1"><h3 className="text-base font-bold text-slate-900">Katalog belum dapat dimuat</h3><p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">{productLoadError}</p></div><button type="button" onClick={() => void loadProducts(catalogPage)} className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl inline-flex items-center gap-1.5 transition-colors"><RotateCcw className="w-3.5 h-3.5" /><span>Coba Lagi</span></button></div> : products.length > 0 ? <><div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">{products.map(product => <ProductCard key={product.id} product={product} onOpenDetail={p => setSelectedProduct(p)} isAdminMode={isAdminMode} onToggleStatus={handleToggleStatus} />)}</div><div className="mt-8 flex flex-wrap items-center justify-center gap-2.5" aria-label="Pagination katalog"><button type="button" onClick={() => goToCatalogPage(catalogPage - 1)} disabled={catalogPage === 1 || isLoadingProducts} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"><ChevronLeft className="w-4 h-4" />Sebelumnya</button><form onSubmit={handleCatalogPageSubmit} className="flex items-center gap-2"><label htmlFor="catalog-page-input" className="text-xs font-semibold text-slate-500">Halaman</label><input id="catalog-page-input" type="number" min={1} max={totalPages ?? undefined} value={catalogPageInput} onChange={event => setCatalogPageInput(event.target.value)} disabled={isLoadingProducts} className="w-16 px-2.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-black text-center outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 disabled:opacity-50" aria-label="Masukkan nomor halaman katalog" /></form><span className="text-xs text-slate-500 font-semibold">dari {totalPageLabel}</span><button type="button" onClick={() => goToCatalogPage(catalogPage + 1)} disabled={isLoadingProducts || (totalPages !== null ? catalogPage >= totalPages : !hasNextPage)} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors">Berikutnya<ChevronRight className="w-4 h-4" /></button></div></> : <div className="bg-white rounded-2xl border border-slate-200 p-10 sm:p-16 text-center shadow-xs my-8"><PackageOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" /><h3 className="text-base font-bold text-slate-900">Belum ada unit yang cocok</h3><p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">Coba ubah kata kunci atau filter. Jika belum menemukan unit yang sesuai, hubungi Tim BBKitchen.</p><button type="button" onClick={handleResetFilters} className="mt-5 px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors">Reset Filter</button></div>}
        <div className="mt-8"><KitchenConsultationBanner /></div>
      </main>
      <TrustSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
      {selectedProduct && <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onToggleStatus={handleToggleStatus} isAdminMode={isAdminMode} />}
      {isRequestModalOpen && <RequestUnitModal onClose={() => setIsRequestModalOpen(false)} onSubmit={handleAddProduct} categories={liveRequestCategoryOptions} />}
      {isAdminPanelOpen && <AdminPanelModal onClose={() => setIsAdminPanelOpen(false)} isAdminMode={isAdminMode} />}
    </div>
  );
}
