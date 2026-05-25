import Link from "next/link";
import {
  getMarketPulseStoryPath,
  marketPulseFeedPath,
} from "@/features/market-pulse/lib/routes";
import { MarketPulseStoryReactionStrip } from "@/features/market-pulse-story/components/MarketPulseStoryReactionStrip";
import { marketPulseStoryBodyContent } from "@/features/market-pulse-story/data/storyPageBodyContent";
import { getMarketPulseStories } from "@/features/market-pulse-story/lib/stories";
import type { MarketPulseStory } from "@/features/market-pulse-story/types";

function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.5 5.5 7 10l4.5 4.5" />
      <path d="M7.5 10h7.5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 5.5 13 10l-4.5 4.5" />
      <path d="M12.5 10H5" />
    </svg>
  );
}

function storyThumbToneClassName(story: MarketPulseStory) {
  switch (story.tone) {
    case "midnight":
      return "bg-[radial-gradient(circle_at_top_left,#6d54ff_0%,#2a1e64_42%,#101320_100%)]";
    case "violet":
      return "bg-[radial-gradient(circle_at_top_left,#a36bff_0%,#5933d9_42%,#171124_100%)]";
    case "emerald":
      return "bg-[radial-gradient(circle_at_top_left,#90f1c8_0%,#288f74_42%,#101a1a_100%)]";
    case "rose":
      return "bg-[radial-gradient(circle_at_top_left,#ffc2e6_0%,#db5da0_38%,#29131f_100%)]";
    case "sky":
      return "bg-[radial-gradient(circle_at_top_left,#bfe6ff_0%,#4a88ff_42%,#111c2f_100%)]";
    case "amber":
      return "bg-[radial-gradient(circle_at_top_left,#ffe090_0%,#f09a37_36%,#2b160e_100%)]";
    case "crimson":
      return "bg-[radial-gradient(circle_at_top_left,#ffb7c6_0%,#d94d67_38%,#291219_100%)]";
    case "teal":
      return "bg-[radial-gradient(circle_at_top_left,#bafff3_0%,#33baa9_38%,#0f1b20_100%)]";
    case "sunset":
      return "bg-[radial-gradient(circle_at_top_left,#ffd49a_0%,#ff8744_36%,#26140d_100%)]";
  }
}

function parseCompactMetric(value: string) {
  const normalized = value.trim().toUpperCase();

  if (normalized.endsWith("K")) {
    return Number.parseFloat(normalized.slice(0, -1)) * 1000;
  }

  return Number.parseFloat(normalized.replace(/,/g, "")) || 0;
}

