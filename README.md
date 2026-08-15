# BBKitchen Frontend — Next.js Migration

Frontend baru **Bukan Baru Kitchen / BBKitchen**.

Branch aktif: `feature/nextjs-migration`

> Living documentation + institutional memory + handoff. Jika fakta tidak tersedia di source conversation, tulis `Tidak ditemukan di conversation`; jangan mengarang.

# 🏁 CURRENT CHECKPOINT

```text
Chat 1.1 → forensic captured
Chat 1.2 → forensic captured
Chat 1.3 → forensic captured
Chat 1.4 → ✅ CLOSED / DONE
Chat 1.5 → 🚀 NEXT
```

Last code checkpoint:

```text
26f3911f0d60c595656e85f1e9b65087bab86132
feat: add video covers to social media cards
```

---

# 📊 CURRENT PROGRESS — PARETO VIEW

**Last documented phase:** Chat 1.4 — CLOSED / DONE  
**Next phase:** Chat 1.5 — ACTIVE / NEXT  
**Migration branch:** `feature/nextjs-migration`  
**Documentation principle:** README answers **"where are we?"**; detailed forensic history answers **"how did we get here?"**.

## 80/20 Project Focus

Prioritize the small number of engineering areas that have the largest impact on BBKitchen's real business outcome:

```text
1. Catalog / Inventory Accuracy
2. Conversion / WhatsApp / Product Inquiry
3. Production Stability / API Reliability
4. SEO Preservation
5. Responsive UX
```

Avoid spending disproportionate effort on low-impact visual or architectural refactors while the above areas remain incomplete.

## Phase Progress

| Phase | Status | Primary Focus | Position |
|---|---|---|---|
| 1.1 | ✅ Done | Foundation / WooCommerce migration | Historical |
| 1.2 | ✅ Done | API / metadata / catalog / product / SEO | Historical |
| 1.3 | ✅ Done | Frontend integration / routing / visual convergence | Historical |
| 1.4 | ✅ Done | Homepage / conversion / visual finalization | Closed |
| 1.5 | 🚀 Next | Hardening / responsive / shared UX / Core System | Current |

## Chat 1.5 Pareto Priorities

### P0 — Highest impact

1. **Responsive/mobile audit** across Hero, Header, Catalog, Product Detail and Footer.
2. **Header + search interaction** — verify the search field is actually usable, not merely visible.
3. **Product Detail visual parity** with the shared Header/design system.
4. **Catalog/Product conversion path** — READY/SOLD behavior, product WhatsApp contract and CTA consistency.

### P1 — Important

5. **Article / Local Landing typography** and semantic content rendering.
6. **Dapur MBG + Produksi Baru CTA consistency** across Hero, services and Footer.
7. **Related Products / ACF authoritative filtering**.
8. **Production reliability** — API/runtime/error-state audit.

### P2 — After core flow is stable

9. SEO/performance/accessibility hardening.
10. Admin/Core System workflows, including inventory operations and SOLD → Google Sheets.

> **Rule:** if a proposed task does not materially improve conversion, inventory correctness, production stability, SEO, or responsive usability, defer it unless it is required to unblock P0/P1 work.

## Current State Snapshot

```text
DATA / CATALOG             ✅ Foundation established
PRODUCT DETAIL             ✅ Functional / parity audit remains
LOCAL ROUTING              ✅ Catch-all verified
HEADER                     ✅ Integrated / interaction audit remains
GLOBAL SEARCH              ⚠️ UI exists / typing must be verified
ARTICLE TYPOGRAPHY         ⚠️ Carried technical debt
MOBILE QA                  ⚠️ Not fully verified in 1.3/1.4 forensic source
WHATSAPP CONTRACT          ✅ Current contracts established
READY / SOLD               ✅ Current UX contract established
MBG / PRODUKSI BARU        ✅ Direct WhatsApp contract established
SOCIAL VIDEO               ✅ Cover-first / iframe-on-click
MASCOT                     🔒 Universal floating approach rejected
SEO BASELINE               🔒 Preserve existing equity
CORE SYSTEM                ⏳ Next major engineering area
```

---

# 1. MIGRATION PRINCIPLE

> **New frontend, old SEO equity.**

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

- WooCommerce: products, prices, stock, categories, images, slug, descriptions.
- WordPress/ACF: `kode_unit`, `status_unit`, `kondisi_unit`, `lokasi_unit`, `link_telegram`.
- Core System: inventory/business logic + integrations.
- Next.js: presentation, routing, rendering, SEO presentation, catalog/conversion UX.
- Google Sheets: backend/Core System concern; never expose credentials in client.

