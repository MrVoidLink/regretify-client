import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketPulseStoryPage } from "@/features/market-pulse-story/components/MarketPulseStoryPage";
import { buildMarketPulseStoryMetadata } from "@/features/market-pulse-story/lib/seo";
import {
  fetchMarketPulseFeed,
  fetchMarketPulseStory,
  toMarketFeedArticleCard,
  toMarketPulseStory,
} from "@/features/market-pulse/lib/publicApi";

export async function generateMetadata(
  props: PageProps<"/market-pulse/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  try {
    const story = toMarketPulseStory(await fetchMarketPulseStory(slug));
    return buildMarketPulseStoryMetadata(story);
  } catch {
    return {
      title: "Pulse Story Not Found | Regretify",
      description: "This Market Pulse story could not be found.",
    };
  }
}

export default async function MarketPulseStoryRoute(
  props: PageProps<"/market-pulse/[slug]">,
) {
  const { slug } = await props.params;

  try {
    const [storyPayload, feedPayload] = await Promise.all([
      fetchMarketPulseStory(slug),
      fetchMarketPulseFeed({ page: 1, limit: 12 }),
    ]);

    return (
      <MarketPulseStoryPage
        story={toMarketPulseStory(storyPayload)}
        feedStories={feedPayload.items.map(toMarketFeedArticleCard)}
      />
    );
  } catch {
    notFound();
  }
}
