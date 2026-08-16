# BBKitchen Frontend — Next.js Migration

Branch aktif: `feature/nextjs-migration`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md). Struktur file mengikuti repository aktual.

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 LAST SESSION — CHAT 1.6

```text
Session: 1.6 BBKitchen Next.js Migration
Started: 16 August 2026 15:45 WIB
Ended: 16 August 2026 19:43:16 WIB
Duration: 3h 58m 16s
Status: CLOSED
```

> Chat 1.6 focused on responsive/UI polish, shared Footer rollout, related products, service/testimonial/gallery carousel behavior, and homepage visual convergence. Final clean regression after the latest UI changes remains pending.

---

# 🏁 CURRENT CHECKPOINT

```text
Chat 1.1 → ✅ Archived
Chat 1.2 → ✅ Archived
Chat 1.3 → ✅ Archived
Chat 1.4 → ✅ Closed
Chat 1.5 → ✅ Closed
Chat 1.6 → ✅ Closed
Chat 1.7 → ⏭️ Next
```

## Last code checkpoint

```text
96394b9ed3596383cdba44ea27312418827872f1
fix: make gallery carousel responsive with mobile swipe
```

GitHub evidence: **16 August 2026 12:35:59 UTC (19:35:59 WIB)**.

## Current documentation checkpoint

```text
Progress index:
47c4042c8eec27ad1365089dabc73181a6b593cc
Chat 1.6 archive:
296373e3410b5be9a3b829a7c2012f0a86d04d73
```

---

# 📈 MIGRATION PROGRESS

| Session | Periode / waktu terverifikasi | Start | End | Durasi | Fokus utama | Hasil utama | Status |
|---|---|---|---|---:|---|---|---|
| 1.1 | **14 Aug 2026** | **12:45 WIB** | **15:12 WIB** | **2h 27m** | Foundation | WooCommerce source of truth, server-side API boundary, pagination baseline | ✅ |
| 1.2 | **14 Aug 2026** | **17:00 WIB** | **21:00 WIB** | **4h** | API / Metadata / SEO | Live catalog contract, metadata endpoint, Product Detail + SEO foundation | ✅ |
| 1.3 | **14–15 Aug 2026** | **14 Aug 23:00 WIB** | **15 Aug 03:00 WIB** | **4h** | Routing / Integration | `[...slug]`, shared Header integration, visual convergence foundation | ✅ |
| 1.4 | **15–16 Aug 2026** | **15 Aug 13:00 WIB** | **16 Aug 06:32:41 WIB** | **17h 32m 41s** | Sales / Conversion | Sales-first homepage, CTA contracts, hero/social assets | ✅ |
| 1.5 | **16 Aug 2026** | **06:32:41 WIB** | **07:20 WIB** | **47m 19s** | Documentation / repository orientation / session hardening | Timing/documentation synchronization; application verification deferred | ✅ |
| 1.6 | **16 Aug 2026** | **15:45 WIB** | **19:43:16 WIB** | **3h 58m 16s** | Responsive QA / UX polish / gallery | Shared Footer, related products, responsive category UX, service/testimonial/gallery carousels | ✅ |

### ⏱️ Project elapsed time since Chat 1.1

```text
Verified working/session time through Chat 1.5:
28 hours 47 minutes 0 seconds

Chat 1.6 working duration:
3 hours 58 minutes 16 seconds

Verified working/session time through Chat 1.6:
32 hours 45 minutes 16 seconds

Actual elapsed duration since Chat 1.1 start:
54 hours 58 minutes 16 seconds

Earliest verifiable migration evidence:
14 August 2026 12:45 WIB
```

> **Important:** elapsed/calendar span ≠ working duration. Do not use calendar span as a proxy for time spent working.

---

# 🚀 NEXT ACTION — CHAT 1.7

**Final UI verification / WordPress-WooCommerce integration preparation.**

Recommended first sequence:

```text
1. Clean build/runtime/mobile regression on latest UI checkpoint
2. Freeze UI baseline
3. Begin WordPress / WooCommerce / Core System integration
4. Preserve existing product, inventory, slug, SEO, READY/SOLD, and WhatsApp contracts
```

---

# 🎯 CURRENT PRIORITIES — PARETO

1. **Final regression verification** across homepage, catalog, Product Detail, local pages, desktop, and mobile.
2. **Backend/source-of-truth integration** with WordPress/WooCommerce/Core System.
3. **Production hardening** — SEO, security, performance, accessibility, deployment.

### Next layer

- ACF authoritative filtering.
- Related Products refinement if evidence requires.
- SOLD → Google Sheets workflow.
- Final production SEO/performance verification.

---

# 📊 CURRENT STATE + VERIFICATION

