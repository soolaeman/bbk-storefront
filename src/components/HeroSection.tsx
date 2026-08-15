import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, BadgePercent, Truck, Flame, Snowflake, Layers, Utensils, Table, Search } from 'lucide-react';
import { EquipmentCategory } from '../types';

interface HeroSectionProps {
  onSelectCategory: (category: EquipmentCategory) => void;
  onRequestUnitClick: () => void;
}

interface PopularCategory {
  id: number;
  name: string;
}

const POPULAR_CATEGORIES: PopularCategory[] = [
  { id: 137, name: 'MEJA STAINLESS' },
  { id: 158, name: 'SINK STAINLESS' },
  { id: 145, name: 'RAK STAINLESS' },
  { id: 113, name: 'HOOD STAINLESS' },
  { id: 122, name: 'KOMPOR' },
];

function getCategoryIcon(name: string): React.ReactNode {
  const normalized = name.toLowerCase();

  if (normalized.includes('kompor')) return <Flame className="w-3.5 h-3.5 text-amber-500" />;
  if (normalized.includes('chiller') || normalized.includes('freezer') || normalized.includes('ice')) return <Snowflake className="w-3.5 h-3.5 text-blue-500" />;
  if (normalized.includes('sink') || normalized.includes('cuci')) return <Utensils className="w-3.5 h-3.5 text-blue-400" />;
  if (normalized.includes('meja')) return <Table className="w-3.5 h-3.5 text-slate-300" />;
  return <Layers className="w-3.5 h-3.5 text-amber-400" />;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectCategory, onRequestUnitClick }) => {
  const [popularCategories] = useState<PopularCategory[]>(POPULAR_CATEGORIES);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white border-b border-slate-700/80">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-[url('/images/hero/bbkitchen-hero-desktop.webp')] bg-[url('/images/hero/bbkitchen-hero-mobile.webp')]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/25 md:via-slate-950/65 md:to-slate-950/10" />

      <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[620px] md:min-h-[660px] lg:min-h-[600px]">
          <div className="lg:col-span-8 space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Katalog Peralatan Bekas Resto Komersial</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight max-w-3xl">
              Peralatan Dapur Bekas untuk{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
                Resto &amp; Usaha Kuliner
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
              Temukan unit peralatan dapur bekas yang masih layak pakai, siap digunakan, dan beberapa unit baru. Cocok untuk restoran, cafe, catering, bakery, hotel, dan dapur komersial. Unit tersedia satuan maupun kebutuhan usaha.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-4xl">
              <div className="bg-slate-900/70 border border-slate-700/70 backdrop-blur-sm p-2.5 rounded-xl flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                <div><h4 className="text-xs font-bold text-slate-100">Cek Kondisi</h4><p className="text-[11px] text-slate-300 leading-snug">Informasi kondisi tiap unit</p></div>
              </div>

              <div className="bg-slate-900/70 border border-slate-700/70 backdrop-blur-sm p-2.5 rounded-xl flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5"><BadgePercent className="w-4 h-4" /></div>
                <div><h4 className="text-xs font-bold text-slate-100">Hemat Modal</h4><p className="text-[11px] text-slate-300 leading-snug">Pilihan unit bekas &amp; baru</p></div>
              </div>

              <div className="bg-slate-900/70 border border-slate-700/70 backdrop-blur-sm p-2.5 rounded-xl flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5"><Truck className="w-4 h-4" /></div>
                <div><h4 className="text-xs font-bold text-slate-100">Siap Diproses</h4><p className="text-[11px] text-slate-300 leading-snug">Cek fisik &amp; pengiriman</p></div>
              </div>

              <div className="bg-slate-900/70 border border-slate-700/70 backdrop-blur-sm p-2.5 rounded-xl flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 shrink-0 mt-0.5"><span className="text-sm font-black">✓</span></div>
                <div><h4 className="text-xs font-bold text-slate-100">Siap Dipakai</h4><p className="text-[11px] text-slate-300 leading-snug">Unit dicek sebelum dikirim</p></div>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-xs text-slate-300 mb-2 font-medium flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>Kategori Populer:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularCategories.map((category) => (
                  <button key={category.id} type="button" onClick={() => onSelectCategory(category.name as EquipmentCategory)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-800/80 backdrop-blur-sm text-slate-100 border border-slate-700 text-xs font-medium transition-all hover:border-amber-400/40">
                    {getCategoryIcon(category.name)}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button type="button" id="hero-request-sourcing-btn" onClick={onRequestUnitClick} className="inline-flex items-center justify-center gap-2 py-2.5 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all">
                <span>Lihat Unit yang Tersedia</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};