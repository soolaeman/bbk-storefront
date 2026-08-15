# BBKitchen Frontend — Next.js Migration

Frontend baru **Bukan Baru Kitchen / BBKitchen**.

Branch aktif:

```text
feature/nextjs-migration
```

> Dokumentasi ini adalah **living documentation**. Status `done` hanya untuk pekerjaan yang sudah benar-benar dikerjakan/terverifikasi. Rencana ditulis terpisah dari implementasi.

---

## 1. Tujuan Migrasi

> **New frontend, old SEO equity.**

Migrasi bukan sekadar mengganti theme WordPress. Targetnya adalah membangun experience layer BBKitchen yang lebih konsisten di desktop dan mobile tanpa membuang data live, URL/slug, taxonomy, content intent, dan SEO equity yang sudah ada.

Prioritas:

1. UI/UX rata di Home, Catalog/Archive, Product Detail, Page, dan Post.
2. WooCommerce + WordPress/ACF tetap menjadi source of truth katalog.
3. URL/slug dan search intent lama dipertahankan.
4. Product detail menjadi halaman conversion utama.
5. Business logic inventory dipisahkan dari frontend.
6. SEO, copy, UX, dan data migration dikerjakan sebagai satu program.

---

## 2. Target Architecture

```text
                    BBK AI GROWTH AUTOMATION
                 inventory / AI / sourcing pipeline
                              │
                              ▼
                       WordPress / WooCommerce
                              │
                 ┌────────────┼────────────┐
                 ▼            ▼            ▼
             Products      ACF        Categories
                 │            │            │
                 └────────────┼────────────┘
                              ▼
                     BBK CORE SYSTEM
                WordPress business-logic layer
                              │
                              ▼
                     Next.js Data Layer
                              │
                 ┌────────────┼────────────┐
                 ▼            ▼            ▼
                Home       Catalog      Product
                 │            │            │
                 └────────────┼────────────┘
                              ▼
                   Shared Design System
                              │
                              ▼
                    Desktop + Mobile UX
```

### Boundary yang dikunci

- **WooCommerce**: produk, harga, stok, kategori, gambar, slug, description, short description.
- **WordPress/ACF**: inventory fields seperti `kode_unit`, `status_unit`, `kondisi_unit`, `lokasi_unit`, `link_telegram`.
- **BBK Core System**: business logic dan integration layer WordPress. Saat dokumentasi ini dibuat, plugin tersebut masih merupakan fondasi yang belum diisi sebagai sistem final.
- **BBK AI Growth Automation**: automation/sourcing pipeline terpisah; tidak menjadi bagian dari Next.js frontend.
- **Next.js**: UI/UX, routing, rendering, SEO presentation, catalog experience, dan conversion experience.
- **Google Sheets**: target pencatatan penjualan melalui backend Core System; Next.js tidak boleh menyimpan credential atau mengakses Google Sheets secara langsung.

---

## 3. Current Migration Status — 15 Agustus 2026

