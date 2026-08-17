# BBKitchen Frontend — Next.js Migration

Branch aktif: `main`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md). Struktur file mengikuti repository aktual.

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 LAST SESSION — CHAT 1.8

```text
Session: 1.8 BBKitchen Next.js Migration
Started: 17 August 2026 06:30 WIB
Ended: 17 August 2026 16:54 WIB
Duration: 10h 24m
Status: CLOSED — DNS / UPSTREAM BLOCKED
```

> Chat 1.8 added and verified the Recent Posts homepage baseline, enabled Vercel Speed Insights, investigated Vercel and local 502s, evaluated an alternative Dewaweb Warrior staging path, and isolated the current runtime blocker to DNS resolution of `bukanbarukitchen.com`. The next session should fix/verify DNS authority and delegation before changing application architecture.

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
Chat 1.7 → ✅ Closed
Chat 1.8 → 🛑 Closed — DNS blocked
```

## Last code checkpoint

```text
faa03e509e8b2af72c769ac8bef21fcb4510766d
fix: use apex WooCommerce API fallback
```

GitHub evidence: **17 August 2026 07:50:34 WIB**.

Related code checkpoint:

```text
a318dddec8f4be32957e51cbed74a656187db963
fix: use apex WordPress API fallback
```

GitHub evidence: **17 August 2026 07:50:18 WIB**.

## Current documentation checkpoint

```text
Chat 1.8 archive:
20fa9042c01990a5c8397256e48dfc6786a0957b

Progress index sync:
602b671051699f8b72d17323c212ddfc93018eef

Documentation sync before this README refresh:
- COPY-EDITING-GUIDE.md → f9675c2792ad37144dd254476909defc90243e6b
- VIBE-CODING-COPY-GUIDE.md → 45a7de20ff4bd5dc61520609db0623176e3e6bcd
- NAVIGATOR.md → 878a460b2c891ac05f8ae9fc069b5cb7fe062457

Canonical END-SESSION prompt:
29f5d4925de894b84eb374c8e58c4f885b542e56
```

---

# 📈 MIGRATION PROGRESS

| Session | Period / time | Start | End | Duration | Focus | Status |
|---|---|---|---|---:|---|---|
| 1.1 | **14 Aug 2026** | **12:45 WIB** | **15:12 WIB** | **2h 27m** | Foundation | ✅ |
| 1.2 | **14 Aug 2026** | **17:00 WIB** | **21:00 WIB** | **4h** | API / Metadata / SEO | ✅ |
| 1.3 | **14–15 Aug 2026** | **14 Aug 23:00 WIB** | **15 Aug 03:00 WIB** | **4h** | Routing / Integration | ✅ |
| 1.4 | **15–16 Aug 2026** | **15 Aug 13:00 WIB** | **16 Aug 06:32:41 WIB** | **17h 32m 41s** | Sales / Conversion | ✅ |
| 1.5 | **16 Aug 2026** | **06:32:41 WIB** | **07:20 WIB** | **47m 19s** | Documentation / session hardening | ✅ |
| 1.6 | **16 Aug 2026** | **15:45 WIB** | **19:43:16 WIB** | **3h 58m 16s** | Responsive QA / UX / gallery | ✅ |
| 1.6B | **16 Aug 2026** | — | — | — | Launch architecture clarification | 🟡 |
| 1.7 | **17 Aug 2026** | **03:30 WIB** | **06:18 WIB** | **2h 48m** | Clean verification / main branch / docs | ✅ |
| 1.8 | **17 Aug 2026** | **06:30 WIB** | **16:54 WIB** | **10h 24m** | Recent Posts / runtime diagnostics / DNS | 🛑 |

### ⏱️ Project elapsed time since Chat 1.1

```text
Verified working/session time through Chat 1.7:
36 hours 04 minutes 16 seconds

Chat 1.8 working duration:
10 hours 24 minutes

Verified working/session time through Chat 1.8:
46 hours 28 minutes 16 seconds

Actual elapsed duration since Chat 1.1 start:
76 hours 09 minutes

