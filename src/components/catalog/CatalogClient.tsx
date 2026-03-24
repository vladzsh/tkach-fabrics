"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useCallback, useMemo, Suspense } from "react";
import type { Product, ProductFilters, SortOption } from "@/data/types";
import SortBar from "@/components/catalog/SortBar";
import FilterSidebar from "@/components/catalog/FilterSidebar";
import FilterBottomSheet from "@/components/catalog/FilterBottomSheet";
import ProductCard from "@/components/catalog/ProductCard";
import Pagination from "@/components/catalog/Pagination";
import styles from "./CatalogClient.module.css";

const ITEMS_PER_PAGE = 12;

interface CatalogClientProps {
  initialProducts: Product[];
  categoryName: string;
  allColors: { name: string; hex: string }[];
  allCompositions: string[];
  priceRange: { min: number; max: number };
}

function parseFiltersFromParams(params: URLSearchParams): ProductFilters {
  const filters: ProductFilters = {};

  const colors = params.getAll("color");
  if (colors.length) filters.colors = colors;

  const compositions = params.getAll("composition");
  if (compositions.length) filters.compositions = compositions;

  const priceMin = params.get("priceMin");
  if (priceMin !== null) filters.priceMin = Number(priceMin);

  const priceMax = params.get("priceMax");
  if (priceMax !== null) filters.priceMax = Number(priceMax);

  const minOrders = params.getAll("minOrder").map(Number);
  if (minOrders.length) filters.minOrders = minOrders;

  const sortBy = params.get("sortBy");
  if (sortBy) filters.sortBy = sortBy as SortOption;

  return filters;
}

function filtersToParams(filters: ProductFilters, page: number): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.colors?.length) {
    filters.colors.forEach((c) => params.append("color", c));
  }
  if (filters.compositions?.length) {
    filters.compositions.forEach((c) => params.append("composition", c));
  }
  if (filters.priceMin !== undefined) {
    params.set("priceMin", String(filters.priceMin));
  }
  if (filters.priceMax !== undefined) {
    params.set("priceMax", String(filters.priceMax));
  }
  if (filters.minOrders?.length) {
    filters.minOrders.forEach((m) => params.append("minOrder", String(m)));
  }
  if (filters.sortBy) {
    params.set("sortBy", filters.sortBy);
  }
  if (page > 1) {
    params.set("page", String(page));
  }

  return params;
}

function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  let result = [...products];

  if (filters.colors?.length) {
    result = result.filter((p) =>
      p.colors.some((c) => filters.colors!.includes(c.name))
    );
  }

  if (filters.compositions?.length) {
    result = result.filter((p) =>
      filters.compositions!.includes(p.composition)
    );
  }

  if (filters.priceMin !== undefined) {
    result = result.filter((p) => p.pricePerRoll >= filters.priceMin!);
  }

  if (filters.priceMax !== undefined) {
    result = result.filter((p) => p.pricePerRoll <= filters.priceMax!);
  }

  if (filters.minOrders?.length) {
    result = result.filter((p) => filters.minOrders!.includes(p.minOrder));
  }

  if (filters.sortBy) {
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

function CatalogClientInner({
  initialProducts,
  allColors,
  allCompositions,
  priceRange,
}: Omit<CatalogClientProps, "categoryName">) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<ProductFilters>(() =>
    parseFiltersFromParams(searchParams)
  );
  const [gridCols, setGridCols] = useState<2 | 3>(3);
  const currentPage = Number(searchParams.get("page")) || 1;
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  const filteredProducts = useMemo(
    () => applyFilters(initialProducts, filters),
    [initialProducts, filters]
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pagedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const syncToUrl = useCallback(
    (newFilters: ProductFilters, newPage: number) => {
      const params = filtersToParams(newFilters, newPage);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    },
    [router, pathname]
  );

  const handleFiltersChange = useCallback(
    (newFilters: ProductFilters) => {
      setFilters(newFilters);
      syncToUrl(newFilters, 1);
    },
    [syncToUrl]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      const newFilters = { ...filters, sortBy: value as SortOption };
      setFilters(newFilters);
      syncToUrl(newFilters, 1);
    },
    [filters, syncToUrl]
  );

  const paginationSearchParams = new URLSearchParams(searchParams.toString());
  paginationSearchParams.delete("page");

  return (
    <div className={styles.layout}>
      {/* Desktop filter sidebar */}
      <div className={styles.desktopOnly}>
        <FilterSidebar
          filters={filters}
          onChange={handleFiltersChange}
          allColors={allColors}
          allCompositions={allCompositions}
          priceRange={priceRange}
        />
      </div>

      <div className={styles.main}>
        <div className={styles.topBar}>
          {/* Mobile filter trigger (shown below 1280px) */}
          <FilterBottomSheet
            filters={filters}
            onChange={handleFiltersChange}
            allColors={allColors}
            allCompositions={allCompositions}
            priceRange={priceRange}
            isOpen={filterSheetOpen}
            onClose={() => setFilterSheetOpen(false)}
            onOpen={() => setFilterSheetOpen(true)}
          />

          <SortBar
            gridCols={gridCols}
            onGridChange={setGridCols}
            sortBy={filters.sortBy ?? "newest"}
            onSortChange={handleSortChange}
          />
        </div>

        {filteredProducts.length === 0 ? (
          <p className={styles.empty}>No products match your filters.</p>
        ) : (
          <>
            <div
              className={`${styles.grid} ${
                gridCols === 3 ? styles.cols3 : styles.cols2
              }`}
            >
              {pagedProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>

            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              basePath={pathname}
              searchParams={paginationSearchParams}
            />
          </>
        )}
      </div>
    </div>
  );
}

export function CatalogClient(props: CatalogClientProps) {
  const { initialProducts, allColors, allCompositions, priceRange } = props;
  return (
    <Suspense fallback={<div className={styles.empty}>Loading...</div>}>
      <CatalogClientInner
        initialProducts={initialProducts}
        allColors={allColors}
        allCompositions={allCompositions}
        priceRange={priceRange}
      />
    </Suspense>
  );
}
