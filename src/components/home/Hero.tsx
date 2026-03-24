"use client";

import {useTranslations} from 'next-intl';
import Button from "@/components/ui/Button";
import styles from "./Hero.module.css";

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className={styles.hero}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/hero.jpg" alt="" className={styles.heroBg} />
      <div className={styles.content}>
        <p className={styles.subtitle}>{t('subtitle')}</p>
        <h1 className={styles.headline}>{t('headline')}</h1>
        <p className={styles.subtext}>
          {t('subtext')}
        </p>
        <div className={styles.ctas}>
          <Button variant="primary" href="/catalog">
            {t('browseCatalog')}
          </Button>
          <Button variant="outline" href="/contact" className={styles.outlineWhite}>
            {t('requestQuote')}
          </Button>
        </div>
      </div>
    </section>
  );
}
