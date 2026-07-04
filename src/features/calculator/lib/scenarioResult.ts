import type {
  CalculatorAssetHistoryPoint,
  CalculatorScenarioResult,
  CalculatorScenarioTone,
} from "@/features/calculator/types";
import {
  clampDate,
  formatShortDate,
  getDateTime,
  isoDateFromDate,
  type ScenarioTimelineModel,
} from "@/features/calculator/lib/scenarioTimelineModel";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value);
}

function formatSignedCurrency(value: number) {
  if (Math.abs(value) < 0.005) {
    return "$0";
  }

  const absoluteValue = formatCurrency(Math.abs(value));

  return value >= 0 ? `+${absoluteValue}` : `-${absoluteValue}`;
}

function formatSignedPercent(value: number) {
  if (Math.abs(value) < 0.05) {
    return "0%";
  }

  return `${value >= 0 ? "+" : "-"}${Math.abs(value).toFixed(1)}%`;
}

function getScenarioTone(profitAmount: number): CalculatorScenarioTone {
  if (profitAmount > 0.5) {
    return "profit";
  }

  if (profitAmount < -0.5) {
    return "loss";
  }

  return "neutral";
}

function findHistoryPointForDate(
  history: CalculatorAssetHistoryPoint[],
  date: Date,
) {
  const targetDate = isoDateFromDate(date);
  let selectedPoint = history[0] ?? null;

  for (const point of history) {
    if (point.date > targetDate) {
      break;
    }

    selectedPoint = point;
  }

  return selectedPoint ?? history[history.length - 1] ?? null;
}

function getClosePrice(point: CalculatorAssetHistoryPoint | null) {
  const numericValue = Number(point?.closePrice ?? "");
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : null;
}

export function calculateScenarioResult({
  amount,
  startDate,
  endDate,
  history,
  timeline,
}: {
  amount: number;
  startDate: Date;
  endDate: Date;
  history: CalculatorAssetHistoryPoint[];
  timeline: ScenarioTimelineModel;
}): CalculatorScenarioResult {
  const investedAmount = Math.max(0, amount);
  const safeStartDate = clampDate(startDate, timeline);
  const safeEndDate = clampDate(endDate, timeline);

  if (!history.length) {
    return {
      tone: "neutral",
      investedAmount,
      investedAmountLabel: formatCurrency(investedAmount),
      startDate: safeStartDate,
      endDate: safeEndDate,
      startDateLabel: formatShortDate(safeStartDate),
      endDateLabel: formatShortDate(safeEndDate),
      currentValue: investedAmount,
      currentValueLabel: formatCurrency(investedAmount),
      profitAmount: 0,
      profitAmountLabel: "$0",
      profitPercent: 0,
      profitPercentLabel: "0%",
      dailyProfit: 0,
      dailyProfitLabel: "$0",
      monthlyProfit: 0,
      monthlyProfitLabel: "$0",
      yearlyProfit: 0,
      yearlyProfitLabel: "$0",
      daysHeld: 1,
      timelineEndDate: timeline.timelineEndDate,
    };
  }

  const startPoint = findHistoryPointForDate(history, safeStartDate);
  const endPoint = findHistoryPointForDate(history, safeEndDate);
  const startPrice = getClosePrice(startPoint);
  const endPrice = getClosePrice(endPoint);

  if (!startPrice || !endPrice) {
    return {
      tone: "neutral",
      investedAmount,
      investedAmountLabel: formatCurrency(investedAmount),
      startDate: safeStartDate,
      endDate: safeEndDate,
      startDateLabel: formatShortDate(safeStartDate),
      endDateLabel: formatShortDate(safeEndDate),
      currentValue: investedAmount,
      currentValueLabel: formatCurrency(investedAmount),
      profitAmount: 0,
      profitAmountLabel: "$0",
      profitPercent: 0,
      profitPercentLabel: "0%",
      dailyProfit: 0,
      dailyProfitLabel: "$0",
      monthlyProfit: 0,
      monthlyProfitLabel: "$0",
      yearlyProfit: 0,
      yearlyProfitLabel: "$0",
      daysHeld: 1,
      timelineEndDate: timeline.timelineEndDate,
    };
  }

  const currentValue = investedAmount * (endPrice / startPrice);
  const profitAmount = currentValue - investedAmount;
  const profitPercent =
    investedAmount > 0 ? ((currentValue - investedAmount) / investedAmount) * 100 : 0;
  const elapsedDays = Math.max(
    1,
    Math.round((getDateTime(safeEndDate) - getDateTime(safeStartDate)) / 86400000),
  );
  const elapsedMonths = Math.max(1, elapsedDays / 30.4375);
  const elapsedYears = Math.max(1 / 12, elapsedDays / 365.25);
  const dailyProfit = profitAmount / elapsedDays;
  const monthlyProfit = profitAmount / elapsedMonths;
  const yearlyProfit = profitAmount / elapsedYears;
  const tone = getScenarioTone(profitAmount);

  return {
    tone,
    investedAmount,
    investedAmountLabel: formatCurrency(investedAmount),
    startDate: safeStartDate,
    endDate: safeEndDate,
    startDateLabel: formatShortDate(safeStartDate),
    endDateLabel: formatShortDate(safeEndDate),
    currentValue,
    currentValueLabel: formatCurrency(currentValue),
    profitAmount,
    profitAmountLabel: formatSignedCurrency(profitAmount),
    profitPercent,
    profitPercentLabel: formatSignedPercent(profitPercent),
    dailyProfit,
    dailyProfitLabel: formatSignedCurrency(dailyProfit),
    monthlyProfit,
    monthlyProfitLabel: formatSignedCurrency(monthlyProfit),
    yearlyProfit,
    yearlyProfitLabel: formatSignedCurrency(yearlyProfit),
    daysHeld: elapsedDays,
    timelineEndDate: timeline.timelineEndDate,
  };
}

export function createPendingScenarioResult(
  result: CalculatorScenarioResult,
): CalculatorScenarioResult {
  return {
    ...result,
    tone: "neutral",
    currentValueLabel: "--",
    profitAmountLabel: "--",
    profitPercentLabel: "--",
    dailyProfitLabel: "--",
    monthlyProfitLabel: "--",
    yearlyProfitLabel: "--",
  };
}
