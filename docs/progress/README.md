# BBKitchen Progress Archive

This folder is the **detailed progress/history layer** for the Next.js migration.

`README.md` at repository root is the current-state summary and handoff. Detailed session history belongs here.

## Chronology

| Chat | Period / Evidence | Start | End | Duration | Focus | Status | Archive |
|---|---|---|---|---:|---|---|---|
| 1.1 | **14 Aug 2026** | **12:45 WIB** | **15:12 WIB** | **2h 27m** | Foundation, WooCommerce migration, catalog architecture, early bottlenecks | ✅ Archived | [`CHAT-1.1.md`](CHAT-1.1.md) |
| 1.2 | **14 Aug 2026** | **17:00 WIB** | **21:00 WIB** | **4h** | API, metadata, live catalog, pagination, product detail, SEO/ACF contracts | ✅ Archived | [`CHAT-1.2.md`](CHAT-1.2.md) |
| 1.3 | **14–15 Aug 2026** | **14 Aug 23:00 WIB** | **15 Aug 03:00 WIB** | **4h** | Catch-all local routing, Header integration, article rendering, visual convergence | ✅ Archived | [`CHAT-1.3.md`](CHAT-1.3.md) |
| 1.4 | **15–16 Aug 2026** | **15 Aug 13:00 WIB** | **16 Aug 06:32:41 WIB** | **17h 32m 41s** | Homepage sales positioning, CTA normalization, hero assets, mascot dead end, social video covers | ✅ Closed | [`CHAT-1.4.md`](CHAT-1.4.md) |
| 1.5 | **16 Aug 2026** | **06:32:41 WIB** | **07:20 WIB** | **47m 19s** | Documentation / repository orientation / session hardening | ✅ Closed | [`CHAT-1.5.md`](CHAT-1.5.md) |
| 1.6 | **16 Aug 2026** | **15:45 WIB** | **19:43:16 WIB** | **3h 58m 16s** | Responsive QA, shared Footer, catalog UX, related products, service/testimonial/gallery polish | ✅ Closed | [`CHAT-1.6.md`](CHAT-1.6.md) |
| 1.6B | **16 Aug 2026** | **19:45 WIB** | **20:16 WIB** | **31m** | Post-session launch architecture clarification: public Next.js takeover/SEO + authenticated WordPress admin controls | 🟡 Clarified / Pending | [`CHAT-1.6B.md`](CHAT-1.6B.md) |
| 1.7 | **17 Aug 2026** | **03:30 WIB** | **06:18 WIB** | **2h 48m** | Clean verification baseline, GitHub branch finalization, prompt/documentation audit, end-session handoff | ✅ Closed with documentation debt | [`CHAT-1.7.md`](CHAT-1.7.md) |
| 1.8 | **17 Aug 2026** | **06:30 WIB** | **16:54 WIB** | **10h 24m** | Recent Posts, Vercel/API runtime diagnostics, DNS investigation, hosting fallback evaluation | 🛑 Closed — DNS blocked | [`CHAT-1.8.md`](CHAT-1.8.md) |
| 1.9 | **17 Aug 2026** | **19:10 WIB** | **22:14 WIB** | **3h 04m** | Landing pages, navigation, favicon handoff | ✅ Closed | [`CHAT-1.9.md`](CHAT-1.9.md) |
| 2.0 | **21 Aug 2026** | **08:36 WIB** | **10:29 WIB** | **1h 53m** | Vercel/WordPress origin diagnostics, DewaWeb origin strategy, API architecture, support-ticket handoff | 🛑 Blocked — DewaWeb support | [`CHAT-2.0.md`](CHAT-2.0.md) |
| 2.1 | **21 Aug 2026** | **13:25 WIB** | **18:19 WIB** | **4h 54m** | Origin document-root correction, `/katalog` recovery, WooCommerce REST authentication isolation | ⚠️ Closed — WooCommerce REST auth blocked | [`CHAT-2.1.md`](CHAT-2.1.md) |
| 2.2 | **24 Aug 2026** | **05:33 WIB** | **08:02 WIB** | **2h 29m** | WooCommerce REST request-path recovery, production catalog/detail recovery, URL preservation, WhatsApp update | ✅ Closed with carried verification debt | [`CHAT-2.2.md`](CHAT-2.2.md) |
| 2.3 | **24 Aug 2026** | **08:12 WIB** | **10:42 WIB** | **2h 30m** | Production API verification, canonical WooCommerce/WordPress fetch-path migration, legacy-route audit, SEO hardening, split request-time sitemaps | ✅ Closed with carried verification debt | [`CHAT-2.3.md`](CHAT-2.3.md) |
| 2.4 | **24 Aug 2026** | **10:58 WIB** | **12:53:02 WIB** | **1h 55m 02s** | MBG landing mapping, hierarchical routing, sitemap verification, universal hierarchy requirement | ✅ Closed with carried sitemap debt | [`CHAT-2.4.md`](CHAT-2.4.md) |
| 2.5 | **24 Aug 2026** | **13:00:50 WIB** | **13:06:18 WIB** | **5m 28s** | Vercel production blocker audit, MBG route module-resolution diagnosis, deployment-quota isolation, hierarchy handoff | 🛑 Closed — Vercel deployment quota | [`CHAT-2.5.md`](CHAT-2.5.md) |

