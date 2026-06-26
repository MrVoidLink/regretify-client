export const marketPulsePath = "/market-pulse";
export const marketPulseFeedPath = marketPulsePath;
export const legacyMarketPulseFeedPath = "/market-pulse/feed";

export function getMarketPulseCategoryPath(category: string) {
  return `${marketPulsePath}?category=${encodeURIComponent(category)}`;
}

export function getMarketPulseStoryPath(slug: string) {
  return `/market-pulse/${slug}`;
}
