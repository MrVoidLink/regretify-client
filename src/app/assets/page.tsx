import type { Metadata } from "next";
import { AssetsPage } from "@/features/assets/components/AssetsPage";

export const metadata: Metadata = {
  title: "Assets | Regretify",
  description:
    "Explore assets, discover market leaders, and jump directly into Regretify's regret-first calculator flow.",
};

export default function AssetsRoute() {
  return <AssetsPage />;
}
