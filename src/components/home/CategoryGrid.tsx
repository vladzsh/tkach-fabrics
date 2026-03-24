"use client";

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import { getCategories } from "@/data/products";
import styles from "./CategoryGrid.module.css";

export function CategoryGrid() {
  const t = useTranslations('CategoryGrid');
  const categories = getCategories();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{t('title')}</h2>
      <div className={styles.grid}>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/catalog/${category.slug}`}
            className={styles.card}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={category.thumbnail}
              alt={category.name}
              className={styles.thumbnail}
            />
            <span className={styles.name}>{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
