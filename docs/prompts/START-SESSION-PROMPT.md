# BBKitchen Next.js Migration — START SESSION PROMPT

You are continuing the BBKitchen Next.js Migration project.

Repository:
https://github.com/soolaeman/Front-End-BBKitchen

Branch:
`main`

---

# 1. SESSION BOOTSTRAP — MANDATORY

Before writing, modifying, or executing application code:

1. Determine the next Chat/session number from the latest `docs/progress/README.md`.
2. Search repository/conversation evidence for the actual session-start timestamp.
3. Do **not** treat the current clock as historical session-start evidence when stronger evidence exists.
4. Do **not** invent timestamps.
5. Immediately create `docs/progress/CHAT-X.Y.md`.
6. The progress file MUST exist before coding begins.
7. Record the initial timeline using:

```md
## Date / Session Timeline

Session: X.Y
Started: DD Month YYYY HH:MM:SS WIB
Ended: PENDING
Duration: PENDING
Evidence source: <exact evidence/source>
```

If the start timestamp cannot be verified:

```text
Started: Tidak ditemukan di repository/evidence yang tersedia.
```

Do not invent a timestamp.

---

# 2. READ PROJECT CONTEXT FIRST

Before implementation, inspect the current repository state and relevant documentation.

At minimum:

```text
README.md
NAVIGATOR.md
docs/progress/README.md
latest docs/progress/CHAT-X.Y.md
relevant guides
relevant prompts
```

Also inspect the current GitHub branch/state before modifying code.

Never assume that a previous implementation is still current.

---

# 3. PRESERVE FORENSIC HISTORY

Historical progress files are immutable unless explicitly correcting a verified factual error.

Especially `docs/progress/CHAT-X.Y.md` and `docs/progress/README.md`.

Do not rewrite previous session history merely to make it match the current architecture.

If a new requirement or clarification appears after a session has closed, create a clarification layer such as `CHAT-X.YB.md` instead of rewriting the original archive.

---

# 4. PARETO WORKFLOW

Every session must have one primary objective.

```text
1 BIG GOAL
    ↓
3 PRIORITIES MAX
    ↓
1 STEP
    ↓
VERIFY
    ↓
COMMIT
    ↓
NEXT STEP
```

Classify discoveries:

```text
BLOCKER → fix now
IMPORTANT → next Pareto priority
NICE TO HAVE → defer
```

Do not expand scope merely because a potential improvement is noticed.

---

# 5. UI FREEZE PRINCIPLE

Once the user explicitly approves a UI/UX result, treat it as `LOCKED`.

Do not revisit it unless:

- there is a regression;
- it conflicts with a newly clarified architecture requirement;
- it breaks responsive behavior;
- it creates a functional/security/SEO problem.

---

# 6. CURRENT BBKITCHEN ARCHITECTURE

Current verified architecture:

```text
                    PUBLIC DOMAIN
                bukanbarukitchen.com
                        |
                        v
                     NEXT.JS
                        |
                server-side API fetch
                        |
                        v
             origin.bukanbarukitchen.com
                        |
                        v
             /home/bukanbar/public_html
                        |
                        v
      WordPress / WooCommerce / ACF / Core System
                        |
                        v
                     Admin
```

Current facts:

- Next.js is the public experience/rendering layer.
- WordPress/WooCommerce/ACF/Core System remains the backend/admin source of truth.
- The existing BBKitchen WordPress installation is at `/home/bukanbar/public_html` on DewaWeb.
- `origin.bukanbarukitchen.com` is the verified backend/origin hostname and is mapped to the existing BBKitchen web root.
- Direct `/wp-json/` through the origin is verified and exposes the WooCommerce `wc/v3` and BBK `bbk/v1` namespaces.
- The production catalog/detail flow uses the native `/wp-json/wc/v3/...` request path with server-side WooCommerce credentials and a browser-like User-Agent.
- Production `/api/products` and `/api/products?metadata=1` response bodies were verified in Chat 2.3; strict raw HTTP `200` and `Content-Type: application/json` header evidence was not captured in the browser screenshots, so that header-level criterion remains a verification boundary.
- Do not create a second WordPress installation merely to solve origin/API problems.

---

# 7. PUBLIC URL / SEO TAKEOVER

The public URL contract is sitemap-driven.

Preserve these patterns unless new evidence requires a change:

```text
/katalog
/shop/[slug]
/product-category/[...slug]
WordPress page/post paths via catch-all resolution
```

The existing product-detail renderer is `src/app/product/[slug]/page.tsx`, with public `/shop/[slug]` wrapper behavior. Preserve `/shop/[slug]` as the public product URL family.

The final public architecture must avoid two competing public renderers.

During SEO/sitemap migration:

- preserve the full existing WordPress URL hierarchy unless a separate redirect/canonical redesign is explicitly approved;
- do not reduce a legacy regional or programmatic URL to a leaf slug when generating a Next.js sitemap;
- treat the full WordPress `link` pathname as the canonical path source where applicable;
- distinguish legacy WordPress sitemap findings from current Next.js generator behavior;
- a legacy `.webp` `<loc>` finding is not proof that the current Next.js generator emits `.webp` entries.

Before production launch, audit homepage, product archives, category archives, attachment pages, feeds, sitemaps, canonical URLs, and indexed legacy URLs.

A Next.js route existing is not proof that the corresponding WordPress public URL is redirected, disabled, canonicalized, or de-indexed.

---

# 8. AUTHENTICATED WORDPRESS ADMIN CONTROL

The target admin workflow is:

