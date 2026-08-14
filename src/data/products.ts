/**
 * Canonical catalog contract for the Next.js frontend.
 *
 * IMPORTANT:
 * This file intentionally contains NO product records and NO mock catalog.
 * WooCommerce + live WordPress/ACF data is the single source of truth.
 */

export type ProductCategory = string;

export type ProductCondition = 'BARU' | 'BEKAS';

export type AvailabilityStatus = 'READY' | 'DP' | 'SOLD';

export type ProductPowerType = string;

export type ProductFilterState = {
  searchQuery: string;
  category: string;
  subcategory: string;
  condition: 'Semua Kondisi' | ProductCondition;
  location: string;
  powerType: string;
  statusFilter:
    | 'ALL'
    | 'READY_ONLY'
    | 'INCLUDE_DP'
    | 'INCLUDE_SOLD'
    | 'ALL_STATUS';
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: 'latest' | 'price_low' | 'price_high';
};

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  subcategory?: string;
  brand?: string;
  price: number | null;
  originalPriceEstimate?: number | null;
  status: AvailabilityStatus;
  condition: ProductCondition | '';
  location: string;
  powerType?: ProductPowerType;
  powerWattage?: string;
  dimensions?: string;
  material?: string;
  summary: string;
  description: string;
  testedFunctions: string[];
  images: string[];
  dateAdded: string;
  previousUsage?: string;
  featured?: boolean;
  adminInternalNotes?: string;
  adminTelegramRef?: string;
}

export interface ProductCategoryOption {
  id: number;
  name: string;
  slug: string;
  parentId: number;
  count: number;
  children?: ProductCategoryOption[];
}

export interface CatalogMetadata {
  total: number;
  totalPages: number;
  categories: ProductCategoryOption[];
  conditions: ProductCondition[];
  locations: string[];
  statuses: AvailabilityStatus[];
}
