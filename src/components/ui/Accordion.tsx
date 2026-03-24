"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Accordion.module.css";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.accordion}>
      <button
        className={`${styles.header} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown size={16} className={styles.chevron} />
      </button>
      <div className={`${styles.content} ${isOpen ? styles.open : ""}`}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
}
