# BBKitchen Next.js Migration — Chat 2.4

## Date / Session Timeline

```text
Session: 2.4
Started: 24 August 2026 10:58:00 WIB
Ended: 24 August 2026 12:53:02 WIB
Duration: 1h 55m 02s
Evidence source: session timestamp evidence; latest end time verified at session close. Start time preserved from existing CHAT-2.4 bootstrap record.
```

## Scope

Universal sitemap / hierarchical URL investigation, MBG parent-route handling, Dapur MBG landing-page URL mapping, and production sitemap verification.

## Pareto

### Top 20% Changes

1. Preserved the existing Next.js Dapur MBG landing design as the display layer and exposed it at the legacy/public URL `/solusi-peralatan-dapur-mbg/`.
2. Added a hierarchical MBG catch-all route that resolves page hierarchy through WordPress parent IDs rather than flattening child slugs.
3. Removed `/dapur-mbg/` from the static sitemap and kept `/solusi-peralatan-dapur-mbg/` as the public sitemap entry.
4. Fixed `trailingSlash: true` so migrated URLs retain legacy trailing-slash behavior.
5. Corrected the pages sitemap generator to preserve full WordPress page pathnames rather than only leaf slugs.

### Top 20% Bottlenecks

1. The sitemap feed still contains flat/root-level legacy page URLs such as `/babakan-madang`, `/babelan`, `/cipayung`, and `/solusi-peralatan-dapur-mbg-sumatera-utara`; this demonstrates that a generic hierarchy resolver is still needed for sitemap generation and/or legacy page source normalization.
2. The repository currently has a hierarchy-aware MBG route, but sitemap output is not yet using the same resolver contract as routing.
3. A generic future-parent requirement exists: new WordPress parents such as `/jasa-pasang-exhaust-hood/jakarta/` must work automatically without parent-specific hardcoding.

### Top 20% Decisions

1. Do not hardcode MBG-specific sitemap rules. The final design must use one universal WordPress parent/child hierarchy resolver.
2. Do not flatten legacy WordPress URLs during migration.
3. `src/app/dapur-mbg/page.tsx` remains the Next.js landing-page display implementation; `/dapur-mbg/` is not the content source of a WordPress-rendered page.
4. `/solusi-peralatan-dapur-mbg/` is the public/canonical landing URL that renders the existing Next.js Dapur MBG design.
5. Sitemap and Next.js routing must consume the same hierarchy logic so a parent added later is handled automatically.

## Session Changes

### Routing / Landing Page

- `src/app/solusi-peralatan-dapur-mbg/page.tsx` was changed to render the reusable `DapurMbgLanding` Next.js component and use `/solusi-peralatan-dapur-mbg/` as canonical/public metadata URL.
- `src/components/DapurMbgLanding.tsx` was created to hold the existing Dapur MBG landing display so the design can be reused without duplicating the full JSX tree.
- `src/app/dapur-mbg/page.tsx` was restored as a redirect to `/solusi-peralatan-dapur-mbg/`; the original landing design was moved into the reusable display component rather than replaced by WordPress content.
- The prior MBG `[provinsi]` route was replaced with a hierarchical `[...slug]` route that resolves each segment by WordPress `parent` ID, allowing arbitrary depth.

### Sitemap

- `src/app/sitemap-static.xml/route.ts` was updated so `/solusi-peralatan-dapur-mbg/` is included and `/dapur-mbg/` is no longer included.
- `src/app/sitemap-pages.xml/route.ts` was updated earlier in the session to preserve full `page.link` pathname and trailing slashes.
- Live sitemap index was inspected and showed the expected split architecture: static, pages, posts, categories, and six product sitemap chunks.
- Live static sitemap was inspected and confirmed `/dapur-mbg/` is absent and `/solusi-peralatan-dapur-mbg/` is present.

## Verification

### Vercel

Production Vercel builds were user-verified as successful after the MBG route/landing changes.

### Production sitemap

Live `sitemap.xml` was user-provided and showed:

- `sitemap-static.xml`
- `sitemap-pages.xml`
- `sitemap-posts.xml`
- `sitemap-categories.xml`
- `sitemap-products/1.xml` through `6.xml`

Live `sitemap-static.xml` was user-provided and verified to contain:

- `/`
- `/katalog`
- `/jual-barang-bekas-restoran`
- `/jual-unit`
- `/solusi-peralatan-dapur-mbg/`

`/dapur-mbg/` was absent from the static sitemap.

