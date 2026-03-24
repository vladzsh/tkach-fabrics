"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY = "tkach-wishlist";

export function useWishlist() {
  const [items, setItems] = useState<string[]>([]);
  const hydrated = useRef(false);

  // Read from localStorage after hydration (avoids SSR mismatch)
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setItems(stored);
    } catch {
      // ignore
    }
    hydrated.current = true;
  }, []);

  // Persist to localStorage on changes (skip the initial hydration write)
  useEffect(() => {
    if (hydrated.current) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const toggle = useCallback((slug: string) => {
    setItems((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const isWishlisted = useCallback(
    (slug: string) => items.includes(slug),
    [items]
  );

  return { items, toggle, isWishlisted };
}
