import type { Metadata } from "next";
import { DesignPlaygroundPage } from "@/features/design-system/components/DesignPlaygroundPage";

export const metadata: Metadata = {
  title: "Design Playground | Regretify",
  description: "Internal playground for Regretify color and typography decisions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PlaygroundPage() {
  return <DesignPlaygroundPage />;
}
