"use client";

import { useEffect, useState } from "react";
import { MarketPulseStoryBody } from "@/features/market-pulse-story/components/MarketPulseStoryBody";
import { MarketPulseStoryTopShell } from "@/features/market-pulse-story/components/MarketPulseStoryTopShell";
import type { MarketPulseStory } from "@/features/market-pulse-story/types";
import type { MarketFeedArticleCard } from "@/features/market-feed/types";

const VIEW_SESSION_KEY_PREFIX = "regretify:market-pulse:viewed:";

function formatCompactMetric(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function MarketPulseStoryRuntime({
  story,
  feedStories,
}: {
  story: MarketPulseStory;
  feedStories: MarketFeedArticleCard[];
}) {
  const [liveStory, setLiveStory] = useState(story);

  useEffect(() => {
    setLiveStory(story);
  }, [story]);

  useEffect(() => {
    const storageKey = `${VIEW_SESSION_KEY_PREFIX}${story.slug}`;

    if (typeof window === "undefined") {
      return;
    }

    if (window.sessionStorage.getItem(storageKey)) {
      return;
    }

    let isActive = true;

    async function recordView() {
      const response = await fetch(`/api/market-pulse/posts/${encodeURIComponent(story.slug)}/view`, {
        method: "POST",
        cache: "no-store",
      });

      const payload = (await response.json().catch(() => null)) as
        | { viewsCount?: number }
        | null;

      if (!response.ok || !payload?.viewsCount || !isActive) {
        return;
      }

      window.sessionStorage.setItem(storageKey, "1");
      setLiveStory((current) => ({
        ...current,
        viewsCount: payload.viewsCount ?? current.viewsCount,
        metrics: {
          ...current.metrics,
          views: formatCompactMetric(payload.viewsCount ?? current.viewsCount),
        },
      }));
    }

    void recordView();

    return () => {
      isActive = false;
    };
  }, [story.slug]);

  return (
    <article className="mx-auto flex min-h-screen w-full max-w-[96rem] flex-col gap-7 px-4 pt-2 pb-6 sm:px-6 sm:pt-2.5 sm:pb-8 lg:px-8 lg:pt-3 lg:pb-10">
      <MarketPulseStoryTopShell story={liveStory} />
      <MarketPulseStoryBody story={liveStory} feedStories={feedStories} />
    </article>
  );
}
