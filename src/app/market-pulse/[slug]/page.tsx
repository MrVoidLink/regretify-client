import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketPulseStoryPage } from "@/features/market-pulse-story/components/MarketPulseStoryPage";
import { buildMarketPulseStoryMetadata } from "@/features/market-pulse-story/lib/seo";
import {
  getMarketPulseStoryBySlug,
  getMarketPulseStoryParams,
} from "@/features/market-pulse-story/lib/stories";

export async function generateStaticParams() {
  return getMarketPulseStoryParams();
}

export async function generateMetadata(
  props: PageProps<"/market-pulse/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const story = getMarketPulseStoryBySlug(slug);

  if (!story) {
    return {
      title: "Pulse Story Not Found | Regretify",
      description: "This Market Pulse story could not be found.",
    };
  }

  return buildMarketPulseStoryMetadata(story);
}

export default async function MarketPulseStoryRoute(
  props: PageProps<"/market-pulse/[slug]">,
) {
  const { slug } = await props.params;
  const story = getMarketPulseStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return <MarketPulseStoryPage story={story} />;
}
