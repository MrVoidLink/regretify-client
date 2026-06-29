import { MarketPulseStoryRuntime } from "@/features/market-pulse-story/components/MarketPulseStoryRuntime";
import { buildMarketPulseStoryJsonLd } from "@/features/market-pulse-story/lib/seo";
import type { MarketPulseStory } from "@/features/market-pulse-story/types";
import type { MarketFeedArticleCard } from "@/features/market-feed/types";

export function MarketPulseStoryPage({
  story,
  feedStories,
}: {
  story: MarketPulseStory;
  feedStories: MarketFeedArticleCard[];
}) {
  const jsonLd = buildMarketPulseStoryJsonLd(story);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fcfbff_0%,#ffffff_24%,#ffffff_100%)] text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <MarketPulseStoryRuntime story={story} feedStories={feedStories} />
    </main>
  );
}
