````md
[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen — Update Guides & Documentation Prompt

Use this prompt when you want to synchronize the **human-facing documentation and session workflow SOP** after repository or project-rule changes.

This is separate from the normal End Session prompt.

The purpose of this prompt is to ensure that:
- human-facing guides remain accurate;
- the root README reflects the current project state;
- the Navigator reflects the actual documentation structure;
- `START-SESSION-PROMPT.md` reflects the **current verified session-bootstrap rules**;
- historical progress remains forensic and is not rewritten merely because current rules evolved.

---

## Targets

### Guides
- `docs/guides/COPY-EDITING-GUIDE.md`
- `docs/guides/VIBE-CODING-COPY-GUIDE.md`
- `docs/guides/README.md`

### General README
- `README.md`

### Navigator
- `NAVIGATOR.md`

### Session Workflow SOP
- `docs/prompts/START-SESSION-PROMPT.md`

---

## Protected / Do Not Update

Do not update these with this prompt:

- source code
- assets
- `docs/progress/CHAT-X.Y.md`
- `docs/progress/README.md`
- `docs/prompts/END-SESSION-PROMPT.md`
- `docs/prompts/UPDATE-DOCUMENTATION-PROMPT.md`

Do not perform forensic session extraction with this prompt.

Do not rewrite historical session archives merely to make them match current architecture or workflow rules.

---

# PROMPT

```text
# UPDATE BBKITCHEN GUIDES + GENERAL README + NAVIGATOR + START SESSION SOP

Repository:
soolaeman/Front-End-BBKitchen

Branch:
main

Saya ingin menyinkronkan dokumentasi manusia/vibe-coder,
current-state README, Navigator, dan START SESSION workflow
dengan repository serta CURRENT PROJECT FACTS.

TARGET WAJIB:

GUIDES
1. docs/guides/COPY-EDITING-GUIDE.md
2. docs/guides/VIBE-CODING-COPY-GUIDE.md
3. docs/guides/README.md

GENERAL README
4. README.md

NAVIGATOR
5. NAVIGATOR.md

SESSION WORKFLOW SOP
6. docs/prompts/START-SESSION-PROMPT.md

Jangan mengubah:
- source code
- assets
- docs/progress/CHAT-X.Y.md
- docs/progress/README.md
- docs/prompts/END-SESSION-PROMPT.md
- docs/prompts/UPDATE-DOCUMENTATION-PROMPT.md

Jangan membuat commit kosong.

==================================================
1. AUDIT REPOSITORY TERLEBIH DAHULU
==================================================

Audit struktur repository aktual sebelum melakukan perubahan.

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
- documentation structure berubah
- prompt/SOP structure berubah

Gunakan:

- current Git status
- current branch
- repository tree
- current source files
- current documentation
- current progress synthesis
- current session workflow rules

sebagai sumber kebenaran.

Jangan mengandalkan memory atau dokumentasi lama jika repository menunjukkan struktur yang berbeda.

Jangan mengarang file, path, component, API, route, prop, contract, atau ownership.

==================================================
2. AUDIT CURRENT PROJECT FACTS
==================================================

Sebelum memperbarui dokumentasi, identifikasi CURRENT PROJECT FACTS
yang benar-benar dapat dibuktikan dari repository dan current project
documentation.

Minimal periksa:

- current architecture
- current frontend structure
- WordPress/WooCommerce/ACF/Core System relationship
- current UI/UX contracts
- current admin-control requirements
- current SEO/public-renderer strategy
- current Pareto priorities
- current progress archive structure
- current session timeline rules
- current session numbering
- current timestamp/evidence rules
- current Start / End / Duration rules
- working time vs calendar elapsed time rules
- clarification-session convention such as CHAT-X.YB.md
- Git checkpoint rules
- post-GitHub-change `git pull` rule
- current verification requirements
- current AI-assisted / vibe-coding transparency rules

Do not treat assumptions as facts.

If a fact cannot be proven:

`Tidak ditemukan di repository/evidence yang tersedia.`

==================================================
3. UPDATE COPY-EDITING-GUIDE.md
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

Jika copy berasal dari API/WordPress/config, jangan klaim
hardcoded frontend.

Jika copy ownership berubah, dokumentasikan owner yang aktual.

Jangan mengarang file, prop, helper, route, atau contract.

Untuk admin controls, bedakan dengan jelas:

- visible public copy
- authenticated admin-only label
- action behavior
- backend mutation
- ACF-sourced value

Jangan mengklaim admin behavior sudah implemented jika repository
hanya menunjukkan UI/state foundation.

==================================================
4. UPDATE VIBE-CODING-COPY-GUIDE.md
==================================================

Ini untuk user awam.

Pastikan:

- bahasa sederhana
- Ctrl+Shift+F adalah metode utama mencari copy
- peta "yang mau diubah → file yang dicek" akurat
- COPY vs LOGIC jelas
- ada warning untuk logic sensitif
- user tidak diarahkan mengubah API/URL/state/contract hanya karena
  ingin mengganti tulisan
- jangan mengubah authentication, permission, API, status mutation,
  routing, atau data contract hanya untuk mengganti copy

Jika struktur file berubah, update path.

Jangan membuat tutorial engineering yang berat.

==================================================
5. UPDATE docs/guides/README.md
==================================================

Jadikan sebagai index ringkas.

Pastikan:

- hanya guide yang benar-benar ada yang ditautkan
- semua relative link benar
- tujuan setiap guide jelas
- tidak mencampur progress/history
- tidak mencampur prompt/SOP
- tidak mengklaim guide sebagai source of truth jika bukan

Jangan membuat guide baru hanya demi checklist.

==================================================
6. UPDATE ROOT README.md
==================================================

README root adalah dashboard current state.

Gunakan prinsip Pareto:
cukup informasi yang menjelaskan sekitar 80% kondisi project.

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
- current launch architecture
- current SEO/public-renderer strategy
- current authenticated admin-control requirements
- AI-assisted development transparency where relevant

README bukan:

- forensic log
- session journal
- full changelog
- transcript

Jangan menyalin seluruh progress archive ke README.

--------------------------------------------------
6A. ROOT README — SESSION TIMELINE / PROGRESS RULE
--------------------------------------------------

Jika README menampilkan migration progress antar-session:

- chronology harus mengikuti docs/progress/README.md
- tampilkan tanggal/period tiap session jika tersedia
- tampilkan Start / End / Duration hanya jika dapat diverifikasi
- gunakan evidence dari session/conversation atau GitHub commit metadata
- jika exact time tidak tersedia, tulis:

`Tidak ditemukan di repository/evidence yang tersedia.`

- jika hanya tanggal/period tersedia, jangan mengubahnya menjadi durasi
- jangan mengarang atau mengestimasi elapsed time
- jangan menyamakan calendar span dengan actual working duration
- project elapsed time sejak Chat 1.1 hanya boleh dihitung jika exact
  Chat 1.1 start timestamp terverifikasi
- jika exact Chat 1.1 start belum tersedia, gunakan:

`Actual elapsed duration since Chat 1.1: NOT VERIFIABLE`

- earliest verifiable migration evidence dan calendar span boleh
  ditampilkan sebagai konteks, tetapi harus diberi label dan tidak
  dianggap sebagai working duration
- jika timestamp conflict, jangan silently choose one
- root README tidak boleh menciptakan timing fact yang bertentangan
  dengan progress index

==================================================
7. UPDATE NAVIGATOR.md
==================================================

NAVIGATOR.md adalah peta dokumentasi repository.

Audit seluruh file/folder dokumentasi yang benar-benar ada.

Pastikan tabel menjelaskan:

- file/folder
- fungsi
- kapan digunakan
- link relatif yang benar

Pastikan minimal memetakan jika file memang ada:

- root README
- docs/guides
- docs/progress
- docs/prompts
- START-SESSION-PROMPT.md
- END-SESSION-PROMPT.md
- UPDATE-DOCUMENTATION-PROMPT.md

Jangan mengarang file yang tidak ada.

Semua `.md` selain root `README.md` dan `NAVIGATOR.md` wajib
menyediakan link kembali ke Navigator.

==================================================
8. UPDATE START-SESSION-PROMPT.md
==================================================

Audit:

`docs/prompts/START-SESSION-PROMPT.md`

Tujuan:

Memastikan START-SESSION-PROMPT.md selalu merefleksikan
CURRENT PROJECT FACTS dan aturan session-bootstrap yang
benar-benar berlaku.

START-SESSION-PROMPT.md adalah:

SESSION BOOTSTRAP / OPERATING SOP

Bukan:

- progress archive
- historical session record
- forensic timeline
- transcript

--------------------------------------------------
8A. MANDATORY SESSION BOOTSTRAP
--------------------------------------------------

Pastikan START-SESSION-PROMPT.md secara eksplisit mewajibkan:

1. Menentukan nomor session berikutnya dari current progress.

2. Mencari dan memverifikasi timestamp session start berdasarkan
   evidence yang tersedia.

3. Jangan menganggap current clock sebagai historical session-start
   timestamp jika evidence session-start yang lebih kuat tersedia.

4. Jangan mengarang timestamp.

5. Segera membuat:

`docs/progress/CHAT-X.Y.md`

sebelum coding dimulai.

6. File progress awal WAJIB memuat:

```text
## Date / Session Timeline

Session: X.Y
Started: DD Month YYYY HH:MM:SS WIB
Ended: PENDING
Duration: PENDING
Evidence source: <exact evidence/source>
````

7. Jika timestamp start tidak dapat diverifikasi:

```text
Started: Tidak ditemukan di repository/evidence yang tersedia.
```

8. Jangan mulai implementation/coding sebelum progress file
   session dibuat dan timeline awal diisi.

9. Update progress file selama session berlangsung jika ada
   meaningful architecture, Pareto, verification, atau checkpoint
   changes.

10. Pada END SESSION:

    * verifikasi End timestamp
    * update Duration
    * gunakan hanya Start + End yang terverifikasi
    * jangan mengestimasi duration

---

## 8B. CURRENT-FACT SYNCHRONIZATION

START-SESSION-PROMPT.md harus mengikuti CURRENT PROJECT FACTS.

Jika repository/progress/current project decisions menunjukkan bahwa
aturan session bootstrap berubah, update START-SESSION-PROMPT.md agar
mencerminkan aturan terbaru.

Current facts yang wajib dipertimbangkan meliputi:

* progress archive structure
* session numbering
* session timeline format
* timestamp evidence rules
* Start / End / Duration rules
* working time vs calendar elapsed time
* clarification session convention
* Git checkpoint rules
* post-GitHub-change `git pull` rule
* Pareto workflow
* verification requirements
* current architecture requirements
* AI-assisted / vibe-coding transparency requirements

Jangan mengubah START-SESSION-PROMPT.md hanya berdasarkan asumsi.

Perubahan harus dapat ditelusuri ke:

* repository structure
* current progress documentation
* verified session behavior
* explicit project decision
* current architecture decision

Jika tidak dapat dibuktikan:

`Tidak ditemukan di repository/evidence yang tersedia.`

---

## 8C. HISTORICAL INTEGRITY

Jika current fact memperbaiki aturan SOP:

```text
CURRENT FACT
    ↓
START-SESSION-PROMPT.md
    ↓
future session behavior
```

Jangan:

```text
CURRENT FACT
    ↓
rewrite old progress history
```

Historical progress tetap immutable kecuali ada explicit verified
factual correction.

Contoh:

```text
CHAT-1.6.md
    ↓
tetap sebagai forensic history

CHAT-1.6B.md
    ↓
clarification layer jika requirement baru muncul setelah 1.6

CHAT-1.7.md
    ↓
next implementation session
```

Jangan memasukkan requirement baru ke session lama hanya untuk
membuat history terlihat lebih rapi.

---

## 8D. TIMELINE CONSISTENCY

START-SESSION-PROMPT.md harus menggunakan aturan timeline yang
konsisten dengan:

`docs/progress/README.md`

Namun START-SESSION-PROMPT.md bukan source of truth untuk historical
timestamps.

Gunakan pembagian:

```text
START-SESSION-PROMPT.md
→ aturan bagaimana session baru dimulai

docs/progress/CHAT-X.Y.md
→ fakta/history session tertentu

docs/progress/README.md
→ synthesis/timeline seluruh migration

README.md
→ current project dashboard
```

Jangan mencampurkan fungsi keempat layer tersebut.

---

## 8E. SESSION TIMING RULE

Pastikan START-SESSION-PROMPT.md membedakan:

SESSION WORKING TIME
vs
CALENDAR / ELAPSED TIME

Jangan menyamakan keduanya.

Gunakan:

```text
verified End timestamp
        -
verified Start timestamp
        =
actual session duration
```

Jika hanya tanggal yang tersedia:

`Duration: —`

Jika hanya Start yang tersedia:

`Duration: PENDING`

Jika evidence conflict:

* jangan silently choose one
* preserve conflict
* flag for verification

==================================================
9. STATUS DISCIPLINE
====================

Gunakan:

✅ verified
⚠️ partial / needs QA
⏳ pending / deferred
🔒 locked
❌ failed / rejected

Jangan menyamakan:

* code exists
* build verified
* runtime verified
* upstream verified
* UI verified
* mobile verified
* security verified
* SEO verified
* production verified

Untuk admin controls, jangan menganggap:

`isAdminMode`

sebagai authentication.

Untuk SEO takeover, jangan menganggap:

`Next.js route exists`

sebagai proof bahwa WordPress public route sudah disabled,
redirected, canonicalized, atau de-indexed.

==================================================
10. DRIFT CLASSIFICATION
========================

Untuk setiap referensi dokumentasi yang diperiksa:

VALID
→ tetap benar

STALE
→ path/contract/ownership sudah berubah; update

MISSING
→ informasi penting belum ada; tambahkan

UNKNOWN
→ tidak dapat dibuktikan; tulis:

`Tidak ditemukan di repository/evidence yang tersedia.`

Jangan menyamarkan UNKNOWN sebagai VERIFIED.

==================================================
11. PARETO RULE
===============

Keep docs concise.

Guides menjawab:

"Bagaimana saya menggunakan/memahami bagian ini sekarang?"

README menjawab:

"Project sekarang ada di mana dan apa prioritas berikutnya?"

Navigator menjawab:

"Dokumentasi mana yang harus saya buka?"

START-SESSION-PROMPT menjawab:

"Bagaimana session baru harus dimulai dan bagaimana current
session rules diterapkan?"

History detail tetap berada di:

`docs/progress/`

Jangan memindahkan forensic history ke README, guides, Navigator,
atau START-SESSION-PROMPT.

==================================================
12. VERIFY
==========

Sebelum commit:

* semua referenced file/path benar-benar ada
* tidak ada old path yang masih disebut
* relative documentation links valid secara logis
* tiga guides konsisten
* Navigator konsisten dengan repository
* README konsisten dengan current repository
* START-SESSION-PROMPT.md konsisten dengan current session rules
* START-SESSION-PROMPT.md tidak berisi invented historical timestamps
* START-SESSION-PROMPT.md tidak menggantikan progress history
* session chronology/timeline di README konsisten dengan progress index
* project elapsed-time status since Chat 1.1 konsisten dengan progress index
* no duration is inferred from calendar span
* current architecture requirements are reflected accurately
* admin-control requirements are not falsely marked implemented
* SEO takeover requirements are not falsely marked implemented
* AI-assisted development claims remain honest
* no source code or asset changes were made
* no docs/progress history was rewritten by this prompt

==================================================
13. COMMIT
==========

Jika ada perubahan dokumentasi:

Commit message:

```text
docs: sync guides README and navigator with current repository
```

Catat full SHA hasil write/commit yang berhasil.

Jika START-SESSION-PROMPT.md juga berubah, perubahan tersebut tetap
termasuk dalam documentation sync commit.

Jika tidak ada perubahan:

`NO DOCUMENTATION CHANGES NEEDED`

Jangan membuat commit kosong.

==================================================
14. FINAL RESPONSE
==================

Jawab ringkas:

1. Guides: updated / no changes
2. README: updated / no changes
3. Navigator: updated / no changes
4. START-SESSION-PROMPT.md: updated / no changes
5. Files changed
6. Main drift fixed
7. Current-fact synchronization:

   * rule added/corrected
   * reason
8. Session timeline impact:

   * Date
   * Start
   * End
   * Duration
     jika relevan dan terverifikasi
9. Project elapsed-time status since Chat 1.1
10. Commit SHA, jika ada
11. Unknowns / items still not provable

Jangan mengklaim perubahan sebagai verified jika hanya didokumentasikan
dan belum diimplementasikan.

````

### Important design decision

```text
UPDATE-DOCUMENTATION-PROMPT
        ↓
audit CURRENT FACTS
        ↓
sync human-facing docs
        ↓
sync START-SESSION-PROMPT.md
        ↓
future sessions use updated SOP

BUT

docs/progress/
        ↓
historical record
        ↓
DO NOT rewrite just because SOP changed
````

