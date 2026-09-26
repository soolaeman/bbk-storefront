[🧭 NAVIGATOR](../../NAVIGATOR.md)
# Chat 1.1 — Foundation / WooCommerce Migration

> Forensic progress archive. This file preserves the high-value engineering history from Chat 1.1. Facts unavailable because of skipped conversation content are explicitly marked **Tidak ditemukan di conversation.**

## Date

Exact start/end date: 14 Aug 2026 12:45 → 15:12 WIB
Duration: 2h 27m

---

# 🎯 PARETO — TOP 20% THAT DROVE ~80% OF THE MIGRATION

## 1. WooCommerce became the catalog Single Source of Truth

The critical shift was away from the legacy/mock catalog in `src/data/products.ts` toward live WooCommerce data.

Legacy direction:

```text
src/data/products.ts
        ↓
INITIAL_PRODUCTS / mock data
        ↓
UI
```

Target architecture:

```text
WooCommerce / WordPress / ACF
        ↓
Next.js server-side data layer
        ↓
Next.js UI
```

`src/data/products.ts` was deliberately reduced to a **type-only contract**. `INITIAL_PRODUCTS`, fake product records, mock categories, mock filter options, and mock image URLs were removed as sources of truth.

**Lesson:** never reintroduce a mock catalog just to make the UI appear populated.

---

## 2. Direct browser → WooCommerce REST was rejected

Browser testing exposed:

```text
GET https://www.bukanbarukitchen.com/wp-json/wc/v3/products?... 
401 Unauthorized
```

This established the security boundary:

```text
Browser
   ↓
Next.js /api/products
   ↓
WooCommerce REST
```

WooCommerce credentials remain server-side.

Environment variables involved:

```text
WC_CONSUMER_KEY
WC_CONSUMER_SECRET
WOOCOMMERCE_API_URL
```

They must never become `NEXT_PUBLIC_*` values or client-bundle data.

**Lesson:** 401 was not a UI problem; it exposed the correct server-side architecture.

---

## 3. Pagination became the default performance contract

The catalog was not allowed to load thousands of products into the browser.

Working baseline:

```text
8 products/request
```

The Next.js proxy forwards WooCommerce pagination information through:

```text
X-WP-Total
X-WP-TotalPages
```

The rejected pattern was effectively:

```text
Browser
   ↓
2,500+ products
   ↓
client-side filtering/search
```

The accepted pattern is:

```text
Browser
   ↓
Next.js /api/products?page=N&per_page=8
   ↓
WooCommerce
```

**Lesson:** correctness and performance start at the data boundary, not in the ProductCard UI.

---

## 4. ACF became a separate live metadata boundary

The migration exposed that BBK inventory fields were not automatically queryable through WooCommerce REST.

Known inventory-related fields included:

```text
kode_unit
status_unit
kondisi_unit
lokasi_unit
link_telegram
```

The forensic evidence also records:

```text
BBK INVENTORY
show_in_rest: 0
```

Therefore the team explicitly rejected assuming native WooCommerce REST metadata filtering would solve all inventory filtering requirements.

**Lesson:** when REST does not expose the needed metadata contract, establish a proper WordPress/ACF data path instead of overfetching the entire catalog.

---

## 5. Presentation components were decoupled from hardcoded inventory/category truth

The following components were refactored away from mock constants:

```text
src/components/CategoryFilter.tsx
src/components/AdminPanelModal.tsx
src/components/RequestUnitModal.tsx
```

They stopped depending on hardcoded values such as:

```text
CATEGORIES
CONDITION_OPTIONS
LOCATION_OPTIONS
POWER_TYPE_OPTIONS
```

and moved toward dynamic props/metadata contracts.

**Lesson:** UI components consume contracts; they do not invent inventory/business truth.

---

# 📁 FILE / COMPONENT HISTORY

## Created

### `src/app/api/products/route.ts`

Created as the server-side WooCommerce proxy.

Purpose:

- keep WooCommerce credentials off the browser
- centralize catalog request forwarding
- provide browser-safe `/api/products`
- support pagination/query forwarding

Evidence in history:

```text
create mode 100644 src/app/api/products/route.ts
```

Known checkpoint range:

```text
c87a404..61a3343
```

**Status:** ✅ Active

---

## Modified

