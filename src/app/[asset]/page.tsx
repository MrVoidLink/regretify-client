import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssetCalculatorSeoMainContent } from "@/features/calculator/components/AssetCalculatorSeoMainContent";
import { AssetCalculatorSeoSidebar } from "@/features/calculator/components/AssetCalculatorSeoSidebar";
import { CalculatorScenarioPage } from "@/features/calculator/components/CalculatorScenarioPage";
import { assetSelectionAssets } from "@/features/calculator/data/assetSelection";
import {
  getAssetSelectionParams,
  getCalculatorScenarioAssetBySlug,
} from "@/features/calculator/lib/assets";
import {
  fetchCalculatorAssetBySlug,
  fetchCalculatorAssetHistory,
  toCalculatorScenarioAsset,
} from "@/features/calculator/lib/publicApi";

export function generateStaticParams() {
  return getAssetSelectionParams();
}

async function loadAssetPageData(slug: string) {
  try {
    const [asset, historyResponse] = await Promise.all([
      fetchCalculatorAssetBySlug(slug),
      fetchCalculatorAssetHistory(slug, { from: "2017-01-01" }),
    ]);

    return {
      asset: toCalculatorScenarioAsset(asset),
      history: historyResponse.items,
    };
  } catch {
    const fallbackAsset = getCalculatorScenarioAssetBySlug(slug, assetSelectionAssets);

    if (!fallbackAsset) {
      return null;
    }

    return {
      asset: fallbackAsset,
      history: [],
    };
  }
}

export async function generateMetadata(
  props: PageProps<"/[asset]">,
): Promise<Metadata> {
  const { asset: slug } = await props.params;
  const assetData = await loadAssetPageData(slug);
  const asset = assetData?.asset ?? null;

  if (!asset) {
    return {
      title: "Asset Calculator Not Found | Regretify",
      description: "This Regretify asset calculator page could not be found.",
    };
  }

  return {
    title: `${asset.name} Regret Calculator | Regretify`,
    description: `Calculate what could have happened if you had invested in ${asset.name} earlier, then explore ${asset.ticker} missed-opportunity scenarios.`,
    alternates: {
      canonical: `/${slug}`,
    },
  };
}

export default async function AssetCalculatorRoute(
  props: PageProps<"/[asset]">,
) {
  const { asset: slug } = await props.params;
  const assetData = await loadAssetPageData(slug);
  const asset = assetData?.asset ?? null;

  if (!asset) {
    notFound();
  }

  return (
    <>
      <CalculatorScenarioPage asset={asset} history={assetData?.history ?? []} />
      <section className="bg-[linear-gradient(180deg,#faf8ff_0%,#ffffff_42%,#fbf9ff_100%)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[96rem] gap-5 xl:grid-cols-[minmax(0,1fr)_21rem] xl:items-start">
          <AssetCalculatorSeoMainContent asset={asset} />
          <AssetCalculatorSeoSidebar asset={asset} />
        </div>
      </section>
    </>
  );
}