| Area | Status | Catatan |
|---|---|---|
| Next.js App Router | ✅ | Build lokal berhasil setelah cache `.next` dibersihkan |
| WooCommerce server proxy | ✅ | `/api/products` tersedia |
| Global metadata endpoint | ✅ | `/api/products?metadata=1` tersedia |
| Top-level category filter | ✅ | Subkategori tidak menjadi filter publik |
| Pagination | ✅ | WooCommerce server-side; default 8/page |
| Global search | ✅ | Homepage/catalog menggunakan WooCommerce `search` |
| Product detail | ✅ | `/product/[slug]` menggunakan slug live |
| Product detail SEO metadata | ✅ | Canonical/OG/Product JSON-LD sudah disiapkan |
| Product gallery | ✅ | Thumbnail dapat mengganti foto utama |
| Breadcrumb | ✅ | Home → Katalog → Kategori → Produk |
| Salin Link | ✅ | Deep-link ke `/product/[slug]` |
| Condition UI | ✅ | UI dinormalisasi menjadi Baru / Bekas |
| Local landing route | ✅ | Catch-all `/jual-barang-bekas-restoran/[...slug]` mendukung `/jakarta` dan multi-level seperti `/jakarta/jakarta-pusat` |
| Local landing visual | ⚠️ | Data WordPress sudah masuk; styling artikel masih perlu dirapikan agar mengikuti design system |
| Shared Header | ✅ | `src/components/Header.tsx` sudah dipakai pada halaman migration dan bersifat sticky |
| Article Header integration | ✅ | Header sudah tampil pada local landing page |
| Article content typography | ⏳ | H1/H2/H3/list/paragraph masih perlu styling dan spacing yang konsisten |
| Header global search on local pages | ⚠️ | Input header perlu wiring state/handler agar benar-benar searchable dari page yang bersangkutan |
| Product detail header | ⚠️ | Masih memakai header hardcoded; perlu dikonsolidasikan ke shared `Header.tsx` |
| Related Products | ⏳ | Belum menjadi implementasi final di migration baseline |
| ACF authoritative filtering | ⏳ | Backend WordPress hook/endpoint belum selesai |
| Shared design system | ⏳ | Perlu konsolidasi seluruh page/archive/post |
| Staff/Owner authentication | ⚠️ | Masih simulasi PIN frontend |
| Admin → Telegram | ⏳ | Belum menjadi Core System workflow final |
| Admin → READY/DP/SOLD | ⏳ | Belum menjadi Core System workflow final |
| SOLD → Google Sheets | ⏳ | Belum diimplementasikan sebagai Core System workflow final |
| Local WooCommerce connectivity | ⚠️ | Laptop sebelumnya mengalami connection reset → proxy 502 |

### Chat 1.3 — status penutupan

Pada akhir Chat 1.3, visual migration sudah melewati fase paling kasar dan masuk fase **site-wide consistency**.

Yang sudah diverifikasi secara visual di localhost:

- Home mempunyai header, katalog, card, dan visual system yang sudah jauh lebih matang.
- Local landing `/jual-barang-bekas-restoran/jakarta` sudah mengambil data WordPress dan menampilkan hero/image/content.
- Catch-all route berhasil melayani `/jakarta` dan `/jakarta/jakarta-pusat`.
- Shared `Header.tsx` sudah tampil pada local landing page.
- Product detail sudah mempunyai layout detail, gallery, metadata, breadcrumb, dan conversion area.
- Build berhasil setelah stale `.next` dibersihkan.

Tiga pekerjaan visual/UX yang sengaja **ditahan untuk chat berikutnya**:

1. Product detail memakai shared header yang sama dengan Home/local landing.
2. Search pada shared header dibuat benar-benar functional di halaman yang membutuhkannya.
3. Article/local landing content dirapikan: H1/H2/H3, list, paragraph spacing, typography, palette, dan responsive reading width.

---

## 4. Existing Frontend Data Contract

`src/data/products.ts` sudah diposisikan sebagai **type-only contract**, bukan katalog mock.

Contract utama:

```text
Product
ProductCategory
ProductCondition
AvailabilityStatus
ProductPowerType
ProductFilterState
ProductCategoryOption
CatalogMetadata
```

Nilai resmi inventory yang menjadi acuan:

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

ACF export `BBK INVENTORY` yang dipelajari selama migrasi menggunakan `show_in_rest: 0`. Karena itu field ACF tidak boleh diasumsikan otomatis tersedia sebagai query filter native WooCommerce REST API.

---

## 5. WooCommerce Proxy

Endpoint:

```text
GET /api/products
GET /api/products?metadata=1
```

File utama:

```text
src/app/api/products/route.ts
```

Proxy menangani kebutuhan katalog seperti:

- `page`
- `per_page`
- `search`
- sorting
- stock status
- SKU
- price range
- WooCommerce category lookup
- top-level category metadata
- ACF contract/fallback handling

Header pagination WooCommerce:

```text
X-WP-Total
X-WP-TotalPages
```

**Jangan mengubah proxy untuk menutupi masalah network laptop.** Connection reset yang pernah terjadi perlu dibedakan dari application error.

---

## 6. Category Contract

Filter publik menggunakan **top-level WooCommerce categories**.

Urutan UI yang dikunci:

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

Tidak boleh membuat kategori hardcoded baru di frontend hanya untuk memperbaiki tampilan.

---

## 7. Product Detail

Route:

```text
/product/[slug]
```

Tujuan halaman:

```text
SEO landing page
        +
Product information
        +
Conversion
        +
Admin workflow (planned)
```

