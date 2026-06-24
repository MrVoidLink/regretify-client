# Regretify Project Notes

## Status

Regretify has been reset to a clean Next.js 16 starter and is now rebuilding from zero.

Current stage:

- Product direction is being redefined.
- The main UI is being redesigned from scratch.
- The `/` route now has an active 3D archery calculator prototype that is being tuned in place.
- No previous feature implementation should be treated as active product truth outside the currently documented prototype.

## Product Definition

Regretify is a web product built around financial regret and missed opportunity.

Core idea:

```txt
What if I had invested $X in asset Y on date A?
What would it be worth on date B or today?
How painful was the miss?
```

The experience should turn a historical investment scenario into a sharp, emotionally legible result.

Regretify is not financial advice. It is a historical comparison, educational, and entertainment product.

## Primary User Flow

The main Regretify flow is:

1. The user chooses a market.
2. The user chooses an asset from that market.
3. The user enters an amount and selects a historical scenario.
4. Regretify calculates what profit or loss would have happened.
5. The result should emphasize hindsight, missed upside, and emotional impact.

The core product is not only about showing numbers. It should show the feeling of:

```txt
You could have bought this earlier.
You missed this move.
Here is how much that miss cost you.
```

## Product Principles

- Regret-first: the emotional hook is hindsight and missed upside.
- Clarity-first: numbers must stay understandable even when the tone is playful.
- Social-aware: results should feel easy to screenshot, share, and talk about.
- SEO-aware: important pages should remain crawlable and indexable.
- Modern, not noisy: the product can feel bold without looking low-trust.

## Infrastructure Direction

For the MVP and early growth phase, Regretify should prefer a simple single-server deployment,
but the network boundaries inside that server should still be treated seriously.

Infrastructure principles:

- The public web surface should be the only part directly exposed to the internet.
- The database must stay on a private internal network and must not be publicly reachable.
- The core API, admin panel, workers, Redis, and database should communicate over an internal/private network.
- Public traffic should enter through a reverse proxy and only through the intended public ports.
- Internal services should not bind broadly to public interfaces unless there is a deliberate reason.

### Public vs Private Service Exposure

The intended MVP exposure model is:

- Public:
  - the main client-facing web application
  - only the specific API routes that must serve the public product
  - reverse proxy entry on standard public ports such as `80` and `443`
- Private/internal only:
  - PostgreSQL
  - Redis
  - background workers and sync jobs
  - admin-to-core internal service communication
  - any non-public operational endpoints

### Admin And Core Access Direction

- The admin panel should not be treated as an open public surface by default.
- If remote admin access is needed, it should still be protected through a controlled access layer such as VPN, tunnel, or strict allowlisting.
- The core API should separate public product endpoints from internal/admin/operational endpoints.
- Internal/admin endpoints should not be exposed on the open internet just because they exist on the same server.

### Data Sync Direction

- Price, chart, and market data should be fetched by backend jobs or workers and handled internally.
- The public product should read from Regretify-managed data storage or cache, not call third-party market providers directly from the browser.
- This architecture should reduce rate-limit risk, improve performance, and keep external provider dependencies out of the client surface.

## SEO Direction

SEO is a core growth requirement for Regretify.

This means:

- Important pages must be designed and built to be understandable by search engines from the start.
- UI creativity must not break crawlability, canonical clarity, or content clarity.
- Search intent and user intent should be aligned wherever possible.

### SEO Principles

- Important pages should have clear, unique search intent.
- Indexable pages should use clean canonical URLs.
- Interactive product surfaces should still expose meaningful crawlable content.
- Query-state or share-state URLs should not become the main SEO target by accident.
- Strong information architecture matters as much as metadata.
- Performance and Core Web Vitals are part of SEO quality, not separate concerns.

### SEO Priority Surfaces

The main SEO surfaces for Regretify should be:

- the main calculator entry experience on `/`
- canonical asset pages such as `/<asset>`
- evergreen educational/content pages in `Market Pulse`
- selected future content/discovery pages only after they are re-enabled for the public product surface

### Canonical Strategy

- The main SEO value should live on clean canonical pages.
- Shareable calculator URLs with query parameters are useful for users, but should not become the main canonical destination.
- Asset pages should be treated as long-term canonical targets.
- If curated scenario landing pages are added later, they should exist only for intentionally selected high-value scenarios.