# 2. FINAL UX CONTRACTS

## Homepage

Primary positioning: **jualan unit/peralatan**, not the main channel for people offering borongan/sell-to-BBKitchen.

Focus: available units, condition, savings, ready-to-ship Indonesia-wide, categories, WhatsApp inquiry, Dapur MBG, Produksi Baru as secondary CTA.

## Header

`Jual Unit` → `Dapur MBG`.

Dapur MBG WhatsApp:

```text
Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.
```

Produksi Baru WhatsApp:

```text
Halo BBKitchen, mohon info peralatan dapur/restoran custom atau produksi baru
```

## Product WhatsApp

```text
Halo Tim BBKitchen, saya tertarik dan ingin menanyakan penawaran harga dan ketersediaan untuk unit:

Nama Unit: {NAMA UNIT}

SKU/ID: {SKU}

Lokasi Unit: {LOKASI}

Kondisi: {BARU|BEKAS}

Apakah unit ini masih tersedia? Mohon info harga penawaran dan spesifikasi detailnya. Terima kasih.
```

Condition is normalized to `BARU` or `BEKAS`. Avoid duplicated `saya` wording.

## READY / SOLD

```text
READY → Tanya WA
SOLD  → Tanya Lainnya
```

SOLD cards remain clickable/discoverable.

## Hero

```text
public/images/hero/bbkitchen-hero-desktop.webp
public/images/hero/bbkitchen-hero-mobile.webp
```

`Lihat Unit yang Tersedia →` smooth-scrolls to catalog. Do not bake UI/copy into hero images. Desktop/mobile backgrounds may differ.

## Social video

```text
public/images/social/youtube-shorts-cover.webp
public/images/social/tiktok-cover.webp
```

Target: `1280×720`, `16:9`, WebP. Cover first → play overlay → iframe only after click.

# 3. DATA / ROUTING BASELINE

```text
GET /api/products
GET /api/products?metadata=1
```

Default pagination: `8/page`.

```text
/api/products?search=...
/product/[slug]
/jual-barang-bekas-restoran/[...slug]
```

Verified local routes from Chat 1.3:

```text
/jual-barang-bekas-restoran/jakarta
/jual-barang-bekas-restoran/jakarta/jakarta-pusat
```

Catch-all is intentional because WordPress local URLs are hierarchical.

Top-level categories:

```text
Meja Stainless
Sink Stainless
Rak Stainless
Hood Stainless
Kompor
Chiller
Ice System
Freezer
Showcase
Peralatan Dapur Bekas Lainnya
```

`src/data/products.ts` is type-only contract, not mock catalog/source of truth.

# 4. ASSET BASELINE

```text
public/images/hero/
├── bbkitchen-hero-desktop.webp
└── bbkitchen-hero-mobile.webp

public/images/people/
├── bbkitchen-team-thumbs-up.webp
├── bbkitchen-chef-presenting.webp
├── bbkitchen-chef-pointing.webp
└── bbkitchen-chef-trust.webp

public/images/social/
├── youtube-shorts-cover.webp
└── tiktok-cover.webp
```

Mascot decision: **do not float mascot across every section**. Previous attempts caused overlap, double images, floating composition, map/card conflicts, and mobile breakage. Hero may use controlled composition/card treatment.

# 5. MASTER MIGRATION CHRONOLOGY — 1.1 → 1.4

## Chat 1.1 — Foundation / WooCommerce Migration

**Date:** exact start/end date not found.

### Work

- Next.js migration foundation.
- WooCommerce/WordPress source-of-truth boundary.
- Server proxy architecture.
- Live WooCommerce replacing mock catalog.
- Product typing/data contracts.
- Pagination foundation.
- ACF inventory boundary investigation.

### Bottlenecks

**B-1 — WooCommerce 401**: authentication/configuration path. Resolution kept credentials/server request server-side.

**B-2 — Catalog volume**: browser-side giant dataset rejected; server pagination became baseline 8/page.

**B-3 — ACF REST limitation**: `BBK INVENTORY` uses `show_in_rest: 0`; do not assume native WooCommerce REST filtering. Use Core/proxy boundary.

**B-4 — Mock catalog**: retired as source of truth.

Exact final Chat 1.1 SHA: **Tidak ditemukan di conversation.**

---

