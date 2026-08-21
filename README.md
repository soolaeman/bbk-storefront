# BBKitchen Frontend — Next.js Migration

Branch aktif: `main`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md).

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 LAST SESSION — CHAT 2.0

```text
Session: 2.0 BBKitchen Next.js Migration
Started: 21 August 2026 08:36 WIB
Ended: 21 August 2026 10:29 WIB
Duration: 1h 53m
Status: BLOCKED — DewaWeb origin support ticket
```

> Chat 2.0 isolated the production API problem to origin/virtual-host separation after the public domain moved to Vercel, preserved the sitemap-driven routing contract, and established `origin.bukanbarukitchen.com` as the preferred backend/origin strategy pending DewaWeb support.

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
Chat 2.0 → 🛑 Blocked — DewaWeb origin support
```

## Current documentation checkpoint

```text
Chat 2.0 archive:
44a736f5582fcfbfdbb6cea2d05e1302d3f0e116

Progress index:
3cd10dfea3f37c3e0b641f1244f7ff5661a80c86

Latest code checkpoint:
679dd44130446e6f5c237c14f5cd8cdb9a8436d5

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
| 2.0 | **21 Aug 2026** | **08:36 WIB** | **10:29 WIB** | **1h 53m** | Origin/API diagnostics / DewaWeb support | 🛑 |

### ⏱️ Verified working/session time

```text
Through Chat 1.9:
49 hours 32 minutes 16 seconds

Chat 2.0:
1 hour 53 minutes

Through Chat 2.0:
51 hours 25 minutes 16 seconds

Actual elapsed duration since Chat 1.1 start:
NOT VERIFIABLE

Earliest verifiable migration evidence:
14 August 2026 12:45 WIB
```

> **Important:** elapsed/calendar span ≠ working duration. Do not use calendar span as a proxy for time spent working.

---

# 🎯 CURRENT PRIORITIES — PARETO

1. **DewaWeb origin resolution** — obtain a hostname that serves the existing `/home/bukanbar/public_html` WordPress installation independently of the Vercel public domain.
2. **Origin API verification** — test `/wp-json/`, `/wp-json/wc/v3/products`, and BBK custom API endpoints through the verified origin.
3. **Next.js upstream alignment** — update server-side WordPress/WooCommerce fetches only after the origin is proven, then run sitemap-driven production verification.

---

# 📊 CURRENT STATE + VERIFICATION

| Area | Implementation | Verification |
|---|---|---|
| WooCommerce data architecture | ✅ | ✅ Established baseline |
| Catalog / pagination | ✅ | ✅ Server-side, 8/page baseline |
| Product Detail | ✅ Functional structure | ⚠️ Runtime upstream blocked |
| Sitemap-driven routing | ✅ | ✅ Implemented baseline |
| Homepage sales positioning | ✅ | 🔒 Direction locked |
| Shared Footer | ✅ Integrated | ✅ User-verified across key templates |
| Related Products | ✅ | ✅ User-verified baseline |
| Catalog responsive navigation | ✅ | ✅ User-verified desktop/mobile direction |
| Service cards + WhatsApp CTAs | ✅ | ✅ User-verified |
| Dapur MBG landing page | ✅ | ⚠️ Production verification pending |
| Jual Unit landing page | ✅ | ⚠️ Production verification pending |
| Produksi Baru landing page | ✅ | ⚠️ Production verification pending |
| Recent Posts | ✅ Implemented | ✅ Placement/UI baseline verified locally |
| WordPress public SEO takeover | ⏳ | ⏳ Audit pending |
| Authenticated admin controls | ⏳ | ⏳ Authentication/server authorization pending |
| Production runtime | ⏳ | 🛑 Origin blocked pending DewaWeb |

---

# 🧭 ARCHITECTURE BASELINE

```text
                         PUBLIC DOMAIN
                    bukanbarukitchen.com
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
- Next.js is intended to become the **single public renderer** for the primary website domain.
- Existing SEO URL/slug intent must be preserved unless new technical evidence requires a change.
- Catalog pagination is server-side.
- Public catalog route: `/katalog`.
- Product route: `/shop/[slug]` per sitemap contract.
- Product category route: `/product-category/[...slug]`.
- WordPress page/post fallback preserves sitemap paths.
- Existing API paths remain `/wp-json/`, `/wp-json/wc/v3/`, and BBK custom `/wp-json/bbk/v1/*`.
- The AI Growth Automation workflow must continue to target the same WordPress installation and custom API contract.
- `origin.bukanbarukitchen.com` is intended as an API/backend origin, not a second public website.

---

# ⚠️ ACTIVE BOTTLENECKS

| ID | Problem | Status |
|---|---|---|
| B-3 | ACF REST / authoritative inventory metadata filtering | ⚠️ Carried |
| B-6 | WordPress/WooCommerce origin separation after public domain moved to Vercel | 🛑 Active — DewaWeb support required |
| B-12 | Article/local editorial typography | ⚠️ Carried |
| B-13 | Header search interaction | ⚠️ Carried |
| B-14 | Product Detail shared Header parity | ⚠️ Carried |
| B-15 | Public WordPress renderer/SEO surface must be audited before Next.js takeover | ⚠️ Launch requirement |
| B-16 | Authenticated WordPress admin control layer not yet implemented | ⚠️ Launch requirement |
| B-17 | Production favicon delivery | 🛑 Pending `public/favicon.ico` upload + deployment verification |

### B-6 current evidence

```text
Main public domain:
→ Vercel / Next.js

DewaWeb jkt10.dewaweb.com:
→ default server page

DewaWeb shared IP 103.185.53.66:
→ default server page

Existing WordPress:
→ still present in DewaWeb WP Toolkit
→ /home/bukanbar/public_html

Conclusion:
→ public domain and WordPress origin are currently separated
→ exact DewaWeb origin hostname is not yet verified
```

---

# 🔁 NEXT-CHAT HANDOFF

```text
1. Wait for DewaWeb support response for origin.bukanbarukitchen.com.
2. Verify https://origin.bukanbarukitchen.com/wp-json/.
3. Verify https://origin.bukanbarukitchen.com/wp-json/wc/v3/products.
4. Verify BBK custom /wp-json/bbk/v1/* endpoints.
5. Only then update Vercel environment variables / server-side upstream URLs.
6. Run sitemap-driven production route verification.
7. Resume SEO/admin hardening after upstream is stable.
```

After GitHub changes, local checkout must sync with:

```bash
git pull origin main
```
