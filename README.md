# BBKitchen Frontend — Next.js Migration

Frontend baru untuk **Bukan Baru Kitchen / BBKitchen**, dengan WooCommerce + WordPress/ACF sebagai source of truth katalog.

> **Dokumentasi status terakhir: 15 Agustus 2026**  
> Branch aktif pengembangan: `feature/nextjs-migration`

## Tujuan Migrasi

Migrasi frontend ke Next.js tanpa membuang data live, URL produk, struktur kategori, dan SEO equity yang sudah dimiliki website lama.

Prinsip utama:

- **New frontend, old SEO equity.**
- WooCommerce tetap menjadi sumber data produk, harga, stok, kategori, gambar, slug, description, dan short description.
- WordPress/ACF tetap menjadi sumber field inventory seperti `status_unit`, `kondisi_unit`, `lokasi_unit`, dan `kode_unit`.
- Credential WooCommerce tidak dikirim ke browser; request katalog melewati Next.js server route.
- UI boleh berevolusi, tetapi slug produk dan intent SEO tidak boleh diubah sembarangan.

## Status Migrasi — 15 Agustus 2026

| Area | Status | Catatan |
|---|---|---|
| Next.js App Router | ✅ | Berjalan dan sudah melalui build lokal |
| WooCommerce server proxy | ✅ | `/api/products` tersedia |
| Global metadata endpoint | ✅ | `/api/products?metadata=1` tersedia |
| Top-level category filter | ✅ | Subkategori tidak digunakan |
| Pagination | ✅ | Server-side WooCommerce |
| Global search | ✅ | Menggunakan WooCommerce search |
| Product detail `/product/[slug]` | ✅ | Slug live WooCommerce dipertahankan |
| Product detail SEO metadata | ✅ | Canonical, OG, Product JSON-LD disiapkan |
| Condition UI | ✅ | UI dinormalisasi menjadi Baru / Bekas |
| Product modal — Salin Link | ✅ | Deep-link ke `/product/[slug]` |
| Related Products | ⏳ | Belum diimplementasikan |
| ACF authoritative filtering | ⏳ | Backend WordPress hook/endpoint belum selesai |
| Header logo asset | ⚠️ | Reference code sudah ada, tetapi **belum terverifikasi berhasil secara visual di localhost** |
| Header responsive refinement | ⏳ | Masih perlu verifikasi UI |
| Staff/Owner authentication | ⚠️ | Saat ini hanya simulasi PIN frontend |
| Local WooCommerce connectivity | ⚠️ | Laptop terakhir mengalami connection reset → proxy 502 |

> **Status code ≠ status UI.** Fitur hanya dianggap `✅` jika implementasi dan hasil runtime sudah terverifikasi. Khusus logo/header, asset dan reference sudah ada di code, tetapi user masih melaporkan logo belum berubah secara visual; karena itu statusnya sengaja tidak ditulis sebagai selesai.

## Stack

- Next.js / App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React
- WooCommerce REST API v3
- WordPress + ACF

Package scripts saat ini:

```bash
npm run dev
npm run build
npm run start
```

> Catatan: `package.json` saat ini mendeklarasikan `next` sebagai `latest`. Untuk build lokal yang sudah diuji selama migrasi, Next.js yang berjalan adalah **16.3.1**. Jika reproducibility menjadi prioritas, dependency version sebaiknya dikunci pada tahap hardening.

## Arsitektur

```text
WordPress / WooCommerce
        │
        ├── Products
        ├── Categories
        └── ACF Inventory
                │
                ▼
        Next.js Server Proxy
                │
                ├── /api/products
                └── /api/products?metadata=1
                │
                ▼
             App.tsx
                │
        ┌───────┼────────┐
        ▼       ▼        ▼
     Filters  Cards    Modals
                │
                ▼
        /product/[slug]
                │
                ▼
       SEO Product Detail
```

## Repository Structure

