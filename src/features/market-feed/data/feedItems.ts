import type {
  MarketFeedCard,
  MarketFeedCategory,
  MarketFeedSidebarItem,
  MarketFeedSidebarTag,
} from "@/features/market-feed/types";

export const marketFeedCategories: MarketFeedCategory[] = [
  { id: "all", label: "All" },
  { id: "crypto", label: "Crypto" },
  { id: "stocks", label: "Stocks" },
  { id: "memes", label: "Memes" },
  { id: "macro", label: "Macro" },
  { id: "people", label: "People" },
  { id: "tech", label: "Tech" },
  { id: "defi", label: "DeFi" },
];

const marketFeedCardSeeds: MarketFeedCard[] = [
  {
    kind: "article",
    id: "bitcoin-whale",
    badge: "Breaking",
    title: "Bitcoin jumps after mysterious whale chatter hits the timeline",
    excerpt: "One big wallet, one loud rumor, and the entire feed forgets how to act.",
    category: "Crypto",
    timeAgo: "2h ago",
    metrics: {
      comments: "1.2K",
      likes: "3.6K",
    },
    accent: "BTC +7.2%",
    tone: "midnight",
  },
  {
    kind: "article",
    id: "pepe-party",
    badge: "Funniest",
    title: "PEPE holders are celebrating another green day like it means destiny",
    excerpt: "The candles are up, the conviction is back, and the screenshots are flowing.",
    category: "Memes",
    timeAgo: "3h ago",
    metrics: {
      comments: "572",
      likes: "2.1K",
    },
    tone: "rose",
  },
  {
    kind: "article",
    id: "sold-too-early",
    badge: "Most Talked",
    title: "\"I sold before the pump\" becomes the quote of the day again",
    excerpt: "Every cycle needs a familiar pain point and today it showed up right on time.",
    category: "Markets",
    timeAgo: "4h ago",
    metrics: {
      comments: "456",
      likes: "1.6K",
    },
    tone: "crimson",
  },
  {
    kind: "article",
    id: "tesla-bio",
    badge: "Trending",
    title: "Tesla pops after another Elon profile tweak gets over-interpreted",
    excerpt: "A tiny social move, a giant reaction, and a very online market does the rest.",
    category: "Stocks",
    timeAgo: "5h ago",
    metrics: {
      comments: "321",
      likes: "3.6K",
    },
    accent: "TSLA +9%",
    tone: "amber",
  },
  {
    kind: "article",
    id: "toilet-token",
    badge: "Weirdest",
    title: "Toilet token posts a triple-digit move and everyone pretends this is normal",
    excerpt: "Serious people are asking unserious questions and the chart is not helping.",
    category: "Crypto",
    timeAgo: "6h ago",
    metrics: {
      comments: "689",
      likes: "2.4K",
    },
    tone: "teal",
  },
  {
    kind: "article",
    id: "eth-breakout",
    badge: "Biggest Moves",
    title: "Ethereum breaks higher and brings the all-time-high takes back with it",
    excerpt: "Momentum is back, confidence is louder, and the missed-entry pain is rising.",
    category: "Crypto",
    timeAgo: "7h ago",
    metrics: {
      comments: "1.1K",
      likes: "3.2K",
    },
    accent: "ETH > $3.5K",
    tone: "emerald",
  },
  {
    kind: "article",
    id: "doge-moon",
    badge: "Most Talked",
    title: "Dogecoin chatter returns as Elon drops another maybe-not-maybe signal",
    excerpt: "Enough ambiguity to move a timeline, not enough clarity to calm anyone down.",
    category: "People",
    timeAgo: "8h ago",
    metrics: {
      comments: "782",
      likes: "2.7K",
    },
    tone: "midnight",
  },
  {
    kind: "article",
    id: "shutdown-averted",
    badge: "Breaking",
    title: "Washington avoids a shutdown and markets respond with cautious relief",
    excerpt: "The panic cools off, but nobody is fully convinced this stays quiet for long.",
    category: "Macro",
    timeAgo: "9h ago",
    metrics: {
      comments: "214",
      likes: "892",
    },
    tone: "amber",
  },
  {
    kind: "article",
    id: "doge-meme",
    badge: "Funniest",
    title: "Not financial advice, but the meme economy is clearly doing its own thing",
    excerpt: "A joke, a pump, a screenshot, and another day of collective confusion.",
    category: "Memes",
    timeAgo: "10h ago",
    metrics: {
      comments: "508",
      likes: "1.7K",
    },
    tone: "crimson",
  },
];

const feedTitleSuffixes = [
  "",
  " again",
  " as traders pile in",
  " and the feed melts down",
];

