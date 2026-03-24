import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact — Tkach Fabrics',
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <Breadcrumbs items={[{ label: 'Contact' }]} />

        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            marginTop: '16px',
            marginBottom: '24px',
          }}
        >
          Get in Touch
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
