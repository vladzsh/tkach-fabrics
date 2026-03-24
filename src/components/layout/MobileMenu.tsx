"use client";

import { useEffect } from "react";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import { X } from "lucide-react";
import styles from "./MobileMenu.module.css";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const tMenu = useTranslations('Menu');
  const tCat = useTranslations('Categories');

  const catalogLinks = [
    { label: tCat("allFabrics"), href: "/catalog" as const },
    { label: tCat("cotton"), href: "/catalog/cotton" as const },
    { label: tCat("linen"), href: "/catalog/linen" as const },
    { label: tCat("silk"), href: "/catalog/silk" as const },
    { label: tCat("polyester"), href: "/catalog/polyester" as const },
    { label: tCat("wool"), href: "/catalog/wool" as const },
    { label: tCat("blends"), href: "/catalog/blends" as const },
    { label: tCat("newArrivals"), href: "/catalog/new-arrivals" as const },
  ];

  const pageLinks = [
    { label: tMenu("aboutUs"), href: "/about" as const },
    { label: tMenu("contacts"), href: "/contact" as const },
    { label: tMenu("shipping"), href: "#" as const },
  ];

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose} aria-modal="true" role="dialog">
      <div
        className={styles.drawer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <span className={styles.title}>{tMenu('title')}</span>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={tMenu('closeMenu')}
          >
            <X size={22} />
          </button>
        </div>

        <nav className={styles.nav}>
          <div className={styles.sectionLabel}>{tMenu('pages')}</div>
          {pageLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.link}
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <hr className={styles.divider} />

        <nav className={styles.nav}>
          <div className={styles.sectionLabel}>{tMenu('catalog')}</div>
          {catalogLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.link}
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <hr className={styles.divider} />

        <button className={styles.signIn} disabled>
          {tMenu('signIn')}
        </button>
      </div>
    </div>
  );
}
