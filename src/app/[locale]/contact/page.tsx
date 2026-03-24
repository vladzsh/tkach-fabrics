import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import styles from './page.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
  return {
    title: t('contactTitle'),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'Contact'});

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

        <div className={styles.columns}>
          <div className={styles.formColumn}>
            <ContactForm />
          </div>
          <div className={styles.infoColumn}>
            <ContactInfo />
          </div>
        </div>

        <div className={styles.map}>
          <MapPin size={32} color="#bbb" />
          <span style={{ fontSize: '14px', color: '#bbb' }}>Embedded Google Map</span>
        </div>
      </div>
    </main>
  );
}
