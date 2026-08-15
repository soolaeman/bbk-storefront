# 🧭 BBKitchen — Documentation Navigator

> **Satu tempat untuk mencari dokumentasi repository.**
>
> `NAVIGATOR.md` adalah peta dokumentasi. Ia tidak menggantikan `README.md`, progress archive, guides, atau prompts.

---

## 🚦 Mulai dari Sini

| Kalau lu mau... | Buka | Gunanya |
|---|---|---|
| Tahu **project sekarang ada di mana** | [`README.md`](README.md) | Dashboard kondisi terbaru, prioritas Pareto, architecture, bottleneck, technical debt, dan handoff. |
| Tahu **apa yang terjadi di tiap chat** | [`docs/progress/README.md`](docs/progress/README.md) | Index sejarah migration dan ringkasan progress lintas session. |
| Tahu **file mana yang harus diedit** | [`docs/guides/README.md`](docs/guides/README.md) | Peta guide untuk memahami lokasi file dan perubahan yang aman. |
| Minta AI **menjalankan workflow** | [`docs/prompts/END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md) | Canonical end-session workflow. |

---

# 🗂️ Repository Documentation Map

## 🏠 Root

| File | Dipakai untuk | Kapan buka? |
|---|---|---|
| [`README.md`](README.md) | **Current project dashboard** | Setiap mulai chat baru atau sebelum mengambil keputusan besar. |
| [`NAVIGATOR.md`](NAVIGATOR.md) | **Peta dokumentasi** | Saat bingung mencari file dokumentasi. |
| [`end-session-prompt.md`](end-session-prompt.md) | **Shortcut ke canonical end-session prompt** | Kalau ingin cepat membuka prompt penutupan session dari root. |

---

## 📊 Progress / History

| File | Dipakai untuk | Kapan buka? |
|---|---|---|
| [`docs/progress/README.md`](docs/progress/README.md) | Index dan ringkasan seluruh progress migration | Saat ingin melihat gambaran sejarah tanpa membaca semua chat. |
| [`CHAT-1.1.md`](docs/progress/CHAT-1.1.md) | Forensic history Chat 1.1 | Saat perlu memahami foundation dan bottleneck awal. |
| [`CHAT-1.2.md`](docs/progress/CHAT-1.2.md) | Forensic history Chat 1.2 | Saat perlu memahami WooCommerce/API/ACF/SEO migration. |
| [`CHAT-1.3.md`](docs/progress/CHAT-1.3.md) | Forensic history Chat 1.3 | Saat perlu memahami catch-all routing, Header, article integration, dan visual convergence. |
| [`CHAT-1.4.md`](docs/progress/CHAT-1.4.md) | Forensic history Chat 1.4 | Saat perlu memahami homepage sales positioning, CTA, hero assets, mascot dead end, dan social video covers. |

> **Rule:** `docs/progress/` = sejarah. Untuk kondisi terbaru, pakai root `README.md`.

---

## 📖 Guides

| File | Dipakai untuk | Kapan buka? |
|---|---|---|
| [`docs/guides/README.md`](docs/guides/README.md) | Index semua human/vibe-coding guides | Saat belum tahu guide mana yang relevan. |
| [`COPY-EDITING-GUIDE.md`](docs/guides/COPY-EDITING-GUIDE.md) | Menemukan lokasi copy dan mengubah copy dengan aman | Saat mau mengganti headline, CTA, label, section copy, atau teks UI. |
| [`VIBE-CODING-COPY-GUIDE.md`](docs/guides/VIBE-CODING-COPY-GUIDE.md) | Versi sederhana untuk user non-developer / vibe coding | Saat mau mengubah copy tanpa perlu memahami seluruh architecture. |

> **Guide = menjelaskan.** Guide bukan instruksi eksekusi AI.

---

## 🤖 Prompts / AI Workflows

| File | Dipakai untuk | Kapan buka? |
|---|---|---|
| [`END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md) | Menutup session: forensic extraction, repository audit, documentation audit, verification, dan handoff | Setiap selesai migration chat/session normal. |
| [`UPDATE-DOCUMENTATION-PROMPT.md`](docs/prompts/UPDATE-DOCUMENTATION-PROMPT.md) | Sinkronisasi guides + root README + Navigator | Saat dokumentasi perlu diperbarui tanpa menjalankan seluruh end-session workflow. |
| [`FORENSIC-EXTRACTION-PROMPT.md`](docs/prompts/FORENSIC-EXTRACTION-PROMPT.md) | Mengekstrak history dari chat lama / transcript yang tidak lengkap | Saat mengarsipkan atau memperbaiki history session lama. |

> **Prompt = instruksi untuk AI.** Source of truth project tetap berada di code, root `README.md`, dan progress archive sesuai konteksnya.

---

# 🧠 Rule of Thumb

```text
"Project sekarang gimana?"
        ↓
README.md

"Kenapa kita sampai di sini?"
        ↓
docs/progress/

"Kalau mau ganti sesuatu, file-nya di mana?"
        ↓
docs/guides/

"AI harus melakukan workflow apa?"
        ↓
docs/prompts/

"Gue mau tutup session dari root."
        ↓
end-session-prompt.md

"Gue bingung mulai dari mana."
        ↓
NAVIGATOR.md
```

---

# 🔗 Quick Access

| Tujuan | Link |
|---|---|
| 🏠 Current Project State | [`README.md`](README.md) |
| 📊 Progress Archive | [`docs/progress/README.md`](docs/progress/README.md) |
| 📖 Guides Index | [`docs/guides/README.md`](docs/guides/README.md) |
| 🤖 Canonical End Session | [`docs/prompts/END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md) |
| 📝 Documentation Sync | [`docs/prompts/UPDATE-DOCUMENTATION-PROMPT.md`](docs/prompts/UPDATE-DOCUMENTATION-PROMPT.md) |
| 🔎 Forensic Extraction | [`docs/prompts/FORENSIC-EXTRACTION-PROMPT.md`](docs/prompts/FORENSIC-EXTRACTION-PROMPT.md) |
| ⚡ Root End Session Shortcut | [`end-session-prompt.md`](end-session-prompt.md) |
| 🧭 Navigator | [`NAVIGATOR.md`](NAVIGATOR.md) |

---

# 📌 Repository Navigation Rule

Semua file `.md` di repository, **kecuali root `README.md` dan `NAVIGATOR.md`**, wajib memiliki link kembali ke Navigator di bagian atas atau area navigasi yang mudah ditemukan.

Gunakan relative path sesuai kedalaman file, misalnya:

```markdown
[🧭 NAVIGATOR](../../NAVIGATOR.md)
```

Untuk file yang berada lebih dalam, sesuaikan jumlah `../`.
