"use client";

import Link from "next/link";
import WishlistButton from "@/components/ui/WishlistButton";
import type { Product } from "@/data/types";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const bgColor = product.colors[0]?.hex ?? "#e8e8e8";
  const firstColorName = product.colors[0]?.name ?? "";

  return (
    <Link href={`/product/${product.slug}`} className={styles.card}>
      <div className={styles.image} style={{ backgroundColor: bgColor }}>
        <div
          className={styles.wishlist}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <WishlistButton slug={product.slug} size={20} />
        </div>
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.meta}>
          {product.composition}
          {firstColorName ? ` | ${firstColorName}` : ""}
        </p>
        <div className={styles.row}>
          <span className={styles.price}>
            ${product.pricePerRoll}/roll
          </span>
          <span className={styles.minOrder}>
            Min: {product.minOrder} roll{product.minOrder !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </Link>
  );
}
