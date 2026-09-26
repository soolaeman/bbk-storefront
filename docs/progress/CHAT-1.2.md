[🧭 NAVIGATOR](../../NAVIGATOR.md)
# Chat 1.2 — API / Metadata / Catalog / Product / SEO

> **Forensic progress archive.** This archive preserves the engineering history that is most useful for future sessions. Some Chat 1.2 messages were skipped, so facts not supported by the available source are explicitly marked **Tidak ditemukan di conversation**. Short SHA values are preserved as recorded; full SHA values are not invented.

---

## Date

14 Aug 2026 17:00 → 21:00 WIB
Duration: 4h

---

# Pareto — Top 20% Changes → ~80% Impact

## 1. Live catalog contract became explicit

The frontend moved decisively away from mock/static catalog behavior toward:

```text
Browser
   ↓
Next.js /api/products
   ↓
WooCommerce REST API
```

Key parameters established/used included:

```text
page
per_page
search
orderby
order
stock_status
sku
min_price
max_price
category
```

Default catalog pagination:

```text
8 products/page
```

The browser must not download the full 2,000+ product catalog just to render 8 products.

---

## 2. Global metadata endpoint was introduced

Endpoint:

```text
GET /api/products?metadata=1
```

Purpose:

> Global filter metadata must not be derived only from the 8 products currently visible on the page.

The metadata contract centers on:

```text
categories
conditionOptions
locationOptions
```

This established an important boundary:

```text
UI options
   ← come from
server/data contract
```

rather than frontend-only hardcoded taxonomy.

---

## 3. Public category contract was locked

The final public catalog filter uses **top-level WooCommerce categories only**.

Subcategories were explicitly excluded from the public filter UX.

Locked order:

```text
1. Meja Stainless
2. Sink Stainless
3. Rak Stainless
4. Hood Stainless
5. Kompor
6. Chiller
7. Ice System
8. Freezer
9. Showcase
10. Peralatan Dapur Bekas Lainnya
```

The user explicitly corrected the direction to category-only filtering.

---

## 4. Inventory metadata was separated from WooCommerce stock

The important distinction became:

```text
WooCommerce stock_status
≠
ACF status_unit
```

WooCommerce stock concepts:

```text
instock
outofstock
```

ACF inventory status:

```text
READY
DP
SOLD
```

Operational mappings such as:

```text
READY → instock
SOLD → outofstock
```

may exist, but they are **not a replacement for the ACF source of truth**.

ACF inventory fields identified in the source:

```text
kode_unit
status_unit
kondisi_unit
lokasi_unit
link_telegram
```

The exported BBK INVENTORY contract reported:

```text
show_in_rest: 0
```

Therefore, native WooCommerce REST filtering for these ACF fields could not be assumed.

---

## 5. Product detail + SEO preservation became a first-class contract

Dynamic product route:

```text
/product/[slug]
```

The product detail flow was expanded toward:

```text
H1 / product name
short description
full description
SKU
category
condition
location
status
images
canonical
Open Graph
Product JSON-LD
breadcrumb
Salin Link
```

The critical migration principle:

> **New frontend, old SEO equity.**

Do not casually change product slugs, search intent, meaningful H1 copy, or established category URL intent merely because the frontend is being redesigned.

---

# File / Component History

> Only changes supported by the forensic source are listed. Exact historical ownership for some files is partial because of skipped transcript segments.

## Created / Established

| File | Major role | Status |
|---|---|---|
| `src/app/api/products/route.ts` | Server-side WooCommerce proxy + metadata contract | ✅ Implemented |
| `src/app/product/[slug]/page.tsx` | Dynamic product detail route + SEO/deep-link foundation | ✅ Implemented |
| `public/bbkitchen-logo.webp` | BBKitchen logo asset/reference | ⚠️ Asset exists; final visual runtime verification was not fully confirmed |

## Modified

