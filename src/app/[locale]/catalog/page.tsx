import { Metadata } from "next";
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {
  getProducts,
  getAllColors,
  getAllCompositions,
  getPriceRange,
} from "@/data/products";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { CatalogClient } from "@/components/catalog/CatalogClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
  return { title: t('catalogTitle') };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'Categories'});
  const tCatalog = await getTranslations({locale, namespace: 'Catalog'});
  const products = getProducts();

  return (
    <main style={{ padding: "0 32px 40px", background: "var(--color-bg)" }}>
      <Breadcrumbs items={[{ label: t('allFabrics') }]} />
      <h1
        style={{ fontSize: 20, fontWeight: 700, color: "var(--color-primary)" }}
      >
        {t('allFabrics')}
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
        categoryName={t('allFabrics')}
        allColors={getAllColors()}
        allCompositions={getAllCompositions()}
        priceRange={getPriceRange()}
      />
    </main>
  );
}
