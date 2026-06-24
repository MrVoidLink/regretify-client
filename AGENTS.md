<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Regretify Agent Instructions

## Project Context

Regretify is in early product-definition and UI-definition stage.

The current priority is to rebuild the product foundation cleanly:

- Keep product assumptions explicit in `PROJECT.md`.
- Prefer small, reversible steps over broad speculative architecture.
- Treat the first real UI as the product experience, not as a temporary demo.

## Working Rules

- Read the relevant local Next.js 16 docs in `node_modules/next/dist/docs/` before using APIs or conventions that may have changed.
- Prefer the App Router and current file conventions over legacy Pages Router patterns.
- Keep TypeScript strict and avoid `any` unless there is a concrete external boundary.
- Use Tailwind CSS v4 patterns already present in the project.
- Do not add major libraries without a clear product or engineering reason.
- Before large feature changes, update `PROJECT.md` if the intended user experience, scope, or direction changes.
- Verify meaningful implementation changes with `npm run lint` and, when relevant, `npm run build`.
- For the calculator mini-game on `/`, follow the documented 3D implementation path in `PROJECT.md` rather than adding new PNG-based production shortcuts.

## Product Alignment

- Keep route names, component names, and UI copy aligned with the product language in `PROJECT.md`.
- Challenge unclear product assumptions early instead of hard-coding them into the UI.
- Do not let decorative ideas outrun the actual user flow.
- Preserve room for future SEO, sharing, backend, and monetization work, but do not pre-build large systems for them.
- When implementing ad or sponsor surfaces, keep the UI provider-agnostic unless a project note explicitly requires a vendor-specific integration.
- The `/` route is the start of the main calculator experience, not a separate home feature.
- Market selection on `/` belongs to the `calculator` feature.
- The `/` route mini-game is an archery-style 3D interaction that leads into asset selection, not a decorative hero-only animation.
- When a product area is parked for MVP, disable its route and remove its active navigation links without deleting the feature code.

## Code Organization

- Keep route files in `src/app/` thin. They should compose pages, not contain full feature implementations.
- Put feature-specific UI, data, types, and logic under `src/features/<feature-name>/`.
- Put shared layout components under `src/components/layout/`.
- Put shared UI primitives under `src/components/ui/`.
- Put shared helpers under `src/lib/`, grouped by purpose when useful.
- Avoid catch-all files and oversized components.
- Prefer extracting calculation, validation, formatting, and API logic out of UI components.
- Keep API access out of JSX-heavy UI components.
- Do not create a `home` feature for the landing route unless the product direction changes. The landing route belongs to `calculator`.

## Repository Family Direction

- Treat `regretify-client`, `regretify-core`, and `regretify-admin` as separate repos with separate responsibilities.
- `regretify-core` should be implemented as a modular monolith first, not as early microservices.
- `regretify-admin` should stay lightweight and operationally focused instead of becoming a giant generic back office.
- When working in `regretify-core`, keep modules explicit for public API, internal/admin API, jobs, integrations, and persistence boundaries.
- When working in `regretify-admin`, keep route files thin and prefer feature folders that mirror the operational domains: auth, assets, market-pulse, ads, sponsors, settings.

## Structure Contract

Use this structure as the default project contract:

```txt
src/
  app/
    layout.tsx
    page.tsx
    assets/
      page.tsx
    market-movement/
      page.tsx
    market-pulse/
      page.tsx
    [asset]/
      page.tsx

  features/
    calculator/
      components/
      api/
      data/
      lib/
      types.ts

    assets/
      components/
      api/
      data/
      lib/
      types.ts

    market-movement/
      components/
      api/
      data/
      lib/
      types.ts

    market-pulse/
      components/
      api/
      data/
      lib/
      types.ts

  components/
    layout/
    ui/

  lib/
    format/
    seo/
    utils/
```

Apply this structure with restraint:

- Add folders only when they are actually needed.
- Keep each feature self-contained as long as possible.
- Move code to `components/` or top-level `lib/` only when it is truly shared across features.

## Ownership Rules

- `src/app/` owns routing, metadata composition, and route-level assembly only.
- `src/features/calculator/` owns the `/` route experience and calculator-related asset-entry experiences.
- Each feature folder owns its own UI, domain logic, data shaping, and API access layer.
- `src/components/layout/` is only for shared layout scaffolding such as shells, navigation, and footers.
- `src/components/ui/` is only for reusable presentational primitives.
- `src/lib/` is only for cross-feature helpers, not feature-specific business logic.

## Growth Rules

- Future API integration should enter through feature-level `api/` folders, not through scattered `fetch` calls.
- Mock data, static mappings, and content configuration should stay in feature-level `data/` folders.
- Pure calculation, formatting, validation, and transformation logic should stay in feature-level `lib/` folders unless shared by multiple features.
- Avoid broad folders like `common`, `services`, or `helpers` at the top level unless there is a very clear boundary and sustained reuse.
- Split oversized components early. Do not wait for route files or feature components to become large and mixed-responsibility.
- Keep the mini-game asset pipeline explicit: optimized `GLB` models, rigged character, static bow/arrow/target, and code-rendered bowstring unless the project documentation changes.

## URL And State Rules

- Make URL decisions deliberately before implementing major flows.
- Put only meaningful, shareable, or restorable state into the URL.
- Keep purely visual or transient interaction state out of the URL unless there is a strong product reason.
- Canonical page URLs and share-state URLs must be treated as different concerns when needed.
- Do not let uncontrolled query combinations become accidental indexable surfaces.

