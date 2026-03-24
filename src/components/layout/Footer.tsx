"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Accordion from "@/components/ui/Accordion";
import styles from "./Footer.module.css";

function TelegramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.8 2.2L1.4 10.1c-1.3.5-1.3 1.3-.2 1.6l5.2 1.6 1.9 5.9c.3.8.4.9 1.1.9.6 0 .9-.3 1.2-.6l2.9-2.8 5.9 4.4c1.1.6 1.9.3 2.1-.9l3-14.2c.4-1.5-.6-2.1-1.7-1.8z" fill="#999"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm5.2 14.2c-.2.6-1.2 1.2-1.7 1.2-.4 0-.9.1-2.9-.6-2.4-.9-4-3.3-4.1-3.4-.1-.2-.9-1.2-.9-2.3 0-1.1.6-1.7.8-1.9.2-.2.4-.3.6-.3h.4c.2 0 .4 0 .5.4.2.5.6 1.7.7 1.8.1.1.1.2 0 .4-.1.1-.1.2-.2.3l-.3.3c-.1.1-.2.2-.1.4.1.2.7 1.1 1.4 1.7.9.8 1.7 1.1 1.9 1.2.2.1.3.1.4-.1l.6-.7c.1-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.3.1.3 0 .9-.2 1.5z" fill="#999"/>
    </svg>
  );
}

function ViberIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.4 2C6.8 2.1 4 4 3.4 8.4c-.2 1.3-.2 2.5-.1 3.7.3 3 1.9 5 4.8 5.8l.1 1.6c0 .3.1.7.5.8.3.1.6 0 .8-.2l1.7-1.9h.5c1.4 0 2.8-.2 4.1-.7 2.6-.9 4-2.9 4.3-5.6.1-.9.1-1.8 0-2.7C19.6 4.4 16.7 2 11.4 2zm3 9.8c-.3.3-.6.5-1 .6-.2 0-.4 0-.6-.2-.5-.3-1-.7-1.4-1.1-.5-.5-.9-1-1.2-1.6-.1-.2-.2-.5-.1-.7.1-.2.2-.5.4-.6.2-.2.4-.3.7-.3.2 0 .4.1.5.3.3.4.5.8.8 1.2.1.1.1.2 0 .3-.1.1-.2.2-.3.2-.1 0-.1.1 0 .2.3.4.7.8 1.1 1.1.1.1.2.1.3 0 .1-.1.2-.2.3-.2.1 0 .2 0 .3.1.3.2.7.4 1 .7.2.2.2.4 0 .6l-.8.4z" fill="#999"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="#999" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4" stroke="#999" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1" fill="#999"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const socialIcons = [
  { icon: <TelegramIcon />, label: "Telegram" },
  { icon: <WhatsAppIcon />, label: "WhatsApp" },
  { icon: <ViberIcon />, label: "Viber" },
  { icon: <InstagramIcon />, label: "Instagram" },
  { icon: <FacebookIcon />, label: "Facebook" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const helpLinks = [
  { label: "How to Order", href: "#" },
  { label: "Shipping & Delivery", href: "#" },
  { label: "Returns", href: "#" },
  { label: "FAQ", href: "#" },
];

function BrandColumn() {
  return (
    <div className={styles.brandColumn}>
      <Link href="/" className={styles.logo}>
        TKACH <span className={styles.logoAccent}>FABRICS</span>
      </Link>
      <p className={styles.tagline}>
        Wholesale fabrics by the roll for garment manufacturers and ateliers.
      </p>
      <div className={styles.socialRow}>
        {socialIcons.map(({ icon, label }) => (
          <button key={label} className={styles.socialIcon} aria-label={label}>
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}

function CompanyLinks() {
  return (
    <>
      {companyLinks.map(({ label, href }) => (
        <Link key={label} href={href} className={styles.link}>
          {label}
        </Link>
      ))}
    </>
  );
}

function HelpLinks() {
  return (
    <>
      {helpLinks.map(({ label, href }) => (
        <Link key={label} href={href} className={styles.link}>
          {label}
        </Link>
      ))}
    </>
  );
}

function ContactItems() {
  return (
    <>
      <div className={styles.contactItem}>
        <Mail size={14} stroke="var(--color-accent)" />
        <span className={styles.contactValue}>info@tkachfabrics.com</span>
      </div>
      <div className={styles.contactItem}>
        <Phone size={14} stroke="var(--color-accent)" />
        <span className={styles.contactValue}>+1 (555) 000-0000</span>
      </div>
      <div className={styles.contactItem}>
        <MapPin size={14} stroke="var(--color-accent)" />
        <span className={styles.contactValue}>Your address here</span>
      </div>
    </>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Desktop layout */}
      <div className={styles.grid}>
        <BrandColumn />

        {/* Company column */}
        <div className={styles.column}>
          <p className={styles.columnTitle}>COMPANY</p>
          <CompanyLinks />
        </div>

        {/* Help column */}
        <div className={styles.column}>
          <p className={styles.columnTitle}>HELP</p>
          <HelpLinks />
        </div>

        {/* Contact column */}
        <div className={styles.column}>
          <p className={styles.columnTitle}>CONTACT</p>
          <ContactItems />
        </div>
      </div>

      {/* Mobile layout */}
      <div className={styles.mobile}>
        <BrandColumn />
        <div className={styles.accordions}>
          <Accordion title="COMPANY">
            <div className={styles.accordionLinks}>
              <CompanyLinks />
            </div>
          </Accordion>
          <Accordion title="HELP">
            <div className={styles.accordionLinks}>
              <HelpLinks />
            </div>
          </Accordion>
          <Accordion title="CONTACT">
            <div className={styles.accordionLinks}>
              <ContactItems />
            </div>
          </Accordion>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>© 2026 Tkach Fabrics. All rights reserved.</p>
        <div className={styles.bottomLinks}>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
