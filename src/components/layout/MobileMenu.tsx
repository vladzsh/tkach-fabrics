"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import styles from "./MobileMenu.module.css";

const catalogLinks = [
  { label: "All Fabrics", href: "/catalog" },
  { label: "Cotton", href: "/catalog/cotton" },
  { label: "Linen", href: "/catalog/linen" },
  { label: "Silk", href: "/catalog/silk" },
  { label: "Polyester", href: "/catalog/polyester" },
  { label: "Wool", href: "/catalog/wool" },
  { label: "Blends", href: "/catalog/blends" },
  { label: "New Arrivals", href: "/catalog/new-arrivals" },
];

const pageLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contacts", href: "/contact" },
  { label: "Shipping", href: "#" },
];

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
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
          <span className={styles.title}>Menu</span>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className={styles.nav}>
          <div className={styles.sectionLabel}>Pages</div>
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
          <div className={styles.sectionLabel}>Catalog</div>
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
          Sign In
        </button>
      </div>
    </div>
  );
}
