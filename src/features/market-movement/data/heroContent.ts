import type {
  MarketMovementBiggestMoveCard,
  MarketMovementHeroContent,
} from "@/features/market-movement/types";

export const marketMovementHeroContent: MarketMovementHeroContent = {
  eyebrow: "Market Movement",
  title: "Market Movements",
  description:
    "Track the biggest, fastest, and most explosive moves across the market in one place, with a focus on momentum, reversals, and regret-worthy action.",
  stats: [
    {
      id: "explosive-moves",
      label: "Explosive Moves",
      primaryValue: "24",
      secondaryValue: "Last 24h",
      deltaLabel: "+33%",
      tone: "positive",
      icon: "flash",
    },
    {
      id: "top-gainer",
      label: "Top Gainer (24h)",
      primaryValue: "DOGE",
      secondaryValue: "+38.4%",
      deltaLabel: "Momentum leader",
      tone: "positive",
      icon: "arrow-up",
    },
    {
      id: "top-loser",
      label: "Top Loser (24h)",
      primaryValue: "LOKA",
      secondaryValue: "-22.7%",
      deltaLabel: "Sharpest drop",
      tone: "negative",
      icon: "arrow-down",
    },
    {
      id: "total-mentions",
      label: "Total Mentions",
      primaryValue: "128K",
      secondaryValue: "Across the feed",
      deltaLabel: "+18%",
      tone: "positive",
      icon: "chat",
    },
  ],
};

export const marketMovementBiggestMoveCard: MarketMovementBiggestMoveCard = {
  label: "Biggest Move (24h)",
  assetTicker: "DOGE",
  assetName: "Dogecoin",
  changeLabel: "+38.4%",
  priceLabel: "$0.1732",
  lowLabel: "$0.1245",
  highLabel: "$0.1758",
};
