"use client";

import { useState } from "react";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import { Heart, User, Menu, Search } from "lucide-react";
import SearchBar from "./SearchBar";
import CatalogFlyout from "./CatalogFlyout";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import styles from "./Header.module.css";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const t = useTranslations('Header');

  return (
    <header className={styles.header}>
      <div className={styles.headerBar}>
        {/* Hamburger + Logo + Catalog (always visible) */}
        <div className={styles.leftGroup}>
          <button
            className={styles.iconBtn}
            onClick={() => setMobileMenuOpen(true)}
            aria-label={t('openMenu')}
          >
            <Menu size={22} />
          </button>
          <Link href="/" className={styles.logo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.svg" alt="Tkach Fabrics" className={styles.logoIcon} />
            TKACH <span className={styles.accent}>FABRICS</span>
          </Link>
          <div className={styles.catalogHide}>
            <CatalogFlyout />
          </div>
        </div>

        {/* Desktop: SearchBar */}
        <div className={`${styles.desktopOnly} ${styles.centerGroup}`}>
          <SearchBar />
        </div>

        {/* Right actions (always visible) */}
        <div className={styles.rightGroup}>
          <div className={styles.desktopOnly}>
            <button className={styles.iconBtn} aria-label={t('wishlist')}>
              <Heart size={22} />
            </button>
          </div>
          <div className={styles.desktopOnly}>
            <button className={styles.iconBtn} aria-label={t('signIn')}>
              <User size={22} />
            </button>
          </div>
          <div className={styles.mobileOnly}>
            <button
              className={styles.iconBtn}
              aria-label={t('search')}
              onClick={() => setSearchOpen((prev) => !prev)}
            >
              <Search size={22} />
            </button>
          </div>
          {/* <div className={styles.mobileOnly}>
            <button className={styles.iconBtn} aria-label={t('wishlist')}>
              <Heart size={22} />
            </button>
          </div> */}
          <LanguageSwitcher />
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className={styles.mobileSearch}>
          <SearchBar onSubmit={() => setSearchOpen(false)} />
        </div>
      )}

      {/* Menu drawer */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
