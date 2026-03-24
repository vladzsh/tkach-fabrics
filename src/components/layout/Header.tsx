"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, User, Menu, Search } from "lucide-react";
import SearchBar from "./SearchBar";
import CatalogFlyout from "./CatalogFlyout";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import styles from "./Header.module.css";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerBar}>
        {/* Hamburger + Logo + Catalog (always visible) */}
        <div className={styles.leftGroup}>
          <button
            className={styles.iconBtn}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <Link href="/" className={styles.logo}>
            TKACH <span className={styles.accent}>FABRICS</span>
          </Link>
          <CatalogFlyout />
        </div>

        {/* Desktop: SearchBar */}
        <div className={`${styles.desktopOnly} ${styles.centerGroup}`}>
          <SearchBar />
        </div>

        {/* Right actions (always visible) */}
        <div className={styles.rightGroup}>
          <div className={styles.desktopOnly}>
            <button className={styles.iconBtn} aria-label="Wishlist">
              <Heart size={22} />
            </button>
          </div>
          <div className={styles.desktopOnly}>
            <button className={styles.iconBtn} aria-label="Sign in">
              <User size={22} />
            </button>
          </div>
          <div className={styles.mobileOnly}>
            <button className={styles.iconBtn} aria-label="Search">
              <Search size={22} />
            </button>
          </div>
          <div className={styles.mobileOnly}>
            <button className={styles.iconBtn} aria-label="Wishlist">
              <Heart size={22} />
            </button>
          </div>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Menu drawer */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
