import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProductsByCategory,
  getNewArrivals,
  getAllColors,
  getAllCompositions,
  getPriceRange,
} from "@/data/products";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { CatalogClient } from "@/components/catalog/CatalogClient";

const VALID_CATEGORIES = [
  "cotton",
  "linen",
  "silk",
  "polyester",
  "wool",
  "blends",
] as const;

type ValidCategory = (typeof VALID_CATEGORIES)[number];

function getCategoryName(slug: string): string {
  const map: Record<string, string> = {
    cotton: "Cotton",
    linen: "Linen",
    silk: "Silk",
    polyester: "Polyester",
    wool: "Wool",
    blends: "Blends",
    "new-arrivals": "New Arrivals",
  };
  return map[slug] ?? slug;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const name = getCategoryName(category);
  return { title: `${name} — Tkach Fabrics` };
}

export default async function CategoryCatalogPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  let products;
  let categoryName: string;

  if (category === "new-arrivals") {
    products = getNewArrivals();
    categoryName = "New Arrivals";
  } else if ((VALID_CATEGORIES as readonly string[]).includes(category)) {
    products = getProductsByCategory(category);
    categoryName = getCategoryName(category);
  } else {
    notFound();
  }

  return (
    <main style={{ padding: "0 32px 40px", background: "var(--color-bg)" }}>
      <Breadcrumbs
        items={[
          { label: "All Fabrics", href: "/catalog" },
          { label: categoryName },
        ]}
      />
      <h1
        style={{ fontSize: 20, fontWeight: 700, color: "var(--color-primary)" }}
      >
        {categoryName}
      </h1>
      <p
        style={{
          fontSize: 13,
          color: "var(--color-text-secondary)",
          marginTop: 4,
          marginBottom: 16,
        }}
      >
        {products.length} products
      </p>
      <CatalogClient
        initialProducts={products}
        categoryName={categoryName}
        allColors={getAllColors()}
        allCompositions={getAllCompositions()}
        priceRange={getPriceRange()}
      />
    </main>
  );
}
