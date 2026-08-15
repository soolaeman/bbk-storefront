# BBKitchen Frontend — Next.js Migration

Branch aktif: `feature/nextjs-migration`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md). Struktur file mengikuti repository aktual.

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 SESSION START

```text
Session: 1.5 BBKitchen Next.js Migration
Started: 16 August 2026 06:32:41 WIB (Asia/Jakarta)
Elapsed: berjalan sejak 06:32:41 WIB
Ended: —
Duration: —
```

> **Elapsed time:** untuk session aktif, hanya boleh dihitung dari `Start` ke timestamp update yang benar-benar terverifikasi. `Duration` final hanya ditetapkan saat session memiliki `End` yang terverifikasi.

---

# 🏁 CURRENT CHECKPOINT

```text
Chat 1.1 → ✅ Archived
Chat 1.2 → ✅ Archived
Chat 1.3 → ✅ Archived
Chat 1.4 → ✅ Closed
Chat 1.5 → 🚀 Active
```

## Last code checkpoint

```text
26f3911f0d60c595656e85f1e9b65087bab86132
feat: add video covers to social media cards
```

GitHub date: **15 August 2026 21:24:06 UTC**.

## Current documentation checkpoint

```text
Progress index sync:
be14242e0d53279e958ec5c2ef299acdbd5393c0
```

> Documentation-only commits may advance the branch without changing the application-code checkpoint above.

---

# 📈 MIGRATION PROGRESS

| Session | Periode / waktu terverifikasi | Start | End | Durasi | Fokus utama | Hasil utama | Status |
|---|---|---|---|---:|---|---|---|
| 1.1 | **14 Aug 2026** | **17:04 WIB** | — | — | Foundation | WooCommerce source of truth, server-side API boundary, pagination baseline | ✅ |
| 1.2 | 14–15 Aug 2026 evidence | Tidak ditemukan | Tidak ditemukan | — | API / Metadata / SEO | Live catalog contract, metadata endpoint, Product Detail + SEO foundation | ✅ |
| 1.3 | 15 Aug 2026 evidence | Tidak ditemukan | Tidak ditemukan | — | Routing / Integration | `[...slug]`, shared Header integration, visual convergence foundation | ✅ |
| 1.4 | 15–16 Aug 2026 evidence | Tidak ditemukan | Tidak ditemukan | — | Sales / Conversion | Sales-first homepage, CTA contracts, hero/social assets | ✅ |
| 1.5 | 16 Aug 2026 | 06:32:41 WIB | — | Active | Responsive / Parity / Hardening | Baseline verification + mobile/Header/Product Detail parity next | 🚀 |

### ⏱️ Project elapsed time from Chat 1.1

```text
Chat 1.1 verified start:
14 August 2026 — 17:04 WIB

Chat 1.5 verified start:
16 August 2026 — 06:32:41 WIB

Elapsed project span at Chat 1.5 start:
1 day 13 hours 28 minutes 41 seconds

Actual total working duration across all chats:
NOT VERIFIABLE

Reason:
End timestamps / working intervals for earlier chats are not fully verified.
```

> **Important:** elapsed project span ≠ total working duration. The project elapsed span can be calculated from the verified Chat 1.1 start timestamp, but actual working duration requires verified working intervals/end timestamps.

Detail timeline/evidence rule berada di [`docs/progress/README.md`](docs/progress/README.md).

---

# 🚀 NEXT ACTION

**Verify the current application build + localhost/runtime baseline before changing application code.**

Do not treat `code exists` as `verified`.

After baseline verification, continue in Pareto order:

```text
1. Mobile / responsive QA
2. Shared Header: search + sticky + visual parity
3. Product Detail shared-design parity
```

---

# 🎯 CURRENT PRIORITIES — PARETO

1. **Mobile/responsive QA** across homepage, catalog, product detail, and local pages.
2. **Shared Header** — search typing, sticky behavior, and visual parity.
3. **Product Detail** — match shared homepage/Header design system.
4. **Local/article pages** — editorial typography and presentation.
5. **ACF authoritative filtering + Core System / production hardening**.

