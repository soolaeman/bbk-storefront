# BBKitchen Frontend — Next.js Migration

Branch aktif: `main`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md).

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 CURRENT CHECKPOINT — CHAT 2.2 CLOSED

```text
Date: 24 August 2026
Session: Chat 2.2
Start: 05:33 WIB
End: 08:02 WIB
Duration: 2h 29m
Status: CLOSED — catalog/detail flow recovered; verification debt carried forward
```

Chat 2.2 recovered the production WooCommerce catalog/detail flow using the native `/wp-json/wc/v3/...` request path with a browser-like User-Agent and server-side credentials. The public product URL family remains `/shop/[slug]`. Product Detail WhatsApp is `0851 2200 1051`.

## Documentation checkpoints

```text
Chat 2.2 archive:
a1011041732afd26800a7848242a7f0405a251b8
Progress index:
9686c7282b75867c3c54579f688633c4cb4b88e4
Latest code checkpoint:
ef1687d5673c03b885ac94e4cd20b55f98dab0a7
```

---

# 📈 MIGRATION PROGRESS

| Session | Start | End | Duration | Focus | Status |
|---|---|---|---:|---|---|
| 1.1 | 14 Aug 12:45 WIB | 14 Aug 15:12 WIB | 2h 27m | Foundation | ✅ |
| 1.2 | 14 Aug 17:00 WIB | 14 Aug 21:00 WIB | 4h | API / Metadata / SEO | ✅ |
| 1.3 | 14 Aug 23:00 WIB | 15 Aug 03:00 WIB | 4h | Routing / Integration | ✅ |
| 1.4 | 15 Aug 13:00 WIB | 16 Aug 06:32:41 WIB | 17h 32m 41s | Sales / Conversion | ✅ |
| 1.5 | 16 Aug 06:32:41 WIB | 16 Aug 07:20 WIB | 47m 19s | Documentation / session hardening | ✅ |
| 1.6 | 16 Aug 15:45 WIB | 16 Aug 19:43:16 WIB | 3h 58m 16s | Responsive QA / UX / gallery | ✅ |
| 1.6B | 16 Aug 19:45 WIB | 16 Aug 20:16 WIB | 31m | Launch architecture clarification | 🟡 |
| 1.7 | 17 Aug 03:30 WIB | 17 Aug 06:18 WIB | 2h 48m | Clean verification / docs | ✅ |
| 1.8 | 17 Aug 06:30 WIB | 17 Aug 16:54 WIB | 10h 24m | Recent Posts / runtime / DNS | 🛑 |
| 1.9 | 17 Aug 19:10 WIB | 17 Aug 22:14 WIB | 3h 04m | Landing pages / navigation / favicon | ✅ |
| 2.0 | 21 Aug 08:36 WIB | 21 Aug 10:29 WIB | 1h 53m | Origin/API diagnostics | 🟡 Superseded |
| 2.1 | 21 Aug 13:25 WIB | 21 Aug 18:19 WIB | 4h 54m | Origin correction / `/katalog` / WooCommerce auth | ⚠️ Superseded |
| 2.2 | 24 Aug 05:33 WIB | 24 Aug 08:02 WIB | 2h 29m | WooCommerce REST recovery / catalog-detail / URL preservation | ✅ Closed |

### Project time

```text
Verified session working time through Chat 2.2:
58 hours 48 minutes 16 seconds

Actual elapsed duration since Chat 1.1:
NOT VERIFIABLE

Earliest verifiable migration evidence:
14 August 2026 12:45 WIB
```

Calendar span is not working duration.

---

# 🎯 CURRENT PARETO PRIORITIES

1. **Production API verification** — prove `/api/products` and `/api/products?metadata=1` return real `application/json` consistently.
2. **Catalog verification** — filters, pagination, status/condition/location/category behavior and broader production coverage.
3. **SEO + backend consistency** — audit remaining WooCommerce fetch paths, robots/indexing, sitemap/canonical behavior and the public WordPress renderer surface.

---

# 📊 CURRENT STATE

| Area | State |
|---|---|
| Next.js public rendering | ✅ established |
| WordPress/WooCommerce/ACF/Core System source of truth | 🔒 locked |
| Backend origin `origin.bukanbarukitchen.com` | ✅ verified |
| `/katalog` | ✅ user-verified |
| Production WooCommerce catalog | ✅ user-verified |
| Native `/wp-json/wc/v3/...` path + browser-like User-Agent | ✅ working evidence |
| Product detail `/shop/[slug]` | ✅ user-verified |
| Related products + `/shop/[slug]` links | ✅ user-verified |
| `/api/products` raw JSON | ⚠️ pending final evidence |
| `/api/products?metadata=1` | ⚠️ pending final 200 JSON evidence |
| Exhaustive filters/pagination | ⚠️ pending |
| Public SEO takeover | ⏳ audit pending |
| Authenticated admin controls | ⏳ implementation pending |

## Current architecture

```text
www.bukanbarukitchen.com
        ↓
Vercel / Next.js
        ↓ server-side fetch
origin.bukanbarukitchen.com
        ↓
/home/bukanbar/public_html
        ↓
WordPress + WooCommerce + ACF + BBK APIs
```

Locked principles:

- no second WordPress source of truth;
- no Vercel-blocked Host-header workaround;
- WooCommerce credentials stay server-side;
- preserve `/shop/[slug]` as the public product URL family;
- do not treat a Next.js route as proof that a legacy WordPress URL is redirected/de-indexed;
- `isAdminMode` is not authentication.

---

# ⚠️ ACTIVE BOTTLENECKS

| ID | Problem | Status |
|---|---|---|
| B-6 | WordPress/WooCommerce origin separation | ✅ Resolved |
| B-18 | WooCommerce REST request/auth path | ⚠️ Recovered / verifying |

B-18 evidence: previous `rest_route` auth returned `401 woocommerce_rest_cannot_view`, Basic Auth returned `401 invalid_username`, while the native `/wp-json/wc/v3/...` path with browser-like User-Agent produced working production catalog evidence.

---

# 🧩 CARRIED TECHNICAL DEBT

- Verify production `/api/products` and `/api/products?metadata=1` raw JSON responses.
- Verify filters/pagination/status/condition/location/category behavior.
- Audit remaining direct WooCommerce server-side fetching and `src/app/wp-json/wc/v3/[...slug]/route.ts`.
- Audit origin `robots/noindex`, public WordPress renderer, sitemap and canonical/indexing behavior.
- Complete authenticated WordPress admin control layer.

---

# 🗺️ DOCUMENTATION MAP

```text
README.md
→ current project dashboard

NAVIGATOR.md
→ documentation map

docs/guides/
→ human / vibe-coding reference

docs/progress/
→ forensic migration history

docs/prompts/
→ AI workflow / SOP
```

---

# 🔁 NEXT CHAT HANDOFF

## Chat 2.3 — WooCommerce Production Verification & SEO Hardening

1. Verify `/api/products` + `/api/products?metadata=1` as real JSON.
2. Verify filters and pagination.
3. Audit remaining WooCommerce fetch paths against the proven native REST mechanism.
4. Run SEO/indexing/robots/sitemap verification after API stability is confirmed.
5. Do not repeat the rejected Host-header workaround or Basic Auth approach.

After GitHub changes:

```bash
git pull origin main
```
