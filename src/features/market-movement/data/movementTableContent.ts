import type {
  MarketMovementFilter,
  MarketMovementTableRow,
  MarketMovementTimeRange,
} from "@/features/market-movement/types";

export const marketMovementFilters: MarketMovementFilter[] = [
  { id: "all", label: "All Moves", tone: "all", isActive: true },
  { id: "pump", label: "Pump", tone: "pump" },
  { id: "dump", label: "Dump", tone: "dump" },
  { id: "breakout", label: "Breakout", tone: "breakout" },
  { id: "liquidation", label: "Liquidation", tone: "liquidation" },
  { id: "whale", label: "Whale Activity", tone: "whale" },
];

export const marketMovementTimeRange: MarketMovementTimeRange = {
  label: "24H",
};

export const marketMovementTableRows: MarketMovementTableRow[] = [
  {
    id: "doge",
    assetTicker: "DOGE",
    assetName: "Dogecoin",
    assetMark: "D",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#f7d067_0%,#d6a73b_100%)] text-white shadow-[0_10px_22px_rgba(214,167,59,0.28)]",
    movementType: "pump",
    changeLabel: "+38.4%",
    priceLabel: "$0.1732",
    volumeLabel: "$2.14B",
    timeLabel: "12m ago",
    chartTone: "green",
    chartPath:
      "M0 34 C7 34 12 24 18 28 C24 32 30 20 38 21 C46 22 50 29 58 24 C64 20 68 12 76 16 C84 20 92 9 101 13 C108 16 116 8 124 10",
  },
  {
    id: "pepe",
    assetTicker: "PEPE",
    assetName: "Pepe",
    assetMark: "P",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#5fbe5b_0%,#2f8f3d_100%)] text-white shadow-[0_10px_22px_rgba(47,143,61,0.26)]",
    movementType: "pump",
    changeLabel: "+27.6%",
    priceLabel: "$0.00001342",
    volumeLabel: "$1.48B",
    timeLabel: "18m ago",
    chartTone: "green",
    chartPath:
      "M0 38 C8 34 14 36 22 30 C30 24 37 28 45 19 C54 10 61 12 68 18 C76 24 82 19 90 12 C96 8 104 11 112 8 C118 6 122 2 124 3",
  },
  {
    id: "floki",
    assetTicker: "FLOKI",
    assetName: "Floki",
    assetMark: "F",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#ffcb6e_0%,#ff8f2b_100%)] text-white shadow-[0_10px_22px_rgba(255,143,43,0.24)]",
    movementType: "pump",
    changeLabel: "+21.7%",
    priceLabel: "$0.000235",
    volumeLabel: "$684M",
    timeLabel: "27m ago",
    chartTone: "green",
    chartPath:
      "M0 40 C7 38 14 31 22 33 C28 35 34 28 40 24 C48 19 56 24 64 18 C72 12 80 16 87 10 C94 6 102 13 109 9 C116 5 120 7 124 4",
  },
  {
    id: "btc",
    assetTicker: "BTC",
    assetName: "Bitcoin",
    assetMark: "B",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#ffb74d_0%,#ff7d0a_100%)] text-white shadow-[0_10px_22px_rgba(255,125,10,0.24)]",
    movementType: "breakout",
    changeLabel: "+8.9%",
    priceLabel: "$72,517.90",
    volumeLabel: "$28.6B",
    timeLabel: "31m ago",
    chartTone: "violet",
    chartPath:
      "M0 32 C8 31 15 25 22 22 C30 19 38 16 47 18 C56 20 63 9 71 11 C78 13 86 20 94 18 C102 16 108 22 116 17 C120 14 123 18 124 20",
  },
  {
    id: "eth",
    assetTicker: "ETH",
    assetName: "Ethereum",
    assetMark: "E",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#556180_0%,#1e2433_100%)] text-white shadow-[0_10px_22px_rgba(30,36,51,0.24)]",
    movementType: "breakout",
    changeLabel: "+6.2%",
    priceLabel: "$3,812.45",
    volumeLabel: "$17.2B",
    timeLabel: "42m ago",
    chartTone: "violet",
    chartPath:
      "M0 36 C10 33 18 28 25 30 C33 32 40 22 48 20 C56 18 65 11 73 12 C81 13 89 21 97 18 C105 15 115 9 124 12",
  },
  {
    id: "sats",
    assetTicker: "1000SATS",
    assetName: "1000SATS",
    assetMark: "S",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#ffd58e_0%,#f28f12_100%)] text-white shadow-[0_10px_22px_rgba(242,143,18,0.24)]",
    movementType: "dump",
    changeLabel: "-18.3%",
    priceLabel: "$0.00019",
    volumeLabel: "$312M",
    timeLabel: "47m ago",
    chartTone: "red",
    chartPath:
      "M0 8 C7 10 16 17 24 14 C31 11 38 21 46 26 C53 31 61 29 69 35 C77 41 84 39 92 43 C102 48 112 44 124 47",
  },
  {
    id: "loka",
    assetTicker: "LOKA",
    assetName: "League of Kingdoms",
    assetMark: "L",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#1a2032_0%,#434f72_100%)] text-white shadow-[0_10px_22px_rgba(67,79,114,0.24)]",
    movementType: "dump",
    changeLabel: "-22.7%",
    priceLabel: "$0.1123",
    volumeLabel: "$194M",
    timeLabel: "1h ago",
    chartTone: "red",
    chartPath:
      "M0 10 C8 12 15 20 24 19 C33 18 40 30 50 31 C58 32 65 38 74 34 C82 31 91 39 102 40 C111 41 118 36 124 42",
  },
  {
    id: "arb",
    assetTicker: "ARB",
    assetName: "Arbitrum",
    assetMark: "A",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#5b7fff_0%,#1f5bd7_100%)] text-white shadow-[0_10px_22px_rgba(31,91,215,0.24)]",
    movementType: "whale",
    changeLabel: "+15.2%",
    priceLabel: "$1.24",
    volumeLabel: "$896M",
    timeLabel: "1h ago",
    chartTone: "blue",
    chartPath:
      "M0 38 C8 35 16 36 23 30 C31 24 38 28 46 27 C54 26 61 18 70 20 C80 22 89 10 98 12 C108 14 116 7 124 9",
  },
  {
    id: "sol",
    assetTicker: "SOL",
    assetName: "Solana",
    assetMark: "S",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#2b2b39_0%,#8b5cf6_100%)] text-white shadow-[0_10px_22px_rgba(139,92,246,0.24)]",
    movementType: "breakout",
    changeLabel: "+7.1%",
    priceLabel: "$181.67",
    volumeLabel: "$3.91B",
    timeLabel: "1h ago",
    chartTone: "violet",
    chartPath:
      "M0 34 C8 36 16 24 24 24 C30 24 38 19 45 16 C53 13 61 22 69 18 C78 14 87 7 95 11 C103 15 111 21 124 18",
  },
  {
    id: "wif",
    assetTicker: "WIF",
    assetName: "dogwifhat",
    assetMark: "W",
    assetMarkClassName:
      "bg-[linear-gradient(180deg,#f0ab74_0%,#9a5b31_100%)] text-white shadow-[0_10px_22px_rgba(154,91,49,0.24)]",
    movementType: "pump",
    changeLabel: "+16.8%",
    priceLabel: "$2.91",
    volumeLabel: "$567M",
    timeLabel: "1h ago",
    chartTone: "green",
    chartPath:
      "M0 40 C8 38 15 30 23 27 C30 24 38 16 46 18 C54 20 62 8 72 10 C82 12 90 22 99 18 C109 14 116 22 124 17",
  },
];
