import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useWishlist } from "../useWishlist";

describe("useWishlist", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with empty wishlist", () => {
    const { result } = renderHook(() => useWishlist());
    expect(result.current.items).toEqual([]);
  });

  it("adds a product slug", () => {
    const { result } = renderHook(() => useWishlist());
    act(() => result.current.toggle("silk-charmeuse"));
    expect(result.current.items).toContain("silk-charmeuse");
    expect(result.current.isWishlisted("silk-charmeuse")).toBe(true);
  });

  it("removes a product slug on second toggle", () => {
    const { result } = renderHook(() => useWishlist());
    act(() => result.current.toggle("silk-charmeuse"));
    act(() => result.current.toggle("silk-charmeuse"));
    expect(result.current.items).not.toContain("silk-charmeuse");
    expect(result.current.isWishlisted("silk-charmeuse")).toBe(false);
  });

  it("persists to localStorage", () => {
    const { result } = renderHook(() => useWishlist());
    act(() => result.current.toggle("silk-charmeuse"));
    const stored = JSON.parse(localStorage.getItem("tkach-wishlist") || "[]");
    expect(stored).toContain("silk-charmeuse");
  });
});
