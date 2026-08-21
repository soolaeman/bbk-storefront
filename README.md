# BBKitchen Frontend — Next.js Migration

Branch aktif: `main`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md).

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 LAST SESSION — CHAT 2.1

```text
Session: 2.1 BBKitchen Next.js Migration
Date: 21 August 2026
Start: 13:25 WIB
End: 18:19 WIB
Duration: 4h 54m
Status: BLOCKED — WooCommerce REST authentication
```

> Chat 2.1 resolved the DewaWeb origin/document-root separation and restored `/katalog`. The remaining production blocker is authenticated WooCommerce product listing through `origin.bukanbarukitchen.com`.

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
Chat 1.9 → ✅ Closed — landing pages / favicon handoff
Chat 2.0 → 🟡 Superseded — origin separation resolved in Chat 2.1
Chat 2.1 → 🛑 Closed — WooCommerce REST authentication
```

## Current documentation checkpoint

```text
Chat 2.1 archive:
4cd09fdf546c3bc7de68e993e0544c4540076aae

Progress index:
7e830e37c448ddc3de7e224cd07aa5edf496209a

Latest code checkpoint:
39c691fcba3bdcb5093c799daa3303fdf6e1ac6f

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
| 1.6B | **16 Aug 2026** | **19:45 WIB** | **20:16 WIB** | **31m** | Launch architecture clarification | 🟡 |
| 1.7 | **17 Aug 2026** | **03:30 WIB** | **06:18 WIB** | **2h 48m** | Clean verification / main branch / docs | ✅ |
| 1.8 | **17 Aug 2026** | **06:30 WIB** | **16:54 WIB** | **10h 24m** | Recent Posts / runtime diagnostics / DNS | 🛑 |
| 1.9 | **17 Aug 2026** | **19:10 WIB** | **22:14 WIB** | **3h 04m** | Landing pages / navigation / favicon | ✅ |
| 2.0 | **21 Aug 2026** | **08:36 WIB** | **10:29 WIB** | **1h 53m** | Origin/API diagnostics / DewaWeb support | 🟡 Superseded by Chat 2.1 |
| 2.1 | **21 Aug 2026** | **13:25 WIB** | **18:19 WIB** | **4h 54m** | Origin correction, `/katalog` restore, WooCommerce auth isolation | 🛑 |

### ⏱️ Verified working/session time

```text
Verified session working time through Chat 1.9:
49 hours 32 minutes 16 seconds

Chat 2.0:
1 hour 53 minutes

Chat 2.1:
4 hours 54 minutes

Verified session working time through Chat 2.1:
56 hours 19 minutes 16 seconds

Actual elapsed duration since Chat 1.1 start:
NOT VERIFIABLE

Earliest verifiable migration evidence:
14 August 2026 12:45 WIB
```

> **Important:** elapsed/calendar span ≠ working duration.

---

# 🎯 CURRENT PRIORITIES — PARETO

1. **WooCommerce REST authentication** — isolate why the existing/new API credentials still return `401 woocommerce_rest_cannot_view` through the verified origin.
2. **Production catalog verification** — after auth succeeds, verify `/api/products`, metadata, filters, pagination, and `/katalog` data loading.
3. **WooCommerce server-side consistency** — align the remaining direct/compatibility WooCommerce fetch paths with the proven authentication strategy before full product-detail/sitemap verification.

---

# 📊 CURRENT STATE + VERIFICATION

| Area | Implementation | Verification |
|---|---|---|
| WordPress origin hostname | ✅ | ✅ Verified |
| Origin document root → `/home/bukanbar/public_html` | ✅ | ✅ cPanel + REST verified |
| Existing BBKitchen WordPress served via origin | ✅ | ✅ Direct REST identity verified |
| WordPress `/wp-json/` | ✅ | ✅ Direct browser verified |
| WooCommerce `wc/v3` namespace | ✅ | ✅ Direct browser verified |
| BBK custom `bbk/v1` namespace | ✅ | ✅ Direct browser verified |
| `/katalog` route | ✅ | ✅ User-verified accessible |
| Catalog implementation | ✅ | ⚠️ Data blocked by WooCommerce auth |
| `/api/products` query-auth proxy | ✅ | ⚠️ Production still 401 |
| WooCommerce authenticated product listing | ⚠️ | 🛑 401 unresolved |
| Product Detail runtime upstream | ✅ structure | ⚠️ Awaiting auth verification |
| Public SEO takeover | ⏳ | ⏳ Audit pending |
| Authenticated admin controls | ⏳ | ⏳ Implementation pending |

