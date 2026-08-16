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
| **Mulai session baru** | [`docs/prompts/START-SESSION-PROMPT.md`](docs/prompts/START-SESSION-PROMPT.md) | Canonical orientation workflow sebelum coding, termasuk bootstrap `CHAT-X.Y.md` + session timestamp. |
| **Menutup session** | [`docs/prompts/END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md) | Canonical forensic close, documentation audit, verification, dan handoff. |
| Sinkronisasi dokumentasi saja | [`docs/prompts/UPDATE-DOCUMENTATION-PROMPT.md`](docs/prompts/UPDATE-DOCUMENTATION-PROMPT.md) | Sinkronisasi guides + README + Navigator terhadap repository terkini. |

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
| [`docs/progress/CHAT-1.1.md`](docs/progress/CHAT-1.1.md) | Forensic history Chat 1.1 | Saat perlu memahami foundation dan bottleneck awal. |
| [`docs/progress/CHAT-1.2.md`](docs/progress/CHAT-1.2.md) | Forensic history Chat 1.2 | Saat perlu memahami WooCommerce/API/ACF/SEO migration. |
| [`docs/progress/CHAT-1.3.md`](docs/progress/CHAT-1.3.md) | Forensic history Chat 1.3 | Saat perlu memahami catch-all routing, Header, article integration, dan visual convergence. |
| [`docs/progress/CHAT-1.4.md`](docs/progress/CHAT-1.4.md) | Forensic history Chat 1.4 | Saat perlu memahami homepage sales positioning, CTA, hero assets, mascot dead end, dan social video covers. |
| [`docs/progress/CHAT-1.5.md`](docs/progress/CHAT-1.5.md) | Forensic history Chat 1.5 | Saat perlu memahami documentation orientation, timeline synchronization, dan session-hardening work. |
| [`docs/progress/CHAT-1.6.md`](docs/progress/CHAT-1.6.md) | Forensic history Chat 1.6 | Saat perlu memahami responsive UI polish, shared Footer, related products, service/testimonial/gallery carousel work. |

> **Rule:** `docs/progress/` = sejarah. Untuk kondisi terbaru, pakai root `README.md`.

---

## 📖 Guides

| File | Dipakai untuk | Kapan buka? |
|---|---|---|
| [`docs/guides/README.md`](docs/guides/README.md) | Index semua human/vibe-coding guides | Saat belum tahu guide mana yang relevan. |
| [`docs/guides/COPY-EDITING-GUIDE.md`](docs/guides/COPY-EDITING-GUIDE.md) | Menemukan lokasi copy dan mengubah copy dengan aman | Saat mau mengganti headline, CTA, label, section copy, katalog, layanan, atau gallery copy. |
| [`docs/guides/VIBE-CODING-COPY-GUIDE.md`](docs/guides/VIBE-CODING-COPY-GUIDE.md) | Versi sederhana untuk user non-developer / vibe coding | Saat mau mengubah copy tanpa perlu memahami seluruh architecture. |

> **Guide = menjelaskan.** Guide bukan instruksi eksekusi AI.

---

## 🤖 Prompts / AI Workflows

| File | Dipakai untuk | Kapan buka? |
|---|---|---|
| [`docs/prompts/START-SESSION-PROMPT.md`](docs/prompts/START-SESSION-PROMPT.md) | Bootstrap timestamp + `CHAT-X.Y.md`, orientasi repository, documentation, verification sebelum coding | **Awal setiap migration chat/session baru.** |
| [`docs/prompts/END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md) | Menutup session: forensic extraction, repository audit, documentation audit, verification, dan handoff | **Akhir setiap migration chat/session normal.** |
| [`docs/prompts/UPDATE-DOCUMENTATION-PROMPT.md`](docs/prompts/UPDATE-DOCUMENTATION-PROMPT.md) | Sinkronisasi guides + root README + Navigator terhadap repository terkini | Saat dokumentasi perlu diselaraskan tanpa forensic session close. |
| [`docs/prompts/FORENSIC-EXTRACTION-PROMPT.md`](docs/prompts/FORENSIC-EXTRACTION-PROMPT.md) | Mengekstrak history dari chat lama / transcript yang tidak lengkap | Saat mengarsipkan atau memperbaiki history session lama. |

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

"Gue harus edit file mana?"
        ↓
docs/guides/

"AI harus menjalankan workflow apa?"
        ↓
docs/prompts/

"Di mana semua dokumentasinya?"
        ↓
NAVIGATOR.md
```
