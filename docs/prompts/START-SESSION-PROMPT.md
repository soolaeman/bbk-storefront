# BBKitchen Next.js Migration — START SESSION PROMPT

You are continuing the BBKitchen Next.js Migration project.

Repository:
https://github.com/soolaeman/Front-End-BBKitchen

Branch:
`main`

---

# 1. SESSION BOOTSTRAP — MANDATORY

Before writing, modifying, or executing application code:

1. Determine the current Chat/session number from the latest project progress.
2. Search available repository/conversation evidence for the actual session start timestamp.
3. Do NOT assume the timestamp from the current clock unless no better session-start evidence exists.
4. Immediately create:

```text
docs/progress/CHAT-X.Y.md
```

5. The progress file MUST be created before coding begins.
6. Record the initial timeline using:

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

Example:

```text
CHAT-1.6.md
        ↓
CHAT-1.6B.md
        ↓
CHAT-1.7.md
```

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

If the user says:

```text
aman
nais
good
next
```

treat the approved result as locked unless there is evidence of regression.

Do not redesign approved UI without evidence.

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

Not endless visual polishing.

---

# 6. CURRENT BBKITCHEN ARCHITECTURE

The intended architecture is:

```text
                    PUBLIC DOMAIN
                bukanbarukitchen.com
                        |
                        v
                     NEXT.JS
                        |
             +----------+----------+
             |          |          |
            Home     Catalog    Product
             |
             | live product data
             v
      WordPress / WooCommerce
             |
             +-- ACF
             +-- BBK Core System
             +-- Admin
```

Next.js is the intended public experience layer.

WordPress remains the backend/admin source of truth.

Do NOT convert Next.js into a WordPress theme unless explicitly requested.

Do NOT replace WordPress/WooCommerce/ACF/Core System merely because Next.js is becoming the public renderer.

---

# 7. PUBLIC FRONTEND / SEO TAKEOVER

The final architecture must avoid two competing public renderers.

Target:

```text
https://www.bukanbarukitchen.com/
        ↓
     NEXT.JS
        ↓
 ONE public homepage
```

The approved Next.js homepage copy does not need to match the legacy WordPress homepage copy.

Before production launch, audit:

```text
homepage
/shop
product archives
category archives
attachment pages
feeds
sitemaps
canonical URLs
indexed legacy URLs
```

Do not invent redirect/disable/canonical decisions before the current WordPress public surface is audited.

Preserve existing SEO URL/slug intent unless evidence requires a change.

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

Required controls:

### A. Product status

Authenticated WordPress admins can:

```text
READY ↔ SOLD
```

The existing product status contract must remain intact:

```text
READY
SOLD
BOOKED
CONFIRMING
```

Only the READY ↔ SOLD transition is being added/clarified for the current admin workflow.

### B. Telegram

Authenticated WordPress admins can click:

```text
Buka Telegram
```

The destination MUST come from the product's ACF Telegram field.

Do not hardcode operational Telegram URLs in the frontend.

### C. Security

A frontend state such as:

```text
isAdminMode
```

is NOT authentication.

Privileged mutations must be authorized server-side.

Public users must not receive usable admin controls.

The WordPress authentication/authorization relationship must be verified before claiming this feature is implemented.

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

Next.js should consume and render the authoritative data.

For example:

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

Marketing/UI copy that is intentionally owned by the Next.js frontend may remain in Next.js.

---

# 10. AI-ASSISTED / VIBE-CODING TRANSPARENCY

This project uses an AI-assisted development workflow.

Do NOT falsely represent the project as manually coded line-by-line by the human developer.

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

For future portfolio documentation, describe the workflow honestly as:

```text
AI-assisted development
```

or:

```text
AI-assisted / vibe-coding workflow
```

Do not claim:

```text
"I manually wrote every line of code."
```

unless that is actually true.

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

For backend-connected features, verify both:

```text
Frontend result
+
WordPress/WooCommerce/ACF/Core System result
```

For SEO changes, verify:

```text
URL
canonical
metadata
redirect
indexability
sitemap
```

as applicable.

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

When the user asks to test the changes locally:

```bash
git pull origin main
npm run dev
```

Always provide the Git pull command after making changes on GitHub:

```bash
git pull origin main
```

Do not assume the user remembers the command.

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

---

# 16. CORE PRINCIPLE

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
