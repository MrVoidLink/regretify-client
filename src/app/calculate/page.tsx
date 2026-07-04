import { redirect } from "next/navigation";
import { assetSelectionAssets } from "@/features/calculator/data/assetSelection";
import { getAssetRoute } from "@/features/calculator/lib/assets";
import {
  fetchCalculatorAssets,
  toAssetSelectionAsset,
} from "@/features/calculator/lib/publicApi";

export default async function CalculateRoute() {
  const assets = await fetchCalculatorAssets()
    .then((response) => response.items.map(toAssetSelectionAsset))
    .catch(() => assetSelectionAssets);
  const defaultAsset = assets.find((asset) => asset.isSelected) ?? assets[0];

  redirect(getAssetRoute(defaultAsset));
}
