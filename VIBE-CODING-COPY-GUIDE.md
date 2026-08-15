# BBKitchen — Vibe Coding Copy Guide

> **Untuk yang awam / vibe coding:** kalau cuma mau mengganti tulisan di website, **jangan langsung utak-atik logic atau layout**. Cari copy-nya di file yang tepat, ubah teksnya, lalu build.
>
> Prinsip aman: **copy dulu, logic belakangan.** Jangan mengubah nama variable, function, URL, API, class Tailwind, atau struktur JSX kalau kebutuhanmu cuma mengganti tulisan.

---

# 1. CARA PALING GAMPANG

Kalau mau mengganti tulisan tertentu:

```text
1. Cari kalimat lama di repository
        ↓
2. Lihat file tempat kalimat ditemukan
        ↓
3. Ubah teksnya saja
        ↓
4. Save
        ↓
5. npm run build
        ↓
6. Kalau clean → commit
```

Di VS Code:

```text
Ctrl + Shift + F
```

lalu cari **kalimat yang tampil di website**.

Contoh:

```text
Cari, Jual, atau Produksi Peralatan Dapur Resto & Dapur MBG
```

Jangan langsung mencari `HeroSection` kalau belum tahu komponennya. **Cari copy yang terlihat di layar terlebih dahulu.**

---

# 2. PETA CEPAT — COPY ADA DI MANA?

| Yang mau diubah | File utama yang harus dicek |
|---|---|
| Hero headline | `src/components/HeroSection.tsx` |
| Hero subheadline | `src/components/HeroSection.tsx` |
| Hero badge / benefit | `src/components/HeroSection.tsx` |
| Tombol Hero | `src/components/HeroSection.tsx` |
| Copy Katalog | `src/components/ProductCatalogSection.tsx` / section katalog terkait |
| Card produk | `src/components/ProductCard.tsx` |
| Tombol `Tanya WA` / `Tanya Lainnya` | `src/components/ProductCard.tsx` |
| Pesan WhatsApp produk | `src/components/ProductCard.tsx` / helper yang dipakai Product Card |
| Header menu | `src/components/Header.tsx` |
| Tombol Dapur MBG | `src/components/Header.tsx` dan/atau component CTA yang dipakai bersama |
| Tombol Produksi Baru | `src/components/Header.tsx` dan/atau component CTA yang dipakai bersama |
| Search placeholder | `src/components/Header.tsx` |
| Footer headline | `src/components/Footer.tsx` |
| Footer navigasi | `src/components/Footer.tsx` |
| Footer CTA | `src/components/Footer.tsx` |
| Social Media headline | `src/components/SocialMediaSection.tsx` |
| Copy YouTube Shorts | `src/components/SocialMediaSection.tsx` |
| Copy TikTok | `src/components/SocialMediaSection.tsx` |
| Instagram / Facebook / Threads / Pinterest copy | `src/components/SocialMediaSection.tsx` |
| Location section | `src/components/LocationSection.tsx` |
| Service / layanan | `src/components/ServiceSection.tsx` |
| Testimonial / kata mereka | `src/components/TestimonialSection.tsx` |
| Product Detail copy | `src/app/product/[slug]/page.tsx` + component yang dipakai halaman tersebut |
| Local landing / artikel | `src/app/jual-barang-bekas-restoran/[...slug]/page.tsx` + renderer/component terkait |

> **Catatan:** nama component di atas adalah peta berdasarkan architecture yang sudah diketahui. Kalau pencarian kalimat tidak menemukan file tersebut, **ikuti hasil Ctrl+Shift+F**, jangan memaksa mengubah file hanya karena namanya terlihat cocok.

---

# 3. HERO

## File utama

```text
src/components/HeroSection.tsx
```

### Contoh copy yang sekarang pernah dikunci

```text
Cari, Jual, atau Produksi Peralatan Dapur Resto & Dapur MBG
```

CTA:

```text
Lihat Unit yang Tersedia →
```

CTA tersebut **bukan sekadar copy**. Saat ini fungsinya smooth-scroll ke katalog.

### ⚠️ Kalau cuma mau ganti tulisan

Aman:

```tsx
<h1>
  Copy baru di sini
</h1>
```

Jangan menghapus:

```tsx
onClick={...}
```

atau mengganti logic scroll hanya karena ingin mengganti label tombol.

---

# 4. HEADER

