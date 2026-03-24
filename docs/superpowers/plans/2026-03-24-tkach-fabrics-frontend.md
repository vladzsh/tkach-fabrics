# Tkach Fabrics Frontend — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete Next.js frontend for a wholesale fabric catalog site with 6 pages, responsive design, and an abstracted data layer ready for a future Django backend.

**Architecture:** Next.js App Router with Server Components by default; client components only for interactive pieces (filters, modals, galleries, forms). CSS Modules for styling with CSS Variables for design tokens. Static JSON data abstracted through a typed access layer.

**Tech Stack:** Next.js 15, React 19, TypeScript, CSS Modules, lucide-react, Inter font (next/font/google), Vitest + React Testing Library

---

## File Map

### Foundation
- `package.json` — dependencies and scripts
- `tsconfig.json` — TypeScript config (Next.js default)
- `next.config.ts` — Next.js config
- `vitest.config.ts` — test runner config
- `vitest.setup.ts` — test environment setup
- `styles/globals.css` — CSS variables, reset, base styles
- `app/layout.tsx` — root layout (Inter font, Header, Footer)

### Data Layer
- `data/types.ts` — Product, Category, ProductFilters interfaces
- `data/products.json` — seed product data (~18 products)
- `data/categories.json` — seed category data (6 categories)
- `data/products.ts` — data access functions
- `data/__tests__/products.test.ts` — data layer tests

### Hooks
- `hooks/useWishlist.ts` — localStorage wishlist hook
- `hooks/__tests__/useWishlist.test.ts` — wishlist hook tests

### UI Primitives (`components/ui/`)
- `Button.tsx` + `Button.module.css`
- `Input.tsx` + `Input.module.css`
- `Breadcrumbs.tsx` + `Breadcrumbs.module.css`
- `Modal.tsx` + `Modal.module.css`
- `Accordion.tsx` + `Accordion.module.css`
- `Dropdown.tsx` + `Dropdown.module.css`
- `RangeSlider.tsx` + `RangeSlider.module.css`
- `BottomSheet.tsx` + `BottomSheet.module.css`
- `WishlistButton.tsx` + `WishlistButton.module.css`

### Layout (`components/layout/`)
- `Header.tsx` + `Header.module.css`
- `SearchBar.tsx` + `SearchBar.module.css`
- `CategoryNav.tsx` + `CategoryNav.module.css`
- `CatalogFlyout.tsx` + `CatalogFlyout.module.css`
- `MobileMenu.tsx` + `MobileMenu.module.css`
- `Footer.tsx` + `Footer.module.css`

### Home (`components/home/`)
- `Hero.tsx` + `Hero.module.css`
- `CategoryGrid.tsx` + `CategoryGrid.module.css`

### Catalog (`components/catalog/`)
- `ProductCard.tsx` + `ProductCard.module.css`
- `SortBar.tsx` + `SortBar.module.css`
- `FilterSidebar.tsx` + `FilterSidebar.module.css`
- `FilterBottomSheet.tsx` + `FilterBottomSheet.module.css`
- `Pagination.tsx` + `Pagination.module.css`
- `CatalogClient.tsx` + `CatalogClient.module.css` — client wrapper orchestrating filters/grid/sort

### Product (`components/product/`)
- `ImageGallery.tsx` + `ImageGallery.module.css`
- `ProductInfo.tsx` + `ProductInfo.module.css`
- `ColorSwatches.tsx` + `ColorSwatches.module.css`
- `QuoteModal.tsx` + `QuoteModal.module.css`

### Contact (`components/contact/`)
- `ContactForm.tsx` + `ContactForm.module.css`
- `ContactInfo.tsx` + `ContactInfo.module.css`

### Pages (`app/`)
- `app/page.tsx` — Homepage
- `app/catalog/page.tsx` — All Fabrics catalog
- `app/catalog/[category]/page.tsx` — Category-filtered catalog
- `app/product/[slug]/page.tsx` — Product detail
- `app/about/page.tsx` — About
- `app/contact/page.tsx` — Contact

### Static Assets
- `public/images/hero.jpg` — placeholder hero image
- `public/images/categories/` — category thumbnail placeholders
- `public/images/products/` — product photo placeholders

---

## Task 1: Project Scaffold & Configuration

**Files:**
- Create: `package.json`, `next.config.ts`, `vitest.config.ts`, `vitest.setup.ts`, `.gitignore` (update), `tsconfig.json` (auto-generated)

- [ ] **Step 1: Create Next.js project**

```bash
cd ~/projects/tkach-fabrics
npx create-next-app@latest . --typescript --app --src=no --tailwind=no --eslint --import-alias "@/*" --use-npm
```

Say yes to overwrite if prompted (only `.gitignore` conflict). This generates `app/`, `public/`, `tsconfig.json`, `next.config.ts`, etc.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install lucide-react
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event happy-dom
```

- [ ] **Step 3: Create Vitest config**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/__tests__/**/*.test.{ts,tsx}", "**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 4: Create Vitest setup**

Create `vitest.setup.ts`:

```typescript
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 5: Add test script to package.json**

Add to `scripts` section:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 6: Clean up scaffold defaults**

