import { getMarketPulseStoryPath } from "@/features/market-pulse/lib/routes";
import type { MarketFeedArticleCard } from "@/features/market-feed/types";

export function getMarketPulseStoryPathFromCard(card: MarketFeedArticleCard) {
  return getMarketPulseStoryPath(card.slug);
}
