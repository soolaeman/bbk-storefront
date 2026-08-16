# BBKitchen Frontend — Next.js Migration

Branch aktif: `feature/nextjs-migration`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md). Struktur file mengikuti repository aktual.

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 LAST SESSION — CHAT 1.5

```text
Session: 1.5 BBKitchen Next.js Migration
Started: 16 August 2026 06:32:41 WIB (Asia/Jakarta)
Ended: 16 August 2026 07:20 WIB
Duration: 47 minutes 19 seconds
Status: CLOSED
```

> Chat 1.5 was a documentation/repository-orientation session. Application verification baseline was intentionally deferred to the next session.

---

# 🏁 CURRENT CHECKPOINT

```text
Chat 1.1 → ✅ Archived
Chat 1.2 → ✅ Archived
Chat 1.3 → ✅ Archived
Chat 1.4 → ✅ Closed
Chat 1.5 → ✅ Closed
Chat 1.6 → ⏭️ Next
```

## Last code checkpoint

```text
26f3911f0d60c595656e85f1e9b65087bab86132
feat: add video covers to social media cards
```

GitHub date: **15 August 2026 21:24:06 UTC**.

## Current documentation checkpoint

```text
Progress index:
2aa51cbdaba12f6f847bab88f203914506717054
Chat 1.5 archive:
498cc8269bf959f6b46f1ed8f517dc9f11db5905
```

> Documentation-only commits may advance the branch without changing the application-code checkpoint above.

---

# 📈 MIGRATION PROGRESS

| Session | Periode / waktu terverifikasi | Start | End | Durasi | Fokus utama | Hasil utama | Status |
|---|---|---|---|---:|---|---|---|
| 1.1 | **14 Aug 2026** | **12:45 WIB** | **15:12 WIB** | **2h 27m** | Foundation | WooCommerce source of truth, server-side API boundary, pagination baseline | ✅ |
| 1.2 | **14 Aug 2026** | **17:00 WIB** | **21:00 WIB** | **4h** | API / Metadata / SEO | Live catalog contract, metadata endpoint, Product Detail + SEO foundation | ✅ |
| 1.3 | **14–15 Aug 2026** | **14 Aug 23:00 WIB** | **15 Aug 03:00 WIB** | **4h** | Routing / Integration | `[...slug]`, shared Header integration, visual convergence foundation | ✅ |
| 1.4 | **15–16 Aug 2026** | **15 Aug 13:00 WIB** | **16 Aug 06:32:41 WIB** | **17h 32m 41s** | Sales / Conversion | Sales-first homepage, CTA contracts, hero/social assets | ✅ |
| 1.5 | **16 Aug 2026** | **06:32:41 WIB** | **07:20 WIB** | **47m 19s** | Documentation / repository orientation / session hardening | Timing/documentation synchronization; application verification deferred | ✅ |

### ⏱️ Project elapsed time from Chat 1.1

```text
Verified session working time through Chat 1.5:
28 hours 47 minutes 0 seconds

Verified elapsed project span:
14 Aug 2026 12:45 WIB
→
16 Aug 2026 07:20 WIB
=
42 hours 35 minutes

Verified inter-session gaps through Chat 1.5 start:
13 hours 48 minutes
```

> **Important:** elapsed project span ≠ total working duration. The working/session figure is the sum of verified session intervals; the elapsed span includes verified time between sessions.

---

# 🚀 NEXT ACTION — CHAT 1.6

**Verify the current application build + localhost/runtime baseline before changing application code.**

Then continue in Pareto order:

```text
1. Mobile / responsive QA
2. Shared Header: search + sticky + visual parity
3. Product Detail shared-design parity
```

Do not treat `code exists` as `verified`.

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

# 🚀 CHAT 1.6 HANDOFF

Start title:

```text
1.6 BBKitchen Next.js Migration — Baseline Verification / Responsive QA
```

Current session:

```text
Chat 1.5 → CLOSED
Chat 1.6 → NEXT
```

First actions:

1. Verify current build/runtime baseline.
2. Audit mobile/responsive behavior.
3. Address Shared Header bottleneck before broader parity work.
4. Prefer `1 step = 1 file = 1 verified commit`.
5. At session close, use [`docs/prompts/END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md).

---

# 📜 MIGRATION HISTORY

```text
Chat 1.1 → foundation — 14 Aug 2026 12:45–15:12 WIB
Chat 1.2 → live catalog / API / SEO — 14 Aug 2026 17:00–21:00 WIB
Chat 1.3 → routing / integration / visual convergence — 14 Aug 23:00–15 Aug 03:00 WIB
Chat 1.4 → sales-first homepage / CTA / visual assets — 15 Aug 13:00–16 Aug 06:32:41 WIB
Chat 1.5 → documentation / repository orientation / session hardening — 16 Aug 2026 06:32:41–07:20 WIB
Chat 1.6 → baseline verification / responsive QA — NEXT
```

---

# FINAL CHECKPOINT

```text
Chat 1.1 → forensic archived
Chat 1.2 → forensic archived
Chat 1.3 → forensic archived
Chat 1.4 → ✅ Closed
Chat 1.5 → ✅ Closed
Chat 1.6 → ⏭️ Next

Branch: feature/nextjs-migration
Last code checkpoint: 26f3911f0d60c595656e85f1e9b65087bab86132
Progress index checkpoint: 2aa51cbdaba12f6f847bab88f203914506717054
Chat 1.5 archive checkpoint: 498cc8269bf959f6b46f1ed8f517dc9f11db5905
```
