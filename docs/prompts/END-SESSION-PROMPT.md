[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen — Canonical End-Session Prompt

> **Use this one prompt at the end of every migration chat.**
> `QUICK-END-SESSION-PROMPT.md` is intentionally removed. Forensic extraction of old/closed chats remains a separate archival workflow in `FORENSIC-EXTRACTION-PROMPT.md`.

Copy-paste this prompt at the end of every migration chat.

```text
# END SESSION — BBKITCHEN NEXT.JS MIGRATION

Saya ingin mengakhiri session ini secara resmi.

Repository:
soolaeman/Front-End-BBKitchen

Branch:
main
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

- Date (Search What Date is it Now)
- Start
- End (Search What Time is it Now)
- Duration
- Evidence source for timing
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

### Timeline evidence rule

- `Start`, `End`(Search What Time is it Now), dan `Duration` hanya boleh diisi dari evidence yang benar-benar tersedia.
- Jangan mengarang atau mengestimasi exact time.
- Jika hanya tanggal/period yang tersedia, jangan mengubahnya menjadi durasi.
- Jika timestamp berasal dari GitHub commit, sebutkan sumbernya sebagai GitHub evidence.
- Duration hanya dihitung setelah Start dan End dapat diverifikasi.
- Jika evidence timestamp conflict, preserve the conflict and do not silently resolve it.

Jangan menimpa history session sebelumnya.

==================================================
6. UPDATE PROGRESS INDEX
==================================================

WAJIB update:

`docs/progress/README.md`

Index ini harus tetap mencerminkan:

- chronology Chat 1.1, 1.2, 1.3, ...
- tanggal/period tiap chat jika tersedia
- Start/End/Duration jika dapat diverifikasi
- fokus tiap chat
- status
- link ke archive masing-masing
- milestone utama
- current migration position
- current Pareto focus
- project timeline since Chat 1.1

### Project elapsed-time rule

Progress index harus membedakan:

```text
actual elapsed working duration
calendar span
earliest verifiable migration evidence
```

Jika exact Chat 1.1 start timestamp tidak tersedia:

```text
Actual elapsed duration since Chat 1.1:
NOT VERIFIABLE
```

Boleh menampilkan earliest verifiable evidence dan calendar span sebagai konteks, tetapi:

- jangan menyamakan calendar span dengan actual working duration
- jangan menghitung dari tanggal saja
- jangan mengestimasi dari message count/skipped messages
- jangan mengisi angka duration tanpa Start + End yang terverifikasi

Jika exact Chat 1.1 start timestamp ditemukan di masa depan, update timeline dengan evidence tersebut tanpa mengubah forensic history secara retroaktif.

Jika waktu tidak dapat dibuktikan, tulis:
`Tidak ditemukan di repository/evidence yang tersedia.`

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
- session timeline/progress summary
- project elapsed-time status since Chat 1.1
- last code checkpoint
- last documentation checkpoint
- next chat handoff

Untuk timeline/progress:

- tampilkan tanggal tiap session dengan fitur search
- tampilkan Start/End/Duration dengan fitur search 
- jika Chat 1.1 start tidak dapat diverifikasi, tampilkan `Actual elapsed duration since Chat 1.1: NOT VERIFIABLE`
- boleh tampilkan earliest verifiable evidence/calendar span sebagai konteks
- jangan menyamakan calendar span dengan working duration
- jangan mengarang atau mengestimasi durasi
- jika tidak tersedia, tulis:
  `Tidak ditemukan di repository/evidence yang tersedia.`

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
- Session timeline + project elapsed-time rules harus tetap konsisten di prompt yang relevan.

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
End (Search What Time is it Now):
Duration:
Evidence source:

Evidence source dapat berupa:

- conversation/session timestamp
- GitHub commit timestamp
- repository evidence

Rules:

- Exact time is preferred when verifiable (Must Search What Time is it Now).
- If exact time is unavailable, write:
  `Tidak ditemukan di repository/evidence yang tersedia.`
- If only a date/period is known, record the date/period without converting it into duration.
- Duration must be calculated only from verified Start and End.
- Never estimate elapsed time from message count, skipped messages, date range, calendar span, or assumptions.
- If a timestamp comes from GitHub commit metadata, label it as GitHub evidence.
- If timestamps conflict, preserve the conflict and do not silently choose one.
- Root README and progress index must not contain timing facts that contradict the archive evidence.

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
- Pastikan timeline Start/End/Duration konsisten di archive, progress index, dan root README.
- Pastikan project elapsed-time status sejak Chat 1.1 konsisten di progress index dan root README.
- Pastikan `end-session-prompt.md` tetap menunjuk ke canonical prompt.
- Pastikan SHA yang dilaporkan berasal dari write/commit yang berhasil.
- Jangan bilang update berhasil jika write gagal.

==================================================
16. FINAL RESPONSE
==================================================

Jawab ringkas:

1. Session status
2. Session Date / Start / End / Duration
3. Project elapsed-time status since Chat 1.1
4. Progress archive path + SHA
5. Progress index SHA
6. README commit SHA
7. Guides changed / no change
8. Prompts changed / no change
9. Last code checkpoint SHA
10. Top 3 carried-forward items
11. Next conversation title
```
