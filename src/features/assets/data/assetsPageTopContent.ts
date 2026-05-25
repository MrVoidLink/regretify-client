import type {
  AssetDirectoryItem,
  AssetsCategoryChip,
  AssetsHeroStat,
  FeaturedAssetCard,
} from "@/features/assets/types";

export const assetsHeroStats: AssetsHeroStat[] = [
  {
    id: "supported-assets",
    label: "Supported Assets",
    value: "250+",
    detail: "Across crypto, equities, and commodities",
    tone: "neutral",
  },
  {
    id: "most-watched",
    label: "Most Watched",
    value: "BTC",
    detail: "Still the regret benchmark",
    tone: "positive",
  },
  {
    id: "new-tracked",
    label: "New This Week",
    value: "18",
    detail: "Fresh additions to compare",
    tone: "positive",
  },
];

export const assetsCategoryChips: AssetsCategoryChip[] = [
  { id: "all", label: "All", isActive: true },
  { id: "crypto", label: "Crypto" },
  { id: "stocks", label: "Stocks" },
  { id: "commodities", label: "Commodities" },
  { id: "trending", label: "Trending" },
  { id: "new", label: "New" },
];

export const featuredAssetCards: FeaturedAssetCard[] = [
  {
    id: "btc",
    ticker: "BTC",
    name: "Bitcoin",
    subtitle: "The benchmark regret asset",
    priceLabel: "$72,517.90",
    moveLabel: "+8.9%",
    mark: "B",
    markClassName:
      "bg-[linear-gradient(180deg,#ffb74d_0%,#ff7d0a_100%)] text-white shadow-[0_12px_24px_rgba(255,125,10,0.22)]",
    chartPath:
      "M0 76 C16 70 24 58 38 61 C52 64 62 49 76 45 C90 41 101 28 116 31 C128 33 136 26 148 19 C162 11 175 14 190 8",
    tone: "green",
  },
  {
    id: "eth",
    ticker: "ETH",
    name: "Ethereum",
    subtitle: "Still defining cycle momentum",
    priceLabel: "$3,812.45",
    moveLabel: "+6.2%",
    mark: "E",
    markClassName:
      "bg-[linear-gradient(180deg,#556180_0%,#1e2433_100%)] text-white shadow-[0_12px_24px_rgba(30,36,51,0.22)]",
    chartPath:
      "M0 82 C14 79 28 66 42 63 C57 60 66 49 81 44 C96 39 107 47 122 39 C136 31 154 18 170 23 C179 26 186 23 190 18",
    tone: "violet",
  },
  {
    id: "nvda",
    ticker: "NVDA",
    name: "NVIDIA",
    subtitle: "The AI regret magnet",
    priceLabel: "$1,132.40",
    moveLabel: "+4.7%",
    mark: "N",
    markClassName:
      "bg-[linear-gradient(180deg,#72c84d_0%,#249c3a_100%)] text-white shadow-[0_12px_24px_rgba(36,156,58,0.22)]",
    chartPath:
      "M0 84 C12 84 19 69 31 67 C45 64 58 54 73 56 C86 58 97 49 112 42 C128 35 142 38 156 29 C168 21 181 25 190 15",
    tone: "green",
  },
];

export const assetDirectoryItems: AssetDirectoryItem[] = [
  {
    id: "btc",
    ticker: "BTC",
    name: "Bitcoin",
    marketLabel: "Crypto",
    regretAngle: "The benchmark missed-opportunity asset.",
    priceLabel: "$72,517.90",
    yearlyMoveLabel: "+148%",
    volatilityLabel: "High",
    mark: "B",
    markClassName:
      "bg-[linear-gradient(180deg,#ffb74d_0%,#ff7d0a_100%)] text-white shadow-[0_10px_22px_rgba(255,125,10,0.22)]",
  },
  {
    id: "eth",
    ticker: "ETH",
    name: "Ethereum",
    marketLabel: "Crypto",
    regretAngle: "Still defines cycle momentum and alt rotation.",
    priceLabel: "$3,812.45",
    yearlyMoveLabel: "+94%",
    volatilityLabel: "High",
    mark: "E",
    markClassName:
      "bg-[linear-gradient(180deg,#556180_0%,#1e2433_100%)] text-white shadow-[0_10px_22px_rgba(30,36,51,0.22)]",
  },
  {
    id: "sol",
    ticker: "SOL",
    name: "Solana",
    marketLabel: "Crypto",
    regretAngle: "One of the fastest comeback stories of the cycle.",
    priceLabel: "$181.67",
    yearlyMoveLabel: "+612%",
    volatilityLabel: "High",
    mark: "S",
    markClassName:
      "bg-[linear-gradient(180deg,#2b2b39_0%,#8b5cf6_100%)] text-white shadow-[0_10px_22px_rgba(139,92,246,0.22)]",
  },
  {
    id: "nvda",
    ticker: "NVDA",
    name: "NVIDIA",
    marketLabel: "Stocks",
    regretAngle: "The AI trade people mention when talking about regret.",
    priceLabel: "$1,132.40",
    yearlyMoveLabel: "+221%",
    volatilityLabel: "Medium",
    mark: "N",
    markClassName:
      "bg-[linear-gradient(180deg,#72c84d_0%,#249c3a_100%)] text-white shadow-[0_10px_22px_rgba(36,156,58,0.22)]",
  },
  {
    id: "tsla",
    ticker: "TSLA",
    name: "Tesla",
    marketLabel: "Stocks",
    regretAngle: "A classic retail FOMO and missed-run conversation starter.",
    priceLabel: "$219.34",
    yearlyMoveLabel: "+37%",
    volatilityLabel: "High",
    mark: "T",
    markClassName:
      "bg-[linear-gradient(180deg,#ff8b8b_0%,#ef4444_100%)] text-white shadow-[0_10px_22px_rgba(239,68,68,0.2)]",
  },
  {
    id: "gold",
    ticker: "GOLD",
    name: "Gold",
    marketLabel: "Commodities",
    regretAngle: "The slow-burn hedge people ignore until it runs.",
    priceLabel: "$2,412.10",
    yearlyMoveLabel: "+18%",
    volatilityLabel: "Low",
    mark: "G",
    markClassName:
      "bg-[linear-gradient(180deg,#f7d067_0%,#d9ac3d_100%)] text-white shadow-[0_10px_22px_rgba(217,172,61,0.2)]",
  },
  {
    id: "xrp",
    ticker: "XRP",
    name: "XRP",
    marketLabel: "Crypto",
    regretAngle: "A volatile legacy name that keeps coming back into the story.",
    priceLabel: "$0.63",
    yearlyMoveLabel: "+24%",
    volatilityLabel: "Medium",
    mark: "X",
    markClassName:
      "bg-[linear-gradient(180deg,#52525b_0%,#18181b_100%)] text-white shadow-[0_10px_22px_rgba(24,24,27,0.2)]",
  },
  {
    id: "ada",
    ticker: "ADA",
    name: "Cardano",
    marketLabel: "Crypto",
    regretAngle: "A high-conviction community asset for what-if scenarios.",
    priceLabel: "$0.72",
    yearlyMoveLabel: "+41%",
    volatilityLabel: "Medium",
    mark: "A",
    markClassName:
      "bg-[linear-gradient(180deg,#5b7fff_0%,#2563eb_100%)] text-white shadow-[0_10px_22px_rgba(37,99,235,0.2)]",
  },
];
