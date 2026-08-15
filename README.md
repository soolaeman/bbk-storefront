# BBKitchen Frontend — Next.js Migration

Frontend baru **Bukan Baru Kitchen / BBKitchen**.

Branch aktif: `feature/nextjs-migration`

> **README = current state + Pareto summary + handoff.** Detailed session history lives in `docs/progress/`.

---

# 🏁 CURRENT CHECKPOINT

```text
Chat 1.1 → ✅ Archived
Chat 1.2 → ✅ Archived
Chat 1.3 → ✅ Archived
Chat 1.4 → ✅ CLOSED / DONE
Chat 1.5 → 🚀 NEXT
```

Last code checkpoint:

```text
26f3911f0d60c595656e85f1e9b65087bab86132
feat: add video covers to social media cards
```

GitHub evidence: **15 August 2026 21:24:06 UTC**.

---

# 📚 DOCUMENTATION MAP

| Area | Document | Purpose |
|---|---|---|
| 📊 Progress | [Progress Archive](docs/progress/README.md) | Index seluruh history session |
| 📖 Guide | [Copy Editing Guide](docs/guides/COPY-EDITING-GUIDE.md) | Panduan teknis mencari/mengganti copy |
| 📖 Guide | [Vibe Coding Copy Guide](docs/guides/VIBE-CODING-COPY-GUIDE.md) | Versi awam: “copy ini ada di file mana?” |
| 🤖 Prompt | [End Session Prompt](docs/prompts/END-SESSION-PROMPT.md) | Prompt lengkap untuk menutup session |
| 🤖 Prompt | [Quick End Session](docs/prompts/QUICK-END-SESSION-PROMPT.md) | Prompt cepat untuk session kecil |
| 🤖 Prompt | [Forensic Extraction](docs/prompts/FORENSIC-EXTRACTION-PROMPT.md) | Ekstrak history dari chat lama/skipped messages |
| 🚪 Shortcut | [End Session Shortcut](end-session-prompt.md) | Shortcut ke protokol end-session |

### Progress archives

- [Chat 1.1](docs/progress/CHAT-1.1.md) — Foundation / WooCommerce migration
- [Chat 1.2](docs/progress/CHAT-1.2.md) — API / metadata / catalog / product / SEO
- [Chat 1.3](docs/progress/CHAT-1.3.md) — Frontend integration / routing / visual convergence
- [Chat 1.4](docs/progress/CHAT-1.4.md) — Homepage / conversion / visual finalization

### Documentation rule

```text
Chat session
    ↓
Forensic extraction
    ↓
docs/progress/CHAT-X.Y.md
    ↓
Pareto synthesis
    ↓
README.md
    ↓
Next-chat handoff
```

README should stay readable. Do not turn it into a full session log.

---

# 🎯 CURRENT PROGRESS — PARETO

## Top 20% priorities → ~80% impact

### P0 — highest impact

1. **Responsive/mobile QA** across homepage, catalog, product detail, and local pages.
2. **Shared Header + search interaction** — verify typing, behavior, sticky state, and parity.
3. **Product Detail visual parity** with the homepage/shared Header.
4. **Catalog → conversion path** — READY/SOLD state, WhatsApp inquiry, and product discoverability.

### P1 — next layer

5. Article/local landing typography and editorial rendering.
6. Dapur MBG + Produksi Baru CTA consistency.
7. Related Products + authoritative ACF filtering.
8. API/runtime reliability and production hardening.

### P2 — polish / hardening

9. SEO/performance/accessibility audit.
10. Admin/Core System workflows and operational integrations.

---

# 📊 CURRENT STATE

| Area | Status | Note |
|---|---|---|
| WooCommerce data architecture | ✅ | Live source-of-truth baseline |
| Catalog / pagination | ✅ | Server-side, 8/page baseline |
| Product Detail | ✅ | Functional; visual parity audit remains |
| Local hierarchical routing | ✅ | `[...slug]` verified |
| Shared Header | ⚠️ | Integrated; interaction/parity audit remains |
| Global search | ⚠️ | UI exists; typing/interaction needs verification |
| Article typography | ⚠️ | Content renders; editorial parity remains |
| Mobile QA | ⚠️ | Not fully evidenced in prior forensic sessions |
| WhatsApp contracts | ✅ | Product / MBG / Produksi Baru normalized |
| READY / SOLD behavior | ✅ | SOLD remains discoverable |
| Hero desktop/mobile | ✅ | Dedicated backgrounds |
| Social video covers | ✅ | Cover-first approach |
| Universal floating mascot | 🔒 | Explicitly rejected |
| Core System / admin workflows | ⏳ | Future phase |