| File | Major change | Status |
|---|---|---|
| `src/App.tsx` | Consumed metadata/live catalog and connected filter/pagination/search flow | ✅ Major integration |
| `src/components/CategoryFilter.tsx` | Reworked around live metadata and final category/condition UX | ⚠️ Filtering contract still has ACF-related debt |
| `src/components/ProductDetailModal.tsx` | Normalized condition/layout metadata and changed `Salin Link` to product deep link | ✅ Improved |
| `src/components/Header.tsx` | Global search, Staff/Owner UI, branding/logo reference, accessibility brand text | ⚠️ Visual parity still required later |
| `src/data/products.ts` | Mock catalog retired; type/data contract retained | ✅ Type contract |
| `src/lib/woocommerce.ts` | Major live WooCommerce data access work | ✅ Active |
| `src/types.ts` | Product/filter/catalog contracts | ✅ Active |
| `src/utils/formatters.ts` | Central formatting / WhatsApp / deep-link utilities | ✅ Active |

No verified source-file rename or revert was established in the available Chat 1.2 evidence.

---

# API / Data Contract History

## `/api/products`

### Legacy direction

The frontend was still transitioning away from mock/local product data.

### Established direction

```text
Browser
   ↓
/api/products
   ↓
Next.js Route Handler
   ↓
WooCommerce REST API
```

The browser-facing endpoint became the contract boundary for:

```text
pagination
search
sorting
stock status
SKU
price range
category
```

### Security

WooCommerce credentials remain server-only.

Expected server-side configuration:

```env
WOOCOMMERCE_API_URL=...
WC_CONSUMER_KEY=...
WC_CONSUMER_SECRET=...
```

Never expose these through `NEXT_PUBLIC_*` variables or the client bundle.

---

# Metadata Contract

Endpoint:

```text
GET /api/products?metadata=1
```

Purpose:

```text
Current page of products
        ≠
Global catalog metadata
```

This prevents the UI from inferring all available filter options from only the current 8-product response.

---

# Category Contract

Public UI category filter:

```text
Top-level WooCommerce categories only
```

No public subcategory filter.

Locked order:

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

This is a source-of-truth decision, not merely a visual preference.

---

# Product Contract

WooCommerce owns the product/catalog fields:

```text
id
name
slug
price
regular_price
sale_price
description
short_description
sku
images
categories
stock_status
permalink
```

WordPress/ACF owns inventory metadata such as:

```text
kode_unit
status_unit
kondisi_unit
lokasi_unit
link_telegram
```

---

# ACF Contract

The exported inventory field group was reported as:

```text
show_in_rest: 0
```

Fields:

```text
status_unit
kondisi_unit
lokasi_unit
kode_unit
link_telegram
```

### Status

```text
READY
DP
SOLD
```

### Condition

```text
BARU
BEKAS
```

### Location values observed

```text
PAMULANG 2
KEDAUNG
SAWANGAN
SETU
PAMULANG BARAT
```

### Architectural consequence

Do not assume these fields can be queried directly through WooCommerce REST just because the product itself is available through WooCommerce.

---

# Condition Normalization

A raw inventory condition may contain a value such as:

```text
Baru Sisa Proyek / Lelang
```

Public UI should normalize this into:

```text
Baru
```

or:

```text
Bekas
```

Canonical flow:

```text
RAW ACF
   ↓
normalization layer
   ↓
BARU | BEKAS
   ↓
UI: Baru | Bekas
```

---

# Search

Global search flow:

```text
Header
  ↓
searchQuery
  ↓
/api/products?search=...
  ↓
WooCommerce REST API
```

Locked principle:

> Search must search live catalog data, not mock data.

---

# Pagination

Contract:

```text
page
per_page
```

Response metadata:

```text
X-WP-Total
X-WP-TotalPages
```

The catalog architecture explicitly avoids loading 2,000+ products into the browser just to show a paginated page.

---

# Build / Test History

## Successful build checkpoints

The conversation contains multiple successful `npm run build` runs with output including:

