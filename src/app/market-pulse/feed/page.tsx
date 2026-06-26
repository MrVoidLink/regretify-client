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
import { marketPulsePath } from "@/features/market-pulse/lib/routes";

export const metadata: Metadata = {
  title: "Pulse Feed Archive | Regretify",
  description:
    "Secondary Pulse Feed route for Regretify. The canonical Market Pulse feed lives on /market-pulse.",
  alternates: {
    canonical: marketPulsePath,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function MarketPulseFeed(props: PageProps<"/market-pulse/feed">) {
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
