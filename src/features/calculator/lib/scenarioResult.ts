import { assetSelectionAssets } from "@/features/calculator/data/assetSelection";
import {
  chartXFromProgress,
  chartYAtX,
  clampDate,
  dateToProgress,
  formatShortDate,
  getDateTime,
  timelineEndDate,
} from "@/features/calculator/lib/scenarioTimeline";
import { getDefaultAssetSelectionAsset } from "@/features/calculator/lib/assets";
import type {
  AssetSelectionAsset,
  CalculatorScenarioAsset,
  CalculatorScenarioResult,
  CalculatorScenarioTone,
} from "@/features/calculator/types";

const btcReferenceGrowthExponent = 4.08932896955264;

function parseUpsidePercent(upside: string) {
  const numeric = Number(upside.replace(/[^\d.-]/g, ""));

  return Number.isFinite(numeric) ? numeric : 0;
}

function getAssetSelectionAsset(
  asset: CalculatorScenarioAsset,
): AssetSelectionAsset {
  return (
    assetSelectionAssets.find((item) => item.ticker === asset.ticker) ??
    getDefaultAssetSelectionAsset()
  );
}

function getAssetGrowthExponent(asset: CalculatorScenarioAsset) {
  const baselineUpside = parseUpsidePercent(getDefaultAssetSelectionAsset().upside);
  const assetUpside = parseUpsidePercent(getAssetSelectionAsset(asset).upside);
  const upsideRatio = baselineUpside > 0 ? assetUpside / baselineUpside : 1;
  const volatilityFactor = Math.min(1.35, Math.max(0.72, Math.sqrt(upsideRatio || 1)));

  return btcReferenceGrowthExponent * volatilityFactor;
}

function getTimelinePriceIndex(date: Date) {
  const x = chartXFromProgress(dateToProgress(clampDate(date)));
  const y = chartYAtX(x);

  return Math.max(1, 100 - y);
}

function getAssetPriceRatio(
  asset: CalculatorScenarioAsset,
  startDate: Date,
  endDate: Date,
) {
  const startIndex = getTimelinePriceIndex(startDate);
  const endIndex = getTimelinePriceIndex(endDate);
  const exponent = getAssetGrowthExponent(asset);

  return Math.pow(endIndex / startIndex, exponent);
}

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

export function calculateScenarioResult({
  asset,
  amount,
  startDate,
  endDate,
}: {
  asset: CalculatorScenarioAsset;
  amount: number;
  startDate: Date;
  endDate: Date;
}): CalculatorScenarioResult {
  const investedAmount = Math.max(0, amount);
  const safeStartDate = clampDate(startDate);
  const safeEndDate = clampDate(endDate);
  const priceRatio = getAssetPriceRatio(asset, safeStartDate, safeEndDate);
  const currentValue = investedAmount * priceRatio;
  const profitAmount = currentValue - investedAmount;
  const profitPercent =
    investedAmount > 0 ? ((currentValue - investedAmount) / investedAmount) * 100 : 0;
  const elapsedDays = Math.max(
    1,
    Math.round((getDateTime(safeEndDate) - getDateTime(safeStartDate)) / 86400000),
  );
  const elapsedMonths = Math.max(1, elapsedDays / 30.4375);
  const elapsedYears = Math.max(
    1 / 12,
    elapsedDays / 365.25,
  );
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
    timelineEndDate,
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
