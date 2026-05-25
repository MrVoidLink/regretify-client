import type {
  MarketMovementTimelineFilter,
  MarketMovementTimelineItem,
} from "@/features/market-movement/types";

export const marketMovementTimelineFilters: MarketMovementTimelineFilter[] = [
  { id: "all", label: "All", isActive: true },
  { id: "pump", label: "Pump" },
  { id: "dump", label: "Dump" },
  { id: "breakout", label: "Breakout" },
  { id: "whale", label: "Whale" },
];

export const marketMovementTimelineItems: MarketMovementTimelineItem[] = [
  {
    id: "timeline-doge",
    timeLabel: "12m ago",
    assetTicker: "DOGE",
    assetName: "Dogecoin",
    assetMark: "D",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#f7d067_0%,#d6a73b_100%)] text-white shadow-[0_10px_20px_rgba(214,167,59,0.22)]",
    changeLabel: "+38.4%",
    movementType: "pump",
    summary: "Dogecoin accelerated after meme-driven chatter spread across the feed.",
  },
  {
    id: "timeline-pepe",
    timeLabel: "18m ago",
    assetTicker: "PEPE",
    assetName: "Pepe",
    assetMark: "P",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#5fbe5b_0%,#2f8f3d_100%)] text-white shadow-[0_10px_20px_rgba(47,143,61,0.22)]",
    changeLabel: "+27.6%",
    movementType: "pump",
    summary: "PEPE caught a fresh bid as large buy orders stacked up on major exchanges.",
  },
  {
    id: "timeline-floki",
    timeLabel: "27m ago",
    assetTicker: "FLOKI",
    assetName: "Floki",
    assetMark: "F",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#ffcb6e_0%,#ff8f2b_100%)] text-white shadow-[0_10px_20px_rgba(255,143,43,0.22)]",
    changeLabel: "+21.7%",
    movementType: "pump",
    summary: "FLOKI extended higher after renewed partnership speculation hit social channels.",
  },
  {
    id: "timeline-btc",
    timeLabel: "31m ago",
    assetTicker: "BTC",
    assetName: "Bitcoin",
    assetMark: "B",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#ffb74d_0%,#ff7d0a_100%)] text-white shadow-[0_10px_20px_rgba(255,125,10,0.22)]",
    changeLabel: "+8.9%",
    movementType: "breakout",
    summary: "Bitcoin pushed through a key resistance pocket and triggered breakout momentum.",
  },
  {
    id: "timeline-sats",
    timeLabel: "47m ago",
    assetTicker: "1000SATS",
    assetName: "1000SATS",
    assetMark: "S",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#ffd58e_0%,#f28f12_100%)] text-white shadow-[0_10px_20px_rgba(242,143,18,0.22)]",
    changeLabel: "-18.3%",
    movementType: "dump",
    summary: "A fast wave of selling pressure hit 1000SATS after short-term momentum rolled over.",
  },
];