Data penting yang dipertahankan:

- title/H1
- slug
- description
- short description
- SKU
- category
- condition
- location
- status
- images
- canonical
- Open Graph
- Product JSON-LD

Prinsip:

> **Jangan mengganti slug produk/category secara massal.**

---

## 8. Local / Transactional Landing Pages

Primary migration route:

```text
/jual-barang-bekas-restoran/[...slug]
```

Catch-all dipilih untuk mempertahankan dan mengembangkan hirarki URL lokasi tanpa mengunci frontend hanya pada satu segment `[location]`.

Contoh yang sudah diuji di localhost:

```text
/jual-barang-bekas-restoran/jakarta
/jual-barang-bekas-restoran/jakarta/jakarta-pusat
```

Resolver menggunakan data WordPress untuk menentukan halaman berdasarkan hirarki slug/parent.

Prinsip penting:

- Jangan membuat copy landing page kota secara hardcoded di frontend.
- Jangan mengganti URL existing hanya karena template baru belum selesai.
- Local/transactional page adalah aset SEO dan conversion, bukan sekadar halaman dekoratif.
- Content WordPress harus tetap menjadi source material; frontend bertugas merendernya dengan design system yang konsisten.

---

## 9. Planned Product Admin Workflow

Target operasional setelah BBK Core System siap:

```text
WordPress admin login
        ↓
Product Detail
        ↓
BBK Admin Controls
        ├── Buka Telegram
        └── Status
             ├── READY
             ├── DP
             └── SOLD
```

Saat `SOLD`:

```text
Admin klik SOLD
      ↓
BBK Core System
      ↓
update inventory/status
      ↓
catat tanggal terjual
      ↓
sinkron ke Google Sheets
      ↓
refresh/cache invalidation
      ↓
frontend menampilkan status terbaru
```

**Next.js tidak boleh menjadi sumber kebenaran Google Sheets.** Workflow final harus melewati backend/Core System.

---

## 10. UI/UX Direction

Target final bukan membuat Home saja terlihat bagus.

Semua template harus menggunakan bahasa visual yang sama:

```text
Header
Footer
Container
Typography
Button
Badge
Card
Input
Select
Breadcrumb
Section
CTA
Modal
Responsive rules
```

Template target:

```text
Home
Catalog / Archive
Product Detail
Page
Post
Local / Transactional Landing Page
```

Desktop dan mobile diperlakukan sebagai **satu design system**, bukan dua desain terpisah.

Target visual saat ini sudah mengarah ke:

- white/light content surfaces
- navy/dark brand sections
- BBKitchen yellow/amber accent
- emerald action/availability states
- shared spacing/container rules
- consistent rounded cards and borders

Palet harus dikonsolidasikan, bukan dibuat ulang per page.

---

## 11. Search & Catalog

Search global diarahkan ke:

```text
/api/products?search=...
```

Catalog menggunakan live WooCommerce data.

Pagination default:

```text
8 products/page
```

Tidak boleh mengambil seluruh katalog ribuan produk ke browser hanya untuk melakukan pagination atau filter sederhana.

Power type / sumber daya sudah dikeluarkan dari UI filter publik berdasarkan keputusan migrasi.

Shared header search adalah bagian dari design system dan harus tetap menjadi input yang benar-benar usable, bukan sekadar visual placeholder.

---

## 12. SEO Baseline

Baseline Google Search Console yang **diberikan user dari snapshot GSC 15 Agustus 2026**:

```text
16 months
Clicks        ~1.01K
Impressions   ~28.1K
CTR           3.6%
Avg position  9.5
```

Snapshot indexing:

```text
Indexed       ~2.29K
Not indexed   ~413
```

Snapshot query yang terlihat antara lain:

```text
bbkitchen
bbkitchen - sentra peralatan dapur restoran bekas jakarta | bukan baru kitchen kota tangerang selatan
jual barang bekas restoran jakarta
bukanbarukitchen
```

Ini adalah **baseline yang diberikan user**, bukan audit GSC yang dijalankan oleh repository.

### SEO migration rules

Pertahankan sebanyak mungkin:

- URL
- slug
- search intent
- H1 intent
- title intent
- description
- category intent
- internal linking
- canonical
- schema