### Next layer

- Related Products.
- SOLD → Google Sheets workflow.
- SEO/performance/accessibility verification.

---

# 📊 CURRENT STATE + VERIFICATION

| Area | Implementation | Verification |
|---|---|---|
| WooCommerce data architecture | ✅ | ✅ Established baseline |
| Catalog / pagination | ✅ | ✅ Server-side, 8/page baseline |
| Product Detail | ✅ Functional | ⚠️ Visual/shared-Header parity pending |
| Local hierarchical routing | ✅ | ✅ `[...slug]` verified in Chat 1.3 |
| Homepage sales positioning | ✅ | 🔒 Direction locked |
| WhatsApp contracts | ✅ | 🔒 Contracts locked |
| READY / SOLD behavior | ✅ | 🔒 Contract locked; SOLD discoverable |
| Hero desktop/mobile assets | ✅ | ✅ Assets present; final mobile QA pending |
| Social video covers | ✅ | ⚠️ Mobile/runtime QA pending |
| Shared Header | ✅ Integrated | ⚠️ Search typing, sticky behavior, parity pending |
| Article typography | ✅ Content rendering exists | ⚠️ Editorial parity pending |
| Mobile QA | ⏳ | ⚠️ Final cross-template verification pending |
| Universal floating mascot | ❌ Rejected | 🔒 Do not reintroduce |
| ACF/Core System | ⏳ | ⏳ Deferred / hardening phase |

**Important:** no final post-1.4 build/runtime/mobile verification evidence is recorded in the available evidence. The application-code checkpoint therefore remains `26f3911...` until a new code checkpoint is verified.

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

### Locked principles

- Next.js is the experience layer, not the inventory source of truth.
- Catalog pagination is server-side.
- Product route: `/product/[slug]`.
- Local route: `/jual-barang-bekas-restoran/[...slug]`.
- Existing SEO URL/slug intent must be preserved.
- Inventory business logic does not belong in presentation components.
- SOLD Product Cards remain discoverable.
- Homepage positioning is primarily sales.
- Universal floating mascot composition is rejected.

---

# 🔒 LOCKED UX CONTRACTS — SUMMARY

Canonical full wording lives in [`docs/guides/COPY-EDITING-GUIDE.md`](docs/guides/COPY-EDITING-GUIDE.md).

```text
Dapur MBG       → direct WhatsApp
Produksi Baru   → direct WhatsApp
READY           → Tanya WA
SOLD            → Tanya Lainnya
Hero catalog CTA→ scroll to catalog
Social videos   → cover first → play → iframe
```

### Locked direction

- **Dapur MBG:** direct WhatsApp; service may additionally expose the PDF catalog CTA.
- **Produksi Baru:** direct WhatsApp.
- **Product WhatsApp:** normalized multiline unit metadata contract.
- **Hero:** sales-first positioning with `Siap Kirim / Seluruh Indonesia` and catalog CTA.

Do not change routing, SEO, inventory, or message contracts during ordinary copy/UI edits.

---

# ⚠️ ACTIVE BOTTLENECKS

| ID | Problem | Status |
|---|---|---|
| B-3 | ACF REST / authoritative inventory metadata filtering | ⚠️ Carried |
| B-6 | WooCommerce upstream connectivity 502/reset history | ⚠️ Carried; root cause not proven |
| B-12 | Article/local editorial typography | ⚠️ Carried |
| B-13 | Header search interaction | ⚠️ Carried |
| B-14 | Product Detail shared Header parity | ⚠️ Carried |

Resolved historical bottlenecks remain in `docs/progress/`; do not re-open them without new evidence.

---

# 🚫 DO NOT REPEAT

- Mock catalog as source of truth.
- Frontend-only inventory/category truth.
- Single `[location]` route for hierarchical WordPress URLs.
- Treating stale `.next` artifacts as source architecture failure.
- Treating `next build` success as proof upstream runtime is healthy.
- Importing interactive Client Components as pure Server Components.
- Universal floating mascot layers.
- Mass-changing existing SEO slugs.
- Exposing WooCommerce/Google credentials to client code.
- Calling documentation-only commits application-code checkpoints.

