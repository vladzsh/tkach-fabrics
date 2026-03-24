"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Dropdown.module.css";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select...",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        className={`${styles.trigger} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown size={14} className={styles.chevron} />
      </button>
      {isOpen && (
        <ul className={styles.menu} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${option.value === value ? styles.active : ""}`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
