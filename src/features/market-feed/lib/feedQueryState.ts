import type { MarketFeedViewMode } from "@/features/market-feed/types";

export function normalizeMarketFeedViewMode(
  input: string | string[] | undefined,
): MarketFeedViewMode {
  const raw = Array.isArray(input) ? input[0] : input;

  if (raw === "list") {
    return "list";
  }

  return "grid";
}
