"use client";

import Link from "next/link";
import { useState } from "react";
import type {
  MarketFeedCard,
  MarketFeedCardTone,
  MarketFeedViewMode,
} from "@/features/market-feed/types";
import { getMarketPulseStoryPath } from "@/features/market-pulse/lib/routes";

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.2 10s2.8-4.5 7.8-4.5 7.8 4.5 7.8 4.5-2.8 4.5-7.8 4.5S2.2 10 2.2 10Z" />
      <circle cx="10" cy="10" r="2.1" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 16.8 4 12.1a3.8 3.8 0 0 1 5.2-5.5L10 7.4l.8-.8A3.8 3.8 0 0 1 16 12.1Z" />
    </svg>
  );
}

function SaveIcon({ isSaved = false }: { isSaved?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5"
      fill={isSaved ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 3.5h9v13l-4.5-2.8-4.5 2.8Z" />
    </svg>
  );
}

function FeedStat({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <EyeIcon />
      <span>{value}</span>
    </span>
  );
}

function LikeButton({
  value,
  tone = "light",
}: {
  value: string;
  tone?: "light" | "dark";
}) {
  const [isLiked, setIsLiked] = useState(false);

  function toggleLikedState(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsLiked((current) => !current);
  }

  return (
    <button
      type="button"
      aria-label={isLiked ? "Unlike story" : "Like story"}
      aria-pressed={isLiked}
      onClick={toggleLikedState}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-colors ${
        tone === "dark"
          ? isLiked
            ? "border-rose-300/60 bg-rose-500/18 text-rose-200"
            : "border-white/10 bg-white/6 text-white/76 hover:border-white/18 hover:bg-white/10 hover:text-white"
          : isLiked
            ? "border-rose-200 bg-rose-50 text-rose-600"
            : "border-[color:var(--color-border-ui-subtle)] text-[var(--color-text-ui-muted)] hover:bg-rose-50 hover:text-rose-500"
      }`}
    >
      <HeartIcon />
      <span>{value}</span>
    </button>
  );
}

function SaveButton({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const [isSaved, setIsSaved] = useState(false);

  function toggleSavedState(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsSaved((current) => !current);
  }

  return (
    <button
      type="button"
      aria-label={isSaved ? "Remove saved story" : "Save story"}
      aria-pressed={isSaved}
      onClick={toggleSavedState}
      className={`inline-flex h-7 w-7 items-center justify-center rounded-full border transition-colors ${
        tone === "dark"
          ? isSaved
            ? "border-white/28 bg-white/22 text-white"
            : "border-white/18 bg-white/8 text-white/72 hover:bg-white/12 hover:text-white"
          : isSaved
            ? "border-[color:var(--color-brand-border)] bg-[linear-gradient(180deg,var(--color-brand-soft)_0%,var(--color-brand-soft-strong)_100%)] text-[var(--color-brand-strong)]"
            : "border-[color:var(--color-border-ui-subtle)] text-[var(--color-text-ui-muted)] hover:bg-[var(--color-brand-soft)] hover:text-zinc-800"
      }`}
    >
      <SaveIcon isSaved={isSaved} />
    </button>
  );
}

function cardToneClassName(tone: MarketFeedCardTone) {
  switch (tone) {
    case "midnight":
      return "bg-[radial-gradient(circle_at_top_left,#2a1652_0%,#0d101f_48%,#090a11_100%)]";
    case "violet":
      return "bg-[radial-gradient(circle_at_top_left,#5f2ce0_0%,#22124b_46%,#100d1d_100%)]";
    case "sunset":
      return "bg-[radial-gradient(circle_at_top_left,#ffbf66_0%,#ff7a00_36%,#351c0d_100%)]";
    case "emerald":
      return "bg-[radial-gradient(circle_at_top_left,#7b4bff_0%,#322b96_35%,#0e281e_100%)]";
    case "rose":
      return "bg-[radial-gradient(circle_at_top_left,#ffb9ea_0%,#ff7bce_28%,#2e1732_100%)]";
    case "sky":
      return "bg-[radial-gradient(circle_at_top_left,#80d4ff_0%,#4887ff_32%,#11203d_100%)]";
    case "amber":
      return "bg-[radial-gradient(circle_at_top_left,#ffd36e_0%,#ff9c3d_26%,#9c4f13_58%,#26130b_100%)]";
    case "crimson":
      return "bg-[radial-gradient(circle_at_top_left,#ff8ca8_0%,#ff5c67_24%,#7d1f36_56%,#190d13_100%)]";
    case "teal":
      return "bg-[radial-gradient(circle_at_top_left,#8ff7df_0%,#2bc7b5_26%,#1d6b77_58%,#0d1820_100%)]";
  }
}

function featuredSceneClassName(tone: MarketFeedCardTone) {
  switch (tone) {
    case "midnight":
      return "bg-[radial-gradient(circle_at_18%_16%,#8f7cff_0%,#5642cf_22%,#261f72_46%,#11122e_100%)]";
    case "violet":
      return "bg-[radial-gradient(circle_at_16%_18%,#ffc9ec_0%,#e77bd7_22%,#9b57d7_46%,#3f2d91_68%,#120f22_100%)]";
    case "sunset":
      return "bg-[radial-gradient(circle_at_16%_18%,#ffd98a_0%,#ff9c3d_20%,#cc5f12_44%,#5c250d_70%,#1c0f0b_100%)]";
    case "emerald":
      return "bg-[radial-gradient(circle_at_14%_16%,#b0ffd7_0%,#53d59f_22%,#1f8b6c_48%,#15334d_72%,#0c101d_100%)]";
    case "rose":
      return "bg-[radial-gradient(circle_at_18%_16%,#ffd4ef_0%,#ff8dce_22%,#d14f8f_44%,#5a274f_70%,#150f18_100%)]";
    case "sky":
      return "bg-[radial-gradient(circle_at_18%_16%,#d3f1ff_0%,#7bc7ff_22%,#4c87ff_44%,#274691_70%,#0f1020_100%)]";
    case "amber":
      return "bg-[radial-gradient(circle_at_16%_18%,#fff0a8_0%,#ffbf47_22%,#e17a1f_44%,#6a3611_70%,#1c100b_100%)]";
    case "crimson":
      return "bg-[radial-gradient(circle_at_16%_18%,#ffc0d0_0%,#ff6b89_22%,#cf3a56_44%,#5b1d32_70%,#160d13_100%)]";
    case "teal":
      return "bg-[radial-gradient(circle_at_16%_18%,#c7fff5_0%,#57d8c8_22%,#2196a1_44%,#1a4e61_70%,#0d1318_100%)]";
  }
}

function FeedCardVisual({ card }: { card: MarketFeedCard }) {
  const toneClassName = cardToneClassName(card.tone);
  const articleHeroImageSrc =
    card.kind === "article" ? card.feedHeroImageSrc?.trim() : null;

  return (
    <div className={`relative h-[13.5rem] overflow-hidden ${toneClassName}`}>
      {articleHeroImageSrc ? (
        <img
          src={articleHeroImageSrc}
          alt={`${card.title} feed artwork`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,18,0.04)_0%,rgba(8,10,18,0.18)_48%,rgba(8,10,18,0.48)_100%)]" />
      <div
        className={`absolute left-4 top-4 rounded-full px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.1em] text-white uppercase ${
          card.kind === "sponsored" ? "bg-white/18 backdrop-blur-sm" : "bg-[#ff6b4a]"
        }`}
      >
        {card.badge}
      </div>
      <div className="absolute right-4 top-4 text-[0.74rem] text-white/80">
        {card.kind === "article" ? card.timeAgo : card.sponsor}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        {card.kind === "sponsored" ? (
          <p className="text-[0.72rem] font-semibold tracking-[0.08em] text-white/72 uppercase">
            {card.destinationLabel}
          </p>
        ) : null}
        <div className="mt-3 h-20 rounded-[1.4rem] border border-white/12 bg-white/7 backdrop-blur-[2px]" />
      </div>
    </div>
  );
}

export function MarketFeedCardItem({
  card,
  viewMode = "grid",
  featuredStyle = false,
}: {
  card: MarketFeedCard;
  viewMode?: MarketFeedViewMode;
  featuredStyle?: boolean;
}) {
  if (viewMode === "list") {
    if (card.kind === "sponsored") {
      return (
        <article className="h-full overflow-hidden rounded-[1.6rem] border border-[color:var(--color-brand-border)] bg-[linear-gradient(180deg,#faf6ff_0%,#f5efff_100%)] shadow-[0_18px_42px_rgba(24,24,27,0.05)] md:grid md:grid-cols-[18rem_minmax(0,1fr)]">
          <FeedCardVisual card={card} />

          <div className="grid h-full grid-rows-[auto_1fr_auto] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.72rem] font-semibold tracking-[0.08em] text-[var(--color-brand)] uppercase">
                  Sponsored
                </p>
                <h2 className="type-title mt-2 text-[1.24rem] font-semibold text-zinc-950">
                  {card.title}
                </h2>
              </div>
              <span className="shrink-0 text-[0.76rem] text-zinc-400">{card.sponsor}</span>
            </div>

            <p className="mt-3 max-w-[42rem] text-[0.9rem] leading-6 text-[var(--color-text-ui-soft)]">{card.excerpt}</p>

            <div className="flex items-center justify-between gap-3 pt-5 text-[0.78rem] text-[var(--color-text-ui-muted)]">
              <span>{card.destinationLabel}</span>
              <button
                type="button"
                className="inline-flex min-h-9 items-center rounded-full bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] px-3.5 text-[0.76rem] font-medium text-white shadow-[0_10px_22px_rgba(90,40,223,0.2)]"
              >
                {card.ctaLabel}
              </button>
            </div>
          </div>
        </article>
      );
    }

    const storyHref = getMarketPulseStoryPath(card.slug);

    return (
      <Link
        href={storyHref}
        className="block h-full overflow-hidden rounded-[1.6rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] shadow-[0_18px_42px_rgba(24,24,27,0.06)] transition-transform duration-200 hover:-translate-y-0.5 md:grid md:grid-cols-[18rem_minmax(0,1fr)]"
      >
        <FeedCardVisual card={card} />

        <div className="grid h-full grid-rows-[auto_1fr_auto] p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.72rem] font-semibold tracking-[0.08em] text-[var(--color-text-ui-muted)] uppercase">
                {card.category}
              </p>
              <h2 className="type-title mt-2 text-[1.24rem] font-semibold text-zinc-950">
                {card.title}
              </h2>
            </div>
            <span className="shrink-0 text-[0.76rem] text-zinc-400">{card.timeAgo}</span>
          </div>

            <p className="mt-3 max-w-[42rem] text-[0.9rem] leading-6 text-[var(--color-text-ui-soft)]">{card.excerpt}</p>

          <div className="flex items-center justify-between gap-3 pt-5 text-[0.78rem] text-[var(--color-text-ui-muted)]">
            <span>{card.badge}</span>
            <div className="flex items-center gap-3">
              <FeedStat value={card.metrics.views} />
              <LikeButton value={card.metrics.likes} />
              <SaveButton />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (card.kind === "sponsored") {
    return (
      <article className="relative flex h-[25rem] flex-col overflow-hidden rounded-[1.6rem] border border-zinc-900/8 bg-zinc-950 shadow-[0_20px_48px_rgba(24,24,27,0.1)]">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${featuredSceneClassName(card.tone)}`} />
          <div className="absolute right-[-10%] top-[8%] h-42 w-42 rounded-full border border-white/12 bg-white/10 blur-[2px]" />
          <div className="absolute left-[12%] top-[30%] h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute left-4 top-4 rounded-full bg-white/16 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.1em] text-white uppercase backdrop-blur-sm">
            Sponsored
          </div>
          <div className="absolute right-4 top-4 text-[0.74rem] text-white/88">{card.sponsor}</div>
          <p className="absolute left-4 bottom-22 text-[0.72rem] font-semibold tracking-[0.08em] text-white/76 uppercase">
            {card.destinationLabel}
          </p>
          <div className="absolute inset-x-0 bottom-0 h-[56%] bg-[linear-gradient(180deg,rgba(11,12,24,0)_0%,rgba(11,12,24,0.16)_18%,rgba(11,12,24,0.42)_42%,rgba(11,12,24,0.76)_74%,rgba(11,12,24,0.96)_100%)]" />
        </div>

        <div className="relative z-10 flex h-full flex-col p-4 text-white sm:p-4.5">
          <div className="mt-auto">
            <h2 className="type-display line-clamp-3 h-[4rem] max-w-[15rem] text-[1.3rem] font-semibold text-white">
              {card.title}
            </h2>

            <p className="mt-2 line-clamp-2 min-h-[2.5rem] max-w-[15rem] text-[0.82rem] leading-5 text-white/74">
              {card.excerpt}
            </p>

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-[0.76rem] text-white/70">{card.destinationLabel}</span>
              <button
                type="button"
                className="inline-flex min-h-8.5 items-center rounded-full bg-white px-3 text-[0.72rem] font-medium text-zinc-950 shadow-[0_10px_22px_rgba(24,24,27,0.18)]"
              >
                {card.ctaLabel}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  const storyHref = getMarketPulseStoryPath(card.slug);

  if (featuredStyle) {
    const articleHeroImageSrc = card.feedHeroImageSrc?.trim();

    return (
      <Link
        href={storyHref}
        className="relative flex h-[25rem] flex-col overflow-hidden rounded-[1.6rem] border border-zinc-900/8 bg-zinc-950 shadow-[0_20px_48px_rgba(24,24,27,0.1)] transition-transform duration-200 hover:-translate-y-0.5"
      >
        <div className="absolute inset-0">
          {articleHeroImageSrc ? (
            <img
              src={articleHeroImageSrc}
              alt={`${card.title} feed artwork`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className={`absolute inset-0 ${featuredSceneClassName(card.tone)}`} />
          )}
          <div className="absolute right-[-8%] top-[10%] h-40 w-40 rounded-full border border-white/12 bg-white/10 blur-[2px]" />
          <div className="absolute left-[8%] top-[28%] h-28 w-28 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute right-[10%] top-[22%] h-2 w-2 rounded-full bg-white/80" />
          <div className="absolute right-[18%] top-[30%] h-1.5 w-1.5 rounded-full bg-white/60" />
          <div className="absolute left-4 top-4 rounded-full bg-[#ff6b4a] px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.1em] text-white uppercase">
            {card.badge}
          </div>
          <div className="absolute right-4 top-4 text-[0.74rem] text-white/88">{card.timeAgo}</div>
          <div className="absolute inset-x-0 bottom-0 h-[54%] bg-[linear-gradient(180deg,rgba(13,10,24,0)_0%,rgba(13,10,24,0.18)_18%,rgba(13,10,24,0.46)_42%,rgba(13,10,24,0.78)_74%,rgba(13,10,24,0.96)_100%)]" />
        </div>

        <div className="relative z-10 flex h-full flex-col p-4 text-white sm:p-4.5">
          <div className="mt-auto">
            <h2 className="type-display line-clamp-3 h-[4.35rem] max-w-[15rem] text-[1.42rem] font-semibold text-white">
              {card.title}
            </h2>

            <div className="mt-4 flex items-center justify-between gap-3 text-[0.76rem] text-white/76">
              <span>{card.category}</span>
              <div className="flex items-center gap-3 text-white/82">
                <FeedStat value={card.metrics.views} />
                <LikeButton value={card.metrics.likes} tone="dark" />
                <SaveButton tone="dark" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
      <Link
        href={storyHref}
        className="flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] shadow-[0_18px_42px_rgba(24,24,27,0.06)] transition-transform duration-200 hover:-translate-y-0.5"
      >
      <FeedCardVisual card={card} />

      <div className="grid flex-1 grid-rows-[auto_1fr_auto] p-3.5 sm:p-4">
        <h2 className="type-title text-[1.14rem] font-semibold text-zinc-950">
          {card.title}
        </h2>

        <p className="mt-2 text-[0.86rem] leading-5.5 text-[var(--color-text-ui-soft)]">{card.excerpt}</p>

        <div className="flex items-center justify-between gap-3 pt-3.5 text-[0.74rem] text-[var(--color-text-ui-muted)]">
          <span>{card.category}</span>
          <div className="flex items-center gap-3">
            <FeedStat value={card.metrics.views} />
            <LikeButton value={card.metrics.likes} />
            <SaveButton />
          </div>
        </div>
      </div>
    </Link>
  );
}
