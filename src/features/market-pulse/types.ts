export type PulseCategoryId =
  | "all"
  | "crypto"
  | "stocks"
  | "memes"
  | "macro"
  | "people";

export type PulseCategory = {
  id: PulseCategoryId;
  label: string;
  isSelected?: boolean;
};

export type PulseStorySize = "hero" | "medium" | "small";

export type PulseStoryVisual =
  | "chart"
  | "party"
  | "panic"
  | "toilet"
  | "gold"
  | "profile"
  | "rocket"
  | "alarm";

export type PulseStoryTone =
  | "night"
  | "blush"
  | "cream"
  | "lilac"
  | "sky"
  | "ice"
  | "violet"
  | "mint";

export type PulseStory = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  meta: string;
  size: PulseStorySize;
  tone: PulseStoryTone;
  visual: PulseStoryVisual;
  accent?: string;
};

export type PulseTrendTone = "positive" | "negative";

export type PulseTrend = {
  rank: number;
  ticker: string;
  name: string;
  icon: string;
  percent: string;
  tone: PulseTrendTone;
  sparklinePath: string;
  iconClassName: string;
};

export type PulseSocialPlatform = "twitter" | "reddit" | "tiktok" | "discord";

export type PulseSocialCard = {
  id: string;
  platform: PulseSocialPlatform;
  timeAgo: string;
  title: string;
  accentLine: string;
  metrics: {
    replies: string;
    reposts: string;
    likes: string;
  };
  imageSrc?: string;
  fallbackTone?: "midnight" | "violet" | "emerald";
};
