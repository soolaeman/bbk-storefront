[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen Guides

Guides are **reference documents for humans**. They explain how the project works, where files live, and what is safe to change.

They are not execution prompts.

## Guides

- [Copy Editing Guide](COPY-EDITING-GUIDE.md) — technical map for finding and changing copy safely, including service, MBG, Jual Unit, Produksi Baru, catalog, product detail, Footer, and gallery copy ownership.
- [Vibe Coding Copy Guide](VIBE-CODING-COPY-GUIDE.md) — simplified guide for non-developers / vibe coding, including current page/copy locations, routing/contract warnings, and actor-safe Jual Unit wording.

## Current architecture note

- Public website/rendering is owned by Next.js on `bukanbarukitchen.com`.
- WordPress/WooCommerce/ACF remains the backend/admin source of truth.
- `origin.bukanbarukitchen.com` is the verified backend/API origin mapped to the existing `/home/bukanbar/public_html` WordPress installation.
- WordPress REST is reachable through the origin, including the `wc/v3` namespace. The production catalog/detail flow uses the native `/wp-json/wc/v3/...` request path with server-side WooCommerce credentials and a browser-like User-Agent; final raw JSON/metadata verification remains carried forward.
- Public product URLs are preserved under `/shop/[slug]`; the implementation currently uses the existing `src/app/product/[slug]/page.tsx` renderer behind the public wrapper.
- Existing WordPress/WooCommerce API paths remain backend contracts; changing authentication or API origin is an infrastructure concern, not a copy-editing task.

## Guides vs Prompts

```text
GUIDE
→ explains
→ maps
→ teaches
→ reference material
→ human reads it

PROMPT
→ instructs an AI session
→ defines a workflow
→ produces an action/result
→ execution protocol
```

For AI session workflows, use [`../prompts/`](../prompts/).
