import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssetsPage } from "@/features/assets/components/AssetsPage";
import { productFlags } from "@/lib/productFlags";

export const metadata: Metadata = {
  title: "Assets | Regretify",
  description:
    "Explore assets, discover market leaders, and jump directly into Regretify's regret-first calculator flow.",
};

export default function AssetsRoute() {
  if (!productFlags.assetsEnabled) {
    notFound();
  }

  return <AssetsPage />;
}
