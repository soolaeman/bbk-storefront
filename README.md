# BBKitchen Frontend — Next.js Migration

Branch aktif: `main`

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
Chat 1.6B → 🟡 Clarified / Pending
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
64481677a530ee51be319e26a451cfd2587d0da1
Chat 1.6B clarification:
7810fb3c4759a3dda8077fca2cb811b87900da85
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
| 1.6B | **16 Aug 2026** | — | — | — | Launch architecture clarification | Single public Next.js renderer + authenticated WordPress admin controls | 🟡 |

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

**Final UI verification / public SEO takeover audit / WordPress-WooCommerce-Core System integration preparation.**

Recommended first sequence:

```text
1. Clean build/runtime/mobile regression on latest UI checkpoint
2. Freeze UI baseline
3. Audit WordPress public URLs + SEO surface
4. Map existing SEO URLs/slugs to Next.js public routes
5. Define evidence-based redirect / disable / canonical strategy
6. Implement authenticated WordPress admin control layer
7. Begin WooCommerce / ACF / BBK Core System integration
```

---

# 🎯 CURRENT PRIORITIES — PARETO

1. **Public SEO takeover audit** — establish exactly what WordPress currently exposes/indexes before switching the public renderer.
2. **Authenticated admin control layer** — WordPress admin can toggle READY ↔ SOLD and open the product's ACF Telegram link from Product Card and Product Detail.
3. **Backend/source-of-truth integration** — WooCommerce / ACF / BBK Core System while preserving existing contracts, followed by production hardening.

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
| Public SEO takeover | ⏳ Clarified | ⏳ WordPress URL/indexability audit pending |
| Authenticated admin controls | ⏳ Clarified | ⏳ Real WordPress authentication + server authorization pending |
| ACF/Core System | ⏳ | ⏳ Deferred to integration/hardening |
| Production deployment | ⏳ | ⏳ Deferred |

---

# 🧭 ARCHITECTURE BASELINE

```text
                         PUBLIC DOMAIN
                    bukanbarukitchen.com
                             ↓
                          NEXT.JS
                             ↓
               Home / Catalog / Product / Pages
                             ↑
                             │ live data
                             │
               WordPress / WooCommerce / ACF
                             ↓
                       BBK Core System
                             ↓
                    WordPress Admin / API
```

- **Next.js:** public experience layer, routing, rendering, SEO presentation, catalog/conversion UX.
- **WooCommerce:** products, prices, stock, categories, images, slug, descriptions.
- **WordPress/ACF:** inventory metadata such as `kode_unit`, `status_unit`, `kondisi_unit`, `lokasi_unit`, `link_telegram`.
- **Core System:** inventory/business logic + integrations.
- **WordPress public renderer:** intended to be replaced by Next.js at launch; WordPress remains operational as backend/admin.
- **Google Sheets:** backend/Core System concern; never expose credentials in client.

### Locked principles

- Next.js is the public experience layer, not the inventory source of truth.
- WordPress/WooCommerce/ACF/Core System remains the backend/admin source of truth.
- Next.js is intended to become the **single public renderer** for the primary website domain.
- Existing SEO URL/slug intent must be preserved unless new technical evidence requires a change.
- WordPress public URL/indexability surface must be audited before launch; redirect/disable/canonical actions must be evidence-based.
- Catalog pagination is server-side.
- Product route: `/product/[slug]`.
- Local route: `/jual-barang-bekas-restoran/[...slug]`.
- Inventory business logic does not belong in presentation components.
- SOLD Product Cards remain discoverable.
- Homepage positioning is primarily sales.
- Universal floating mascot composition is rejected.

### Authenticated admin control layer — clarified in Chat 1.6B

For an authenticated WordPress admin, Next.js Product Card and Product Detail must support:

```text
READY ↔ SOLD

Buka Telegram
    ↓
ACF-backed product Telegram link
```

Requirements:

- Public visitors must not receive admin controls.
- `READY ↔ SOLD` is the requested admin transition; existing product status contract is not reduced to only those two statuses.
- Telegram URL comes from ACF, not a hardcoded frontend URL.
- Status mutations must be authorized server-side.
- A frontend `isAdminMode` flag alone is not authentication or authorization.
- WordPress/ACF/Core System remains source of truth for mutations.
- Current UI/state foundations are not evidence that the authenticated control layer is implemented.

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
| B-15 | Public WordPress renderer/SEO surface must be audited before Next.js takeover | ⚠️ New launch requirement |
| B-16 | Authenticated WordPress admin control layer not yet implemented | ⚠️ New launch requirement |

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
- Treating `isAdminMode` as proof of WordPress authentication.
- Disabling WordPress public routes before auditing their SEO/indexability role.

---

# 🧱 TECHNICAL DEBT — NOW / NEXT / LATER

### NOW

- Clean final build/runtime/mobile regression after latest UI commits.
- Shared Header search interaction + sticky behavior + parity.
- Product Detail final shared-design parity.
- Article/local editorial typography.
- Audit WordPress public URL + SEO surface.

### NEXT

- Authenticated WordPress admin control layer.
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

For the clarified admin layer, also distinguish:

```text
WordPress authentication verified
server authorization verified
mutation/upstream write verified
Next.js refresh/revalidation verified
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
Chat 1.6B → CLARIFIED / PENDING
Chat 1.7 → NEXT
```

First actions:

1. Pull latest `main`.
2. Run clean build/runtime verification on latest code.
3. Verify desktop + mobile on homepage, catalog, Product Detail, local pages.
4. Freeze UI baseline.
5. Audit WordPress public URLs, canonical/sitemap/indexability, and existing SEO route surface.
6. Implement the authenticated WordPress admin control layer without weakening existing contracts.
7. Begin WooCommerce/WP/ACF/Core System integration.

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
Chat 1.6B → post-session launch architecture clarification — 16 Aug 2026
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
Chat 1.6B → 🟡 Clarified / Pending
Chat 1.7 → ⏭️ Next

Branch: main
Last code checkpoint: 96394b9ed3596383cdba44ea27312418827872f1
Progress index checkpoint: 64481677a530ee51be319e26a451cfd2587d0da1
Chat 1.6B clarification checkpoint: 7810fb3c4759a3dda8077fca2cb811b87900da85
Chat 1.6 archive checkpoint: 296373e3410b5be9a3b829a7c2012f0a86d04d73
```
