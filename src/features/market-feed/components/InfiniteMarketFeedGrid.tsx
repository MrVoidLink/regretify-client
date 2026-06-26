"use client";

import { startTransition, useEffect, useEffectEvent, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { MarketFeedCardItem } from "@/features/market-feed/components/MarketFeedCard";
import { getMarketFeedCardsPage } from "@/features/market-feed/lib/feedPagination";
import type {
  MarketFeedCard,
  MarketFeedCategoryId,
  MarketFeedViewMode,
} from "@/features/market-feed/types";

type InfiniteMarketFeedGridProps = {
  initialCards: MarketFeedCard[];
  category: MarketFeedCategoryId;
  initialPage: number;
  totalPages: number;
  viewMode: MarketFeedViewMode;
};

export function InfiniteMarketFeedGrid({
  initialCards,
  category,
  initialPage,
  totalPages,
  viewMode,
}: InfiniteMarketFeedGridProps) {
  const [visibleCards, setVisibleCards] = useState(initialCards);
  const [loadedPage, setLoadedPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasMore = loadedPage < totalPages;

  const loadNextPage = useEffectEvent(async () => {
    if (isLoadingRef.current || !hasMore) {
      return;
    }

    isLoadingRef.current = true;
    setIsLoading(true);

    const nextPage = loadedPage + 1;
    const nextCards = getMarketFeedCardsPage(nextPage, category);

    startTransition(() => {
      setVisibleCards((currentCards) => [...currentCards, ...nextCards]);
      setLoadedPage(nextPage);
    });

    isLoadingRef.current = false;
    setIsLoading(false);
  });

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadNextPage();
        }
      },
      {
        rootMargin: "0px 0px 720px 0px",
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadedPage]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (loadedPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(loadedPage));
    }

    const nextQuery = params.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

    window.history.replaceState(window.history.state, "", nextUrl);
  }, [loadedPage, pathname, searchParams]);

  return (
    <>
      <div
        className={`mt-5 ${
          viewMode === "grid"
            ? "grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3"
            : "grid gap-4"
        }`}
      >
        {visibleCards.map((card) => (
          <MarketFeedCardItem
            key={card.id}
            card={card}
            viewMode={viewMode}
            featuredStyle={viewMode === "grid" && card.kind === "article"}
          />
        ))}
      </div>

      <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />

      <div className="flex min-h-16 items-center justify-center">
        {hasMore ? (
          <p className="text-[0.82rem] text-zinc-400">
            {isLoading ? "Loading more stories..." : "Keep scrolling for more stories"}
          </p>
        ) : (
          <p className="text-[0.82rem] text-zinc-400">
            {visibleCards.length > 0
              ? "You&apos;ve reached the end of the pulse."
              : "No stories in this category yet."}
          </p>
        )}
      </div>
    </>
  );
}