Jangan:

- mengganti slug massal
- menghapus URL lama tanpa mapping
- mengarahkan semua URL ke homepage
- noindex massal tanpa alasan
- mengganti copy yang sudah menghasilkan traffic tanpa audit

---

## 13. Copy Strategy

Copy lama diperlakukan sebagai aset.

```text
OLD CONTENT
├── SEO GOLD       → pertahankan
├── CONVERSION     → upgrade
├── OUTDATED       → rewrite
└── GARBAGE        → hapus bila aman
```

Prioritas copy bukan menulis ulang semua 2.000+ halaman.

Fokus terlebih dahulu pada:

1. Homepage.
2. Landing pages dengan traffic/search intent kuat.
3. Category pages.
4. Product pages yang penting secara bisnis/SEO.
5. Local/transactional pages yang sudah terbukti mendapat impression/click.

---

## 14. Repository Structure

Struktur penting saat ini:

```text
.
├── public/
│   └── bbkitchen-logo.webp
├── src/
│   ├── app/
│   │   ├── api/products/route.ts
│   │   ├── jual-barang-bekas-restoran/[...slug]/page.tsx
│   │   ├── product/[slug]/page.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── AdminPanelModal.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetailModal.tsx
│   │   └── ...
│   ├── data/products.ts
│   ├── lib/wordpress.ts
│   ├── lib/woocommerce.ts
│   ├── types.ts
│   └── utils/formatters.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 15. Environment

WooCommerce server-side proxy membutuhkan:

```env
WOOCOMMERCE_API_URL=https://www.bukanbarukitchen.com/wp-json/wc/v3
WC_CONSUMER_KEY=...
WC_CONSUMER_SECRET=...
```

Credential tidak boleh masuk client bundle atau repository.

Dependency yang perlu diperhatikan: build migrasi yang sudah diuji menggunakan **Next.js 16.3.1**, sedangkan `package.json` sebelumnya menggunakan range `latest`. Dependency locking menjadi pekerjaan hardening.

---

## 16. Verification / Known Issues

Build lokal terakhir yang diverifikasi pada akhir Chat 1.3:

```text
npm run build
✓ Compiled successfully
✓ Finished TypeScript
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

Route yang terdeteksi pada migration build:

```text
/
/_not-found
/api/products
/api/wordpress
/jual-barang-bekas-restoran/[...slug]
/product/[slug]
```

### Stale `.next` issue

Setelah rename route dari:

```text
/jual-barang-bekas-restoran/[location]
```

menjadi:

```text
/jual-barang-bekas-restoran/[...slug]
```

Next.js sempat membaca generated validator lama di `.next/dev/types/validator.ts`. Membersihkan cache dengan:

```bash
rmdir /s /q .next
```

lalu menjalankan build ulang menyelesaikan masalah tersebut.

### Local connectivity issue

Pada 15 Agustus 2026 laptop mengalami:

```text
curl -I https://www.bukanbarukitchen.com
curl: (35) Recv failure: Connection was reset
```

dan endpoint WooCommerce juga mengalami connection reset sehingga:

```text
/api/products → 502 Bad Gateway
```

User melaporkan domain dapat dibuka melalui HP. Karena itu jangan menyimpulkan source code WooCommerce/Next.js rusak sebelum jalur DNS/TLS/firewall/IPv4/IPv6/network laptop diverifikasi.

### Other known limitations

- ACF authoritative filtering belum selesai.
- Related Products live berdasarkan kategori masih perlu difinalkan.
- Article/local landing typography dan content spacing belum final.
- Product detail belum memakai shared `Header.tsx` yang sama dengan Home/local landing.
- Shared header search masih perlu wiring agar usable di semua template.
- Staff/Owner PIN frontend bukan authentication production.
- `.env.example` perlu disinkronkan dengan variable WooCommerce.
- Dependency versions perlu dikunci saat hardening.

---

## 17. Migration Rules — WAJIB

