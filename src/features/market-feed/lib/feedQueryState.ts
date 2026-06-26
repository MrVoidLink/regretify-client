import type { MarketFeedCategoryId, MarketFeedViewMode } from "@/features/market-feed/types";

export function normalizeMarketFeedViewMode(
  input: string | string[] | undefined,
): MarketFeedViewMode {
  const raw = Array.isArray(input) ? input[0] : input;

  if (raw === "list") {
    return "list";
  }

  return "grid";
}

const validCategoryIds = new Set<MarketFeedCategoryId>([
  "all",
  "crypto",
  "stocks",
  "memes",
  "macro",
  "people",
  "tech",
  "defi",
]);

export function normalizeMarketFeedCategory(
  input: string | string[] | undefined,
): MarketFeedCategoryId {
  const raw = Array.isArray(input) ? input[0] : input;

  if (raw && validCategoryIds.has(raw as MarketFeedCategoryId)) {
    return raw as MarketFeedCategoryId;
  }

  return "all";
}
