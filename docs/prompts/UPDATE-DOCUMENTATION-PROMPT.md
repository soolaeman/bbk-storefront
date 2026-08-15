[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen — Update Guides & Documentation Prompt

Use this prompt when you want to synchronize the **human-facing documentation** after repository changes.

This is separate from the normal End Session prompt.

## Targets

### Guides
- `docs/guides/COPY-EDITING-GUIDE.md`
- `docs/guides/VIBE-CODING-COPY-GUIDE.md`
- `docs/guides/README.md`

### General README
- `README.md`

### Navigator
- `NAVIGATOR.md`

Do not update `docs/progress/*` with this prompt.
Do not update code/assets with this prompt.
Do not perform forensic session extraction with this prompt.

---

## Prompt

```text
# UPDATE BBKITCHEN GUIDES + GENERAL README + NAVIGATOR

Repository:
soolaeman/Front-End-BBKitchen
Branch:
feature/nextjs-migration

Saya ingin menyinkronkan dokumentasi manusia/vibe-coder dengan repository TERKINI.

TARGET WAJIB:

GUIDES
1. docs/guides/COPY-EDITING-GUIDE.md
2. docs/guides/VIBE-CODING-COPY-GUIDE.md
3. docs/guides/README.md

GENERAL README
4. README.md

NAVIGATOR
5. NAVIGATOR.md

Jangan mengubah:
- source code
- assets
- docs/progress/CHAT-X.Y.md
- docs/progress/README.md
- docs/prompts/*

==================================================
1. AUDIT REPOSITORY TERLEBIH DAHULU
==================================================

Audit struktur repository aktual.

Periksa minimal:
- file baru
- file deleted
- file renamed/moved
- component baru
- component split/merge
- route baru/berubah
- API route baru/berubah
- asset baru/berubah
- lokasi hardcoded copy berubah
- shared helper/copy source berubah
- data contract berubah
- component ownership berubah

Jangan mengandalkan memory atau dokumentasi lama jika repository menunjukkan struktur yang berbeda.

Gunakan status Git/current repository sebagai sumber kebenaran struktur file.

==================================================
2. UPDATE COPY-EDITING-GUIDE.md
==================================================

Pastikan quick map file → copy tetap benar untuk:

- Hero
- Header
- Product Card
- Product Detail
- Footer
- Social
- Category
- Local landing/article
- WhatsApp messages
- READY/SOLD
- CTA

Bedakan selalu:

LABEL / TEXT
ACTION / ROUTING
MESSAGE

Jika copy pindah ke file baru, update path.
Jika component dipecah, tunjukkan lokasi baru.
Jika copy berasal dari API/WordPress/config, jangan klaim hardcoded frontend.

Jangan mengarang file, prop, helper, route, atau contract.

==================================================
3. UPDATE VIBE-CODING-COPY-GUIDE.md
==================================================

Ini untuk user awam.

Pastikan:
- bahasa sederhana
- Ctrl+Shift+F adalah metode utama mencari copy
- peta "yang mau diubah → file yang dicek" akurat
- COPY vs LOGIC jelas
- ada warning untuk logic sensitif
- user tidak diarahkan mengubah API/URL/state/contract hanya karena ingin ganti tulisan

Jika struktur file berubah, update path.

Jangan membuat tutorial engineering yang berat.

==================================================
4. UPDATE docs/guides/README.md
==================================================

Jadikan sebagai index ringkas.

Pastikan:
- hanya guide yang benar-benar ada yang ditautkan
- semua relative link benar
- tujuan setiap guide jelas
- tidak mencampur progress/history
- tidak mencampur prompt/SOP

Jangan membuat guide baru hanya demi checklist.

==================================================
5. UPDATE ROOT README.md
==================================================

README root adalah dashboard current state.

Gunakan prinsip Pareto: cukup informasi yang menjelaskan sekitar 80% kondisi project.

Pastikan yang berikut tetap akurat:

- current checkpoint
- current priorities
- current state
- architecture baseline
- locked UX/business contracts
- active bottleneck snapshot
- carried technical debt
- important files/assets
- documentation map
- next-chat handoff

### Session timeline / progress rule

Jika README menampilkan migration progress antar-session:

- tampilkan tanggal tiap session jika tersedia
- tampilkan Start / End / Duration hanya jika dapat diverifikasi
- gunakan evidence dari session/conversation atau GitHub commit metadata
- jika exact time tidak tersedia, tulis:
  `Tidak ditemukan di repository/evidence yang tersedia.`
- jika hanya tanggal/period tersedia, jangan mengubahnya menjadi durasi
- jangan mengarang atau mengestimasi elapsed time
- pastikan timeline konsisten dengan `docs/progress/README.md`

README bukan:
- forensic log
- session journal
- full changelog
- transcript

Jangan menyalin seluruh progress archive ke README.

==================================================
6. UPDATE NAVIGATOR.md
==================================================

NAVIGATOR.md adalah peta dokumentasi repository.

Audit seluruh file/folder dokumentasi yang benar-benar ada.

Pastikan tabel menjelaskan:
- file/folder
- fungsi
- kapan digunakan
- link relatif yang benar

Jangan mengarang file yang tidak ada.

Semua `.md` selain root `README.md` dan `NAVIGATOR.md` wajib menyediakan link kembali ke Navigator.

==================================================
7. STATUS DISCIPLINE
==================================================

Gunakan:

✅ verified
⚠️ partial / needs QA
⏳ pending / deferred
🔒 locked
❌ failed / rejected

Jangan menyamakan:

code exists
build verified
runtime verified
upstream verified
UI verified
mobile verified

==================================================
8. DRIFT CLASSIFICATION
==================================================

Untuk referensi dokumentasi yang diperiksa:

VALID
→ tetap benar

STALE
→ path/contract/ownership sudah berubah; update

MISSING
→ informasi penting belum ada; tambahkan

UNKNOWN
→ tidak dapat dibuktikan; tulis:
`Tidak ditemukan di repository/evidence yang tersedia.`

==================================================
9. PARETO RULE
==================================================

Keep docs concise.

Guides menjawab:
"Bagaimana saya menggunakan/memahami bagian ini sekarang?"

README menjawab:
"Project sekarang ada di mana dan apa prioritas berikutnya?"

Navigator menjawab:
"Dokumentasi mana yang harus saya buka?"

History detail tetap berada di `docs/progress/`.

==================================================
10. VERIFY
==================================================

Sebelum commit:
- semua referenced file/path benar-benar ada
- tidak ada old path yang masih disebut
- relative documentation links valid secara logis
- tiga guides konsisten
- Navigator konsisten dengan repository
- README konsisten dengan current repository
- session timeline, jika ada, konsisten dengan progress index

==================================================
11. COMMIT
==================================================

Jika ada perubahan dokumentasi:

```text
docs: sync guides README and navigator with current repository
```

Catat full SHA hasil write/commit yang berhasil.

Jika tidak ada perubahan:

`NO DOCUMENTATION CHANGES NEEDED`

Jangan membuat commit kosong.

==================================================
12. FINAL RESPONSE
==================================================

Jawab ringkas:

1. Guides: updated / no changes
2. README: updated / no changes
3. Navigator: updated / no changes
4. Files changed
5. Main drift fixed
6. Session timeline impact: Date / Start / End / Duration jika relevan dan terverifikasi
7. Commit SHA, jika ada
8. Unknowns / items still not provable
```
