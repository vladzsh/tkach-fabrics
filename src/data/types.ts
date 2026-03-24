export interface ProductColor {
  name: string;
  hex: string;
}

export type CategorySlug =
  | "cotton"
  | "linen"
  | "silk"
  | "polyester"
  | "wool"
  | "blends";

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  composition: string;
  colors: ProductColor[];
  pricePerRoll: number;
  minOrder: number;
  images: string[];
  isNew: boolean;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  productCount: number;
  thumbnail: string;
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "name-asc";

export interface ProductFilters {
  colors?: string[];
  compositions?: string[];
  priceMin?: number;
  priceMax?: number;
  minOrders?: number[];
  sortBy?: SortOption;
}