## File utama

```text
src/components/Header.tsx
```

Header adalah area sensitif karena pernah mengalami **Server/Client Component boundary** akibat penggunaan `useState`.

### Copy yang pernah dikunci

```text
Dapur MBG
```

WhatsApp MBG:

```text
Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.
```

Produksi Baru:

```text
Halo BBKitchen, mohon info peralatan dapur/restoran custom atau produksi baru
```

### ⚠️ Jangan

- menghapus `'use client'` jika masih diperlukan
- mengubah `useState`
- mengubah navigation logic
- mengubah search logic
- mengganti URL hanya karena ingin mengganti label menu

Kalau cuma copy, **ubah string-nya saja.**

---

# 5. PRODUCT CARD

## File utama

```text
src/components/ProductCard.tsx
```

Area ini penting karena copy terhubung dengan status produk.

Contract yang sudah dikunci:

```text
READY → Tanya WA
SOLD  → Tanya Lainnya
```

### ⚠️ Jangan mengubah logic status hanya untuk mengganti copy

Misalnya kalau mau:

```text
Tanya WA
```

menjadi:

```text
Cek Ketersediaan
```

cukup cari string tersebut dan ubah labelnya.

Jangan menghapus conditional:

```text
READY
SOLD
```

karena itu behavior, bukan copy.

---

# 6. WHATSAPP PRODUCT

Pesan produk sekarang mengikuti format:

```text
Halo Tim BBKitchen, saya tertarik dan ingin menanyakan penawaran harga dan ketersediaan untuk unit:

Nama Unit: {NAMA UNIT}

SKU/ID: {SKU}

Lokasi Unit: {LOKASI}

Kondisi: {BARU|BEKAS}

Apakah unit ini masih tersedia? Mohon info harga penawaran dan spesifikasi detailnya. Terima kasih.
```

### Kalau mau mengubah wording

Cari bagian yang menghasilkan:

```text
Halo Tim BBKitchen
```

atau:

```text
Nama Unit:
SKU/ID:
Lokasi Unit:
Kondisi:
```

**Jangan menghapus placeholder/data variable.**

Contoh yang harus tetap ada:

```text
{product.name}
{product.sku}
{product.location}
{product.condition}
```

Nama variable persisnya harus mengikuti code yang ada. Jangan menggantinya dengan nama tebakan.

---

# 7. DAPUR MBG

Copy utama:

```text
Dapur MBG
```

WA:

```text
Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.
```

PDF katalog:

```text
https://drive.google.com/file/d/1z7AQFK96ZgiyVbYAklXcaeULMK_zhbTS/view?pli=1
```

### ⚠️ Link bukan copy biasa

Kalau mau mengubah teks tombol:

```text
PDF Katalog Dapur MBG
```

boleh.

Kalau mau mengubah URL PDF, pastikan yang diubah adalah **URL target**, bukan sekadar label tombol.

---

# 8. PRODUKSI BARU

Copy CTA:

```text
Mau Produksi Baru?
```

WA:

```text
Halo BBKitchen, mohon info peralatan dapur/restoran custom atau produksi baru
```

Kalau hanya mau mengubah tulisan tombol, ubah label.

Kalau mau mengubah pesan WhatsApp, cari string pesan tersebut.

Jangan mengubah event handler hanya untuk mengganti copy.

---

# 9. FOOTER

## File utama

```text
src/components/Footer.tsx
```

Footer memiliki area:

```text
Logo
Deskripsi
Jelajahi BBKitchen
Kategori produk
CTA
Social media
Kontak
```

### Copy kategori yang pernah dikunci

```text
Jelajahi BBKitchen

Kompor & Burner
Deep Fryer
Chiller & Freezer
Oven & Bakery
Stainless Fabrication
Mesin Pemroses Makanan
```

### CTA

```text
Butuh Unit?
```

Copy:

```text
Cek katalog, tanyakan kode unit, atau hubungi BBKitchen untuk memastikan stok terbaru.
```

WA:

```text
Halo Tim BBKitchen, saya ingin konsultasi kebutuhan peralatan dapur komersial untuk usaha saya...
```

> Jika pesan WA/footer sudah dibuat lewat helper atau constant bersama, ubah sumber bersama tersebut daripada membuat versi kedua. Kalau tidak yakin, lakukan pencarian global terhadap kalimat lama.

---

# 10. SOCIAL MEDIA

