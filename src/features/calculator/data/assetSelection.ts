import type { AssetSelectionAsset } from "@/features/calculator/types";

export const assetSelectionAssets: AssetSelectionAsset[] = [
  { rank: 1, name: "Bitcoin", ticker: "BTC", currentPrice: "$118,420", dayChangePercent: "+2.84%", upside: "+12,540%", isSelected: true },
  { rank: 2, name: "Ethereum", ticker: "ETH", currentPrice: "$6,140", dayChangePercent: "+3.27%", upside: "+8,230%", isSelected: false },
  { rank: 3, name: "Solana", ticker: "SOL", currentPrice: "$292.14", dayChangePercent: "+5.91%", upside: "+5,320%", isSelected: false },
  { rank: 4, name: "BNB", ticker: "BNB", currentPrice: "$1,084.30", dayChangePercent: "+1.42%", upside: "+2,890%", isSelected: false },
  { rank: 5, name: "XRP", ticker: "XRP", currentPrice: "$3.92", dayChangePercent: "-1.18%", upside: "+1,980%", isSelected: false },
  { rank: 6, name: "Dogecoin", ticker: "DOGE", currentPrice: "$0.41", dayChangePercent: "+7.36%", upside: "+1,720%", isSelected: false },
  { rank: 7, name: "Avalanche", ticker: "AVAX", currentPrice: "$67.84", dayChangePercent: "+4.62%", upside: "+1,450%", isSelected: false },
  { rank: 8, name: "Chainlink", ticker: "LINK", currentPrice: "$38.56", dayChangePercent: "+2.21%", upside: "+1,270%", isSelected: false },
  { rank: 9, name: "Cardano", ticker: "ADA", currentPrice: "$1.76", dayChangePercent: "-0.74%", upside: "+1,180%", isSelected: false },
  { rank: 10, name: "Polkadot", ticker: "DOT", currentPrice: "$18.24", dayChangePercent: "+1.09%", upside: "+1,060%", isSelected: false },
  { rank: 11, name: "Toncoin", ticker: "TON", currentPrice: "$14.92", dayChangePercent: "+3.88%", upside: "+940%", isSelected: false },
  { rank: 12, name: "TRON", ticker: "TRX", currentPrice: "$0.39", dayChangePercent: "+0.64%", upside: "+870%", isSelected: false },
  { rank: 13, name: "Litecoin", ticker: "LTC", currentPrice: "$214.71", dayChangePercent: "-1.46%", upside: "+790%", isSelected: false },
  { rank: 14, name: "Stellar", ticker: "XLM", currentPrice: "$0.61", dayChangePercent: "+2.57%", upside: "+760%", isSelected: false },
  { rank: 15, name: "Aptos", ticker: "APT", currentPrice: "$21.44", dayChangePercent: "+4.18%", upside: "+720%", isSelected: false },
  { rank: 16, name: "Sui", ticker: "SUI", currentPrice: "$7.98", dayChangePercent: "+6.03%", upside: "+690%", isSelected: false },
  { rank: 17, name: "Uniswap", ticker: "UNI", currentPrice: "$24.35", dayChangePercent: "-2.11%", upside: "+650%", isSelected: false },
  { rank: 18, name: "NEAR", ticker: "NEAR", currentPrice: "$15.66", dayChangePercent: "+1.94%", upside: "+620%", isSelected: false },
  { rank: 19, name: "Render", ticker: "RNDR", currentPrice: "$18.72", dayChangePercent: "+5.47%", upside: "+590%", isSelected: false },
  { rank: 20, name: "Arbitrum", ticker: "ARB", currentPrice: "$2.47", dayChangePercent: "-0.88%", upside: "+560%", isSelected: false },
  { rank: 21, name: "Kaspa", ticker: "KAS", currentPrice: "$0.31", dayChangePercent: "+4.09%", upside: "+520%", isSelected: false },
  { rank: 22, name: "Hedera", ticker: "HBAR", currentPrice: "$0.26", dayChangePercent: "-1.57%", upside: "+500%", isSelected: false },
  { rank: 23, name: "Filecoin", ticker: "FIL", currentPrice: "$12.84", dayChangePercent: "+2.76%", upside: "+470%", isSelected: false },
  { rank: 24, name: "VeChain", ticker: "VET", currentPrice: "$0.11", dayChangePercent: "+1.33%", upside: "+430%", isSelected: false },
  { rank: 25, name: "Cosmos", ticker: "ATOM", currentPrice: "$16.93", dayChangePercent: "-0.69%", upside: "+410%", isSelected: false },
  { rank: 26, name: "Algorand", ticker: "ALGO", currentPrice: "$0.42", dayChangePercent: "+0.95%", upside: "+380%", isSelected: false },
  { rank: 27, name: "Monero", ticker: "XMR", currentPrice: "$286.10", dayChangePercent: "+1.51%", upside: "+360%", isSelected: false },
  { rank: 28, name: "Internet Computer", ticker: "ICP", currentPrice: "$19.58", dayChangePercent: "-2.36%", upside: "+340%", isSelected: false },
  { rank: 29, name: "Polygon", ticker: "POL", currentPrice: "$1.14", dayChangePercent: "+2.05%", upside: "+320%", isSelected: false },
  { rank: 30, name: "Pepe", ticker: "PEPE", currentPrice: "$0.0000198", dayChangePercent: "+8.74%", upside: "+300%", isSelected: false },
];

export const mobileHeaderOverrides = [
  {
    routePrefix: "/asset-selection",
    leadingHref: "/",
    leadingLabel: "Back",
    compactBrand: true,
  },
  {
    routePrefix: "/calculate",
    leadingHref: "/asset-selection",
    leadingLabel: "Back",
    compactBrand: true,
  },
] as const;