```text
✓ Compiled successfully
✓ Finished TypeScript
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

One successful route set observed was:

```text
/
/_not-found
/api/products
/product/[slug]
```

This establishes that the codebase reached multiple compile/type-check/static-generation checkpoints.

### Important verification rule

A successful build did **not** prove live upstream availability.

---

## Persistent local warning

Next.js repeatedly warned that:

```text
Next.js ignored package-lock.json in C:\Users\Lenovo
because it is outside the current Git repository
```

and on `next start` also suggested `outputFileTracingRoot`.

Interpretation:

```text
Warning
≠
TypeScript failure
≠
confirmed application-code failure
```

This was a local repository/root configuration concern.

---

## Failed build — missing `slug` contract

A Product Detail checkpoint produced:

```text
src/components/ProductDetailModal.tsx(77,26):
error TS2339:
Property 'slug' does not exist on type 'Product'.
```

### Root cause

The modal needed:

```text
product.slug
```

for deep-linking, but the product contract at that checkpoint did not yet expose it.

### Resolution

The product contract and implementation were synchronized, after which subsequent build evidence showed TypeScript/build success.

---

# Runtime Bottleneck — WooCommerce Upstream

One of the most important Chat 1.2 failures was a **build-success / runtime-failure split**.

`npm run start` produced a WooCommerce upstream timeout such as:

```text
ConnectTimeoutError
www.bukanbarukitchen.com:443
timeout: 10000ms
```

Browser request:

```text
/api/products?status=publish&per_page=8&page=1
```

returned:

```text
502 Bad Gateway
```

Console evidence included:

```text
Failed to load WooCommerce products:
Error: WooCommerce proxy gagal: 502 Bad Gateway
```

---

# Direct Connectivity Test

The user tested:

```bash
curl -I https://www.bukanbarukitchen.com
```

and received:

```text
curl: (35) Recv failure: Connection was reset
```

The WooCommerce endpoint showed the same connection-reset pattern.

The user reported the public website was still accessible from a phone.

### Proven facts

```text
Laptop
  ↓
HTTPS request
  ↓
www.bukanbarukitchen.com
  ↓
connection reset
```

### Not proven

The exact infrastructure root cause was **not established**.

Possible areas discussed included:

```text
DNS
IPv4/IPv6
TLS
firewall
VPN/proxy
network path
ISP
```

### Final status

**Unresolved in Chat 1.2.**

This must not be “fixed” by weakening the application architecture or masking the error in the UI.

---

# Browser / Local Runtime

Local testing used:

```text
http://localhost:3000
```

Product detail became reachable once the dynamic route existed.

The catalog runtime then failed when the upstream WooCommerce origin was inaccessible from the laptop.

---

# Lint / Independent Typecheck

No separately verified successful command was documented for:

```text
npm run lint
npm run typecheck
```

Therefore:

> Do not record independent lint/typecheck passes as verified.

What is verified is the TypeScript/build step embedded in successful Next.js builds.

---

# API Tests

No automated API test suite was evidenced.

Observed verification methods were:

```text
browser request
curl request
localhost testing
Next.js runtime logs
```

---

# Git / GitHub History

## Branch

```text
feature/nextjs-migration
```

Repository name later normalized to:

```text
soolaeman/Front-End-BBKitchen
```

> Some Chat 1.2 evidence still referenced the old username `soolaemanwork-gif`; this archive preserves the original historical wording where useful while the current repository identity is `soolaeman/Front-End-BBKitchen`.

## Known commit checkpoints from conversation

| SHA recorded in conversation | Evidence / change |
|---|---|
| `0b76fb8` | checkpoint before `/api/products` route creation/update |
| `fc77096` | `/api/products` update; `git pull` followed by successful build |
| `01b47f4` | `src/App.tsx` update; metadata consumption began |
| `12bf593` | `/api/products` refactor; build successful |
| `debb847` | checkpoint before another `CategoryFilter` change |
| `0f9f141` | major `CategoryFilter.tsx` refactor |
| `f5d9ba9` | additional `CategoryFilter.tsx` fix |
| `500f741` | additional `CategoryFilter.tsx` change |
| `e7a5dbc` | created `src/app/product/[slug]/page.tsx` |
| `8ed434e` | checkpoint before ProductDetailModal update |
| `05ca499` | `ProductDetailModal.tsx` `Salin Link`; exposed missing `slug` contract |
| `45b0db5` | ProductDetailModal fix; build returned to success |
| `017472d29a515c308cf84837f7d0e619c4748e24` | early README commit |
| `3e5513868486e2ccf264b4a13e0672f914d52737` | README update with more accurate date/status |

### SHA policy

For abbreviated SHAs above, the **conversation only exposed the short form**. Full SHA values must not be reconstructed by guessing.

---

# Git Sync

Repeated workflow:

```bash
git pull origin feature/nextjs-migration
```

Several fast-forward updates were observed.

No PR, merge conflict, or explicit revert was established from the available Chat 1.2 forensic evidence.

---

# SEO / Migration Implications

This is one of the highest-value outcomes of Chat 1.2.

## Core rule

> **New frontend, old SEO equity.**

Existing URLs, slugs, search intent, canonical behavior, and meaningful H1 content should not be reset simply because the frontend is new.

## Product URL

Locked route:

```text
/product/[slug]
```

Product slug must remain the WooCommerce slug unless there is a separately audited migration plan.

## Canonical

Product canonical is based on the BBKitchen domain plus the WooCommerce product slug.

## Product content

Preserve:

```text
H1
short_description
description
SKU
category
condition
location
status
images
```

Do not replace product detail content with title/price-only rendering.

## Search equity

User supplied GSC context of approximately:

```text
~1.01K clicks
~28.1K impressions
~9.5 average position
```

These numbers were used as context for preserving existing search equity.

## Redirects

No complete legacy redirect map was evidenced.

Status:

```text
NOT IMPLEMENTED / NOT VERIFIED
```

## Internal linking

`Salin Link` was changed toward a real product deep-link.

Related Products remained unfinished, so internal linking between products remained technical debt.

---

# SEO Risk Table

| Risk | Mitigation | Status |
|---|---|---|
| Product slug changes | Preserve WooCommerce slug | 🔒 Locked |
| H1/search-intent changes | Preserve meaningful existing intent | 🔒 Locked |
| Description loss | Render full + short description | ✅ |
| Canonical mismatch | Generate canonical from product slug | ✅ Baseline |
| Category URL changes | Avoid casual URL redesign | 🔒 Locked |
| Weak internal linking | Product deep links + Related Products roadmap | ⏳ |
| Redirect audit incomplete | Audit legacy URL map | ⏳ |
| Production schema crawl not performed | Product JSON-LD exists but production audit pending | ⚠️ |

---

# Security / Configuration

## WooCommerce credentials

Architecture:

```text
Browser
  ↓