## Chat 1.2 — API / Metadata / Catalog / Product / SEO

**Date:** 14 August 2026 evidence.

### Work

- `/api/products`
- `/api/products?metadata=1`
- dynamic category metadata
- server pagination
- global search
- live catalog
- `/product/[slug]`
- gallery/breadcrumb/Salin Link
- Product SEO metadata/canonical/OG/JSON-LD baseline
- WordPress/ACF contract/fallback investigation

### Bottlenecks

**B-5 — Metadata contract**: categories needed without frontend hardcoding. Resolution: metadata endpoint/server-owned contract.

**B-6 — Upstream 502/connection reset**: build could succeed while runtime upstream failed. Lesson: `build verified` ≠ `runtime/upstream verified`; don't rewrite architecture to mask network/upstream problems.

**B-7 — SEO preservation**: preserve URL/slug/search intent/canonical/schema; no mass slug rewrite.

Exact final Chat 1.2 SHA: **Tidak ditemukan di forensic source.**

---

## Chat 1.3 — Frontend Integration / Routing / Visual Convergence

**Date:** 15 August 2026 evidence.

### Work

- App Router architecture.
- Live catalog consumer.
- Product Detail integration.
- WordPress local/transactional pages.
- Shared Header.
- Article rendering.
- Homepage visual comparison/design convergence.

### Bottlenecks

**B-8 — `[location]` too simple**: hierarchical WordPress URLs required `[...slug]`. Verified `/jakarta` and `/jakarta/jakarta-pusat`.

**B-9 — Catch-all import error**:

```text
Module not found
Can't resolve '../../../../lib/wordpress'
```

Root cause: route filesystem depth changed; relative import was stale.

**B-10 — Stale `.next`**: generated validator still referenced `[location]` after route rename. Fix:

```bash
rmdir /s /q .next
npm run build
```

**B-11 — Header Server/Client boundary**: interactive Header used `useState` in Server Component tree. Lesson: interactive Header is a Client Component boundary.

**B-12 — Article typography**: content rendered, but editorial semantics appeared as stacked paragraphs instead of BBKitchen typography. Carried forward.

**B-13 — Header search**: UI existed but field could not yet be typed. Root cause: **Tidak ditemukan di conversation.** Carried.

**B-14 — Product Detail Header parity**: Product Detail worked but Header was not yet visually identical. Root cause: **Tidak ditemukan di conversation.** Carried.

### Git evidence

```text
9c0784f..ea35c4b   catch-all route evolution
3cb54a0..566b5b5   import correction
9672ed8..871fa49   Header update
479c92c1b025550c30630a1219da8a6a560abde2   documentation checkpoint
```

---

## Chat 1.4 — Homepage / Conversion / Visual Finalization

**Date:** 15–16 August 2026 evidence.

### Work

- homepage visual convergence
- Hero AI desktop/mobile backgrounds
- mascot experiment cleanup
- homepage positioning toward selling equipment
- `Jual Unit` → `Dapur MBG`
- Produksi Baru CTA
- WhatsApp contract cleanup
- READY/SOLD behavior
- location/map cleanup
- footer/social cleanup
- social video covers

### Major failed approach — floating mascot everywhere

Attempted Hero + Location + Service + Testimonial mascot layers.

Failure: overlap, images escaping containers, double mascot, floating/"terbang" composition, map/card conflicts, mobile damage.

Final decision: **do not float mascot across sections**. Use controlled composition; Hero may use dedicated card/foreground treatment.

### Hero decision

Separate AI-generated desktop/mobile backgrounds replaced fragile floating image positioning.

### CTA decisions

```text
Dapur MBG              → direct WhatsApp
Mau Produksi Baru?     → direct WhatsApp
Lihat Unit Tersedia    → smooth-scroll catalog
```

### Social decision

YouTube Shorts/TikTok show cover first and instantiate iframe only after click.

Checkpoint:

```text
26f3911f0d60c595656e85f1e9b65087bab86132
```

# 6. MASTER BOTTLENECK REGISTER

