import { CalculatorMarketPulseRailSection } from "@/features/calculator/components/CalculatorMarketPulseRailSection";
import { CalculatorHeroExperience } from "@/features/calculator/components/CalculatorHeroExperience";

export function CalculatorHomePage() {
  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#faf8ff_100%)] text-zinc-950">
      <CalculatorHeroExperience />
      <CalculatorMarketPulseRailSection />
    </main>
  );
}
