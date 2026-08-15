# BBKitchen Copy Editing Guide

> **Tujuan:** satu tempat rujukan untuk mencari dan mengganti seluruh copy/text pada tombol, CTA, dan pesan WhatsApp di frontend BBKitchen.
>
> **Rule:** sebelum mengubah copy, cek source component terbaru di branch `feature/nextjs-migration`. Jangan mengandalkan nama file dari memory jika component sudah direfactor.

---

## 1. Prinsip Cepat

Untuk mengganti copy, bedakan 3 hal:

```text
LABEL / TEXT
= tulisan yang terlihat di tombol

ACTION / ROUTING
= apa yang dilakukan ketika tombol diklik

MESSAGE
= copy yang dikirim ke WhatsApp / external destination
```

**Jangan mengubah ACTION hanya karena ingin mengubah LABEL.**

Contoh:

```text
"Tanya WA"
```

boleh berubah menjadi:

```text
"Cek Ketersediaan"
```

tanpa mengubah fungsi WhatsApp-nya.

---

# 2. QUICK MAP — FILE YANG PERTAMA DICEK

| Area | File utama | Yang dicari |
|---|---|---|
| Hero | `src/components/HeroSection.tsx` | headline, CTA, MBG, Produksi Baru, katalog |
| Homepage service/consultation | `src/components/KitchenConsultationBanner.tsx` | CTA layanan, MBG, Produksi Baru, katalog |
| Product card | `src/components/ProductCard.tsx` | `Tanya WA`, `Tanya Lainnya`, READY/SOLD |
| Product Detail | `src/app/product/[slug]/page.tsx` + component terkait | CTA WhatsApp, copy produk |
| Header | `src/components/Header.tsx` | nav labels, CTA header, search placeholder |
| Footer | `src/components/Footer.tsx` | CTA, navigation, WhatsApp copy |
| Social | `src/components/SocialMediaSection.tsx` | YouTube/TikTok labels + social copy |
| Category | `src/components/CategoryFilter.tsx` | category labels / filter copy |
| Local landing | `src/app/jual-barang-bekas-restoran/[...slug]/page.tsx` | local page headings / CTA |
| Global product API | `src/app/api/products/route.ts` | **bukan tempat copy UI**; hanya ubah jika contract/API message memang perlu |

> **Catatan:** daftar ini adalah starting map, bukan jaminan bahwa setiap copy hanya berada di satu file. Jika sebuah string tidak ditemukan, gunakan global search.

---

# 3. GLOBAL SEARCH — CARA TERCEPAT

Di VS Code gunakan:

```text
Ctrl + Shift + F
```

Cari keyword berikut satu per satu:

```text
Tanya WA
Tanya Lainnya
WhatsApp
Halo Tim BBKitchen
Halo BBKitchen
Dapur MBG
Produksi Baru
Mau Produksi Baru
Lihat Unit yang Tersedia
Lihat Unit Tersedia
Konsultasi
Titip Cari
Siap Kirim
Seluruh Indonesia
READY
SOLD
Cari
Katalog
Tanya Unit
```

Atau dari terminal PowerShell:

```powershell
Get-ChildItem -Recurse -File src | Select-String -Pattern "Tanya WA|Tanya Lainnya|WhatsApp|Dapur MBG|Produksi Baru|Lihat Unit|Konsultasi|Titip Cari"
```

Jika memakai ripgrep:

```bash
rg -n "Tanya WA|Tanya Lainnya|WhatsApp|Dapur MBG|Produksi Baru|Lihat Unit|Konsultasi|Titip Cari" src
```

---

# 4. HEADER — COPY NAVIGATION & CTA

**File:**

```text
src/components/Header.tsx
```

### Area yang biasanya diubah

```text
navigation labels
search placeholder
CTA header
staff/owner CTA
Dapur MBG CTA
Konsultasi CTA
```

### Contract yang saat ini dikunci

```text
Jual Unit → Dapur MBG
```

Pesan Dapur MBG:

```text
Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.
```

**Penting:** jangan membuat versi pesan WA baru di Header jika helper/shared contract sudah tersedia. Cari implementation terlebih dahulu.

---

# 5. HERO — COPY UTAMA & CTA

**File:**

```text
src/components/HeroSection.tsx
```

### Current positioning

```text
Cari, Jual, atau Produksi Peralatan Dapur Resto & Dapur MBG
```

### CTA utama

```text
Lihat Unit yang Tersedia →
```

Action:

```text
smooth-scroll → catalog section
```

**Jangan mengubah action menjadi modal/source request hanya karena label berubah.**

### CTA Dapur MBG

Action:

```text
WhatsApp langsung
```

Message:

```text
Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.
```

### CTA Produksi Baru

Message:

```text
Halo BBKitchen, mohon info peralatan dapur/restoran custom atau produksi baru
```

