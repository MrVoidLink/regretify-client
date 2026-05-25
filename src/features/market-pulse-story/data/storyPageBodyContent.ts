import type { MarketPulseStoryBodyContent } from "@/features/market-pulse-story/types";

export const marketPulseStoryBodyContent: MarketPulseStoryBodyContent = {
  summaryLabel: "Story Analysis",
  summaryHeading: "Bitcoin jumped after whale chatter, but positioning did most of the work",
  introParagraphs: [
    "On May 27, 2024, screenshots of a large Bitcoin wallet started spreading across X and Telegram just as the market was looking for a reason to break higher.",
    "The claim was simple: a known whale was adding size again, and traders treated that rumor like confirmation that fresh momentum was already underway.",
    "No single screenshot caused the rally on its own, but the setup was already fragile. Bitcoin was leaning against nearby resistance, short interest was crowded, and the timeline was primed for a story that sounded bigger than a normal bid.",
    "That combination is what matters. When attention, leverage, and a believable narrative line up at the same time, the price can move first and the explanation follows right behind it.",
  ],
  quote: {
    text: "The move was not pure fundamentals. It was a rumor, a chart setup, and a crowd that wanted an excuse to chase.",
    source: "@chainflowdesk",
  },
  breakdown: {
    heading: "What happened?",
    points: [
      "The wallet screenshots started circulating before the US session fully opened, when crypto attention was already picking up.",
      "Bitcoin was testing a key breakout zone, so the chatter acted as a catalyst instead of a complete explanation.",
      "As the price pushed higher, short liquidations added speed and made the move look stronger than the original rumor alone.",
      "Within the first hour, the feed shifted from asking whether the screenshots were real to asking how high Bitcoin could go next.",
    ],
  },
  analysis: {
    heading: "Why this move mattered",
    paragraphs: [
      "This kind of story matters because it shows how quickly market structure can amplify a weak signal. The screenshots were interesting, but the larger force was a market that was already leaning in the wrong direction.",
      "When traders are crowded on one side, even a questionable narrative can trigger forced repositioning. That is why rumor-driven moves often look bigger and cleaner on the chart than they deserve to look in hindsight.",
      "For search users, the useful answer is not just that Bitcoin went up. The useful answer is that the rally came from a combination of narrative, timing, and leverage, which helps explain why the move felt sudden and why late entries became more dangerous.",
    ],
  },
  chart: {
    label: "BTC / USD",
    priceLabel: "$72,517.90",
    changeLabel: "+8.35%",
    axisLabels: ["65K", "67K", "69K", "71K", "73K"],
    rangeLabels: ["1H", "1D", "1W", "1M", "1Y"],
  },
  cta: {
    title: "What if you invested before the pump?",
    description:
      "See how much that missed move would be worth now and how much regret it should probably cause.",
    buttonLabel: "Calculate Your Regret",
  },
  takeaways: {
    heading: "Key points",
    items: [
      "The rumor mattered because the market was already leaning the wrong way.",
      "Large-wallet chatter works fastest when liquidity is thin and traders are crowded.",
      "Price moved on narrative plus positioning, not on narrative alone.",
    ],
  },
  tags: ["#Bitcoin", "#Whales", "#CryptoNews", "#MarketPulse", "#Regretify"],
  reactionsHeading: "How are you feeling about this?",
  reactions: [
    { emoji: "🚀", label: "Bullish", countLabel: "1.2K" },
    { emoji: "😱", label: "Shocked", countLabel: "892" },
    { emoji: "😂", label: "Hilarious", countLabel: "602" },
    { emoji: "😡", label: "Angry", countLabel: "210" },
    { emoji: "🤔", label: "Hmm", countLabel: "345" },
  ],
};