### Important unresolved sitemap verification

A user-provided `sitemap-pages.xml` still contains flat/root-level legacy URLs, including `/babakan-madang`, `/babelan`, `/cipayung`, and `/solusi-peralatan-dapur-mbg-sumatera-utara`. This means the sitemap hierarchy is NOT YET at the desired universal-resolver state.

The user then identified the requirement that future parents such as `/jasa-pasang-exhaust-hood/jakarta/` must automatically work. The session concluded by drafting a Gemini prompt to obtain a robust universal hierarchy-resolver solution rather than continuing ad-hoc MBG-specific modifications.

## Failed / Dead-End Approaches

1. Treating `/solusi-peralatan-dapur-mbg/` as a WordPress-content renderer instead of reusing the existing Next.js Dapur MBG landing page.
2. Assuming a generic `sitemap-pages.xml` that preserves `page.link` automatically solves every legacy hierarchy requirement; live sitemap evidence disproved this assumption for the current production page data.
3. Focusing on an MBG-only sitemap fix instead of the broader universal parent/child hierarchy requirement.

## Locked Architecture / Do Not Regress

- Next.js owns the public rendering layer.
- WordPress/WooCommerce/ACF/Core System remains the backend/admin source of truth.
- `origin.bukanbarukitchen.com` remains the verified backend/API origin.
- Preserve existing WordPress URL hierarchy during migration.
- Do not hardcode special-case parent names such as MBG into the universal sitemap resolver.
- Do not flatten pages to root based on leaf slug.
- `/shop/[slug]` remains the public product URL family.
- Do not resurrect the rejected Vercel Host-header workaround.
- Do not use WooCommerce Basic Auth publicly.
- `isAdminMode` is not authentication.

## Git Checkpoint

Relevant code commits during this session:

```text
00dd5e9  fix: preserve trailing slash in pages sitemap
3057dabc feat: make dapur-mbg frontend for canonical MBG page
3f828714 fix: keep MBG CMS URL as canonical
 e388899 fix: use dapur-mbg content with legacy public link
 a950161 feat: expose Dapur MBG landing at legacy URL
 ee77d023 fix: correct Dapur MBG landing import path
 cf976ba refactor: extract Dapur MBG landing display / redirect work
 ebfcd639 fix: keep canonical MBG landing in static sitemap
 4b6a873 refactor: replace MBG province route with hierarchical catch-all
 e6b5bb6 feat: restore hierarchical MBG page routes
```

Exact commit chain reflects iterative corrections during the session; the final deployed state was user-verified on Vercel after these changes.

## Documentation / Verification Boundary

- `docs/progress/CHAT-2.4.md`: updated as session archive.
- `docs/progress/README.md`: current index still needs this session appended.
- Root `README.md`: current-state checkpoint still reflects Chat 2.3 and needs Chat 2.4 update.
- `docs/guides/*`: no new guide update was completed this session.
- `docs/prompts/*`: no SOP prompt change was required this session; canonical END-SESSION prompt remains in place.
- `end-session-prompt.md`: still points to canonical end-session prompt.

## Handoff

### Current State

- MBG landing parent is a Next.js display at `/solusi-peralatan-dapur-mbg/`.
- `/dapur-mbg/` redirects to the public/canonical MBG landing URL and is excluded from the static sitemap.
- MBG route hierarchy is implemented as a generic catch-all resolver based on WordPress parent IDs.
- Vercel build was user-verified as successful.
- Sitemap index and static sitemap were user-verified.
- `sitemap-pages.xml` remains the key unresolved issue because live output still includes flat/root-level legacy page URLs.

### Next Priority Order

1. Design and implement one universal WordPress hierarchy resolver shared by Next.js page routing, canonical generation, and `sitemap-pages.xml`.
2. Validate future parent creation without parent-specific hardcoding, using examples such as `/jasa-pasang-exhaust-hood/jakarta/`.
3. Re-run live sitemap verification after the universal resolver is implemented.
4. Then continue posts/categories/products parity and remaining SEO verification.

### Things NOT to Repeat

- Do not create an MBG-specific sitemap hack.
- Do not replace existing Next.js landing design with WordPress-rendered content.
- Do not flatten hierarchical URLs.
- Do not claim sitemap parity from code inspection when live XML still disagrees.
- Do not claim build/GSC/live verification without direct evidence.

## Next Conversation Title

`Chat 2.5 — Universal WordPress Hierarchy Resolver`
