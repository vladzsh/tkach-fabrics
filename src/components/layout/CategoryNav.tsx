"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./CategoryNav.module.css";

const links = [
  { label: "All Fabrics", href: "/catalog" },
  { label: "Cotton", href: "/catalog/cotton" },
  { label: "Linen", href: "/catalog/linen" },
  { label: "Silk", href: "/catalog/silk" },
  { label: "Polyester", href: "/catalog/polyester" },
  { label: "Wool", href: "/catalog/wool" },
  { label: "Blends", href: "/catalog/blends" },
  { label: "New Arrivals", href: "/catalog/new-arrivals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function CategoryNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/catalog") {
      return pathname === "/catalog";
    }
    return pathname.startsWith(href);
  }

  return (
    <nav className={styles.nav} aria-label="Category navigation">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={isActive(link.href) ? styles.active : styles.link}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