Earliest verifiable migration evidence:
14 August 2026 12:45 WIB
```

> **Important:** elapsed/calendar span ≠ working duration. Do not use calendar span as a proxy for time spent working.

---

# 🎯 CURRENT PRIORITIES — PARETO

1. **DNS recovery** — verify authoritative nameservers, delegation, SOA, and zone consistency for `bukanbarukitchen.com`.
2. **Upstream API verification** — after DNS recovery, re-test WordPress, WooCommerce, `/api/posts`, `/api/products`, and metadata locally and on Vercel.
3. **Launch hardening** — resume WordPress public URL/SEO audit, authenticated admin controls, and WooCommerce/ACF/Core System integration only after upstream connectivity is proven.

---

# 📊 CURRENT STATE + VERIFICATION

| Area | Implementation | Verification |
|---|---|---|
| WooCommerce data architecture | ✅ | ✅ Established baseline |
| Catalog / pagination | ✅ | ✅ Server-side, 8/page baseline |
| Product Detail | ✅ Functional | ⚠️ Final cross-template regression pending |
| Local hierarchical routing | ✅ | ✅ `[...slug]` verified |
| Homepage sales positioning | ✅ | 🔒 Direction locked |
| Shared Footer | ✅ | ✅ User-verified across key templates |
| Related Products | ✅ | ✅ User-verified baseline |
| Catalog responsive navigation | ✅ | ✅ User-verified desktop/mobile direction |
| Service cards + WhatsApp CTAs | ✅ | ✅ User-verified |
| Testimonials mobile slider | ✅ | ⚠️ Latest correction needs final regression |
| Gallery | ✅ Compact carousel | ⚠️ Latest correction needs final regression |
| Recent Posts | ✅ Implemented | ✅ Placement/UI baseline verified locally |
| Shared Header | ✅ Integrated | ⚠️ Search typing, sticky behavior, parity carried |
| Article typography | ✅ Content rendering exists | ⚠️ Editorial parity carried |
| WordPress public SEO takeover | ⏳ | ⏳ URL/indexability audit pending |
| Authenticated admin controls | ⏳ | ⏳ Authentication/server authorization pending |
| ACF/Core System | ⏳ | ⏳ Deferred to integration/hardening |
| Production runtime | ⏳ | 🛑 Blocked by DNS resolution |

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

---

# ⚠️ ACTIVE BOTTLENECKS

| ID | Problem | Status |
|---|---|---|
| B-3 | ACF REST / authoritative inventory metadata filtering | ⚠️ Carried |
| B-6 | WooCommerce / WordPress upstream DNS resolution and 502 history | 🛑 Active — `ENOTFOUND bukanbarukitchen.com` observed locally and on Vercel |
| B-12 | Article/local editorial typography | ⚠️ Carried |
| B-13 | Header search interaction | ⚠️ Carried |
| B-14 | Product Detail shared Header parity | ⚠️ Carried |
| B-15 | Public WordPress renderer/SEO surface must be audited before Next.js takeover | ⚠️ Launch requirement |
| B-16 | Authenticated WordPress admin control layer not yet implemented | ⚠️ Launch requirement |

### B-6 evidence summary

```text
Vercel API route:
502 → upstream fetch failure → ENOTFOUND bukanbarukitchen.com

Local Next.js API route:
502 → upstream fetch failure → ENOTFOUND bukanbarukitchen.com

Public DNS A lookups previously observed:
103.185.53.66 from 1.1.1.1 / 8.8.8.8 / 9.9.9.9

Direct authoritative-server queries:
ns1.ezydomain.com → no normal A/SOA answer; SOA timed out
ns2.ezydomain.com → no normal A/SOA answer; SOA timed out
```

The current evidence points to DNS delegation/authoritative-zone instability, not a Next.js rendering bug.

---

# 🚫 DO NOT REPEAT

- Treating browser console 502s as proof of a Next.js frontend problem.
- Rewriting API routes to hide a DNS resolution failure.
- Regenerating WooCommerce credentials without evidence of an authentication failure.
- Treating Vercel Deployment Protection `302` as the root cause of upstream API failure.
- Using the protected branch deployment URL as the sole unauthenticated API test.
- Continuing the Dewaweb Warrior hosting experiment without a compatible runtime/platform baseline.
- Treating `next build` success as proof upstream runtime is healthy.
- Treating `isAdminMode` as proof of WordPress authentication.
- Disabling WordPress public routes before auditing their SEO/indexability role.

---

# 🧱 TECHNICAL DEBT — NOW / NEXT / LATER

### NOW

- DNS authority/delegation recovery and verification.
- Re-test local and Vercel WordPress/WooCommerce API connectivity.
- Clean final build/runtime/mobile regression after upstream recovery.
- Shared Header search interaction + sticky behavior + parity.
- Product Detail final shared-design parity.
- Article/local editorial typography.

### NEXT

- Public WordPress URL + SEO surface audit.
- Authenticated WordPress admin control layer.
- WordPress/WooCommerce/Core System integration.
- Authoritative ACF filtering.
- WooCommerce API performance/cache hardening.
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
src/components/RecentPostsSection.tsx
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
src/app/api/posts/route.ts
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

- [`docs/prompts/START-SESSION-PROMPT.md`](docs/prompts/START-SESSION-PROMPT.md) → canonical orientation prompt untuk membuka session baru dan membuat archive awal.
- [`docs/prompts/END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md) → canonical forensic close/handoff prompt untuk menutup session.
- [`docs/prompts/UPDATE-DOCUMENTATION-PROMPT.md`](docs/prompts/UPDATE-DOCUMENTATION-PROMPT.md) → documentation-only synchronization workflow.

### Root shortcut

[`end-session-prompt.md`](end-session-prompt.md) → shortcut ke canonical [`docs/prompts/END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md).

---

# 🚀 CHAT 1.9 HANDOFF

Start title:

```text
1.9 BBKitchen Next.js Migration — DNS Recovery & Production API Verification
```

Current session:

```text
Chat 1.8 → CLOSED — DNS BLOCKED
Chat 1.9 → NEXT
```

First actions:

1. Verify authoritative DNS/delegation for `bukanbarukitchen.com`.
2. Confirm stable A/NS/SOA responses from multiple public resolvers.
3. Re-test WordPress public REST and WooCommerce endpoints.
4. Re-test local `/api/posts`, `/api/products`, and metadata.
5. Re-test Vercel API routes.
6. Only after upstream recovery, resume production hardening / SEO takeover audit.

At session close, use [`docs/prompts/END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md).

---

# 📜 MIGRATION TIMELINE

```text
Chat 1.1 → Foundation
Chat 1.2 → Live API / Metadata / SEO
Chat 1.3 → Routing / Integration
Chat 1.4 → Sales-first homepage / assets
Chat 1.5 → Documentation / session hardening
Chat 1.6 → Responsive UI / homepage UX / gallery
Chat 1.6B → Launch architecture clarification
Chat 1.7 → Clean verification + main branch + docs sync
Chat 1.8 → Recent Posts + runtime diagnostics + DNS blocker isolation
Chat 1.9 → DNS recovery + production API verification
```