### Asset Calculator SEO Strategy

- The main SEO target for calculator intent should be canonical asset pages such as `/bitcoin`, `/ethereum`, and other supported asset routes.
- These pages should be directly crawlable and indexable in Google and should not require the user to move through market selection or asset selection first.
- Each canonical asset page should preload the calculator for that asset and act as both:
  - the main calculator entry for that asset
  - the main SEO landing page for that asset
- The upper section of the page should let the user run the calculation immediately.
- The lower section of the page should provide strong asset-specific content around missed opportunities, historical moves, regret scenarios, and related search intent.
- Query parameters or share-state combinations should not become the primary canonical SEO surface for calculator pages.
- If scenario-specific landing pages are added later, they should be intentionally curated pages, not automatically indexable combinations of all calculator inputs.

### Content Strategy for SEO

- Pages should answer real questions users search for, not just display UI state.
- Asset pages should have content specific to that asset, not duplicated generic filler.
- `Market Pulse` content should favor evergreen, curiosity-driven, accessible topics over fast-expiring news churn.
- `Market Movement` should add interpretation and regret-context, not just raw data tables.

### Technical SEO Requirements

- Every important route should have explicit metadata.
- Sitemap and robots support should be part of the foundation.
- Structured data should be added where it truthfully improves search understanding.
- Pages should preserve readable headings, explanatory copy, and semantic structure.
- The site should avoid thin content, duplicate content, and uncontrolled indexable URL combinations.

## Initial Scope

The rebuilt MVP should stay narrow.

Include:

- A homepage that immediately presents the product experience.
- A first calculator flow for historical what-if scenarios.
- A clear result state with shareable potential.
- A shareable poster or poster-like result output for social platforms.
- Supporting sections only when they reinforce the product story.

Do not assume for the MVP:

- Authentication
- Persistence
- Admin panel
- Analytics stack
- Complex personalization
- Large content systems
- Heavy market coverage from day one

## Core Experience Direction

The first meaningful screen should answer:

```txt
What asset did I miss, when did I miss it, and how bad was it?
```

The calculator experience should likely include:

- Market selection
- A lightweight 3D mini-game on `/` for aim, release, and asset reveal
- Asset selection
- Amount input
- Historical date selection
- Result view
- A final shareable poster result

The exact UI pattern is still open and should be guided by the new design references.

## Product Areas

### Calculator

This is the main product experience and highest priority area.

The calculator should let users explore:

```txt
If I had invested this amount in this asset at that time,
how much would I have now, and how much regret does that create?
```

The product emphasis is:

- missed opportunity
- hindsight
- emotional readability
- shareable output

The primary long-term SEO form of the calculator should live on canonical asset routes such as `/<asset>`, where the asset is already selected and the page can answer search intent directly.

The `/` route calculator entry should use a lightweight 3D archery-style mini-game as the first interaction:

- the user chooses a market
- the user aims and releases a shot
- the shot reveals the asset-selection step
- the mini-game should feel premium and playful, but remain small in scope

### Market Movement

`Market Movement` is a secondary product area outside the main calculator flow.

Its purpose is to show major asset moves across time windows such as:

- 24 hours
- 7 days
- monthly
- yearly

This section should not feel like a generic market table. It should support the regret angle by surfacing moves that make users think:

```txt
I missed that.
That move was bigger than I realized.
```

For the simpler MVP launch, the dedicated `/market-movement` route is temporarily disabled.
The feature code remains in the repo, but it is not part of the public MVP surface.

### Market Pulse

`Market Pulse` is a lighter content area for interesting market and asset-related reading.

This section is not intended to be a heavy financial newsroom or highly technical analysis surface.

Content direction:

- light explainers
- interesting stories
- accessible market knowledge
- curiosity-driven content

Examples:

- Who was Satoshi?
- Interesting stories around major assets or market moments
- Useful but non-technical context pieces

The name `Market Pulse` is currently acceptable but not considered final.

The browse-all continuation page for this area currently uses the working name `Pulse Feed`.
The main public `Market Pulse` route now uses the feed-style UI directly on `/market-pulse`.
The legacy `/market-pulse/feed` route can remain available as a secondary path, but it should not be treated as the main SEO target.
Individual story detail pages in this area currently use the working name `Pulse Story`
and live under the route pattern `/market-pulse/[slug]`.

