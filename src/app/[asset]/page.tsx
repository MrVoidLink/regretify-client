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
  fetchCalculatorAssets,
  fetchCalculatorAssetBySlug,
  fetchCalculatorAssetHistory,
  toAssetSelectionAsset,
  toCalculatorScenarioAsset,
} from "@/features/calculator/lib/publicApi";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const assets = await fetchCalculatorAssets()
    .then((response) => response.items.map(toAssetSelectionAsset))
    .catch(() => assetSelectionAssets);

  return getAssetSelectionParams(assets);
}

async function loadAssetPageData(slug: string) {
  const asset = await fetchCalculatorAssetBySlug(slug)
    .then((response) => toCalculatorScenarioAsset(response))
    .catch(() => getCalculatorScenarioAssetBySlug(slug, assetSelectionAssets));

  if (!asset) {
    return null;
  }

  const history = await fetchCalculatorAssetHistory(slug, { from: "2017-01-01" })
    .then((response) => response.items)
    .catch(() => []);

  return {
    asset,
    history,
  };
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
  const history = assetData?.history ?? [];

  if (!asset) {
    notFound();
  }

  return (
    <>
      <CalculatorScenarioPage
        key={`${asset.slug}-${history[0]?.date ?? "empty"}-${history[history.length - 1]?.date ?? "empty"}`}
        asset={asset}
        history={history}
      />
      <section className="bg-[linear-gradient(180deg,#faf8ff_0%,#ffffff_42%,#fbf9ff_100%)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[96rem] gap-5 xl:grid-cols-[minmax(0,1fr)_21rem] xl:items-start">
          <AssetCalculatorSeoMainContent asset={asset} />
          <AssetCalculatorSeoSidebar asset={asset} />
        </div>
      </section>
    </>
  );
}