```text
.
├── public/
│   └── bbkitchen-logo.webp
├── src/
│   ├── app/
│   │   ├── api/products/route.ts
│   │   ├── product/[slug]/page.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── AdminPanelModal.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── FAQSection.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── KitchenConsultationBanner.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetailModal.tsx
│   │   ├── RequestUnitModal.tsx
│   │   └── TrustSection.tsx
│   ├── data/
│   │   └── products.ts
│   ├── lib/
│   │   └── woocommerce.ts
│   ├── types.ts
│   └── utils/
│       └── formatters.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Data Contract

`src/data/products.ts` sengaja **tidak berisi katalog mock**. File tersebut menjadi contract type untuk data live.

Contract utama:

- `ProductCondition`: `BARU | BEKAS`
- `AvailabilityStatus`: `READY | DP | SOLD`
- `Product`
- `ProductFilterState`
- `CatalogMetadata`

WooCommerce + WordPress/ACF adalah source of truth; data dummy produk tidak lagi menjadi sumber katalog.

## WooCommerce Proxy

Endpoint utama:

```text
GET /api/products
```

Metadata:

```text
GET /api/products?metadata=1
```

Route handler berada di:

```text
src/app/api/products/route.ts
```

Server proxy menangani antara lain:

- pagination (`page`, `per_page`)
- search
- sorting
- stock status
- SKU
- price range
- WooCommerce category lookup
- top-level category metadata
- ACF condition/location/status contract

Response produk meneruskan header WooCommerce yang relevan:

```text
X-WP-Total
X-WP-TotalPages
```

Default katalog menggunakan **8 produk per halaman**.

### Category Contract

Filter frontend hanya mengekspos kategori WooCommerce **top-level**, bukan subkategori.

Urutan kategori yang digunakan UI:

1. Meja Stainless
2. Sink Stainless
3. Rak Stainless
4. Hood Stainless
5. Kompor
6. Chiller
7. Ice System
8. Freezer
9. Showcase
10. Peralatan Dapur Bekas Lainnya

### ACF Contract

Nilai resmi yang dipakai frontend:

```text
status_unit
READY
DP
SOLD
```

```text
kondisi_unit
BARU
BEKAS
```

```text
lokasi_unit
PAMULANG 2
KEDAUNG
SAWANGAN
SETU
PAMULANG BARAT
```

Export ACF `BBK INVENTORY` yang menjadi acuan migrasi menggunakan `show_in_rest: 0`. Karena itu field ACF tersebut tidak boleh diasumsikan otomatis tersedia sebagai query filter native WooCommerce REST API.

## Filtering

Filtering kategori dilakukan melalui WooCommerce category ID yang di-resolve server-side.

Untuk status:

- `READY` dipetakan ke WooCommerce `stock_status=instock`.
- `SOLD` dipetakan ke WooCommerce `stock_status=outofstock`.

**Penting:** `stock_status` WooCommerce dan `status_unit` ACF adalah dua konsep berbeda. Mapping di atas adalah optimasi/filter operasional, bukan pengganti source-of-truth ACF.

Condition/location ACF saat ini belum memiliki query metadata WordPress yang terverifikasi di route proxy. Route tidak melakukan loop seluruh ribuan produk hanya untuk meniru meta query. Jika filter metadata ini perlu menjadi server-side authoritative filtering, backend WordPress harus menyediakan endpoint/hook metadata yang resmi.

## Search

Global search pada header mengalir ke state filter dan diteruskan ke WooCommerce melalui parameter `search` pada proxy Next.js.

Target UX search adalah katalog live, bukan pencarian terhadap mock/static dataset.

## Product Detail & SEO

Route detail:

```text
/product/[slug]
```

`src/app/product/[slug]/page.tsx` mengambil produk berdasarkan **slug WooCommerce**.

Detail page mempertahankan data SEO penting:

- product name / H1
- short description
- full description
- SKU / kode unit
- category
- condition
- location
- status
- images
- canonical URL
- Open Graph metadata
- Product JSON-LD

Canonical menggunakan domain BBKitchen:

```text
https://www.bukanbarukitchen.com/product/{slug}
```

**Jangan mengubah slug produk atau category URL secara sembarangan.** Existing search equity adalah bagian dari requirement migrasi.

## Product UI

Komponen katalog utama:

- `Header`
- `HeroSection`
- `CategoryFilter`
- `ProductCard`
- `ProductDetailModal`
- `RequestUnitModal`
- `AdminPanelModal`
- `KitchenConsultationBanner`
- `TrustSection`
- `FAQSection`
- `Footer`

Product card menggunakan label kondisi UI yang dinormalisasi menjadi:

```text
Baru
Bekas
```

Nilai ACF mentah seperti `Baru Sisa Proyek / Lelang` tidak seharusnya tampil sebagai label kondisi UI final.

Product detail modal juga memiliki deep-link action **Salin Link**, yang mengarah ke `/product/[slug]` agar unit mudah dibagikan ke sales/WhatsApp.

## Header & Branding

Logo asset yang disiapkan:

```text
public/bbkitchen-logo.webp
```

Header sudah memiliki reference code ke asset tersebut dan accessibility text menggunakan `sr-only`.

**Status per 15 Agustus 2026: ⚠️ belum terverifikasi berhasil secara visual di localhost.** User masih melaporkan logo header belum berubah. Karena itu dokumentasi tidak menganggap pekerjaan logo sebagai selesai.

Header tetap menyediakan:

- global search
- Titip Cari Unit
- Konsultasi WhatsApp
- Staff / Owner
- Admin panel ketika mode admin aktif

## Staff / Owner Mode

Header memiliki akses Staff / Owner berbasis PIN demo pada frontend saat ini.

PIN demo yang ada di implementasi:

```text
1234
```

atau:

```text
admin
```

### Security Warning

Ini **bukan authentication production-grade**. PIN tersebut berada di frontend dan hanya cocok untuk simulasi/UI development. Untuk production, akses owner/staff harus dipindahkan ke authentication server-side dengan authorization yang nyata.

## Pagination

Katalog menggunakan pagination server-side WooCommerce.

UI menyediakan:

- halaman saat ini
- total halaman ketika tersedia
- tombol sebelumnya/berikutnya
- input nomor halaman
- jumlah item yang sedang ditampilkan

Tidak ada strategi mengambil seluruh katalog 2.500+ produk ke browser hanya untuk pagination.

## Metadata / Global Filter Options

`/api/products?metadata=1` mengambil kategori live WooCommerce dan mengembalikan contract ACF statis yang telah ditentukan.

Kategori tidak dibangun dari hanya 8 produk yang sedang tampil. Ini penting supaya kategori tidak hilang hanya karena produk pada page aktif tidak memiliki kategori tertentu.

## Environment

Server-side WooCommerce proxy membutuhkan:

```env
WOOCOMMERCE_API_URL=https://www.bukanbarukitchen.com/wp-json/wc/v3
WC_CONSUMER_KEY=...
WC_CONSUMER_SECRET=...
```

Jangan commit credential asli ke repository.

> Catatan: `.env.example` pada branch ini masih berisi template lama untuk Gemini/AI Studio dan belum merepresentasikan variable WooCommerce yang dipakai route handler. Ini adalah item dokumentasi/configuration yang masih perlu dirapikan pada hardening berikutnya.

## Local Development

Install dependency:

```bash
npm install
```

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Production server:

```bash
npm run start
```

Local URL:

```text
http://localhost:3000
```

## Verification

Build yang telah digunakan selama migrasi berhasil melewati:

```text
Compiled successfully
Finished TypeScript
Collecting page data
Generating static pages
Finalizing page optimization
```

Route yang telah terdeteksi dalam build:

```text
/
/_not-found
/api/products
/product/[slug]
```

Warning `package-lock.json` di parent directory (`C:\Users\Lenovo`) berasal dari struktur directory lokal/Turbopack dan bukan TypeScript/build error aplikasi.

## Known Issues / Current Limitations

### 1. WooCommerce connectivity — LAPTOP

Pada **15 Agustus 2026**, local laptop environment mengalami:

```text
curl -I https://www.bukanbarukitchen.com
curl: (35) Recv failure: Connection was reset
```

dan request ke:

```text
https://www.bukanbarukitchen.com/wp-json/wc/v3/products
```

juga mengalami connection reset.

Akibatnya browser menerima:

```text
/api/products → 502 Bad Gateway
```

User melaporkan domain masih dapat diakses melalui HP. Karena itu masalah ini belum dinyatakan sebagai WooCommerce application failure; kemungkinan masih berada pada jalur network/DNS/TLS/firewall/IPv4/IPv6 laptop.

### 2. ACF meta filtering

`kondisi_unit` dan `lokasi_unit` belum memiliki query metadata server-side WordPress yang authoritative di route ini. Route sengaja tidak melakukan full-catalog scan untuk mengemulasikan filter tersebut.

### 3. Related Products

Related products berbasis kategori WooCommerce live, dengan current product excluded, masih menjadi pekerjaan berikutnya.

### 4. Product detail header

Product detail page masih memiliki header/layout yang didefinisikan sendiri. Konsolidasi penuh dengan shared `Header` component dapat dilakukan setelah UX stabil agar tidak mengganggu SEO/detail rendering.

### 5. Authentication

Staff/Owner PIN saat ini adalah simulasi frontend, bukan sistem auth production.

### 6. Dependency hardening

`next` masih menggunakan range `latest`. Dependency versions sebaiknya dikunci setelah migrasi stabil untuk menghindari perubahan build yang tidak disengaja.

### 7. Configuration documentation

`.env.example` belum sinkron dengan environment variable WooCommerce yang benar-benar digunakan oleh server route.

## Migration Rules

Selama fase migrasi, gunakan aturan berikut:

1. **1 step = 1 file = 1 commit.**
2. Jangan mengembalikan mock catalog sebagai source of truth.
3. Jangan mengubah slug produk/category tanpa alasan SEO yang terverifikasi.
4. Jangan memindahkan WooCommerce credential ke client.
5. Jangan mengambil seluruh katalog hanya untuk menyelesaikan filter/pagination di frontend.
6. Gunakan kategori WooCommerce top-level untuk filter publik.
7. Normalisasi label UI tanpa mengubah raw source data.
8. Bedakan `status_unit` ACF dari WooCommerce `stock_status`.
9. Pastikan perubahan UI tetap konsisten dengan design system Home BBKitchen.
10. Setelah setiap step, jalankan `git pull` + `npm run build` sebelum melanjutkan.

## Next Roadmap

Prioritas setelah fondasi ini stabil:

1. **Related Products** berbasis kategori WooCommerce live dan exclude current product.
2. Sinkronisasi penuh ACF metadata filtering melalui backend WordPress.
3. **Verifikasi dan perbaikan logo/header secara visual di localhost.**
4. Penyempurnaan search UX dan popular-search behavior berbasis data nyata.
5. Shared design system untuk Home → Catalog → Product Detail.
6. SEO schema/canonical/internal-link hardening.
7. Production authentication untuk Staff/Owner.
8. Lock dependency versions dan sinkronisasi `.env.example`.

## Source of Truth

```text
Product / price / stock / category / slug / description
→ WooCommerce

status_unit / kondisi_unit / lokasi_unit / kode_unit
→ WordPress ACF BBK INVENTORY

Frontend presentation / UX / navigation / SEO rendering
→ Next.js
```

---

**BBKitchen — Bukan Baru Kitchen**  
Sentra Barang Bekas Restoran
