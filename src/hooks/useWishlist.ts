"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "tkach-wishlist";

function readStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function useWishlist() {
  const [items, setItems] = useState<string[]>(readStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
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