- Delete `app/page.module.css` (we'll replace it)
- Replace `app/page.tsx` with a minimal placeholder:

```tsx
export default function Home() {
  return <main>Tkach Fabrics</main>;
}
```

- Delete default content in `app/globals.css` (will be replaced in Task 2)

- [ ] **Step 7: Verify scaffold works**

```bash
npm run build && npm run test
```

Expected: Build succeeds, test runner finds 0 tests.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with TypeScript, Vitest"
```

---

## Task 2: Global Styles & Design Tokens

**Files:**
- Create: `styles/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create global stylesheet**

Create `styles/globals.css`:

```css
/* ===== Reset ===== */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ===== Design Tokens ===== */
:root {
  --color-primary: #2C2C2C;
  --color-accent: #00A86B;
  --color-accent-hover: #008f5b;
  --color-mid-gray: #D2D2D2;
  --color-light-gray: #F5F5F5;
  --color-bg: #FAF9F7;
  --color-border: #EEECE9;
  --color-footer-divider: #404040;
  --color-text-secondary: #888888;
  --color-text-muted: #555555;

  --font-family: var(--font-inter), 'Inter', sans-serif;

  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-xl: 12px;
}

/* ===== Base ===== */
html {
  font-family: var(--font-family);
  color: var(--color-primary);
  background-color: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  min-height: 100vh;
  line-height: 1.5;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
}

button {
  font: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

input, textarea, select {
  font: inherit;
}

ul, ol {
  list-style: none;
}
```

- [ ] **Step 2: Update root layout with Inter font**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tkach Fabrics — Wholesale Fabrics by the Roll",
  description:
    "Premium wholesale fabrics for garment manufacturers and ateliers. Cotton, linen, silk, polyester, wool, and blends.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify dev server renders**

```bash
npm run dev
```

Open `http://localhost:3000` — should show "Tkach Fabrics" on a warm white background in Inter font.

- [ ] **Step 4: Commit**

```bash
git add styles/ app/layout.tsx
git commit -m "feat: add global styles, design tokens, Inter font"
```

---

## Task 3: Data Layer

**Files:**
- Create: `data/types.ts`, `data/products.json`, `data/categories.json`, `data/products.ts`
- Create: `data/__tests__/products.test.ts`

- [ ] **Step 1: Write data layer tests**

Create `data/__tests__/products.test.ts`:

```typescript
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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test
```

Expected: FAIL — module `../products` not found.

- [ ] **Step 3: Create types**

Create `data/types.ts`:

```typescript
export interface ProductColor {
  name: string;
  hex: string;
}

export type CategorySlug =
  | "cotton"
  | "linen"
  | "silk"
  | "polyester"
  | "wool"
  | "blends";

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  composition: string;
  colors: ProductColor[];
  pricePerRoll: number;
  minOrder: number;
  images: string[];
  isNew: boolean;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  productCount: number;
  thumbnail: string;
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "name-asc";

export interface ProductFilters {
  colors?: string[];
  compositions?: string[];
  priceMin?: number;
  priceMax?: number;
  minOrders?: number[];
  sortBy?: SortOption;
}
```

- [ ] **Step 4: Create seed product data**

Create `data/products.json` with ~18 products across all 6 categories. Each product must have: slug, name, category, composition, colors (array with name + hex), pricePerRoll, minOrder, images (array of placeholder paths like `/images/products/silk-charmeuse-1.jpg`), isNew (true for ~4 products).

Include variety: different compositions ("100% Silk", "Silk Blend", "Silk/Cotton"), different colors, different price ranges ($9–$55), different min orders (1, 2, 3, 5, 10).

- [ ] **Step 5: Create seed category data**

Create `data/categories.json`:

```json
[
  { "slug": "cotton", "name": "Cotton", "productCount": 4, "thumbnail": "/images/categories/cotton.jpg" },
  { "slug": "linen", "name": "Linen", "productCount": 3, "thumbnail": "/images/categories/linen.jpg" },
  { "slug": "silk", "name": "Silk", "productCount": 4, "thumbnail": "/images/categories/silk.jpg" },
  { "slug": "polyester", "name": "Polyester", "productCount": 3, "thumbnail": "/images/categories/polyester.jpg" },
  { "slug": "wool", "name": "Wool", "productCount": 2, "thumbnail": "/images/categories/wool.jpg" },
  { "slug": "blends", "name": "Blends", "productCount": 3, "thumbnail": "/images/categories/blends.jpg" }
]
```

Note: `productCount` must match the actual count of products per category in `products.json`.

- [ ] **Step 6: Implement data access functions**

Create `data/products.ts`:

```typescript
import { Product, Category, ProductFilters } from "./types";
import productsData from "./products.json";
import categoriesData from "./categories.json";

const products: Product[] = productsData as Product[];
const categories: Category[] = categoriesData as Category[];

export function getProducts(filters?: ProductFilters): Product[] {
  let result = [...products];

  if (filters?.colors?.length) {
    result = result.filter((p) =>
      p.colors.some((c) => filters.colors!.includes(c.name))
    );
  }

  if (filters?.compositions?.length) {
    result = result.filter((p) =>
      filters.compositions!.includes(p.composition)
    );
  }

  if (filters?.priceMin !== undefined) {
    result = result.filter((p) => p.pricePerRoll >= filters.priceMin!);
  }

  if (filters?.priceMax !== undefined) {
    result = result.filter((p) => p.pricePerRoll <= filters.priceMax!);
  }

  if (filters?.minOrders?.length) {
    result = result.filter((p) => filters.minOrders!.includes(p.minOrder));
  }

  if (filters?.sortBy) {
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.pricePerRoll - b.pricePerRoll);
        break;
      case "price-desc":
        result.sort((a, b) => b.pricePerRoll - a.pricePerRoll);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        // newest first — isNew items first, then original order
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }
  }

  return result;
}

export function getProductBySlug(slug: string): Product | null {
  return products.find((p) => p.slug === slug) ?? null;
}

export function getCategories(): Category[] {
  return categories;
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getAllCompositions(): string[] {
  return [...new Set(products.map((p) => p.composition))].sort();
}

export function getAllColors(): { name: string; hex: string }[] {
  const seen = new Map<string, string>();
  products.forEach((p) =>
    p.colors.forEach((c) => {
      if (!seen.has(c.name)) seen.set(c.name, c.hex);
    })
  );
  return [...seen.entries()].map(([name, hex]) => ({ name, hex }));
}

export function getPriceRange(): { min: number; max: number } {
  const prices = products.map((p) => p.pricePerRoll);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
```

- [ ] **Step 7: Run tests**

```bash
npm run test
```

Expected: All tests PASS.

- [ ] **Step 8: Commit**

```bash
git add data/
git commit -m "feat: add data layer with types, seed data, access functions"
```

---

## Task 4: UI Primitives — Button, Input, Breadcrumbs

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/Button.module.css`
- Create: `components/ui/Input.tsx`, `components/ui/Input.module.css`
- Create: `components/ui/Breadcrumbs.tsx`, `components/ui/Breadcrumbs.module.css`

- [ ] **Step 1: Create Button component**

`components/ui/Button.tsx` — accepts `variant` prop: `"primary"` (green filled), `"outline"` (white/transparent outlined), `"ghost"` (no background). Renders as `<button>` or `<a>` via `href` prop. Props: `children`, `variant`, `href`, `className`, and all native button/anchor attributes.

`components/ui/Button.module.css` — styles for each variant using CSS variables. `.primary` has `background: var(--color-accent)`, white text, rounded corners (`var(--radius-md)`), padding `12px 24px`. `.outline` has `border: 1.5px solid` with transparent bg. Hover states darken via `var(--color-accent-hover)`.

- [ ] **Step 2: Create Input component**

`components/ui/Input.tsx` — `"use client"`. Props: `label`, `name`, `type`, `placeholder`, `required`, `error` (string), `textarea` (boolean for textarea variant), and native input attributes. Renders label above input field. Manages no state — controlled component via `value`/`onChange` from parent.

`components/ui/Input.module.css` — label is `font-size: 13px; font-weight: 600; color: var(--color-primary)`. Input has `background: var(--color-light-gray); border: 1px solid #e0e0e0; border-radius: var(--radius-md); padding: 10px 14px`. Error state shows red border and error message below.

- [ ] **Step 3: Create Breadcrumbs component**

`components/ui/Breadcrumbs.tsx` — server-safe component. Props: `items: { label: string; href?: string }[]`. Last item has no link (current page). Renders Home icon (from lucide-react) + `>` separator + linked segments. Active (last) segment is not a link.

`components/ui/Breadcrumbs.module.css` — flex row, 14px font size, items separated by `>` character in `var(--color-text-secondary)`. Links use `var(--color-accent)`. Current (last) item in `var(--color-text-secondary)`.

- [ ] **Step 4: Verify with dev server**

Create a temporary test page at `app/test/page.tsx` that renders all three components. Check visually in browser. Delete the test page after verification.

- [ ] **Step 5: Commit**

```bash
git add components/ui/
git commit -m "feat: add Button, Input, Breadcrumbs UI primitives"
```

---

## Task 5: UI Primitives — Modal, Dropdown, Accordion

**Files:**
- Create: `components/ui/Modal.tsx`, `components/ui/Modal.module.css`
- Create: `components/ui/Dropdown.tsx`, `components/ui/Dropdown.module.css`
- Create: `components/ui/Accordion.tsx`, `components/ui/Accordion.module.css`

- [ ] **Step 1: Create Modal component**

`components/ui/Modal.tsx` — `"use client"`. Props: `isOpen`, `onClose`, `title`, `children`. Uses React portal (`createPortal` to `document.body`). Renders backdrop overlay (semi-transparent black) + centered card with title, close X button (lucide `X` icon), and children. Closes on: X click, Escape key, backdrop click. Prevents body scroll when open. Traps focus inside modal.

`components/ui/Modal.module.css` — `.overlay`: fixed, inset 0, `background: rgba(0,0,0,0.5)`, z-index 100, flex center. `.card`: white bg, `border-radius: var(--radius-xl)`, padding 24px, max-width 480px, width 90%, max-height 90vh, overflow-y auto. `.header`: flex between with title (18px bold) and close button.

- [ ] **Step 2: Create Dropdown component**

`components/ui/Dropdown.tsx` — `"use client"`. Props: `options: { value: string; label: string }[]`, `value`, `onChange`, `placeholder`. Renders a trigger button showing current selection + chevron icon (lucide `ChevronDown`). Click opens a dropdown list positioned below. Click outside or Escape closes it. Active option highlighted.

`components/ui/Dropdown.module.css` — `.trigger`: `background: var(--color-bg); border: 1px solid var(--color-mid-gray); border-radius: var(--radius-sm); padding: 6px 12px; font-size: 12px`. `.menu`: absolute, white bg, border, rounded, shadow, z-index 50. `.option`: padding, hover bg `var(--color-light-gray)`.

- [ ] **Step 3: Create Accordion component**

`components/ui/Accordion.tsx` — `"use client"`. Props: `title`, `children`, `defaultOpen` (boolean, default false). Renders title row with chevron that rotates on toggle. Content area collapses/expands with CSS transition (max-height or grid-rows trick).

`components/ui/Accordion.module.css` — `.header`: flex between, padding 14px 0, cursor pointer, font-weight 600. `.chevron` rotates 180deg when open. `.content`: overflow hidden, transition max-height 200ms.

- [ ] **Step 4: Verify with dev server**

Test each component on a temporary page. Verify: Modal opens/closes, Dropdown selects, Accordion toggles.

- [ ] **Step 5: Commit**

```bash
git add components/ui/
git commit -m "feat: add Modal, Dropdown, Accordion UI primitives"
```

---

## Task 6: UI Primitives — RangeSlider, BottomSheet

**Files:**
- Create: `components/ui/RangeSlider.tsx`, `components/ui/RangeSlider.module.css`
- Create: `components/ui/BottomSheet.tsx`, `components/ui/BottomSheet.module.css`

- [ ] **Step 1: Create RangeSlider component**

`components/ui/RangeSlider.tsx` — `"use client"`. Props: `min`, `max`, `valueLow`, `valueHigh`, `onChange: (low: number, high: number) => void`. Renders: two number input fields (min/max) side by side with `—` separator, and a track bar below. Track: full gray bar with green filled portion between the two values. Two draggable thumb handles. Inputs and drag both update values.

`components/ui/RangeSlider.module.css` — `.inputs`: flex row with gap. Input fields styled like the Input component. `.track`: height 4px, `background: #e8e8e8`, rounded, relative. `.fill`: absolute, `background: var(--color-accent)`, positioned between low/high percentages. `.thumb`: width 16px, height 16px, rounded full, white bg with green border, absolute, cursor grab.

- [ ] **Step 2: Create BottomSheet component**

`components/ui/BottomSheet.tsx` — `"use client"`. Props: `isOpen`, `onClose`, `title`, `children`. Similar to Modal but slides up from bottom. Backdrop overlay + sheet panel at bottom with title bar (title + close X), scrollable content area. Prevents body scroll when open.

`components/ui/BottomSheet.module.css` — `.overlay`: fixed, inset 0, `background: rgba(0,0,0,0.5)`, z-index 100. `.sheet`: fixed, bottom 0, left 0, right 0, white bg, `border-radius: var(--radius-xl) var(--radius-xl) 0 0`, max-height 80vh, overflow-y auto, transform translateY transition for slide animation. `.header`: flex between, padding 16px 20px, border-bottom.

- [ ] **Step 3: Verify with dev server**

Test RangeSlider drag + input, BottomSheet open/close animation.

- [ ] **Step 4: Commit**

```bash
git add components/ui/
git commit -m "feat: add RangeSlider, BottomSheet UI primitives"
```

---

## Task 7: Wishlist Hook & WishlistButton

**Files:**
- Create: `hooks/useWishlist.ts`, `hooks/__tests__/useWishlist.test.ts`
- Create: `components/ui/WishlistButton.tsx`, `components/ui/WishlistButton.module.css`

- [ ] **Step 1: Write wishlist hook tests**

Create `hooks/__tests__/useWishlist.test.ts`:

```typescript
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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test -- hooks/
```

Expected: FAIL.

- [ ] **Step 3: Implement useWishlist hook**

Create `hooks/useWishlist.ts`:

```typescript
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
```

- [ ] **Step 4: Run tests**

```bash
npm run test -- hooks/
```

Expected: All PASS.

- [ ] **Step 5: Create WishlistButton component**

`components/ui/WishlistButton.tsx` — `"use client"`. Props: `slug: string`, `size?: number` (default 22). Uses `useWishlist` hook. Renders lucide `Heart` icon — filled (red) when wishlisted, outline when not. Click calls `toggle(slug)`.

`components/ui/WishlistButton.module.css` — `.button`: no border, no bg, cursor pointer, flex center, padding 4px. `.filled`: `color: #e53e3e` (red fill). `.outline`: `color: var(--color-text-secondary)`. Hover: opacity change.

- [ ] **Step 6: Commit**

```bash
git add hooks/ components/ui/WishlistButton*
git commit -m "feat: add useWishlist hook and WishlistButton component"
```

---

## Task 8: Header

**Files:**
- Create: `components/layout/Header.tsx`, `components/layout/Header.module.css`
- Create: `components/layout/SearchBar.tsx`, `components/layout/SearchBar.module.css`
- Create: `components/layout/CategoryNav.tsx`, `components/layout/CategoryNav.module.css`
- Create: `components/layout/CatalogFlyout.tsx`, `components/layout/CatalogFlyout.module.css`
- Create: `components/layout/MobileMenu.tsx`, `components/layout/MobileMenu.module.css`

- [ ] **Step 1: Create CategoryNav component**

`components/layout/CategoryNav.tsx` — server-safe. Renders dark bar (`background: var(--color-primary)`) with horizontal links: All Fabrics → `/catalog`, Cotton → `/catalog/cotton`, Linen → `/catalog/linen`, Silk → `/catalog/silk`, Polyester → `/catalog/polyester`, Wool → `/catalog/wool`, Blends → `/catalog/blends`, New Arrivals → `/catalog/new-arrivals`, About → `/about`, Contact → `/contact`. Uses Next.js `Link`. Active item detection via `usePathname()` (will require `"use client"` for this — wrap just the active-state logic).

`components/layout/CategoryNav.module.css` — `.nav`: flex row, gap 24px, padding `12px 32px`, bg `var(--color-primary)`, font-size 14px, white text, overflow-x auto. `.link.active`: `color: var(--color-accent); font-weight: 600`. Hidden on mobile (below 768px).

- [ ] **Step 2: Create SearchBar component**

`components/layout/SearchBar.tsx` — `"use client"`. Renders input field with search icon (lucide `Search`) on left. White bg, rounded, placeholder text "Search by fabric, composition, color...". On form submit (Enter), does nothing in this phase (UI only). On mobile, renders as a clickable icon that expands to an overlay input.

`components/layout/SearchBar.module.css` — Desktop: flex 1, max-width 500px, `background: var(--color-light-gray); border: 1.5px solid #e0e0e0; border-radius: var(--radius-lg); padding: 10px 16px`. Mobile: icon-only trigger, overlay is fixed position with full-width input.

- [ ] **Step 3: Create CatalogFlyout component**

`components/layout/CatalogFlyout.tsx` — `"use client"`. Dropdown that opens when the green "Catalog" button is clicked. Shows a grid of category links with small icons (or colored circles as placeholders). Click outside or Escape closes it. Links to `/catalog/[category]`.

`components/layout/CatalogFlyout.module.css` — `.trigger`: `background: var(--color-accent)`, white text, padding `8px 18px`, rounded, flex with grid icon. `.flyout`: absolute, top 100%, left 0, white bg, shadow, rounded, padding, z-index 50, grid layout 2 columns with category items.

- [ ] **Step 4: Create MobileMenu component**

`components/layout/MobileMenu.tsx` — `"use client"`. Slide-in drawer from left. Opens via hamburger icon. Contains: full category list (links), divider, About, Contact, Sign In. Close on X, backdrop click, or link click. Prevents body scroll.

`components/layout/MobileMenu.module.css` — `.overlay`: fixed inset 0, bg rgba(0,0,0,0.5), z-index 100. `.drawer`: fixed, left 0, top 0, bottom 0, width 280px, white bg, padding, transform translateX transition. `.link`: padding 14px 0, border-bottom, font-size 15px.

- [ ] **Step 5: Create Header component**

`components/layout/Header.tsx` — `"use client"`. Assembles all sub-components:

Desktop (>= 768px):
- Sticky header bar: Logo ("TKACH FABRICS" with green "FABRICS") | CatalogFlyout button | SearchBar | Wishlist heart icon (lucide `Heart`, links nowhere — placeholder) | Sign In icon (lucide `User`, placeholder)
- CategoryNav below

Mobile (< 768px):
- Sticky bar: Hamburger (lucide `Menu`) | "TKACH F." logo | Search icon + Wishlist icon
- MobileMenu opens on hamburger click
- CategoryNav hidden

`components/layout/Header.module.css` — `.header`: sticky, top 0, z-index 50. `.headerBar`: flex between, padding `16px 32px`, bg white, border-bottom. Mobile: padding `12px 16px`. `.logo`: font-size 20px, font-weight 800, "FABRICS" span in `var(--color-accent)`. `.actions`: flex row, gap 28px, centered.

- [ ] **Step 6: Verify header renders**

Update `app/layout.tsx` to import and render `<Header />` above `{children}`. Check desktop and mobile layouts in browser dev tools.

- [ ] **Step 7: Commit**

```bash
git add components/layout/ app/layout.tsx
git commit -m "feat: add Header with SearchBar, CategoryNav, CatalogFlyout, MobileMenu"
```

---

## Task 9: Footer

**Files:**
- Create: `components/layout/Footer.tsx`, `components/layout/Footer.module.css`

- [ ] **Step 1: Create Footer component**

`components/layout/Footer.tsx` — `"use client"` (for mobile accordion). Renders:

Desktop (>= 768px): 4-column grid on dark bg `var(--color-primary)`:
1. Brand: Logo + tagline + row of 5 social/messenger icons (Telegram, WhatsApp, Viber, Instagram, Facebook) in `#404040` rounded squares. Use simple SVG icons or lucide equivalents.
2. Company: "About Us", "Contact", "Privacy Policy", "Terms of Service" — Next.js Links.
3. Help: "How to Order", "Shipping & Delivery", "Returns", "FAQ" — placeholder links (`href="#"`).
4. Contact: Email, Phone, Address with green lucide icons (Mail, Phone, MapPin).

Bottom bar: `border-top: 1px solid var(--color-footer-divider)`, copyright left, Privacy/Terms links right.

Mobile (< 768px): Brand + social icons at top. Columns 2–4 become Accordion sections (use the Accordion component). Copyright at bottom.

`components/layout/Footer.module.css` — `.footer`: bg `var(--color-primary)`, padding `40px 32px 24px`. `.grid`: 4-column grid, gap 40px. `.columnTitle`: font-size 13px, font-weight 700, white, uppercase, letter-spacing 0.5px. `.link`: font-size 13px, `color: #999`, block, margin-bottom 10px. `.bottomBar`: border-top `var(--color-footer-divider)`, flex between, margin-top 32px, padding-top 20px, font-size 12px, `color: #666`. Mobile: single column, accordion sections.

- [ ] **Step 2: Add Footer to root layout**

Update `app/layout.tsx` to import and render `<Footer />` below `{children}`.

- [ ] **Step 3: Verify in browser**

Check desktop 4-column layout and mobile accordion behavior.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Footer* app/layout.tsx
git commit -m "feat: add Footer with 4-column desktop and accordion mobile layout"
```

---

## Task 10: Homepage

**Files:**
- Create: `components/home/Hero.tsx`, `components/home/Hero.module.css`
- Create: `components/home/CategoryGrid.tsx`, `components/home/CategoryGrid.module.css`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create placeholder images**

Create placeholder images for the hero and categories. Use simple colored SVG files or single-pixel placeholders in `public/images/`. The structure:
- `public/images/hero.jpg` — placeholder (can be a solid color div in CSS instead)
- `public/images/categories/cotton.jpg`, `linen.jpg`, `silk.jpg`, `polyester.jpg`, `wool.jpg`, `blends.jpg` — placeholders

Alternatively, use CSS background colors as placeholders and skip image files for now. Note this in the code with a comment.

- [ ] **Step 2: Create Hero component**

`components/home/Hero.tsx` — server component. Full-width section with dark background (placeholder for hero image). Overlay content centered: "WHOLESALE FABRICS" subtitle (green, letter-spacing, small caps), "Premium Fabrics for Your Production" headline (white, large, bold), subtext paragraph, two CTA buttons using the Button component — "Browse Catalog" (primary, links to `/catalog`) and "Request Quote" (outline with white border, links to `/contact`).

`components/home/Hero.module.css` — `.hero`: min-height 480px (mobile: 360px), bg `var(--color-primary)` (placeholder for image), flex center, text-align center, padding 60px 24px, position relative. `.subtitle`: font-size 11px, letter-spacing 3px, `color: var(--color-accent)`, font-weight 600. `.headline`: font-size 36px (mobile: 28px), font-weight 800, white, margin 12px 0. `.subtext`: font-size 14px, `color: #bbb`, max-width 400px, margin auto. `.ctas`: inline-flex, gap 12px, margin-top 24px. Mobile: stack CTAs vertically.

- [ ] **Step 3: Create CategoryGrid component**

`components/home/CategoryGrid.tsx` — server component. Imports `getCategories()` from data layer. Renders section title "Shop by Material" + 4-column grid (2 on mobile) of category cards. Each card: circular thumbnail placeholder (bg `#e8e8e8`), category name below. Entire card is a Next.js Link to `/catalog/[slug]`.

`components/home/CategoryGrid.module.css` — `.section`: padding 40px 32px (mobile: 24px 16px). `.title`: font-size 20px, font-weight 700. `.grid`: grid, 4 columns (mobile: 2), gap 16px. `.card`: bg `var(--color-light-gray)`, rounded `var(--radius-lg)`, padding 24px, text-align center, hover: subtle shadow. `.thumbnail`: width 64px, height 64px, bg `#e8e8e8`, rounded 50%, margin auto.

- [ ] **Step 4: Assemble homepage**

Update `app/page.tsx`:

```tsx
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CategoryGrid />
    </main>
  );
}
```

- [ ] **Step 5: Verify in browser**

Check desktop and mobile layouts. Hero should be visually prominent, category grid should wrap to 2 columns on mobile.

- [ ] **Step 6: Commit**

```bash
git add components/home/ app/page.tsx public/images/
git commit -m "feat: add Homepage with Hero and CategoryGrid"
```

---

## Task 11: Catalog — ProductCard, SortBar, Pagination

**Files:**
- Create: `components/catalog/ProductCard.tsx`, `components/catalog/ProductCard.module.css`
- Create: `components/catalog/SortBar.tsx`, `components/catalog/SortBar.module.css`
- Create: `components/catalog/Pagination.tsx`, `components/catalog/Pagination.module.css`

- [ ] **Step 1: Create ProductCard component**

`components/catalog/ProductCard.tsx` — `"use client"` (for wishlist button). Props: `product: Product`. Renders: fabric photo area (bg placeholder using first color hex or gray), WishlistButton (top-right, visible on hover), product name (13px, bold), composition + color name (11px, gray), price per roll (14px, bold, green), min order (10px, gray). Entire card is a Next.js Link to `/product/[slug]`. WishlistButton click must `stopPropagation` to not navigate.

`components/catalog/ProductCard.module.css` — `.card`: rounded `var(--radius-lg)`, overflow hidden, `border: 1px solid var(--color-border)`, cursor pointer. `.image`: height 180px (mobile: 140px), bg `#e8e8e8`, position relative. `.wishlist`: absolute, top 8px, right 8px, opacity 0, transition opacity. `.card:hover .wishlist`: opacity 1. `.info`: padding 12px, bg `var(--color-bg)`. `.name`: 13px, font-weight 600. `.meta`: 11px, `color: var(--color-text-secondary)`. `.price`: 14px, font-weight 700, `color: var(--color-accent)`. `.row`: flex between, margin-top 8px.

- [ ] **Step 2: Create SortBar component**

`components/catalog/SortBar.tsx` — `"use client"`. Props: `gridCols: 2 | 3`, `onGridChange`, `sortBy: SortOption`, `onSortChange`. Renders: grid toggle buttons (3-col / 2-col, using small grid icons) on left, Dropdown component on right with sort options (Newest first, Price: Low → High, Price: High → Low, Name: A → Z).

`components/catalog/SortBar.module.css` — `.bar`: flex between, padding `10px 0`, bg `var(--color-light-gray)`, border-radius `var(--radius-md)`, padding 10px 16px. `.gridToggle`: flex row, gap 8px. `.gridBtn`: width 28px, height 28px, rounded `var(--radius-sm)`, bg `#e8e8e8`, flex center. `.gridBtn.active`: bg `var(--color-primary)`, white icons.

- [ ] **Step 3: Create Pagination component**

`components/catalog/Pagination.tsx` — server-safe. Props: `currentPage: number`, `totalPages: number`, `basePath: string`, `searchParams: Record<string, string>`. Renders numbered page links. Active page: dark bg, white text. Others: light bg. Shows: first, last, current +/- 1, ellipsis for gaps. Next arrow on right. Uses Next.js Link with preserved search params.

`components/catalog/Pagination.module.css` — `.pagination`: flex center, gap 8px, margin-top 24px, padding-top 16px, `border-top: 1px solid var(--color-border)`. `.page`: width 32px, height 32px, flex center, rounded `var(--radius-sm)`, font-size 13px. `.page.active`: bg `var(--color-primary)`, white, font-weight 600. `.page:not(.active)`: bg `var(--color-light-gray)`.

- [ ] **Step 4: Verify ProductCard renders with sample data**

Create a temporary test page that imports a product from the data layer and renders a ProductCard. Check hover wishlist, link behavior.

- [ ] **Step 5: Commit**

```bash
git add components/catalog/ProductCard* components/catalog/SortBar* components/catalog/Pagination*
git commit -m "feat: add ProductCard, SortBar, Pagination catalog components"
```

---

## Task 12: Catalog — FilterSidebar & FilterBottomSheet

**Files:**
- Create: `components/catalog/FilterSidebar.tsx`, `components/catalog/FilterSidebar.module.css`
- Create: `components/catalog/FilterBottomSheet.tsx`, `components/catalog/FilterBottomSheet.module.css`

- [ ] **Step 1: Create FilterSidebar component**

`components/catalog/FilterSidebar.tsx` — `"use client"`. Props: `filters: ProductFilters`, `onChange: (filters: ProductFilters) => void`, `allColors`, `allCompositions`, `priceRange`. Renders 4 collapsible Accordion sections:

1. **Color** — circular swatches using `allColors`. Click toggles color in filters. Selected swatch has green border.
2. **Composition** — checkboxes from `allCompositions`. Toggling updates `filters.compositions`.
3. **Price per Roll** — RangeSlider with min/max from `priceRange`.
4. **Min Order** — checkboxes: 1 roll, 5+ rolls, 10+ rolls.

`components/catalog/FilterSidebar.module.css` — `.sidebar`: width 220px, padding-right 24px, border-right `1px solid #e8e8e8`, flex-shrink 0. `.sectionTitle`: font-size 12px, font-weight 700, uppercase, letter-spacing 0.5px. `.swatches`: flex wrap, gap 6px. `.swatch`: width 28px, height 28px, rounded 50%, cursor pointer, border 2px solid transparent. `.swatch.selected`: `border-color: var(--color-accent)`. `.checkbox`: flex row, gap 8px, font-size 12px, `color: var(--color-text-muted)`, cursor pointer.

Hidden on screens < 1280px (replaced by FilterBottomSheet).

- [ ] **Step 2: Create FilterBottomSheet component**

`components/catalog/FilterBottomSheet.tsx` — `"use client"`. Uses the BottomSheet primitive. Props same as FilterSidebar plus `isOpen`, `onClose`. Renders the same filter sections inside a BottomSheet. Adds an "Apply Filters" green Button at the bottom that closes the sheet.

Also create the trigger: a "Filter" button (with lucide `SlidersHorizontal` icon) that is visible only on screens < 1280px.

`components/catalog/FilterBottomSheet.module.css` — `.filterButton`: display none on desktop (>= 1280px), flex with icon on tablet/mobile. `.applyButton`: margin-top 20px, width 100%.

- [ ] **Step 3: Commit**

```bash
git add components/catalog/Filter*
git commit -m "feat: add FilterSidebar and FilterBottomSheet for catalog"
```

---

## Task 13: Catalog Page Assembly

**Files:**
- Create: `components/catalog/CatalogClient.tsx`, `components/catalog/CatalogClient.module.css`
- Create: `app/catalog/page.tsx`
- Create: `app/catalog/[category]/page.tsx`

- [ ] **Step 1: Create CatalogClient component**

`components/catalog/CatalogClient.tsx` — `"use client"`. The main client wrapper that orchestrates all catalog interactivity. Props: `initialProducts: Product[]`, `categoryName: string`, `allColors`, `allCompositions`, `priceRange`.

Internal state:
- `filters: ProductFilters` — synced to/from URL search params via `useSearchParams()` and `useRouter()`
- `gridCols: 2 | 3` — default 3
- `currentPage: number` — from URL params, default 1
- `filterSheetOpen: boolean` — for mobile bottom sheet

Logic:
- Apply filters client-side to `initialProducts`
- Paginate (12 items per page)
- Render: SortBar, FilterSidebar (desktop), FilterBottomSheet trigger + sheet (mobile/tablet), product grid (using gridCols), Pagination

`components/catalog/CatalogClient.module.css` — `.layout`: flex row. `.main`: flex 1, padding 16px. `.grid`: display grid, gap 16px. `.grid.cols3`: 3 columns. `.grid.cols2`: 2 columns. Mobile: always 2 columns. `.empty`: text-align center, padding 40px, `color: var(--color-text-secondary)`.

- [ ] **Step 2: Create catalog page for all fabrics**

`app/catalog/page.tsx` — server component:

```tsx
import { getProducts, getAllColors, getAllCompositions, getPriceRange } from "@/data/products";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CatalogClient } from "@/components/catalog/CatalogClient";

export const metadata = { title: "All Fabrics — Tkach Fabrics" };

export default function CatalogPage() {
  const products = getProducts();
  return (
    <main>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All Fabrics" }]} />
      <h1>All Fabrics</h1>
      <p>{products.length} products</p>
      <CatalogClient
        initialProducts={products}
        categoryName="All Fabrics"
        allColors={getAllColors()}
        allCompositions={getAllCompositions()}
        priceRange={getPriceRange()}
      />
    </main>
  );
}
```

- [ ] **Step 3: Create category-filtered catalog page**

`app/catalog/[category]/page.tsx` — server component. Reads `params.category`. If `"new-arrivals"`, calls `getNewArrivals()`. Otherwise calls `getProductsByCategory(category)`. Generates metadata with category name. Returns 404 (`notFound()`) if category is invalid and produces no products (except "new-arrivals" which may validly be empty).

Breadcrumbs: Home > Category name.

- [ ] **Step 4: Verify in browser**

Navigate to `/catalog`, `/catalog/silk`, `/catalog/new-arrivals`. Test filters, sort, grid toggle, pagination, mobile filter bottom sheet.

- [ ] **Step 5: Commit**

```bash
git add components/catalog/CatalogClient* app/catalog/
git commit -m "feat: add Catalog page with filters, sort, grid, pagination"
```

---

## Task 14: Product Page

**Files:**
- Create: `components/product/ImageGallery.tsx`, `components/product/ImageGallery.module.css`
- Create: `components/product/ColorSwatches.tsx`, `components/product/ColorSwatches.module.css`
- Create: `components/product/ProductInfo.tsx`, `components/product/ProductInfo.module.css`
- Create: `components/product/QuoteModal.tsx`, `components/product/QuoteModal.module.css`
- Create: `app/product/[slug]/page.tsx`

- [ ] **Step 1: Create ImageGallery component**

`components/product/ImageGallery.tsx` — `"use client"`. Props: `images: string[]`. State: `activeIndex`. Desktop: large main image (rounded, 400px+ height, bg placeholder), row of 4 thumbnails below. Click thumbnail to switch. Active thumbnail has green border. Mobile: horizontal swipeable carousel (CSS scroll-snap) for main images, thumbnails hidden.

`components/product/ImageGallery.module.css` — `.main`: width 100%, aspect-ratio 4/3, bg `#e8e8e8`, rounded `var(--radius-xl)`, overflow hidden, object-fit cover. `.thumbnails`: flex row, gap 8px, margin-top 12px. `.thumb`: width 64px, height 64px, bg `#e0e0e0`, rounded `var(--radius-md)`, cursor pointer, `border: 2px solid transparent`. `.thumb.active`: `border-color: var(--color-accent)`. Mobile `.carousel`: flex, overflow-x auto, scroll-snap-type x mandatory, gap 0. `.carousel > *`: scroll-snap-align start, min-width 100%.

- [ ] **Step 2: Create ColorSwatches component**

`components/product/ColorSwatches.tsx` — `"use client"`. Props: `colors: ProductColor[]`, `selected: string | null`, `onChange: (colorName: string) => void`. Renders row of circular color swatches. Selected swatch has green border. Click selects.

`components/product/ColorSwatches.module.css` — `.swatches`: flex row, gap 6px. `.swatch`: width 24px, height 24px, rounded 50%, cursor pointer, `border: 2px solid transparent`. `.swatch.selected`: `border-color: var(--color-accent)`.

- [ ] **Step 3: Create QuoteModal component**

`components/product/QuoteModal.tsx` — `"use client"`. Props: `isOpen`, `onClose`, `productName: string`. Uses Modal primitive. Renders form with: product name (read-only Input), name, email, phone, quantity needed, message (textarea Input). Validation: name and email required. On submit: show success state ("Your quote request has been submitted!") inside the modal. Does not actually send data.

`components/product/QuoteModal.module.css` — `.form`: flex column, gap 14px. `.readOnly`: opacity 0.7, pointer-events none. `.success`: text-align center, padding 20px. `.successIcon`: green check circle.

- [ ] **Step 4: Create ProductInfo component**

`components/product/ProductInfo.tsx` — `"use client"`. Props: `product: Product`. Orchestrates the right column: product name (h1), price per roll (large green), specs grid (Composition row, Colors row with ColorSwatches, Min order row), Request Quote Button + WishlistButton, info note div.

`components/product/ProductInfo.module.css` — `.name`: font-size 24px, font-weight 700. `.price`: font-size 28px, font-weight 800, `color: var(--color-accent)`. `.specsGrid`: display grid, 2 columns (120px label + 1fr value), gap 10px, font-size 14px, padding-top 16px, `border-top: 1px solid var(--color-border)`. `.label`: `color: var(--color-text-secondary)`. `.actions`: flex row, gap 12px, margin-top 20px. `.infoNote`: bg `var(--color-light-gray)`, rounded `var(--radius-lg)`, padding 14px 16px, font-size 13px, flex row with green info icon.

- [ ] **Step 5: Create product page**

`app/product/[slug]/page.tsx` — server component. Reads `params.slug`, calls `getProductBySlug()`. Returns `notFound()` if null. Generates metadata with product name. Renders Breadcrumbs (Home > Category > Product name), then two-column layout: ImageGallery (left) + ProductInfo (right). Mobile: stacks vertically with sticky quote CTA at bottom.

Create `app/product/[slug]/page.module.css` — `.layout`: flex row, gap 32px, padding 20px 32px, bg `var(--color-bg)`. Left/right each `flex: 1`. Mobile: flex-direction column, padding 16px. `.stickyCta`: display none on desktop. On mobile: fixed bottom 0, left 0, right 0, padding 12px, bg white, border-top, z-index 40.

- [ ] **Step 6: Verify in browser**

Navigate to a product page. Test: thumbnail switching, color swatch selection, quote modal open/close/validation/success, wishlist toggle, mobile sticky CTA, mobile carousel swipe.

- [ ] **Step 7: Commit**

```bash
git add components/product/ app/product/
git commit -m "feat: add Product page with gallery, specs, quote modal"
```

---

## Task 15: About Page

**Files:**
- Create: `app/about/page.tsx`, `app/about/page.module.css`

- [ ] **Step 1: Create About page**

`app/about/page.tsx` — server component. Simple, mostly markup:

- Breadcrumbs: Home > About
- Page title "About Tkach Fabrics" (h1)
- Company photo placeholder (gray rounded div, 300px height)
- Brand story text paragraph (placeholder Lorem-style content about wholesale fabrics)
- 3 value proposition cards in a row (grid, 3 columns, 1 on mobile):
  1. Quality Fabrics — lucide `CheckCircle` in green circle, description
  2. Fast Response — lucide `Clock` in green circle, description
  3. Wholesale Shipping — lucide `Truck` in green circle, description

`app/about/page.module.css` — `.page`: padding 32px 24px, bg `var(--color-bg)`. `.content`: max-width 720px, margin auto. `.heroImage`: bg `#e8e8e8`, rounded `var(--radius-xl)`, height 300px, margin-bottom 24px. `.story`: font-size 15px, `color: var(--color-text-muted)`, line-height 1.7. `.values`: grid, 3 columns (mobile: 1), gap 16px, margin-top 32px. `.valueCard`: bg `var(--color-light-gray)`, rounded `var(--radius-lg)`, padding 24px, text-align center. `.iconCircle`: width 48px, height 48px, `background: var(--color-accent)`, rounded 50%, flex center, margin auto, white icon inside.

- [ ] **Step 2: Verify in browser**

Navigate to `/about`. Check layout, cards, mobile responsiveness.

- [ ] **Step 3: Commit**

```bash
git add app/about/
git commit -m "feat: add About page with value proposition cards"
```

---

## Task 16: Contact Page

**Files:**
- Create: `components/contact/ContactForm.tsx`, `components/contact/ContactForm.module.css`
- Create: `components/contact/ContactInfo.tsx`, `components/contact/ContactInfo.module.css`
- Create: `app/contact/page.tsx`, `app/contact/page.module.css`

- [ ] **Step 1: Create ContactForm component**

`components/contact/ContactForm.tsx` — `"use client"`. Manages form state: name, email, phone, message. Validation: name and email required, email format check. On submit: shows success state (green check + "Message sent!" text). Uses Input components for all fields.

`components/contact/ContactForm.module.css` — `.form`: flex column, gap 14px. `.success`: text-align center, padding 32px, bg `var(--color-light-gray)`, rounded `var(--radius-xl)`.

- [ ] **Step 2: Create ContactInfo component**

`components/contact/ContactInfo.tsx` — server-safe. Renders two cards:

Card 1 — Contact details: Email (lucide `Mail`, green), Phone (lucide `Phone`, green), Address (lucide `MapPin`, green). Each with icon + label + value.

Card 2 — Messengers: Telegram (blue `#0088cc` icon square), WhatsApp (green `#25D366` icon square), Viber (purple `#7360f2` icon square). Each with branded color background square + label.

Social links row: Instagram + Facebook gray icon buttons.

`components/contact/ContactInfo.module.css` — `.card`: bg `var(--color-light-gray)`, rounded `var(--radius-xl)`, padding 24px. `.contactItem`: flex row, gap 10px, margin-bottom 16px. `.messengerItem`: flex row, gap 10px, cursor pointer. `.messengerIcon`: width 32px, height 32px, rounded `var(--radius-md)`, flex center, white icon. `.socialRow`: flex row, gap 10px, justify center, margin-top 16px. `.socialBtn`: width 36px, height 36px, bg `var(--color-light-gray)`, rounded `var(--radius-md)`, flex center.

- [ ] **Step 3: Create Contact page**

`app/contact/page.tsx` — server shell:

- Breadcrumbs: Home > Contact
- Title "Get in Touch" (h1)
- Two-column layout: ContactForm (left, flex 1) + ContactInfo (right, fixed width ~280px)
- Map placeholder below: full-width gray rounded div (height 280px) with map pin icon centered
- Mobile: stacks vertically

`app/contact/page.module.css` — `.page`: padding 32px 24px, bg `var(--color-bg)`. `.content`: max-width 800px, margin auto. `.columns`: flex row, gap 32px. Mobile: flex-direction column. `.map`: bg `#e8e8e8`, rounded `var(--radius-xl)`, height 280px, margin-top 32px, flex center.

- [ ] **Step 4: Verify in browser**

Navigate to `/contact`. Test form validation, success state, messenger links, mobile layout.

- [ ] **Step 5: Commit**

```bash
git add components/contact/ app/contact/
git commit -m "feat: add Contact page with form, info card, map placeholder"
```

---

## Task 17: Final Polish & Build Verification

**Files:**
- Modify: various files for fixes discovered during verification

- [ ] **Step 1: Run full test suite**

```bash
npm run test
```

Fix any failures.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Fix any build errors (type errors, missing imports, etc.).

- [ ] **Step 3: Responsive spot-check**

Start dev server, check all 6 pages at 3 breakpoints (mobile 375px, tablet 768px, desktop 1280px):
- Homepage: hero + category grid columns
- Catalog: sidebar vs bottom sheet, grid columns
- Product: gallery vs carousel, sticky CTA
- About: value cards grid
- Contact: columns stack on mobile
- Header: hamburger vs full nav
- Footer: accordion vs grid

Fix any layout issues found.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: responsive layout and build fixes"
```

- [ ] **Step 5: Final build verification**

```bash
npm run build && npm run test
```

Both must pass cleanly.
