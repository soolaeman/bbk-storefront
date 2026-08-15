# BBKitchen — Update General README Prompt

Use this prompt when the root `README.md` needs to be refreshed from the latest progress/state.

This prompt updates **only** the root README synthesis. It does not perform forensic extraction, guide maintenance, or code changes.

---

## Prompt

```text
# UPDATE BBKITCHEN GENERAL README

Repository:
soolaeman/Front-End-BBKitchen

Branch:
feature/nextjs-migration

Saya ingin memperbarui README.md root agar merepresentasikan kondisi project TERKINI dengan ringkas dan akurat.

## TARGET FILE

HANYA:

README.md

Jangan mengubah:
- source code
- docs/progress/CHAT-X.Y.md
- docs/progress/README.md
- docs/guides/*
- docs/prompts/*
- asset files

---

## 1. READ CURRENT SOURCES

Sebelum mengubah README, baca:

1. README.md saat ini
2. docs/progress/README.md
3. progress archive terbaru yang relevan
4. repository state / current branch
5. latest verified code checkpoint

Gunakan evidence aktual repository, bukan asumsi.

Jika informasi tidak tersedia:

```text
Tidak ditemukan di repository/evidence yang tersedia.
```

Jangan mengarang status, SHA, tanggal, bug, atau verification.

---

## 2. README ROLE

README root adalah:

> **dashboard kondisi project sekarang.**

README BUKAN:

- journal session
- forensic archive
- transcript
- changelog lengkap
- daftar semua commit

Detail history tetap berada di:

```text
docs/progress/
```

---

## 3. KEEP THESE SECTIONS CURRENT

Pertahankan/update hanya informasi yang membantu memahami kondisi project sekarang:

### Current Checkpoint
- chat/phase terakhir
- status phase
- last code checkpoint
- last documentation checkpoint jika relevan

### Current Priorities — Pareto
Maksimal sekitar 5 prioritas dengan dampak tertinggi.

### Current State
Status ringkas area utama:

- data architecture
- catalog
- product detail
- routing
- header/search
- responsive QA
- major UX contracts
- known unfinished areas

### Architecture Baseline
Hanya architecture principles yang masih berlaku.

### Locked UX / Business Contracts
Hanya kontrak yang masih aktif dan penting.

### Master Bottleneck Snapshot
Hanya bottleneck aktif/bernilai tinggi.
Closed historical bottlenecks cukup diringkas atau ditautkan ke progress archive.

### Technical Debt
Hanya debt yang masih terbawa ke phase berikutnya.

### Verification Rule
Pertahankan aturan verifikasi yang masih berlaku.

### SEO Baseline
Pertahankan baseline SEO yang masih relevan.

### Important Files / Assets
Hanya file/asset penting yang masih benar.
Jangan membuat daftar seluruh repository.

### Documentation Map
Tautkan ke:

```text
Progress
Guides
Prompts
End Session Shortcut
```

### Next Chat Handoff
- current state
- top priorities
- unresolved items
- things not to repeat
- next conversation title

---

## 4. PARETO RULE

README harus menjawab dengan cepat:

> "Project sekarang ada di mana dan apa yang paling penting berikutnya?"

Gunakan prinsip:

```text
20% informasi
≈
80% pemahaman project
```

Jangan memasukkan semua detail forensic.

---

## 5. STATUS DISCIPLINE

Bedakan:

```text
✅ verified
⚠️ partial / needs QA
⏳ pending / deferred
🔒 locked decision
❌ failed / rejected
```

Jangan mengubah `code exists` menjadi `verified` tanpa evidence.

---

## 6. CHECK CURRENT FILE PATHS

Karena project menggunakan vibe coding, file dapat berpindah/dipecah.

Sebelum memperbarui section Important Files atau Documentation Map:

- verifikasi path
- cek file masih ada
- cek route masih benar
- cek asset masih benar
- cek prompt/guide path masih benar

Jangan mengarang path berdasarkan memory.

---

## 7. DO NOT DUPLICATE HISTORY

Jangan menyalin isi penuh:

```text
docs/progress/CHAT-X.Y.md
```

ke README.

Cukup:

```text
1–5 key points
+
link ke archive
```

---

## 8. DOCUMENTATION LINKS

Pastikan README mengarahkan user ke:

```text
📊 docs/progress/
📖 docs/guides/
🤖 docs/prompts/
🚪 end-session-prompt.md
```

Gunakan hanya link ke file yang benar-benar ada.

Canonical normal end-session prompt:

```text
docs/prompts/END-SESSION-PROMPT.md
```

Old-chat forensic prompt:

```text
docs/prompts/FORENSIC-EXTRACTION-PROMPT.md
```

---

## 9. FINAL CHECK

Sebelum menyimpan:

- README tetap ringkas
- current state masuk akal
- priorities sesuai evidence terbaru
- technical debt tidak stale
- bottleneck aktif akurat
- documentation links benar
- last checkpoint tidak mengarang
- no historical forensic dump

---

## 10. COMMIT

Jika README berubah:

```text
docs: refresh general README current state
```

Catat full SHA hasil write yang benar-benar berhasil.

Jika tidak ada perubahan:

```text
NO README CHANGES NEEDED
```

Jangan membuat commit kosong.

---

## 11. FINAL RESPONSE

Jawab ringkas:

1. README status: updated / no changes
2. Main changes
3. Commit SHA, jika ada
4. Any uncertainty
```
