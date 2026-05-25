import type { Metadata } from "next";
import { MarketFeedPage } from "@/features/market-feed/components/MarketFeedPage";
import {
  getMarketFeedCardsThroughPage,
  getMarketFeedTotalPages,
  normalizeMarketFeedPage,
} from "@/features/market-feed/lib/feedPagination";
import { normalizeMarketFeedViewMode } from "@/features/market-feed/lib/feedQueryState";

export const metadata: Metadata = {
  title: "Pulse Feed | Regretify",
  description:
    "Browse the full Pulse Feed from Regretify's Market Pulse section, including stories, trends, and internet reactions.",
};

export default async function MarketPulseFeed(props: PageProps<"/market-pulse/feed">) {
  const query = await props.searchParams;
  const initialPage = normalizeMarketFeedPage(query.page);
  const initialViewMode = normalizeMarketFeedViewMode(query.view);

  return (
    <MarketFeedPage
      initialCards={getMarketFeedCardsThroughPage(initialPage)}
      initialPage={initialPage}
      totalPages={getMarketFeedTotalPages()}
      initialViewMode={initialViewMode}
    />
  );
}
