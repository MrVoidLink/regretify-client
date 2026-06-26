"use client";

import { useEffect, useRef, useState } from "react";
import type { MarketPulseStoryReaction } from "@/features/market-pulse-story/types";

export function MarketPulseStoryReactionStrip({
  reactions,
}: {
  reactions: MarketPulseStoryReaction[];
}) {
  const [selectedReaction, setSelectedReaction] = useState(reactions[0]?.label ?? "");
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Partial<Record<string, HTMLButtonElement | null>>>({});
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const slider = sliderRef.current;
    const card = cardRefs.current[selectedReaction];

    if (!slider || !card) {
      return;
    }

    if (window.innerWidth >= 768) {
      return;
    }

    card.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [selectedReaction]);

  return (
    <>
      <div
        ref={sliderRef}
        className="scrollbar-none -mx-1 mt-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 xl:hidden"
      >
        {reactions.map((reaction) => {
          const isSelected = reaction.label === selectedReaction;

          return (
            <button
              key={reaction.label}
              ref={(element) => {
                cardRefs.current[reaction.label] = element;
              }}
              type="button"
              onClick={() => setSelectedReaction(reaction.label)}
              className={`flex min-h-[4.35rem] min-w-[6.6rem] shrink-0 snap-center flex-col items-center justify-center rounded-[0.95rem] border px-2 py-2 text-center shadow-[0_8px_20px_rgba(24,24,27,0.04)] transition-colors ${
                isSelected
                  ? "border-[color:var(--color-brand-border)] bg-[linear-gradient(180deg,var(--color-brand-soft)_0%,var(--color-brand-soft-strong)_100%)]"
                  : "border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] hover:border-[color:var(--color-border-ui-strong)] hover:bg-[var(--color-brand-soft)]"
              }`}
            >
              <span className="text-[1.05rem] leading-none">{reaction.emoji}</span>
              <span className="mt-1 text-[0.78rem] font-semibold text-zinc-950">
                {reaction.label}
              </span>
              <span className="mt-0.5 text-[0.72rem] text-[var(--color-text-ui-muted)]">{reaction.countLabel}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 hidden grid-cols-2 gap-3 xl:grid xl:grid-cols-5">
        {reactions.map((reaction) => (
          <button
            key={reaction.label}
            type="button"
            className="flex min-h-[5.4rem] flex-col items-center justify-center rounded-[0.95rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] px-4 py-3 text-center shadow-[0_8px_20px_rgba(24,24,27,0.04)] transition-colors hover:border-[color:var(--color-border-ui-strong)] hover:bg-[var(--color-brand-soft)]"
          >
            <span className="text-[1.5rem] leading-none">{reaction.emoji}</span>
            <span className="mt-2 text-[0.96rem] font-semibold text-zinc-950">
              {reaction.label}
            </span>
            <span className="mt-1 text-[0.88rem] text-[var(--color-text-ui-muted)]">{reaction.countLabel}</span>
          </button>
        ))}
      </div>
    </>
  );
}
