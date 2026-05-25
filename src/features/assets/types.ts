export type AssetsHeroStat = {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: "neutral" | "positive";
};

export type AssetsCategoryChip = {
  id: string;
  label: string;
  isActive?: boolean;
};

export type FeaturedAssetCard = {
  id: string;
  ticker: string;
  name: string;
  subtitle: string;
  priceLabel: string;
  moveLabel: string;
  mark: string;
  markClassName: string;
  chartPath: string;
  tone: "green" | "violet" | "red";
};

export type AssetDirectoryItem = {
  id: string;
  ticker: string;
  name: string;
  marketLabel: string;
  regretAngle: string;
  priceLabel: string;
  yearlyMoveLabel: string;
  volatilityLabel: string;
  mark: string;
  markClassName: string;
};

export type AssetsTopMoverItem = {
  id: string;
  ticker: string;
  name: string;
  moveLabel: string;
  mark: string;
  markClassName: string;
};

export type AssetsExplorerRow = {
  id: string;
  ticker: string;
  name: string;
  categoryLabel: string;
  categoryTone: "violet" | "blue" | "amber";
  priceLabel: string;
  dailyChangeLabel: string;
  marketCapLabel: string;
  popularityPath: string;
  mark: string;
  markClassName: string;
};

export type AssetsTrendingItem = {
  id: string;
  ticker: string;
  name: string;
  moveLabel: string;
  mark: string;
  markClassName: string;
};

export type AssetsValueCard = {
  id: string;
  title: string;
  description: string;
  icon: "book" | "scale" | "trophy" | "mood";
};