| ID | Chat | Bottleneck | Status |
|---|---|---|---|
| B-1 | 1.1 | WooCommerce 401/auth | Closed |
| B-2 | 1.1 | Catalog volume/pagination | Closed |
| B-3 | 1.1 | ACF REST limitation | Carried |
| B-4 | 1.1 | Mock catalog | Closed |
| B-5 | 1.2 | Metadata/taxonomy contract | Closed |
| B-6 | 1.2 | Upstream 502/reset | Carried |
| B-7 | 1.2 | SEO preservation | Locked |
| B-8 | 1.3 | Single location route | Closed |
| B-9 | 1.3 | Relative import | Closed |
| B-10 | 1.3 | Stale `.next` | Closed |
| B-11 | 1.3 | Server/Client Header boundary | Closed |
| B-12 | 1.3 | Article typography | Carried |
| B-13 | 1.3 | Search not typable | Carried |
| B-14 | 1.3 | Product Detail Header parity | Carried |
| B-15 | 1.4 | Floating mascot chaos | Closed / Do not repeat |
| B-16 | 1.4 | Empty social cards | Closed |
| B-17 | 1.4 | Duplicate WA wording | Closed |

# 7. FAILED APPROACHES — DO NOT REPEAT

1. Mock catalog as source of truth.
2. Frontend-only category patches.
3. Single `[location]` route for hierarchical WordPress URLs.
4. Stale relative imports after route restructuring.
5. Treating stale `.next` artifacts as architecture failure.
6. Treating successful `next build` as proof upstream runtime is healthy.
7. Importing interactive Client Components as pure Server Components.
8. Floating the same transparent mascot through every section with `absolute` positioning.
9. Mass-changing existing SEO slugs.
10. Exposing WooCommerce/Google credentials to client code.

# 8. LOCKED ARCHITECTURE DECISIONS

- WooCommerce/WordPress/ACF/Core System remain source-of-truth layers.
- Next.js is the experience layer.
- Catalog pagination is server-side, default 8/page.
- Product route: `/product/[slug]`.
- Local route: `/jual-barang-bekas-restoran/[...slug]`.
- Existing SEO URL/slug intent must be preserved.
- Inventory business logic does not belong in presentation components.
- Google Sheets access belongs to backend/Core System.
- Homepage positioning is primarily sales.
- Dapur MBG + Produksi Baru use direct WhatsApp flows.
- SOLD Product Cards stay discoverable.
- Mascot is not a universal floating layer.

# 9. TECHNICAL DEBT → CHAT 1.5

- Article/Local Landing typography/editorial rendering.
- Header search interaction audit.
- Product Detail shared Header parity.
- Related Products finalization.
- Authoritative ACF filtering.
- Admin/Core System workflow.
- SOLD → Google Sheets.
- Mobile QA across templates.
- Production performance/accessibility hardening.

# 10. BUILD / VERIFICATION RULE

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
README update when milestone-level
```

Known non-blocking environment warning:

```text
Next.js ignored package-lock.json in C:\Users\Lenovo
because it is outside the Git repository.
```

Do not turn this warning into architecture work unless it becomes a real build/runtime issue.

# 11. SEO BASELINE

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

Rules: preserve URL, slug, search intent, canonical/schema/internal linking. Never mass-redirect or mass-noindex without mapping/audit.

# 12. IMPORTANT FILES / ASSETS

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

# 13. CHAT 1.5 HANDOFF

Start:

```text
1.5 BBKitchen Next.js Migration
```

First actions:

1. Read this README.
2. Audit current branch/code before changes.
3. Verify build/runtime state.
4. Continue from technical debt above.
5. Prefer `1 step = 1 file = 1 verified commit`.
6. Update README after milestone-level changes.

Priority:

1. Responsive/mobile audit.
2. Shared Header + search interaction.
3. Product Detail Header parity.
4. Article/Local Landing typography.
5. READY/SOLD Product Card audit.
6. WhatsApp contract audit.
7. MBG / Produksi Baru CTA consistency.
8. Related Products / ACF/Core System.
9. SEO/performance/accessibility hardening.

# 14. DOCUMENTATION INDEX

For detailed project memory and operator guidance:

```text
README.md
└── current state + Pareto priorities + architecture + history + handoff

end-session-prompt.md
└── closing protocol for each Chat session

VIBE-CODING-COPY-GUIDE.md
└── beginner-friendly map of where to change website copy
```

Use the README for **current state**. Use the dedicated docs for **procedures/details**. Do not turn README into a daily activity log.

# FINAL CHECKPOINT

```text
Chat 1.1 → forensic captured
Chat 1.2 → forensic captured
Chat 1.3 → forensic captured
Chat 1.4 → ✅ CLOSED
Chat 1.5 → 🚀 NEXT

Branch: feature/nextjs-migration
Last code checkpoint: 26f3911f0d60c595656e85f1e9b65087bab86132
```