const feedMetricOffsets = [
  ["1.2K", "3.6K"],
  ["572", "2.1K"],
  ["456", "1.6K"],
  ["321", "3.6K"],
  ["689", "2.4K"],
  ["1.1K", "3.2K"],
  ["782", "2.7K"],
  ["214", "892"],
  ["508", "1.7K"],
];

export const marketFeedCards: MarketFeedCard[] = Array.from({ length: 40 }, (_, index) => {
  const seed = marketFeedCardSeeds[index % marketFeedCardSeeds.length];
  const cycle = Math.floor(index / marketFeedCardSeeds.length);
  const titleSuffix = feedTitleSuffixes[cycle] ?? "";
  const metricPair = feedMetricOffsets[index % feedMetricOffsets.length];

  return {
    ...seed,
    id: `${seed.id}-${index + 1}`,
    title: `${seed.title}${titleSuffix}`,
    timeAgo: `${2 + index}h ago`,
    metrics: {
      comments: metricPair[0],
      likes: metricPair[1],
    },
  };
});

const marketFeedSponsoredCards: MarketFeedCard[] = [
  {
    kind: "sponsored",
    id: "sponsored-portfolio",
    badge: "Sponsored",
    title: "Build a cleaner portfolio tracker without losing the fun part",
    excerpt: "A sponsor slot inside the Pulse feed that looks native but stays clearly labeled.",
    sponsor: "Northstar",
    ctaLabel: "Visit sponsor",
    destinationLabel: "northstar.app",
    tone: "violet",
  },
  {
    kind: "sponsored",
    id: "sponsored-exchange",
    badge: "Sponsored",
    title: "Trade faster, regret slower with a sponsor-built pro dashboard",
    excerpt: "Example promotional inventory designed to sit between Pulse stories like a real card.",
    sponsor: "Delta Exchange",
    ctaLabel: "See platform",
    destinationLabel: "delta.exchange",
    tone: "midnight",
  },
  {
    kind: "sponsored",
    id: "sponsored-wallet",
    badge: "Sponsored",
    title: "A hardware wallet ad slot can live here without breaking the feed rhythm",
    excerpt: "This placeholder helps test how sponsored content behaves in the same visual lane as posts.",
    sponsor: "VaultKey",
    ctaLabel: "Explore wallet",
    destinationLabel: "vaultkey.io",
    tone: "emerald",
  },
  {
    kind: "sponsored",
    id: "sponsored-research",
    badge: "Sponsored",
    title: "Premium market research can show up as a native sponsored card too",
    excerpt: "Good for testing monetization placements before wiring a real ad or sponsor system.",
    sponsor: "Signal Desk",
    ctaLabel: "Read research",
    destinationLabel: "signaldesk.pro",
    tone: "teal",
  },
];

export const marketFeedEntries: MarketFeedCard[] = marketFeedCards.flatMap((card, index) => {
  const sponsoredCard = marketFeedSponsoredCards[Math.floor(index / 8)];

  if ((index + 1) % 8 === 0 && sponsoredCard) {
    return [card, sponsoredCard];
  }

  return [card];
});

export const marketFeedExploreItems: MarketFeedSidebarItem[] = [
  { id: "all-stories", label: "All Stories", value: "40", isActive: true },
  { id: "breaking", label: "Breaking", value: "24" },
  { id: "trending", label: "Trending", value: "52" },
  { id: "most-talked", label: "Most Talked", value: "78" },
  { id: "funniest", label: "Funniest", value: "61" },
  { id: "biggest-moves", label: "Biggest Moves", value: "37" },
  { id: "weirdest", label: "Weirdest", value: "40" },
];

export const marketFeedSidebarCategories: MarketFeedSidebarItem[] = [
  { id: "crypto", label: "Crypto" },
  { id: "stocks", label: "Stocks" },
  { id: "memes", label: "Memes" },
  { id: "macro", label: "Macro" },
  { id: "people", label: "People" },
  { id: "tech", label: "Tech" },
  { id: "defi", label: "DeFi" },
  { id: "regulation", label: "Regulation" },
];

export const marketFeedPopularTags: MarketFeedSidebarTag[] = [
  { id: "bitcoin", label: "# Bitcoin" },
  { id: "ethereum", label: "# Ethereum" },
  { id: "pepe", label: "# PEPE" },
  { id: "ai", label: "# AI" },
  { id: "elon", label: "# Elon Musk" },
  { id: "sec", label: "# SEC" },
  { id: "memecoins", label: "# Memecoins" },
  { id: "etf", label: "# ETF" },
  { id: "dogecoin", label: "# Dogecoin" },
  { id: "solana", label: "# Solana" },
];
