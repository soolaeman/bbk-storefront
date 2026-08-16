import React, { useMemo } from 'react';
import { Flame, Utensils, Layers, Snowflake, Maximize2, Table, Wind, Cpu, Coffee, Droplets, LayoutGrid, SlidersHorizontal, RotateCcw, Search, X, ChevronDown } from 'lucide-react';
import { EquipmentCategory, FilterState } from '../types';

export interface CategoryFilterOption {
  id: number | string;
  name: string;
  icon?: string;
  parentId?: number;
  count?: number;
  children?: CategoryFilterOption[];
}

interface CategoryFilterProps {
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
  categoryCounts: Record<string, number>;
  categories?: CategoryFilterOption[];
  conditionOptions?: string[];
  locationOptions?: string[];
  powerTypeOptions?: string[];
}

const getCategoryIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Flame': return <Flame className="w-4 h-4" />;
    case 'Utensils': return <Utensils className="w-4 h-4" />;
    case 'Layers': return <Layers className="w-4 h-4" />;
    case 'Snowflake': return <Snowflake className="w-4 h-4" />;
    case 'Maximize2': return <Maximize2 className="w-4 h-4" />;
    case 'Table': return <Table className="w-4 h-4" />;
    case 'Wind': return <Wind className="w-4 h-4" />;
    case 'Cpu': return <Cpu className="w-4 h-4" />;
    case 'Coffee': return <Coffee className="w-4 h-4" />;
    case 'Droplets': return <Droplets className="w-4 h-4" />;
    default: return <LayoutGrid className="w-4 h-4" />;
  }
};

