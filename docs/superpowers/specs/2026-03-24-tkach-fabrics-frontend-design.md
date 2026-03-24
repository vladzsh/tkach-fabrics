# Tkach Fabrics — Frontend Application Design Spec

**Date:** 2026-03-24
**Project:** Wholesale fabric e-commerce frontend
**Source:** Design brief at `~/Desktop/tkach-fabrics-mockups/docs/2026-03-24-tkach-fabrics-design-brief.md`

---

## 1. Overview

A Next.js frontend application for Tkach Fabrics, a wholesale fabric catalog website. Customers browse fabrics organized by material type and submit quote requests — no cart or checkout. The site is inquiry-based.

**Key constraints:**
- Data from static JSON files, abstracted for future Django API swap
- Forms are UI-only with validation (no backend submission yet)
- Wishlist uses localStorage (no account system)
- Deployed on Vercel

---

## 2. Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js (App Router)** | Framework, routing, SSR |
| **React** | UI components |
| **TypeScript** | Type safety |
| **CSS Modules** | Component-scoped styling |
| **CSS Variables** | Design tokens (colors, spacing) |
| **lucide-react** | Icon library (outline stroke, 1.8–2px weight) |
| **Inter** (next/font/google) | Typography |
| **Vercel** | Deployment |

No UI component library. Interactive primitives (Modal, BottomSheet, RangeSlider, Dropdown, Accordion) are built custom with CSS Modules.

---

## 3. Project Structure

```
tkach-fabrics/
├── app/
│   ├── layout.tsx              # Root layout: Header + Footer wrap all pages
│   ├── page.tsx                # Homepage
│   ├── catalog/
│   │   ├── page.tsx            # All Fabrics (unfiltered catalog)
│   │   └── [category]/
│   │       └── page.tsx        # Catalog filtered by category (incl. "new-arrivals")
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx        # Product detail page
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── layout/                 # Header, Footer, CategoryNav, MobileMenu, CatalogFlyout
│   ├── home/                   # Hero, CategoryGrid
│   ├── catalog/                # FilterSidebar, FilterBottomSheet, SortBar, ProductCard, Pagination
│   ├── product/                # ImageGallery, ProductInfo, ColorSwatches, QuoteModal
│   ├── contact/                # ContactForm, ContactInfo
│   └── ui/                     # Button, Input, Modal, Accordion, RangeSlider, BottomSheet, Dropdown, WishlistButton, Breadcrumbs
├── data/
│   ├── types.ts                # TypeScript interfaces
│   ├── products.json           # Static product data
│   ├── categories.json         # Static category data
│   └── products.ts             # Data access functions
├── hooks/
│   └── useWishlist.ts          # localStorage wishlist hook
├── styles/
│   └── globals.css             # CSS variables, reset, global styles
└── public/
    └── images/                 # Product photos, hero image, category thumbnails
```

---

## 4. Data Model

### Product

```typescript
interface Product {
  slug: string;
  name: string;
  category: "cotton" | "linen" | "silk" | "polyester" | "wool" | "blends";
  composition: string;
  colors: { name: string; hex: string }[];
  pricePerRoll: number;
  minOrder: number;
  images: string[];
  isNew: boolean;
}
```

### Category

```typescript
interface Category {
  slug: string;
  name: string;
  productCount: number;
  thumbnail: string;
}
```

### Data Access Layer

```typescript
// data/products.ts
export function getProducts(filters?: ProductFilters): Product[]
export function getProductBySlug(slug: string): Product | null
export function getCategories(): Category[]
export function getProductsByCategory(category: string): Product[]
export function getNewArrivals(): Product[]  // filters by isNew flag
```

Reads from local JSON today. When Django is ready, replace function bodies with `fetch()` calls — no component changes needed.

---

## 5. Design Tokens

