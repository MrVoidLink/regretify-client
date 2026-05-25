import { DailyPulseNewsletterSection } from "@/features/market-pulse/components/DailyPulseNewsletterSection";
import { InternetLosingMindSection } from "@/features/market-pulse/components/InternetLosingMindSection";
import { MarketPulseHero } from "@/features/market-pulse/components/MarketPulseHero";
import { TodaysPulseSection } from "@/features/market-pulse/components/TodaysPulseSection";

export function MarketPulsePage() {
  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#faf8ff_100%)] text-zinc-950">
      <MarketPulseHero />
      <TodaysPulseSection />
      <InternetLosingMindSection />
      <DailyPulseNewsletterSection />
    </main>
  );
}
