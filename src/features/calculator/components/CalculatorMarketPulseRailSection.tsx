import Link from "next/link";
import { marketFeedCards } from "@/features/market-feed/data/feedItems";
import type { MarketFeedArticleCard } from "@/features/market-feed/types";
import { marketPulsePath } from "@/features/market-pulse/lib/routes";
import { getMarketPulseStoryPathFromCard } from "@/features/market-pulse-story/lib/stories";

const featuredPulseCards = marketFeedCards
  .filter((card): card is MarketFeedArticleCard => card.kind === "article")
  .slice(0, 6);

function cardToneClassName(tone: MarketFeedArticleCard["tone"]) {
  switch (tone) {
    case "midnight":
      return "bg-[radial-gradient(circle_at_top_left,#281454_0%,#0d1020_52%,#090a10_100%)] text-white";
    case "violet":
      return "bg-[radial-gradient(circle_at_top_left,#6a35ff_0%,#2b1857_48%,#100d1d_100%)] text-white";
    case "sunset":
      return "bg-[radial-gradient(circle_at_top_left,#ffd075_0%,#ff8a1d_30%,#4a1f0d_100%)] text-white";
    case "emerald":
      return "bg-[radial-gradient(circle_at_top_left,#8bffca_0%,#1c916f_36%,#102432_100%)] text-white";
    case "rose":
      return "bg-[radial-gradient(circle_at_top_left,#ffc7ea_0%,#ff77c7_26%,#3d1738_100%)] text-white";
    case "sky":
      return "bg-[radial-gradient(circle_at_top_left,#d7f1ff_0%,#79c1ff_26%,#1b3768_100%)] text-zinc-950";
    case "amber":
      return "bg-[radial-gradient(circle_at_top_left,#fff0aa_0%,#f4b13c_26%,#4e260f_100%)] text-zinc-950";
    case "crimson":
      return "bg-[radial-gradient(circle_at_top_left,#ffc1ce_0%,#ff6885_24%,#3c1220_100%)] text-white";
    case "teal":
      return "bg-[radial-gradient(circle_at_top_left,#d3fff7_0%,#4ed7c7_26%,#153544_100%)] text-zinc-950";
  }
}

export function CalculatorMarketPulseRailSection() {
  return (
    <section className="border-t border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,#ffffff_0%,#fbf8ff_100%)]">
      <div className="mx-auto max-w-[96rem] px-4 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">
              From Market Pulse
            </p>
            <h2 className="type-display mt-3 text-[1.8rem] font-semibold text-zinc-950 sm:text-[2.25rem]">
              A quick read before you run the regret
            </h2>
            <p className="mt-3 text-[0.92rem] leading-6 text-[var(--color-text-ui-soft)] sm:text-[0.98rem]">
              A short rail of live-feeling stories from the feed, kept light so the
              calculator still stays the main event.
            </p>
          </div>

          <Link
            href={marketPulsePath}
            className="hidden min-h-11 items-center justify-center rounded-full border border-[color:var(--color-border-ui-subtle)] bg-white px-4 text-[0.84rem] font-semibold text-zinc-950 shadow-[0_10px_24px_rgba(24,24,27,0.04)] transition-colors hover:bg-[var(--color-brand-soft)] sm:inline-flex"
          >
            Open full feed
          </Link>
        </div>

        <div className="mt-6 -mx-4 overflow-x-auto px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
          <div className="flex gap-4 pb-1">
            {featuredPulseCards.map((card) => (
              <Link
                key={card.id}
                href={getMarketPulseStoryPathFromCard(card)}
                className={`group flex min-h-[17.5rem] w-[17rem] shrink-0 flex-col justify-between overflow-hidden rounded-[1.7rem] border border-zinc-950/8 p-4 shadow-[0_18px_42px_rgba(24,24,27,0.08)] transition-transform duration-200 hover:-translate-y-0.5 sm:w-[19rem] ${cardToneClassName(card.tone)}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-white/14 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-current backdrop-blur-sm">
                    {card.badge}
                  </span>
                  <span className="text-[0.74rem] text-current/72">{card.timeAgo}</span>
                </div>

                <div className="mt-6">
                  <p className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-current/68">
                    {card.category}
                  </p>
                  <h3 className="type-title mt-3 text-[1.22rem] font-semibold leading-6">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[0.84rem] leading-5.5 text-current/76">
                    {card.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 text-[0.76rem]">
                  <div className="flex items-center gap-3 text-current/72">
                    <span>{card.metrics.comments} comments</span>
                    <span>{card.metrics.likes} likes</span>
                  </div>
                  <span className="font-semibold text-current transition-transform group-hover:translate-x-0.5">
                    Read
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-5 sm:hidden">
          <Link
            href={marketPulsePath}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[color:var(--color-border-ui-subtle)] bg-white px-4 text-[0.84rem] font-semibold text-zinc-950 shadow-[0_10px_24px_rgba(24,24,27,0.04)] transition-colors hover:bg-[var(--color-brand-soft)]"
          >
            Open full feed
          </Link>
        </div>
      </div>
    </section>
  );
}
