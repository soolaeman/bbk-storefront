import React, { useMemo, useRef } from 'react';
import {
  Flame,
  Utensils,
  Layers,
  Snowflake,
  Maximize2,
  Table,
  Wind,
  Cpu,
  Coffee,
  Droplets,
  LayoutGrid,
  SlidersHorizontal,
  RotateCcw,
  Search,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { EquipmentCategory, FilterState } from '../types';
import { useHeaderScroll } from '../hooks/useHeaderScroll';

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
    case 'Flame': return <Flame className="w-3.5 h-3.5" />;
    case 'Utensils': return <Utensils className="w-3.5 h-3.5" />;
    case 'Layers': return <Layers className="w-3.5 h-3.5" />;
    case 'Snowflake': return <Snowflake className="w-3.5 h-3.5 text-sky-500" />;
    case 'Maximize2': return <Maximize2 className="w-3.5 h-3.5" />;
    case 'Table': return <Table className="w-3.5 h-3.5" />;
    case 'Wind': return <Wind className="w-3.5 h-3.5" />;
    case 'Cpu': return <Cpu className="w-3.5 h-3.5" />;
    case 'Coffee': return <Coffee className="w-3.5 h-3.5" />;
    case 'Droplets': return <Droplets className="w-3.5 h-3.5 text-blue-500" />;
    default: return <LayoutGrid className="w-3.5 h-3.5" />;
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
  const { isVisible, isScrolled } = useHeaderScroll();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  return (
    <section
      className={`sticky z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-2 sm:py-2.5 px-4 shadow-xs transition-all duration-300 ease-in-out ${
        isScrolled && !isVisible
          ? 'top-0'
          : 'top-[56px] sm:top-[60px] md:top-[128px]'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-2">
        {/* Main 1-View Compact Row */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-2.5 justify-between">
          {/* Left: Compact Search Bar */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              id="catalog-search-input"
              value={filterState.searchQuery}
              onChange={(event) => onFilterChange({ searchQuery: event.target.value })}
              placeholder="Cari chiller, kompor, meja stainless..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50/80 py-1.5 pl-8 pr-8 text-xs text-slate-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100 placeholder:text-slate-400"
              aria-label="Cari unit di katalog BBKitchen"
            />
            {filterState.searchQuery && (
              <button
                type="button"
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Hapus pencarian katalog"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Middle: Horizontal Scrollable Category Pills */}
          <div className="relative flex-1 min-w-0 flex items-center">
            {/* Left Scroll Trigger (Desktop) */}
            <button
              type="button"
              onClick={scrollLeft}
              className="hidden lg:flex shrink-0 items-center justify-center w-6 h-6 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs mr-1 z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth py-0.5 w-full"
            >
              {/* Pill 'Semua' */}
              <button
                type="button"
                id="cat-btn-semua"
                onClick={() => onFilterChange({ category: 'Semua' as EquipmentCategory })}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  filterState.category === 'Semua'
                    ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Semua</span>
              </button>

              {/* Category Pills */}
              {visibleCategories.map((category) => {
                const isActive = activeTopLevelCategory?.id === category.id && filterState.category !== 'Semua';
                return (
                  <button
                    key={category.id}
                    type="button"
                    id={`cat-btn-${category.name.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => onFilterChange({ category: category.name as EquipmentCategory })}
                    className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      isActive
                        ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span className={isActive ? 'text-amber-400' : 'text-slate-500'}>
                      {getCategoryIcon(category.icon)}
                    </span>
                    <span className="whitespace-nowrap">{category.name}</span>
                    {isActive && subcategories.length > 0 && <ChevronDown className="w-3 h-3 text-amber-400" />}
                  </button>
                );
              })}
            </div>

            {/* Right Scroll Trigger (Desktop) */}
            <button
              type="button"
              onClick={scrollRight}
              className="hidden lg:flex shrink-0 items-center justify-center w-6 h-6 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs ml-1 z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Compact Filter Controls */}
          <div className="flex items-center gap-2 shrink-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {/* Condition Toggle */}
            <div className="flex items-center rounded-lg border border-slate-300 bg-white overflow-hidden shrink-0">
              {['Semua', 'Bekas', 'Baru'].map((condLabel) => {
                const actualValue = condLabel === 'Semua' ? 'Semua Kondisi' : condLabel;
                const active = filterState.condition === actualValue;
                return (
                  <button
                    key={condLabel}
                    type="button"
                    onClick={() => onFilterChange({ condition: actualValue })}
                    className={`px-2 py-1 text-[11px] font-semibold whitespace-nowrap transition-colors ${
                      active ? 'bg-slate-900 text-amber-400' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {condLabel}
                  </button>
                );
              })}
            </div>

            {/* Location Select */}
            <select
              id="filter-location-select"
              value={filterState.location}
              onChange={(e) => onFilterChange({ location: e.target.value })}
              className="text-[11px] bg-white border border-slate-300 text-slate-800 rounded-lg px-2 py-1 focus:outline-none focus:border-amber-500 font-medium shrink-0"
            >
              <option value="Semua Lokasi">Semua Lokasi</option>
              {locationValues.map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>

            {/* Sort Select */}
            <select
              id="filter-sort-select"
              value={filterState.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="text-[11px] bg-white border border-slate-300 text-slate-800 rounded-lg px-2 py-1 focus:outline-none focus:border-amber-500 font-medium shrink-0"
            >
              <option value="latest">Terbaru</option>
              <option value="price_low">Termurah</option>
              <option value="price_high">Tertinggi</option>
            </select>

            {/* Reset Button */}
            {isFiltered && (
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 px-2 py-1 text-[11px] text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg font-medium shrink-0"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}

            {/* Live Count Pill */}
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-1 rounded-lg shrink-0 whitespace-nowrap">
              <strong className="text-slate-900 font-black">{totalResultsCount}</strong> Unit
            </span>
          </div>
        </div>

        {/* Subcategories Micro-Strip (If Selected Category Has Children) */}
        {subcategories.length > 0 && activeTopLevelCategory && filterState.category !== 'Semua' && (
          <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pt-1 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
              {activeTopLevelCategory.name}:
            </span>
            <button
              type="button"
              onClick={() => onFilterChange({ category: activeTopLevelCategory.name as EquipmentCategory })}
              className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-bold transition-colors ${
                filterState.category === activeTopLevelCategory.name
                  ? 'border-slate-900 bg-slate-900 text-amber-400'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              Semua Sub-Kategori
            </button>
            {subcategories.map((sub) => {
              const isSubActive = filterState.category === sub.name;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => onFilterChange({ category: sub.name as EquipmentCategory })}
                  className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-bold transition-colors ${
                    isSubActive
                      ? 'border-slate-900 bg-slate-900 text-amber-400'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {sub.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
