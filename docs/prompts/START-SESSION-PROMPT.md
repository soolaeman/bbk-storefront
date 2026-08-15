[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen — Canonical Start-Session Prompt

> **Use this prompt at the beginning of every migration chat.**
>
> Purpose: make the new chat orient itself from the **actual repository state + current documentation** before changing code.

Copy-paste this prompt at the start of every migration chat.

```text
# START SESSION — BBKITCHEN NEXT.JS MIGRATION

Saya ingin memulai session baru secara resmi.

Repository:
soolaeman/Front-End-BBKitchen

Branch:
feature/nextjs-migration

JANGAN langsung mengubah code.
JANGAN mengandalkan memory atau asumsi dari chat sebelumnya.
Lakukan repository orientation, documentation audit, current-state verification, lalu buat session plan.

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

Jangan melakukan dokumentasi palsu hanya untuk memenuhi checklist.

==================================================
13. SESSION TIMELINE RULE
==================================================

Catat waktu session berdasarkan evidence yang benar-benar tersedia:

```text
Date:
Start:
End:
Duration:
```

- `Start` wajib dicatat pada saat session resmi dimulai jika waktu aktual tersedia.
- `End` dan `Duration` ditentukan saat session ditutup, bukan diprediksi.
- Jika exact time tidak tersedia, tulis:
  `Tidak ditemukan di repository/evidence yang tersedia.`
- Jika hanya tanggal/period yang tersedia, jangan mengubahnya menjadi durasi.
- Jika timestamp berasal dari GitHub commit, tandai sumbernya sebagai GitHub commit.
- Jangan mengarang, mengestimasi, atau menyimpulkan durasi tanpa evidence.
- Root `README.md` dan `docs/progress/README.md` harus konsisten dengan timeline yang sudah terverifikasi.

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
9. First implementation step

Jika ada data yang tidak dapat diverifikasi:
`Tidak ditemukan di repository/evidence yang tersedia.`
```
