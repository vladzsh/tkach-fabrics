"use client";

import { useState } from "react";
import {useTranslations} from 'next-intl';
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
  const t = useTranslations('ProductInfo');

  return (
    <div className={styles.info}>
      {/* Product name */}
      <h1 className={styles.name}>{product.name}</h1>

      {/* Price */}
      <div className={styles.priceRow}>
        <span className={styles.price}>${product.pricePerRoll}</span>
        <span className={styles.priceUnit}>{t('perRoll')}</span>
      </div>

      {/* Specs grid */}
      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>{t('composition')}</span>
          <span className={styles.specValue}>{product.composition}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>{t('availableColors')}</span>
          <span className={styles.specValue}>
            <ColorSwatches
              colors={product.colors}
              selected={selectedColor}
              onChange={setSelectedColor}
            />
          </span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>{t('minOrder')}</span>
          <span className={styles.specValue}>
            {product.minOrder} {product.minOrder !== 1 ? t('rolls') : t('roll')}
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
          {t('requestQuote')}
        </Button>
        <WishlistButton slug={product.slug} />
      </div>

      {/* Info note */}
      <div className={styles.infoNote}>
        <Info size={16} className={styles.infoIcon} />
        <p className={styles.infoText}>
          {t('infoNote')}
        </p>
      </div>

      {/* Quote modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        productName={product.name}
      />

      {/* Mobile sticky CTA */}
      <div className={styles.stickyCta}>
        <Button
          variant="primary"
          onClick={() => setQuoteModalOpen(true)}
          className={styles.stickyBtn}
        >
          {t('requestQuote')}
        </Button>
      </div>
    </div>
  );
}
