"use client";

import {useTranslations} from 'next-intl';
import { Check } from "lucide-react";
import Accordion from "@/components/ui/Accordion";
import RangeSlider from "@/components/ui/RangeSlider";
import { ProductFilters } from "@/data/types";
import styles from "./FilterSidebar.module.css";

interface FilterSidebarProps {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  allColors: { name: string; hex: string }[];
  allCompositions: string[];
  priceRange: { min: number; max: number };
}

export default function FilterSidebar({
  filters,
  onChange,
  allColors,
  allCompositions,
  priceRange,
}: FilterSidebarProps) {
  const t = useTranslations('Catalog');

  const MIN_ORDER_OPTIONS = [
    { label: "1 roll", value: 1 },
    { label: "5+ rolls", value: 5 },
    { label: "10+ rolls", value: 10 },
  ];

  function toggleColor(colorName: string) {
    const current = filters.colors ?? [];
    const next = current.includes(colorName)
      ? current.filter((c) => c !== colorName)
      : [...current, colorName];
    onChange({ ...filters, colors: next });
  }

  function toggleComposition(comp: string) {
    const current = filters.compositions ?? [];
    const next = current.includes(comp)
      ? current.filter((c) => c !== comp)
      : [...current, comp];
    onChange({ ...filters, compositions: next });
  }

  function handlePriceChange(low: number, high: number) {
    onChange({ ...filters, priceMin: low, priceMax: high });
  }

  function toggleMinOrder(value: number) {
    const current = filters.minOrders ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, minOrders: next });
  }

  return (
    <aside className={styles.sidebar}>
      <Accordion title={t('filterColor')} defaultOpen>
        <div className={styles.swatches}>
          {allColors.map((color) => {
            const isSelected = (filters.colors ?? []).includes(color.name);
            return (
              <button
                key={color.name}
                className={`${styles.swatch}${isSelected ? ` ${styles.selected}` : ""}`}
                style={{ backgroundColor: color.hex }}
                onClick={() => toggleColor(color.name)}
                aria-label={color.name}
                title={color.name}
              />
            );
          })}
        </div>
      </Accordion>

      <Accordion title={t('filterComposition')} defaultOpen>
        <div>
          {allCompositions.map((comp) => {
            const isChecked = (filters.compositions ?? []).includes(comp);
            return (
              <label key={comp} className={styles.checkboxRow}>
                <span
                  className={`${styles.checkbox}${isChecked ? ` ${styles.checked}` : ""}`}
                >
                  {isChecked && <Check size={12} color="#fff" strokeWidth={3} />}
                </span>
                <span>{comp}</span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleComposition(comp)}
                  style={{ display: "none" }}
                />
              </label>
            );
          })}
        </div>
      </Accordion>

      <Accordion title={t('filterPrice')} defaultOpen>
        <RangeSlider
          min={priceRange.min}
          max={priceRange.max}
          valueLow={filters.priceMin ?? priceRange.min}
          valueHigh={filters.priceMax ?? priceRange.max}
          onChange={handlePriceChange}
        />
      </Accordion>

      <Accordion title={t('filterMinOrder')} defaultOpen>
        <div>
          {MIN_ORDER_OPTIONS.map((opt) => {
            const isChecked = (filters.minOrders ?? []).includes(opt.value);
            return (
              <label key={opt.value} className={styles.checkboxRow}>
                <span
                  className={`${styles.checkbox}${isChecked ? ` ${styles.checked}` : ""}`}
                >
                  {isChecked && <Check size={12} color="#fff" strokeWidth={3} />}
                </span>
                <span>{opt.label}</span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleMinOrder(opt.value)}
                  style={{ display: "none" }}
                />
              </label>
            );
          })}
        </div>
      </Accordion>
    </aside>
  );
}
