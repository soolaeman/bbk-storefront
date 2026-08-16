[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen — Canonical Start-Session Prompt

> **Use this prompt at the beginning of every migration chat.**
> Purpose: make the new chat orient itself from the **actual repository state + current documentation** before changing code, while creating the session forensic record immediately so the start timestamp is never lost.

Copy-paste this prompt at the start of every migration chat.

```text
# START SESSION — BBKITCHEN NEXT.JS MIGRATION

Saya ingin memulai session baru secara resmi.

Repository:
soolaeman/Front-End-BBKitchen

Branch:
feature/nextjs-migration

JANGAN langsung mengubah application code.
JANGAN mengandalkan memory atau asumsi dari chat sebelumnya.
Lakukan session-start timestamp capture + progress archive bootstrap terlebih dahulu, kemudian repository orientation, documentation audit, current-state verification, lalu buat session plan.

==================================================
0. IMMEDIATE SESSION TIMESTAMP + PROGRESS FILE — WAJIB
==================================================

Begitu session baru resmi dimulai, lakukan ini SEBELUM coding atau perubahan application code:

1. Tentukan nomor session berikutnya dari repository.
2. Cari archive session terakhir di `docs/progress/CHAT-X.Y.md`.
3. Gunakan fitur search/evidence yang tersedia untuk mencari timestamp aktual saat session dimulai. Prioritaskan:
   - current conversation/session timestamp jika tersedia
   - repository/GitHub evidence yang relevan
   - GitHub commit timestamp hanya sebagai evidence pendukung dan wajib diberi label `GitHub evidence`
4. Jangan menggunakan message count, skipped messages, calendar span, atau asumsi sebagai timestamp.
5. Jika exact start timestamp tersedia dari conversation/session evidence, CATAT langsung sebagai `Start` dalam format WIB.
6. Jika exact start timestamp belum tersedia, tulis:
   `Tidak ditemukan di repository/evidence yang tersedia.`
   Jangan mengarang atau mengestimasi.
7. SEGERA buat file:
   `docs/progress/CHAT-X.Y.md`
   untuk session yang sedang dimulai, sebelum implementation work.
8. File progress awal WAJIB memuat section berikut secara eksplisit dan menggunakan format CANONICAL ini:

## Date / Session Timeline

```text
Session: X.Y
Started: DD Month YYYY HH:MM:SS WIB
Ended: PENDING
Duration: PENDING
Evidence source: <exact source/evidence used for Start>
```

9. Jika exact start timestamp tidak tersedia saat file dibuat:

```text
Session: X.Y
Started: Tidak ditemukan di repository/evidence yang tersedia.
Ended: PENDING
Duration: PENDING
Evidence source: Tidak ditemukan di repository/evidence yang tersedia.
```

10. Setelah file dibuat, gunakan file tersebut sebagai forensic session record sepanjang session.
11. Saat end-session, update file yang sama dengan verified `Ended` + `Duration` dan lengkapi forensic history.
12. Jangan membuat archive session baru di akhir jika file session tersebut sudah dibuat di awal.
13. Dokumentasi start-session harus dipisahkan dari application-code checkpoint. Membuat file progress tidak boleh dianggap sebagai application-code checkpoint.

PRINSIP UTAMA:
`Session starts → search timestamp evidence → create CHAT-X.Y.md → fill Date / Session Timeline → then inspect/code.`

==================================================
1. ORIENTASI DOKUMENTASI
==================================================

Mulai dari:

1. `README.md`
2. `NAVIGATOR.md`
3. `docs/progress/README.md`
4. archive session terakhir `docs/progress/CHAT-X.Y.md`
5. `docs/guides/README.md` jika pekerjaan menyentuh UI/copy/struktur frontend
6. prompt yang relevan di `docs/prompts/` jika workflow dokumentasi diperlukan

Jadikan repository aktual sebagai sumber kebenaran utama untuk struktur file.

==================================================
2. TENTUKAN SESSION CONTEXT
==================================================

Identifikasi dari repository/evidence yang tersedia:

- current migration phase
- last closed chat
- current branch
- last code checkpoint
- last documentation checkpoint
- current Pareto priorities
- carried-forward technical debt
- known blockers
- locked decisions
- next recommended work

Jika fakta tidak tersedia, tulis:
`Tidak ditemukan di repository/evidence yang tersedia.`

Jangan mengarang.

==================================================
3. REPOSITORY AUDIT SEBELUM CODING
==================================================

Audit struktur aktual sebelum menyentuh file:

- file baru
- file deleted
- file renamed/moved
- component baru
- component split/merge
- route baru/berubah
- API route baru/berubah
- asset baru/berubah
- shared helper
- hardcoded copy location
- data contract
- component ownership

Jangan mengasumsikan path lama masih valid.

==================================================
4. VERIFICATION BASELINE
==================================================

Pisahkan status:

- implemented
- build verified
- localhost/runtime verified
- upstream verified
- desktop verified
- mobile verified

Gunakan:

✅ VERIFIED
⚠️ PARTIAL / NEEDS QA
⏳ PENDING / DEFERRED
🔒 LOCKED
❌ FAILED / REJECTED

`Code exists` ≠ `verified`.

==================================================
5. READ THE PARETO FIRST
==================================================

Gunakan current Pareto sebagai prioritas awal.

Pisahkan:

### Top 20% Changes
Perubahan paling berdampak yang sudah terjadi.

### Top 20% Bottlenecks
Masalah yang paling menghambat progress.

### Top 20% Decisions
Keputusan yang harus dipertahankan.

Jangan menghapus history teknis hanya karena memakai Pareto.

==================================================
6. LOCKED DECISION CHECK
==================================================

Sebelum membuat perubahan, cari keputusan yang sudah locked, terutama terkait:

- WooCommerce / WordPress / ACF source of truth
- SEO URL / slug
- product contract
- inventory contract
- category behavior
- READY / SOLD behavior
- WhatsApp copy contracts
- shared Header
- responsive behavior
- routing
- authentication/security

Jangan membatalkan locked decision tanpa alasan teknis baru dan bukti.

==================================================
7. USER GOAL
==================================================

Setelah audit, simpulkan tujuan session saat ini dari request user.

Nyatakan:

```text
SESSION GOAL:

SCOPE:

OUT OF SCOPE:

SUCCESS CRITERIA:
```

Jangan memperluas scope sendiri.

==================================================
8. CHANGE STRATEGY
==================================================

Ikuti prinsip:

`1 step = 1 file = 1 verified commit`

Prefer perubahan kecil yang mudah diverifikasi.

Sebelum menyentuh banyak file, jelaskan dependency nyata jika memang tidak bisa dihindari.

Jangan melakukan refactor besar hanya demi style.

==================================================
9. COPY / VIBE-CODING GUARDRAIL
==================================================

Jika user hanya ingin mengganti wording:

- cari owner copy aktual di repository
- bedakan LABEL / ACTION / MESSAGE
- jangan mengubah routing/data contract/SEO hanya karena copy berubah
- gunakan `docs/guides/COPY-EDITING-GUIDE.md`
- gunakan `docs/guides/VIBE-CODING-COPY-GUIDE.md` untuk workflow awam

==================================================
10. RUNTIME / INFRASTRUCTURE GUARDRAIL
==================================================

Jika ada error runtime/upstream:

- bedakan application bug vs infrastructure/network problem
- jangan menyamarkan 401/502/TLS/DNS/network failure dengan UI workaround
- catat symptom vs root cause
- jangan menyatakan root cause proven jika belum ada evidence

==================================================
11. PLAN BEFORE IMPLEMENTATION
==================================================

Berikan rencana session maksimal Pareto-sized:

1. first priority
2. verification point
3. next priority

Jangan membuat daftar pekerjaan panjang yang tidak diperlukan untuk request saat ini.

==================================================
12. DOCUMENTATION AWARENESS
==================================================

Selama session berjalan:

- jika struktur repository berubah, documentation mungkin ikut berubah
- jika copy owner berubah, guides mungkin ikut berubah
- jika route/asset/component berubah, Navigator mungkin ikut berubah
- jika milestone selesai, progress archive akan diperbarui saat end-session
- root `README.md` adalah current-state/Pareto dashboard, bukan forensic log
- `docs/progress/README.md` adalah synthesis/timeline index, bukan pengganti archive detail
- `docs/progress/CHAT-X.Y.md` adalah forensic session history
- timeline facts must flow from evidence → progress index → root README without contradiction
- session archive sudah harus ada sejak awal session; jangan menunggu END SESSION untuk membuat file pertama kali

Jangan melakukan dokumentasi palsu hanya untuk memenuhi checklist.

==================================================
13. SESSION TIMELINE + PROJECT ELAPSED-TIME RULE
==================================================

Catat waktu session berdasarkan evidence yang benar-benar tersedia:

```text
Date:
Start:
End:
Duration:
Evidence source:
```

Rules:

- `Start` WAJIB dicari dan dicatat saat session resmi dimulai, bukan hanya saat session ditutup.
- Pada awal session, lakukan timestamp evidence search terlebih dahulu menggunakan fitur search/evidence yang tersedia.
- Cari exact start timestamp dari current conversation/session evidence dan repository/GitHub evidence yang relevan.
- Jika exact start timestamp tersedia, masukkan ke `docs/progress/CHAT-X.Y.md` segera.
- Jika exact start timestamp tidak tersedia, tulis:
  `Tidak ditemukan di repository/evidence yang tersedia.`
- `End` dan `Duration` ditentukan saat session ditutup, bukan diprediksi.
- Duration hanya dihitung dari verified Start + verified End.
- Jika exact time tidak tersedia, tulis:
  `Tidak ditemukan di repository/evidence yang tersedia.`
- Jika hanya tanggal/period yang tersedia, jangan mengubahnya menjadi durasi.
- Jangan mengestimasi duration dari message count, skipped messages, calendar span, atau asumsi.
- GitHub commit timestamp boleh menjadi evidence timestamp, tetapi labeli sebagai GitHub evidence.
- GitHub commit timestamp TIDAK otomatis sama dengan session start timestamp.
- Jika timestamp conflict, preserve the conflict; jangan silently choose one.
- Root `README.md` dan `docs/progress/README.md` harus konsisten dengan timeline yang sudah terverifikasi.

### Project elapsed time since Chat 1.1

Jika diminta menampilkan waktu pengerjaan total sejak Chat 1.1:

- cari exact Chat 1.1 start timestamp dari repository/conversation evidence terlebih dahulu
- jika exact Chat 1.1 start tidak tersedia, tulis:
  `Actual elapsed duration since Chat 1.1: NOT VERIFIABLE`
- boleh tampilkan `earliest verifiable migration evidence` dan `calendar span` sebagai konteks
- jangan menyamakan calendar span dengan actual working duration
- jika timestamp Chat 1.1 berhasil ditemukan di masa depan, hitung elapsed duration dari timestamp tersebut ke timestamp reference yang terverifikasi
- sinkronkan hasilnya ke `docs/progress/README.md` dan root `README.md`

==================================================
14. END SESSION HANDOFF
==================================================

Saat session selesai, gunakan canonical:

`docs/prompts/END-SESSION-PROMPT.md`

Jangan membuat prompt end-session alternatif.

==================================================
15. START SESSION RESPONSE
==================================================

Sebelum coding, jawab ringkas:

1. Current phase
2. Last code checkpoint
3. Last documentation checkpoint
4. Top 3 current priorities
5. Top 3 carried-forward risks/debt
6. Locked decisions relevant to this session
7. Session goal
8. Session start timestamp
9. Project elapsed-time status since Chat 1.1
10. First implementation step
11. Progress archive created: `docs/progress/CHAT-X.Y.md`

Jika ada data yang tidak dapat diverifikasi:
`Tidak ditemukan di repository/evidence yang tersedia.`

JANGAN mulai coding sebelum `docs/progress/CHAT-X.Y.md` session saat ini sudah dibuat dan section `Date / Session Timeline` sudah terisi sesuai evidence yang tersedia.
```
