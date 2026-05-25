## Market Pulse Story UI Reference

- `desktop/market-pulse-story-desktop-reference.png`
  - Desktop reference for the `Pulse Story` detail page at `/market-pulse/[slug]`.

## SEO Status

Current SEO score for the `Pulse Story` template: `8/10`

### Current strengths

- The page is server-rendered and crawlable.
- The route uses clean canonical URLs under `/market-pulse/[slug]`.
- The page has route-level metadata with title, description, canonical, Open Graph, and Twitter fields.
- The page renders `BreadcrumbList` and `NewsArticle` JSON-LD.
- The page has a clear semantic content hierarchy with `h1`, section headings, article body copy, and author/date signals.
- The page includes internal linking through `Related Pulse`, `Trending now`, and `Previous / Next Story`.

### Remaining SEO risks

- The template is SEO-ready, but the final score still depends on each story having unique, useful, non-thin content.
- The current metadata depends on `NEXT_PUBLIC_SITE_URL` for production-grade absolute canonical and social URLs.
- The current hero/share image is reused across stories; later, story-specific OG images would improve share quality.
- Trust signals are decent, but can still improve later with stronger sourcing, citations, or editorial policy.

### Current judgment

The template is now strong enough to support indexable story pages without blocking future SEO work.
Its main remaining weakness is not template architecture, but content quality variance between future stories.
