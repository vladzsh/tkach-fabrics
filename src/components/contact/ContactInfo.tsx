"use client";

import {useTranslations} from 'next-intl';
import { Mail, Phone, MapPin } from 'lucide-react';
import styles from './ContactInfo.module.css';

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function ContactInfo() {
  const t = useTranslations('ContactInfo');

  return (
    <div>
      {/* Contact Details Card */}
      <div className={styles.card}>
        <div className={styles.row}>
          <Mail size={16} color="var(--color-accent)" />
          <div>
            <div className={styles.rowLabel}>{t('email')}</div>
            <a href="mailto:info@tkachfabrics.com" className={styles.emailLink}>
              info@tkachfabrics.com
            </a>
          </div>
        </div>
        <div className={styles.row}>
          <Phone size={16} color="var(--color-accent)" />
          <div>
            <div className={styles.rowLabel}>{t('phone')}</div>
            <div className={styles.rowValue}>+1 (555) 000-0000</div>
          </div>
        </div>
        <div className={styles.row}>
          <MapPin size={16} color="var(--color-accent)" />
          <div>
            <div className={styles.rowLabel}>{t('address')}</div>
            <div className={styles.rowValue}>Your warehouse / office address</div>
          </div>
        </div>
      </div>

      {/* Messengers Card */}
      <div className={styles.card} style={{ marginTop: '16px' }}>
        <div className={styles.messengersTitle}>{t('messengers')}</div>
        <div className={styles.messengerRow}>
          <span className={styles.messengerIcon} style={{ background: '#0088cc' }} />
          <span className={styles.messengerName}>Telegram</span>
        </div>
        <div className={styles.messengerRow}>
          <span className={styles.messengerIcon} style={{ background: '#25D366' }} />
          <span className={styles.messengerName}>WhatsApp</span>
        </div>
        <div className={styles.messengerRow}>
          <span className={styles.messengerIcon} style={{ background: '#7360f2' }} />
          <span className={styles.messengerName}>Viber</span>
        </div>

        {/* Social Links */}
        <div className={styles.socialRow}>
          <button className={styles.socialBtn} aria-label="Instagram">
            <InstagramIcon />
          </button>
          <button className={styles.socialBtn} aria-label="Facebook">
            <FacebookIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
