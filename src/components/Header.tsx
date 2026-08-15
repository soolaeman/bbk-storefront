import React, { useState } from 'react';
import { Menu, Phone, PlusCircle, Search, ShieldCheck, Unlock, Lock, Wrench, X } from 'lucide-react';
import { generateWhatsAppConsultationLink } from '../utils/formatters';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onRequestUnitClick?: () => void;
  isAdminMode?: boolean;
  onToggleAdminMode?: () => void;
  onOpenAdminPanel?: () => void;
  simple?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery = '',
  onSearchChange = () => undefined,
  onRequestUnitClick = () => undefined,
  isAdminMode = false,
  onToggleAdminMode = () => undefined,
  onOpenAdminPanel = () => undefined,
  simple = false,
}) => {
  const [pinInputOpen, setPinInputOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <a
            href={generateWhatsAppConsultationLink('Konsultasi Kebutuhan Dapur Usaha')}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-700 transition-colors hover:text-emerald-700"
          >
            Konsultasi via WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex min-h-[68px] items-center gap-3 py-3 md:gap-5">
          <a href="/" aria-label="BBKitchen — Home" className="flex shrink-0 items-center">
            <img
              src="/bbkitchen-logo.webp"
              alt="BBKitchen — Bukan Baru Kitchen — Sentra Barang Bekas Restoran"
              className="h-9 w-auto max-w-[190px] object-contain sm:h-10 sm:max-w-[220px]"
            />
            <span className="sr-only">BBKitchen — Bukan Baru Kitchen — Sentra Barang Bekas Restoran</span>
          </a>

          {!simple && (
            <div className="order-3 w-full md:order-2 md:flex-1">
              <div className="relative mx-auto max-w-2xl">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  id="global-search-input"
                  value={searchQuery}
                  onChange={(event) => onSearchChange(event.target.value)}
                  placeholder="Cari kompor, meja stainless, sink, chiller..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 placeholder:text-slate-400"
                  aria-label="Cari katalog BBKitchen"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-1.5 py-0.5 text-xs font-semibold text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Hapus pencarian"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="order-2 ml-auto flex shrink-0 items-center gap-2 md:order-3">
            {!simple && (
              <>
                <button
                  type="button"
                  onClick={onRequestUnitClick}
                  className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 sm:inline-flex"
                >
                  <PlusCircle className="h-4 w-4 text-emerald-600" />
                  <span>Titip Cari</span>
                </button>

                <a
                  href={generateWhatsAppConsultationLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="header-wa-consult-btn"
                  className="hidden items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-emerald-700 sm:inline-flex"
                >
                  <Phone className="h-4 w-4" />
                  <span>Konsultasi</span>
                </a>
              </>
            )}

            {!simple && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 sm:hidden"
                aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>

        {!simple && (
          <>
            <div className="hidden border-t border-slate-100 py-2 md:block">
              <nav className="flex items-center justify-between gap-4 text-xs font-semibold text-slate-600" aria-label="Navigasi utama">
                <div className="flex items-center gap-5">
                  <a href="/" className="transition-colors hover:text-emerald-700">Home</a>
                  <button type="button" onClick={scrollToCatalog} className="transition-colors hover:text-emerald-700">Katalog</button>
                  <button type="button" onClick={onRequestUnitClick} className="transition-colors hover:text-emerald-700">Titip Cari Unit</button>
                  <a href={generateWhatsAppConsultationLink()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-700">Konsultasi</a>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    id="admin-mode-toggle-btn"
                    onClick={handleAdminToggle}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
                      isAdminMode
                        ? 'border border-amber-300 bg-amber-50 text-amber-800'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                    title={isAdminMode ? 'Admin Mode Aktif (Klik untuk keluar)' : 'Akses Owner / Staff'}
                  >
                    {isAdminMode ? <Unlock className="h-3.5 w-3.5 text-amber-600" /> : <Lock className="h-3.5 w-3.5 text-slate-400" />}
                    <span>{isAdminMode ? 'Admin Mode ON' : 'Staff / Owner'}</span>
                  </button>

                  {pinInputOpen && (
                    <div className="absolute right-0 top-10 z-50 w-72 rounded-xl border border-slate-200 bg-white p-4 text-slate-700 shadow-xl">
                      <div className="mb-1 flex items-center justify-between text-xs font-bold text-slate-900">
                        <span>Verifikasi Akses Admin</span>
                        <button type="button" onClick={() => setPinInputOpen(false)} className="text-slate-400 hover:text-slate-700" aria-label="Tutup verifikasi">×</button>
                      </div>
                      <p className="mb-3 text-[11px] leading-relaxed text-slate-500">
                        Masukkan PIN staff untuk membuka kontrol inventori. PIN demo saat ini: <strong>1234</strong>.
                      </p>
                      <form onSubmit={handlePinSubmit} className="space-y-2.5">
                        <input
                          type="password"
                          value={pin}
                          onChange={(event) => { setPin(event.target.value); setPinError(false); }}
                          placeholder="Masukkan PIN"
                          autoFocus
                          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        />
                        {pinError && <p className="text-[10px] font-semibold text-rose-600">PIN salah. Coba lagi.</p>}
                        <div className="flex justify-end gap-2 pt-1">
                          <button type="button" onClick={() => setPinInputOpen(false)} className="rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-800">Batal</button>
                          <button type="submit" className="rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-slate-800">Buka Akses</button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {mobileMenuOpen && (
              <div className="border-t border-slate-100 py-3 md:hidden">
                <nav className="grid gap-1 text-sm font-semibold text-slate-700" aria-label="Navigasi mobile">
                  <a href="/" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 hover:bg-slate-50">Home</a>
                  <button type="button" onClick={scrollToCatalog} className="rounded-lg px-3 py-2.5 text-left hover:bg-slate-50">Katalog</button>
                  <button type="button" onClick={() => { onRequestUnitClick(); setMobileMenuOpen(false); }} className="rounded-lg px-3 py-2.5 text-left hover:bg-slate-50">Titip Cari Unit</button>
                  <a href={generateWhatsAppConsultationLink()} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 hover:bg-slate-50">Konsultasi WhatsApp</a>
                  <button type="button" onClick={handleAdminToggle} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left hover:bg-slate-50">
                    {isAdminMode ? <Unlock className="h-4 w-4 text-amber-600" /> : <Lock className="h-4 w-4 text-slate-400" />}
                    {isAdminMode ? 'Keluar Admin Mode' : 'Staff / Owner'}
                  </button>
                  {isAdminMode && (
                    <button type="button" onClick={() => { onOpenAdminPanel(); setMobileMenuOpen(false); }} className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-left text-amber-800">
                      <Wrench className="h-4 w-4" />
                      Kelola Stok
                    </button>
                  )}
                </nav>
              </div>
            )}

            {isAdminMode && (
              <div className="border-t border-amber-200 bg-amber-50 px-4 py-2 text-[11px] text-amber-800">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 lg:px-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-amber-600" />
                    <span className="truncate"><strong>Mode Staff / Admin aktif.</strong> Kontrol inventori internal tersedia.</span>
                  </div>
                  <button type="button" onClick={onOpenAdminPanel} className="shrink-0 font-semibold underline hover:text-amber-950">Buka Panel →</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};
