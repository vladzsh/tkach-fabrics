"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import styles from "./CatalogFlyout.module.css";

const categories = [
  { label: "All Fabrics", href: "/catalog" },
  { label: "Cotton", href: "/catalog/cotton" },
  { label: "Linen", href: "/catalog/linen" },
  { label: "Silk", href: "/catalog/silk" },
  { label: "Polyester", href: "/catalog/polyester" },
  { label: "Wool", href: "/catalog/wool" },
  { label: "Blends", href: "/catalog/blends" },
  { label: "New Arrivals", href: "/catalog/new-arrivals" },
];

export default function CatalogFlyout() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={styles.container}>
      <button
        className={styles.button}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <LayoutGrid size={16} />
        <span>Catalog</span>
      </button>

      {open && (
        <div className={styles.dropdown} role="menu">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={styles.item}
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
