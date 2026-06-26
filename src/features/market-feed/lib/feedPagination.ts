import { marketFeedEntries } from "@/features/market-feed/data/feedItems";
import type { MarketFeedCard, MarketFeedCategoryId } from "@/features/market-feed/types";

export const MARKET_FEED_PAGE_SIZE = 12;

function matchesCategory(card: MarketFeedCard, category: MarketFeedCategoryId) {
  if (category === "all") {
    return true;
  }

  if (card.kind !== "article") {
    return false;
  }

  return card.category.toLowerCase() === category;
}

function getFilteredMarketFeedEntries(category: MarketFeedCategoryId) {
  return marketFeedEntries.filter((card) => matchesCategory(card, category));
}

export function getMarketFeedTotalPages(category: MarketFeedCategoryId = "all") {
  return Math.max(1, Math.ceil(getFilteredMarketFeedEntries(category).length / MARKET_FEED_PAGE_SIZE));
}

export function normalizeMarketFeedPage(
  input: string | string[] | undefined,
  category: MarketFeedCategoryId = "all",
) {
  const raw = Array.isArray(input) ? input[0] : input;
  const page = Number.parseInt(raw ?? "1", 10);

  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return Math.min(page, getMarketFeedTotalPages(category));
}

export function getMarketFeedCardsPage(
  page: number,
  category: MarketFeedCategoryId = "all",
): MarketFeedCard[] {
  const filteredEntries = getFilteredMarketFeedEntries(category);
  const currentPage = Math.min(Math.max(page, 1), getMarketFeedTotalPages(category));
  const start = (currentPage - 1) * MARKET_FEED_PAGE_SIZE;

  return filteredEntries.slice(start, start + MARKET_FEED_PAGE_SIZE);
}

export function getMarketFeedCardsThroughPage(
  page: number,
  category: MarketFeedCategoryId = "all",
): MarketFeedCard[] {
  const filteredEntries = getFilteredMarketFeedEntries(category);
  const currentPage = Math.min(Math.max(page, 1), getMarketFeedTotalPages(category));

  return filteredEntries.slice(0, currentPage * MARKET_FEED_PAGE_SIZE);
}
