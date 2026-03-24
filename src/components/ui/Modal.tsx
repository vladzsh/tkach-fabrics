"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={styles.card}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <span id="modal-title" className={styles.title}>{title}</span>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