## File utama

```text
src/components/SocialMediaSection.tsx
```

Layout yang dikunci:

```text
YouTube Shorts | TikTok
YouTube Shorts | TikTok
YouTube Shorts | TikTok
YouTube Shorts | TikTok
```

Social lainnya berada sebagai social links sesuai desain final.

Cover asset:

```text
public/images/social/youtube-shorts-cover.webp
public/images/social/tiktok-cover.webp
```

Copy video saat ini:

```text
YouTube Shorts
Aktivitas, unit terbaru, dan proses BBKitchen.

TikTok
Lihat konten dan aktivitas BBKitchen.
```

### ⚠️ Jangan menghapus lazy iframe behavior

Flow yang dikunci:

```text
cover
  ↓ klik
iframe video
```

Jadi jangan mengganti seluruh `videoPanel()` hanya karena ingin mengubah caption.

---

# 11. SERVICE / LAYANAN

## File

```text
src/components/ServiceSection.tsx
```

Kalau ingin mengubah judul layanan, deskripsi, atau label CTA, cari copy langsung di file ini.

### Penting

Jangan kembali menambahkan layanan:

```text
Mau Jual Unit?
Jual Unit ke BBKitchen
```

sebagai CTA utama homepage tanpa keputusan baru.

Positioning homepage saat ini:

> **fokus jualan unit/peralatan.**

Borongan/sell-to-BBKitchen bukan fokus utama homepage.

---

# 12. LOCATION / MAP

## File

```text
src/components/LocationSection.tsx
```

Kalau mau mengganti:

- judul lokasi
- deskripsi lokasi
- CTA
- label lokasi

mulai dari file ini.

### ⚠️ Jangan menambahkan mascot absolute secara sembarangan

Chat sebelumnya sudah membuktikan floating mascot di sekitar map menyebabkan:

```text
overlap
floating image
map/card conflict
mobile breakage
```

---

# 13. TESTIMONIAL

## File

```text
src/components/TestimonialSection.tsx
```

Untuk mengganti:

```text
nama customer
jabatan/perusahaan
review
rating
```

cari data review di component/data source yang digunakan file tersebut.

### Review asli yang sudah diberikan

Contoh customer:

```text
Rio - Titik Terang Coffee
Arief Nur Rahman - PT Bahari Mega Prestasi
Hadi - Owner SPPG Jogja
```

Jangan mengarang review baru sebagai review customer nyata.

---

# 14. PRODUCT DETAIL

Route:

```text
src/app/product/[slug]/page.tsx
```

Namun Product Detail bisa menggunakan shared components.

Kalau copy yang dicari tidak ditemukan di `page.tsx`:

```text
Ctrl + Shift + F
```

Cari kalimat persisnya.

### Jangan

Jangan mengubah:

```text
slug
canonical
metadata
JSON-LD
product ID
SKU variable
```

hanya karena ingin mengganti teks yang tampil.

---

# 15. LOCAL LANDING / ARTIKEL

Route:

```text
src/app/jual-barang-bekas-restoran/[...slug]/page.tsx
```

Halaman ini memiliki hubungan dengan WordPress content.

Jika ingin mengganti copy artikel yang berasal dari WordPress, **jangan langsung mengedit Next.js sebagai workaround** sebelum memastikan apakah teks tersebut source-nya dari WordPress.

Rule:

```text
Copy hardcoded di Next.js
→ edit component

Copy berasal dari WordPress
→ edit source WordPress

Copy berasal dari API
→ jangan patch frontend tanpa memahami contract
```

---

# 16. CARA MEMBEDAKAN COPY VS LOGIC

## COPY

Biasanya terlihat seperti:

```tsx
<h1>Judul</h1>
<p>Deskripsi</p>
<button>Tanya WA</button>
<span>Siap Kirim</span>
```

Boleh diganti langsung.

## LOGIC

Contoh:

```tsx
onClick={handleWhatsApp}
```

```tsx
if (status === 'sold')
```

```tsx
router.push(...)
```

```tsx
fetch('/api/products')
```

```tsx
useState(...)
```

Jangan disentuh kalau kebutuhanmu cuma mengganti copy.

---

# 17. KALAU COPY TIDAK KETEMU

Ikuti urutan ini.

### Step 1

```text
Ctrl + Shift + F
```

Cari 3–8 kata unik dari tulisan di website.

