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
5. Immediately create:

```text
docs/progress/CHAT-X.Y.md
```

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

Especially:

```text
docs/progress/CHAT-X.Y.md
```

Do not rewrite previous session history merely to make it match the current architecture.

If a new requirement or clarification appears after a session has closed, create a clarification layer such as:

```text
CHAT-X.YB.md
```

instead of rewriting the original archive.

---

# 4. PARETO WORKFLOW

Every session must have one primary objective.

Use:

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
BLOCKER
→ fix now

IMPORTANT
→ next Pareto priority

NICE TO HAVE
→ defer
```

Do not expand scope merely because a potential improvement is noticed.

---

# 5. UI FREEZE PRINCIPLE

Once the user explicitly approves a UI/UX result:

```text
LOCKED
```

Do not revisit it unless:

* there is a regression;
* it conflicts with a newly clarified architecture requirement;
* it breaks responsive behavior;
* it creates a functional/security/SEO problem.

The goal is:

```text
Approved UI
    ↓
Freeze
    ↓
Backend integration
    ↓
Production hardening
    ↓
Launch
```

---

# 6. CURRENT BBKITCHEN ARCHITECTURE

Current intended architecture:

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
      WordPress / WooCommerce / ACF / Core System
                        |
                        v
                     Admin
```

Current facts:

- Next.js is the public experience/rendering layer.
- WordPress/WooCommerce/ACF/Core System remains the backend/admin source of truth.
- The existing WordPress installation remains at `/home/bukanbar/public_html` on DewaWeb.
- `jkt10.dewaweb.com` and `103.185.53.66` were verified during Chat 2.0 as default-server responses, not proven BBKitchen WordPress origins.
- `origin.bukanbarukitchen.com` is the preferred backend/origin strategy, but its DewaWeb configuration is **not yet verified**.
- Do not create a second WordPress installation merely to solve the origin problem.

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

Do not use `/product/[slug]` as the public product URL contract merely because an older renderer or historical document references it.

The final public architecture must avoid two competing public renderers:

```text
https://www.bukanbarukitchen.com/
        ↓
     NEXT.JS
        ↓
 ONE public renderer
```

Before production launch, audit:

```text
homepage
product archives
category archives
attachment pages
feeds
sitemaps
canonical URLs
indexed legacy URLs
```

Do not invent redirect/disable/canonical decisions before the current WordPress public surface is audited.

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

The existing status contract remains:

```text
READY
SOLD
BOOKED
CONFIRMING
```

`isAdminMode` is NOT authentication. Privileged mutations must be authorized server-side.

Current repository/project evidence does not prove the complete authenticated workflow is implemented; do not claim it is complete without authentication, authorization, mutation, and refresh evidence.

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

Examples:

```text
Product
Price
SKU
Category
Images
Stock/status
Inventory metadata
Telegram link
```

must not be duplicated as an independent source of truth in frontend code.

Marketing/UI copy intentionally owned by Next.js may remain in Next.js.

---

# 10. AI-ASSISTED / VIBE-CODING TRANSPARENCY

This project uses an AI-assisted development workflow.

Do not falsely represent the project as manually coded line-by-line by the human developer.

The development model is:

```text
Human
├── requirements
├── product decisions
├── architecture
├── UX direction
├── prioritization
├── validation
├── testing
├── debugging direction
└── final approval
        ↓
AI-assisted implementation
        ↓
Human verification
        ↓
Iteration
```

Use honest descriptions such as:

```text
AI-assisted development
AI-assisted / vibe-coding workflow
```

---

# 11. VERIFICATION RULE

Never declare a feature complete solely because code was written.

Verify the relevant layer:

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

For deployment changes, distinguish:

```text
GitHub source state
        ↓
Vercel deployment state
        ↓
Production HTTP response
```

A GitHub commit is not proof that Vercel deployed it. A successful Vercel build is not proof that production runtime or upstream APIs are healthy.

For the current origin blocker, verify the DewaWeb origin **before** changing Vercel upstream environment variables:

```text
origin.bukanbarukitchen.com/wp-json/
origin.bukanbarukitchen.com/wp-json/wc/v3/products
origin.bukanbarukitchen.com/wp-json/bbk/v1/*
```

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

Always provide the Git pull command after making changes on GitHub:

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

Update the current:

```text
docs/progress/CHAT-X.Y.md
```

throughout the session when meaningful decisions occur.

Record:

* Pareto objective
* implementation
* architecture decisions
* failed approaches
* root causes
* verification
* Git checkpoints
* remaining work
* next-step handoff

Do not wait until END SESSION to create the progress file.

---

# 15. END SESSION REQUIREMENT

At session close:

1. Verify final Git state.
2. Record the final checkpoint.
3. Search/verify the end timestamp.
4. Update:

```md
## Date / Session Timeline

Session: X.Y
Started: ...
Ended: ...
Duration: ...
Evidence source: ...
```

5. Calculate duration only from verified Start + End timestamps.
6. Update relevant progress index.
7. Preserve previous session history.
8. Record the top carried-forward Pareto priorities.
9. Provide the user with:

```bash
git pull origin main
```

if GitHub changes were made.

Never invent a duration.

### Timing discipline

Distinguish:

```text
SESSION WORKING TIME
vs
CALENDAR / ELAPSED TIME
```

Use:

```text
verified End timestamp
        -
verified Start timestamp
        =
actual session duration
```

If only a date is available:

```text
Duration: —
```

If only Start is available:

```text
Duration: PENDING
```

If evidence conflicts:

- do not silently choose one;
- preserve the conflict;
- flag it for verification.

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

Do not equate:

```text
code exists
build verified
runtime verified
upstream verified
UI verified
mobile verified
security verified
SEO verified
production verified
```

Unknown facts must be recorded as:

`Tidak ditemukan di repository/evidence yang tersedia.`

---

# 17. CURRENT SESSION / DOCUMENTATION RULES

Keep the documentation layers separate:

```text
START-SESSION-PROMPT.md
→ rules for bootstrapping a new session

docs/progress/CHAT-X.Y.md
→ forensic facts/history for one session

docs/progress/README.md
→ synthesis/timeline for all migration sessions

README.md
→ current project dashboard

NAVIGATOR.md
→ documentation map
```

Do not rewrite historical progress merely to match current architecture or SOP changes.

Clarification sessions may use:

```text
CHAT-X.YB.md
```

when a post-session clarification needs its own historical layer.

---

# 18. CORE PRINCIPLE

The objective is NOT:

```text
maximum amount of code
```

The objective is:

```text
maximum business impact
with minimum unnecessary change
```

Therefore:

```text
Pareto
+
Evidence
+
Verification
+
Small controlled changes
+
Honest AI-assisted workflow
=
BBKitchen production-ready migration
```