---

# 🧭 ARCHITECTURE BASELINE

```text
PUBLIC
www.bukanbarukitchen.com
        ↓
Vercel / Next.js
        ↓ server-side fetch
BACKEND ORIGIN
origin.bukanbarukitchen.com
        ↓
/home/bukanbar/public_html
        ↓
existing WordPress + WooCommerce + ACF + BBK APIs
```

- **Next.js:** public experience/rendering layer.
- **WordPress/WooCommerce/ACF/Core System:** backend/admin source of truth.
- `origin.bukanbarukitchen.com`: backend/API origin, not a second WordPress source of truth.
- Public catalog route: `/katalog`.
- Public product route: `/shop/[slug]`.
- Public product category route: `/product-category/[...slug]`.
- Existing API contracts remain `/wp-json/`, `/wp-json/wc/v3/`, and `/wp-json/bbk/v1/*`.

### Locked principles

- Do not point WordPress upstream back to `www.bukanbarukitchen.com` while `www` is served by Vercel.
- Do not create/maintain a second WordPress source of truth for the origin.
- Do not change the WordPress table prefix as a workaround for REST authentication.
- Keep WooCommerce credentials server-side only.
- Do not equate a Next.js route existing with proof that legacy WordPress public routes are redirected, canonicalized, disabled, or de-indexed.

---

# ⚠️ ACTIVE BOTTLENECKS

| ID | Chat | Problem | Root Cause | Resolution | Lesson | Status |
|---|---|---|---|---|---|---|
| B-3 | carried | ACF REST / authoritative inventory metadata filtering | Not fully reverified | Pending auth + runtime verification | Verify upstream before claiming filters complete | ⚠️ |
| B-6 | 2.0 → 2.1 | WordPress/WooCommerce origin separation | Origin hostname initially pointed to a fresh WordPress document root | Corrected origin document root to `/home/bukanbar/public_html` | Origin should point to the existing WordPress web root | ✅ RESOLVED |
| B-18 | 2.1 | WooCommerce REST authentication | Not conclusively isolated; direct authenticated product listing still returns 401 | Pending direct-origin auth isolation | Do not regenerate keys or alter DB without new evidence | 🛑 |

### B-18 current evidence

```text
origin.bukanbarukitchen.com/wp-json/                 → WordPress REST OK
origin.bukanbarukitchen.com/wp-json/wc/v3/          → namespace present
origin.bukanbarukitchen.com/wp-json/wc/v3/products  → 401
User admbbk                                             → Administrator
WooCommerce API key                                    → created with Read permission
Vercel WC credentials                                  → updated + redeployed
Authenticated direct origin test                       → still 401
```

---

# 🧩 CARRIED TECHNICAL DEBT

- Align `src/app/wp-json/wc/v3/[...slug]/route.ts` with the eventual proven WooCommerce auth mechanism.
- Align direct WooCommerce server-side fetching in `src/app/product/[slug]/page.tsx` with the same mechanism.
- Finish production catalog/filter/product-detail verification after auth is resolved.
- Audit origin `robots/noindex` hygiene before launch.
- Complete public WordPress renderer/SEO surface audit.
- Complete authenticated WordPress admin control layer.

---

# 🔁 NEXT-CHAT HANDOFF

## Chat 2.2 — WooCommerce REST Authentication Isolation & Production Catalog Verification

1. Do **one controlled direct-origin auth test** using the current WooCommerce credentials. Do not generate more keys unless new evidence requires it.
2. If direct origin succeeds, debug only the Vercel proxy/request construction.
3. If direct origin still returns 401, isolate the WordPress/WooCommerce/server authentication layer.
4. Once auth succeeds, test `/api/products`, `/katalog`, metadata/filter behavior, and `/shop/[slug]`.
5. Only after production data works, perform sitemap-driven production verification.

After GitHub changes:

```bash
git pull origin main
```
