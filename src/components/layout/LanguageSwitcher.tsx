"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import styles from "./LanguageSwitcher.module.css";

const LANGUAGES = [
  { code: "EN", country: "gb", label: "English" },
  { code: "UK", country: "ua", label: "Українська" },
  { code: "TR", country: "tr", label: "Türkçe" },
  { code: "RU", country: "ru", label: "Русский" },
];

function flagUrl(cc: string) {
  return `https://flagcdn.com/w40/${cc.toLowerCase()}.png`;
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("EN");
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === activeLang)!;

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={flagUrl(current.country)}
          alt={current.code}
          className={styles.flag}
        />
        <span className={styles.code}>{current.code}</span>
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
                setActiveLang(lang.code);
                setOpen(false);
              }}
              className={`${styles.option} ${activeLang === lang.code ? styles.optionActive : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flagUrl(lang.country)}
                alt={lang.code}
                className={styles.flag}
              />
              <span className={styles.code}>{lang.code}</span>
              <span className={styles.label}>{lang.label}</span>
              {activeLang === lang.code && (
                <Check size={14} className={styles.check} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
