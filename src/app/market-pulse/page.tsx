import type { Metadata } from "next";
import { MarketPulsePage } from "@/features/market-pulse/components/MarketPulsePage";

export const metadata: Metadata = {
  title: "Market Pulse | Regretify",
  description:
    "Browse playful, curiosity-driven market stories, weird moves, and accessible explainers from Regretify.",
};

export default function MarketPulse() {
  return <MarketPulsePage />;
}