function StoryOutlineCard() {
  const { breakdown, analysis, takeaways } = marketPulseStoryBodyContent;

  const links = [
    { href: "#story-overview", label: "Market overview" },
    { href: "#story-breakdown", label: breakdown.heading },
    { href: "#story-analysis-detail", label: analysis.heading },
    { href: "#story-key-points", label: takeaways.heading },
  ];

  return (
    <nav
      aria-labelledby="story-outline"
      className="rounded-[1.3rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] p-5 shadow-[0_10px_24px_rgba(24,24,27,0.04)]"
    >
      <h2 id="story-outline" className="type-title text-[1.02rem] font-semibold text-zinc-950">
        On this page
      </h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-[0.95rem] leading-6 text-[var(--color-text-ui-soft)] transition-colors hover:text-[var(--color-brand)]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MobileStoryOutlineCard() {
  const { breakdown, analysis, takeaways } = marketPulseStoryBodyContent;

  const links = [
    { href: "#story-overview", label: "Market overview" },
    { href: "#story-breakdown", label: breakdown.heading },
    { href: "#story-analysis-detail", label: analysis.heading },
    { href: "#story-key-points", label: takeaways.heading },
  ];

  return (
    <section className="rounded-[1.2rem] border border-[color:var(--color-border-ui-subtle)] bg-[var(--color-surface-ui-muted)] px-4 py-4 xl:hidden">
      <p className="text-[0.76rem] font-semibold tracking-[0.16em] text-[var(--color-brand)] uppercase">
        On this page
      </p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-[0.93rem] leading-6 text-[var(--color-text-ui-soft)]">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StoryTagList() {
  const { tags } = marketPulseStoryBodyContent;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex min-h-9 items-center rounded-full border border-[color:var(--color-brand-border)] bg-[linear-gradient(180deg,var(--color-brand-soft)_0%,var(--color-brand-soft-strong)_100%)] px-3.5 text-[0.84rem] font-medium text-[var(--color-brand-strong)]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function StoryReactionGrid() {
  const { reactionsHeading, reactions } = marketPulseStoryBodyContent;

  return (
    <section
      aria-labelledby="story-reactions-heading"
      className="border-t border-[color:var(--color-border-ui-subtle)] pt-8"
    >
      <h2 id="story-reactions-heading" className="type-title text-[1.28rem] font-semibold text-zinc-950">
        {reactionsHeading}
      </h2>
      <MarketPulseStoryReactionStrip reactions={reactions} />
    </section>
  );
}

function StoryPagination({ story }: { story: MarketPulseStory }) {
  const stories = getMarketPulseStories();
  const currentIndex = stories.findIndex((item) => item.slug === story.slug);
  const previousStory = currentIndex > 0 ? stories[currentIndex - 1] : null;
  const nextStory =
    currentIndex >= 0 && currentIndex < stories.length - 1 ? stories[currentIndex + 1] : null;

  return (
    <nav aria-label="Story navigation" className="border-t border-[color:var(--color-border-ui-subtle)] pt-7">
      <div className="flex items-center justify-between gap-4">
        {previousStory ? (
          <Link
            href={getMarketPulseStoryPath(previousStory.slug)}
            className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-[var(--color-brand)] transition-colors hover:text-[var(--color-brand-strong)]"
          >
            <ArrowLeftIcon />
            <span>Previous Story</span>
          </Link>
        ) : (
          <span />
        )}

        {nextStory ? (
          <Link
            href={getMarketPulseStoryPath(nextStory.slug)}
            className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-[var(--color-brand)] transition-colors hover:text-[var(--color-brand-strong)]"
          >
            <span>Next Story</span>
            <ArrowRightIcon />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}

function RelatedPulseCard({ story }: { story: MarketPulseStory }) {
  return (
    <Link
      href={getMarketPulseStoryPath(story.slug)}
      className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-3 transition-transform hover:translate-x-0.5"
    >
      <div
        className={`relative h-[4.75rem] overflow-hidden rounded-[1rem] ${storyThumbToneClassName(story)}`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(11,12,24,0.18)_42%,rgba(11,12,24,0.56)_100%)]" />
        <div className="absolute left-2 top-2 rounded-full bg-white/16 px-2 py-0.5 text-[0.58rem] font-semibold tracking-[0.08em] text-white uppercase backdrop-blur-sm">
          {story.category}
        </div>
        <div className="absolute inset-x-2 bottom-2 h-7 rounded-[0.8rem] border border-white/10 bg-white/10 backdrop-blur-[1px]" />
      </div>

      <div className="min-w-0">
        <h3 className="type-title line-clamp-3 text-[0.96rem] font-semibold text-zinc-950">
          {story.title}
        </h3>
        <p className="mt-1 text-[0.82rem] text-[var(--color-text-ui-muted)]">{story.timeAgo}</p>
      </div>
    </Link>
  );
}

function RelatedPulseRail({ currentStory }: { currentStory: MarketPulseStory }) {
  const stories = getMarketPulseStories();
  const relatedStories = stories
    .filter((story) => story.slug !== currentStory.slug)
    .sort((left, right) => {
      const leftScore =
        (left.category === currentStory.category ? 1_000_000 : 0) +
        parseCompactMetric(left.metrics.likes);
      const rightScore =
        (right.category === currentStory.category ? 1_000_000 : 0) +
        parseCompactMetric(right.metrics.likes);

      return rightScore - leftScore;
    })
    .slice(0, 3);

  return (
    <section className="rounded-[1.3rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] p-5 shadow-[0_10px_24px_rgba(24,24,27,0.04)]">
      <h2 className="type-title text-[1.02rem] font-semibold text-zinc-950">
        Related Pulse
      </h2>
      <div className="mt-4 space-y-4">
        {relatedStories.map((story) => (
          <RelatedPulseCard key={story.slug} story={story} />
        ))}
      </div>
      <Link
        href={marketPulseFeedPath}
        className="mt-5 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-[var(--color-brand)] transition-colors hover:text-[var(--color-brand-strong)]"
      >
        <span>View all stories</span>
        <ArrowRightIcon />
      </Link>
    </section>
  );
}

function TrendingNowRail({ currentStory }: { currentStory: MarketPulseStory }) {
  const stories = getMarketPulseStories();
  const trendingStories = stories
    .filter((story) => story.slug !== currentStory.slug)
    .sort(
      (left, right) =>
        parseCompactMetric(right.metrics.likes) - parseCompactMetric(left.metrics.likes),
    )
    .slice(0, 5);

  return (
    <section className="rounded-[1.3rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] p-5 shadow-[0_10px_24px_rgba(24,24,27,0.04)]">
      <h2 className="type-title text-[1.02rem] font-semibold text-zinc-950">
        Trending now
      </h2>
      <ol className="mt-4 space-y-1.5">
        {trendingStories.map((story, index) => (
          <li key={story.slug}>
            <Link
              href={getMarketPulseStoryPath(story.slug)}
              className={`grid grid-cols-[1.4rem_minmax(0,1fr)] items-center gap-2 rounded-[0.75rem] px-2 py-1 transition-colors hover:bg-zinc-50 ${
                index === 0 ? "bg-[var(--color-brand-soft)]" : ""
              }`}
            >
              <span className="text-[0.78rem] font-semibold text-[var(--color-brand)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="truncate text-[0.84rem] leading-5 text-zinc-700">
                {story.title}
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <Link
        href={marketPulseFeedPath}
        className="mt-5 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-[var(--color-brand)] transition-colors hover:text-[var(--color-brand-strong)]"
      >
        <span>View all trending</span>
        <ArrowRightIcon />
      </Link>
    </section>
  );
}

export function MarketPulseStoryBody({ story }: { story: MarketPulseStory }) {
  const {
    summaryLabel,
    summaryHeading,
    introParagraphs,
    quote,
    breakdown,
    analysis,
    cta,
    takeaways,
  } = marketPulseStoryBodyContent;

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
      <article className="min-w-0 rounded-[1.6rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] px-5 py-6 shadow-[0_14px_34px_rgba(24,24,27,0.05)] sm:px-7 sm:py-8 lg:px-9">
        <header className="border-b border-[color:var(--color-border-ui-subtle)] pb-7">
          <p className="text-[0.74rem] font-semibold tracking-[0.18em] text-[var(--color-brand)] uppercase">
            {summaryLabel}
          </p>
          <h2 className="type-display mt-3 max-w-[42rem] text-[2rem] font-semibold text-zinc-950 sm:text-[2.2rem]">
            {summaryHeading}
          </h2>
        </header>

        <div className="mt-8 space-y-9">
          <MobileStoryOutlineCard />

          <section id="story-overview" aria-labelledby="story-overview-heading">
            <h2
              id="story-overview-heading"
              className="type-title text-[1.3rem] font-semibold text-zinc-950"
            >
              Market overview
            </h2>
            <div className="mt-4 max-w-[41rem] space-y-5 text-[1.05rem] leading-8 text-zinc-700 lg:text-[1.08rem] lg:leading-8">
              {introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <figure className="border-l-4 border-[var(--color-brand)] bg-[var(--color-surface-ui-muted)] px-5 py-5">
            <blockquote className="type-title max-w-[38rem] text-[1.25rem] font-medium text-zinc-900">
              <span>&ldquo;</span>
              {quote.text}
              <span>&rdquo;</span>
            </blockquote>
            <figcaption className="mt-3 text-[0.92rem] font-medium text-[var(--color-text-ui-muted)]">
              {quote.source}
            </figcaption>
          </figure>

          <section
            id="story-breakdown"
            aria-labelledby="story-breakdown-heading"
            className="border-t border-[color:var(--color-border-ui-subtle)] pt-8"
          >
            <h2
              id="story-breakdown-heading"
              className="type-display text-[1.55rem] font-semibold text-zinc-950"
            >
              {breakdown.heading}
            </h2>
            <ol className="mt-5 space-y-4">
              {breakdown.points.map((point, index) => (
                <li key={point} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-[0.88rem] font-semibold text-zinc-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1 text-[1.02rem] leading-8 text-zinc-700">{point}</p>
                </li>
              ))}
            </ol>
          </section>

          <section
            id="story-analysis-detail"
            aria-labelledby="story-analysis-detail-heading"
            className="border-t border-[color:var(--color-border-ui-subtle)] pt-8"
          >
            <h2
              id="story-analysis-detail-heading"
              className="type-display text-[1.55rem] font-semibold text-zinc-950"
            >
              {analysis.heading}
            </h2>
            <div className="mt-4 max-w-[41rem] space-y-5 text-[1.03rem] leading-8 text-zinc-700">
              {analysis.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section
            id="story-key-points"
            aria-labelledby="story-key-points-heading"
            className="border-t border-[color:var(--color-border-ui-subtle)] pt-8"
          >
            <h2
              id="story-key-points-heading"
              className="type-display text-[1.55rem] font-semibold text-zinc-950"
            >
              {takeaways.heading}
            </h2>
            <ul className="mt-5 space-y-3">
              {takeaways.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-3 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
                  />
                  <p className="text-[1.02rem] leading-8 text-zinc-700">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[1.3rem] border border-[color:var(--color-border-ui-subtle)] bg-[var(--color-surface-ui-muted)] px-5 py-6">
            <h2 className="type-display text-[1.6rem] font-semibold text-zinc-950">
              {cta.title}
            </h2>
            <p className="mt-3 max-w-[36rem] text-[1rem] leading-7 text-[var(--color-text-ui-soft)]">
              {cta.description}
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-zinc-950 px-5 text-[0.92rem] font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              {cta.buttonLabel}
            </Link>
          </section>

          <section className="border-t border-[color:var(--color-border-ui-subtle)] pt-8">
            <StoryTagList />
          </section>

          <StoryReactionGrid />

          <StoryPagination story={story} />
        </div>
      </article>

      <aside className="hidden space-y-4 xl:sticky xl:top-24 xl:block">
        <StoryOutlineCard />
        <RelatedPulseRail currentStory={story} />
        <TrendingNowRail currentStory={story} />
      </aside>
    </section>
  );
}
