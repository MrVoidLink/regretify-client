export type CalculatorMarketId =
  | "crypto"
  | "stocks"
  | "commodities"
  | "sponsored";

export type CalculatorMarketIcon =
  | "bitcoin"
  | "stocks"
  | "commodities"
  | "exchange";

export type CalculatorMarket = {
  id: CalculatorMarketId;
  badge: string;
  name: string;
  description: string;
  accentColor: string;
  icon: CalculatorMarketIcon;
  isSelected?: boolean;
  isDisabled?: boolean;
};

export type AssetSelectionAsset = {
  rank: number;
  name: string;
  ticker: string;
  insight: string;
  detail: string;
  upside: string;
  isSelected: boolean;
};

export type CalculatorScenarioStep = {
  id: number;
  label: string;
  value: string;
  status: "complete" | "active";
};

export type CalculatorScenarioAsset = {
  name: string;
  ticker: string;
  marketLabel: string;
  mark: string;
  markClassName: string;
};

export type InvestmentPreset = {
  id: string;
  label: string;
  value: number;
};

export type CalculatorScenarioChartPoint = {
  x: number;
  y: number;
};

export type CalculatorScenarioTone = "neutral" | "profit" | "loss";

export type CalculatorScenarioResult = {
  tone: CalculatorScenarioTone;
  investedAmount: number;
  investedAmountLabel: string;
  startDate: Date;
  endDate: Date;
  startDateLabel: string;
  endDateLabel: string;
  currentValue: number;
  currentValueLabel: string;
  profitAmount: number;
  profitAmountLabel: string;
  profitPercent: number;
  profitPercentLabel: string;
  dailyProfit: number;
  dailyProfitLabel: string;
  monthlyProfit: number;
  monthlyProfitLabel: string;
  yearlyProfit: number;
  yearlyProfitLabel: string;
  daysHeld: number;
  timelineEndDate: Date;
};
