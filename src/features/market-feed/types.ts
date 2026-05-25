export type MarketFeedCategoryId =
  | "all"
  | "crypto"
  | "stocks"
  | "memes"
  | "macro"
  | "people"
  | "tech";

export type MarketFeedCategory = {
  id: MarketFeedCategoryId;
  label: string;
  isSelected?: boolean;
};

export type MarketFeedSidebarItem = {
  id: string;
  label: string;
  value?: string;
  isActive?: boolean;
};

export type MarketFeedSidebarTag = {
  id: string;
  label: string;
};

export type MarketFeedCardTone =
  | "midnight"
  | "violet"
  | "sunset"
  | "emerald"
  | "rose"
  | "sky"
  | "amber"
  | "crimson"
  | "teal";

export type MarketFeedViewMode = "grid" | "list";

export type MarketFeedArticleCard = {
  kind: "article";
  id: string;
  badge: string;
  title: string;
  excerpt: string;
  category: string;
  timeAgo: string;
  metrics: {
    comments: string;
    likes: string;
  };
  accent?: string;
  tone: MarketFeedCardTone;
};

export type MarketFeedSponsoredCard = {
  kind: "sponsored";
  id: string;
  badge: "Sponsored";
  title: string;
  excerpt: string;
  sponsor: string;
  ctaLabel: string;
  destinationLabel: string;
  tone: MarketFeedCardTone;
};

export type MarketFeedCard = MarketFeedArticleCard | MarketFeedSponsoredCard;