1. **1 step = 1 file = 1 commit.**
2. Setelah step selesai: `git pull` → test → `npm run build` bila relevan.
3. Jangan kembali ke mock catalog sebagai source of truth.
4. Jangan mengubah slug tanpa alasan SEO yang terverifikasi.
5. Jangan mengirim WooCommerce credential ke browser.
6. Jangan membuat kategori publik hardcoded baru.
7. Bedakan `status_unit` ACF dengan WooCommerce `stock_status`.
8. Jangan mengambil seluruh katalog hanya untuk filter/pagination frontend.
9. Jangan membangun Google Sheets integration langsung di client.
10. **Setiap milestone/step yang mengubah project wajib didokumentasikan di README.**
11. README harus membedakan **implemented**, **verified**, **planned**, dan **known issue**.
12. Jangan menyelesaikan beberapa concern UI besar dalam satu commit hanya demi terlihat cepat.
13. Untuk visual migration, prioritaskan **Pareto**: data/route correctness → shared header/design system → conversion → polish.

---

## 18. Pareto Roadmap

### P0 — Fondasi

1. Stabilkan boundary BBK Core System.
2. Pastikan konektivitas WooCommerce dari development environment.
3. Konsolidasi shared design system.

### P1 — Conversion

4. Product detail UX.
5. Related Products live.
6. Admin controls: Telegram + READY/DP/SOLD.
7. SOLD → tanggal terjual → Google Sheets melalui Core System.

### P2 — Site-wide UX

8. Shared header/footer dan sticky behavior.
9. Home.
10. Catalog/archive.
11. Local/transactional landing pages.
12. Page/post templates.
13. Product detail menggunakan shared header.
14. Global search functional di seluruh template yang relevan.
15. Desktop/mobile QA.

### P3 — SEO / Growth

16. Canonical/schema/internal links.
17. Preserve URL equity.
18. Copy optimization berdasarkan GSC.
19. Category/local landing-page optimization.

### P4 — Production Hardening

20. Real authentication/authorization.
21. Dependency locking.
22. Environment documentation.
23. Performance/cache/error monitoring.
24. Production cutover + rollback plan.

---

## 19. Working Estimate

Dengan AI-assisted development dan user sebagai non-coder, target realistis untuk migrasi yang benar-benar production-minded adalah sekitar **4–6 minggu**, dengan buffer **6–8 minggu** bila Core System, authentication, network/hosting, SEO QA, atau production hardening menambah pekerjaan.

Estimasi ini adalah planning estimate, bukan deadline teknis.

---

## 20. Source of Truth

```text
Catalog product data
→ WooCommerce

Inventory metadata
→ WordPress / ACF

Business logic
→ BBK Core System (target architecture)

Automation / sourcing
→ BBK AI Growth Automation

Frontend experience
→ Next.js

SEO baseline
→ Existing WordPress URLs + user-provided GSC baseline
```

---

## 21. Migration Changelog

### 2026-08-15 — Chat 1.3 closed

- Shared migration direction dipertahankan: **new frontend, old SEO equity**.
- WooCommerce/WordPress tetap menjadi source of truth; Next.js tetap experience layer.
- WordPress API proxy dan metadata flow berhasil diverifikasi melalui localhost.
- Route local transactional diubah dari single `[location]` menjadi catch-all `[...slug]` untuk mendukung hirarki lokasi.
- `/jual-barang-bekas-restoran/jakarta` dan `/jual-barang-bekas-restoran/jakarta/jakarta-pusat` berhasil diuji di localhost.
- Resolver local page menggunakan data WordPress; frontend tidak membuat katalog/local content mock baru.
- Shared `Header.tsx` berhasil masuk ke local landing page dan sudah sticky.
- Homepage dan local landing sudah memakai arah visual BBKitchen yang lebih konsisten.
- Product detail sudah memiliki layout conversion, gallery, metadata, breadcrumb, dan schema; header masih menunggu konsolidasi shared component.
- Stale `.next` generated types setelah route rename berhasil dibereskan dengan clean build.
- Build terakhir berhasil clean dengan Next.js 16.3.1.
- Chat 1.3 sengaja ditutup sebelum melakukan over-engineering polish.

### Next chat starting point

```text
1. Product Detail → pakai shared Header.tsx
2. Shared Header search → functional di template yang relevan
3. Local/article content → rapikan H1/H2/H3/list/paragraph/spacing/palette
4. Setelah itu baru visual QA site-wide
```

---

## 22. Development Commands

```bash
npm install
npm run dev
npm run build
npm run start
```

Local development:

```text
http://localhost:3000
```
