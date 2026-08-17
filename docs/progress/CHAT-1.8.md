# BBKitchen Next.js Migration — Chat 1.8

## Status

**CLOSED — BLOCKED BY DNS / UPSTREAM RESOLUTION**

This archive is the forensic record for Chat 1.8.

---

## Date / Session Timeline

```text
Session: 1.8
Started: 17 August 2026 06:30:00 WIB
Ended: 17 August 2026 16:45:48 WIB
Duration: 10h 15m 48s
Evidence source: Start from existing Chat 1.8 archive / current-session evidence; End from current user-session time evidence at close.
```

## Session Goal

Resume Chat 1.7 handoff, add/verify the Recent Posts homepage work, harden deployment/runtime integration, and investigate production/backend connectivity issues.

## Scope Actually Completed

- Verified `main` repository state and continued from the Chat 1.8 baseline.
- Recent Posts section was added to the homepage and positioned above FAQ in the documented workflow.
- WordPress post excerpt decoding was corrected so HTML entities no longer render as `&hellip;`-style text in the UI.
- Vercel Speed Insights was enabled.
- Investigated Vercel and local runtime failures for WooCommerce / WordPress API routes.
- Attempted a Dewaweb Warrior Node.js staging deployment as an alternative host; this was abandoned after runtime/platform incompatibilities.
- Isolated the current blocker to DNS resolution of `bukanbarukitchen.com` from both Vercel and local Node runtime.

---

## Top 20% Changes

1. **Recent Posts homepage integration** — section added and positioned above FAQ; runtime fallback behavior keeps the section visible during API failure.
2. **WordPress excerpt normalization** — decoded WordPress HTML entities in post excerpts.
3. **Vercel observability** — Speed Insights dependency/component enabled.
4. **Backend diagnostics** — `/api/products`, `/api/posts`, and metadata runtime failures traced to DNS resolution rather than frontend rendering.
5. **Hosting fallback investigation** — Dewaweb Warrior staging path tested and rejected due to Node/GLIBC/Turbopack/package-environment incompatibilities.

---

## File / Component / Route History

### Changed / created during this session

```text
src/components/RecentPostsSection.tsx
src/app/api/posts/route.ts
src/app/api/products/route.ts
src/app/layout.tsx
package.json
```

### Relevant route/API surface

```text
/
/api/posts
/api/products
/api/wordpress
/catalog
/jual-barang-bekas-restoran/[...slug]
/product/[slug]
```

The current `/api/products` route uses `WC_CONSUMER_KEY` + `WC_CONSUMER_SECRET`, then fetches `https://bukanbarukitchen.com/wp-json/wc/v3`. 

---

## Status Classification

### DONE / VERIFIED

- Recent Posts homepage section exists in `main` and was visually verified locally.
- Recent Posts placement above FAQ was verified.
- `npm run build` passed locally on the normal project environment during the session before the DNS issue surfaced.
- Vercel Deployment Protection was inspected; branch/deployment URL authentication explained the external `curl` 302.
- WordPress public REST API endpoint was reachable from the local machine.

### DONE / CODE ONLY / PARTIAL

- Vercel Speed Insights: implemented; deployment wiring exists.
- WordPress/WooCommerce upstream integration: code exists, but upstream runtime verification is blocked.

### BLOCKED

- Vercel `/api/products` and `/api/posts` upstream requests.
- Local `/api/products` and `/api/posts` upstream requests.
- WooCommerce metadata loading.
- Recent Posts runtime loading.
- Final production runtime verification.

### FAILED / ABORTED

- Dewaweb Warrior Node.js staging deployment.

---

## Root Cause / Bottleneck Register

### B-6 — WooCommerce / WordPress upstream connectivity

```text
Symptom:
/api/products, /api/posts, Yoast metadata all return 502.

Observed root cause:
Node fetch fails before HTTP request completion with:
getaddrinfo ENOTFOUND bukanbarukitchen.com

Evidence:
- Vercel Function Logs show ENOTFOUND for hostname bukanbarukitchen.com.
- Local Next.js runtime shows the identical ENOTFOUND error.
- Local curl to WordPress previously reached the server and returned HTTP 200 for /wp-json/wp/v2/posts and HTTP 401 for /wp-json/wc/v3/products without credentials, proving the endpoints themselves respond when DNS/network resolution succeeds.
- Public DNS A lookups previously returned 103.185.53.66 from 1.1.1.1, 8.8.8.8, and 9.9.9.9.
- Direct queries to ns1.ezydomain.com and ns2.ezydomain.com did not return a normal A/SOA answer for the domain and SOA queries timed out.

Status:
BLOCKED — DNS delegation/authoritative-zone inconsistency suspected; CS/DNS provider verification required.
```

### New hosting dead end

