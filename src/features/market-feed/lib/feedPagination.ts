import { marketFeedEntries } from "@/features/market-feed/data/feedItems";
import type { MarketFeedCard } from "@/features/market-feed/types";

export const MARKET_FEED_PAGE_SIZE = 12;

export function getMarketFeedTotalPages() {
  return Math.ceil(marketFeedEntries.length / MARKET_FEED_PAGE_SIZE);
}

export function normalizeMarketFeedPage(input: string | string[] | undefined) {
  const raw = Array.isArray(input) ? input[0] : input;
  const page = Number.parseInt(raw ?? "1", 10);

  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return Math.min(page, getMarketFeedTotalPages());
}

export function getMarketFeedCardsPage(page: number): MarketFeedCard[] {
  const currentPage = Math.min(Math.max(page, 1), getMarketFeedTotalPages());
  const start = (currentPage - 1) * MARKET_FEED_PAGE_SIZE;

  return marketFeedEntries.slice(start, start + MARKET_FEED_PAGE_SIZE);
}

export function getMarketFeedCardsThroughPage(page: number): MarketFeedCard[] {
  const currentPage = Math.min(Math.max(page, 1), getMarketFeedTotalPages());

  return marketFeedEntries.slice(0, currentPage * MARKET_FEED_PAGE_SIZE);
}
