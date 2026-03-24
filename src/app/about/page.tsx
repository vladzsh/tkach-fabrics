import { CheckCircle, Clock, Truck } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <Breadcrumbs items={[{ label: 'About' }]} />

        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            marginTop: '16px',
            marginBottom: '24px',
          }}
        >
          About Tkach Fabrics
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
          Tkach Fabrics has been providing premium wholesale fabrics to garment manufacturers and
          ateliers for over a decade. We source the finest materials from trusted mills around the
          world, ensuring every roll meets our quality standards.
        </p>

        <div className={styles.values}>
          <div className={styles.valueCard}>
            <div className={styles.iconCircle}>
              <CheckCircle size={20} color="white" />
            </div>
            <div className={styles.cardTitle}>Quality Fabrics</div>
            <div className={styles.cardDesc}>Carefully sourced materials from trusted mills worldwide.</div>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.iconCircle}>
              <Clock size={20} color="white" />
            </div>
            <div className={styles.cardTitle}>Fast Response</div>
            <div className={styles.cardDesc}>Quote replies within 24 hours, every time.</div>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.iconCircle}>
              <Truck size={20} color="white" />
            </div>
            <div className={styles.cardTitle}>Wholesale Shipping</div>
            <div className={styles.cardDesc}>Reliable delivery for bulk orders nationwide.</div>
          </div>
        </div>
      </div>
    </main>
  );
}
