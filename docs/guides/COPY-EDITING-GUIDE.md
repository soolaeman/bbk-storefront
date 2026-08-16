[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen Copy Editing Guide

This is a **GUIDE**, not a prompt.

Use it when you want to understand **where copy/text lives and what is safe to change** without asking an AI to execute a workflow.

## Purpose

Use this guide for:

- finding UI copy
- locating the responsible component/file
- understanding label vs action vs WhatsApp message
- checking locked copy contracts
- avoiding accidental changes to routing/data/SEO contracts

## Quick map

| Area | Primary file | Typical copy |
|---|---|---|
| Hero | `src/components/HeroSection.tsx` | headline, CTA, MBG, Produksi Baru |
| Service | `src/components/KitchenConsultationBanner.tsx` | service CTA, MBG catalog CTA, WhatsApp CTA labels |
| Product Card | `src/components/ProductCard.tsx` | READY/SOLD, Tanya WA |
| Product Detail | `src/app/product/[slug]/page.tsx` + child components | product CTA, related-products presentation |
| Header | `src/components/Header.tsx` | navigation, search, CTA |
| Footer | `src/components/Footer.tsx` | footer CTA/navigation |
| Social | `src/components/SocialMediaSection.tsx` | social labels/copy/video cards |
| Testimonials | `src/components/TestimonialsSection.tsx` | testimonial heading/copy |
| Gallery | `src/components/GallerySection.tsx` | gallery heading/copy and carousel affordance |
| Category | `src/components/CategoryFilter.tsx` | filter/category/subcategory labels |
| Local landing | `src/app/jual-barang-bekas-restoran/[...slug]/page.tsx` | H1/CTA/local copy |

## Fastest search

VS Code:

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
PDF Katalog Dapur MBG
```

## Important distinction

```text
LABEL / TEXT
= visible wording

ACTION / ROUTING
= what happens on click

MESSAGE
= WhatsApp/external message
```

Changing a label does **not** automatically mean changing its action.

## Locked current contracts

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

### Hero

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

The catalog CTA scrolls to the catalog; do not change behavior when changing its wording unless explicitly requested.

### Dapur MBG catalog

The service section has a separate PDF catalog CTA in addition to the direct WhatsApp CTA.

Do not replace the direct WhatsApp CTA with the PDF CTA unless explicitly requested.

### Homepage service WhatsApp CTA labels

```text
Beli Unit       → Cek Stok via WA
Jual Unit       → Jual Unit via WA
Dapur MBG       → Konsultasi MBG
Produksi Baru   → Request Produksi
```

The service card and the WhatsApp CTA are separate clickable actions.

### Catalog result copy

```text
Halaman 1 • Menampilkan {DISPLAYED} dari {TOTAL} unit BBKitchen
```

The category/subcategory buttons intentionally do not display counts; result count is communicated in the catalog summary instead.

### Gallery

Current gallery copy owner:

`src/components/GallerySection.tsx`

Current compact carousel copy:

```text
Dokumentasi BBKitchen
Galeri BBKitchen
Melihat lebih dekat aktivitas, peralatan, dan proses BBKitchen.
```

Desktop uses carousel controls; mobile uses native swipe. Keep wording changes separate from carousel behavior.

## Do not casually change

These are not ordinary copy:

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

For an AI-assisted workflow, use the appropriate prompt under `docs/prompts/` instead of treating this guide as an instruction prompt.
