import type { MarketFeedArticleCard } from "@/features/market-feed/types";

export type MarketPulseStory = MarketFeedArticleCard & {
  summaryHeading: string;
  bodyHtml: string;
  tags: string[];
  feedHeroImageSrc: string | null;
  storyHeroImageSrc: string | null;
  author: MarketPulseStoryAuthor;
};

export type MarketPulseStoryAuthor = {
  name: string;
  role: string;
  username: string;
  avatarSrc: string | null;
  publishedAtLabel: string;
  publishedAtIso: string;
};

export type MarketPulseStorySponsorCard = {
  label: string;
  title: string;
  excerpt: string;
  sponsorName: string;
  ctaLabel: string;
};

export type MarketPulseStoryTopContent = {
  author: MarketPulseStoryAuthor;
  sponsorCard: MarketPulseStorySponsorCard;
};

export type MarketPulseStoryCta = {
  title: string;
  description: string;
  buttonLabel: string;
};

export type MarketPulseStoryMarketReaction = {
  id: string;
  coin: "btc" | "eth" | "alt";
  symbol: string;
  priceLabel: string;
  changeLabel: string;
  tone: "positive" | "negative";
};

export type MarketPulseStoryReaction = {
  label: string;
  emoji: string;
  countLabel: string;
};

export type MarketPulseStoryOutlineLink = {
  href: string;
  label: string;
};
