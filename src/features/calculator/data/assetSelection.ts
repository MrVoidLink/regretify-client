import type { AssetSelectionAsset } from "@/features/calculator/types";

export const assetSelectionAssets: AssetSelectionAsset[] = [
  { rank: 1, name: "Bitcoin", ticker: "BTC", insight: "Most missed", detail: "by Regretify users", upside: "+12,540%", isSelected: true },
  { rank: 2, name: "Ethereum", ticker: "ETH", insight: "2nd most missed", detail: "by Regretify users", upside: "+8,230%", isSelected: false },
  { rank: 3, name: "Solana", ticker: "SOL", insight: "High momentum", detail: "in this cycle", upside: "+5,320%", isSelected: false },
  { rank: 4, name: "BNB", ticker: "BNB", insight: "Frequently regretted", detail: "by users", upside: "+2,890%", isSelected: false },
  { rank: 5, name: "XRP", ticker: "XRP", insight: "Trending again", detail: "strong recent moves", upside: "+1,980%", isSelected: false },
  { rank: 6, name: "Dogecoin", ticker: "DOGE", insight: "Community favorite", detail: "highly mentioned", upside: "+1,720%", isSelected: false },
  { rank: 7, name: "Avalanche", ticker: "AVAX", insight: "Big recovery potential", detail: "watch the trend", upside: "+1,450%", isSelected: false },
  { rank: 8, name: "Chainlink", ticker: "LINK", insight: "Undervalued gem?", detail: "strong fundamentals", upside: "+1,270%", isSelected: false },
  { rank: 9, name: "Cardano", ticker: "ADA", insight: "Long-term favorite", detail: "patient believers", upside: "+1,180%", isSelected: false },
  { rank: 10, name: "Polkadot", ticker: "DOT", insight: "Often revisited", detail: "ecosystem watchers", upside: "+1,060%", isSelected: false },
  { rank: 11, name: "Toncoin", ticker: "TON", insight: "Quietly climbing", detail: "fresh momentum", upside: "+940%", isSelected: false },
  { rank: 12, name: "TRON", ticker: "TRX", insight: "Consistent mover", detail: "steady expansion", upside: "+870%", isSelected: false },
  { rank: 13, name: "Litecoin", ticker: "LTC", insight: "Classic missed pick", detail: "heard it early", upside: "+790%", isSelected: false },
  { rank: 14, name: "Stellar", ticker: "XLM", insight: "Cross-border story", detail: "quiet return", upside: "+760%", isSelected: false },
  { rank: 15, name: "Aptos", ticker: "APT", insight: "New-cycle attention", detail: "still discussed", upside: "+720%", isSelected: false },
  { rank: 16, name: "Sui", ticker: "SUI", insight: "Fast-rising pick", detail: "new user curiosity", upside: "+690%", isSelected: false },
  { rank: 17, name: "Uniswap", ticker: "UNI", insight: "DeFi what-if", detail: "missed governance play", upside: "+650%", isSelected: false },
  { rank: 18, name: "NEAR", ticker: "NEAR", insight: "Reappearing name", detail: "developer attention", upside: "+620%", isSelected: false },
  { rank: 19, name: "Render", ticker: "RNDR", insight: "AI-cycle favorite", detail: "late discovery", upside: "+590%", isSelected: false },
  { rank: 20, name: "Arbitrum", ticker: "ARB", insight: "Layer-2 regret", detail: "high attention phase", upside: "+560%", isSelected: false },
  { rank: 21, name: "Kaspa", ticker: "KAS", insight: "Niche but loud", detail: "community hype", upside: "+520%", isSelected: false },
  { rank: 22, name: "Hedera", ticker: "HBAR", insight: "Enterprise angle", detail: "always reconsidered", upside: "+500%", isSelected: false },
  { rank: 23, name: "Filecoin", ticker: "FIL", insight: "Storage narrative", detail: "missed rebound", upside: "+470%", isSelected: false },
  { rank: 24, name: "VeChain", ticker: "VET", insight: "Old watchlist name", detail: "returns to mind", upside: "+430%", isSelected: false },
  { rank: 25, name: "Cosmos", ticker: "ATOM", insight: "Interchain curiosity", detail: "technical favorite", upside: "+410%", isSelected: false },
  { rank: 26, name: "Algorand", ticker: "ALGO", insight: "Almost bought", detail: "common near-miss", upside: "+380%", isSelected: false },
  { rank: 27, name: "Monero", ticker: "XMR", insight: "Private conviction", detail: "low-key believers", upside: "+360%", isSelected: false },
  { rank: 28, name: "Internet Computer", ticker: "ICP", insight: "High-volatility memory", detail: "still debated", upside: "+340%", isSelected: false },
  { rank: 29, name: "Polygon", ticker: "POL", insight: "Infrastructure staple", detail: "widely recognized", upside: "+320%", isSelected: false },
  { rank: 30, name: "Pepe", ticker: "PEPE", insight: "Speculative regret", detail: "saw it too late", upside: "+300%", isSelected: false },
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