## Design System Baseline

- Establish and reuse a small set of design tokens for color, typography, spacing, radius, shadows, and breakpoints.
- Prefer consistent primitives over ad-hoc one-off styling.
- Shared visual primitives should be added to `src/components/ui/` only when they are truly reusable.
- Feature-specific visual patterns should stay inside their owning feature until real reuse is proven.
- Do not let each new screen invent its own spacing, sizing, or interaction language.

## Data Contract Rules

- Define the shape of important frontend data models before wiring large UI flows.
- Core contracts should stay explicit for at least: market, asset, calculator scenario, calculator result, movement item, and content/article item.
- Mock data should follow the same shapes expected from future real APIs whenever practical.
- Keep domain types close to the owning feature unless they are genuinely cross-feature contracts.
- Do not bury important data shapes inside random component props without a clear type definition.

## Page Composition Pattern

- Each important route should follow a predictable composition pattern:
- route file
- metadata
- page-level feature component
- crawlable page content
- SEO/structured data support when relevant
- Keep route files thin even when the page becomes visually rich or interactive.
- Do not mix route assembly, business logic, data shaping, and presentational detail in one file.

## Next.js 16 Guidance

- By default, pages and layouts should remain Server Components.
- Add `"use client"` only where interactivity, browser APIs, or client hooks are actually needed.
- Keep metadata, route conventions, and asset handling aligned with current App Router documentation.
- When adding dynamic routes, follow current `params` typing and route file conventions from the local docs.

## UI Direction

- Build responsive layouts from the beginning.
- Prefer one shared responsive implementation across desktop, tablet, and mobile.
- Split breakpoint-specific implementations only when a breakpoint truly requires a meaningfully different UX model.
- Keep the first version of each screen product-driven, not template-driven.
- Avoid generic dashboard patterns unless the product truly needs them.
- Use strong hierarchy, clear spacing, and readable copy before adding visual complexity.
- Favor a distinct visual identity, but make sure the workflow stays obvious on first glance.
- Every significant UI should be implemented in an SEO-friendly way, not as a visual layer that hides the page's meaning from search engines.
- Sponsored and advertising units must read as intentional product elements, but remain clearly distinct from organic content and calculator results.

## SEO Rules

- Treat SEO as a product requirement from the beginning, not as a later optimization pass.
- Every important route must have a clear search purpose, indexable value, and unique metadata.
- Interactive UI must not replace crawlable meaning. Important headings, explanatory copy, and page context should remain present in the server-rendered output.
- Do not build important pages as client-only experiences when the page meaning should be discoverable by search engines.
- Prefer canonical, clean URLs for indexable pages.
- Share/state/query URLs must not dilute the canonical SEO target of a page.
- Only canonical URLs should go into sitemaps.
- Use `metadata` or `generateMetadata` for route metadata and keep canonical handling explicit.
- Keep `metadataBase` configured at the root layout level once production URL decisions are finalized.
- Add structured data only when it truthfully matches the page content.
- Add `robots` controls deliberately; do not use `robots.txt` as a substitute for canonicalization.
- Build page content so that search intent, not only interface novelty, is satisfied.

## SEO Implementation Pattern

- Root layout should own global SEO defaults.
- Route files should compose route-level metadata, canonical policy, and visible page structure.
- Shared SEO helpers should live in `src/lib/seo/`.
- Feature-specific SEO content, structured data builders, and metadata helpers can live inside the owning feature when they are not cross-feature concerns.
- `app/sitemap.ts` and `app/robots.ts` should be treated as foundation-level files, not optional extras.
- Asset pages should be treated as high-value canonical SEO pages.
- Query-parameter scenario URLs should be treated as share URLs first, not primary index targets.
- If curated scenario pages are added later, they must have unique value and should not be generated for every arbitrary calculator combination.

## SEO Quality Bar

- Each indexable page should have a unique title, description, canonical target, and meaningful on-page heading structure.
- Each indexable page should have enough unique, useful content to stand on its own.
- Avoid thin pages, duplicate pages, and infinite indexable state combinations.
- Preserve performance and Core Web Vitals while implementing rich UI.
- When in doubt, choose the architecture that makes the page easier to crawl, understand, and canonically consolidate.

## Deployment Boundary Rules

- Assume Regretify MVP deployment should use private internal service communication wherever possible.
- Do not design the database as a public internet-facing dependency.
- Do not assume Redis, worker endpoints, or admin-to-core communication should be publicly reachable.
- Prefer deployment shapes where frontend, core API, admin panel, workers, Redis, and PostgreSQL communicate over an internal/private network.
- Only the intended public web surface and explicitly public API routes should sit behind public `80`/`443` entry points.
- Keep internal/admin/operational endpoints separated from public product endpoints.
- If a future implementation needs remote admin access, prefer an access-control layer such as VPN, tunnel, or strict allowlisting instead of broad public exposure.

## Documentation Discipline

- `PROJECT.md` is the source of truth for product decisions.
- `AGENTS.md` is the source of truth for implementation behavior inside the repo.
- If a new decision affects both product and engineering behavior, update both files in the same task.
- Use `src/lib/productFlags.ts` for temporary MVP route gating when a feature should stay in the repo but leave the active product surface.