```text
Dewaweb Warrior staging:
- Node 18.20.8 was initially active; incompatible with Next 16.3.1 requirements.
- Node 20.20.2 became available after recreating the Node application.
- npm install succeeded on Node 20.
- next build failed because the server GLIBC lacks GLIBC_2.29 and Turbopack native bindings were unavailable.
- Webpack workaround then exposed Dewaweb npm/devDependency environment issues.
- Staging was deleted/abandoned.
```

---

## Failed Approaches / Dead Ends

1. Treating the Vercel `302` as the cause of the `/api/products` 502. It was Deployment Protection on the branch deployment URL; authenticated browser requests reached the API and exposed the real upstream error.
2. Repeatedly changing WooCommerce credentials before proving the upstream error. The route catches `fetch()` failures; the observed failure is DNS `ENOTFOUND`, not an HTTP 401/403 response.
3. Attempting to force the Dewaweb Warrior environment to host the current Next 16.3.1 stack. Node/GLIBC/Turbopack/npm environment constraints made it unsuitable.
4. Assuming the problem was frontend/Next.js because the browser showed console errors. The server route was executing; the upstream hostname could not resolve.

---

## Locked Decisions

- `main` remains the canonical active GitHub workflow branch.
- Next.js remains the public experience layer.
- WordPress/WooCommerce/ACF/BBK Core System remains backend/admin source of truth.
- Do not modify application source to work around the current DNS problem until DNS authority is corrected and the upstream path is re-tested.
- Do not continue the Dewaweb Warrior staging hosting experiment unless the hosting platform later provides a compatible runtime/platform baseline.
- Do not interpret a successful `next build` as proof of upstream runtime health.

---

## Verification

```text
Repository / GitHub state:     ✅ verified
Recent Posts UI:               ✅ locally verified
Recent Posts position:         ✅ above FAQ
Vercel deployment build:       ✅ build completed
Vercel API invocation:         ✅ route reached after SSO
Vercel upstream fetch:         ❌ ENOTFOUND
Local Next.js startup:         ✅
Local upstream fetch:          ❌ ENOTFOUND
WordPress public REST API:     ✅ reachable when DNS/network resolution succeeds
WooCommerce authenticated API: ⏳ not revalidated after DNS instability
Desktop visual baseline:       ✅ previously accepted
Mobile visual baseline:        ✅ previously accepted
Production runtime:            ❌ blocked by DNS
```

---

## Pareto Bottlenecks

1. **DNS authority / delegation instability** for `bukanbarukitchen.com`.
2. **Upstream production verification blocked** because Vercel and local Node cannot resolve the WordPress hostname.
3. **Dewaweb Warrior incompatibility** with the current Next 16.3.1 / GLIBC / npm environment.

## Pareto Decisions

1. Keep `main` + Vercel as the primary application workflow.
2. Fix/verify DNS before changing application code.
3. Do not repeat the Warrior hosting experiment without a compatible runtime baseline.

---

## Handoff

### Current state

```text
Frontend / UI work:
GOOD / largely converged.

Backend / upstream runtime:
BLOCKED by DNS resolution.

Primary production stack:
GitHub main → Vercel → WordPress/WooCommerce.
```

### Next priority order

1. Have Dewaweb/Ezydomain verify authoritative DNS zone and delegation for `bukanbarukitchen.com`.
2. After DNS is healthy, re-test locally:
   - `https://bukanbarukitchen.com/wp-json/wp/v2/posts`
   - `https://bukanbarukitchen.com/wp-json/wc/v3/products`
   - local `/api/posts`
   - local `/api/products?metadata=1`
3. Re-test Vercel `/api/posts` and `/api/products` and verify upstream response.
4. Only then resume production hardening or alternative hosting evaluation.

### Things NOT to repeat

- Do not rewrite Next.js APIs to hide a DNS problem.
- Do not regenerate WooCommerce credentials without evidence of an auth failure.
- Do not use the protected branch deployment URL as the sole unauthenticated API test.
- Do not spend further time on Warrior staging until runtime compatibility is established.

### Next conversation title

```text
1.9 BBKitchen Next.js Migration — DNS Recovery & Production API Verification
```

---

## Git Checkpoint

Latest code commits observed during the session:

```text
faa03e509e8b2af72c769ac8bef21fcb4510766d
fix: use apex WooCommerce API fallback

Created: 17 August 2026 07:50:34 WIB (GitHub evidence)

A318DDDEC... / a318dddec8f4be32957e51cbed74a656187db963
fix: use apex WordPress API fallback

Created: 17 August 2026 07:50:18 WIB (GitHub evidence)
```

Current application checkpoint is the latest code commit on `main` observed before documentation close.

---

## Documentation Note

The repository currently shows `end-session-prompt.md` absent on `main`, despite the canonical end-session prompt requiring that shortcut to remain available. This is documentation debt to restore in the next session if the shortcut is required by the workflow.
