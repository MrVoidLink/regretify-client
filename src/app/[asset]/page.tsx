import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssetCalculatorSeoMainContent } from "@/features/calculator/components/AssetCalculatorSeoMainContent";
import { AssetCalculatorSeoSidebar } from "@/features/calculator/components/AssetCalculatorSeoSidebar";
import { CalculatorScenarioPage } from "@/features/calculator/components/CalculatorScenarioPage";
import {
  getAssetSelectionParams,
  getCalculatorScenarioAssetBySlug,
} from "@/features/calculator/lib/assets";

export function generateStaticParams() {
  return getAssetSelectionParams();
}

export async function generateMetadata(
  props: PageProps<"/[asset]">,
): Promise<Metadata> {
  const { asset: slug } = await props.params;
  const asset = getCalculatorScenarioAssetBySlug(slug);

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
  const asset = getCalculatorScenarioAssetBySlug(slug);

  if (!asset) {
    notFound();
  }

  return (
    <>
      <CalculatorScenarioPage asset={asset} />
      <section className="bg-[linear-gradient(180deg,#faf8ff_0%,#ffffff_42%,#fbf9ff_100%)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[96rem] gap-5 xl:grid-cols-[minmax(0,1fr)_21rem] xl:items-start">
          <AssetCalculatorSeoMainContent asset={asset} />
          <AssetCalculatorSeoSidebar asset={asset} />
        </div>
      </section>
    </>
  );
}
