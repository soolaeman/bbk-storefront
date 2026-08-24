[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen Copy Editing Guide

This is a **GUIDE**, not a prompt.

Use it to understand **where copy/text lives and what is safe to change** without changing routing, API contracts, inventory logic, authentication, or SEO behavior.

## Quick map

| Area | Primary file | Typical copy |
|---|---|---|
| Hero | `src/components/HeroSection.tsx` | headline, CTA, value copy |
| Service | `src/components/KitchenConsultationBanner.tsx` | service CTA and WhatsApp labels |
| Product Card | `src/components/ProductCard.tsx` | READY/SOLD, Tanya WA |
| Product Detail | `src/app/product/[slug]/page.tsx` + public wrapper `src/app/shop/[slug]/page.tsx` | product CTA, product detail, related products |
| Header | `src/components/Header.tsx` | navigation, search, CTA |
| Footer | `src/components/Footer.tsx` | footer CTA/navigation/contact/social |
| Social | `src/components/SocialMediaSection.tsx` | social labels/copy/video cards |
| Testimonials | `src/components/TestimonialsSection.tsx` | testimonial heading/copy |
| Gallery | `src/components/GallerySection.tsx` | gallery heading/copy and carousel affordance |
| Category | `src/components/CategoryFilter.tsx` | filter/category/subcategory labels |
| Local landing | `src/app/jual-barang-bekas-restoran/[...slug]/page.tsx` | local H1/CTA/copy |
| Dapur MBG display | `src/components/DapurMbgLanding.tsx` | MBG/SPPG landing-page display copy, equipment categories, catalog CTA |
| Dapur MBG public URL wrapper | `src/app/solusi-peralatan-dapur-mbg/page.tsx` | public/canonical URL metadata and landing composition |
| Jual Unit | `src/app/jual-unit/page.tsx` | sell-to-BBKitchen copy, process, FAQ, CTA |
| Produksi Baru | `src/app/produksi-baru/page.tsx` | custom production copy, process, FAQ, CTA |
| Recent Posts | `src/components/RecentPostsSection.tsx` | homepage post-section copy |

## Quick route warning

The current public URL contract includes:

```text
/katalog
/shop/[slug]
/product-category/[...slug]
WordPress page/post paths via catch-all resolution
/solusi-peralatan-dapur-mbg/
```

`/dapur-mbg/` is a redirect-only legacy/public path for the MBG landing. Do not edit it merely to change MBG copy; edit the display component instead.

Product-detail implementation is split between the public `/shop/[slug]` wrapper and the existing `src/app/product/[slug]/page.tsx` renderer. Do not change either path merely to edit wording.

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
Jual Unit ke BBKitchen
Lihat Katalog Paket
Lihat Unit yang Tersedia
Cek Stok via WA
Konsultasi MBG
Request Produksi
Galeri BBKitchen
READY
SOLD
```

## Current locked copy contracts

### Dapur MBG

```text
Peralatan Dapur MBG & Equipment SPPG
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

### Jual Unit

```text
Jual Peralatan Dapur Bekas ke BBKitchen
```

The relationship is explicit: **client sells → BBKitchen reviews/buys**. Do not write ambiguous copy that could imply BBKitchen is selling the client's unit.

### READY / SOLD

```text
READY → Tanya WA
SOLD  → Tanya Lainnya
```

### Homepage hero

```text
Cari, Jual, atau Produksi Peralatan Dapur Resto & Dapur MBG
Siap Kirim
Seluruh Indonesia
Lihat Unit yang Tersedia →
```

Keep the catalog CTA behavior separate from wording edits.

### Homepage service CTA labels

```text
Beli Unit       → Cek Stok via WA
Jual Unit       → Jual Unit via WA
Dapur MBG       → Konsultasi MBG
Produksi Baru   → Request Produksi
```

### Catalog result copy

```text
Halaman 1 • Menampilkan {DISPLAYED} dari {TOTAL} unit BBKitchen
```

### Gallery

Owner: `src/components/GallerySection.tsx`

```text
Dokumentasi BBKitchen
Galeri BBKitchen
Melihat lebih dekat aktivitas, peralatan, dan proses BBKitchen.
```

## Backend / sourced values

Do not document dynamic product/business data as hardcoded frontend copy when it comes from WordPress, WooCommerce, ACF, or Core System.

Examples:

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

## Admin-control distinction

The project has an **admin-control requirement/foundation**, not proof that the privileged workflow is fully implemented.

Keep these separate:

```text
visible public copy
admin-only label
action behavior
backend mutation
ACF-sourced value
authentication / authorization
```

Do not claim READY ↔ SOLD or Telegram mutation is fully implemented without evidence of authentication, authorization, mutation, and upstream refresh.

## Do not casually change

```text
/katalog
/shop/[slug]
/product-category/[...slug]
WordPress catch-all paths
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
