"use client";

import { useRef } from "react";
import {useTranslations} from 'next-intl';
import {useRouter} from '@/i18n/navigation';
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }: { onSubmit?: () => void }) {
  const t = useTranslations('Search');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = inputRef.current?.value.trim();
    if (query) {
      router.push(`/catalog?q=${encodeURIComponent(query)}`);
      onSubmit?.();
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <span className={styles.icon} aria-hidden="true">
        <Search size={16} />
      </span>
      <input
        ref={inputRef}
        className={styles.input}
        type="search"
        placeholder={t('placeholder')}
        aria-label={t('placeholder')}
      />
    </form>
  );
}
