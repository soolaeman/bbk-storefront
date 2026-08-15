# BBKitchen — Update Guides Prompt

Use this prompt when the repository structure, component locations, copy ownership, routes, assets, or coding workflow may have changed.

This prompt updates the **three guide files only**:

- `docs/guides/COPY-EDITING-GUIDE.md`
- `docs/guides/VIBE-CODING-COPY-GUIDE.md`
- `docs/guides/README.md`

It does **not** update code, progress archives, or the root README.

---

## Prompt

```text
# UPDATE BBKITCHEN GUIDES

Repository:
soolaeman/Front-End-BBKitchen

Branch:
feature/nextjs-migration

Saya ingin mengaudit dan memperbarui dokumentasi GUIDE BBKitchen agar tetap cocok dengan repository yang sekarang.

## TARGET FILE — HANYA 3 INI

1. docs/guides/COPY-EDITING-GUIDE.md
2. docs/guides/VIBE-CODING-COPY-GUIDE.md
3. docs/guides/README.md

Jangan mengubah file di luar tiga target tersebut.

---

## 1. AUDIT REPOSITORY TERLEBIH DAHULU

Jangan mengandalkan memory atau isi guide lama.
Audit repository branch saat ini.

Periksa minimal:

- file baru
- file deleted
- file renamed/moved
- component baru
- component dipecah/merge
- route baru
- API route baru
- asset baru/moved
- perubahan source of truth
- perubahan component ownership
- perubahan lokasi hardcoded copy
- perubahan shared copy/helper
- perubahan status/condition/CTA contract yang relevan untuk guide

Tujuan utama:
> Pastikan guide tidak menunjuk ke file/path/contract yang sudah tidak berlaku.

---

## 2. COPY-EDITING-GUIDE.md

Audit terutama:

- quick map area → file
- Hero
- Header
- Product Card
- Product Detail
- Footer
- Social
- Category
- Local landing
- WhatsApp copy/message contract
- READY/SOLD contract
- CTA behavior yang penting agar copy editing tidak merusak logic
- asset location yang relevan

Jika sebuah copy sekarang berada di file baru, pindahkan referensi guide ke lokasi yang benar.

Jika component sudah split, jelaskan source file yang benar.

Jika copy berasal dari WordPress/API/config, jangan mengklaim hardcoded di frontend.

Jangan mengarang nama file, variable, helper, prop, atau contract.

---

## 3. VIBE-CODING-COPY-GUIDE.md

Guide ini untuk user awam.

Pastikan:

- bahasa tetap sederhana
- user bisa mencari copy dengan Ctrl+Shift+F
- peta "yang mau diubah → file yang harus dicek" akurat
- dibedakan antara COPY vs LOGIC
- diberi peringatan untuk file/logic sensitif
- tidak menyuruh user mengubah URL/API/state/contract hanya karena ingin mengganti tulisan

Jika struktur project berubah, update path yang ditunjukkan.

Jangan membuat guide menjadi tutorial engineering yang terlalu berat.

---

## 4. docs/guides/README.md

Jadikan ini sebagai **index singkat** untuk semua guide.

Pastikan:

- setiap guide yang memang ada tercantum
- link relatif benar
- tujuan setiap guide jelas
- tidak mencantumkan guide yang sudah dihapus
- tidak memasukkan progress/history ke folder guides
- tidak memasukkan prompt ke folder guides

Jika ada guide baru yang benar-benar dibutuhkan oleh perubahan repository, boleh tambahkan link/index entry, tetapi jangan membuat guide baru hanya demi checklist.

---

## 5. DRIFT RULE

Untuk setiap referensi di guides, klasifikasikan:

```text
VALID
→ tetap benar, tidak perlu diubah

STALE
→ path/file/contract sudah berubah, update

MISSING
→ informasi penting belum terdokumentasi, tambahkan

UNKNOWN
→ tidak bisa dibuktikan dari repository, jangan mengarang
```

Jika UNKNOWN:

```text
Tidak ditemukan di repository/evidence yang tersedia.
```

---

## 6. PARETO RULE

Guides harus tetap ringkas dan berguna.

Jangan memasukkan:

- full session history
- semua commit
- semua bottleneck lama
- transcript percakapan
- forensic analysis

Guide menjawab:

> "Bagaimana saya menggunakan/memahami bagian ini sekarang?"

Bukan:

> "Apa saja yang terjadi sejak Chat 1.1?"

---

## 7. COPY GUIDE SAFETY

Pertahankan prinsip:

```text
LABEL / TEXT
≠
ACTION / ROUTING
≠
MESSAGE
```

Mengubah copy tidak otomatis berarti mengubah behavior.

Jangan menghapus:

- onClick
- router logic
- state
- API calls
- conditionals
- product status logic
- SEO identifiers

hanya karena user ingin mengganti tulisan.

---

## 8. VERIFY

Setelah update docs:

- pastikan semua relative link valid secara logis
- pastikan file path yang disebut memang ada
- pastikan tidak ada referensi file lama yang sudah dihapus/rename
- pastikan tiga guide konsisten satu sama lain

Tidak perlu menjalankan build hanya untuk perubahan dokumentasi kecuali perubahan repository yang sedang diaudit juga menyentuh code dan build evidence memang relevan.

---

## 9. COMMIT

Jika ada perubahan:

```text
docs: sync guides with current repository structure
```

Catat full commit SHA hasil write yang benar-benar berhasil.

Jika tidak ada perubahan yang diperlukan:

```text
NO GUIDE CHANGES NEEDED
```

Jangan membuat commit kosong.

---

## 10. FINAL RESPONSE

Jawab ringkas:

1. Guide changes: updated / no changes
2. Files changed: list only the 3 target files that actually changed
3. Main drift fixed
4. Commit SHA, jika ada
5. Anything still unknown
```
