import type { Metadata } from "next";
import { MarketFeedPage } from "@/features/market-feed/components/MarketFeedPage";
import {
  normalizeMarketFeedCategory,
  normalizeMarketFeedViewMode,
} from "@/features/market-feed/lib/feedQueryState";
import { marketPulsePath } from "@/features/market-pulse/lib/routes";
import {
  fetchMarketPulseFeedThroughPage,
  toMarketFeedArticleCard,
} from "@/features/market-pulse/lib/publicApi";

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

function normalizeMarketFeedPage(input: string | string[] | undefined) {
  const raw = Array.isArray(input) ? input[0] : input;
  const page = Number.parseInt(raw ?? "1", 10);

  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return page;
}

export default async function MarketPulseFeed(props: PageProps<"/market-pulse/feed">) {
  const query = await props.searchParams;
  const initialCategory = normalizeMarketFeedCategory(query.category);
  const requestedPage = normalizeMarketFeedPage(query.page);
  const initialViewMode = normalizeMarketFeedViewMode(query.view);
  const feedResponse = await fetchMarketPulseFeedThroughPage(requestedPage, initialCategory);
  const initialPage = Math.min(requestedPage, feedResponse.totalPages);

  return (
    <MarketFeedPage
      initialCards={feedResponse.items.map(toMarketFeedArticleCard)}
      initialCategory={initialCategory}
      initialPage={initialPage}
      totalPages={feedResponse.totalPages}
      initialViewMode={initialViewMode}
      summary={feedResponse.summary}
    />
  );
}
