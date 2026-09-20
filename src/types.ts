export type EquipmentCategory = 
  | 'Semua'
  | 'Chiller'
  | 'Freezer'
  | 'Kompor'
  | 'Meja Stainless'
  | 'Rak Stainless'
  | 'Sink Stainless'
  | 'Hood Stainless'
  | 'Showcase'
  | 'Ice System'
  | 'Peralatan Dapur Bekas Lainnya'
  | string;

export type ProductCondition = 'Bekas' | 'Baru';

export type AvailabilityStatus = 'READY' | 'SOLD';

export interface Product {
  id: string;
  slug?: string;
  sku: string;
  name: string;
  category: EquipmentCategory;
  brand: string;
  price: number | null; // null represents empty price state (Hubungi Admin / Call for Price)
  originalPriceEstimate?: number | null;
  estimatedNewPrice?: number | null;
  displayPriceLow?: number | null;
  displayPriceHigh?: number | null;
  status: AvailabilityStatus;
  condition: ProductCondition;
  conditionRating: number; // e.g. 8.5 / 10
  location: string; // e.g. 'Jakarta Barat', 'Tangerang', 'Bekasi'
  powerType: 'Gas' | 'Listrik' | 'Manual / Tanpa Daya' | 'Gas & Listrik';
  powerWattage?: string; // e.g. "1.500 W" or "LPG High Pressure"
  dimensions?: string; // e.g. "120 x 80 x 85 cm"
  material?: string; // e.g. "Stainless Steel 304 / 201"
  summary: string;
  description: string;
  testedFunctions: string[];
  images: string[];
  dateAdded: string;
  previousUsage?: string; // e.g. "Ex-resto Jepang 1 tahun operasional"
  adminInternalNotes?: string; // Admin only note
  adminTelegramRef?: string; // Admin only reference (never exposed to public)
  featured?: boolean;
}

export interface FilterState {
  searchQuery: string;
  category: EquipmentCategory;
  condition: string;
  location: string;
  powerType: string;
  statusFilter: 'ALL' | 'READY_ONLY' | 'INCLUDE_SOLD';
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: 'latest' | 'price_low' | 'price_high' | 'condition';
}
