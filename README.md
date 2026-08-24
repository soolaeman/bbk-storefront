# BBKitchen Frontend — Next.js Migration

Branch aktif: `main`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md).

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 CURRENT CHECKPOINT — CHAT 2.3 IN PROGRESS

```text
Date: 24 August 2026
Session: Chat 2.3
Start: 08:12 WIB
End: PENDING
Duration: PENDING
Status: IN PROGRESS — production verification + canonical WooCommerce fetch-path migration
```

Chat 2.3 verified live production JSON bodies for `/api/products` and `/api/products?metadata=1`, verified filter/pagination behavior, and migrated `product-category/[...slug]` away from direct WooCommerce fetching to the canonical `/api/products` application path. The public product URL family remains `/shop/[slug]`. Product Detail WhatsApp is `0851 2200 1051`.

Latest code checkpoint:
`37c32accc2bbb855167bc42ef710ee5a2adca170`

Latest documentation checkpoint:
`aca0376e113de7c45b56bbf19aa989c3266f6379`

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
| 2.3 | 24 Aug 08:12 WIB | PENDING | PENDING | Production API verification / canonical fetch-path migration / SEO hardening | 🟡 In progress |

### Project time

```text
Verified session working time through Chat 2.2:
58 hours 48 minutes 16 seconds

Chat 2.3:
PENDING — session still active

Actual elapsed duration since Chat 1.1:
NOT VERIFIABLE
```

Calendar span is not working duration.

---

# 🎯 CURRENT PARETO PRIORITIES

1. **Canonical backend consistency** — migrate remaining WordPress REST helper away from the legacy origin/Host fallback while preserving active API consumers.
2. **Legacy compatibility retirement** — confirm whether `/wp-json/wc/v3/[...slug]` has any external consumer before retiring it.
3. **SEO + backend consistency** — robots/indexing, sitemap/canonical behavior and the public WordPress renderer surface.

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
| `/api/products` raw JSON body | ✅ production browser-verified |
| `/api/products?metadata=1` raw JSON body | ✅ production browser-verified |
| Filters + pagination | ✅ functionally verified |
| `product-category/[...slug]` canonical API path | ✅ migrated |
| Legacy `/wp-json/wc/v3/[...slug]` compatibility route | ⚠️ internally orphaned; external dependency unknown |
| `src/lib/wordpress.ts` | ⚠️ actively used; legacy origin fallback remains |
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
| B-19 | Legacy WordPress REST routing | ⚠️ Migration in progress |

---

# 🧩 CARRIED TECHNICAL DEBT

- Confirm strict production `HTTP 200 + Content-Type: application/json` headers for API endpoints; browser body evidence is already verified.
- Migrate `src/lib/wordpress.ts` away from `jkt10.dewaweb.com` + conditional `Host` header.
- Confirm external consumers before retiring `src/app/wp-json/wc/v3/[...slug]/route.ts`.
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

1. Migrate the active WordPress REST helper to the canonical origin/routing strategy.
2. Confirm whether the legacy WooCommerce compatibility route has any external consumer before retiring it.
3. Run SEO/indexing/robots/sitemap/canonical verification.
4. Do not repeat the rejected Host-header workaround or Basic Auth approach.

After GitHub changes:

```bash
git pull origin main
```
