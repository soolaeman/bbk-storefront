import React from 'react';
import { ShieldCheck, CheckCircle2, BadgePercent, Truck, Flame, Snowflake, Layers, Utensils, Table, Search, Sparkles } from 'lucide-react';
import { EquipmentCategory } from '../types';

interface HeroSectionProps {
  onSelectCategory: (category: EquipmentCategory) => void;
  onRequestUnitClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectCategory, onRequestUnitClick }) => {
  return (
    <section className="bg-slate-950 text-white border-b border-slate-800/80 px-4 py-4 lg:py-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left Headline & Trust Badges */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[11px] font-bold text-amber-400">
              Katalog Peralatan Dapur Bekas Restoran
            </span>
            <span className="hidden sm:inline text-xs text-slate-500">•</span>
            <span className="hidden sm:inline text-xs text-emerald-400 font-medium">
              14 Hub Gudang Jabodetabek
            </span>
          </div>

          <h1 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>Peralatan Resto, Cafe &amp; Catering</span>
            <span className="text-amber-400 text-sm sm:text-base font-bold bg-amber-950/60 px-2.5 py-0.5 rounded-lg border border-amber-800/40">
              Hemat 50-65%
            </span>
          </h1>
        </div>

        {/* Right Action & Trust Highlights */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden lg:flex items-center gap-3 text-xs text-slate-300 mr-2">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Tes Fungsi 24J</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Garansi Resmi</span>
            <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-sky-400" /> Siap Kirim</span>
          </div>

          <button
            type="button"
            onClick={onRequestUnitClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-sm shadow-amber-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Titip Sourcing Alat</span>
          </button>
        </div>
      </div>
    </section>
  );
};