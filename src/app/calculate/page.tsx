import { redirect } from "next/navigation";
import {
  getAssetRoute,
  getDefaultAssetSelectionAsset,
} from "@/features/calculator/lib/assets";

export default function CalculateRoute() {
  redirect(getAssetRoute(getDefaultAssetSelectionAsset()));
}
