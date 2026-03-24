"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {useTranslations} from 'next-intl';
import {useRouter} from '@/i18n/navigation';
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

function SearchBarInner({ onSubmit }: { onSubmit?: () => void }) {
  const t = useTranslations('Search');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = value.trim();
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
        className={styles.input}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t('placeholder')}
        aria-label={t('placeholder')}
      />
    </form>
  );
}

export default function SearchBar({ onSubmit }: { onSubmit?: () => void }) {
  return (
    <Suspense>
      <SearchBarInner onSubmit={onSubmit} />
    </Suspense>
  );
}
