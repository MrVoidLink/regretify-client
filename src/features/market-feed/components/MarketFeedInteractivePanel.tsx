"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { InfiniteMarketFeedGrid } from "@/features/market-feed/components/InfiniteMarketFeedGrid";
import { marketFeedCategories } from "@/features/market-feed/data/feedItems";
import type { MarketFeedCard, MarketFeedCategory, MarketFeedViewMode } from "@/features/market-feed/types";

function CategoryChip({ category }: { category: MarketFeedCategory }) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-10 items-center rounded-full px-4 text-[0.8rem] font-medium transition-colors ${
        category.isSelected
          ? "bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] text-white shadow-[0_12px_28px_rgba(90,40,223,0.22)]"
          : "border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] text-[var(--color-text-ui-soft)] hover:bg-[var(--color-brand-soft)]"
      }`}
    >
      {category.label}
    </button>
  );
}

function FeedToolbarButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[1rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] px-4 text-[0.8rem] font-medium text-zinc-900 shadow-[0_8px_20px_rgba(24,24,27,0.04)] transition-colors hover:bg-[var(--color-brand-soft)]"
    >
      <span>{label}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-4 w-4 text-zinc-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6.5 8 3.5 4 3.5-4" />
      </svg>
    </button>
  );
}

function ViewModeButton({
  mode,
  isActive,
  onClick,
}: {
  mode: MarketFeedViewMode;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={mode === "grid" ? "Grid view" : "List view"}
      aria-pressed={isActive}
      onClick={onClick}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-[1rem] shadow-[0_8px_20px_rgba(24,24,27,0.04)] transition-colors ${
        isActive
          ? "bg-[linear-gradient(180deg,var(--color-brand-soft)_0%,var(--color-brand-soft-strong)_100%)] text-[var(--color-brand-strong)]"
          : "border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] text-[var(--color-text-ui-muted)] hover:bg-[var(--color-brand-soft)]"
      }`}
    >
      {mode === "grid" ? (
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
          <path d="M4 5.5h4.5v4.5H4z" />
          <path d="M11.5 5.5H16v4.5h-4.5z" />
          <path d="M4 12h4.5v4.5H4z" />
          <path d="M11.5 12H16v4.5h-4.5z" />
        </svg>
      ) : (
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
          <path d="M5 6h10" />
          <path d="M5 10h10" />
          <path d="M5 14h10" />
        </svg>
      )}
    </button>
  );
}

type MarketFeedInteractivePanelProps = {
  initialCards: MarketFeedCard[];
  initialPage: number;
  totalPages: number;
  initialViewMode: MarketFeedViewMode;
};

export function MarketFeedInteractivePanel({
  initialCards,
  initialPage,
  totalPages,
  initialViewMode,
}: MarketFeedInteractivePanelProps) {
  const [viewMode, setViewMode] = useState<MarketFeedViewMode>(initialViewMode);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("view", viewMode);

    const nextQuery = params.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

    window.history.replaceState(window.history.state, "", nextUrl);
  }, [pathname, searchParams, viewMode]);

  return (
    <div className="rounded-[1.8rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(250,247,255,0.9)_100%)] p-4 shadow-[0_18px_48px_rgba(107,76,255,0.08)] backdrop-blur-sm sm:p-5 lg:rounded-[2rem] lg:p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-[42rem]">
          <h1 className="type-display text-[2.25rem] font-semibold text-zinc-950 sm:text-[2.6rem]">
            All Pulse
          </h1>

          <p className="mt-2.5 max-w-[40rem] text-[0.9rem] leading-6 text-[var(--color-text-ui-soft)]">
            Everything happening in the market and beyond, collected into one
            browseable feed.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start">
          <FeedToolbarButton label="Latest" />
          <button
            type="button"
            className="inline-flex min-h-10 items-center gap-2 rounded-[1rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] px-4 text-[0.8rem] font-medium text-zinc-900 shadow-[0_8px_20px_rgba(24,24,27,0.04)] transition-colors hover:bg-[var(--color-brand-soft)]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-4 w-4 text-zinc-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5.5h12" />
              <path d="M7 10h6" />
              <path d="M8.5 14.5h3" />
            </svg>
            <span>Filters</span>
          </button>
          <ViewModeButton
            mode="grid"
            isActive={viewMode === "grid"}
            onClick={() => setViewMode("grid")}
          />
          <ViewModeButton
            mode="list"
            isActive={viewMode === "list"}
            onClick={() => setViewMode("list")}
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="-mx-1 w-[calc(100%+0.5rem)] overflow-x-auto px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max min-w-full gap-2">
            {marketFeedCategories.map((category) => (
              <CategoryChip key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>

      <InfiniteMarketFeedGrid
        initialCards={initialCards}
        initialPage={initialPage}
        totalPages={totalPages}
        viewMode={viewMode}
      />
    </div>
  );
}
