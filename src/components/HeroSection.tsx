import React, { useEffect, useState } from 'react';
import { ShieldCheck, CheckCircle2, BadgePercent, Truck, Sparkles, Flame, Snowflake, Layers, Utensils, Table, Search } from 'lucide-react';
import { EquipmentCategory } from '../types';

interface HeroSectionProps {
  onSelectCategory: (category: EquipmentCategory) => void;
  onRequestUnitClick: () => void;
}

interface LiveCategory {
  id: number;
  name: string;
  parent?: number;
  count?: number;
}

const FALLBACK_POPULAR_CATEGORIES = [
  { name: 'Meja Stainless', label: 'Meja Stainless', icon: <Table className="w-3.5 h-3.5 text-slate-300" /> },
  { name: 'Sink Stainless', label: 'Sink Stainless', icon: <Utensils className="w-3.5 h-3.5 text-blue-400" /> },
  { name: 'Rak Stainless', label: 'Rak Stainless', icon: <Layers className="w-3.5 h-3.5 text-amber-400" /> },
  { name: 'Kompor', label: 'Kompor', icon: <Flame className="w-3.5 h-3.5 text-amber-500" /> },
  { name: 'Chiller', label: 'Chiller', icon: <Snowflake className="w-3.5 h-3.5 text-blue-500" /> },
];

function getCategoryIcon(name: string): React.ReactNode {
  const normalized = name.toLowerCase();

  if (normalized.includes('kompor')) {
    return <Flame className="w-3.5 h-3.5 text-amber-500" />;
  }

  if (normalized.includes('chiller') || normalized.includes('freezer') || normalized.includes('ice')) {
    return <Snowflake className="w-3.5 h-3.5 text-blue-500" />;
  }

  if (normalized.includes('sink') || normalized.includes('cuci')) {
    return <Utensils className="w-3.5 h-3.5 text-blue-400" />;
  }

  if (normalized.includes('meja')) {
    return <Table className="w-3.5 h-3.5 text-slate-300" />;
  }

  return <Layers className="w-3.5 h-3.5 text-amber-400" />;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCategory,
  onRequestUnitClick
}) => {
  const [popularCategories, setPopularCategories] = useState<LiveCategory[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadPopularCategories = async () => {
      try {
        const response = await fetch('/api/products?metadata=1', {
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });

        if (!response.ok) throw new Error(`Metadata endpoint gagal: ${response.status}`);

        const data = (await response.json()) as { categories?: LiveCategory[] };
        const categories = Array.isArray(data.categories) ? data.categories : [];
        const ranked = categories
          .filter((category) => category.name?.trim() && (category.parent ?? 0) === 0)
          .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
          .slice(0, 5);

        if (!cancelled) setPopularCategories(ranked);
      } catch (error) {
        console.error('Failed to load popular catalog categories:', error);
      }
    };

    void loadPopularCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  const displayedCategories = popularCategories.length > 0
    ? popularCategories.map((category) => ({
        name: category.name,
        label: category.name,
        icon: getCategoryIcon(category.name),
      }))
    : FALLBACK_POPULAR_CATEGORIES;

  return (
    <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-8 pb-10 px-4 border-b border-slate-700/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Katalog Peralatan Dapur Komersial Terkurasi & Teruji Fungsi</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Buka & Kembangkan Dapur Usaha{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
                Hemat Modal Hingga 60%
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Pilihan peralatan dapur komersial bekas berkualitas, rekondisi siap pakai, dan sisa proyek untuk restoran, cafe, catering, bakery, dan dapur program gizi (MBG). Setiap unit diuji fungsi burner, kompresor, dan dinamo sebelum serah terima.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-800/80 border border-slate-700/70 p-2.5 rounded-xl flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Inspeksi Teknisi</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">Uji fungsi suhu & api</p>
                </div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 p-2.5 rounded-xl flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                  <BadgePercent className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Hemat Investasi</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">Alokasi modal lebih sehat</p>
                </div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 p-2.5 rounded-xl flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Siap Kirim & Cek</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">Bisa survei fisik / kargo</p>
                </div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 p-2.5 rounded-xl flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Sourcing Cepat</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">Bisa titip cari spek khusus</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-xs text-slate-400 mb-2 font-medium flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>Pencarian Populer:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {displayedCategories.map((category) => (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => onSelectCategory(category.name as EquipmentCategory)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all hover:border-amber-400/40"
                  >
                    {category.icon}
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Layanan Dapur Usaha
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Jabodetabek & Luar Kota</span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span><strong>Ingin Cek Fisik?</strong> Jadwalkan survei ke lokasi unit sebelum transaksi.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span><strong>Butuh Video Tes?</strong> Tim kami siap kirimkan video burner menyala atau kompresor dingin.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span><strong>Spek Belum Ada di Katalog?</strong> Titip pencarian unit langsung ke jaringan sourcing BBKitchen.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                id="hero-request-sourcing-btn"
                onClick={onRequestUnitClick}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Minta Bantuan Cari Unit Dapur</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
