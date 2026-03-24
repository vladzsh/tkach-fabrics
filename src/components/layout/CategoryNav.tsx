"use client";

import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import styles from "./CategoryNav.module.css";

export default function CategoryNav() {
  const pathname = usePathname();
  const tCat = useTranslations('Categories');
  const tMenu = useTranslations('Menu');

  const links = [
    { label: tCat("allFabrics"), href: "/catalog" as const },
    { label: tCat("cotton"), href: "/catalog/cotton" as const },
    { label: tCat("linen"), href: "/catalog/linen" as const },
    { label: tCat("silk"), href: "/catalog/silk" as const },
    { label: tCat("polyester"), href: "/catalog/polyester" as const },
    { label: tCat("wool"), href: "/catalog/wool" as const },
    { label: tCat("blends"), href: "/catalog/blends" as const },
    { label: tCat("newArrivals"), href: "/catalog/new-arrivals" as const },
    { label: tMenu("aboutUs"), href: "/about" as const },
    { label: tMenu("contacts"), href: "/contact" as const },
  ];

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
