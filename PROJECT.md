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
- the `Assets` discovery area
- evergreen educational/content pages in `Market Pulse`
- selected high-value `Market Movement` pages when they provide real standalone value

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
It is the destination for "see all" or "view more" actions from the main `Market Pulse` page.
Individual story detail pages in this area currently use the working name `Pulse Story`
and live under the route pattern `/market-pulse/[slug]`.

### Assets

`Assets` is the browseable area for exploring supported assets.

Its role is to help users discover assets and enter the main calculator flow through a chosen asset.

## Shareability Direction

The final result of the main flow should not stop at a plain calculation summary.

Regretify should produce a shareable result artifact, likely a poster-style output suitable for social platforms.

The result should feel:

- visual
- emotionally sharp
- easy to screenshot or share
- still numerically clear

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

- The `/` route mini-game is now operating on a new rigged character baseline:
  - `public/models/playground-shooting-arrow-1k-rig.fbx`
- The previous mini-game character remains a fallback reference, but the active tuning path is now the new 1K rig.
- Runtime aim is now driven by a rebuilt four-anchor pose sheet for the new rig:
  - `25 / 50 / 75 / 100`
  - stored in `docs/mini-game/full-draw-bone-dump.json`
- The active aiming model is:
  - single-rig runtime interpolation
  - `50` as the visual baseline
  - runtime range centered on `50`
- The active arrow-on-bow alignment rule is:
  - lock the tail in the thumb/index pinch zone first
  - then tune the head and length from that anchor
- The active target interaction rule is:
  - detect impact against the real front face plane of the target
  - leave a stuck arrow on hit
  - keep the arrow orientation normal to the target face
- The dashed shot preview has been removed from the live `/` route because it is no longer needed in the current UX.

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