---

# 🧱 TECHNICAL DEBT — NOW / NEXT / LATER

### NOW

- Mobile QA across homepage, catalog, Product Detail, and local pages.
- Header search interaction + sticky behavior + parity.
- Product Detail shared Header/design parity.
- Article/local editorial typography.

### NEXT

- Authoritative ACF filtering.
- Related Products.
- Admin/Core System workflow.
- SOLD → Google Sheets.

### LATER

- Production performance/accessibility hardening.
- SEO verification and deeper measurement.

---

# 🧪 VERIFICATION RULE

```text
implemented
  ↓
localhost/runtime verified
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
```

Always distinguish:

```text
build verified
runtime verified
upstream verified
UI verified
desktop verified
mobile verified
```

Known non-blocking environment warning carried from earlier sessions:

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
src/components/KitchenConsultationBanner.tsx
src/components/HeroSection.tsx
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

For copy-location help: [`docs/guides/README.md`](docs/guides/README.md).

---

# 📚 DOCUMENTATION MAP

Use [`NAVIGATOR.md`](NAVIGATOR.md) to jump to any documentation area.

```text
NAVIGATOR.md
├── README.md       → project sekarang ada di mana
├── docs/progress/  → apa yang terjadi di setiap Chat
├── docs/guides/    → kalau mau mengubah/memahami sesuatu
└── docs/prompts/   → workflow AI
```

### Session workflow

- [`docs/prompts/START-SESSION-PROMPT.md`](docs/prompts/START-SESSION-PROMPT.md) → canonical orientation prompt untuk membuka session baru.
- [`docs/prompts/END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md) → canonical forensic close/handoff prompt untuk menutup session.
- [`docs/prompts/UPDATE-DOCUMENTATION-PROMPT.md`](docs/prompts/UPDATE-DOCUMENTATION-PROMPT.md) → documentation-only synchronization workflow.

### Root shortcut

[`end-session-prompt.md`](end-session-prompt.md) → shortcut ke canonical [`docs/prompts/END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md).

---

# 🚀 CHAT 1.5 HANDOFF

Start title:

```text
1.5 BBKitchen Next.js Migration
```

Current session:

```text
Started: 16 August 2026 06:32:41 WIB
Status: ACTIVE
```

First actions:

1. Verify current build/runtime baseline.
2. Audit mobile/responsive behavior.
3. Address Shared Header bottleneck before broader parity work.
4. Prefer `1 step = 1 file = 1 verified commit`.
5. At session close, use [`docs/prompts/END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md).

### Do not repeat

- Do not return to mock catalog.
- Do not invent frontend-only inventory truth.
- Do not mass-change SEO slugs.
- Do not reintroduce universal floating mascot layers.
- Do not claim verification without evidence.

---

# 📜 MIGRATION HISTORY

Use [`NAVIGATOR.md`](NAVIGATOR.md) or [`docs/progress/README.md`](docs/progress/README.md).

```text
Chat 1.1 → foundation — started 14 Aug 2026, 17:04 WIB
Chat 1.2 → live catalog / API / SEO
Chat 1.3 → routing / integration / visual convergence
Chat 1.4 → sales-first homepage / CTA / visual assets
Chat 1.5 → responsive / parity / hardening — started 16 Aug 2026, 06:32:41 WIB
```

---

# FINAL CHECKPOINT

```text
Chat 1.1 → forensic archived
Chat 1.2 → forensic archived
Chat 1.3 → forensic archived
Chat 1.4 → ✅ Closed
Chat 1.5 → 🚀 Active

Branch: feature/nextjs-migration
Last code checkpoint: 26f3911f0d60c595656e85f1e9b65087bab86132
Progress index checkpoint: be14242e0d53279e958ec5c2ef299acdbd5393c0
```
