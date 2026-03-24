import { Metadata } from "next";
import { notFound } from "next/navigation";
import {setRequestLocale, getTranslations} from 'next-intl/server';
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

const CATEGORY_KEYS: Record<string, string> = {
  cotton: "cotton",
  linen: "linen",
  silk: "silk",
  polyester: "polyester",
  wool: "wool",
  blends: "blends",
  "new-arrivals": "newArrivals",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; locale: string }>;
}): Promise<Metadata> {
  const { category, locale } = await params;
  const t = await getTranslations({locale, namespace: 'Categories'});
  const key = CATEGORY_KEYS[category];
  const name = key ? t(key) : category;
  return { title: `${name} — Tkach Fabrics` };
}

export default async function CategoryCatalogPage({
  params,
}: {
  params: Promise<{ category: string; locale: string }>;
}) {
  const { category, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'Categories'});
  const tCatalog = await getTranslations({locale, namespace: 'Catalog'});

  let products;
  let categoryName: string;

  const key = CATEGORY_KEYS[category];

  if (category === "new-arrivals") {
    products = getNewArrivals();
    categoryName = t('newArrivals');
  } else if ((VALID_CATEGORIES as readonly string[]).includes(category)) {
    products = getProductsByCategory(category);
    categoryName = key ? t(key) : category;
  } else {
    notFound();
  }

  return (
    <main style={{ padding: "0 32px 40px", background: "var(--color-bg)" }}>
      <Breadcrumbs
        items={[
          { label: t('allFabrics'), href: "/catalog" },
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
        {tCatalog('products', {count: products.length})}
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