```css
/* styles/globals.css */
:root {
  --color-primary: #2C2C2C;
  --color-accent: #00A86B;
  --color-mid-gray: #D2D2D2;
  --color-light-gray: #F5F5F5;
  --color-bg: #FAF9F7;
  --color-border: #EEECE9;
  --color-footer-divider: #404040;

  --font-family: 'Inter', sans-serif;

  --breakpoint-mobile: 768px;
  --breakpoint-desktop: 1280px;
}
```

### Color Usage Rules
- **Green (#00A86B)** — action only: buttons, links, active states. Never as large-area background.
- **#2C2C2C** — header/footer backgrounds, body text, nav.
- **#FAF9F7** — page background (warm white, not pure white).
- **#EEECE9** — card borders, subtle dividers.

---

## 6. Pages

### 6.1 Homepage (`app/page.tsx`)

**Server Component.** No client-side interactivity.

- **Hero section:** Full-width background image, overlay text ("WHOLESALE FABRICS" subtitle, "Premium Fabrics for Your Production" headline), two CTAs: "Browse Catalog" (green filled, links to `/catalog`) and "Request Quote" (white outlined, links to `/contact`).
- **Shop by Material:** 4-column grid (2 on mobile) of category cards. Each card: fabric texture thumbnail (circular), category name. Links to `/catalog/[category]`.

### 6.2 Catalog (`app/catalog/[category]/page.tsx`)

**Server shell with client-side filter components.**

- **Breadcrumbs:** Home > Category name (green).
- **Title area:** Category name (h1) + product count.
- **Sort bar:** Grid toggle (3-col / 2-col) on left. Sort dropdown on right (Newest, Price low→high, Price high→low, Name A→Z).
- **Sidebar filters (desktop):** Collapsible sections — Color (circular swatches), Composition (checkboxes), Price per roll (range slider with min/max inputs, green track), Min order (checkboxes: 1 roll, 5+, 10+).
- **Product grid:** 3-column default (2-column toggle). Cards: fabric photo, wishlist heart (top-right on hover), name, composition + color, price per roll (green), min order. Card bg: `#FAF9F7`, border: `#EEECE9`, rounded corners.
- **Pagination:** Numbered, active page in dark.
- **Mobile:** Filters collapse into "Filter" button → BottomSheet. Grid becomes 2 columns.
- **Tablet:** Same as mobile for filters. Grid stays 3 columns.
- **URL params:** Filters sync to URL search params for shareable links.

### 6.3 Product Page (`app/product/[slug]/page.tsx`)

**Server shell with client-side gallery and modal.**

- **Breadcrumbs:** Home > Category > Product name.
- **Layout:** 50/50 two-column on desktop, stacked on mobile.
- **Left — Image gallery:** Large main photo (rounded corners), 4 thumbnails below. Active thumbnail: green border. Click to switch.
- **Right — Product info:** Name (h1), price per roll (large, green, bold), specs grid (Composition, Available colors as clickable swatches with green active border, Min order). "Request Quote" button (green) + Wishlist heart button. Info note below about 24-hour response.
- **Quote Modal:** Opens on CTA click. Fields: product name (read-only), name, email, phone, quantity, message. UI-only with validation.
- **Mobile:** Gallery becomes horizontal swipe carousel. Info stacks below. Sticky "Request Quote" at bottom of screen.

### 6.4 About (`app/about/page.tsx`)

**Server Component.** Fully static.

- Single column, centered, max-width 720px.
- Page title, company hero photo placeholder, brand story text.
- 3 value proposition cards in a row: Quality Fabrics, Fast Response, Wholesale Shipping. Each with green circle icon, title, description.

### 6.5 Contact (`app/contact/page.tsx`)

**Server shell with client-side form.**

- **Two-column layout** (form left, info right) + map below.
- **Contact form:** Name, Email, Phone, Message textarea. "Send Message" green button. Validation: name and email required. Success state on submit (UI only).
- **Contact info card:** Email (green icon), Phone, Address. Messengers: Telegram (blue), WhatsApp (green), Viber (purple) with branded icons. Social links: Instagram, Facebook (gray icon buttons).
- **Map:** Full-width placeholder div with rounded corners.
- **Mobile:** Stacks vertically — form, info card, map.

---

## 7. Global Components

### 7.1 Header (Sticky)

- **Desktop header bar:** Logo ("TKACH FABRICS" — "FABRICS" in green) | Green "Catalog" button (opens a dropdown flyout with category list + icons, Rozetka-style) | Search bar (white bg, search icon left, submit on Enter) | Wishlist heart icon | Sign In user icon.
- **Category nav bar:** Dark background (`#2C2C2C`). Horizontal: All Fabrics (`/catalog`), Cotton, Linen, Silk, Polyester, Wool, Blends, New Arrivals (`/catalog/new-arrivals`, filters by `isNew` flag), About, Contact. Active item in green, white text.
- **Mobile:** Hamburger | "TKACH F." | Search icon + Wishlist icon. Hamburger opens MobileMenu drawer with full nav. Only top bar sticks on scroll.
- **Search:** UI-ready input with placeholder autocomplete styling. No backend search in this phase.

### 7.2 Footer

- **Background:** `#2C2C2C`.
- **Desktop — 4 columns:** Brand (logo + tagline + messenger/social icons in `#404040` rounded squares), Company (About Us, Contact, Privacy Policy, Terms), Help (How to Order, Shipping, Returns, FAQ), Contact (Email, Phone, Address with green icons).
- **Bottom bar:** Divider `#404040`, copyright left, Privacy/Terms right.
- **Mobile:** Brand + social at top. Columns become Accordion sections. Copyright at bottom.

---

## 8. Shared UI Components

| Component | Type | Purpose |
|-----------|------|---------|
| **Button** | Server-safe | Green filled, white outlined, gray variants. Sized to content. |
| **Input** | Client | Text input with label. `#F5F5F5` bg, `#E0E0E0` border. |
| **Modal** | Client | Overlay + centered card. Used for QuoteModal. Close on X, Escape, backdrop click. |
| **Accordion** | Client | Expand/collapse with chevron. Used in footer (mobile) and filter sidebar. |
| **RangeSlider** | Client | Dual-handle range with min/max inputs. Green track. |
| **BottomSheet** | Client | Mobile filter panel. Slides up from bottom with backdrop. |
| **Dropdown** | Client | Sort-by selector. Opens below trigger. |
| **WishlistButton** | Client | Heart icon toggle. Reads/writes localStorage via useWishlist hook. |
| **Breadcrumbs** | Server-safe | Home icon > links. Green active segment. |

---

## 9. Client-Side State

| State | Scope | Storage |
|-------|-------|---------|
| **Wishlist** | Global (hook) | localStorage |
| **Catalog filters** | Catalog page | URL search params + React state |
| **Grid toggle** | Catalog page | React state |
| **Sort order** | Catalog page | URL search params |
| **Active thumbnail** | Product page | React state |
| **Selected color** | Product page | React state |
| **Modal open/close** | Product page | React state |
| **Mobile menu open** | Header | React state |
| **Form values** | Contact / Quote modal | React state |

No global state library needed. React state + URL params + localStorage cover everything.

---

## 10. Responsive Breakpoints

| Breakpoint | Range | Grid columns | Filters | Header |
|------------|-------|-------------|---------|--------|
| **Mobile** | < 768px | 2 | BottomSheet | Hamburger + condensed logo |
| **Tablet** | 768px–1279px | 3 | BottomSheet | Full bar + category nav |
| **Desktop** | >= 1280px | 3 (toggle to 2) | Sidebar | Full bar + category nav |

---

## 11. Out of Scope

- Wishlist page
- Sign In / Account pages
- Cart / Checkout
- Backend form submission
- Search autocomplete backend
- i18n (layout is i18n-ready, but no localization in this phase)
