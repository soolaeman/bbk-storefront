# BBKitchen Frontend — Next.js Migration

Branch aktif: `main`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md).

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 CURRENT CHECKPOINT — CHAT 2.3 CLOSED

```text
Date: 24 August 2026
Session: Chat 2.3
Start: 08:12 WIB
End: Tidak ditemukan di repository/evidence yang tersedia.
Duration: Tidak ditemukan di repository/evidence yang tersedia.
Status: CLOSED — production verification + canonical fetch-path migration + sitemap URL-architecture audit
```

Chat 2.3 verified live production JSON bodies for `/api/products` and `/api/products?metadata=1`, verified filter/pagination behavior, migrated `product-category/[...slug]` away from direct WooCommerce fetching to the canonical `/api/products` application path, migrated the active WordPress REST helper to the canonical origin/path, and audited the current sitemap generator architecture against legacy sitemap evidence.

Latest code checkpoint:
`37c32accc2bbb855167bc42ef710ee5a2adca170`

Latest Chat 2.3 documentation checkpoint:
`1dfdd8c19d47661a8db920279c9be034d700cafa`

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
| 2.3 | 24 Aug 08:12 WIB | Not independently verifiable | Not independently verifiable | Production API verification / canonical fetch-path migration / SEO + sitemap audit | ✅ Closed with carried verification debt |

### Project time

```text
Verified session working time through Chat 2.2:
58 hours 48 minutes 16 seconds

Chat 2.3:
NOT VERIFIABLE — exact End timestamp not independently available

Actual elapsed duration since Chat 1.1:
NOT VERIFIABLE
```

Calendar span is not working duration.

---

# 🎯 CURRENT PARETO PRIORITIES

1. **Canonical backend consistency** — audit remaining WooCommerce/WordPress fetch paths and preserve the proven native REST/origin strategy.
2. **Legacy compatibility retirement** — confirm whether `/wp-json/wc/v3/[...slug]` has any external consumer before retiring it.
3. **SEO + sitemap parity** — verify posts, categories, products, all discovered URL parents, robots, canonical URLs, and live GSC behavior.

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
| `src/lib/wordpress.ts` canonical origin/path | ✅ migrated |
| Legacy `/wp-json/wc/v3/[...slug]` compatibility route | ⚠️ internally orphaned; external dependency unknown |
| Sitemap split architecture | ✅ code committed |
| Sitemap production response | ⏳ live verification pending |
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
- preserve existing WordPress URL hierarchy during migration;
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
- Confirm external consumers before retiring `src/app/wp-json/wc/v3/[...slug]/route.ts`.
- Verify sitemap index and all relevant child sitemap XML responses in production.
- Verify sitemap URL hierarchy for posts, categories, products, and all discovered legacy parents.
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

## Chat 2.4 — Fetch-Path Audit & Sitemap Parity

1. Audit all remaining WooCommerce/WordPress fetch paths in the repository before changing more sitemap code.
2. Confirm whether the legacy WooCommerce compatibility route has any external consumer before retiring it.
3. Continue sitemap parity: posts, categories, products, dynamic routing, and all discovered URL parent patterns.
4. Production-smoke-test sitemap index and child XMLs.
5. Verify robots, canonical URLs, and Google Search Console behavior.

Do not repeat:

```text
- rejected Vercel Host-header workaround
- WooCommerce Basic Auth approach
- legacy URL slug standardization without explicit redirect/canonical approval
- unverified CI/build/GSC claims
```

After GitHub changes:

```bash
git pull origin main
```
