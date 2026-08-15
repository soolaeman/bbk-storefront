# BBKitchen — Canonical End-Session Prompt

Copy-paste this prompt at the end of every migration chat.

```text
# END SESSION — BBKITCHEN NEXT.JS MIGRATION

Saya ingin mengakhiri session ini secara resmi.

Repository:
soolaeman/Front-End-BBKitchen

Branch:
feature/nextjs-migration

JANGAN langsung membuat summary. Lakukan forensic session close terlebih dahulu.

## 1. FORENSIC EXTRACTION

Ekstrak hanya berdasarkan conversation/session dan GitHub evidence yang benar-benar tersedia:

- tujuan session
- perubahan yang benar-benar dilakukan
- file/component/API yang berubah
- bottleneck
- symptom
- root cause
- workaround
- permanent resolution
- failed approach/dead end
- architecture decision
- user decision / locked decision
- technical debt
- build/test/runtime/UI verification
- relevant commit SHA + date

Jika fakta tidak tersedia, tulis:
`Tidak ditemukan di conversation.`

Jangan mengarang.

## 2. STATUS

Klasifikasikan setiap pekerjaan:

- DONE / VERIFIED
- DONE / CODE ONLY
- PARTIAL
- BLOCKED
- DEFERRED
- FAILED / ABORTED

`Code exists` tidak sama dengan `verified`.

## 3. PARETO

Pilih maksimal 5 item untuk masing-masing:

### Top 20% Changes
Perubahan yang menghasilkan sekitar 80% dampak session.

### Top 20% Bottlenecks
Masalah yang paling banyak memengaruhi progress.

### Top 20% Decisions
Keputusan yang harus dipertahankan oleh chat berikutnya.

Pareto hanya untuk prioritas. Jangan gunakan Pareto untuk menghapus history teknis.

## 4. SAVE PROGRESS ARCHIVE

Buat/update:

`docs/progress/CHAT-X.Y.md`

Isi minimal:

- Date
- Scope
- Pareto
- Bottlenecks + root cause + resolution
- Failed approaches
- Decisions
- Verification
- Git checkpoint
- Handoff

Jangan menimpa history session sebelumnya.

## 5. UPDATE BOTTLENECKS

Jika ada bottleneck baru, tambahkan ID berikutnya ke bottleneck register di README.

Format:

`B-XX | Chat | Problem | Root Cause | Resolution | Lesson | Status`

## 6. UPDATE README

README root bukan logbook.

Update hanya:

- current phase
- current verified state
- Pareto priorities
- major locked decisions
- carried-forward technical debt
- chronology index/link ke `docs/progress/`
- last code checkpoint
- last documentation checkpoint
- next chat handoff

Jangan menyalin seluruh forensic session ke README.

## 7. TIMELINE

Catat:

Date:
Start:
End:

Jika exact time tidak tersedia, tulis:
`Tidak ditemukan di conversation.`

Jika tanggal berasal dari GitHub commit, gunakan tanggal commit dan sebutkan sumbernya.

## 8. VERIFICATION

Pisahkan:

- build verified
- localhost/runtime verified
- upstream verified
- desktop verified
- mobile verified

Jangan menyamakan satu dengan yang lain.

## 9. GIT

Jika perubahan code/documentation belum committed:

- commit dengan message jelas
- catat full SHA

Prefer:
`1 milestone = 1 verified commit`

## 10. HANDOFF

Tentukan:

- current state
- unresolved items
- next priority order
- things NOT to repeat
- next conversation title

## 11. FINAL CHECK

Sebelum menjawab saya:

- Pastikan `docs/progress/CHAT-X.Y.md` benar-benar tersimpan.
- Pastikan README benar-benar tersimpan.
- Pastikan SHA yang dilaporkan berasal dari write yang berhasil.
- Jangan bilang update berhasil jika write gagal.

## 12. FINAL RESPONSE

Jawab ringkas:

1. Session status
2. Progress archive path + SHA
3. README commit SHA
4. Last code checkpoint SHA
5. Top 3 carried-forward items
6. Next conversation title
```
