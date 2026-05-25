 "use client";

import { useState } from "react";
import { CalculatorSeoPreviewSection } from "@/features/calculator/components/CalculatorSeoPreviewSection";
import { MarketSelectionSidebar } from "@/features/calculator/components/MarketSelectionSidebar";
import { MiniGameCharacterTestCanvas } from "@/features/calculator/components/mini-game/MiniGameCharacterTestCanvas";
import { calculatorMarkets } from "@/features/calculator/data/markets";
import type { CalculatorMarket } from "@/features/calculator/types";

function MiniGameStage({ selectedMarketId }: { selectedMarketId: CalculatorMarket["id"] }) {
  return (
    <div className="relative h-full min-h-[15.5rem] overflow-hidden rounded-[1.1rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(249,247,252,0.92)_100%)] sm:min-h-[20rem] sm:rounded-[1.5rem] md:min-h-0 md:rounded-[1.55rem] lg:min-h-full lg:rounded-none lg:border-0">
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit]"
        style={{
          backgroundImage: "url('/images/home/background-hq.png')",
          opacity: 0.48,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-3.5 pt-4 text-center sm:px-5 sm:pt-5 md:px-6 md:pt-4 lg:pt-8">
        <div className="type-display text-[1.55rem] font-semibold text-zinc-950 sm:text-[2.4rem] md:text-[2rem] lg:text-[3.3rem]">
          Take your shot
        </div>
        <p className="mt-1.5 text-[0.82rem] text-[var(--color-text-ui-soft)] sm:text-[1rem] md:text-[0.92rem] lg:mt-2 lg:text-[1.05rem]">
          Drag to draw, aim, and release
        </p>
      </div>

      <div className="absolute inset-x-3 bottom-3 top-[5.5rem] overflow-hidden rounded-[0.95rem] border border-[color:var(--color-border-ui-subtle)] bg-white/42 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-[2px] sm:inset-x-5 sm:bottom-5 sm:top-[7rem] sm:rounded-[1.25rem] md:inset-x-6 md:bottom-4 md:top-[6rem] lg:inset-x-8 lg:bottom-8 lg:top-[8.5rem]">
        <MiniGameCharacterTestCanvas selectedMarketId={selectedMarketId} />
      </div>
    </div>
  );
}

export function CalculatorHomePage() {
  const [selectedMarketId, setSelectedMarketId] = useState<CalculatorMarket["id"]>(
    calculatorMarkets.find((market) => market.isSelected)?.id ?? calculatorMarkets[0].id,
  );

  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#faf8ff_100%)] text-zinc-950">
      <section className="mobile-profile-shell min-h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] lg:h-auto lg:min-h-[calc(100dvh-4.5rem)]">
        <div className="mobile-profile-grid mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-[96rem] grid-cols-1 grid-rows-[minmax(10.5rem,3fr)_minmax(11.5rem,2fr)] gap-2.5 px-3 py-2.5 sm:gap-4 sm:px-8 sm:py-6 sm:grid-rows-[minmax(12rem,3fr)_minmax(12.5rem,2fr)] md:h-full md:min-h-0 md:grid-rows-[minmax(0,3fr)_minmax(0,1fr)] md:px-6 md:py-4 lg:h-auto lg:grid-cols-[18rem_1fr] lg:grid-rows-1 lg:content-start lg:gap-2 lg:px-8 lg:py-3 xl:grid-cols-[18.75rem_1fr] xl:gap-3">
          <div className="mobile-market-shell order-2 h-full overflow-hidden rounded-[1.35rem] border border-[color:var(--color-brand-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(249,246,255,0.96)_100%)] p-3 shadow-[0_16px_38px_rgba(24,24,27,0.04)] sm:rounded-[1.5rem] sm:p-5 md:rounded-[1.65rem] md:p-4 lg:order-1 lg:px-3 lg:py-7 xl:py-8">
            <MarketSelectionSidebar
              selectedMarketId={selectedMarketId}
              onSelectedMarketChange={setSelectedMarketId}
            />
          </div>

          <div className="mobile-stage-shell order-1 h-full rounded-[1.35rem] border border-[color:var(--color-border-ui-strong)] bg-[linear-gradient(180deg,rgba(250,248,255,0.94)_0%,rgba(245,244,248,0.72)_100%)] p-2.5 shadow-[0_16px_40px_rgba(24,24,27,0.045)] sm:rounded-[1.75rem] sm:p-5 md:rounded-[1.85rem] md:p-4 lg:order-2 lg:min-h-[calc(100dvh-7.75rem)] lg:p-0">
            <MiniGameStage selectedMarketId={selectedMarketId} />
          </div>
        </div>
      </section>

      <CalculatorSeoPreviewSection />
    </main>
  );
}
