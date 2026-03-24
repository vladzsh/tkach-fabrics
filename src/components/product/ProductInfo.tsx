"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { Product } from "@/data/types";
import Button from "@/components/ui/Button";
import WishlistButton from "@/components/ui/WishlistButton";
import ColorSwatches from "./ColorSwatches";
import QuoteModal from "./QuoteModal";
import styles from "./ProductInfo.module.css";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors.length > 0 ? product.colors[0].name : null
  );
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <div className={styles.info}>
      {/* Product name */}
      <h1 className={styles.name}>{product.name}</h1>

      {/* Price */}
      <div className={styles.priceRow}>
        <span className={styles.price}>${product.pricePerRoll}</span>
        <span className={styles.priceUnit}>/ roll</span>
      </div>

      {/* Specs grid */}
      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Composition</span>
          <span className={styles.specValue}>{product.composition}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Available colors</span>
          <span className={styles.specValue}>
            <ColorSwatches
              colors={product.colors}
              selected={selectedColor}
              onChange={setSelectedColor}
            />
          </span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Min order</span>
          <span className={styles.specValue}>
            {product.minOrder} roll{product.minOrder !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <Button
          variant="primary"
          onClick={() => setQuoteModalOpen(true)}
          className={styles.quoteBtn}
        >
          Request Quote
        </Button>
        <WishlistButton slug={product.slug} />
      </div>

      {/* Info note */}
      <div className={styles.infoNote}>
        <Info size={16} className={styles.infoIcon} />
        <p className={styles.infoText}>
          Submit a quote request and we&apos;ll get back to you within 24 hours with pricing,
          availability, and shipping details.
        </p>
      </div>

      {/* Quote modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        productName={product.name}
      />
    </div>
  );
}
