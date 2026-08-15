'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Menu, Phone, PlusCircle, Search, ShieldCheck, Unlock, Lock, Wrench, X, Loader2 } from 'lucide-react';
import { generateWhatsAppConsultationLink } from '../utils/formatters';

interface HeaderSearchProduct {
  id: number;
  name: string;
  slug: string;
  sku?: string;
  price?: string;
  regular_price?: string;
  images?: Array<{ src: string; alt?: string }>;
  categories?: Array<{ id?: number; name: string; slug?: string }>;
}

interface HeaderProps {
  /** @deprecated Header search is now self-contained. Kept temporarily for App.tsx compatibility. */
  searchQuery?: string;
  /** @deprecated Header search is now self-contained. Kept temporarily for App.tsx compatibility. */
  onSearchChange?: (query: string) => void;
  onRequestUnitClick?: () => void;
  isAdminMode?: boolean;
  onToggleAdminMode?: () => void;
  onOpenAdminPanel?: () => void;
  simple?: boolean;
}

const SEARCH_DEBOUNCE_MS = 300;
const SEARCH_RESULT_LIMIT = 3;

export const Header: React.FC<HeaderProps> = ({
  onRequestUnitClick = () => undefined,
  isAdminMode = false,
  onToggleAdminMode = () => undefined,
  onOpenAdminPanel = () => undefined,
  simple = false,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<HeaderSearchProduct[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [pinInputOpen, setPinInputOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchRequestRef = useRef(0);

  useEffect(() => {
    const query = searchInput.trim();

    if (!query) {
      setSearchResults([]);
      setIsSearchLoading(false);
      setSearchOpen(false);
      return;
    }

    const requestId = ++searchRequestRef.current;
    const timer = window.setTimeout(async () => {
      setIsSearchLoading(true);
      setSearchOpen(true);

      try {
        const params = new URLSearchParams({
          status: 'publish',
          search: query,
          per_page: String(SEARCH_RESULT_LIMIT),
          page: '1',
        });
        const response = await fetch(`/api/products?${params.toString()}`, {
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });

        if (!response.ok) throw new Error(`Search endpoint gagal: ${response.status}`);

        const data = (await response.json()) as HeaderSearchProduct[];
        if (requestId !== searchRequestRef.current) return;
        setSearchResults(Array.isArray(data) ? data.slice(0, SEARCH_RESULT_LIMIT) : []);
      } catch (error) {
        if (requestId !== searchRequestRef.current) return;
        console.error('Global header search gagal:', error);
        setSearchResults([]);
      } finally {
        if (requestId === searchRequestRef.current) setIsSearchLoading(false);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!searchContainerRef.current?.contains(event.target as Node)) setSearchOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchInput.trim();
    if (!query) return;

    setSearchOpen(false);
    window.location.href = `/catalog?search=${encodeURIComponent(query)}`;
  };

  const handleSearchResultClick = (product: HeaderSearchProduct) => {
    setSearchOpen(false);
    window.location.href = `/product/${encodeURIComponent(product.slug)}`;
  };

  const handleAdminToggle = () => {
    if (isAdminMode) {
      onToggleAdminMode();
      setMobileMenuOpen(false);
      return;
    }

    setPinInputOpen(true);
    setPin('');
    setPinError(false);
  };

  const handlePinSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (pin === '1234' || pin === 'admin') {
      setPinInputOpen(false);
      setPin('');
      onToggleAdminMode();
      setMobileMenuOpen(false);
      return;
    }

    setPinError(true);
  };

  const scrollToCatalog = () => {
    document.querySelector('main')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 text-slate-900 shadow-sm backdrop-blur">
      <div className="hidden border-b border-slate-100 bg-slate-50 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[11px] text-slate-500 lg:px-6">
          <span>Sentra barang bekas restoran & peralatan dapur komersial</span>
          <a href={generateWhatsAppConsultationLink('Konsultasi Kebutuhan Dapur Usaha')} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-700 transition-colors hover:text-emerald-700">Konsultasi via WhatsApp</a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex min-h-[68px] items-center gap-3 py-3 md:gap-5">
          <a href="/" aria-label="BBKitchen — Home" className="flex shrink-0 items-center">
            <img src="/bbkitchen-logo.webp" alt="BBKitchen — Bukan Baru Kitchen — Sentra Barang Bekas Restoran" className="h-9 w-auto max-w-[190px] object-contain sm:h-10 sm:max-w-[220px]" />
            <span className="sr-only">BBKitchen — Bukan Baru Kitchen — Sentra Barang Bekas Restoran</span>
          </a>

          {!simple && (
            <div ref={searchContainerRef} className="order-3 w-full md:order-2 md:flex-1">
              <form onSubmit={handleSearchSubmit} className="relative mx-auto max-w-2xl">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  id="global-search-input"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  onFocus={() => { if (searchInput.trim()) setSearchOpen(true); }}
                  placeholder="Cari kompor, meja stainless, sink, chiller..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 placeholder:text-slate-400"
                  aria-label="Cari produk BBKitchen"
                  aria-autocomplete="list"
                  aria-controls="global-search-results"
                  autoComplete="off"
                />
                {searchInput && (
                  <button type="button" onClick={() => { setSearchInput(''); setSearchResults([]); setSearchOpen(false); }} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-1.5 py-0.5 text-xs font-semibold text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700" aria-label="Hapus pencarian">
                    <X className="h-4 w-4" />
                  </button>
                )}

                {searchOpen && (
                  <div id="global-search-results" role="listbox" className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
                    {isSearchLoading ? (
                      <div className="flex items-center gap-2 px-4 py-4 text-xs font-semibold text-slate-500"><Loader2 className="h-4 w-4 animate-spin text-emerald-600" /> Mencari unit di WooCommerce...</div>
                    ) : searchResults.length > 0 ? (
                      <div className="divide-y divide-slate-100">
                        {searchResults.map((product) => (
                          <button key={product.id} type="button" role="option" onMouseDown={(event) => event.preventDefault()} onClick={() => handleSearchResultClick(product)} className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50">
                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                              {product.images?.[0]?.src ? <img src={product.images[0].src} alt={product.images[0].alt || product.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-[9px] font-bold text-slate-400">BBK</div>}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-black text-slate-900">{product.name}</p>
                              <p className="mt-0.5 truncate text-[10px] font-medium text-slate-500">{product.categories?.[0]?.name || 'Peralatan Dapur Komersial'}{product.sku ? ` • ${product.sku}` : ''}</p>
                            </div>
                            <span className="shrink-0 text-[10px] font-bold text-emerald-700">Lihat unit →</span>
                          </button>
                        ))}
                        <button type="submit" className="w-full bg-slate-50 px-4 py-2.5 text-center text-[11px] font-black text-slate-700 transition-colors hover:bg-slate-100">Lihat semua hasil untuk “{searchInput.trim()}” →</button>
                      </div>
                    ) : (
                      <div className="px-4 py-4">
                        <p className="text-xs font-bold text-slate-700">Tidak ada rekomendasi unit.</p>
                        <button type="submit" className="mt-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800">Cari di katalog →</button>
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>
          )}

          <div className="order-2 ml-auto flex shrink-0 items-center gap-2 md:order-3">
            {!simple && <>
              <button type="button" onClick={onRequestUnitClick} className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 sm:inline-flex"><PlusCircle className="h-4 w-4 text-emerald-600" /><span>Titip Cari</span></button>
              <a href={generateWhatsAppConsultationLink()} target="_blank" rel="noopener noreferrer" id="header-wa-consult-btn" className="hidden items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-emerald-700 sm:inline-flex"><Phone className="h-4 w-4" /><span>Konsultasi</span></a>
            </>}
            {!simple && <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 sm:hidden" aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'} aria-expanded={mobileMenuOpen}>{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>}
          </div>
        </div>

        {!simple && <>
          <div className="hidden border-t border-slate-100 py-2 md:block">
            <nav className="flex items-center justify-between gap-4 text-xs font-semibold text-slate-600" aria-label="Navigasi utama">
              <div className="flex items-center gap-5">
                <a href="/" className="transition-colors hover:text-emerald-700">Home</a>
                <button type="button" onClick={scrollToCatalog} className="transition-colors hover:text-emerald-700">Katalog</button>
                <button type="button" onClick={onRequestUnitClick} className="transition-colors hover:text-emerald-700">Titip Cari Unit</button>
                <a href={generateWhatsAppConsultationLink()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-700">Konsultasi</a>
              </div>
              <div className="relative">
                <button type="button" id="admin-mode-toggle-btn" onClick={handleAdminToggle} className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${isAdminMode ? 'border border-amber-300 bg-amber-50 text-amber-800' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`} title={isAdminMode ? 'Admin Mode Aktif (Klik untuk keluar)' : 'Akses Owner / Staff'}>{isAdminMode ? <Unlock className="h-3.5 w-3.5 text-amber-600" /> : <Lock className="h-3.5 w-3.5 text-slate-400" />}<span>{isAdminMode ? 'Admin Mode ON' : 'Staff / Owner'}</span></button>
                {pinInputOpen && <div className="absolute right-0 top-10 z-50 w-72 rounded-xl border border-slate-200 bg-white p-4 text-slate-700 shadow-xl"><div className="mb-1 flex items-center justify-between text-xs font-bold text-slate-900"><span>Verifikasi Akses Admin</span><button type="button" onClick={() => setPinInputOpen(false)} className="text-slate-400 hover:text-slate-700" aria-label="Tutup verifikasi">×</button></div><p className="mb-3 text-[11px] leading-relaxed text-slate-500">Masukkan PIN staff untuk membuka kontrol inventori. PIN demo saat ini: <strong>1234</strong>.</p><form onSubmit={handlePinSubmit} className="space-y-2.5"><input type="password" value={pin} onChange={(event) => { setPin(event.target.value); setPinError(false); }} placeholder="Masukkan PIN" autoFocus className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100" />{pinError && <p className="text-[10px] font-semibold text-rose-600">PIN salah. Coba lagi.</p>}<div className="flex justify-end gap-2 pt-1"><button type="button" onClick={() => setPinInputOpen(false)} className="rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-800">Batal</button><button type="submit" className="rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-slate-800">Buka Akses</button></div></form></div>}
              </div>
            </nav>
          </div>
          {mobileMenuOpen && <div className="border-t border-slate-100 py-3 md:hidden"><nav className="grid gap-1 text-sm font-semibold text-slate-700" aria-label="Navigasi mobile"><a href="/" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 hover:bg-slate-50">Home</a><button type="button" onClick={scrollToCatalog} className="rounded-lg px-3 py-2.5 text-left hover:bg-slate-50">Katalog</button><button type="button" onClick={() => { onRequestUnitClick(); setMobileMenuOpen(false); }} className="rounded-lg px-3 py-2.5 text-left hover:bg-slate-50">Titip Cari Unit</button><a href={generateWhatsAppConsultationLink()} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 hover:bg-slate-50">Konsultasi WhatsApp</a><button type="button" onClick={handleAdminToggle} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left hover:bg-slate-50">{isAdminMode ? <Unlock className="h-4 w-4 text-amber-600" /> : <Lock className="h-4 w-4 text-slate-400" />}{isAdminMode ? 'Keluar Admin Mode' : 'Staff / Owner'}</button>{isAdminMode && <button type="button" onClick={() => { onOpenAdminPanel(); setMobileMenuOpen(false); }} className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-left text-amber-800"><Wrench className="h-4 w-4" />Kelola Stok</button>}</nav></div>}
          {isAdminMode && <div className="border-t border-amber-200 bg-amber-50 px-4 py-2 text-[11px] text-amber-800"><div className="mx-auto flex max-w-7xl items-center justify-between gap-3 lg:px-2"><div className="flex min-w-0 items-center gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-amber-600" /><span className="truncate"><strong>Mode Staff / Admin aktif.</strong> Kontrol inventori internal tersedia.</span></div><button type="button" onClick={onOpenAdminPanel} className="shrink-0 font-semibold underline hover:text-amber-950">Buka Panel →</button></div></div>}
        </>}
      </div>
    </header>
  );
};