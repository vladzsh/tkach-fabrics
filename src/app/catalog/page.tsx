import { Metadata } from "next";
import {
  getProducts,
  getAllColors,
  getAllCompositions,
  getPriceRange,
} from "@/data/products";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { CatalogClient } from "@/components/catalog/CatalogClient";

export const metadata: Metadata = { title: "All Fabrics — Tkach Fabrics" };

export default function CatalogPage() {
  const products = getProducts();

  return (
    <main style={{ padding: "0 32px 40px", background: "var(--color-bg)" }}>
      <Breadcrumbs items={[{ label: "All Fabrics" }]} />
      <h1
        style={{ fontSize: 20, fontWeight: 700, color: "var(--color-primary)" }}
      >
        All Fabrics
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
        categoryName="All Fabrics"
        allColors={getAllColors()}
        allCompositions={getAllCompositions()}
        priceRange={getPriceRange()}
      />
    </main>
  );
}
