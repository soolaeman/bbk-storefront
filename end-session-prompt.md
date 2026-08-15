# BBKitchen — End Session Prompt

Gunakan prompt ini setiap kali menutup satu session/chat migration.

```text
# END SESSION — BBKITCHEN NEXT.JS MIGRATION

Saya ingin mengakhiri session ini secara resmi.

Repository:
soolaeman/Front-End-BBKitchen

Branch:
feature/nextjs-migration

Lakukan END-SESSION CHECKLIST berikut SEBELUM menyatakan session selesai.

## 1. SESSION FORENSIC

Ekstrak dari seluruh session:

- tujuan utama session
- fitur/perubahan yang benar-benar selesai
- file/component/API yang berubah
- bottleneck
- root cause
- workaround
- permanent resolution
- failed approach / dead end
- keputusan architecture
- technical debt yang tersisa
- user decisions yang harus dipertahankan
- commit SHA yang relevan
- build/test/runtime verification

Jangan hanya membuat summary final-state.

## 2. STATUS CLASSIFICATION

Untuk setiap pekerjaan bedakan secara eksplisit:

- DONE / VERIFIED
- DONE / CODE ONLY
- PARTIAL
- BLOCKED
- DEFERRED
- FAILED / ABORTED

Jangan menyebut sesuatu `done` hanya karena kode sudah ditulis.

## 3. PARETO SESSION SUMMARY

Gunakan prinsip Pareto.

Pilih 20% perubahan/bottleneck yang menjelaskan sekitar 80% dampak session.

Buat bagian:

### Top 20% Changes

Maksimal 5 item.

### Top 20% Bottlenecks

Maksimal 5 item.

### Top 20% Decisions

Maksimal 5 item.

### 80% Context

Berikan konteks ringkas yang diperlukan agar Chat berikutnya tidak mengulang pekerjaan.

Jangan menghapus detail teknis penting hanya demi ringkas.

## 4. TIMELINE

Tambahkan tanggal session:

```text
Date:
Start:
End:
```

Jika jam exact tidak tersedia:

`Tidak ditemukan di conversation.`

Untuk milestone penting, gunakan tanggal commit/GitHub bila tersedia dan jangan mengarang.

## 5. README UPDATE

Update `README.md` pada branch `feature/nextjs-migration`.

Jangan mengganti history lama.

Tambahkan session baru ke:

```text
MASTER MIGRATION CHRONOLOGY
``` 

Gunakan format:

```text
## Chat X.Y — [Title]

**Date:** DD Month YYYY
**Scope:** ...
**Outcome:** ...

### Top 20% Changes
...

### Bottlenecks
...

### Failed Approaches
...

### Decisions
...

### Technical Debt
...

### Verification
...

### Git Checkpoint
...
```

Jika detail tanggal/SHA tidak tersedia, tulis:

`Tidak ditemukan di conversation.`

## 6. BOTTLENECK REGISTER

Tambahkan bottleneck baru ke `MASTER BOTTLENECK REGISTER` dengan ID berikutnya.

Format:

```text
B-XX
Chat
Problem
Root Cause
Resolution
Lesson
Status
```

Jangan menghapus bottleneck lama.

## 7. FAILED APPROACHES

Jika ada eksperimen yang gagal/di-abort, dokumentasikan:

- apa yang dicoba
- kenapa gagal
- apa penggantinya
- apakah harus dihindari di future chat

## 8. TECHNICAL DEBT

Update section:

```text
TECHNICAL DEBT → NEXT CHAT
```

Bedakan:

- carried forward
- blocked externally
- intentionally deferred
- needs audit

## 9. NEXT HANDOFF

Update:

```text
CHAT NEXT HANDOFF
```

Harus berisi:

- current branch
- last code checkpoint
- last README checkpoint
- current verified state
- unresolved issues
- next priority order
- things NOT to repeat

## 10. BUILD / VERIFICATION

Catat bukti yang benar-benar ada:

```text
npm run build
runtime test
localhost verification
desktop verification
mobile verification
```

Bedakan:

```text
build verified
runtime verified
upstream verified
UI verified
```

Jangan menyamakan semuanya.

## 11. COMMIT

Jika ada perubahan code/documentation yang belum di-commit:

- commit dengan message yang jelas
- catat full SHA

Prefer:

```text
1 milestone = 1 verified commit
```

## 12. FINAL SESSION RECORD

Di akhir README tambahkan:

```text
### Session Close — DD Month YYYY

Status: ✅ CLOSED / ⚠️ PARTIAL / ❌ BLOCKED

Last code commit:
...

Last documentation commit:
...

Next conversation:
...
```

## 13. FINAL RESPONSE

Setelah README benar-benar berhasil di-update, laporkan hanya:

1. Session status
2. README commit SHA
3. Last code checkpoint SHA
4. Top 3 carried-forward items
5. Next conversation title

Jangan bilang README sudah di-update sebelum write benar-benar berhasil.

PENTING:
- Jangan mengarang tanggal, SHA, error, atau verification.
- Preserve institutional memory.
- Preserve failed approaches.
- Preserve bottleneck root causes.
- Gunakan Pareto untuk prioritas, bukan untuk menghapus sejarah.
``` 