### Assets

`Assets` is the browseable area for exploring supported assets.

Its role is to help users discover assets and enter the main calculator flow through a chosen asset.

For the simpler MVP launch, the dedicated `/assets` route is temporarily disabled.
The underlying feature code remains in the repo, but the active MVP should rely on:

- the main calculator flow on `/`
- canonical asset calculator routes such as `/<asset>`
- `Market Pulse` content routes

## Shareability Direction

The final result of the main flow should not stop at a plain calculation summary.

Regretify should produce a shareable result artifact, likely a poster-style output suitable for social platforms.

The result should feel:

- visual
- emotionally sharp
- easy to screenshot or share
- still numerically clear

## Monetization Direction

Regretify is expected to include advertising placements as part of the product business model.

Current direction:

- The likely first ad network for launch is `AADS`.
- `Google Ads` may be considered later, but it is not the assumed first integration.
- Ad placement architecture should remain provider-agnostic where practical so the product is not tightly coupled to a single ad vendor from day one.

### Advertising Principles

- Ads should not damage trust or make the product feel spammy.
- Ad slots should feel intentionally placed, not randomly injected.
- Sponsored or ad-driven units must stay clearly distinguishable from product results and editorial content.
- Monetization should support the product surface, not overwhelm the main calculator flow.

### Early Placement Direction

Likely early ad surfaces include:

- sponsored units near the calculator result area
- native-feeling sponsored placements inside `Market Pulse`
- future controlled placements on content/discovery surfaces only where they fit naturally

For the MVP, the product should stay compatible with ad integrations,
but the UI should avoid hard-coding itself around one provider's exact embed assumptions.

## UX Goals

- The user should understand the product in a few seconds.
- The path from landing to result should feel direct.
- Mobile should be treated as a primary surface, not a reduced afterthought.
- The result should feel emotionally punchy without becoming confusing.

## Content and Tone

- English-first product language
- Sharp, modern, slightly dark-humored tone
- No hype language that sounds like financial advice
- No meme-heavy writing that damages trust

## Technical Direction

- Use Next.js 16 App Router.
- Keep routes thin and feature logic modular.
- Favor Server Components by default and add Client Components only where needed.
- Use Tailwind CSS v4 for styling.
- Keep the codebase ready for future SEO, sharing, and backend integration without prematurely building them.
- Build the calculator mini-game as a lightweight 3D scene, not as a full game engine project.
- Preferred mini-game stack: `three.js`, `@react-three/fiber`, and `@react-three/drei`.
- Preferred runtime assets for the mini-game are optimized `GLB` models for character, bow, arrow, and target.
- The character should be rigged. The bow, arrow, and target do not need rigging.
- The bowstring should be rendered in code, not baked into the 3D model.
- The mini-game should use lightweight stylized physics and secondary motion, not a heavy physics simulation.
- The intended motion quality includes soft draw tension, slight shoulder and head follow-through, a short release recoil, a smooth arrow arc, and a subtle target wobble on hit.
- The current live prototype is allowed to use interim `FBX` and `OBJ` assets while behavior is being tuned, as long as the production-direction asset contract remains explicit.

## Planned Repository Structure

Regretify should move forward as a small multi-repo setup instead of forcing the public client,
core backend, and admin panel into one repository too early.

Planned active repositories:

- `regretify-client`
- `regretify-core`
- `regretify-admin`

### Repository Roles

- `regretify-client`
  - the public web product
  - the main calculator experience
  - SEO-facing pages
  - public product UI and public API consumption
- `regretify-core`
  - the main backend
  - internal business logic
  - public product API endpoints
  - admin/internal API endpoints
  - market data sync jobs
  - ads/sponsor orchestration
  - persistence, cache, and internal integrations
- `regretify-admin`
  - the internal/admin dashboard
  - content and asset operations
  - ad/sponsor management
  - operational controls and settings

### Core Repository Structure

The intended starting structure for `regretify-core` is:

```txt
src/
  main.ts
  app.module.ts

  config/
    env.ts
    app.config.ts
    database.config.ts
    redis.config.ts

  common/
    dto/
    guards/
    interceptors/
    filters/
    decorators/
    constants/
    types/

  database/
    migrations/
    seeds/

  integrations/
    market-data/
      providers/
      adapters/
    ads/
      providers/
    storage/

  modules/
    health/
    auth/
    admin-users/
    assets/
    markets/
    prices/
    charts/
    calculator/
    market-pulse/
    ads/
    sponsors/
    jobs/
    internal/

test/
docker/
.env.example
docker-compose.yml
```

Core architecture direction:

- start as a modular monolith
- do not split into microservices for the MVP
- keep public API, internal API, jobs, and integrations separated by module boundaries

### Admin Repository Structure

The intended starting structure for `regretify-admin` is:

```txt
src/
  app/
    (auth)/
      login/
    (dashboard)/
      dashboard/
      market-pulse/
      assets/
      ads/
      sponsors/
      settings/
    layout.tsx
    page.tsx

  features/
    auth/
    dashboard/
    market-pulse/
    assets/
    ads/
    sponsors/
    settings/

  components/
    layout/
    ui/
    forms/
    tables/

  lib/
    api/
    auth/
    utils/
    config/

  types/

public/
.env.example
```

Admin scope direction:

- start with a lightweight dashboard shell
- login
- market pulse management
- asset management
- ad and sponsor management
- basic settings and operational views
- avoid overbuilding full back-office complexity in the first pass

## Implementation Baseline

Before major UI implementation, the project should follow these baseline decisions:

- clear URL and state policy
- a small but consistent design system baseline
- explicit frontend data contracts
- a repeatable page composition pattern

These are not optional cleanup tasks. They are part of building the product foundation correctly.

## Color System Baseline

Regretify should use a small, explicit color system instead of page-level one-off accents.

- The main UI brand color is the purple Regretify accent, not orange.
- Shared UI colors should come from global tokens for:
  - brand
  - surface
  - border
  - text hierarchy
  - semantic states such as success, warning, and danger
- Asset colors such as Bitcoin orange or Solana gradients are not the same as the Regretify UI brand and can remain asset-specific where they represent the asset itself.
- Market colors can remain data-driven when they communicate the selected market, but they should not override the global product brand language of the surrounding UI.
- Decorative gradients or one-off artwork are acceptable when they support a section's visual identity, but reusable product accents should still come from the shared token set.
- Hard-coded UI accent colors should be removed gradually page by page in favor of the shared tokens.

## Typography Baseline

- The primary UI font for Regretify should be `Urbanist`.
- The goal is one strong sans-serif system that can carry:
  - calculator UI
  - editorial content
  - bold hero headlines
- `Geist Mono` can remain available for code-like labels, technical values, or utility displays when needed.
- Typography should be unified page by page in the same way colors are being unified, instead of letting each screen drift into its own font language.
- Shared heading spacing should come from reusable global typography utilities instead of one-off per-page tracking hacks.

## Decision Log

### 2026-05-17

- The `/` calculator entry is moving from a placeholder stage to a lightweight 3D archery mini-game.
- The mini-game implementation path is `three.js` via `@react-three/fiber`, not layered PNG animation as the final production direction.
- Required mini-game assets are optimized `GLB` files for the character, bow, arrow, and target.
- The character asset should be rigged. The bow, arrow, and target can remain static meshes.
- The bowstring should be generated in code so draw and release interactions stay controllable.
- The mini-game should include lightweight stylized physics cues rather than dry keyframed motion: soft arm and shoulder tension, slight head follow-through, smooth arrow flight, and subtle target reaction.

### 2026-05-23

- The `/` route mini-game runtime character is now:
  - `public/models/character-512-rig-25000poly-compressed.glb`
- The gameplay shell still reuses the existing bow, arrow, projectile, and target pipeline, but character integration is no longer tied to the old FBX baseline.
- Legacy pose-sheet exports in `docs/mini-game/` remain archived as reference material only, not as active runtime dependencies.
- The active arrow-on-bow alignment rule is:
  - lock the tail in the thumb/index pinch zone first
  - then tune the head and length from that anchor
- The active target interaction rule is:
  - detect impact against the real front face plane of the target
  - leave a stuck arrow on hit
  - keep the arrow at its incoming flight angle on impact instead of flattening it to the target face
