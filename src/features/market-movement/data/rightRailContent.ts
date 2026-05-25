import type { MarketMovementWhaleActivityItem } from "@/features/market-movement/types";

export const marketMovementWhaleActivityItems: MarketMovementWhaleActivityItem[] = [
  {
    id: "eth-whale",
    whaleLabel: "ETH Whale",
    moveLabel: "Moved 12,500 ETH",
    timeLabel: "35m ago",
    assetMark: "E",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#556180_0%,#1e2433_100%)] text-white shadow-[0_10px_20px_rgba(30,36,51,0.22)]",
  },
  {
    id: "btc-whale",
    whaleLabel: "BTC Whale",
    moveLabel: "Moved 418 BTC",
    timeLabel: "1h ago",
    assetMark: "B",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#ffb74d_0%,#ff7d0a_100%)] text-white shadow-[0_10px_20px_rgba(255,125,10,0.22)]",
  },
  {
    id: "sol-whale",
    whaleLabel: "SOL Whale",
    moveLabel: "Moved 149,000 SOL",
    timeLabel: "2h ago",
    assetMark: "S",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#2b2b39_0%,#8b5cf6_100%)] text-white shadow-[0_10px_20px_rgba(139,92,246,0.22)]",
  },
];