```text
WordPress Admin Login
        ↓
Authenticated admin session
        ↓
Next.js
        ↓
Product Card + Product Detail
        ↓
Admin Controls
```

Required controls remain:

```text
READY ↔ SOLD
Buka Telegram → ACF-backed product Telegram link
```

`isAdminMode` is NOT authentication. Privileged mutations must be authorized server-side.

Current evidence does not prove the complete authenticated workflow is implemented; do not claim it is complete without authentication, authorization, mutation, and refresh evidence.

---

# 9. SOURCE OF TRUTH

For dynamic product/business data:

```text
WordPress
WooCommerce
ACF
BBK Core System
        ↓
Next.js
```

Product, price, SKU, category, images, stock/status, inventory metadata, and Telegram link must not be duplicated as an independent source of truth in frontend code.

Marketing/UI copy intentionally owned by Next.js may remain in Next.js.

---

# 10. AI-ASSISTED / VIBE-CODING TRANSPARENCY

This project uses an AI-assisted development workflow.

Do not falsely represent the project as manually coded line-by-line by the human developer.

```text
Human requirements / product decisions / architecture / UX / prioritization / validation
        ↓
AI-assisted implementation
        ↓
Human verification
        ↓
Iteration
```

Use honest descriptions such as `AI-assisted development` or `AI-assisted / vibe-coding workflow`.

---

# 11. VERIFICATION RULE

Never declare a feature complete solely because code was written.

```text
Code
 ↓
Build
 ↓
Runtime
 ↓
Visual / functional behavior
 ↓
Upstream data behavior
 ↓
Security / permission behavior
```

For backend-connected features, verify both frontend behavior and WordPress/WooCommerce/ACF/Core System behavior.

For SEO changes, verify URL, canonical, metadata, redirect, indexability, and sitemap as applicable.

For deployment changes, distinguish GitHub source state, Vercel deployment state, and production HTTP response.

For WooCommerce production verification, the current controlled baseline is:

```text
1. Native origin REST path
   origin.bukanbarukitchen.com/wp-json/wc/v3/...

2. Server-side WooCommerce credentials

3. Browser-like User-Agent + Accept: application/json

4. Verify response body/content-type, not only HTTP 200.
```

Do not resurrect the rejected Vercel Host-header workaround or assume Basic Auth works for this origin.

Also verify BBK custom endpoints under `/wp-json/bbk/v1/*` as applicable.

---

# 12. GITHUB WORKFLOW

Before implementation:

```bash
git branch --show-current
git status
git log -5 --oneline
```

After implementation:

```bash
git diff
git status
npm run build
```

When the user asks to test changes locally:

```bash
git pull origin main
npm run dev
```

After making changes on GitHub, always provide:

```bash
git pull origin main
```

---

# 13. BUILD / WARNING DISCIPLINE

A successful build is necessary but not automatically sufficient.

Known warning:

```text
Next.js ignored package-lock.json in C:\Users\Lenovo
because it is outside the current Git repository.
```

Do not treat this warning as an application build failure unless evidence shows it affects the project.

Do not introduce unrelated package-lock or root-directory changes merely to silence a warning.

---

# 14. DOCUMENTATION DURING THE SESSION

Update the current `docs/progress/CHAT-X.Y.md` throughout the session when meaningful decisions occur.

Record:

- Pareto objective
- implementation
- architecture decisions
- failed approaches
- root causes
- verification
- Git checkpoints
- remaining work
- next-step handoff

Do not wait until END SESSION to create the progress file.

---

# 15. END SESSION REQUIREMENT

At session close:

1. Verify final Git state.
2. Record the final checkpoint.
3. Search/verify the end timestamp.
4. Update the timeline with Start, End, Duration, and evidence source.
5. Calculate duration only from verified Start + End timestamps.
6. Update relevant progress index.
7. Preserve previous session history.
8. Record the top carried-forward Pareto priorities.
9. Provide `git pull origin main` if GitHub changes were made.

Never invent a duration.

Distinguish:

```text
SESSION WORKING TIME
vs
CALENDAR / ELAPSED TIME
```

If only a date is available, `Duration: —`.
If only Start is available, `Duration: PENDING`.
If evidence conflicts, preserve the conflict and flag it for verification.

Historical timestamps belong to the progress archive; this prompt defines future-session behavior.

---

# 16. STATUS DISCIPLINE

Use:

```text
✅ verified
⚠️ partial / needs QA
⏳ pending / deferred
🔒 locked
❌ failed / rejected
```

Do not equate code exists, build verified, runtime verified, upstream verified, UI verified, mobile verified, security verified, SEO verified, or production verified.

Unknown facts must be recorded as:

`Tidak ditemukan di repository/evidence yang tersedia.`

---

# 17. CURRENT SESSION / DOCUMENTATION RULES

Keep documentation layers separate:

```text
START-SESSION-PROMPT.md → rules for bootstrapping a new session

docs/progress/CHAT-X.Y.md → forensic facts/history for one session

docs/progress/README.md → synthesis/timeline for all migration sessions

README.md → current project dashboard

NAVIGATOR.md → documentation map
```

Do not rewrite historical progress merely to match current architecture or SOP changes.

Clarification sessions may use `CHAT-X.YB.md` when a post-session clarification needs its own historical layer.

---

# 18. CORE PRINCIPLE

The objective is not maximum code. It is:

```text
maximum business impact
with minimum unnecessary change
```

Therefore:

```text
Pareto + Evidence + Verification + Small controlled changes + Honest AI-assisted workflow
= BBKitchen production-ready migration
```
