import { Product, Category, ProductFilters } from "./types";
import productsData from "./products.json";
import categoriesData from "./categories.json";

const products: Product[] = productsData as Product[];
const categories: Category[] = categoriesData as Category[];

export function getProducts(filters?: ProductFilters): Product[] {
  let result = [...products];

  if (filters?.colors?.length) {
    result = result.filter((p) =>
      p.colors.some((c) => filters.colors!.includes(c.name))
    );
  }

  if (filters?.compositions?.length) {
    result = result.filter((p) =>
      filters.compositions!.includes(p.composition)
    );
  }

  if (filters?.priceMin !== undefined) {
    result = result.filter((p) => p.pricePerRoll >= filters.priceMin!);
  }

  if (filters?.priceMax !== undefined) {
    result = result.filter((p) => p.pricePerRoll <= filters.priceMax!);
  }

  if (filters?.minOrders?.length) {
    result = result.filter((p) => filters.minOrders!.includes(p.minOrder));
  }

  if (filters?.sortBy) {
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.pricePerRoll - b.pricePerRoll);
        break;
      case "price-desc":
        result.sort((a, b) => b.pricePerRoll - a.pricePerRoll);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }
  }

  return result;
}

export function getProductBySlug(slug: string): Product | null {
  return products.find((p) => p.slug === slug) ?? null;
}

export function getCategories(): Category[] {
  return categories;
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getAllCompositions(): string[] {
  return [...new Set(products.map((p) => p.composition))].sort();
}

export function getAllColors(): { name: string; hex: string }[] {
  const seen = new Map<string, string>();
  products.forEach((p) =>
    p.colors.forEach((c) => {
      if (!seen.has(c.name)) seen.set(c.name, c.hex);
    })
  );
  return [...seen.entries()].map(([name, hex]) => ({ name, hex }));
}

export function getPriceRange(): { min: number; max: number } {
  const prices = products.map((p) => p.pricePerRoll);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.composition.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.colors.some((c) => c.name.toLowerCase().includes(q))
  );
}

export function getSimilarProducts(slug: string, limit = 6): Product[] {
  const product = products.find((p) => p.slug === slug);
  if (!product) return [];
  return products
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, limit);
}
