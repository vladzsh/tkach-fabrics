import Button from "@/components/ui/Button";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/hero.jpg" alt="" className={styles.heroBg} />
      <div className={styles.content}>
        <p className={styles.subtitle}>WHOLESALE FABRICS</p>
        <h1 className={styles.headline}>Premium Fabrics for Your Production</h1>
        <p className={styles.subtext}>
          Quality materials by the roll. Cotton, linen, silk, and more for
          garment manufacturers and ateliers.
        </p>
        <div className={styles.ctas}>
          <Button variant="primary" href="/catalog">
            Browse Catalog
          </Button>
          <Button variant="outline" href="/contact" className={styles.outlineWhite}>
            Request Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
