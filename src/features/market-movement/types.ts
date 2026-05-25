export type MarketMovementStatTone = "positive" | "negative" | "neutral";

export type MarketMovementSummaryStat = {
  id: string;
  label: string;
  primaryValue: string;
  secondaryValue: string;
  deltaLabel: string;
  tone: MarketMovementStatTone;
  icon: "flash" | "arrow-up" | "arrow-down" | "chat";
};

export type MarketMovementHeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  stats: MarketMovementSummaryStat[];
};

export type MarketMovementBiggestMoveCard = {
  label: string;
  assetTicker: string;
  assetName: string;
  changeLabel: string;
  priceLabel: string;
  lowLabel: string;
  highLabel: string;
};

export type MarketMovementFilterTone = "all" | "pump" | "dump" | "breakout" | "liquidation" | "whale";

export type MarketMovementFilter = {
  id: string;
  label: string;
  tone: MarketMovementFilterTone;
  isActive?: boolean;
};

export type MarketMovementTimeRange = {
  label: string;
};

export type MarketMovementRowType = "pump" | "dump" | "breakout" | "whale";

export type MarketMovementChartTone = "green" | "red" | "violet" | "blue";

export type MarketMovementTableRow = {
  id: string;
  assetTicker: string;
  assetName: string;
  assetMark: string;
  assetMarkClassName: string;
  movementType: MarketMovementRowType;
  changeLabel: string;
  priceLabel: string;
  volumeLabel: string;
  timeLabel: string;
  chartTone: MarketMovementChartTone;
  chartPath: string;
};

export type MarketMovementWhaleActivityItem = {
  id: string;
  whaleLabel: string;
  moveLabel: string;
  timeLabel: string;
  assetMark: string;
  assetMarkClassName: string;
};

export type MarketMovementExploreMoreItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: "stories" | "calculator" | "moves" | "whale";
};

export type MarketMovementTimelineFilter = {
  id: string;
  label: string;
  isActive?: boolean;
};

export type MarketMovementTimelineItem = {
  id: string;
  timeLabel: string;
  assetTicker: string;
  assetName: string;
  assetMark: string;
  assetMarkClassName: string;
  changeLabel: string;
  movementType: MarketMovementRowType;
  summary: string;
};
