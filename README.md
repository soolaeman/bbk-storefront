# BBKitchen Frontend — Next.js Migration

Frontend baru **Bukan Baru Kitchen / BBKitchen**.

Branch aktif:

```text
feature/nextjs-migration
```

> README ini adalah **living documentation** dan handoff resmi antar-conversation. Jangan mengulang pekerjaan yang sudah berstatus `done` tanpa alasan teknis.

---

# 🏁 CHECKPOINT — CHAT 1.4 CLOSED

## Status

```text
Chat 1.4 → ✅ CLOSED / DONE
Chat 1.5 → 🚀 NEXT
Branch   → feature/nextjs-migration
```

Checkpoint terakhir:

```text
26f3911f0d60c595656e85f1e9b65087bab86132
feat: add video covers to social media cards
```

Chat 1.4 fokus pada finalisasi visual homepage, hero, CTA/conversion, positioning MBG, WhatsApp flow, mascot experiment cleanup, dan social-video presentation.

---

# 1. TUJUAN MIGRASI

> **New frontend, old SEO equity.**

Target migrasi adalah membangun experience layer BBKitchen yang modern, cepat, konsisten, conversion-oriented, dan responsive tanpa membuang data live, URL/slug, taxonomy, content intent, serta SEO equity existing.

Prioritas:

1. UI/UX konsisten di Home, Catalog/Archive, Product Detail, Page, Post, dan transactional landing.
2. WooCommerce + WordPress/ACF tetap menjadi source of truth katalog.
3. URL/slug/search intent lama dipertahankan.
4. Product Detail menjadi halaman conversion utama.
5. Business logic inventory dipisahkan dari frontend.
6. SEO, copy, UX, dan data migration dikerjakan sebagai satu program.
7. Homepage difokuskan untuk **jualan unit/peralatan**, bukan kanal utama penerimaan barang borongan.

---

# 2. ARCHITECTURE BOUNDARY

```text
BBK AI GROWTH AUTOMATION
          ↓
WordPress / WooCommerce
          ↓
BBK CORE SYSTEM
          ↓
Next.js Data Layer
          ↓
Home / Catalog / Product / Pages
          ↓
Shared Design System
          ↓
Desktop + Mobile UX
```

### Boundary yang dikunci

- **WooCommerce**: produk, harga, stok, kategori, gambar, slug, description, short description.
- **WordPress/ACF**: inventory fields seperti `kode_unit`, `status_unit`, `kondisi_unit`, `lokasi_unit`, `link_telegram`.
- **BBK Core System**: business logic + integration layer WordPress.
- **BBK AI Growth Automation**: automation/sourcing pipeline terpisah dari frontend.
- **Next.js**: UI/UX, routing, rendering, SEO presentation, catalog dan conversion experience.
- **Google Sheets**: pencatatan penjualan melalui backend/Core System. Next.js tidak boleh menyimpan credential atau mengakses Google Sheets secara langsung.

---

# 3. STATUS MIGRATION SAAT INI

| Area | Status |
|---|---|
| Next.js App Router | ✅ |
| WooCommerce `/api/products` proxy | ✅ |
| `/api/products?metadata=1` | ✅ |
| Top-level category filter | ✅ |
| Server-side pagination, default 8/page | ✅ |
| Global catalog search | ✅ |
| `/product/[slug]` | ✅ |
| Product SEO metadata / canonical / OG / JSON-LD baseline | ✅ |
| Product gallery | ✅ |
| Breadcrumb + Salin Link | ✅ |
| Condition UI Baru / Bekas | ✅ |
| Local catch-all `/jual-barang-bekas-restoran/[...slug]` | ✅ |
| Shared Header baseline | ✅ |
| Homepage visual system | ✅ |
| Hero desktop/mobile backgrounds | ✅ |
| Hero mascot card | ✅ |
| Floating mascot di section lain | ❌ intentionally removed |
| Product WhatsApp message | ✅ |
| MBG CTA WhatsApp | ✅ |
| Produksi Baru CTA WhatsApp | ✅ |
| Social YouTube/TikTok covers | ✅ |
| Social iframe lazy-load on click | ✅ |
| Article typography finalization | ⏳ |
| Shared Header search audit | ⚠️ |
| Product Detail shared header audit | ⚠️ |
| Related Products final | ⏳ |
| ACF authoritative filtering | ⏳ |
| Admin/Core System workflow | ⏳ |
| SOLD → Google Sheets | ⏳ |

---

# 4. HOMEPAGE POSITIONING — FINAL DECISION

Homepage harus terasa seperti:

```text
BUY USED / READY-TO-USE KITCHEN EQUIPMENT
```

