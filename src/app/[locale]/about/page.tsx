import type { Metadata } from 'next';
import { CheckCircle, Clock, Truck } from 'lucide-react';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import styles from './page.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
  return {
    title: t('aboutTitle'),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'About'});

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <Breadcrumbs items={[{ label: t('title') }]} />

        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            marginTop: '16px',
            marginBottom: '24px',
          }}
        >
          {t('title')}
        </h1>

        <div className={styles.heroImage}>
          <span style={{ color: '#bbb', fontSize: '14px' }}>Company / warehouse photo</span>
        </div>

        <p
          style={{
            fontSize: '15px',
            color: 'var(--color-text-muted)',
            lineHeight: 1.7,
          }}
        >
          {t('story')}
        </p>

        <div className={styles.values}>
          <div className={styles.valueCard}>
            <div className={styles.iconCircle}>
              <CheckCircle size={20} color="white" />
            </div>
            <div className={styles.cardTitle}>{t('qualityTitle')}</div>
            <div className={styles.cardDesc}>{t('qualityDesc')}</div>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.iconCircle}>
              <Clock size={20} color="white" />
            </div>
            <div className={styles.cardTitle}>{t('responseTitle')}</div>
            <div className={styles.cardDesc}>{t('responseDesc')}</div>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.iconCircle}>
              <Truck size={20} color="white" />
            </div>
            <div className={styles.cardTitle}>{t('shippingTitle')}</div>
            <div className={styles.cardDesc}>{t('shippingDesc')}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
