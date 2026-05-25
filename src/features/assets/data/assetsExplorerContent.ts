import type {
  AssetsCategoryChip,
  AssetsExplorerRow,
  AssetsTrendingItem,
} from "@/features/assets/types";

export const assetsExplorerChips: AssetsCategoryChip[] = [
  { id: "all", label: "All", isActive: true },
  { id: "crypto", label: "Crypto" },
  { id: "stocks", label: "Stocks" },
  { id: "commodities", label: "Commodities" },
  { id: "trending", label: "Trending" },
  { id: "new", label: "New" },
];

export const assetsExplorerRows: AssetsExplorerRow[] = [
  {
    id: "btc",
    ticker: "BTC",
    name: "Bitcoin",
    categoryLabel: "Crypto",
    categoryTone: "violet",
    priceLabel: "$72,517.90",
    dailyChangeLabel: "+8.9%",
    marketCapLabel: "$1.43T",
    popularityPath:
      "M0 30 C10 28 16 18 24 21 C31 24 40 14 48 16 C56 18 64 13 72 8 C80 3 88 10 96 7 C104 4 112 12 120 6",
    mark: "B",
    markClassName:
      "bg-[linear-gradient(180deg,#ffb74d_0%,#ff7d0a_100%)] text-white shadow-[0_10px_22px_rgba(255,125,10,0.22)]",
  },
  {
    id: "eth",
    ticker: "ETH",
    name: "Ethereum",
    categoryLabel: "Crypto",
    categoryTone: "violet",
    priceLabel: "$3,812.45",
    dailyChangeLabel: "+6.2%",
    marketCapLabel: "$458.6B",
    popularityPath:
      "M0 28 C10 26 18 12 28 15 C36 18 44 10 54 13 C62 15 70 7 80 8 C90 9 98 19 108 10 C114 6 118 8 120 4",
    mark: "E",
    markClassName:
      "bg-[linear-gradient(180deg,#556180_0%,#1e2433_100%)] text-white shadow-[0_10px_22px_rgba(30,36,51,0.22)]",
  },
  {
    id: "sol",
    ticker: "SOL",
    name: "Solana",
    categoryLabel: "Crypto",
    categoryTone: "violet",
    priceLabel: "$181.67",
    dailyChangeLabel: "+7.1%",
    marketCapLabel: "$82.1B",
    popularityPath:
      "M0 29 C9 19 18 24 28 16 C36 10 44 18 52 15 C62 12 70 4 80 8 C92 13 102 6 112 9 C116 10 119 6 120 5",
    mark: "S",
    markClassName:
      "bg-[linear-gradient(180deg,#2b2b39_0%,#8b5cf6_100%)] text-white shadow-[0_10px_22px_rgba(139,92,246,0.22)]",
  },
  {
    id: "doge",
    ticker: "DOGE",
    name: "Dogecoin",
    categoryLabel: "Crypto",
    categoryTone: "violet",
    priceLabel: "$0.1732",
    dailyChangeLabel: "+38.4%",
    marketCapLabel: "$25.0B",
    popularityPath:
      "M0 30 C10 29 17 27 26 24 C34 22 41 12 50 13 C58 14 67 20 76 16 C84 12 93 10 102 6 C109 3 116 4 120 1",
    mark: "D",
    markClassName:
      "bg-[linear-gradient(180deg,#efcf73_0%,#d8ab30_100%)] text-zinc-950 shadow-[0_10px_22px_rgba(216,171,48,0.22)]",
  },
  {
    id: "tsla",
    ticker: "TSLA",
    name: "Tesla",
    categoryLabel: "Stock",
    categoryTone: "blue",
    priceLabel: "$182.63",
    dailyChangeLabel: "-2.3%",
    marketCapLabel: "$580.8B",
    popularityPath:
      "M0 6 C10 10 20 22 30 20 C38 18 46 26 56 24 C66 22 75 30 86 28 C96 26 104 10 114 18 C117 20 119 17 120 14",
    mark: "T",
    markClassName:
      "bg-[linear-gradient(180deg,#ff8b8b_0%,#ef4444_100%)] text-white shadow-[0_10px_22px_rgba(239,68,68,0.2)]",
  },
  {
    id: "nvda",
    ticker: "NVDA",
    name: "NVIDIA",
    categoryLabel: "Stock",
    categoryTone: "blue",
    priceLabel: "$1,024.31",
    dailyChangeLabel: "+3.6%",
    marketCapLabel: "$2.52T",
    popularityPath:
      "M0 24 C10 18 18 10 28 13 C36 16 46 11 56 13 C66 15 72 24 84 19 C94 15 102 11 112 8 C116 7 119 4 120 2",
    mark: "N",
    markClassName:
      "bg-[linear-gradient(180deg,#72c84d_0%,#249c3a_100%)] text-white shadow-[0_10px_22px_rgba(36,156,58,0.22)]",
  },
  {
    id: "gold",
    ticker: "GOLD",
    name: "Gold",
    categoryLabel: "Commodity",
    categoryTone: "amber",
    priceLabel: "$2,358.60",
    dailyChangeLabel: "+1.2%",
    marketCapLabel: "—",
    popularityPath:
      "M0 22 C8 18 17 12 26 14 C35 16 44 11 54 13 C64 15 72 9 82 10 C94 12 103 8 114 7 C117 6 119 4 120 3",
    mark: "G",
    markClassName:
      "bg-[linear-gradient(180deg,#f7d067_0%,#d9ac3d_100%)] text-white shadow-[0_10px_22px_rgba(217,172,61,0.2)]",
  },
  {
    id: "xrp",
    ticker: "XRP",
    name: "XRP",
    categoryLabel: "Crypto",
    categoryTone: "violet",
    priceLabel: "$0.63",
    dailyChangeLabel: "+4.8%",
    marketCapLabel: "$34.8B",
    popularityPath:
      "M0 25 C10 20 16 15 26 17 C35 19 42 11 52 12 C62 13 71 6 82 9 C92 12 102 8 112 6 C116 5 119 3 120 2",
    mark: "X",
    markClassName:
      "bg-[linear-gradient(180deg,#52525b_0%,#18181b_100%)] text-white shadow-[0_10px_22px_rgba(24,24,27,0.2)]",
  },
  {
    id: "ada",
    ticker: "ADA",
    name: "Cardano",
    categoryLabel: "Crypto",
    categoryTone: "violet",
    priceLabel: "$0.72",
    dailyChangeLabel: "+5.1%",
    marketCapLabel: "$25.5B",
    popularityPath:
      "M0 27 C8 23 15 25 24 18 C34 10 42 15 52 12 C62 9 70 14 80 10 C92 6 102 8 112 5 C116 4 119 3 120 2",
    mark: "A",
    markClassName:
      "bg-[linear-gradient(180deg,#5b7fff_0%,#2563eb_100%)] text-white shadow-[0_10px_22px_rgba(37,99,235,0.2)]",
  },
  {
    id: "pepe",
    ticker: "PEPE",
    name: "Pepe",
    categoryLabel: "Crypto",
    categoryTone: "violet",
    priceLabel: "$0.000013",
    dailyChangeLabel: "+27.6%",
    marketCapLabel: "$5.4B",
    popularityPath:
      "M0 28 C8 24 16 26 24 19 C34 10 43 16 52 11 C62 6 70 9 82 6 C94 3 103 5 114 3 C117 2 119 1 120 0.5",
    mark: "P",
    markClassName:
      "bg-[linear-gradient(180deg,#74d86d_0%,#2ea043_100%)] text-white shadow-[0_10px_22px_rgba(46,160,67,0.22)]",
  },
  {
    id: "shib",
    ticker: "SHIB",
    name: "Shiba Inu",
    categoryLabel: "Crypto",
    categoryTone: "violet",
    priceLabel: "$0.000024",
    dailyChangeLabel: "+18.2%",
    marketCapLabel: "$14.1B",
    popularityPath:
      "M0 29 C10 27 17 21 26 22 C34 23 44 12 54 11 C63 10 72 16 82 10 C91 5 101 8 112 4 C116 3 119 2 120 1",
    mark: "S",
    markClassName:
      "bg-[linear-gradient(180deg,#ff9248_0%,#ef4444_100%)] text-white shadow-[0_10px_22px_rgba(239,68,68,0.2)]",
  },
  {
    id: "wif",
    ticker: "WIF",
    name: "dogwifhat",
    categoryLabel: "Crypto",
    categoryTone: "violet",
    priceLabel: "$2.84",
    dailyChangeLabel: "+14.4%",
    marketCapLabel: "$2.8B",
    popularityPath:
      "M0 26 C10 22 18 18 28 14 C38 10 48 15 58 11 C70 6 80 8 92 7 C102 6 111 3 120 2",
    mark: "W",
    markClassName:
      "bg-[linear-gradient(180deg,#f4d7a1_0%,#8b5e3c_100%)] text-white shadow-[0_10px_22px_rgba(139,94,60,0.2)]",
  },
  {
    id: "aapl",
    ticker: "AAPL",
    name: "Apple",
    categoryLabel: "Stock",
    categoryTone: "blue",
    priceLabel: "$213.55",
    dailyChangeLabel: "+1.9%",
    marketCapLabel: "$3.25T",
    popularityPath:
      "M0 21 C10 18 18 20 28 15 C36 11 44 12 54 10 C64 8 73 13 82 9 C92 5 103 6 114 4 C117 3 119 2 120 2",
    mark: "A",
    markClassName:
      "bg-[linear-gradient(180deg,#9ca3af_0%,#111827_100%)] text-white shadow-[0_10px_22px_rgba(17,24,39,0.2)]",
  },
  {
    id: "msft",
    ticker: "MSFT",
    name: "Microsoft",
    categoryLabel: "Stock",
    categoryTone: "blue",
    priceLabel: "$428.14",
    dailyChangeLabel: "+2.4%",
    marketCapLabel: "$3.18T",
    popularityPath:
      "M0 24 C10 20 18 16 28 17 C37 18 45 10 55 11 C65 12 73 8 84 6 C94 4 104 5 114 3 C117 2 119 2 120 1",
    mark: "M",
    markClassName:
      "bg-[linear-gradient(180deg,#60a5fa_0%,#2563eb_100%)] text-white shadow-[0_10px_22px_rgba(37,99,235,0.2)]",
  },
  {
    id: "silver",
    ticker: "SILV",
    name: "Silver",
    categoryLabel: "Commodity",
    categoryTone: "amber",
    priceLabel: "$31.42",
    dailyChangeLabel: "+0.8%",
    marketCapLabel: "—",
    popularityPath:
      "M0 23 C10 21 18 18 28 19 C36 20 45 14 55 13 C65 12 74 15 84 11 C94 7 104 8 114 6 C117 5 119 4 120 4",
    mark: "S",
    markClassName:
      "bg-[linear-gradient(180deg,#d4d4d8_0%,#71717a_100%)] text-white shadow-[0_10px_22px_rgba(113,113,122,0.18)]",
  },
];

export const assetsTrendingItems: AssetsTrendingItem[] = [
  {
    id: "pepe",
    ticker: "PEPE",
    name: "Pepe",
    moveLabel: "+27.6%",
    mark: "P",
    markClassName:
      "bg-[linear-gradient(180deg,#74d86d_0%,#2ea043_100%)] text-white shadow-[0_10px_22px_rgba(46,160,67,0.22)]",
  },
  {
    id: "shib",
    ticker: "SHIB",
    name: "Shiba Inu",
    moveLabel: "+18.2%",
    mark: "S",
    markClassName:
      "bg-[linear-gradient(180deg,#ff9248_0%,#ef4444_100%)] text-white shadow-[0_10px_22px_rgba(239,68,68,0.2)]",
  },
  {
    id: "sol",
    ticker: "SOL",
    name: "Solana",
    moveLabel: "+7.1%",
    mark: "S",
    markClassName:
      "bg-[linear-gradient(180deg,#2b2b39_0%,#8b5cf6_100%)] text-white shadow-[0_10px_22px_rgba(139,92,246,0.22)]",
  },
];
