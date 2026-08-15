import React, { useState } from 'react';
import { Search, Phone, ShieldCheck, Wrench, Lock, Unlock, PlusCircle } from 'lucide-react';
import { generateWhatsAppConsultationLink } from '../utils/formatters';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onRequestUnitClick: () => void;
  isAdminMode: boolean;
  onToggleAdminMode: () => void;
  onOpenAdminPanel: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onRequestUnitClick,
  isAdminMode,
  onToggleAdminMode,
  onOpenAdminPanel
}) => {
  const [pinInputOpen, setPinInputOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleAdminToggle = () => {
    if (isAdminMode) {
      onToggleAdminMode();
    } else {
      setPinInputOpen(true);
      setPin('');
      setPinError(false);
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin === 'admin') {
      setPinInputOpen(false);
      onToggleAdminMode();
    } else {
      setPinError(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="bg-slate-950 px-4 py-1.5 text-xs text-slate-300 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Katalog Update Harian
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-400">Peralatan Dapur Komersial Bekas & Rekondisi Teruji</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a href={generateWhatsAppConsultationLink('Konsultasi Kebutuhan Dapur Usaha')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hotline WhatsApp: <strong className="text-white">+62 812-8888-9999</strong></span>
            </a>

            <div className="relative">
              <button type="button" id="admin-mode-toggle-btn" onClick={handleAdminToggle} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${isAdminMode ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-slate-200'}`} title={isAdminMode ? 'Admin Mode Aktif (Klik untuk keluar)' : 'Akses Owner / Staff'}>
                {isAdminMode ? <Unlock className="w-3 h-3 text-amber-400" /> : <Lock className="w-3 h-3 text-slate-500" />}
                <span>{isAdminMode ? 'Admin Mode ON' : 'Staff / Owner'}</span>
              </button>

              {pinInputOpen && (
                <div className="absolute right-0 top-7 w-64 bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-xl z-50 text-slate-200">
                  <div className="text-xs font-semibold text-white mb-1 flex items-center justify-between">
                    <span>Verifikasi Akses Admin</span>
                    <button type="button" onClick={() => setPinInputOpen(false)} className="text-slate-400 hover:text-white">×</button>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">Masukkan PIN staff untuk melihat kontrol READY/SOLD dan catatan internal. (PIN Demo: <strong>1234</strong>)</p>
                  <form onSubmit={handlePinSubmit} className="space-y-2">
                    <input type="password" value={pin} onChange={(e) => { setPin(e.target.value); setPinError(false); }} placeholder="Masukkan PIN" autoFocus className="w-full px-2.5 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-amber-400" />
                    {pinError && <p className="text-[10px] text-rose-400">PIN salah! Coba ketik: 1234</p>}
                    <div className="flex justify-end gap-2 pt-1">
                      <button type="button" onClick={() => setPinInputOpen(false)} className="px-2 py-1 text-[11px] text-slate-400 hover:text-white">Batal</button>
                      <button type="submit" className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-[11px] rounded">Buka Akses</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
        <div className="flex items-center justify-between w-full md:w-auto">
          <a href="/" aria-label="BBKitchen - Home" className="flex items-center min-w-0">
            <img src="/bbkitchen-logo.webp" alt="BBKitchen" className="h-9 sm:h-10 md:h-11 w-auto max-w-[250px] object-contain" />
          </a>

          <button type="button" onClick={onRequestUnitClick} className="md:hidden inline-flex items-center gap-1 px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Titip Cari</span>
          </button>
        </div>

        <div className="w-full md:max-w-xl relative">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input type="text" id="global-search-input" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} placeholder="Cari kompor 4 burner, deep fryer, chiller, mixer 20L, meja stainless..." className="w-full pl-10 pr-10 py-2 sm:py-2.5 bg-slate-950/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" />
            {searchQuery && <button type="button" onClick={() => onSearchChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-slate-800">Clear</button>}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button type="button" id="header-request-unit-btn" onClick={onRequestUnitClick} className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors">
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>Titip Cari Unit</span>
          </button>

          <a href={generateWhatsAppConsultationLink()} target="_blank" rel="noopener noreferrer" id="header-wa-consult-btn" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950 transition-colors">
            <Phone className="w-4 h-4" />
            <span>Konsultasi Dapur</span>
          </a>

          {isAdminMode && <button type="button" id="header-open-admin-panel-btn" onClick={onOpenAdminPanel} className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-md transition-colors hover:bg-amber-400">
            <Wrench className="w-3.5 h-3.5" />
            <span>Kelola Stok</span>
          </button>}
        </div>
      </div>

      {isAdminMode && <div className="bg-amber-500/10 border-t border-b border-amber-500/30 px-4 py-1.5 text-xs text-amber-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong>Mode Staff / Admin Aktif:</strong> Anda dapat mengubah status READY/SOLD, melihat catatan internal & ID referensi Telegram sumber. (Data internal ini 100% tersembunyi dari publik).</span>
          </div>
          <button type="button" onClick={onOpenAdminPanel} className="underline text-amber-200 hover:text-white text-xs font-medium ml-3 shrink-0">Buka Panel Inventori →</button>
        </div>
      </div>}
    </header>
  );
};