---

# 6. KITCHEN CONSULTATION / SERVICE BANNER

**File:**

```text
src/components/KitchenConsultationBanner.tsx
```

Gunakan file ini untuk mencari copy CTA layanan yang muncul pada banner/section konsultasi.

### Dapur MBG

**Action wajib:** direct WhatsApp.

```text
Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.
```

### Mau Produksi Baru?

**Action wajib:** direct WhatsApp.

```text
Halo BBKitchen, mohon info peralatan dapur/restoran custom atau produksi baru
```

### Katalog Dapur MBG

Jika CTA PDF masih digunakan di suatu context, destination yang dikunci:

```text
https://drive.google.com/file/d/1z7AQFK96ZgiyVbYAklXcaeULMK_zhbTS/view?pli=1
```

Jika desain/flow terbaru menyatakan CTA tersebut harus WA langsung, **ikuti contract terbaru di README**, bukan copy lama di component.

---

# 7. PRODUCT CARD — COPY READY / SOLD / WHATSAPP

**File utama:**

```text
src/components/ProductCard.tsx
```

### Status contract

```text
READY → Tanya WA
SOLD  → Tanya Lainnya
```

### Penting

SOLD card **tidak boleh dimatikan hanya karena copy berubah**.

Target behavior:

```text
READY
  ↓
Tanya WA
  ↓
WhatsApp dengan data unit

SOLD
  ↓
Tanya Lainnya
  ↓
tetap discoverable / dapat membuka detail atau flow yang sesuai
```

---

# 8. WHATSAPP PRODUK — MESSAGE CONTRACT

Gunakan format berikut untuk **semua tombol WA produk**, baik BARU maupun BEKAS.

```text
Halo Tim BBKitchen, saya tertarik dan ingin menanyakan penawaran harga dan ketersediaan untuk unit:

Nama Unit: {NAMA UNIT}

SKU/ID: {SKU}

Lokasi Unit: {LOKASI}

Kondisi: {BARU|BEKAS}

Apakah unit ini masih tersedia? Mohon info harga penawaran dan spesifikasi detailnya. Terima kasih.
```

### Jangan lakukan

Jangan menghasilkan format satu baris seperti:

```text
Nama Unit: ... SKU/ID: ... Lokasi Unit: ... Kondisi: ...
```

Jangan mengulang:

```text
saya ... saya ...
```

Jangan menambahkan status internal seperti:

```text
Sisa Proyek / Lelang
```

ke message customer kecuali contract baru memang memintanya.

---

# 9. WHATSAPP LAYANAN — MESSAGE CONTRACT

## Dapur MBG

Gunakan tepat:

```text
Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.
```

**Bukan:**

```text
Halo Tim BBKitchen, saya ingin bertanya perihal: Saya ingin info kebutuhan...
```

Masalah tersebut sebelumnya menyebabkan `saya` muncul dua kali.

## Produksi Baru

Gunakan tepat:

```text
Halo BBKitchen, mohon info peralatan dapur/restoran custom atau produksi baru
```

---

# 10. FOOTER — COPY & CTA

**File:**

```text
src/components/Footer.tsx
```

Cari terutama:

```text
Butuh Unit?
Tanya via WhatsApp
Dapur MBG
Mau Produksi Baru?
Jelajahi BBKitchen
```

### Footer positioning

Homepage fokus jualan.

Hindari mengembalikan copy yang terlalu menonjolkan:

```text
Mau Jual Unit?
Terima Borongan
Jual Barang ke BBKitchen
```

karena positioning homepage yang dikunci adalah **menjual unit/peralatan**.

### Dapur MBG

Direct WhatsApp dengan message contract MBG.

### Produksi Baru

Direct WhatsApp dengan message contract Produksi Baru.

---

# 11. PRODUCT DETAIL — COPY CTA

**File utama:**

```text
src/app/product/[slug]/page.tsx
```

Jika CTA sebenarnya berada pada component child, lakukan global search terhadap:

```text
Tanya WA
WhatsApp
Nama Unit
SKU/ID
Lokasi Unit
Kondisi
```

Product Detail harus menggunakan **product WhatsApp contract yang sama** dengan Product Card.

Jangan criar format WA kedua hanya untuk Product Detail.

---

# 12. SOCIAL MEDIA SECTION

**File:**

```text
src/components/SocialMediaSection.tsx
```

Copy yang berkaitan dengan video/social:

```text
YouTube Shorts
TikTok
Aktivitas, unit terbaru, dan proses BBKitchen.
Lihat konten dan aktivitas BBKitchen.
```

Asset cover:

```text
public/images/social/youtube-shorts-cover.webp
public/images/social/tiktok-cover.webp
```

Jika hanya ingin mengubah copy, **jangan menyentuh iframe/embed contract**.

---

# 13. CATEGORY FILTER

