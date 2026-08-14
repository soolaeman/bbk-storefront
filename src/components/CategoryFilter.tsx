import React from 'react';
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
  ChevronDown,
} from 'lucide-react';
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
    case 'Flame':
      return <Flame className="w-4 h-4" />;
    case 'Utensils':
      return <Utensils className="w-4 h-4" />;
    case 'Layers':
      return <Layers className="w-4 h-4" />;
    case 'Snowflake':
      return <Snowflake className="w-4 h-4" />;
    case 'Maximize2':
      return <Maximize2 className="w-4 h-4" />;
    case 'Table':
      return <Table className="w-4 h-4" />;
    case 'Wind':
      return <Wind className="w-4 h-4" />;
    case 'Cpu':
      return <Cpu className="w-4 h-4" />;
    case 'Coffee':
      return <Coffee className="w-4 h-4" />;
    case 'Droplets':
      return <Droplets className="w-4 h-4" />;
    default:
      return <LayoutGrid className="w-4 h-4" />;
  }
};

const normalizeOptions = (options: string[] | undefined, currentValue: string) => {
  const unique = Array.from(
    new Set((options ?? []).map((option) => option.trim()).filter(Boolean)),
  );

  if (currentValue && !unique.includes(currentValue)) {
    unique.unshift(currentValue);
  }

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
  powerTypeOptions = [],
}) => {
  const visibleCategories = categories.filter((category) => {
    if (category.name === 'Semua') return true;
    return category.count !== undefined || (categoryCounts[category.name] || 0) > 0;
  });

  const conditionValues = normalizeOptions(conditionOptions, filterState.condition);
  const locationValues = normalizeOptions(locationOptions, filterState.location);
  const powerTypeValues = normalizeOptions(powerTypeOptions, filterState.powerType);

  const isFiltered =
    filterState.category !== 'Semua' ||
    filterState.condition !== 'Semua Kondisi' ||
    filterState.location !== 'Semua Lokasi' ||
    filterState.powerType !== 'Semua Sumber Daya' ||
    filterState.statusFilter !== 'READY_ONLY' ||
    filterState.searchQuery !== '';

  const renderOptionList = (values: string[], emptyLabel: string) => {
    if (values.length === 0) {
      return <option value="">{emptyLabel}</option>;
    }

    return values.map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ));
  };

  return (
    <section className="bg-white border-b border-slate-200 py-6 px-4">
      <div className="max-w-7xl mx-auto space-y-5">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-600" />
              <span>Kategori Peralatan Dapur Komersial</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Menampilkan <strong className="text-slate-900">{totalResultsCount}</strong> unit cocok
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <button
              type="button"
              id="cat-btn-semua"
              onClick={() => onFilterChange({ category: 'Semua' as EquipmentCategory })}
              className={`shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                filterState.category === 'Semua'
                  ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Semua</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-600">
                {totalResultsCount}
              </span>
            </button>

            {visibleCategories.map((category) => {
              const count = category.count ?? categoryCounts[category.name] ?? 0;
              const isActive = filterState.category === category.name;

              return (
                <button
                  key={category.id}
                  type="button"
                  id={`cat-btn-${category.name.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() =>
                    onFilterChange({
                      category: category.name as EquipmentCategory,
                    })
                  }
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                    isActive
                      ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className={isActive ? 'text-amber-400' : 'text-slate-500'}>
                    {getCategoryIcon(category.icon)}
                  </span>
                  <span>{category.name}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-amber-400/20 text-amber-300'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                  {category.children && category.children.length > 0 && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <select
                id="filter-condition-select"
                value={filterState.condition}
                onChange={(e) => onFilterChange({ condition: e.target.value })}
                className="text-xs bg-white border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:border-amber-500 font-medium"
              >
                <option value="Semua Kondisi">Semua Kondisi</option>
                {renderOptionList(conditionValues, 'Kondisi belum tersedia')}
              </select>
            </div>

            <div className="relative">
              <select
                id="filter-location-select"
                value={filterState.location}
                onChange={(e) => onFilterChange({ location: e.target.value })}
                className="text-xs bg-white border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:border-amber-500 font-medium"
              >
                <option value="Semua Lokasi">Semua Lokasi</option>
                {renderOptionList(locationValues, 'Lokasi belum tersedia')}
              </select>
            </div>

            <div className="relative">
              <select
                id="filter-powertype-select"
                value={filterState.powerType}
                onChange={(e) => onFilterChange({ powerType: e.target.value })}
                className="text-xs bg-white border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:border-amber-500 font-medium"
              >
                <option value="Semua Sumber Daya">Semua Sumber Daya</option>
                {renderOptionList(powerTypeValues, 'Sumber daya belum tersedia')}
              </select>
            </div>

            <div className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5 text-xs font-medium">
              <button
                type="button"
                id="filter-status-ready"
                onClick={() => onFilterChange({ statusFilter: 'READY_ONLY' })}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterState.statusFilter === 'READY_ONLY'
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hanya Ready
              </button>
              <button
                type="button"
                id="filter-status-all"
                onClick={() => onFilterChange({ statusFilter: 'ALL' })}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterState.statusFilter === 'ALL'
                    ? 'bg-slate-800 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua Unit
              </button>
              <button
                type="button"
                id="filter-status-sold"
                onClick={() => onFilterChange({ statusFilter: 'INCLUDE_SOLD' })}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterState.statusFilter === 'INCLUDE_SOLD'
                    ? 'bg-slate-700 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Unit Terjual / Archive
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span>Urutkan:</span>
              <select
                id="filter-sort-select"
                value={filterState.sortBy}
                onChange={(e) =>
                  onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })
                }
                className="text-xs bg-white border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 font-medium"
              >
                <option value="latest">Terbaru Ditambahkan</option>
                <option value="price_low">Harga Terendah</option>
                <option value="price_high">Harga Tertinggi</option>
                <option value="condition">Kondisi Tertinggi</option>
              </select>
            </div>

            {isFiltered && (
              <button
                type="button"
                id="filter-reset-btn"
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
