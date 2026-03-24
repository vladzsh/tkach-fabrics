"use client";

import { useState } from "react";
import {useTranslations} from 'next-intl';
import { MessageCircle, Phone } from "lucide-react";
import { contacts } from "@/data/config";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import styles from "./ContactCta.module.css";

export function ContactCta() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('ContactCta');

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2 className={styles.headline}>{t('headline')}</h2>
        <p className={styles.subtext}>
          {t('subtext')}
        </p>
        <Button variant="primary" onClick={() => setOpen(true)}>
          {t('button')}
        </Button>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title={t('modalTitle')}>
        <div className={styles.channels}>
          <a
            href={`https://t.me/${contacts.telegram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.channel}
          >
            <div className={`${styles.channelIcon} ${styles.telegram}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm5.654 7.322L15.2 18.39c-.207.94-.77.94-1.24.58l-3.43-2.527-1.655 1.593c-.183.183-.337.337-.69.337l.246-3.494 6.348-5.735c.276-.246-.06-.382-.428-.137l-7.846 4.94-3.378-1.056c-.735-.23-.75-.735.153-1.088l13.2-5.088c.613-.23 1.148.137.95 1.088z" />
              </svg>
            </div>
            <div>
              <div className={styles.channelName}>Telegram</div>
              <div className={styles.channelValue}>{contacts.telegram}</div>
            </div>
          </a>

          <a
            href={`https://wa.me/${contacts.whatsapp.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.channel}
          >
            <div className={`${styles.channelIcon} ${styles.whatsapp}`}>
              <MessageCircle size={18} color="#fff" />
            </div>
            <div>
              <div className={styles.channelName}>WhatsApp</div>
              <div className={styles.channelValue}>{contacts.whatsapp}</div>
            </div>
          </a>

          <a
            href={`viber://chat?number=${contacts.viber.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.channel}
          >
            <div className={`${styles.channelIcon} ${styles.viber}`}>
              <Phone size={18} color="#fff" />
            </div>
            <div>
              <div className={styles.channelName}>Viber</div>
              <div className={styles.channelValue}>{contacts.viber}</div>
            </div>
          </a>

          <div className={styles.divider} />

          <div className={styles.phonesSection}>
            <div className={styles.phonesLabel}>{t('phoneNumbers')}</div>
            {contacts.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className={styles.phoneLink}
              >
                <Phone size={16} className={styles.phoneIcon} />
                {phone}
              </a>
            ))}
          </div>
        </div>
      </Modal>
    </section>
  );
}
