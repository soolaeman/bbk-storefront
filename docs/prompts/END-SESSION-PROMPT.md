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

Ekstrak hanya berdasarkan conversation/session dan GitHub evidence yang benar-benar tersedia.

Jika fakta tidak tersedia, tulis:
`Tidak ditemukan di conversation.`

Jangan mengarang.

==================================================
2. REPOSITORY / VIBE-CODING DRIFT AUDIT
==================================================

Audit repository state aktual terhadap dokumentasi.
Periksa file baru/deleted/renamed, component, route, API, asset, copy owner, data contract, dan component ownership.
Gunakan repository/GitHub sebagai sumber kebenaran struktur file.

==================================================
3. STATUS
==================================================

Klasifikasikan:
- DONE / VERIFIED
- DONE / CODE ONLY
- PARTIAL
- BLOCKED
- DEFERRED
- FAILED / ABORTED

Pisahkan implemented, build verified, localhost/runtime verified, upstream verified, desktop verified, mobile verified.

==================================================
4. PARETO
==================================================

Pilih maksimal 5:

### Top 20% Changes
### Top 20% Bottlenecks
### Top 20% Decisions

Pareto hanya untuk prioritas; jangan hapus history teknis.

==================================================
5. SAVE / UPDATE PROGRESS ARCHIVE
==================================================

Buat/update:
`docs/progress/CHAT-X.Y.md`

Minimal:
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

Pertahankan chronology, tanggal/period, fokus, status, links, milestones, current migration position, dan current Pareto focus.

==================================================
7. UPDATE ROOT README
==================================================

WAJIB update:
`README.md`

README root adalah current-state dashboard, bukan forensic log.
Update current phase, verified state, Pareto priorities, locked decisions, technical debt, chronology/docs links, last code checkpoint, last documentation checkpoint, dan next-chat handoff.

==================================================
8. GUIDES AUDIT
==================================================

Audit seluruh `docs/guides/*`.
Jika repository berubah sehingga guide stale, update hanya guide yang terdampak.
Jika masih valid, jangan membuat perubahan palsu.

==================================================
9. PROMPTS AUDIT
==================================================

Audit `docs/prompts/*`.

- `END-SESSION-PROMPT.md` = satu-satunya canonical end-session normal.
- `FORENSIC-EXTRACTION-PROMPT.md` = old/closed chats yang belum terdokumentasi.
- `UPDATE-DOCUMENTATION-PROMPT.md` = sinkronisasi guides + README + NAVIGATOR bila diperlukan.

Jangan membuat prompt end-session alternatif tanpa workflow nyata.

==================================================
10. ROOT SHORTCUT
==================================================

Pastikan root `end-session-prompt.md` tetap menjadi shortcut sederhana menuju:
`docs/prompts/END-SESSION-PROMPT.md`

Jangan membuat canonical prompt kedua di root.

==================================================
11. NAVIGATOR
==================================================

WAJIB audit/update:
`NAVIGATOR.md`

Pastikan tabel repository documentation map mencerminkan file/folder `.md` yang benar-benar ada.
Setiap link harus valid secara logis dan menjelaskan fungsi/kapan dipakai.

Semua `.md` selain root `README.md` dan `NAVIGATOR.md` harus menyediakan link kembali ke Navigator.

==================================================
12. BOTTLENECK REGISTER
==================================================

Jika ada bottleneck baru, tambahkan ID berikutnya.
Format:
`B-XX | Chat | Problem | Root Cause | Resolution | Lesson | Status`

Jangan mengganti ID lama.

==================================================
13. TIMELINE
==================================================

Catat:
Date / Start / End.
Jika exact time tidak tersedia:
`Tidak ditemukan di conversation.`

Jika tanggal berasal dari GitHub commit, sebutkan sumbernya.

==================================================
14. GIT / VERIFICATION
==================================================

Jika perubahan code dalam scope belum committed, commit dengan message jelas dan catat full SHA.
Prefer:
`1 milestone = 1 verified commit`

Setelah documentation write/commit, verify write berhasil sebelum melaporkan SHA.
Jangan mengarang SHA.

==================================================
15. FINAL CHECK
==================================================

Pastikan:
- progress archive tersimpan
- progress index tersimpan
- root README tersimpan
- impacted guides diperbarui atau dinyatakan valid
- impacted prompts diperbarui atau dinyatakan valid
- NAVIGATOR tersimpan dan links valid
- root `end-session-prompt.md` menunjuk canonical prompt
- reported SHAs berasal dari successful writes/commits

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
7. Navigator SHA
8. Root shortcut SHA
9. Last code checkpoint SHA
10. Top 3 carried-forward items
11. Next conversation title
```
