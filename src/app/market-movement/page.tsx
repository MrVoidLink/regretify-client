import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketMovementPage } from "@/features/market-movement/components/MarketMovementPage";
import { productFlags } from "@/lib/productFlags";

export const metadata: Metadata = {
  title: "Market Movement | Regretify",
  description:
    "Track the biggest market moves, explosive gainers, and sharp reversals in one Regretify movement view.",
};

export default function MarketMovementRoute() {
  if (!productFlags.marketMovementEnabled) {
    notFound();
  }

  return <MarketMovementPage />;
}
