import type { MarketMovementExploreMoreItem } from "@/features/market-movement/types";
import { marketPulsePath } from "@/features/market-pulse/lib/routes";

export const marketMovementExploreMoreItems: MarketMovementExploreMoreItem[] = [
  {
    id: "trending-stories",
    title: "Trending Stories",
    description: "See what is moving the market right now.",
    href: marketPulsePath,
    icon: "stories",
  },
  {
    id: "regret-calculator",
    title: "Regret Calculator",
    description: "Calculate your missed opportunities in seconds.",
    href: "/",
    icon: "calculator",
  },
  {
    id: "big-moves",
    title: "Big Moves",
    description: "Track fresh breakouts, dumps, and momentum spikes.",
    href: "/market-movement",
    icon: "moves",
  },
  {
    id: "whale-watching",
    title: "Whale Watching",
    description: "Follow large wallets and unusual activity flows.",
    href: "/market-movement",
    icon: "whale",
  },
];