Next.js /api/products
  ↓
WooCommerce REST API
```

Credentials:

```text
WC_CONSUMER_KEY
WC_CONSUMER_SECRET
```

remain server-side.

## Environment

Expected shape:

```env
WOOCOMMERCE_API_URL=...
WC_CONSUMER_KEY=...
WC_CONSUMER_SECRET=...
```

Secret values must never be documented in README or committed to Git.

## ACF

Because:

```text
show_in_rest: 0
```

ACF fields must be treated as server-side inventory metadata rather than assumed public REST query parameters.

## Staff / Owner UI

The available UI simulation used a demo PIN concept such as:

```text
1234
```

or

```text
admin
```

This must never be treated as production authentication.

Production needs:

```text
server-side authentication
+
authorization
```

---

# Performance / Responsiveness

## Overfetching

### Problem

Deriving global metadata or filters by scanning the entire 2,000+ catalog would be expensive.

### Solution

Use:

```text
/api/products?metadata=1
```

plus server-side product pagination.

### Result

The frontend does not need to fetch the entire catalog just to render filter options.

---

## Pagination

Implemented baseline:

```text
per_page=8
page=N
```

This is an architecture decision, not just a UI preference.

---

## Client-side credential boundary

```text
Client
 ↓
Next.js API
 ↓
