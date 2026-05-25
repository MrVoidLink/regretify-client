import type { CalculatorMarket } from "@/features/calculator/types";

export const calculatorMarkets: CalculatorMarket[] = [
  {
    id: "crypto",
    badge: "Selected",
    name: "Crypto",
    description: "High-volatility market full of opportunities.",
    accentColor: "#ff7a1c",
    icon: "bitcoin",
    isSelected: true,
  },
  {
    id: "stocks",
    badge: "Market",
    name: "Stocks",
    description: "Invest in companies driving the world forward.",
    accentColor: "#24c85c",
    icon: "stocks",
    isDisabled: true,
  },
  {
    id: "commodities",
    badge: "Market",
    name: "Commodities",
    description: "Real assets with lasting value and stability.",
    accentColor: "#f2b321",
    icon: "commodities",
    isDisabled: true,
  },
  {
    id: "sponsored",
    badge: "Sponsored",
    name: "Exchange X",
    description: "Trade smarter. Faster. Zero trading fees.",
    accentColor: "#6258e8",
    icon: "exchange",
  },
];
