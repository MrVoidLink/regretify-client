import type { Metadata } from "next";
import { MarketMovementPage } from "@/features/market-movement/components/MarketMovementPage";

export const metadata: Metadata = {
  title: "Market Movement | Regretify",
  description:
    "Track the biggest market moves, explosive gainers, and sharp reversals in one Regretify movement view.",
};

export default function MarketMovementRoute() {
  return <MarketMovementPage />;
}
