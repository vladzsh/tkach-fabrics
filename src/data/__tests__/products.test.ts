import { describe, it, expect } from "vitest";
import {
  getProducts,
  getProductBySlug,
  getCategories,
  getProductsByCategory,
  getNewArrivals,
} from "../products";

describe("getProducts", () => {
  it("returns all products", () => {
    const products = getProducts();
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty("slug");
    expect(products[0]).toHaveProperty("name");
    expect(products[0]).toHaveProperty("category");
    expect(products[0]).toHaveProperty("pricePerRoll");
  });

  it("filters by color", () => {
    const products = getProducts({ colors: ["White"] });
    expect(products.length).toBeGreaterThan(0);
    products.forEach((p) => {
      expect(p.colors.some((c) => c.name === "White")).toBe(true);
    });
  });

  it("filters by composition", () => {
    const products = getProducts({ compositions: ["100% Silk"] });
    products.forEach((p) => {
      expect(p.composition).toBe("100% Silk");
    });
  });

  it("filters by price range", () => {
    const products = getProducts({ priceMin: 20, priceMax: 50 });
    products.forEach((p) => {
      expect(p.pricePerRoll).toBeGreaterThanOrEqual(20);
      expect(p.pricePerRoll).toBeLessThanOrEqual(50);
    });
  });

  it("filters by min order", () => {
    const products = getProducts({ minOrders: [1] });
    products.forEach((p) => {
      expect(p.minOrder).toBe(1);
    });
  });

  it("sorts by price ascending", () => {
    const products = getProducts({ sortBy: "price-asc" });
    for (let i = 1; i < products.length; i++) {
      expect(products[i].pricePerRoll).toBeGreaterThanOrEqual(
        products[i - 1].pricePerRoll
      );
    }
  });

  it("sorts by price descending", () => {
    const products = getProducts({ sortBy: "price-desc" });
    for (let i = 1; i < products.length; i++) {
      expect(products[i].pricePerRoll).toBeLessThanOrEqual(
        products[i - 1].pricePerRoll
      );
    }
  });

  it("sorts by name A-Z", () => {
    const products = getProducts({ sortBy: "name-asc" });
    for (let i = 1; i < products.length; i++) {
      expect(products[i].name.localeCompare(products[i - 1].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("getProductBySlug", () => {
  it("returns product for valid slug", () => {
    const products = getProducts();
    const product = getProductBySlug(products[0].slug);
    expect(product).not.toBeNull();
    expect(product!.slug).toBe(products[0].slug);
  });

  it("returns null for invalid slug", () => {
    expect(getProductBySlug("nonexistent")).toBeNull();
  });
});

describe("getCategories", () => {
  it("returns all categories", () => {
    const categories = getCategories();
    expect(categories.length).toBe(6);
    expect(categories[0]).toHaveProperty("slug");
    expect(categories[0]).toHaveProperty("name");
    expect(categories[0]).toHaveProperty("productCount");
  });
});

describe("getProductsByCategory", () => {
  it("returns products for a category", () => {
    const products = getProductsByCategory("silk");
    expect(products.length).toBeGreaterThan(0);
    products.forEach((p) => {
      expect(p.category).toBe("silk");
    });
  });

  it("returns empty array for unknown category", () => {
    expect(getProductsByCategory("unknown")).toEqual([]);
  });
});

describe("getNewArrivals", () => {
  it("returns only products with isNew=true", () => {
    const products = getNewArrivals();
    expect(products.length).toBeGreaterThan(0);
    products.forEach((p) => {
      expect(p.isNew).toBe(true);
    });
  });
});