WooCommerce
```

Status:

```text
✅ Architecture established
```

---

## Images

Product images come from WooCommerce data.

No formal image-performance benchmark was documented.

Status:

```text
IMPLEMENTED / NOT BENCHMARKED
```

---

## Responsive

Responsive foundation work affected header, filter, product detail, gallery, breadcrumb, and modal behavior.

However, final responsive QA was not fully closed in Chat 1.2.

```text
Responsive foundation → implemented
Final responsive QA   → incomplete
```

---

## Desktop visual parity

Product Detail initially diverged materially from the Home design language.

The direction moved toward a shared visual system, but 100% visual parity was not established at the end of Chat 1.2.

---

## Caching

Some Home/build behavior showed:

```text
Revalidate: 5m
Expire: 1y
```

but no production end-to-end benchmark proved the caching strategy quantitatively.

Do not claim measured performance improvement from this alone.

---

# 🔒 LOCKED DECISIONS FROM CHAT 1.2

1. **New frontend, old SEO equity.**
2. **WooCommerce = product/catalog source of truth.**
3. **WordPress/ACF = inventory source of truth.**
4. `stock_status` and ACF `status_unit` are separate concepts.
5. Public category filtering uses **top-level categories only**.
6. Public subcategory filtering is intentionally excluded.
7. Public condition UI is normalized to **Baru / Bekas**.
8. Raw ACF condition strings are normalized before public display.
9. Resource/power filter was removed.
10. Pagination is server-side.
11. Search uses live WooCommerce data.
12. Product slug must be preserved.
13. Product detail keeps H1, short description, full description, metadata, and SEO signals.
14. Product sharing uses **Salin Link**.
15. Related Products should use the same live WooCommerce category and exclude the current product.
16. WooCommerce credentials stay server-side.
17. Do not hide or rewrite around infrastructure failures such as upstream 502/reset.
18. **1 step = 1 file = 1 commit.**
19. Build verification must remain evidence-based.

---

# Technical Debt Carried Forward

| Debt | Why deferred | Risk | Next action |
|---|---|---|---|
| ACF authoritative condition/location/status filtering | `show_in_rest: 0`; no verified native Woo query contract | Filter accuracy | Build/verify WordPress metadata bridge |
| Related Products | Not implemented in Chat 1.2 | Internal linking + UX | WooCommerce category query |
| Logo verification | Asset exists, runtime visual parity not confirmed | Branding | Verify render/cache |
| Header responsive QA | Refinement remained | Mobile UX | Browser QA |
| Product detail/Home parity | Visual convergence incomplete | Brand consistency | Shared design system |
| Local WooCommerce connectivity | Laptop connection reset | Catalog unavailable locally | Diagnose network path |
| Production auth | Demo PIN is frontend-only | Security | Server-side auth |
| `.env.example` sync | Setup docs not fully aligned | Developer onboarding | Sync env docs |
| Dependency pinning | `next` used `latest` in the migration phase | Reproducibility | Pin versions |
| Redirect audit | Not completed | SEO migration risk | Audit legacy URL map |
| Category SEO pages | Deferred | Organic discovery | Build after catalog stability |
| Search-popular terms | Needs real data | UX/SEO quality | Derive from analytics/search data |

---

# HANDOFF — CHAT 1.2 → CHAT 1.3

## Completed

```text
✅ Next.js App Router foundation
✅ WooCommerce server proxy
✅ Global metadata endpoint
✅ Live WooCommerce product flow
✅ Top-level category filtering contract
✅ Server pagination
✅ Global search
✅ ACF inventory contract
✅ Condition normalization
✅ Product detail route /product/[slug]
✅ Product SEO metadata baseline
✅ Product gallery foundation
✅ Breadcrumb foundation
✅ Salin Link deep-link
✅ Header/global search foundation
```

## In Progress

```text
⏳ Related Products
⏳ Authoritative ACF filtering
⏳ Logo/header visual verification
⏳ Product Detail/Home design parity
⏳ Final responsive QA
```

## Blocked / External

```text
⚠️ Local laptop → www.bukanbarukitchen.com
```

Observed:

```text
curl: (35) Recv failure: Connection was reset
```

and consequently:

```text
/api/products
→ 502 Bad Gateway
```

This is an infrastructure/network blocker in the local environment until proven otherwise.

## Known Bugs / Risks

### BUG-01 — WooCommerce 502

```text
/api/products
→ 502
```

Proven cause:

```text
upstream connection reset from local environment
```

Exact infrastructure cause:

```text
NOT YET DETERMINED
```

### BUG-02 — Logo visual verification

Asset exists:

```text
public/bbkitchen-logo.webp
```

but the runtime visual result was not conclusively verified.

### BUG-03 — Responsive/product-detail polish

Some responsive/layout refinements remained open.

---

# Recommended Next Steps

1. Verify laptop → upstream connectivity without changing application architecture.
2. Verify `/api/products` runtime after connectivity is stable.
3. Implement Related Products using live WooCommerce category data and exclude the current product.
4. Build/verify WordPress/ACF metadata filtering for `kondisi_unit`, `lokasi_unit`, and `status_unit`.
5. Verify logo/header visually.
6. Finish responsive QA.
7. Audit product/category URLs, canonical, and redirect requirements.
8. Harden production authentication.
9. Pin dependencies and synchronize environment documentation.

---

# Git Checkpoint Register

```text
0b76fb8   /api/products route checkpoint
fc77096   route update / build checkpoint
01b47f4   App.tsx metadata consumption
12bf593   route refactor / build checkpoint
debb847   CategoryFilter checkpoint
0f9f141   CategoryFilter major refactor
f5d9ba9   CategoryFilter fix
500f741   CategoryFilter additional update
e7a5dbc   product/[slug] route created
8ed434e   ProductDetailModal checkpoint
05ca499   Salin Link / missing slug contract
45b0db5   ProductDetailModal fix
```

Only the short forms above were explicitly visible in the forensic source. Do not fabricate full values.

---

# Raw Evidence Highlights

### Build

```bash
npm run build
```

repeatedly reached:

```text
✓ Compiled successfully
✓ Finished TypeScript
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