Fokus:

- unit tersedia
- kondisi unit
- hemat modal
- siap kirim seluruh Indonesia
- siap dipakai
- kategori produk
- WhatsApp inquiry
- Dapur MBG
- produksi baru sebagai secondary CTA

Jangan mengembalikan homepage menjadi halaman utama untuk orang yang ingin menjual barang/borongan.

---

# 5. HEADER NAVIGATION

CTA header yang sebelumnya **Jual Unit** diganti menjadi:

```text
Dapur MBG
Mau Produksi Baru?
```

### Dapur MBG — WhatsApp message

Semua CTA Dapur MBG yang mengarah ke WhatsApp menggunakan:

```text
Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.
```

### Mau Produksi Baru? — WhatsApp message

```text
Halo BBKitchen, mohon info peralatan dapur/restoran custom atau produksi baru
```

Jangan membuat cabang behavior berbeda tanpa keputusan baru yang eksplisit.

---

# 6. HERO — FINAL BASELINE

Asset:

```text
public/images/hero/bbkitchen-hero-desktop.webp
public/images/hero/bbkitchen-hero-mobile.webp
```

Hero menggunakan generated commercial background yang memadukan:

- chef/person BBKitchen
- hood stainless
- sink stainless
- kompor
- freezer
- dark navy commercial environment

Copy baseline:

```text
Peralatan Dapur Bekas untuk Resto & Usaha Kuliner
```

Description:

```text
Temukan unit peralatan dapur bekas yang masih layak pakai, siap digunakan, dan beberapa unit baru. Cocok untuk restoran, cafe, catering, bakery, hotel, dan dapur komersial. Unit tersedia satuan maupun kebutuhan usaha.
```

Benefit cards:

```text
Cek Kondisi
Informasi kondisi tiap unit

Hemat Modal
Pilihan unit bekas & baru

Siap Kirim
Seluruh Indonesia

Siap Dipakai
Unit dicek sebelum dikirim
```

CTA:

```text
Lihat Unit yang Tersedia →
```

CTA harus **scroll langsung ke catalog section**, bukan membuka route baru.

### Hero asset rules

- WebP bila memungkinkan.
- Desktop target 16:9.
- Mobile boleh memiliki background portrait/vertical terpisah.
- Jangan bake copy/UI ke gambar.
- Jangan mengandalkan crop desktop jika subjek penting akan terpotong di mobile.
- Equipment harus realistis secara skala/perspektif.
- Person tidak boleh terlihat terjepit oleh equipment.

---

# 7. MASCOT / PEOPLE ASSETS

```text
public/images/people/
├── bbkitchen-team-thumbs-up.webp
├── bbkitchen-chef-presenting.webp
├── bbkitchen-chef-pointing.webp
└── bbkitchen-chef-trust.webp
```

### Keputusan final Chat 1.4

**Jangan floating mascot di semua section.**

Eksperimen sebelumnya menyebabkan overlap, keluar container, double mascot, komposisi melayang, konflik map/card, dan mobile layout rusak.

Untuk saat ini:

- hero mascot boleh digunakan sebagai composition/card foreground bila memang rapi.
- mascot di Location/Service/Testimonial **tidak dipasang sebagai floating layer**.
- jika suatu hari dipakai lagi, desain composition-nya harus dibuat khusus untuk section tersebut; jangan sekadar menambahkan `absolute`.

---

# 8. SOCIAL VIDEO SECTION

Component:

```text
src/components/SocialMediaSection.tsx
```

Assets:

```text
public/images/social/youtube-shorts-cover.webp
public/images/social/tiktok-cover.webp
```

Target asset:

```text
1280 × 720 px
16:9
WebP
```

Behavior final:

1. Cover tampil terlebih dahulu.
2. Overlay play button tampil di atas cover.
3. iframe tidak langsung dimuat.
4. Klik card → iframe baru dirender.
5. Responsive desktop/mobile tetap menggunakan `aspect-video`.

Last commit yang mengimplementasikan ini:

```text
26f3911f0d60c595656e85f1e9b65087bab86132
```

---

# 9. WHATSAPP PRODUCT CONTRACT

Semua tombol WhatsApp product harus menghindari duplicate wording seperti `saya` ganda.

Format baseline:

```text
Halo Tim BBKitchen, saya tertarik dan ingin menanyakan penawaran harga dan ketersediaan untuk unit:

Nama Unit: {NAMA UNIT}

SKU/ID: {SKU}

Lokasi Unit: {LOKASI}

Kondisi: {BARU|BEKAS}

Apakah unit ini masih tersedia? Mohon info harga penawaran dan spesifikasi detailnya. Terima kasih.
```