| File | High-value change | Status |
|---|---|---|
| `src/app/api/products/route.ts` | Server proxy, pagination, WooCommerce query forwarding, category resolution, `X-WP-Total` / `X-WP-TotalPages` | ✅ Active |
| `src/lib/woocommerce.ts` | Major refactor toward live WooCommerce data | ✅ Active |
| `src/App.tsx` | Page size moved to 8 and catalog integration expanded | ⚠️ In progress in 1.1 |
| `src/components/ProductDetailModal.tsx` | Removed unsupported/manual/placeholder UI values | ✅ Improved |
| `src/components/CategoryFilter.tsx` | Removed hardcoded filter constants; receives dynamic options | ✅ Done |
| `src/components/AdminPanelModal.tsx` | Removed hardcoded `CATEGORIES`; receives `categoryOptions` | ✅ Done |
| `src/components/RequestUnitModal.tsx` | Removed hardcoded `CATEGORIES`; receives `categoryOptions` | ✅ Done |
| `src/data/products.ts` | Deleted `INITIAL_PRODUCTS` and mock records; converted to type-only contract | ✅ Done |

### `src/data/products.ts` clarification

The file itself was **not deleted**.

Its role changed from:

```text
mock catalog database
```

to:

```text
type/interface contract
```

---

# 🔌 API / DATA CONTRACT HISTORY

## Legacy contract

```text
src/data/products.ts
        ↓
INITIAL_PRODUCTS
        ↓
UI
```

This was rejected because it was not synchronized with the live WooCommerce catalog.

## New contract

```text
WooCommerce REST
        +
WordPress / ACF metadata
        ↓
Next.js server-side data layer
        ↓
Product contract
        ↓
App.tsx
        ↓
UI
```

### `/api/products`

Browser-facing endpoint:

```text
/api/products
```

Example:

```text
/api/products?page=1&per_page=8
```

The server forwards to the WooCommerce endpoint:

```text
/wp-json/wc/v3/products
```

with authentication kept server-side.

### Search

The architecture preferred native WooCommerce query support for search instead of loading the entire catalog into the browser.

### Categories

Category data should come from WooCommerce metadata, not frontend constants.

### Subcategories

Parent/child WooCommerce category handling was identified but was not final in Chat 1.1.

### Product types

Type contracts include fields such as:

```text
Product
ProductCategory
ProductCondition
AvailabilityStatus
ProductPowerType
```

`ProductPowerType` must not be populated from invented/fabricated frontend values.

---

# 🧩 INVENTORY / ACF FORENSICS

## Condition

The UI previously assumed simple options such as:

```text
Bekas
Baru
```

but this was not accepted as authoritative truth.

**Status:** ⚠️ Not final in Chat 1.1

## Location

Frontend location lists were known to diverge from live inventory.

**Status:** ⚠️ Not final in Chat 1.1

## Status / READY vs SOLD

A key bug was identified where sold units could still appear ready.

WooCommerce stock status was explored:

```text
stock_status=instock
stock_status=outofstock
```

but `status_unit` remained an ACF-specific contract that was not verified as natively queryable via the WooCommerce REST endpoint.

**Status:** ⚠️ Carried forward

## SKU

SKU remained part of the product contract.

## Power type

No verified source existed for a stable frontend-owned `powerType` value.

**Decision:** do not invent it.

---

# 🧪 BUILD / TEST / RUNTIME HISTORY

## Direct browser WooCommerce call

Failure:

```text
401 Unauthorized
```

This was the decisive evidence for the server-side proxy architecture.

---

## `npm run build` — successful compilation checkpoints with remaining warning

The project reached stages such as:

```text
✓ Compiled successfully
✓ Finished TypeScript
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

but remained affected by:

```text
Failed to load Yoast homepage metadata:
Error: Yoast API returned 404
```

Source noted:

```text
src/app/page.tsx:40
```

**Important:** Chat 1.1 must not be summarized as a completely clean build because the Yoast 404 remained.

---

## TypeScript failure after mock removal

Failure:

```text
Export CATEGORIES doesn't exist in target module
```

Affected components:

```text
src/components/AdminPanelModal.tsx
src/components/RequestUnitModal.tsx
```

Root cause:

`products.ts` had intentionally become type-only, but the two components still depended on the deleted mock export.

Resolution:

- AdminPanelModal refactored to dynamic `categoryOptions`
- RequestUnitModal refactored to dynamic `categoryOptions`

---

## App TypeScript mismatch

Observed failure:

```text
src/App.tsx(78,9): error TS2322:
Type 'number' is not assignable to type 'string'.

