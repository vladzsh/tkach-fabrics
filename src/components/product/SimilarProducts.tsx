"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/catalog/ProductCard";
import type { Product } from "@/data/types";
import styles from "./SimilarProducts.module.css";

interface SimilarProductsProps {
  products: Product[];
}

export default function SimilarProducts({ products }: SimilarProductsProps) {
  const t = useTranslations("ProductInfo");
  const scrollRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth ?? 260;
    const distance = cardWidth + 16; // card width + gap
    scrollRef.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t("similarProducts")}</h2>
        <div className={styles.arrows}>
          <button
            className={styles.arrow}
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className={styles.arrow}
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className={styles.carousel} ref={scrollRef}>
        {products.map((product) => (
          <div key={product.slug} className={styles.card}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