Kondisi harus berasal dari data produk:

```text
BARU
BEKAS
```

---

# 10. PRODUCT CARD READY / SOLD

Card produk **tetap hidup ketika SOLD**.

```text
READY
→ Tanya WA

SOLD
→ Tanya Lainnya
```

Jangan mematikan card SOLD. Tujuannya menjaga discoverability, SEO value, dan kesempatan menawarkan alternatif.

---

# 11. MBG / SERVICE FLOW

Intent service:

```text
1. Beli Unit
2. Jual Unit
3. Dapur MBG
4. Produksi Baru
```

Namun positioning homepage tetap jualan.

Copy service baseline:

```text
Cari, Jual, atau Produksi Peralatan Dapur Resto & Dapur MBG
```

### Dapur MBG

WhatsApp:

```text
Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.
```

PDF katalog MBG:

```text
https://drive.google.com/file/d/1z7AQFK96ZgiyVbYAklXcaeULMK_zhbTS/view?pli=1
```

Label:

```text
PDF Katalog MBG
```

---

# 12. SEARCH & CATALOG

Search:

```text
/api/products?search=...
```

Pagination:

```text
8 products/page
```

Jangan mengambil seluruh katalog ribuan produk ke browser hanya untuk pagination/filter.

Power type/sumber daya tidak menjadi public filter berdasarkan keputusan migrasi.

---

# 13. CATEGORY CONTRACT

Top-level WooCommerce categories:

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

Jangan membuat kategori hardcoded baru hanya untuk memperbaiki visual.

---

# 14. PRODUCT DETAIL

Route:

```text
/product/[slug]
```

Data yang harus dipertahankan:

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

> **Jangan mengganti slug produk/category secara massal.**

---

# 15. LOCAL / TRANSACTIONAL LANDING

Route:

```text
/jual-barang-bekas-restoran/[...slug]
```

Contoh:

```text
/jual-barang-bekas-restoran/jakarta
/jual-barang-bekas-restoran/jakarta/jakarta-pusat
```

Content WordPress tetap menjadi source material. Jangan membuat copy kota hardcoded atau mengubah URL existing tanpa mapping/audit.

---

# 16. DATA CONTRACT

`src/data/products.ts` adalah type-only contract, bukan katalog mock.

Contract:

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

Inventory values:

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

ACF export `BBK INVENTORY` menggunakan `show_in_rest: 0`; jangan mengasumsikan ACF otomatis tersedia sebagai native WooCommerce REST filter.

---

# 17. WOOCOMMERCE PROXY

```text
GET /api/products
GET /api/products?metadata=1
```

File:

```text
src/app/api/products/route.ts
```

Proxy menangani page/per_page/search/sorting/stock/SKU/price/category metadata dan fallback ACF contract.

Pagination headers:

```text
X-WP-Total
X-WP-TotalPages
```

Jangan mengubah proxy hanya untuk menutupi connection reset/network laptop.

---

# 18. ADMIN / CORE SYSTEM — PLANNED

Target workflow:

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

Saat SOLD:

```text
Admin klik SOLD
      ↓
BBK Core System
      ↓
update inventory/status
      ↓
catat tanggal terjual
      ↓
sinkron Google Sheets
      ↓
refresh/cache invalidation
      ↓
frontend menampilkan status terbaru
```

Next.js bukan source of truth Google Sheets.

---

# 19. SEO BASELINE

Baseline GSC yang diberikan user dari snapshot 15 Agustus 2026:

```text
16 months
Clicks        ~1.01K
Impressions   ~28.1K
CTR           3.6%
Avg position  9.5

Indexed       ~2.29K
Not indexed   ~413
```

Query penting:

```text
bbkitchen
bukanbarukitchen
jual barang bekas restoran jakarta
bbkitchen - sentra peralatan dapur restoran bekas jakarta | bukan baru kitchen kota tangerang selatan
```

Migration rules:

- pertahankan URL
- pertahankan slug
- pertahankan search intent
- pertahankan H1/title intent
- pertahankan canonical/schema/internal linking
- jangan slug massal
- jangan hapus URL tanpa mapping
- jangan redirect semua URL ke homepage
- jangan noindex massal tanpa alasan

---

# 20. DESIGN SYSTEM

Semua template harus memakai bahasa visual yang sama:

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

Target:

```text
Home
Catalog / Archive
Product Detail
Page
Post
Local / Transactional Landing Page
```

Visual language:

- white/light surfaces
- navy/dark brand sections
- BBKitchen yellow/amber accent
- emerald action/availability states
- shared spacing/container rules
- rounded cards
- subtle borders
- premium commercial photography

