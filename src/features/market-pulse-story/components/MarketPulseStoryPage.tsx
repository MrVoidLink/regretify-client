import { MarketPulseStoryBody } from "@/features/market-pulse-story/components/MarketPulseStoryBody";
import { MarketPulseStoryTopShell } from "@/features/market-pulse-story/components/MarketPulseStoryTopShell";
import { buildMarketPulseStoryJsonLd } from "@/features/market-pulse-story/lib/seo";
import type { MarketPulseStory } from "@/features/market-pulse-story/types";

export function MarketPulseStoryPage({ story }: { story: MarketPulseStory }) {
  const jsonLd = buildMarketPulseStoryJsonLd(story);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fcfbff_0%,#ffffff_24%,#ffffff_100%)] text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <article className="mx-auto flex min-h-screen w-full max-w-[96rem] flex-col gap-7 px-4 pt-2 pb-6 sm:px-6 sm:pt-2.5 sm:pb-8 lg:px-8 lg:pt-3 lg:pb-10">
        <MarketPulseStoryTopShell story={story} />
        <MarketPulseStoryBody story={story} />
      </article>
    </main>
  );
}