### Step 2

Kalau tidak ketemu, coba cari potongan yang lebih pendek.

Contoh:

```text
Siap Kirim
```

→ bukan seluruh paragraf.

### Step 3

Kalau masih tidak ketemu, kemungkinan copy berasal dari:

```text
API
WordPress
WooCommerce
ACF
data/config
component child
```

### Step 4

**Jangan langsung membuat copy baru di frontend.**

Tanyakan / audit source terlebih dahulu.

---

# 18. CARA AMAN MENGUBAH COPY

Gunakan pola:

```diff
- <h1>Copy lama</h1>
+ <h1>Copy baru</h1>
```

Jangan melakukan ini:

```diff
- <button onClick={handleSomething}>Copy lama</button>
+ <button>Copy baru</button>
```

karena kamu tidak sengaja menghapus behavior.

---

# 19. SETELAH GANTI COPY

Minimal:

```bash
npm run build
```

Jika build:

```text
✓ Compiled successfully
✓ Finished TypeScript
```

lanjut cek localhost.

Untuk copy-only change, lakukan visual check:

```text
Desktop
Mobile
```

Kemudian commit.

---

# 20. ATURAN EMAS VIBE CODING BBKITCHEN

### 🟢 AMAN

```text
Ganti kalimat
Ganti judul
Ganti label tombol
Ganti deskripsi
Ganti caption
Ganti placeholder
```

### 🟡 CEK DULU

```text
Ganti URL
Ganti WhatsApp message
Ganti link PDF
Ganti nama kategori
Ganti nama status
Ganti slug
```

### 🔴 JANGAN ASAL UBAH

```text
API
fetch
useState
useEffect
router
slug
canonical
JSON-LD
WooCommerce contract
ACF contract
product status logic
server/client boundary
authentication
environment variables
```

---

# 21. KALAU MAU MINTA AI / CHATGPT MENGUBAH COPY

Pakai prompt sederhana ini:

```text
Cari copy berikut di repository:

"COPY LAMA"

Ganti menjadi:

"COPY BARU"

ATURAN:
- hanya ubah copy
- jangan ubah logic
- jangan ubah layout
- jangan ubah class Tailwind
- jangan ubah URL
- jangan ubah API contract
- jangan ubah variable/function
- gunakan file yang memang menjadi source copy tersebut
- setelah perubahan, beri tahu file yang berubah dan lakukan npm run build
```

Kalau belum yakin source copy-nya:

```text
Jangan coding dulu.
Cari dulu source copy "COPY LAMA" di repository,
beri tahu file dan line/component yang menjadi sumbernya,
baru setelah itu ubah.
```

---

# 22. COPY INVENTORY — QUICK REFERENCE

```text
HERO
└── src/components/HeroSection.tsx

HEADER
└── src/components/Header.tsx

KATALOG
├── src/components/ProductCard.tsx
├── src/components/CategoryFilter.tsx
└── src/app/catalog/page.tsx

PRODUCT DETAIL
└── src/app/product/[slug]/page.tsx

LOCATION
└── src/components/LocationSection.tsx

SERVICE
└── src/components/ServiceSection.tsx

TESTIMONIAL
└── src/components/TestimonialSection.tsx

SOCIAL
└── src/components/SocialMediaSection.tsx

FOOTER
└── src/components/Footer.tsx

LOCAL / ARTICLE
└── src/app/jual-barang-bekas-restoran/[...slug]/page.tsx

API
└── src/app/api/products/route.ts

DATA CONTRACT
└── src/data/products.ts

WORDPRESS
└── src/lib/wordpress.ts

WOOCOMMERCE
└── src/lib/woocommerce.ts
```

---

# 23. FINAL RULE

Kalau tujuanmu cuma:

> **“Gue mau ganti tulisan yang tampil di website.”**

maka workflow-nya harus:

```text
Cari tulisan
     ↓
Temukan source file
     ↓
Ubah STRING saja
     ↓
Build
     ↓
Cek desktop + mobile
     ↓
Commit
```

**Jangan memperbaiki architecture yang tidak rusak hanya karena sedang mengganti copy.**

Dan kalau AI mengatakan:

> “sekalian saya refactor component-nya...”

untuk tugas copy sederhana:

**STOP. Jangan lakukan.**

BBKitchen migration menggunakan prinsip:

> **small change → verify → commit → lanjut.**
