"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { internetLosingMindCards } from "@/features/market-pulse/data/internetLosingMind";
import { marketPulseFeedPath } from "@/features/market-pulse/lib/routes";
import type { PulseSocialCard, PulseSocialPlatform } from "@/features/market-pulse/types";

const platformMeta: Record<
  PulseSocialPlatform,
  { label: string; badge: string; badgeClassName: string }
> = {
  twitter: {
    label: "Twitter (X)",
    badge: "X",
    badgeClassName: "bg-black/70 text-white",
  },
  reddit: {
    label: "Reddit",
    badge: "R",
    badgeClassName: "bg-orange-500/90 text-white",
  },
  tiktok: {
    label: "TikTok",
    badge: "T",
    badgeClassName: "bg-black/70 text-white",
  },
  discord: {
    label: "Discord",
    badge: "D",
    badgeClassName: "bg-violet-400/90 text-white",
  },
};

function ArrowButton({
  direction,
  onClick,
  disabled = false,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous posts" : "Next posts"}
      className={`grid h-11 w-11 place-items-center rounded-full border shadow-[0_10px_24px_rgba(24,24,27,0.06)] transition-colors ${
        disabled
          ? "cursor-not-allowed border-[color:var(--color-border-ui-subtle)] bg-[var(--color-surface-ui-muted)] text-zinc-300 shadow-none"
          : "border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] text-zinc-900 hover:bg-[var(--color-brand-soft)]"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "left" ? (
          <>
            <path d="m11.5 4.5-5 5 5 5" />
            <path d="M6.5 9.5h8" />
          </>
        ) : (
          <>
            <path d="M4 10h12" />
            <path d="m11.5 4.5 5 5-5 5" />
          </>
        )}
      </svg>
    </button>
  );
}

function SocialMetric({
  value,
  icon,
}: {
  value: string;
  icon: "reply" | "repost" | "heart";
}) {
  return (
    <div className="flex items-center gap-1.5 text-[0.72rem] text-white/82">
      {icon === "reply" ? (
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
          <path d="M16 12.2a3.3 3.3 0 0 1-3.3 3.3H7.4L4 18v-2.5a3.3 3.3 0 0 1-2.3-3.1V7.3A3.3 3.3 0 0 1 5 4h7.7A3.3 3.3 0 0 1 16 7.3Z" />
        </svg>
      ) : icon === "repost" ? (
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
          <path d="M6 4.5h7l2.5 2.5" />
          <path d="M15.5 7V4.5" />
          <path d="M14 15.5H7L4.5 13" />
          <path d="M4.5 13v2.5" />
        </svg>
      ) : (
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
          <path d="M10 16.8 4 12.1a3.8 3.8 0 0 1 5.2-5.5L10 7.4l.8-.8A3.8 3.8 0 0 1 16 12.1Z" />
        </svg>
      )}
      <span>{value}</span>
    </div>
  );
}

function FallbackCardVisual({ card }: { card: PulseSocialCard }) {
  const toneClassName =
    card.fallbackTone === "emerald"
      ? "bg-[radial-gradient(circle_at_top_left,#143826_0%,#0b1712_54%,#090c0b_100%)]"
      : card.fallbackTone === "violet"
        ? "bg-[radial-gradient(circle_at_top_left,#38206d_0%,#160d2d_56%,#0a0812_100%)]"
        : "bg-[radial-gradient(circle_at_top_left,#1d2749_0%,#0f1425_54%,#080a12_100%)]";

  return (
    <>
      <div className={`absolute inset-0 ${toneClassName}`} />
      <div className="absolute right-[-8%] top-[14%] h-28 w-28 rounded-full border border-white/10 bg-white/6 blur-[1px]" />
      <div className="absolute left-5 top-[34%] h-px w-[64%] bg-white/8" />
      <div className="absolute left-5 top-[48%] h-px w-[56%] bg-white/8" />
      <svg
        viewBox="0 0 100 48"
        className="absolute inset-x-0 bottom-0 h-28 w-full text-emerald-400/95"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 39 C9 38 16 29 24 30 C31 31 38 19 46 20 C53 21 60 14 68 15 C76 16 82 9 90 8 C95 8 98 4 100 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}

function SocialCard({ card }: { card: PulseSocialCard }) {
  const platform = platformMeta[card.platform];

  return (
    <article className="group relative h-[21rem] overflow-hidden rounded-[1.55rem] border border-zinc-900/6 bg-zinc-950 shadow-[0_16px_38px_rgba(24,24,27,0.08)]">
      {card.imageSrc ? (
        <Image
          src={card.imageSrc}
          alt=""
          fill
          unoptimized
          sizes="(max-width: 767px) 80vw, (max-width: 1279px) 42vw, 22vw"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
        />
      ) : (
        <FallbackCardVisual card={card} />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,16,0.14)_0%,rgba(9,10,16,0.2)_24%,rgba(9,10,16,0.62)_62%,rgba(9,10,16,0.94)_100%)]" />

      <div className="relative z-10 flex h-full flex-col p-4">
        <div className="flex items-center justify-between gap-3 text-white/78">
          <div className="flex items-center gap-2">
            <span
              className={`grid h-5.5 w-5.5 place-items-center rounded-full text-[0.62rem] font-semibold ${platform.badgeClassName}`}
            >
              {platform.badge}
            </span>
            <span className="text-[0.78rem] font-medium">{platform.label}</span>
          </div>

          <span className="text-[0.72rem]">{card.timeAgo}</span>
        </div>

        <div className="mt-auto">
          <h3 className="type-display max-w-[12rem] text-[1.9rem] font-semibold text-white">
            {card.title}
          </h3>
          <p className="mt-1.5 text-[1.12rem] font-semibold tracking-[-0.04em] text-[#ffbf57]">
            {card.accentLine}
          </p>

          <div className="mt-5 flex items-center gap-4">
            <SocialMetric value={card.metrics.replies} icon="reply" />
            <SocialMetric value={card.metrics.reposts} icon="repost" />
            <SocialMetric value={card.metrics.likes} icon="heart" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function InternetLosingMindSection() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    function updateScrollState() {
      const currentRail = railRef.current;

      if (!currentRail) {
        return;
      }

      const maxScrollLeft = currentRail.scrollWidth - currentRail.clientWidth;
      setCanScrollPrev(currentRail.scrollLeft > 4);
      setCanScrollNext(currentRail.scrollLeft < maxScrollLeft - 4);
    }

    updateScrollState();

    rail.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  function scrollRail(direction: "left" | "right") {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    if (direction === "left" && !canScrollPrev) {
      return;
    }

    if (direction === "right" && !canScrollNext) {
      return;
    }

    const amount = Math.max(rail.clientWidth * 0.82, 280);

    rail.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="pt-0 pb-8 sm:pb-10 lg:pb-12">
      <div className="mx-auto max-w-[96rem] px-3 sm:px-7 lg:px-8">
        <div className="rounded-[2rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(250,247,255,0.94)_100%)] p-4 shadow-[0_24px_70px_rgba(24,24,27,0.06)] sm:p-6 lg:rounded-[2.25rem] lg:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="type-display text-[1.9rem] font-semibold text-zinc-950">
                Internet Losing Its Mind
                <span className="ml-1.5 text-[1.1rem] align-top text-[var(--color-brand)]">+</span>
              </h2>
              <p className="mt-1.5 text-[0.92rem] text-[var(--color-text-ui-muted)]">
                The most talked about moments right now.
              </p>
            </div>

            <Link
              href={marketPulseFeedPath}
              className="hidden min-h-11 items-center gap-2 rounded-full border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] px-4 text-[0.82rem] font-medium text-zinc-900 shadow-[0_10px_24px_rgba(24,24,27,0.04)] transition-colors hover:bg-[var(--color-brand-soft)] sm:inline-flex"
            >
              <span>View all</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10h12" />
                <path d="m11.5 4.5 5 5-5 5" />
              </svg>
            </Link>
          </div>

          <div className="relative mt-6">
            <div className="hidden md:absolute md:-left-5 md:top-1/2 md:z-20 md:block md:-translate-y-1/2">
              <ArrowButton
                direction="left"
                onClick={() => scrollRail("left")}
                disabled={!canScrollPrev}
              />
            </div>

            <div className="hidden md:absolute md:-right-5 md:top-1/2 md:z-20 md:block md:-translate-y-1/2">
              <ArrowButton
                direction="right"
                onClick={() => scrollRail("right")}
                disabled={!canScrollNext}
              />
            </div>

            <div
              ref={railRef}
              className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-0 lg:px-0"
            >
              {internetLosingMindCards.map((card) => (
                <div
                  key={card.id}
                  className="w-[17.5rem] shrink-0 snap-start sm:w-[19rem] md:w-[20.5rem] lg:w-[21rem] xl:w-[21.25rem]"
                >
                  <SocialCard card={card} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between sm:hidden">
            <div className="flex gap-2">
              <ArrowButton
                direction="left"
                onClick={() => scrollRail("left")}
                disabled={!canScrollPrev}
              />
              <ArrowButton
                direction="right"
                onClick={() => scrollRail("right")}
                disabled={!canScrollNext}
              />
            </div>

            <Link
              href={marketPulseFeedPath}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] px-4 text-[0.82rem] font-medium text-zinc-900 shadow-[0_10px_24px_rgba(24,24,27,0.04)]"
            >
              <span>View all</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10h12" />
                <path d="m11.5 4.5 5 5-5 5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
