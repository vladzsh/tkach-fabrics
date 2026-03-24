"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import {useRouter, usePathname} from '@/i18n/navigation';
import {useLocale} from 'next-intl';
import styles from "./LanguageSwitcher.module.css";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "uk", label: "Українська" },
  { code: "tr", label: "Türkçe" },
  { code: "ru", label: "Русский" },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className={styles.wrapper}>
      <button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        aria-label="Select language"
      >
        <span className={styles.currentLabel}>{current.label}</span>
        <ChevronDown
          size={14}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>
      {open && (
        <div className={styles.menu}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                router.replace(pathname, {locale: lang.code});
                setOpen(false);
              }}
              className={`${styles.option} ${locale === lang.code ? styles.optionActive : ""}`}
            >
              <span className={styles.label}>{lang.label}</span>
              {locale === lang.code && (
                <Check size={14} className={styles.check} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
