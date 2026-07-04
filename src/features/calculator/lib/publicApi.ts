import type {
  AssetSelectionAsset,
  CalculatorAssetHistoryPoint,
  CalculatorScenarioAsset,
} from "@/features/calculator/types";
import {
  getAssetSlug,
  getScenarioAssetMarkClassName,
} from "@/features/calculator/lib/assets";

export type CalculatorPublicAsset = {
  id: string;
  slug: string;
  name: string;
  ticker: string;
  binanceSymbol: string;
  quoteAsset: string;
  market: string;
  rank: number;
  isActive: boolean;
  listedAt: string | null;
  currentPrice: string | null;
  dayChangePercent24h: string | null;
  dayChangeValue24h: string | null;
  liveMetricSource: string | null;
  liveMetricFetchedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type CalculatorPublicAssetsResponse = {
  items: CalculatorPublicAsset[];
  summary: {
    total: number;
  };
};

type CalculatorPublicAssetHistoryResponse = {
  asset: CalculatorPublicAsset;
  items: CalculatorAssetHistoryPoint[];
  summary: {
    total: number;
  };
};

function getCoreApiBaseUrl() {
  const value =
    process.env.CORE_API_BASE_URL?.trim() ??
    process.env.NEXT_PUBLIC_CORE_API_BASE_URL?.trim();

  if (!value) {
    throw new Error("Missing required env: CORE_API_BASE_URL");
  }

  const normalized = value.replace(/\/$/, "");

  if (normalized.endsWith("/api")) {
    return normalized;
  }

  return `${normalized}/api`;
}

async function requestJson<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${getCoreApiBaseUrl()}${path}`, {
    ...init,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Calculator request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}

function formatPrice(value: string | null) {
  const numericValue = Number(value ?? "");

  if (!Number.isFinite(numericValue)) {
    return "--";
  }

  const absoluteValue = Math.abs(numericValue);
  const maximumFractionDigits =
    absoluteValue >= 1000
      ? 0
      : absoluteValue >= 1
        ? 2
        : absoluteValue >= 0.01
          ? 4
          : absoluteValue >= 0.0001
            ? 6
            : 8;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  }).format(numericValue);
}

function formatDayChangePercent(value: string | null) {
  const numericValue = Number(value ?? "");

  if (!Number.isFinite(numericValue)) {
    return "--";
  }

  const formatted = new Intl.NumberFormat("en-US", {
    signDisplay: "exceptZero",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);

  return `${formatted}%`;
}

function formatMarketLabel(value: string) {
  const normalized = value.trim().toLowerCase();

  if (!normalized) {
    return "Crypto";
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export function toAssetSelectionAsset(
  asset: CalculatorPublicAsset,
): AssetSelectionAsset {
  return {
    slug: asset.slug,
    rank: asset.rank,
    name: asset.name,
    ticker: asset.ticker,
    currentPrice: formatPrice(asset.currentPrice),
    dayChangePercent: formatDayChangePercent(asset.dayChangePercent24h),
    isSelected: asset.rank === 1,
    currentPriceValue: Number(asset.currentPrice ?? ""),
    dayChangePercentValue: Number(asset.dayChangePercent24h ?? ""),
    listedAt: asset.listedAt,
  };
}

export function toCalculatorScenarioAsset(
  asset: CalculatorPublicAsset | AssetSelectionAsset,
): CalculatorScenarioAsset {
  const slug = getAssetSlug(asset);

  return {
    slug,
    name: asset.name,
    ticker: asset.ticker,
    marketLabel:
      "market" in asset && typeof asset.market === "string"
        ? formatMarketLabel(asset.market)
        : "Crypto",
    mark: asset.name.charAt(0),
    markClassName: getScenarioAssetMarkClassName(asset.ticker),
    listedAt: "listedAt" in asset ? (asset.listedAt ?? null) : null,
    currentPriceValue:
      "currentPriceValue" in asset
        ? asset.currentPriceValue ?? null
        : Number("currentPrice" in asset ? asset.currentPrice ?? "" : ""),
  };
}

export async function fetchCalculatorAssets() {
  return requestJson<CalculatorPublicAssetsResponse>("/calculator/assets");
}

export async function fetchCalculatorAssetBySlug(slug: string) {
  return requestJson<CalculatorPublicAsset>(
    `/calculator/assets/${encodeURIComponent(slug)}`,
  );
}

export async function fetchCalculatorAssetHistory(slug: string, params?: {
  from?: string;
  to?: string;
  limit?: number;
}) {
  const query = new URLSearchParams();

  if (params?.from) {
    query.set("from", params.from);
  }

  if (params?.to) {
    query.set("to", params.to);
  }

  if (params?.limit) {
    query.set("limit", String(params.limit));
  }

  const suffix = query.size ? `?${query.toString()}` : "";

  return requestJson<CalculatorPublicAssetHistoryResponse>(
    `/calculator/assets/${encodeURIComponent(slug)}/history${suffix}`,
  );
}
