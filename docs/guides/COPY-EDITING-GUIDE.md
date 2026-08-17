[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen Copy Editing Guide

This is a **GUIDE**, not a prompt.

Use it when you want to understand **where copy/text lives and what is safe to change** without changing routing, API contracts, inventory logic, or SEO behavior.

## Quick map

| Area | Primary file | Typical copy |
|---|---|---|
| Hero | `src/components/HeroSection.tsx` | headline, CTA, value copy |
| Service | `src/components/KitchenConsultationBanner.tsx` | service CTA and WhatsApp labels |
| Product Card | `src/components/ProductCard.tsx` | READY/SOLD, Tanya WA |
| Product Detail | `src/app/product/[slug]/page.tsx` + child components | product CTA, related-product presentation |
| Header | `src/components/Header.tsx` | navigation, search, CTA |
| Footer | `src/components/Footer.tsx` | footer CTA/navigation |
| Social | `src/components/SocialMediaSection.tsx` | social labels/copy/video cards |
| Testimonials | `src/components/TestimonialsSection.tsx` | testimonial heading/copy |
| Gallery | `src/components/GallerySection.tsx` | gallery heading/copy and carousel affordance |
| Category | `src/components/CategoryFilter.tsx` | filter/category/subcategory labels |
| Local landing | `src/app/jual-barang-bekas-restoran/[...slug]/page.tsx` | local H1/CTA/copy |

## Text vs logic

```text
LABEL / TEXT
= visible wording

ACTION / ROUTING
= what happens when clicked

MESSAGE
= WhatsApp/external message payload
```

Changing a label does not automatically change its action.

## Fastest search

In VS Code:

```text
Ctrl + Shift + F
```

Useful keywords:

```text
Tanya WA
Tanya Lainnya
WhatsApp
Dapur MBG
Produksi Baru
Lihat Unit yang Tersedia
Cek Stok via WA
Jual Unit via WA
Konsultasi MBG
Request Produksi
Galeri BBKitchen
Geser untuk melihat foto lainnya
READY
SOLD
```

## Current locked copy contracts

### Dapur MBG

```text
Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.
```

### Produksi Baru

```text
Halo BBKitchen, mohon info peralatan dapur/restoran custom atau produksi baru
```

### Product WhatsApp

```text
Halo Tim BBKitchen, saya tertarik dan ingin menanyakan penawaran harga dan ketersediaan untuk unit:

Nama Unit: {NAMA UNIT}

SKU/ID: {SKU}

Lokasi Unit: {LOKASI}

Kondisi: {BARU|BEKAS}

Apakah unit ini masih tersedia? Mohon info harga penawaran dan spesifikasi detailnya. Terima kasih.
```

### READY / SOLD

```text
READY → Tanya WA
SOLD  → Tanya Lainnya
```

### Homepage hero

```text
Cari, Jual, atau Produksi Peralatan Dapur Resto & Dapur MBG
```

```text
Siap Kirim
Seluruh Indonesia
```

```text
Lihat Unit yang Tersedia →
```

The catalog CTA scrolls to the catalog. Keep behavior separate from wording edits.

### Homepage service CTA labels

```text
Beli Unit       → Cek Stok via WA
Jual Unit       → Jual Unit via WA
Dapur MBG       → Konsultasi MBG
Produksi Baru   → Request Produksi
```

The service card and WhatsApp CTA are separate clickable actions.

### Catalog result copy

```text
Halaman 1 • Menampilkan {DISPLAYED} dari {TOTAL} unit BBKitchen
```

Category/subcategory button counts are intentionally omitted.

### Gallery

Current gallery copy owner:

`src/components/GallerySection.tsx`

```text
Dokumentasi BBKitchen
Galeri BBKitchen
Melihat lebih dekat aktivitas, peralatan, dan proses BBKitchen.
```

## Backend / sourced values

Do not document dynamic product/business data as hardcoded frontend copy when it comes from WordPress, WooCommerce, ACF, or Core System.

Examples include:

```text
Product name
Price
SKU
Category
Images
Stock/status
kode_unit
status_unit
kondisi_unit
lokasi_unit
link_telegram
```

These remain backend/source-of-truth concerns.

## Admin-control distinction

The current project has an **admin-control requirement/foundation**, not proof that the privileged workflow is fully implemented.

Keep these separate:

```text
visible public copy
admin-only label
action behavior
backend mutation
ACF-sourced value
authentication / authorization
```

The intended authenticated workflow is:

```text
READY ↔ SOLD
Buka Telegram → ACF-backed product Telegram link
```

Do not claim this is fully implemented unless repository evidence proves authentication, server authorization, mutation, and upstream refresh behavior.

## Do not casually change

```text
/product/[slug]
/jual-barang-bekas-restoran/[...slug]
SKU
slug
canonical
schema
API parameters
category slugs
status values
condition values
```

These affect routing, data, or SEO rather than ordinary copy.

## Safe copy-edit workflow

```text
Find old copy
  ↓
Check every occurrence
  ↓
Separate label / action / message
  ↓
Change only intended copy
  ↓
Search for old wording again
  ↓
Build
  ↓
Verify UI if applicable
```

For AI-assisted workflows, use the appropriate prompt under `docs/prompts/` instead of treating this guide as an execution prompt.