---

# 🧭 ARCHITECTURE BASELINE

```text
WordPress / WooCommerce
        ↓
BBK Core System
        ↓
Next.js Data Layer
        ↓
Home / Catalog / Product / Pages
        ↓
Shared Design System
        ↓
Desktop + Mobile UX
```

- **WooCommerce:** products, prices, stock, categories, images, slug, descriptions.
- **WordPress/ACF:** inventory metadata such as `kode_unit`, `status_unit`, `kondisi_unit`, `lokasi_unit`, `link_telegram`.
- **Core System:** inventory/business logic + integrations.
- **Next.js:** presentation, routing, rendering, SEO presentation, catalog/conversion UX.
- **Google Sheets:** backend/Core System concern; never expose credentials in client.

Locked principles:

- Next.js is the experience layer, not the inventory source of truth.
- Catalog pagination is server-side.
- Product route: `/product/[slug]`.
- Local route: `/jual-barang-bekas-restoran/[...slug]`.
- Existing SEO URL/slug intent must be preserved.
- Inventory business logic does not belong in presentation components.
- SOLD Product Cards remain discoverable.
- Homepage positioning is primarily sales.

---

# 💬 LOCKED UX CONTRACTS

## Dapur MBG

```text
Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.
```

Direct WhatsApp from Header/Hero/Service/Footer.

## Produksi Baru

```text
Halo BBKitchen, mohon info peralatan dapur/restoran custom atau produksi baru
```

Direct WhatsApp from Header/Hero/Service/Footer.

## Product WhatsApp

```text
Halo Tim BBKitchen, saya tertarik dan ingin menanyakan penawaran harga dan ketersediaan untuk unit:

Nama Unit: {NAMA UNIT}

SKU/ID: {SKU}

Lokasi Unit: {LOKASI}

Kondisi: {BARU|BEKAS}

Apakah unit ini masih tersedia? Mohon info harga penawaran dan spesifikasi detailnya. Terima kasih.
```

## READY / SOLD

```text
READY → Tanya WA
SOLD  → Tanya Lainnya
```

## Hero

```text
public/images/hero/bbkitchen-hero-desktop.webp
public/images/hero/bbkitchen-hero-mobile.webp
```

`Lihat Unit yang Tersedia →` scrolls to catalog.

## Social Video

```text
public/images/social/youtube-shorts-cover.webp
public/images/social/tiktok-cover.webp
```

Target: `1280×720`, `16:9`, WebP. Cover first → play overlay → iframe after click.

---

# ⚠️ MASTER BOTTLENECK SNAPSHOT

| ID | Chat | Problem | Status |
|---|---|---|---|
| B-1 | 1.1 | WooCommerce 401/auth | Closed |
| B-2 | 1.1 | Catalog volume/pagination | Closed |
| B-3 | 1.1 | ACF REST limitation | Carried |
| B-4 | 1.1 | Mock catalog | Closed |
| B-5 | 1.2 | Metadata/taxonomy contract | Closed |
| B-6 | 1.2 | Upstream 502/reset | Carried |
| B-7 | 1.2 | SEO preservation | Locked |
| B-8 | 1.3 | Single location route | Closed |
| B-9 | 1.3 | Relative import after route refactor | Closed |
| B-10 | 1.3 | Stale `.next` artifacts | Closed |
| B-11 | 1.3 | Server/Client Header boundary | Closed |
| B-12 | 1.3 | Article typography | Carried |
| B-13 | 1.3 | Search interaction | Carried |
| B-14 | 1.3 | Product Detail Header parity | Carried |
| B-15 | 1.4 | Floating mascot composition | Closed / Do not repeat |
| B-16 | 1.4 | Empty social cards | Closed |
| B-17 | 1.4 | Duplicate WA wording | Closed |

Full forensic details: [open progress archive](docs/progress/README.md).

---

# 🚫 FAILED APPROACHES — DO NOT REPEAT

- Mock catalog as source of truth.
- Frontend-only category patches.
- Single `[location]` route for hierarchical WordPress URLs.
- Treating stale `.next` artifacts as architecture failure.
- Treating `next build` success as proof upstream runtime is healthy.
- Importing interactive Client Components as pure Server Components.
- Floating the same transparent mascot through every section.
- Mass-changing existing SEO slugs.
- Exposing WooCommerce/Google credentials to client code.

---

# 🧱 TECHNICAL DEBT → CHAT 1.5

