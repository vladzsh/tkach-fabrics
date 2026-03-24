import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {setRequestLocale} from 'next-intl/server';
import { getProductBySlug, getCategories, getSimilarProducts } from "@/data/products";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ImageGallery from "@/components/product/ImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import SimilarProducts from "@/components/product/SimilarProducts";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Product Not Found" };
  }
  return {
    title: `${product.name} — Tkach Fabrics`,
    description: `${product.composition} fabric. From $${product.pricePerRoll} per roll. Min order ${product.minOrder} roll(s).`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const categories = getCategories();
  const category = categories.find((c) => c.slug === product.category);
  const categoryName = category?.name ?? product.category;

  return (
    <main className={styles.page}>
      <Breadcrumbs
        items={[
          { label: categoryName, href: `/catalog/${product.category}` },
          { label: product.name },
        ]}
      />

      <div className={styles.layout}>
        <div className={styles.left}>
          <ImageGallery images={product.images} />
        </div>
        <div className={styles.right}>
          <ProductInfo product={product} />
        </div>
      </div>

      <SimilarProducts products={getSimilarProducts(slug)} />
    </main>
  );
}
