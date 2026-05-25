import { assetSelectionAssets } from "@/features/calculator/data/assetSelection";
import type {
  AssetSelectionAsset,
  CalculatorScenarioAsset,
  CalculatorScenarioStep,
} from "@/features/calculator/types";

const scenarioAssetMarkClasses: Record<string, string> = {
  BTC: "bg-[linear-gradient(180deg,#ffb74d_0%,#ff7d0a_100%)] text-white shadow-[0_10px_22px_rgba(255,125,10,0.22)]",
  ETH: "bg-[radial-gradient(circle_at_35%_30%,#a5b9ff_0%,#647cf4_70%)] text-white shadow-[0_10px_22px_rgba(100,124,244,0.18)]",
  SOL: "bg-zinc-950 text-white shadow-[0_10px_22px_rgba(24,24,27,0.2)]",
  BNB: "bg-[linear-gradient(180deg,#ffd247_0%,#f3ba2f_100%)] text-white shadow-[0_10px_22px_rgba(243,186,47,0.18)]",
  DOGE: "bg-[linear-gradient(180deg,#dfc861_0%,#c8a233_100%)] text-white shadow-[0_10px_22px_rgba(200,162,51,0.18)]",
  PEPE: "bg-[linear-gradient(180deg,#86efac_0%,#22c55e_100%)] text-white shadow-[0_10px_22px_rgba(34,197,94,0.18)]",
};

export function getAssetSlug(asset: Pick<AssetSelectionAsset, "name">) {
  return asset.name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getAssetRoute(asset: Pick<AssetSelectionAsset, "name">) {
  return `/${getAssetSlug(asset)}`;
}

export function getAssetSelectionParams() {
  return assetSelectionAssets.map((asset) => ({ asset: getAssetSlug(asset) }));
}

export function getAssetSelectionAssetBySlug(slug: string) {
  return assetSelectionAssets.find((asset) => getAssetSlug(asset) === slug) ?? null;
}

export function getDefaultAssetSelectionAsset() {
  return (
    assetSelectionAssets.find((asset) => asset.isSelected) ?? assetSelectionAssets[0]
  );
}

export function toCalculatorScenarioAsset(
  asset: AssetSelectionAsset,
): CalculatorScenarioAsset {
  return {
    name: asset.name,
    ticker: asset.ticker,
    marketLabel: "Crypto",
    mark: asset.name.charAt(0),
    markClassName:
      scenarioAssetMarkClasses[asset.ticker] ??
      "bg-[linear-gradient(180deg,#d4d4d8_0%,#71717a_100%)] text-white shadow-[0_10px_22px_rgba(24,24,27,0.12)]",
  };
}

export function getCalculatorScenarioAssetBySlug(slug: string) {
  const asset = getAssetSelectionAssetBySlug(slug);

  return asset ? toCalculatorScenarioAsset(asset) : null;
}

export function getDefaultCalculatorScenarioAsset() {
  return toCalculatorScenarioAsset(getDefaultAssetSelectionAsset());
}

export function getCalculatorScenarioSteps(
  asset: CalculatorScenarioAsset,
): CalculatorScenarioStep[] {
  return [
    {
      id: 1,
      label: "Market",
      value: asset.marketLabel,
      status: "complete",
    },
    {
      id: 2,
      label: "Asset",
      value: asset.name,
      status: "complete",
    },
    {
      id: 3,
      label: "Calculate",
      value: "Scenario",
      status: "active",
    },
  ];
}
