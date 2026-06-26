import type { Metadata } from "next";
import { MarketFeedPage } from "@/features/market-feed/components/MarketFeedPage";
import {
  getMarketFeedCardsThroughPage,
  getMarketFeedTotalPages,
  normalizeMarketFeedPage,
} from "@/features/market-feed/lib/feedPagination";
import {
  normalizeMarketFeedCategory,
  normalizeMarketFeedViewMode,
} from "@/features/market-feed/lib/feedQueryState";

export const metadata: Metadata = {
  title: "Market Pulse | Regretify",
  description:
    "Browse the full Market Pulse feed from Regretify, including stories, trends, and internet reactions.",
  alternates: {
    canonical: "/market-pulse",
  },
};

export default async function MarketPulse(props: PageProps<"/market-pulse">) {
  const query = await props.searchParams;
  const initialCategory = normalizeMarketFeedCategory(query.category);
  const initialPage = normalizeMarketFeedPage(query.page, initialCategory);
  const initialViewMode = normalizeMarketFeedViewMode(query.view);

  return (
    <MarketFeedPage
      initialCards={getMarketFeedCardsThroughPage(initialPage, initialCategory)}
      initialCategory={initialCategory}
      initialPage={initialPage}
      totalPages={getMarketFeedTotalPages(initialCategory)}
      initialViewMode={initialViewMode}
    />
  );
}
