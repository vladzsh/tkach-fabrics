"use client";

import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // UI only — no action on submit
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <span className={styles.icon} aria-hidden="true">
        <Search size={16} />
      </span>
      <input
        className={styles.input}
        type="search"
        placeholder="Search by fabric, composition, color..."
        aria-label="Search fabrics"
      />
    </form>
  );
}
