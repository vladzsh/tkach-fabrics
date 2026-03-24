"use client";

import { Grid3x3, Grid2x2 } from "lucide-react";
import Dropdown from "@/components/ui/Dropdown";
import styles from "./SortBar.module.css";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-asc", label: "Name: A → Z" },
];

type SortBarProps = {
  gridCols: 2 | 3;
  onGridChange: (cols: 2 | 3) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
};

export default function SortBar({
  gridCols,
  onGridChange,
  sortBy,
  onSortChange,
}: SortBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.gridToggle}>
        <button
          className={`${styles.gridBtn} ${gridCols === 3 ? styles.active : ""}`}
          onClick={() => onGridChange(3)}
          aria-label="3 column grid"
          title="3 columns"
        >
          <Grid3x3 size={14} />
        </button>
        <button
          className={`${styles.gridBtn} ${gridCols === 2 ? styles.active : ""}`}
          onClick={() => onGridChange(2)}
          aria-label="2 column grid"
          title="2 columns"
        >
          <Grid2x2 size={14} />
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
