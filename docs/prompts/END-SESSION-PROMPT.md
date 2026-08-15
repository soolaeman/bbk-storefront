[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen — Canonical End-Session Prompt

> **Use this one prompt at the end of every migration chat.**
>
> `QUICK-END-SESSION-PROMPT.md` is intentionally removed. Forensic extraction of old/closed chats remains a separate archival workflow in `FORENSIC-EXTRACTION-PROMPT.md`.

Copy-paste this prompt at the end of every migration chat.

```text
# END SESSION — BBKITCHEN NEXT.JS MIGRATION

Saya ingin mengakhiri session ini secara resmi.

Repository:
soolaeman/Front-End-BBKitchen

Branch:
feature/nextjs-migration

JANGAN langsung membuat summary.
Lakukan forensic session close, repository audit, documentation audit, verification, lalu handoff.

==================================================
1. FORENSIC EXTRACTION
==================================================

Ekstrak hanya berdasarkan conversation/session dan GitHub evidence yang benar-benar tersedia:

- tujuan session
- starting state
- perubahan yang benar-benar dilakukan
- file/component/route/API yang dibuat, diubah, dihapus, atau dipindahkan
- data contracts
- component contracts / prop changes
- bottleneck
- symptom
- root cause
- workaround
- permanent resolution
- failed approach / dead end
- architecture decision
- user decision / locked decision
- technical debt
- build/test/runtime/UI verification
- relevant commit SHA + date

Jika fakta tidak tersedia, tulis:
`Tidak ditemukan di conversation.`

Jangan mengarang.

==================================================
2. REPOSITORY / VIBE-CODING DRIFT AUDIT
==================================================

Audit repository state yang aktual terhadap dokumentasi yang ada.

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
- data contract berubah
- component ownership berubah

Jangan mengasumsikan path/file masih sama hanya karena dokumentasi lama menyebutnya.

Gunakan repository/GitHub sebagai sumber kebenaran untuk struktur file.

==================================================
3. STATUS
==================================================

Klasifikasikan setiap pekerjaan:

- DONE / VERIFIED
- DONE / CODE ONLY
- PARTIAL
- BLOCKED
- DEFERRED
- FAILED / ABORTED

`Code exists` tidak sama dengan `verified`.

Pisahkan:
- implemented
- build verified
- localhost/runtime verified
- upstream verified
- desktop verified
- mobile verified

==================================================
4. PARETO
==================================================

Pilih maksimal 5 item untuk masing-masing:

### Top 20% Changes
Perubahan yang menghasilkan sekitar 80% dampak session.

### Top 20% Bottlenecks
Masalah yang paling banyak memengaruhi progress.

### Top 20% Decisions
Keputusan yang harus dipertahankan oleh chat berikutnya.

Pareto hanya untuk prioritas. Jangan gunakan Pareto untuk menghapus history teknis.

==================================================
5. SAVE / UPDATE PROGRESS ARCHIVE
==================================================

Buat atau update:

`docs/progress/CHAT-X.Y.md`

Isi minimal:

- Date
- Scope
- Starting state
- Pareto
- File/component/route/API history
- Bottlenecks + symptom + root cause + resolution
- Failed approaches
- Decisions
- Verification
- Git checkpoint
- Technical debt
- Handoff

Jangan menimpa history session sebelumnya.

==================================================
6. UPDATE PROGRESS INDEX
==================================================

WAJIB update:

`docs/progress/README.md`

Index ini harus tetap mencerminkan:

- chronology Chat 1.1, 1.2, 1.3, ...
- tanggal/period tiap chat jika tersedia
- fokus tiap chat
- status
- link ke archive masing-masing
- milestone utama
- current migration position
- current Pareto focus

Jangan mengubah progress index menjadi forensic log.

==================================================
7. UPDATE ROOT README
==================================================

WAJIB update:

`README.md`

README root bukan logbook.

Update hanya informasi current-state yang relevan:

- current phase
- current verified state
- Pareto priorities
- major locked decisions
- carried-forward technical debt
- chronology / documentation links
- last code checkpoint
- last documentation checkpoint
- next chat handoff

Jangan menyalin seluruh forensic session ke README.

==================================================
8. GUIDES AUDIT
==================================================

Audit seluruh:

`docs/guides/*`

Guides adalah living documentation untuk manusia/vibe coder.

Jika repository berubah sehingga guide menjadi stale, update guide yang terdampak.

Contoh drift yang WAJIB diperbaiki:

- path file berubah
- component dipindah
- component baru menjadi owner copy tertentu
- route berubah
- asset location berubah
- cara mengganti copy berubah
- architecture/data contract berubah

Jika guide masih valid, JANGAN mengubahnya hanya untuk membuat perubahan palsu.

==================================================
9. PROMPTS AUDIT
==================================================

Audit:

`docs/prompts/*`

Aturan:

- `END-SESSION-PROMPT.md` adalah satu-satunya prompt canonical untuk end-session normal.
- `FORENSIC-EXTRACTION-PROMPT.md` hanya digunakan untuk mengarsipkan chat lama/closed chat yang belum terdokumentasi.
- Jangan membuat prompt end-session alternatif tanpa alasan workflow yang nyata.

Jika SOP/documentation workflow berubah, update prompt yang terdampak.

==================================================
10. ROOT SHORTCUT
==================================================

Pastikan:

`end-session-prompt.md`

tetap menjadi shortcut sederhana menuju canonical:

`docs/prompts/END-SESSION-PROMPT.md`

Jangan membuat canonical prompt kedua di root.

==================================================
11. BOTTLENECK REGISTER
==================================================

Jika ada bottleneck baru, tambahkan ID berikutnya ke bottleneck register yang sesuai.

Format:

`B-XX | Chat | Problem | Root Cause | Resolution | Lesson | Status`

Jangan mengganti ID bottleneck lama.

==================================================
12. TIMELINE
==================================================

Catat:

Date:
Start:
End:

Jika exact time tidak tersedia, tulis:
`Tidak ditemukan di conversation.`

Jika tanggal berasal dari GitHub commit, gunakan tanggal commit dan sebutkan sumbernya.

==================================================
13. GIT / VERIFICATION
==================================================

Periksa perubahan code dan documentation.

Jika perubahan yang dibuat dalam session belum committed dan memang berada dalam scope session:

- commit dengan message jelas
- catat full SHA

Prefer:
`1 milestone = 1 verified commit`

Jangan mengarang SHA.

Setelah documentation write/commit, verify bahwa write berhasil sebelum melaporkan SHA.

==================================================
14. HANDOFF
==================================================

Tentukan:

- current state
- unresolved items
- next priority order
- things NOT to repeat
- next conversation title

==================================================
15. FINAL CHECK
==================================================

Sebelum menjawab saya:

- Pastikan `docs/progress/CHAT-X.Y.md` benar-benar tersimpan.
- Pastikan `docs/progress/README.md` benar-benar tersimpan.
- Pastikan root `README.md` benar-benar tersimpan.
- Pastikan guide yang terdampak sudah diperbarui atau dinyatakan tetap valid.
- Pastikan prompt/SOP yang terdampak sudah diperbarui atau dinyatakan tetap valid.
- Pastikan `end-session-prompt.md` tetap menunjuk ke canonical prompt.
- Pastikan SHA yang dilaporkan berasal dari write/commit yang berhasil.
- Jangan bilang update berhasil jika write gagal.

==================================================
16. FINAL RESPONSE
==================================================

Jawab ringkas:

1. Session status
2. Progress archive path + SHA
3. Progress index SHA
4. README commit SHA
5. Guides changed / no change
6. Prompts changed / no change
7. Last code checkpoint SHA
8. Top 3 carried-forward items
9. Next conversation title
```