### Missing slug contract

```text
src/components/ProductDetailModal.tsx(77,26):
error TS2339:
Property 'slug' does not exist on type 'Product'.
```

### Upstream timeout

```text
ConnectTimeoutError
www.bukanbarukitchen.com:443
timeout: 10000ms
```

### Browser 502

```text
/api/products?status=publish&per_page=8&page=1
→ 502 Bad Gateway
```

### Direct connectivity

```bash
curl -I https://www.bukanbarukitchen.com
```

```text
curl: (35) Recv failure: Connection was reset
```

### User decisions preserved

- Category filter uses **category only**, not subcategory.
- Public condition stays **Semua Kondisi / Baru / Bekas** according to the final UI contract.
- Resource/power filter was removed.
- Product sharing uses **Salin Link**.
- Existing SEO equity must be preserved.
- ACF status and WooCommerce stock are not conceptually interchangeable.

---

# Final Forensic Summary

```text
Period:
14–15 August 2026 evidence

Primary Objective:
Build a live-data Next.js frontend while preserving WooCommerce/WordPress data contracts and SEO equity.

Major Deliverables:
- /api/products
- /api/products?metadata=1
- live catalog
- server pagination (8/page)
- top-level category filtering
- global search
- ACF contract
- /product/[slug]
- Product SEO baseline
- Product gallery / breadcrumb
- Salin Link
- Header/global search

Major Bottlenecks:
- ACF show_in_rest = 0
- authoritative ACF filtering
- local WooCommerce connectivity / 502
- product-detail visual parity
- responsive QA
- logo visual verification

Major Failed Approaches:
- mock/static catalog as source of truth
- deriving global metadata from only the current page
- treating WooCommerce stock as ACF inventory status
- assuming WooCommerce REST can natively query all ACF fields
- changing UI/URLs without considering SEO equity

Architecture Decisions:
- WooCommerce → product source of truth
- WordPress/ACF → inventory source of truth
- Next.js → server proxy + presentation
- top-level categories only
- server-side pagination
- live WooCommerce search
- preserve product slug / SEO intent
- explicit ACF metadata contract

Technical Debt:
- authoritative ACF filtering
- Related Products
- header/logo visual verification
- responsive QA
- production authentication
- .env.example sync
- dependency pinning
- redirect/SEO audit

Handoff Status:
FOUNDATION = STRONG
BUILD = VERIFIED AT MULTIPLE CHECKPOINTS
RUNTIME = EXTERNALLY BLOCKED IN LOCAL ENVIRONMENT
SEO PRINCIPLES = LOCKED
ACF FILTERING = TECHNICAL DEBT
UI POLISH = CARRIED FORWARD
```

---

# Core Lesson

> **Migration success is not the same as build success.**
>
> Chat 1.2 established a strong architecture, but runtime remained dependent on live WooCommerce/WordPress connectivity.
>
> Future sessions must always distinguish:
>
> ```text
> Code implemented
>       ↓
> Build verified
>       ↓
> Runtime verified
>       ↓
> Live upstream verified
>       ↓
> UI / mobile verified
> ```
>
> This distinction is critical for BBKitchen because the frontend intentionally depends on live WooCommerce and WordPress/ACF data.
