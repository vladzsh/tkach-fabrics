"use client";

import { useEffect, useRef, useState } from "react";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import { LayoutGrid } from "lucide-react";
import styles from "./CatalogFlyout.module.css";

export default function CatalogFlyout() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tMenu = useTranslations('Menu');
  const tCat = useTranslations('Categories');

  const categories = [
    { label: tCat("allFabrics"), href: "/catalog" as const },
    { label: tCat("cotton"), href: "/catalog/cotton" as const },
    { label: tCat("linen"), href: "/catalog/linen" as const },
    { label: tCat("silk"), href: "/catalog/silk" as const },
    { label: tCat("polyester"), href: "/catalog/polyester" as const },
    { label: tCat("wool"), href: "/catalog/wool" as const },
    { label: tCat("blends"), href: "/catalog/blends" as const },
    { label: tCat("newArrivals"), href: "/catalog/new-arrivals" as const },
  ];

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
        <span>{tMenu('catalog')}</span>
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