> **Canonical timing source:** verified session timing supplied in the migration workflow and current end-session time verification. Exact Chat 2.5 Start/End/Duration are recorded in `CHAT-2.5.md`.

## Project time summary

```text
Verified working time through Chat 2.4:
63 hours 13 minutes 18 seconds

Chat 2.5:
5 minutes 28 seconds

Verified working time through Chat 2.5:
63 hours 18 minutes 46 seconds

Actual elapsed duration since Chat 1.1 start:
NOT VERIFIABLE
```

> `session working time` and `project elapsed span` are different measurements. Do not use elapsed span as a proxy for working time.

## Current Migration Position

```text
DATA ARCHITECTURE       ✅ established
ROUTING                 ✅ established
CATALOG                 ✅ production products visibly recovered
PRODUCT DETAIL          ✅ production flow user-verified
HOMEPAGE POSITIONING    ✅ sales-first
SHARED FOOTER           ✅ integrated across key templates
RELATED PRODUCTS        ✅ implemented + user-verified
GALLERY                 ✅ compact carousel direction locked
MOBILE UX PATTERNS      ✅ direction locked
RECENT POSTS            ✅ implemented baseline

SITEMAP ROUTING         ⚠️ hierarchy parity still pending
PUBLIC SEO TAKEOVER     ⏳ audit pending
ADMIN CONTROL LAYER     ⏳ implementation pending
BACKEND ORIGIN          ✅ verified — origin.bukanbarukitchen.com → existing WordPress
WOOCOMMERCE REST PATH   ✅ production catalog recovery evidence
WORDPRESS REST HELPER   ✅ migrated to canonical origin/path
LEGACY COMPAT PROXY     ⚠️ internally orphaned; external dependency unknown
VERCEL DEPLOYMENT       🛑 Hobby daily deployment quota exhausted
MBG ROUTE BUILD         🛑 latest blocker: incorrect relative import depth
```

## Current Pareto Focus

1. Correct `src/app/solusi-peralatan-dapur-mbg/[...slug]/page.tsx` imports from `../../../../` to `../../../` and commit the fix.
2. After Vercel quota recovery, perform one production deployment attempt and inspect the resulting build.
3. Implement the universal WordPress hierarchy resolver shared by routing, canonical generation, and `sitemap-pages.xml`, then re-verify live sitemap hierarchy.

## Rule

Every migration chat should leave behind a progress record containing date/time evidence, duration when verifiable, Pareto top changes, bottlenecks, root causes, failed approaches, architecture decisions, verification, Git checkpoint, and next-chat handoff.

If a fact is unavailable, write:

`Tidak ditemukan di conversation.`

For timing specifically, use:

`Tidak ditemukan di repository/evidence yang tersedia.`

Do not replace forensic history with a clean-looking summary.
