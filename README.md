# BBKitchen Frontend — Next.js Migration

Branch aktif: `main`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md).

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 LAST SESSION — CHAT 2.2

```text
Session: 2.2 BBKitchen Next.js Migration
Date: 24 August 2026
Start: 05:33 WIB
End: 08:02 WIB
Duration: 2h 29m
Status: CLOSED — catalog and product-detail flow recovered; verification debt carried forward
```

> Chat 2.2 recovered the production WooCommerce catalog/detail path using the native `/wp-json/wc/v3/...` request mechanism with a browser-like User-Agent, preserved `/shop/[slug]` as the public product URL family, and updated Product Detail WhatsApp to `0851 2200 1051`.

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
Chat 2.1 → ⚠️ Superseded — WooCommerce auth blocker investigated further in Chat 2.2
Chat 2.2 → ✅ Closed — catalog/detail flow recovered; production verification debt carried forward
```

## Current documentation checkpoint

```text
Chat 2.2 archive:
a1011041732afd26800a7848242a7f0405a251b8

Progress index:
9686c7282b75867c3c54579f688633c4cb4b88e4

Latest code checkpoint:
ef1687d5673c03b885ac94e4cd20b55f98dab0a7

Previous product URL checkpoint:
c97e4a0f97f2dadeb323f3d4958a6c1e8f803276
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
| 2.1 | **21 Aug 2026** | **13:25 WIB** | **18:19 WIB** | **4h 54m** | Origin correction, `/katalog` restore, WooCommerce auth isolation | ⚠️ Superseded by Chat 2.2 |
| 2.2 | **24 Aug 2026** | **05:33 WIB** | **08:02 WIB** | **2h 29m** | WooCommerce REST recovery, catalog/detail, URL preservation, WhatsApp | ✅ Closed |

### ⏱️ Verified working/session time

```text
Verified session working time through Chat 2.1:
56 hours 19 minutes 16 seconds

Chat 2.2 working duration:
2 hours 29 minutes

Verified session working time through Chat 2.2:
58 hours 48 minutes 16 seconds

Actual elapsed duration since Chat 1.1 start:
NOT VERIFIABLE

Earliest verifiable migration evidence:
14 August 2026 12:45 WIB
```

> **Important:** elapsed/calendar span ≠ working duration.

---

# 🎯 CURRENT PRIORITIES — PARETO

1. **Production API verification** — confirm `/api/products` and `/api/products?metadata=1` return real `application/json` responses consistently.
2. **Catalog verification** — test filters, pagination, status/condition/location/category behavior, and broader production coverage.
3. **WooCommerce consistency + SEO hardening** — align remaining direct fetch paths, then audit indexing/robots/sitemap and the remaining public WordPress renderer surface.

---

# 📊 CURRENT STATE + VERIFICATION

| Area | Implementation | Verification |
|---|---|---|
| WordPress origin hostname | ✅ | ✅ Verified |
| Origin document root → `/home/bukanbar/public_html` | ✅ | ✅ Verified |
| Existing BBKitchen WordPress served via origin | ✅ | ✅ Verified |
| WordPress `/wp-json/` | ✅ | ✅ Verified |
| WooCommerce `wc/v3` namespace | ✅ | ✅ Verified |
| BBK custom `bbk/v1` namespace | ✅ | ✅ Verified |
| `/katalog` route | ✅ | ✅ User-verified |
| Production WooCommerce product cards | ✅ | ✅ User-verified |
| Native `/wp-json/wc/v3/...` request path | ✅ | ✅ Working production evidence |
| Browser-like upstream User-Agent | ✅ | ✅ Included in working checkpoint |
| Product detail `/shop/[slug]` | ✅ | ✅ User-verified |
| Related products + `/shop/[slug]` links | ✅ | ✅ User-verified |
| Product Detail WhatsApp `0851 2200 1051` | ✅ | ✅ Code verified |
| `/api/products` final raw JSON evidence | ⚠️ | ⏳ Pending |
| `/api/products?metadata=1` | ⚠️ | ⏳ Pending final 200 JSON verification |
| Exhaustive filters/pagination | ⚠️ | ⏳ Pending |
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
- Do not use a Vercel-blocked `Host` header workaround.
- Do not change the WordPress table prefix as a workaround for REST authentication.
- Keep WooCommerce credentials server-side only.
- Do not equate a Next.js route existing with proof that legacy WordPress public routes are redirected, canonicalized, disabled, or de-indexed.
- Preserve `/shop/[slug]` as the established public product URL family.

---

# ⚠️ ACTIVE BOTTLENECKS

| ID | Chat | Problem | Root Cause / Evidence | Resolution | Status |
|---|---|---|---|---|---|
| B-6 | 2.0 → 2.1 | WordPress/WooCommerce origin separation | Origin hostname initially pointed to a fresh WordPress document root | Corrected origin document root to `/home/bukanbar/public_html` | ✅ RESOLVED |
| B-18 | 2.1 → 2.2 | WooCommerce REST request/auth path | `rest_route` and Basic Auth tests failed; native `/wp-json/wc/v3/...` + browser-like User-Agent produced working production catalog evidence | Working path adopted; catalog/detail flow recovered | ⚠️ RECOVERED / VERIFYING |

### B-18 current evidence

```text
origin.bukanbarukitchen.com/wp-json/                 → WordPress REST OK
origin.bukanbarukitchen.com/wp-json/wc/v3/          → namespace present
Previous direct query-auth test                        → 401 woocommerce_rest_cannot_view
Previous Basic Auth test                               → 401 invalid_username
Working production catalog                            → native /wp-json/wc/v3/... + browser-like User-Agent
Vercel Host-header workaround                         → rejected / reverted
```

---

# 🧩 CARRIED TECHNICAL DEBT

- Verify production `/api/products?metadata=1` as `200 application/json`.
- Verify filters, pagination, condition/location/category/status behavior.
- Verify final raw JSON response for `/api/products`.
- Audit `src/app/wp-json/wc/v3/[...slug]/route.ts` and remaining direct WooCommerce server-side fetching.
- Audit origin `robots/noindex` hygiene before launch.
- Complete public WordPress renderer/SEO surface audit.
- Complete authenticated WordPress admin control layer.

---

# 🗺️ PROJECT TIMELINE / ELAPSED-TIME STATUS

```text
Earliest verifiable migration evidence:
14 August 2026 12:45 WIB

Actual elapsed duration since Chat 1.1:
NOT VERIFIABLE

Verified working/session time through Chat 2.2:
58 hours 48 minutes 16 seconds
```

For the detailed Start / End / Duration chronology, see [`docs/progress/README.md`](docs/progress/README.md). Do not treat calendar span as working duration.

---

# 🔁 NEXT-CHAT HANDOFF

## Chat 2.3 — WooCommerce Production Verification & SEO Hardening

1. Test production `/api/products` and `/api/products?metadata=1` and confirm real `application/json` responses.
2. Test catalog filters and pagination.
3. Audit remaining WooCommerce server-side fetch paths against the proven native REST mechanism.
4. Run SEO/indexing/robots/sitemap verification after API stability is confirmed.
5. Do not repeat the rejected Host-header workaround or Basic Auth approach.

After GitHub changes:

```bash
git pull origin main
```