- The dashed shot preview has been removed from the live `/` route because it is no longer needed in the current UX.

### 2026-05-25

- A full-draw-only spacing correction on `mixamorigRightForeArm` is now part of the active mini-game runtime.
- The purpose of this pass was to reduce the current right-hand / chest overlap without changing the broader arm chain or the arrow tail anchor model.
- This correction should stay limited to full draw unless a later tuning pass proves the draw phase also needs adjustment.
- The approved bow-side arrow contact point is now the full-draw `50` baseline tip position in bow space.
- Across the active aim range, the hand arrow should keep that same bow-side tip position and pivot around the tail anchor rather than letting the tip slide across the bow.
- The stuck arrow on the target should preserve the real impact angle from flight instead of snapping flat to the target normal.
- The `/` route now treats the WebGL mini-game as an independently loaded stage inside the page shell instead of making the full calculator hero wait on the 3D runtime.
- The page shell, visible copy, and crawlable calculator context should render first; the mini-game canvas should lazy-load into that shell as a separate client island.
- Current projectile tuning is now based on the slower release lane that was rebalanced in-place with updated gravity rather than the older faster baseline.
- The active target lane is now tuned in target-local space, and the target mesh has been visually aligned to that same active hit zone.
- Browser-cache optimization is now part of the active mini-game runtime for stable heavy assets on `/`.
- The current stable cached mini-game asset set is:
  - `public/models/character-512-rig-25000poly-compressed.glb`
  - `public/models/wooden-archery-target-512-2500poly.glb`
  - `public/models/bow.obj`
  - `public/models/arrow.obj`
  - `public/images/home/hero-background-test-backg-lite.webp`
- These files should use long-lived browser caching and be treated as versioned asset filenames.
- If the binary or image content changes materially, the filename should change as part of the same task so stale browser caches do not hold the previous runtime asset.

## Current Designed Pages

The following pages have been designed so far:

- `/`
- `/asset-selection`
- `/market-movement`
- `/market-pulse`
- `/market-pulse/feed`
- `/market-pulse/[slug]`
- `/assets`
- canonical asset calculator pages such as `/<asset>`

## Remaining Main Pages

The main pages that still remain to be designed are:

- richer asset-specific SEO content below the canonical asset calculator
- final calculated result and share-poster states

### 2026-06-23

- MVP launch scope is being simplified around the full calculator flow and `Market Pulse`.
- The active launch flow should remain:
  - mini-game on `/`
  - asset selection
  - scenario builder
  - final result / share output
- `Market Movement` and the dedicated `Assets` page are now temporarily disabled for the initial MVP launch.
- Their code should stay in the repository, but the routes should stay out of active navigation and out of the public MVP surface until re-enabled.
- Active MVP content/discovery routes are now:
  - `/`
  - `/<asset>`
  - `/market-pulse`
  - `/market-pulse/[slug]`
- `/market-pulse/feed` should remain a secondary non-canonical route while `/market-pulse` carries the main feed UI and SEO value.

### 2026-05-15

- Canonical asset calculator routes now use the top-level `/<asset>` pattern.
- `/calculate` is no longer the canonical calculator destination and should redirect to the default selected asset route.
- Asset selection should send users to the selected asset's calculator route, such as `/bitcoin` or `/ethereum`.

### 2026-05-14

- `/calculate` is the initial Step 3 route for the main calculator flow after market and asset selection.
- Step 3 starts with a scenario builder for investment amount and will grow into timeline selection, sponsor placement, and the share-poster result system.

### 2026-04-28

- The previous implementation was intentionally discarded.
- The project is restarting from a clean Next.js baseline.
- Product and UI direction will be rebuilt with clearer documentation before major implementation work.
- The main product flow is market -> asset -> scenario -> result.
- The core emotion of the product is regret around missed investment upside, not generic portfolio tracking.
- `Market Movement` is a supporting section for large asset moves across time windows.
- `Market Pulse` is a lighter, curiosity-driven content area and its naming may change later.
- The main flow should end with a shareable poster-style result.
- SEO is a permanent implementation rule for all important sections and should shape page design, routing, metadata, and canonical strategy from the beginning.
- URL/state policy, design system baseline, data contracts, and page composition pattern are part of the permanent implementation baseline.
