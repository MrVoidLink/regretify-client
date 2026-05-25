import type { Metadata } from "next";
import { AssetSelectionPage } from "@/features/calculator/components/AssetSelectionPage";
import { calculatorMarkets } from "@/features/calculator/data/markets";
import type { CalculatorMarketId } from "@/features/calculator/types";

export const metadata: Metadata = {
  title: "Choose Asset | Regretify",
  description:
    "Post-mini-game asset selection step for the Regretify calculator flow.",
};

function getInitialMarketId(rawMarket: string | string[] | undefined): CalculatorMarketId {
  if (typeof rawMarket !== "string") {
    return calculatorMarkets.find((market) => market.isSelected)?.id ?? calculatorMarkets[0].id;
  }

  const matchedMarket = calculatorMarkets.find((market) => market.id === rawMarket);

  return matchedMarket?.id ?? calculatorMarkets[0].id;
}

export default async function AssetSelectionRoute({
  searchParams,
}: {
  searchParams: Promise<{ market?: string | string[] }>;
}) {
  const resolvedSearchParams = await searchParams;

  return <AssetSelectionPage initialMarketId={getInitialMarketId(resolvedSearchParams.market)} />;
}