Desktop dan mobile adalah **satu design system**, bukan dua desain terpisah.

---

# 21. IMPORTANT REPOSITORY ASSETS

```text
public/images/hero/
├── bbkitchen-hero-desktop.webp
└── bbkitchen-hero-mobile.webp

public/images/people/
├── bbkitchen-team-thumbs-up.webp
├── bbkitchen-chef-presenting.webp
├── bbkitchen-chef-pointing.webp
└── bbkitchen-chef-trust.webp

public/images/social/
├── youtube-shorts-cover.webp
└── tiktok-cover.webp
```

Important components:

```text
src/components/Header.tsx
src/components/Footer.tsx
src/components/ProductCard.tsx
src/components/SocialMediaSection.tsx
src/components/CategoryFilter.tsx
src/components/ProductDetailModal.tsx
src/components/AdminPanelModal.tsx
```

Important routes/files:

```text
src/app/page.tsx
src/app/catalog/page.tsx
src/app/product/[slug]/page.tsx
src/app/jual-barang-bekas-restoran/[...slug]/page.tsx
src/app/api/products/route.ts
src/data/products.ts
src/lib/wordpress.ts
src/lib/woocommerce.ts
```

---

# 22. ENVIRONMENT / BUILD

```env
WOOCOMMERCE_API_URL=https://www.bukanbarukitchen.com/wp-json/wc/v3
WC_CONSUMER_KEY=...
WC_CONSUMER_SECRET=...
```

Credential tidak boleh masuk client bundle/repository.

Build baseline yang pernah diverifikasi:

```text
Next.js 16.3.1
```

---

# 23. CHAT 1.5 — NEXT STARTING POINT

Conversation baru:

```text
1.5 BBKitchen Next.js Migration
```

**Tidak perlu mengulang fondasi migration.** Baca README ini, audit current repository/code, lalu lanjut incremental.

### Prioritas 1.5

1. Audit visual homepage dari atas sampai bawah setelah final asset integration.
2. Audit responsive mobile: hero, header, catalog, product cards, CTA, social video, footer.
3. Audit shared Header dan pastikan global search benar-benar functional di semua template yang membutuhkan.
4. Konsolidasikan Product Detail agar memakai shared Header.
5. Rapikan Article/Local Landing typography: H1/H2/H3, paragraph, list, spacing, reading width, mobile.
6. Finalisasi READY/SOLD Product Card behavior.
7. Audit seluruh WhatsApp message generator agar tidak ada duplicate wording.
8. Audit MBG CTA + PDF CTA + Produksi Baru CTA agar behavior konsisten.
9. Jalankan production build dan bereskan error/warning application yang valid.
10. Setelah visual baseline stabil, lanjut SEO/performance/accessibility hardening.

### Jangan dilakukan tanpa alasan kuat

- Jangan mengulang eksperimen floating mascot di semua section.
- Jangan mengganti hero background final tanpa membandingkan desktop + mobile.
- Jangan mengubah slug existing.
- Jangan membuat mock catalog baru.
- Jangan memindahkan inventory business logic ke Next.js jika seharusnya di Core System.
- Jangan memasukkan credential WooCommerce/Google ke client.
- Jangan mengorbankan mobile demi desktop composition.

---

# 24. HANDOFF PROMPT — CHAT 1.5

> **BBKitchen Next.js Migration 1.5** melanjutkan branch `feature/nextjs-migration` dari checkpoint Chat 1.4. README repository adalah source of context. Chat 1.4 sudah selesai. Fokus sekarang bukan migrasi fondasi lagi, tetapi finalisasi visual/UX, responsive behavior, shared components, CTA consistency, SEO/performance hardening, dan persiapan production. Jangan mengulang pekerjaan yang sudah `done`. Baca README terlebih dahulu, audit repository/current code, lalu kerjakan secara incremental dan commit setiap milestone yang terverifikasi.

---

# 25. DEFINITION OF DONE

Sebuah perubahan dianggap `done` jika:

```text
code implemented
      ↓
localhost verified
      ↓
desktop verified
      ↓
mobile verified
      ↓
no obvious layout regression
      ↓
build verified
      ↓
commit created
      ↓
README/status updated when milestone-level
```

> **Jangan menyebut sesuatu `done` hanya karena kode sudah ditulis.**

---

# FINAL CHECKPOINT

```text
Chat 1.4  → ✅ CLOSED
Chat 1.5  → 🚀 NEXT
Branch    → feature/nextjs-migration
Last code checkpoint → 26f3911f0d60c595656e85f1e9b65087bab86132
```

**Next conversation: `1.5 BBKitchen Next.js Migration`**