1. Article/local landing editorial typography.
2. Header search interaction + sticky behavior audit.
3. Product Detail shared Header parity.
4. Related Products finalization.
5. Authoritative ACF filtering.
6. Admin/Core System workflow.
7. SOLD → Google Sheets.
8. Mobile QA across templates.
9. Production performance/accessibility hardening.

---

# 🧪 VERIFICATION RULE

```text
implemented
  ↓
localhost verified
  ↓
desktop verified
  ↓
mobile verified
  ↓
no obvious regression
  ↓
build verified
  ↓
commit
  ↓
README + progress archive updated at milestone/session close
```

Always distinguish:

```text
build verified
runtime verified
upstream verified
UI verified
mobile verified
```

Known non-blocking environment warning:

```text
Next.js ignored package-lock.json in C:\Users\Lenovo
because it is outside the Git repository.
```

---

# 🔍 SEO BASELINE

GSC snapshot supplied for 15 August 2026:

```text
16 months
Clicks        ~1.01K
Impressions   ~28.1K
CTR           3.6%
Avg position  9.5
Indexed       ~2.29K
Not indexed   ~413
```

Preserve URL, slug, search intent, canonical/schema/internal linking. Never mass-redirect or mass-noindex without mapping/audit.

---

# 📦 IMPORTANT FILES / ASSETS

```text
public/images/hero/bbkitchen-hero-desktop.webp
public/images/hero/bbkitchen-hero-mobile.webp
public/images/people/bbkitchen-team-thumbs-up.webp
public/images/people/bbkitchen-chef-presenting.webp
public/images/people/bbkitchen-chef-pointing.webp
public/images/people/bbkitchen-chef-trust.webp
public/images/social/youtube-shorts-cover.webp
public/images/social/tiktok-cover.webp

src/components/Header.tsx
src/components/Footer.tsx
src/components/ProductCard.tsx
src/components/SocialMediaSection.tsx
src/components/CategoryFilter.tsx
src/app/page.tsx
src/app/catalog/page.tsx
src/app/product/[slug]/page.tsx
src/app/jual-barang-bekas-restoran/[...slug]/page.tsx
src/app/api/products/route.ts
src/data/products.ts
src/lib/wordpress.ts
src/lib/woocommerce.ts
```

For copy-location help: [📖 Guides](docs/guides/README.md).

---

# 🚀 CHAT 1.5 HANDOFF

Start title:

```text
1.5 BBKitchen Next.js Migration
```

First actions:

1. Read this README.
2. Read the relevant [progress archive](docs/progress/README.md) if the task touches migration history.
3. Audit current branch/code before changing anything.
4. Verify build/runtime state.
5. Follow the Pareto priorities above.
6. Prefer `1 step = 1 file = 1 verified commit`.
7. At session close, run the [End Session Prompt](docs/prompts/END-SESSION-PROMPT.md).

### Do not repeat

- Do not return to mock catalog.
- Do not invent frontend-only inventory truth.
- Do not mass-change SEO slugs.
- Do not reintroduce universal floating mascot layers.
- Do not claim verification without evidence.

---

# 📜 MIGRATION HISTORY INDEX

Detailed history:

- [Chat 1.1](docs/progress/CHAT-1.1.md)
- [Chat 1.2](docs/progress/CHAT-1.2.md)
- [Chat 1.3](docs/progress/CHAT-1.3.md)
- [Chat 1.4](docs/progress/CHAT-1.4.md)
- [📊 Progress Archive README](docs/progress/README.md)

---

# 📖 GUIDES

- [Copy Editing Guide](docs/guides/COPY-EDITING-GUIDE.md)
- [Vibe Coding Copy Guide](docs/guides/VIBE-CODING-COPY-GUIDE.md)
- [📚 Guides Index](docs/guides/README.md)

---

# 🤖 PROMPTS

- [🧠 Full End Session Prompt](docs/prompts/END-SESSION-PROMPT.md)
- [⚡ Quick End Session Prompt](docs/prompts/QUICK-END-SESSION-PROMPT.md)
- [🔎 Forensic Extraction Prompt](docs/prompts/FORENSIC-EXTRACTION-PROMPT.md)

---

# 🔐 SESSION CLOSE

[🚪 Open Root End Session Shortcut](end-session-prompt.md)

---

# FINAL CHECKPOINT

```text
Chat 1.1 → forensic archived
Chat 1.2 → forensic archived
Chat 1.3 → forensic archived
Chat 1.4 → ✅ CLOSED
Chat 1.5 → 🚀 NEXT

Branch: feature/nextjs-migration
Last code checkpoint: 26f3911f0d60c595656e85f1e9b65087bab86132
```
