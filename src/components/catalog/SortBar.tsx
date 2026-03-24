"use client";

import {useTranslations} from 'next-intl';
import { Grid2x2, Grid3x3, LayoutGrid } from "lucide-react";
import Dropdown from "@/components/ui/Dropdown";
import styles from "./SortBar.module.css";

type SortBarProps = {
  gridCols: 4 | 5 | 6;
  onGridChange: (cols: 4 | 5 | 6) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
};

export default function SortBar({
  gridCols,
  onGridChange,
  sortBy,
  onSortChange,
}: SortBarProps) {
  const t = useTranslations('Catalog');

  const SORT_OPTIONS = [
    { value: "newest", label: t('sortNewest') },
    { value: "price-asc", label: t('sortPriceAsc') },
    { value: "price-desc", label: t('sortPriceDesc') },
    { value: "name-asc", label: t('sortName') },
  ];

  return (
    <div className={styles.bar}>
      <div className={styles.gridToggle}>
        <button
          className={`${styles.gridBtn} ${gridCols === 4 ? styles.active : ""}`}
          onClick={() => onGridChange(4)}
          aria-label="4 column grid"
          title="4 columns"
        >
          <Grid2x2 size={14} />
        </button>
        <button
          className={`${styles.gridBtn} ${gridCols === 5 ? styles.active : ""}`}
          onClick={() => onGridChange(5)}
          aria-label="5 column grid"
          title="5 columns"
        >
          <Grid3x3 size={14} />
        </button>
        <button
          className={`${styles.gridBtn} ${gridCols === 6 ? styles.active : ""}`}
          onClick={() => onGridChange(6)}
          aria-label="6 column grid"
          title="6 columns"
        >
          <LayoutGrid size={14} />
        </button>
      </div>
      <Dropdown
        options={SORT_OPTIONS}
        value={sortBy}
        onChange={onSortChange}
        placeholder="Sort by..."
      />
    </div>
  );
}
