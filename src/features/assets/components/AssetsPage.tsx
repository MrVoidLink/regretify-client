import { AssetsExplorerSection } from "@/features/assets/components/AssetsExplorerSection";
import { AssetsHeroSection } from "@/features/assets/components/AssetsHeroSection";
import { AssetsValueSection } from "@/features/assets/components/AssetsValueSection";

export function AssetsPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#fcfbff_0%,#ffffff_22%,#ffffff_100%)] text-zinc-950">
      <AssetsHeroSection />
      <AssetsExplorerSection />
      <AssetsValueSection />
    </main>
  );
}
