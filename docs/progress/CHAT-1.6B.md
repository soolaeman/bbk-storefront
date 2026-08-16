# BBKitchen Next.js Migration — Chat 1.6B

## Status

**CLARIFIED / CARRIED FORWARD**  
Implementation: **PENDING**

Chat 1.6B is a post-session clarification layer. It does **not** rewrite or alter the forensic history recorded in `CHAT-1.6.md`.

---

## Date / Session Timeline

```text
Session: 1.6B
Started: 16 August 2026 19:45 WIB
Ended: 16 August 2026 20:16 WIB
Duration: 31 minutes
Evidence source: Conversation timestamp supplied for the 1.6B clarification session
```

---

## Purpose

Capture two launch-critical requirements clarified after Chat 1.6:

1. Next.js must become the single public renderer while WordPress remains the backend/admin source of truth.
2. Authenticated WordPress admins must have controlled product actions from Next.js Product Card and Product Detail views.

---

## 1. Public Frontend Takeover / SEO

### Target architecture

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

Next.js is intended to become the **single public renderer** for the primary website experience.

WordPress remains operational as the backend/admin layer for WooCommerce, ACF, and BBK Core System.

### SEO principle

The migration must not create two competing public renderers for the same website identity.

The target is:

```text
https://www.bukanbarukitchen.com/
        |
        v
     NEXT.JS
        |
     one public homepage
```

The existing WordPress homepage copy does **not** need to be copied into the new Next.js homepage. The approved Next.js homepage is the intended public experience.

### URL preservation

Existing SEO URL/slug intent remains locked unless new technical evidence requires a change.

Before launch, audit the current WordPress public surface, including where applicable:

- homepage
- `/shop`
- product archives
- category archives
- attachment pages
- feeds
- sitemap(s)
- canonical URLs
- indexed legacy URLs

Do not assume a redirect, disable, or canonical strategy before the audit establishes what currently exists and is publicly/indexably accessible.

### Launch sequence

```text
1. Audit WordPress public URLs + SEO surface
        |
        v
2. Map existing URLs to Next.js public routes
        |
        v
3. Preserve canonical / slug intent
        |
        v
4. Define redirect / disable / canonical strategy from evidence
        |
        v
5. Verify WordPress is not exposing duplicate public renderers
        |
        v
6. Production SEO QA
        |
        v
7. Launch Next.js as public renderer
```

This is a launch architecture requirement, not an assertion that the takeover is already implemented.

---

## 2. Authenticated WordPress Admin Control Layer

### Target behavior

```text
WordPress Admin Login
        |
        v
Authenticated admin session
        |
        v
Next.js
        |
        +----------------------------+
        |                            |
        v                            v
Product Card                 Product Detail
        |                            |
        +------------+---------------+
                     |
                     v
              Admin Controls
              - READY <-> SOLD
              - Buka Telegram
```

### Required controls

For an authenticated WordPress admin:

1. Toggle the product status between `READY` and `SOLD`.
2. Open the product's Telegram link sourced from ACF.

Public visitors must not receive or be able to use admin controls.

### Source of truth

```text
READY / SOLD mutation
        |
        v
WordPress / ACF / BBK Core System
        |
        v
Next.js refresh / revalidation
```

The existing product status contract must not be reduced to only `READY` and `SOLD`. Existing statuses remain part of the contract; the clarified admin control only covers the `READY <-> SOLD` transition for now.

The Telegram action must use the product's ACF-backed Telegram value rather than a hardcoded frontend URL.

### Security requirement

Admin status mutations must be authorized server-side. A frontend flag such as `isAdminMode` is not sufficient authorization.

The implementation must establish a real authenticated WordPress-admin relationship before exposing or executing privileged actions.

### Current implementation note

The repository already contains early UI/state foundations for admin mode and READY/SOLD controls, but the current client-side toggle is not evidence of a completed authenticated WordPress control layer. Implementation remains pending.

---

## 3. Chat 1.7 Carry-Forward Pareto

```text
P0 — Public URL + SEO takeover audit
        |
        v
P1 — Authenticated WordPress admin control layer
        |
        v
P2 — WooCommerce / ACF / BBK Core System integration
        |
        v
Production QA
        |
        v
LAUNCH
```

These priorities extend the existing migration direction; they do not invalidate completed Chat 1.6 UI/UX work.

---

## 4. Documentation Integrity Rule

- `CHAT-1.6.md` remains unchanged as forensic history.
- `CHAT-1.6B.md` records the clarified post-session requirements.
- Root `README.md` remains the current-state/Pareto dashboard.
- `docs/progress/README.md` remains the migration synthesis/timeline index.
- No requirement in this clarification should be presented as implemented until code, runtime, security, and upstream behavior are verified.
