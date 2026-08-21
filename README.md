# BBKitchen Frontend — Next.js Migration

Branch aktif: `main`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md).

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 LAST SESSION — CHAT 2.1

```text
Session: 2.1 BBKitchen Next.js Migration
Date: 21 August 2026
Started: Tidak ditemukan di repository/evidence yang tersedia.
Ended: 21 August 2026 18:19 WIB
Duration: —
Status: CLOSED — WooCommerce REST authentication blocked
```

> Chat 2.1 corrected `origin.bukanbarukitchen.com` to serve the existing `/home/bukanbar/public_html` WordPress installation, restored the `/katalog` route, and isolated the remaining production blocker to WooCommerce REST authentication.

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
Chat 2.0 → 🛑 Closed — DewaWeb origin blocker resolved in Chat 2.1
Chat 2.1 → ⚠️ Closed — WooCommerce REST authentication blocked
```

## Current documentation checkpoint

```text
Chat 2.1 archive:
e70483aea8c2f94d800610a5e2fbf9bd10b387cf

Progress index:
77427c6cb7478e723cc24628caf83bbf810db133

README commit:
PENDING

Last code checkpoint:
39c691fcba3bdcb5093c799daa3303fdf6e1ac6f
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
| 2.0 | **21 Aug 2026** | **08:36 WIB** | **10:29 WIB** | **1h 53m** | Origin/API diagnostics / DewaWeb support | 🛑 |
| 2.1 | **21 Aug 2026** | **Start unavailable** | **18:19 WIB** | **—** | Origin correction / catalog recovery / WooCommerce REST auth | ⚠️ |

### ⏱️ Verified working/session time

```text
Through Chat 1.9:
49 hours 32 minutes 16 seconds

Chat 2.0:
1 hour 53 minutes

Chat 2.1:
— (Start not verifiable)

Verified session working time through Chat 2.0:
51 hours 25 minutes 16 seconds

Actual elapsed duration since Chat 1.1 start:
NOT VERIFIABLE

Earliest verifiable migration evidence:
14 August 2026 12:45 WIB
```

> **Important:** elapsed/calendar span ≠ working duration. Do not use calendar span as a proxy for time spent working.

---

# 🎯 CURRENT PHASE

```text
ORIGIN SEPARATION          ✅ VERIFIED
WORDPRESS REST             ✅ VERIFIED
WOOCOMMERCE REST REACHABLE ⚠️ 401 AUTH BLOCKED
CATALOG ROUTE              ✅ /katalog accessible
CATALOG DATA               🛑 BLOCKED BY WC REST AUTH
PRODUCTION HARDENING       🛑 BLOCKED
```

# 🎯 CURRENT PRIORITIES — PARETO

1. **WooCommerce REST authentication isolation** — prove why the new `Read` key still receives 401 directly against `origin.bukanbarukitchen.com`.
2. **WooCommerce fetch alignment** — once auth works, make all server-side WooCommerce consumers use the proven authentication boundary.
3. **Production verification** — verify catalog metadata/filters, product detail, and sitemap-driven production routes after upstream auth is stable.

---

# 📊 CURRENT STATE + VERIFICATION

| Area | Implementation | Verification |
|---|---|---|
| Origin `origin.bukanbarukitchen.com` → existing WordPress | ✅ | ✅ cPanel + REST identity |
| WordPress REST `/wp-json/` | ✅ | ✅ Direct browser |
| WooCommerce namespace `wc/v3` | ✅ | ✅ Direct browser |
| BBK custom namespace `bbk/v1` | ✅ | ✅ Direct browser |
| Catalog `/katalog` route | ✅ | ✅ User-verified accessible |
| Catalog implementation | ✅ | ⚠️ Dynamic data blocked by WC auth |
| `/api/products` query-auth proxy | ✅ | ⚠️ Production still 401 upstream |
| WooCommerce authenticated listing | ⚠️ | 🛑 401 |
| Product detail | ✅ structure | 🛑 Upstream auth blocked |
| Sitemap routing | ✅ | ⚠️ Full production verification pending |
| Public SEO takeover | ⏳ | ⏳ Audit pending |
| Authenticated admin controls | ⏳ | ⏳ Pending |

---

# 🧭 ARCHITECTURE BASELINE

```text
                         PUBLIC DOMAIN
                  www.bukanbarukitchen.com
                             ↓
                          NEXT.JS
                             ↓
                  server-side API fetch
                             ↓
               origin.bukanbarukitchen.com
                             ↓
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
- **WordPress:** remains backend/admin source of truth; Next.js is the public renderer.
- **Google Sheets:** backend/Core System concern; never expose credentials in client.

### Locked principles

- Next.js is the public experience layer, not the inventory source of truth.
- WordPress/WooCommerce/ACF/Core System remains the backend/admin source of truth.
- Next.js is the **single public renderer** for the primary website domain.
- Public catalog route: `/katalog`.
- Product route: `/shop/[slug]` per sitemap contract.
- Product category route: `/product-category/[...slug]`.
- WordPress page/post fallback preserves sitemap paths.
- Existing API paths remain `/wp-json/`, `/wp-json/wc/v3/`, and BBK custom `/wp-json/bbk/v1/*`.
- `origin.bukanbarukitchen.com` is the backend/origin hostname and points to the existing WordPress web root; it is not a second WordPress source of truth.

---

# ⚠️ ACTIVE BOTTLENECKS

| ID | Problem | Status |
|---|---|---|
| B-3 | ACF REST / authoritative inventory metadata filtering | ⚠️ Carried |
| B-6 | WordPress/WooCommerce origin separation after public domain moved to Vercel | ✅ Resolved in Chat 2.1 |
| B-12 | Article/local editorial typography | ⚠️ Carried |
| B-13 | Header search interaction | ⚠️ Carried |
| B-14 | Product Detail shared Header parity | ⚠️ Carried |
| B-15 | Public WordPress renderer/SEO surface must be audited before Next.js takeover | ⚠️ Launch requirement |
| B-16 | Authenticated WordPress admin control layer not yet implemented | ⚠️ Launch requirement |
| B-17 | Production favicon delivery | 🛑 Pending `public/favicon.ico` upload + deployment verification |

### Current REST authentication blocker

```text
origin.bukanbarukitchen.com/wp-json/
→ WordPress REST reachable

origin.bukanbarukitchen.com/wp-json/wc/v3/products
→ reachable but 401

WordPress user `admbbk`
→ Administrator

WooCommerce REST key
→ regenerated with Read permission

Vercel environment variables
→ configured + redeployed

Conclusion:
→ origin separation is solved
→ WooCommerce authentication remains unresolved
```

---

# 🔁 NEXT-CHAT HANDOFF

```text
1. Isolate direct-origin WooCommerce authentication using the existing/new key.
2. Do NOT change database/table prefixes.
3. Do NOT create another WordPress installation.
4. Do NOT keep regenerating API keys without new evidence.
5. Once direct WooCommerce auth succeeds, verify /api/products and catalog data.
6. Align remaining WooCommerce server-side fetches to the proven auth method.
7. Run sitemap-driven production verification.
```

After GitHub changes, local checkout must sync with:

```bash
git pull origin main
```