const normalizeOptions = (options: string[] | undefined, currentValue: string) => {
  const unique = Array.from(new Set((options ?? []).map((option) => option.trim()).filter(Boolean)));
  if (currentValue && !unique.includes(currentValue)) unique.unshift(currentValue);
  return unique;
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  filterState,
  onFilterChange,
  onResetFilters,
  totalResultsCount,
  categoryCounts,
  categories = [],
  conditionOptions = [],
  locationOptions = [],
}) => {
  const visibleCategories = useMemo(() => (
    categories.filter((category) => (
      category.parentId === undefined || category.parentId === 0
    )).filter((category) => (
      category.name === 'Semua' || category.count !== undefined || (categoryCounts[category.name] || 0) > 0
    ))
  ), [categories, categoryCounts]);

  const selectedCategory = categories.find((category) => category.name === filterState.category);
  const activeTopLevelCategory = selectedCategory?.parentId && selectedCategory.parentId !== 0
    ? categories.find((category) => Number(category.id) === Number(selectedCategory.parentId))
    : selectedCategory;

  const subcategories = useMemo(() => {
    if (!activeTopLevelCategory || filterState.category === 'Semua') return [];
    const explicitChildren = activeTopLevelCategory.children ?? [];
    if (explicitChildren.length > 0) return explicitChildren;
    return categories.filter((category) => Number(category.parentId || 0) === Number(activeTopLevelCategory.id));
  }, [activeTopLevelCategory, categories, filterState.category]);

  const conditionValues = Array.from(new Set(
    normalizeOptions(conditionOptions, filterState.condition)
      .map((value) => {
        const normalized = value.trim().toLowerCase();
        if (normalized === 'baru') return 'Baru';
        if (normalized === 'bekas') return 'Bekas';
        return null;
      })
      .filter((value): value is 'Baru' | 'Bekas' => value !== null),
  ));
  const conditions = ['Semua Kondisi', ...conditionValues];
  const locationValues = normalizeOptions(locationOptions, filterState.location);
  const isFiltered = filterState.category !== 'Semua' || filterState.condition !== 'Semua Kondisi' || filterState.location !== 'Semua Lokasi' || filterState.searchQuery !== '';

  return (
    <section className="bg-white border-b border-slate-200 py-6 px-4">
      <div className="max-w-7xl mx-auto space-y-5">
        <div>
          <div className="flex flex-col gap-3 mb-3 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2"><SlidersHorizontal className="w-4 h-4 text-amber-600" /><span>Kategori Peralatan Dapur Komersial</span></h2>
            <span className="text-xs text-slate-500 font-medium">Menampilkan <strong className="text-slate-900">{totalResultsCount}</strong> unit cocok</span>
          </div>

          <div className="relative mb-3 max-w-2xl">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="search" id="catalog-search-input" value={filterState.searchQuery} onChange={(event) => onFilterChange({ searchQuery: event.target.value })} placeholder="Cari unit di katalog: kompor, meja stainless, sink, chiller..." className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100 placeholder:text-slate-400" aria-label="Cari unit di katalog BBKitchen" />
            {filterState.searchQuery && <button type="button" onClick={() => onFilterChange({ searchQuery: '' })} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700" aria-label="Hapus pencarian katalog"><X className="h-4 w-4" /></button>}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin lg:flex-wrap lg:overflow-visible">
            <button type="button" id="cat-btn-semua" onClick={() => onFilterChange({ category: 'Semua' as EquipmentCategory })} className={`shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${filterState.category === 'Semua' ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-sm' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'}`}><LayoutGrid className="w-4 h-4" /><span>Semua</span></button>
            {visibleCategories.map((category) => {
              const isActive = activeTopLevelCategory?.id === category.id && filterState.category !== 'Semua';
              return <button key={category.id} type="button" id={`cat-btn-${category.name.replace(/\s+/g, '-').toLowerCase()}`} onClick={() => onFilterChange({ category: category.name as EquipmentCategory })} className={`shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${isActive ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-sm' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'}`}><span className={isActive ? 'text-amber-400' : 'text-slate-500'}>{getCategoryIcon(category.icon)}</span><span>{category.name}</span>{isActive && subcategories.length > 0 ? <ChevronDown className="w-3.5 h-3.5" /> : null}</button>;
            })}
          </div>

          {subcategories.length > 0 && activeTopLevelCategory && filterState.category !== 'Semua' && (
            <div className="mt-2 border-t border-slate-200 pt-2 pb-1">
              <div className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 mb-1.5">{activeTopLevelCategory.name}</div>
              <div className="overflow-x-auto scrollbar-thin lg:overflow-visible">
                <div className="flex min-w-max items-center gap-2 lg:min-w-0 lg:flex-wrap">
                  <button type="button" onClick={() => onFilterChange({ category: activeTopLevelCategory.name as EquipmentCategory })} className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${filterState.category === activeTopLevelCategory.name ? 'border-slate-900 bg-slate-900 text-amber-400' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}>Semua</button>
                  {subcategories.map((subcategory) => {
                    const isActive = filterState.category === subcategory.name;
                    return <button key={subcategory.id} type="button" onClick={() => onFilterChange({ category: subcategory.name as EquipmentCategory })} className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${isActive ? 'border-slate-900 bg-slate-900 text-amber-400' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}><span>{subcategory.name}</span></button>;
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center rounded-lg border border-slate-300 bg-white overflow-hidden">
              {conditions.map((condition) => { const active = filterState.condition === condition; return <button key={condition} type="button" id={`filter-condition-${condition.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => onFilterChange({ condition })} className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${active ? 'bg-slate-900 text-amber-400' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>{condition}</button>; })}
            </div>
            <select id="filter-location-select" value={filterState.location} onChange={(e) => onFilterChange({ location: e.target.value })} className="text-xs bg-white border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:border-amber-500 font-medium"><option value="Semua Lokasi">Semua Lokasi</option>{locationValues.length === 0 ? <option value="">Lokasi belum tersedia</option> : locationValues.map((value) => <option key={value} value={value}>{value}</option>)}</select>
          </div>
          <div className="flex items-center gap-2"><div className="flex items-center gap-1.5 text-xs text-slate-500"><span>Urutkan:</span><select id="filter-sort-select" value={filterState.sortBy} onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })} className="text-xs bg-white border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 font-medium"><option value="latest">Terbaru Ditambahkan</option><option value="price_low">Harga Terendah</option><option value="price_high">Harga Tertinggi</option><option value="condition">Kondisi Tertinggi</option></select></div>{isFiltered && <button type="button" id="filter-reset-btn" onClick={onResetFilters} className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors font-medium"><RotateCcw className="w-3.5 h-3.5" /><span>Reset</span></button>}</div>
        </div>
      </div>
    </section>
  );
};