src/App.tsx(79,9): error TS2322:
Type 'number' is not assignable to type 'string'.
```

Root cause:

Type contract mismatch introduced while the data layer evolved.

Later checkpoints moved beyond this specific error, but the evidence does not support claiming that every later build was clean.

---

## `npm run start`

Failure when no valid production build existed:

```text
Could not find a production build in the '.next' directory.
```

Root cause:

A successful `next build` had not produced the required production artifact at that point.

**Lesson:** `next start` depends on a successful production build.

---

## Local server

A later local server start was observed as:

```text
▲ Next.js 16.3.1
✓ Ready
- Local: http://localhost:3000
```

Non-blocking environment warning:

```text
Next.js ignored package-lock.json in C:\Users\Lenovo
because it is outside the current Git repository.
```

This warning was not treated as the main catalog architecture blocker.

---

## Local API test

Observed:

```text
curl: (7) Failed to connect to localhost port 3000
```

Root cause:

The server was not running at the time of the command.

This does not prove `/api/products` itself was broken.

---

# 🌐 PERFORMANCE / RESPONSIVENESS FORENSICS

## Overfetching

A large catalog request was identified as a major problem.

Rejected direction:

```text
2,500+ products in one browser request
```

Accepted direction:

```text
8 products/page
```

## Server-side filtering loop

Rejected direction:

```text
fetch page 1
fetch page 2
...
fetch until all 2,500+ products
```

Why rejected:

- destroys performance
- increases WooCommerce load
- increases latency
- turns unsupported metadata filtering into an expensive client-side workaround

## Caching

WooCommerce requests were using:

```text
cache: 'no-store'
```

This preserved freshness but leaves caching optimization as future work.

## Mobile/performance metrics

There was visual/UX concern around large catalogs and filters, but no verified Lighthouse/Core Web Vitals benchmark was recorded here.

**Status:** measurement not yet available.

---

# 🔐 SECURITY / CONFIGURATION

## Locked server-only credentials

```text
WC_CONSUMER_KEY
WC_CONSUMER_SECRET
WOOCOMMERCE_API_URL
```

Never expose these through:

```text
NEXT_PUBLIC_*
```

or client bundles.

## WordPress credentials

No WordPress credential was recorded in the forensic material.

## Google credentials

No Google credential was recorded in the forensic material.

---

# 🔒 LOCKED DECISIONS FROM CHAT 1.1

1. **WooCommerce = Single Source of Truth** for catalog data.
2. **WordPress/ACF = live inventory metadata boundary.**
3. `src/data/products.ts` is **type-only**.
4. `INITIAL_PRODUCTS` must not return as a database/fallback.
5. No fake catalog fallback.
6. WooCommerce credentials remain server-side only.
7. Browser uses `/api/products` rather than direct authenticated WooCommerce REST.
8. Catalog pagination is server-side; working baseline is **8 products/page**.
9. Native WooCommerce filtering should be used where behavior is verified.
10. ACF metadata filtering must use a proper live contract; do not overfetch thousands of products.
11. Do not invent `powerType` values.
12. Inventory/business logic does not belong in presentation components.
13. One step = one file.
14. Never call a build “clean” without evidence.

---

# ⚠️ TECHNICAL DEBT CARRIED FORWARD

| Debt | Why deferred | Risk | Next action |
|---|---|---|---|
| ACF condition filtering | No verified native WooCommerce meta query | Incorrect filter results | Audit/build live metadata contract |
| ACF location filtering | Same | Incorrect location results | Use verified WP/ACF source |
| `status_unit` mapping | ACF/stock relation not fully verified | Sold/Ready mismatch | Audit live mapping |
| Subcategories | Parent/child category flow incomplete | Incomplete taxonomy UX | Map WooCommerce hierarchy |
| Direct pagination UI | Total-page metadata exists but jump UX incomplete | Slow navigation | Implement direct page selection |
| Yoast | Endpoint returned 404 | Homepage SEO metadata failure | Audit endpoint/domain |
| Product/category URLs | Legacy mapping not fully verified | SEO migration risk | Compare old vs Next routes |
| Caching | `no-store` preserves freshness | Higher latency | Optimize after correctness |
| Performance metrics | No formal Lighthouse/Core Web Vitals evidence | Bottlenecks not quantified | Measure after architecture stabilizes |

---

# 🧭 GIT / GITHUB HISTORY

Branch:

```text
feature/nextjs-migration
```

Repository used during this phase:

```text
soolaemanwork-gif/Front-End-BBKitchen
```

Known evidence/checkpoints:

| SHA | Evidence |
|---|---|
| `c87a404` | Base before first Route Handler evidence |
| `61a3343` | `src/app/api/products/route.ts` created; `src/lib/woocommerce.ts` modified |
| `e93e4d9` | Base before page-size update |
| `51fc764` | `src/App.tsx` page size change |
| `3fbe0c9` | API route update |
| `f9c699c` | Major WooCommerce data-layer refactor |
| `b3f3871` | ProductDetailModal cleanup |
| `777b6a7` | Base before large catalog refactor |
| `c2e7dea` | Major `App.tsx` / API route / WooCommerce changes |
| `2bc0caa` | Base before metadata/data-layer adjustment |
| `c90f9e0` | `woocommerce.ts` update |
| `6d03ebd` | API route T-12 update |
| `55ffd04` | `products.ts` type-only reset + API route update |
| `01ce9b4` | CategoryFilter architecture refactor |
| `659e5e5` | AdminPanelModal architecture refactor |
| `966d70e` | RequestUnitModal architecture refactor |

**Important:** not every SHA above is proven to be authored/created directly by the Chat 1.1 session. Some are observed base/remote checkpoints.

No verified PR number, merge commit, or explicit revert was found in the available evidence.

### Git sync issue

A remote-ahead rejection occurred:

```text
! [rejected] feature/nextjs-migration -> feature/nextjs-migration
(fetch first)
```

The working branch was then synchronized via:

```bash
git pull origin feature/nextjs-migration
```

---

# 🧠 FAILED APPROACHES / DEAD ENDS

## 1. Direct browser → WooCommerce API

**Why it looked reasonable:** direct REST access is simple.

**Why it failed:** `401 Unauthorized` and credential exposure.

**Replacement:** Next.js server proxy.

**Do not repeat:** ✅

## 2. Mock catalog as live catalog

**Why it looked reasonable:** UI can render immediately.

**Why it failed:** product/status/category/location data diverged from live WordPress/WooCommerce.

**Replacement:** live WooCommerce data + type-only contract.

**Do not repeat:** ✅

## 3. Overfetching 2,500+ products to emulate unsupported ACF filtering

**Why it looked reasonable:** frontend could filter everything locally.

**Why it failed:** unacceptable performance/load and violates server-side data architecture.

**Replacement:** proper WP/ACF metadata contract.

**Do not repeat:** ✅

## 4. Hardcoded category/filter constants

**Why it looked reasonable:** simple UI implementation.

**Why it failed:** drift from live inventory taxonomy.

**Replacement:** dynamic metadata props.

**Do not repeat:** ✅

## 5. Starting production server after a failed build

**Why it looked reasonable:** `next start` appears to be the next step.

**Why it failed:** `.next` production build did not exist.

**Replacement:** `npm run build` → verify → `npm run start`.

**Do not repeat:** ✅

---

# 📌 HANDOFF — CHAT 1.1 → CHAT 1.2

## Completed

- Next.js migration foundation established.
- WooCommerce proxy created.
- WooCommerce credentials moved server-side.
- Pagination baseline moved to 8 products/page.
- `X-WP-Total` / `X-WP-TotalPages` metadata exposed.
- `products.ts` converted to type-only contract.
- `INITIAL_PRODUCTS` removed.
- CategoryFilter moved away from hardcoded filter constants.
- AdminPanelModal moved away from hardcoded categories.
- RequestUnitModal moved away from hardcoded categories.
- ProductDetailModal placeholder/unsupported UI data cleaned up.

## In Progress

- `src/App.tsx` data-flow wiring between live data/metadata and the refactored components.
- ACF metadata contract.
- Status/condition/location correctness.
- WooCommerce category/subcategory completeness.
- Pagination UX.

## Blocked / Architecture Constraint

ACF metadata filtering could not be assumed to work through native WooCommerce REST.

**Do not solve this by fetching the entire 2,500+ product catalog.**

## Known Issues

- Yoast homepage metadata 404.
- Condition/status/location were not yet fully authoritative.
- Subcategory flow incomplete.
- Direct page-jump pagination incomplete.

## Next Recommended Step

```text
STEP 5
src/App.tsx
```

Goal:

> Make `App.tsx` the correct bridge between the live WooCommerce/data layer and the UI components that were already refactored to consume dynamic metadata.

Then, in order:

```text
STEP 6 → verify live WP/ACF metadata contract
STEP 7 → condition/status/location filtering
STEP 8 → category/subcategory completeness
STEP 9 → direct pagination UX
STEP 10 → Yoast/SEO verification
```

The exact sequence may change after live-source audit, but **data correctness stays ahead of UI polish**.

---

# 🧾 FINAL CHECKPOINT

```text
Chat 1.1
    ↓
WooCommerce source-of-truth boundary ✅
    ↓
Server-side /api/products proxy ✅
    ↓
8/page pagination ✅
    ↓
Mock catalog retired ✅
    ↓
Dynamic category/filter props ✅
    ↓
ACF metadata contract ⚠️
    ↓
Chat 1.2 → API / metadata / catalog / product / SEO
```

## Core Lesson

> **Jangan memperbaiki UI di atas data yang salah.**
>
> Katalog, filter, status, kondisi, lokasi, kategori, dan pagination harus dibangun di atas WooCommerce/WordPress/ACF live contracts. Mock catalog harus benar-benar dipensiunkan, credentials harus tetap server-side, dan unsupported metadata filtering tidak boleh disiasati dengan overfetching ribuan produk.
