[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen Vibe Coding Guide — Copy Locations

> Untuk user non-developer / vibe coding: file ini menjawab **“gue mau mengubah tulisan ini — file mana yang harus dicek?”**

Ini **GUIDE**, bukan prompt. Guide menjelaskan lokasi copy dan batas aman perubahan; workflow AI/session tetap ada di `docs/prompts/`.

## Peta cepat

```text
Hero                 → src/components/HeroSection.tsx
Header               → src/components/Header.tsx
Service              → src/components/KitchenConsultationBanner.tsx
Product Card         → src/components/ProductCard.tsx
Product Detail       → src/app/product/[slug]/page.tsx + public wrapper src/app/shop/[slug]/page.tsx
Location / Article   → src/app/jual-barang-bekas-restoran/[...slug]/page.tsx
Dapur MBG            → src/app/dapur-mbg/page.tsx
Jual Unit            → src/app/jual-unit/page.tsx
Produksi Baru        → src/app/produksi-baru/page.tsx
Social               → src/components/SocialMediaSection.tsx
Testimonials         → src/components/TestimonialsSection.tsx
Gallery              → src/components/GallerySection.tsx
Category             → src/components/CategoryFilter.tsx
Footer               → src/components/Footer.tsx
Recent Posts         → src/components/RecentPostsSection.tsx
```

## Kalau mau mengubah...

| Yang mau diubah | File pertama yang dicek |
|---|---|
| Hero headline / CTA / shipping copy | `src/components/HeroSection.tsx` |
| Header menu / search placeholder | `src/components/Header.tsx` |
| MBG button wording | `src/components/Header.tsx` / `HeroSection.tsx` / `KitchenConsultationBanner.tsx` / `Footer.tsx` |
| MBG page copy / PDF catalog CTA | `src/app/dapur-mbg/page.tsx` |
| Service WhatsApp CTA | `src/components/KitchenConsultationBanner.tsx` |
| Jual Unit page copy | `src/app/jual-unit/page.tsx` |
| Produksi Baru wording | `src/app/produksi-baru/page.tsx` |
| READY/SOLD button | `src/components/ProductCard.tsx` |
| Product WhatsApp message | cari global `Halo Tim BBKitchen` |
| Product Detail CTA / copy | `src/app/product/[slug]/page.tsx` + `src/app/shop/[slug]/page.tsx` |
| Social copy / video cards | `src/components/SocialMediaSection.tsx` |
| Testimonial heading/copy | `src/components/TestimonialsSection.tsx` |
| Gallery heading/copy | `src/components/GallerySection.tsx` |
| Footer wording/contact | `src/components/Footer.tsx` |
| Category labels | `src/components/CategoryFilter.tsx` |
| Local article H1/copy | `src/app/jual-barang-bekas-restoran/[...slug]/page.tsx` |
| Recent Posts heading/copy | `src/components/RecentPostsSection.tsx` |
| Catalog result summary | audit the current `/katalog` route and its imported components before editing |

## Current public URL contract

```text
/katalog
/shop/[slug]
/product-category/[...slug]
WordPress page/post paths via catch-all resolution
```

Kalau cuma ingin mengubah tulisan, jangan mengubah URL/path tersebut.

## Current homepage service CTA labels

```text
Beli Unit       → Cek Stok via WA
Jual Unit       → Jual Unit via WA
Dapur MBG       → Konsultasi MBG
Produksi Baru   → Request Produksi
```

Service card dan WhatsApp CTA adalah action yang berbeda. Jangan mengubah action hanya karena ingin mengganti label.

## Current landing-page positioning

### Dapur MBG

```text
Peralatan Dapur MBG & Equipment SPPG
```

### Jual Unit

```text
Jual Peralatan Dapur Bekas ke BBKitchen
```

Relationship yang harus tetap jelas:

```text
CLIENT → MENJUAL UNIT
BBKITCHEN → REVIEW / MEMBELI
```

Jangan menggunakan copy “jual unit” atau “beli unit” secara ambigu jika konteks actor-nya bisa tertukar.

### Produksi Baru

Halaman ini menjelaskan custom kitchen equipment / produksi baru dan CTA request produksi. Jangan mengubah copy menjadi alur jual/beli unit bekas.

## Catalog copy

Current result summary:

```text
Halaman 1 • Menampilkan {DISPLAYED} dari {TOTAL} unit BBKitchen
```

## Gallery copy

Current gallery text lives in:

```text
src/components/GallerySection.tsx
```

Core copy:

```text
Dokumentasi BBKitchen
Galeri BBKitchen
Melihat lebih dekat aktivitas, peralatan, dan proses BBKitchen.
```

## Recent Posts

Recent Posts homepage section lives in:

```text
src/components/RecentPostsSection.tsx
```

Jangan menganggap post title/excerpt sebagai hardcoded frontend copy jika nilainya berasal dari WordPress API.

## Cara mencari copy paling cepat

Di VS Code tekan:

```text
Ctrl + Shift + F
```

Cari persis tulisan yang terlihat di website.

## Pisahkan 3 hal ini

```text
TEXT
= tulisan yang terlihat

ACTION
= apa yang terjadi saat diklik

MESSAGE
= pesan yang dikirim ke WhatsApp
```

Kalau hanya mau mengganti tulisan, jangan otomatis mengubah action.

## Current WhatsApp contracts

**Dapur MBG**

```text
Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.
```

**Produksi Baru**

```text
Halo BBKitchen, mohon info peralatan dapur/restoran custom atau produksi baru
```

**Product inquiry** menggunakan contract multiline yang ada di `docs/guides/COPY-EDITING-GUIDE.md`.

## Current status buttons

```text
READY → Tanya WA
SOLD  → Tanya Lainnya
```

Jangan menonaktifkan Product Card SOLD hanya karena wording tombol berubah.

## Jangan disentuh sembarangan

Kalau ketemu ini, berhenti dan cek requirement dulu:

```text
slug
URL
SKU
API parameters
category slug
status values
condition values
canonical
schema
```

Hal-hal tersebut bisa memengaruhi data, routing, atau SEO — bukan sekadar copy.

Untuk admin controls, `isAdminMode` bukan bukti authentication. Jangan mengubah permission, status mutation, API, atau ACF contract hanya untuk mengganti tulisan.

## Template permintaan AI sederhana

Kalau ingin meminta ChatGPT/Codex mengganti copy:

> “Cari semua occurrence copy `[COPY LAMA]` di frontend. Saya hanya ingin mengganti wording menjadi `[COPY BARU]`. Jangan ubah action, routing, data contract, SEO, authentication, permission, atau component architecture. Tunjukkan file yang berubah, jalankan build, lalu laporkan hasilnya.”

Untuk workflow session dan dokumentasi, gunakan prompt di `docs/prompts/`.
