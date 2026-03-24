"use client";

import styles from "./ColorSwatches.module.css";

interface Color {
  name: string;
  hex: string;
}

interface ColorSwatchesProps {
  colors: Color[];
  selected: string | null;
  onChange: (colorName: string) => void;
}

export default function ColorSwatches({ colors, selected, onChange }: ColorSwatchesProps) {
  return (
    <div className={styles.swatches} role="group" aria-label="Select color">
      {colors.map((color) => (
        <button
          key={color.name}
          className={`${styles.swatch} ${selected === color.name ? styles.swatchSelected : ""}`}
          style={{ backgroundColor: color.hex }}
          onClick={() => onChange(color.name)}
          aria-label={color.name}
          aria-pressed={selected === color.name}
          title={color.name}
        />
      ))}
    </div>
  );
}
