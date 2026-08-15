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
    <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-8 pb-10 px-4 border-b border-slate-700/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Katalog Peralatan Bekas Resto Komersial</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Peralatan Dapur Bekas untuk{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
                Resto &amp; Usaha Kuliner
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Temukan unit peralatan dapur bekas yang masih layak pakai, siap digunakan, dan beberapa unit baru. Cocok untuk restoran, cafe, catering, bakery, hotel, dan dapur komersial. Unit tersedia satuan maupun kebutuhan usaha.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-800/80 border border-slate-700/70 p-2.5 rounded-xl flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                <div><h4 className="text-xs font-bold text-slate-200">Cek Kondisi</h4><p className="text-[11px] text-slate-400 leading-snug">Informasi kondisi tiap unit</p></div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 p-2.5 rounded-xl flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5"><BadgePercent className="w-4 h-4" /></div>
                <div><h4 className="text-xs font-bold text-slate-200">Hemat Modal</h4><p className="text-[11px] text-slate-400 leading-snug">Pilihan unit bekas &amp; baru</p></div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 p-2.5 rounded-xl flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5"><Truck className="w-4 h-4" /></div>
                <div><h4 className="text-xs font-bold text-slate-200">Siap Diproses</h4><p className="text-[11px] text-slate-400 leading-snug">Cek fisik &amp; pengiriman</p></div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 p-2.5 rounded-xl flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 shrink-0 mt-0.5"><span className="text-sm font-black">✓</span></div>
                <div><h4 className="text-xs font-bold text-slate-200">Siap Dipakai</h4><p className="text-[11px] text-slate-400 leading-snug">Unit dicek sebelum dikirim</p></div>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-xs text-slate-400 mb-2 font-medium flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>Kategori Populer:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularCategories.map((category) => (
                  <button key={category.id} type="button" onClick={() => onSelectCategory(category.name as EquipmentCategory)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all hover:border-amber-400/40">
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

          <div className="lg:col-span-4 relative min-h-[300px] sm:min-h-[360px] lg:min-h-[420px] overflow-hidden flex items-end justify-end">
            <img
              src="/images/people/bbkitchen-team-thumbs-up.webp"
              alt="Tim BBKitchen"
              className="absolute right-4 lg:right-8 bottom-0 w-[330px] sm:w-[400px] lg:w-[500px] max-w-none h-auto object-contain object-bottom drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};