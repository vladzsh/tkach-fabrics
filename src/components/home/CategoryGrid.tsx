import Link from "next/link";
import { getCategories } from "@/data/products";
import styles from "./CategoryGrid.module.css";

export function CategoryGrid() {
  const categories = getCategories();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by Material</h2>
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