| Area | Implementation | Verification |
|---|---|---|
| WooCommerce data architecture | ✅ | ✅ Established baseline |
| Catalog / pagination | ✅ | ✅ Server-side, 8/page baseline |
| Product Detail | ✅ Functional | ⚠️ Final cross-template UI regression pending |
| Local hierarchical routing | ✅ | ✅ `[...slug]` verified |
| Homepage sales positioning | ✅ | 🔒 Direction locked |
| Shared Footer | ✅ | ✅ User-verified across key templates |
| Related Products | ✅ | ✅ User-verified baseline |
| Catalog responsive navigation | ✅ | ✅ User-verified desktop/mobile direction |
| Service cards + WhatsApp CTAs | ✅ | ✅ User-verified |
| Testimonials mobile slider | ✅ | ⚠️ Latest correction needs final regression |
| Gallery | ✅ Compact carousel | ⚠️ Latest UI correction needs final regression |
| Shared Header | ✅ Integrated | ⚠️ Search typing, sticky behavior, parity remain carried |
| Article typography | ✅ Content rendering exists | ⚠️ Editorial parity remains carried |
| ACF/Core System | ⏳ | ⏳ Deferred to integration/hardening |
| Production deployment | ⏳ | ⏳ Deferred |

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

### Session 1.6 additions

- Catalog category/subcategory counts removed from buttons.
- Desktop category/subcategory navigation wraps; mobile remains horizontal-scroll friendly.
- Service cards keep mobile swipe + desktop grid; WhatsApp CTA has service-specific copy.
- Testimonials use mobile card-per-slide carousel.
- Gallery uses compact 4-card desktop carousel + mobile swipe across all 16 gallery images.

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
- Replacing compact homepage sections with oversized editorial layouts without a clear UX reason.

---

# 🧱 TECHNICAL DEBT — NOW / NEXT / LATER

### NOW

- Clean final build/runtime/mobile regression after latest UI commits.
- Shared Header search interaction + sticky behavior + parity.
- Product Detail final shared-design parity.
- Article/local editorial typography.

### NEXT

- WordPress/WooCommerce/Core System integration.
- Authoritative ACF filtering.
- Related Products refinement if needed.
- SOLD → Google Sheets workflow.

### LATER

- Production performance/accessibility hardening.
- SEO verification and deeper measurement.
- Deployment/caching/image optimization verification.

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
public/images/people/bbkitchen-chef-presenting.webp
public/images/people/bbkitchen-chef-pointing.webp
public/images/people/bbkitchen-chef-trust.webp
public/images/social/youtube-shorts-cover.webp
public/images/social/tiktok-cover.webp
public/images/gallery/gallery-01.webp … gallery-16.webp

src/components/Header.tsx
src/components/Footer.tsx
src/components/ProductCard.tsx
src/components/SocialMediaSection.tsx
src/components/KitchenConsultationBanner.tsx
src/components/TestimonialsSection.tsx
src/components/GallerySection.tsx
src/components/HeroSection.tsx
src/components/CategoryFilter.tsx
src/app/page.tsx
src/app/catalog/page.tsx
src/app/product/[slug]/page.tsx
src/app/jual-barang-bekas-restoran/[...slug]/page.tsx
src/app/api/products/route.ts
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

# 🚀 CHAT 1.7 HANDOFF

Start title:

```text
1.7 BBKitchen Next.js Migration — Final UI Verification / WordPress-WooCommerce Integration
```

Current session:

```text
Chat 1.6 → CLOSED
Chat 1.7 → NEXT
```

First actions:

1. Pull latest `feature/nextjs-migration`.
2. Run clean build/runtime verification on latest code.
3. Verify desktop + mobile on homepage, catalog, Product Detail, local pages.
4. Freeze UI baseline.
5. Begin WordPress/WooCommerce/Core System integration without weakening existing contracts.

At session close, use [`docs/prompts/END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md).

---

# 📜 MIGRATION HISTORY

```text
Chat 1.1 → foundation — 14 Aug 2026 12:45–15:12 WIB
Chat 1.2 → live catalog / API / SEO — 14 Aug 2026 17:00–21:00 WIB
Chat 1.3 → routing / integration / visual convergence — 14 Aug 23:00–15 Aug 03:00 WIB
Chat 1.4 → sales-first homepage / CTA / visual assets — 15 Aug 13:00–16 Aug 06:32:41 WIB
Chat 1.5 → documentation / repository orientation / session hardening — 16 Aug 2026 06:32:41–07:20 WIB
Chat 1.6 → responsive QA / shared UI / homepage UX polish / gallery — 16 Aug 2026 15:45–19:43:16 WIB
```

---

# FINAL CHECKPOINT

```text
Chat 1.1 → forensic archived
Chat 1.2 → forensic archived
Chat 1.3 → forensic archived
Chat 1.4 → ✅ Closed
Chat 1.5 → ✅ Closed
Chat 1.6 → ✅ Closed
Chat 1.7 → ⏭️ Next

Branch: feature/nextjs-migration
Last code checkpoint: 96394b9ed3596383cdba44ea27312418827872f1
Progress index checkpoint: 47c4042c8eec27ad1365089dabc73181a6b593cc
Chat 1.6 archive checkpoint: 296373e3410b5be9a3b829a7c2012f0a86d04d73
```
