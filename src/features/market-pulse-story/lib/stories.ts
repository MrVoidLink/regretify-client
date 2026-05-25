import { marketFeedCards } from "@/features/market-feed/data/feedItems";
import type { MarketFeedArticleCard } from "@/features/market-feed/types";
import type { MarketPulseStory } from "@/features/market-pulse-story/types";

function slugifyMarketPulseStoryTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getMarketPulseStorySuffix(id: string) {
  const idParts = id.split("-");
  const possibleSuffix = idParts.at(-1);

  if (!possibleSuffix) {
    return null;
  }

  return /^[0-9]+$/.test(possibleSuffix) ? possibleSuffix : null;
}

function isMarketFeedArticleCard(card: (typeof marketFeedCards)[number]): card is MarketFeedArticleCard {
  return card.kind === "article";
}

function toMarketPulseStory(card: MarketFeedArticleCard): MarketPulseStory {
  const suffix = getMarketPulseStorySuffix(card.id);
  const baseSlug = slugifyMarketPulseStoryTitle(card.title);

  return {
    ...card,
    slug: suffix ? `${baseSlug}-${suffix}` : baseSlug,
  };
}

const marketPulseStories = marketFeedCards
  .filter(isMarketFeedArticleCard)
  .map(toMarketPulseStory);

export function getMarketPulseStories() {
  return marketPulseStories;
}

export function getMarketPulseStoryBySlug(slug: string) {
  return marketPulseStories.find((story) => story.slug === slug);
}

export function getMarketPulseStoryParams() {
  return marketPulseStories.map((story) => ({
    slug: story.slug,
  }));
}
