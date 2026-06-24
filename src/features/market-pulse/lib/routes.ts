export const marketPulsePath = "/market-pulse";
export const marketPulseFeedPath = marketPulsePath;
export const legacyMarketPulseFeedPath = "/market-pulse/feed";

export function getMarketPulseStoryPath(slug: string) {
  return `/market-pulse/${slug}`;
}
