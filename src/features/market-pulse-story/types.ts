import type { MarketFeedArticleCard } from "@/features/market-feed/types";

export type MarketPulseStory = MarketFeedArticleCard & {
  slug: string;
};

export type MarketPulseStoryAuthor = {
  name: string;
  role: string;
  avatarSrc: string;
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

export type MarketPulseStoryQuote = {
  text: string;
  source: string;
};

export type MarketPulseStoryBreakdown = {
  heading: string;
  points: string[];
};

export type MarketPulseStoryAnalysis = {
  heading: string;
  paragraphs: string[];
};

export type MarketPulseStoryChart = {
  label: string;
  priceLabel: string;
  changeLabel: string;
  axisLabels: string[];
  rangeLabels: string[];
};

export type MarketPulseStoryMarketReaction = {
  id: string;
  coin: "btc" | "eth" | "alt";
  symbol: string;
  priceLabel: string;
  changeLabel: string;
  tone: "positive" | "negative";
};

export type MarketPulseStoryCta = {
  title: string;
  description: string;
  buttonLabel: string;
};

export type MarketPulseStoryTakeaways = {
  heading: string;
  items: string[];
};

export type MarketPulseStoryReaction = {
  label: string;
  emoji: string;
  countLabel: string;
};

export type MarketPulseStoryBodyContent = {
  summaryLabel: string;
  summaryHeading: string;
  introParagraphs: string[];
  quote: MarketPulseStoryQuote;
  breakdown: MarketPulseStoryBreakdown;
  analysis: MarketPulseStoryAnalysis;
  chart: MarketPulseStoryChart;
  cta: MarketPulseStoryCta;
  takeaways: MarketPulseStoryTakeaways;
  tags: string[];
  reactionsHeading: string;
  reactions: MarketPulseStoryReaction[];
};