**File:**

```text
src/components/CategoryFilter.tsx
```

Category labels harus mengikuti metadata/category contract.

Current top-level categories:

```text
Meja Stainless
Sink Stainless
Rak Stainless
Hood Stainless
Kompor
Chiller
Ice System
Freezer
Showcase
Peralatan Dapur Bekas Lainnya
```

**Jangan membuat kategori baru hanya untuk memperbaiki copy UI.**

WooCommerce tetap source of truth.

---

# 14. LOCAL LANDING / ARTICLE COPY

**File:**

```text
src/app/jual-barang-bekas-restoran/[...slug]/page.tsx
```

Halaman local menggunakan catch-all karena struktur URL WordPress hierarchical.

Jika ingin mengganti:

- H1
- intro
- CTA
- local copy
- heading artikel

ubah presentation/copy layer tanpa merusak:

```text
[...slug]
params
resolver
SEO slug
canonical
```

---

# 15. COPY YANG JANGAN DIGANTI SEMBARANGAN

Berikut bukan sekadar UI copy:

```text
/product/[slug]
/jual-barang-bekas-restoran/[...slug]
SKU
slug
canonical
schema
API parameter
category slug
status values
condition values
```

Jangan mengubahnya hanya karena wording terlihat kurang bagus.

---

# 16. RECOMMENDED COPY OWNERSHIP

Ideal future architecture:

```text
src/config/copy.ts
```

atau domain-specific copy modules:

```text
src/content/
├── navigation.ts
├── whatsapp.ts
├── hero.ts
├── footer.ts
└── social.ts
```

**Status:** rekomendasi, bukan instruksi untuk langsung membuat refactor.

Jangan melakukan centralization besar hanya untuk mengganti satu copy tanpa audit dependency.

---

# 17. SAFE COPY CHANGE WORKFLOW

Setiap kali user meminta:

> "Ganti tulisan tombol X"

lakukan:

```text
1. Global search copy lama
        ↓
2. Catat semua occurrence
        ↓
3. Bedakan label vs action vs message
        ↓
4. Tentukan source of truth
        ↓
5. Ubah hanya occurrence yang memang dimaksud
        ↓
6. Cari lagi copy lama
        ↓
7. Pastikan tidak ada duplicate/old wording
        ↓
8. npm run build
        ↓
9. Verify localhost jika UI change
        ↓
10. Commit
```

---

# 18. COPY QA CHECKLIST

Sebelum menyatakan copy selesai:

- [ ] Copy lama sudah dicari secara global.
- [ ] Semua occurrence yang relevan sudah diperbarui.
- [ ] Tidak ada duplicate `saya` pada WA.
- [ ] WA produk memakai format multiline.
- [ ] Condition hanya `BARU` / `BEKAS`.
- [ ] READY = `Tanya WA`.
- [ ] SOLD = `Tanya Lainnya`.
- [ ] SOLD card tetap hidup/discoverable.
- [ ] Dapur MBG memakai direct WhatsApp contract.
- [ ] Produksi Baru memakai direct WhatsApp contract.
- [ ] `Lihat Unit yang Tersedia` tetap scroll ke katalog.
- [ ] SEO slug/URL tidak berubah karena copy edit.
- [ ] Build berhasil.
- [ ] Tidak ada regression visual yang jelas.

---

# 19. QUICK REFERENCE — CURRENT COPY CONTRACTS

| Purpose | Current copy | Primary location |
|---|---|---|
| Hero headline | `Cari, Jual, atau Produksi Peralatan Dapur Resto & Dapur MBG` | `HeroSection.tsx` |
| Catalog CTA | `Lihat Unit yang Tersedia →` | `HeroSection.tsx` |
| MBG WA | `Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.` | Hero / service / footer flow |
| Produksi Baru WA | `Halo BBKitchen, mohon info peralatan dapur/restoran custom atau produksi baru` | Hero / service / footer flow |
| READY | `Tanya WA` | `ProductCard.tsx` |
| SOLD | `Tanya Lainnya` | `ProductCard.tsx` |
| Product WA | multiline product inquiry contract | Product Card / Product Detail |
| Social | `YouTube Shorts` / `TikTok` | `SocialMediaSection.tsx` |

---

# 20. SESSION HANDOFF RULE

Jika ada copy change yang cukup besar untuk menjadi milestone, update:

```text
README.md
```

Jika session akan ditutup, ikuti:

```text
end-session-prompt.md
```

Jangan meninggalkan copy change tanpa:

```text
file
copy lama
copy baru
action impact
build status
commit SHA
```

---

## Final Rule

> **Copy boleh berubah cepat. Contract jangan berubah diam-diam.**
>
> Setiap perubahan wording harus menjaga action, data contract, SEO contract, dan WhatsApp contract kecuali user memang meminta perubahan behavior.
