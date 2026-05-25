"use client";

import { useEffect, useRef } from "react";
import { calculatorMarkets } from "@/features/calculator/data/markets";
import type { CalculatorMarket, CalculatorMarketIcon } from "@/features/calculator/types";

function MarketGlyph({
  icon,
  accentColor,
}: {
  icon: CalculatorMarketIcon;
  accentColor: string;
}) {
  if (icon === "bitcoin") {
    return (
      <span
        className="text-[clamp(2.15rem,9vw,2.55rem)] font-semibold leading-none tracking-[-0.06em] lg:text-[2.2rem]"
        style={{ color: accentColor }}
      >
        B
      </span>
    );
  }

  if (icon === "stocks") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        className="h-[clamp(2.3rem,10vw,2.5rem)] w-[clamp(2.3rem,10vw,2.5rem)] lg:h-7.5 lg:w-7.5"
        fill="none"
        stroke={accentColor}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 48h44" opacity="0.22" />
        <path d="M12 41l12-14 9 9 17-20" />
        <path d="M43 16h7v7" />
      </svg>
    );
  }

  if (icon === "commodities") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        className="h-[clamp(2.3rem,10vw,2.5rem)] w-[clamp(2.3rem,10vw,2.5rem)] lg:h-7.5 lg:w-7.5"
        fill="none"
      >
        <path
          d="M15 34.5 27.5 27l12.5 7.5-12.5 7.5L15 34.5Z"
          fill={accentColor}
          opacity="0.92"
        />
        <path d="M15 34.5V49l12.5 7.5V42L15 34.5Z" fill={accentColor} opacity="0.78" />
        <path d="M40 34.5V49l-12.5 7.5V42L40 34.5Z" fill={accentColor} opacity="0.62" />
        <path
          d="M28.5 19 41 26.5 28.5 34 16 26.5 28.5 19Z"
          fill={accentColor}
          opacity="0.94"
        />
        <path d="M16 26.5V41l12.5 7.5V34L16 26.5Z" fill={accentColor} opacity="0.8" />
        <path d="M41 26.5V41l-12.5 7.5V34L41 26.5Z" fill={accentColor} opacity="0.66" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className="h-[clamp(2.3rem,10vw,2.5rem)] w-[clamp(2.3rem,10vw,2.5rem)] lg:h-7.5 lg:w-7.5"
      fill="none"
    >
      <rect x="8" y="8" width="16" height="16" rx="4" fill={accentColor} opacity="0.34" />
      <rect x="24" y="24" width="16" height="16" rx="4" fill={accentColor} opacity="0.56" />
      <rect x="40" y="8" width="16" height="16" rx="4" fill={accentColor} opacity="0.8" />
      <rect x="8" y="40" width="16" height="16" rx="4" fill={accentColor} opacity="0.86" />
      <rect x="40" y="40" width="16" height="16" rx="4" fill={accentColor} opacity="0.46" />
    </svg>
  );
}

function Chevron({ color }: { color: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4.5 w-4.5 lg:h-5 lg:w-5"
      fill="none"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7 4 6 6-6 6" />
    </svg>
  );
}

function MarketCard({
  market,
  isSelected,
  onSelect,
  registerRef,
}: {
  market: CalculatorMarket;
  isSelected: boolean;
  onSelect: (id: CalculatorMarket["id"]) => void;
  registerRef: (element: HTMLButtonElement | null) => void;
}) {
  const isDisabled = market.isDisabled ?? false;

  return (
    <button
      ref={registerRef}
      type="button"
      onClick={() => {
        if (!isDisabled) {
          onSelect(market.id);
        }
      }}
      disabled={isDisabled}
      aria-pressed={isSelected}
      className={`mobile-market-card flex h-full min-h-0 w-[clamp(5.85rem,25vw,6.35rem)] shrink-0 snap-start flex-col items-center rounded-[1.3rem] border bg-white px-[clamp(0.55rem,2.4vw,0.625rem)] py-[clamp(0.7rem,2.9vw,0.8125rem)] text-center shadow-[0_12px_26px_rgba(24,24,27,0.045)] transition-transform duration-200 md:min-w-0 md:w-auto md:rounded-[1.3rem] md:px-2.5 md:py-3 lg:grid lg:min-h-[5.15rem] lg:w-auto lg:grid-cols-[3.2rem_1fr_auto] lg:items-center lg:gap-2.5 lg:rounded-[1.25rem] lg:bg-white/92 lg:px-3.5 lg:py-2.5 lg:text-left lg:shadow-[0_14px_30px_rgba(24,24,27,0.06)] xl:min-h-[5.35rem] ${
        isDisabled ? "cursor-not-allowed opacity-52 saturate-75" : ""
      }`}
      style={{
        borderColor: isSelected ? `${market.accentColor}99` : "rgba(24,24,27,0.06)",
      }}
    >
      <div className="mobile-market-icon-wrap mt-1 grid h-[clamp(3.3rem,14vw,4rem)] w-[clamp(3.3rem,14vw,4rem)] place-items-center border border-zinc-950/6 bg-white shadow-[0_12px_24px_rgba(24,24,27,0.09)] [clip-path:polygon(50%_0%,92%_25%,92%_75%,50%_100%,8%_75%,8%_25%)] md:h-[3.3rem] md:w-[3.3rem] lg:mt-0 lg:h-[2.95rem] lg:w-[2.95rem] lg:rounded-[0.95rem] lg:border lg:[clip-path:none] lg:shadow-[0_10px_22px_rgba(24,24,27,0.08)]">
        <MarketGlyph icon={market.icon} accentColor={market.accentColor} />
      </div>

      <div className="mobile-market-copy mt-3.5 flex min-w-0 flex-1 flex-col justify-center md:mt-3 lg:mt-0 lg:block">
        <h3 className="mobile-market-title text-[clamp(0.7rem,2.85vw,0.75rem)] font-semibold leading-[1.12] tracking-[0.02em] text-zinc-950 md:text-[0.75rem] lg:text-[0.98rem] lg:tracking-[0.005em] xl:text-[1.06rem]">
          {market.name}
        </h3>
        <p className="mobile-market-text mt-1.75 px-0.5 text-[clamp(0.54rem,2.2vw,0.58rem)] leading-[1.52] tracking-[0.005em] text-zinc-700 md:mt-1.75 md:text-[0.6rem] md:leading-[1.42] lg:mt-1 lg:max-w-[10.25rem] lg:px-0 lg:text-[0.79rem] lg:leading-[1.4] xl:max-w-[11rem] xl:text-[0.83rem]">
          {market.description}
        </p>
        {isDisabled ? (
          <span className="mt-1.5 inline-flex self-center rounded-full bg-zinc-100 px-2 py-0.75 text-[0.52rem] font-semibold tracking-[0.14em] text-zinc-500 uppercase md:mt-1 md:text-[0.5rem] lg:mt-2 lg:self-start lg:text-[0.56rem]">
            Coming soon
          </span>
        ) : null}
      </div>

      <div className="mt-auto pt-3 pr-0 lg:mt-0 lg:pt-0 lg:pr-0">
        <Chevron color={isSelected ? market.accentColor : "#b6b8c2"} />
      </div>
    </button>
  );
}

export function MarketSelectionSidebar({
  selectedMarketId,
  onSelectedMarketChange,
}: {
  selectedMarketId: CalculatorMarket["id"];
  onSelectedMarketChange: (id: CalculatorMarket["id"]) => void;
}) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Partial<Record<CalculatorMarket["id"], HTMLButtonElement | null>>>({});
  const selectedMarket =
    calculatorMarkets.find((market) => market.id === selectedMarketId) ??
    calculatorMarkets[0];

  useEffect(() => {
    const slider = sliderRef.current;
    const card = cardRefs.current[selectedMarketId];

    if (!slider || !card) {
      return;
    }

    if (window.innerWidth >= 768) {
      return;
    }

    card.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [selectedMarketId]);

  return (
    <aside className="mobile-market-layout flex h-full w-full max-w-none flex-col md:grid md:grid-cols-[10.5rem_1fr] md:grid-rows-[auto_1fr] md:gap-x-4 md:gap-y-2 lg:flex lg:max-w-[18rem] lg:pt-0 xl:max-w-[18.75rem] xl:pt-0">
      <div className="pt-1 sm:pt-0 md:pt-2 lg:pt-0">
        <h1 className="mobile-market-heading type-display mt-2 text-[clamp(1.24rem,5vw,1.38rem)] font-semibold text-zinc-950 sm:mt-5 sm:text-[2.8rem] md:mt-0 md:text-[1.42rem] lg:mt-3 lg:whitespace-nowrap lg:text-[1.92rem] xl:text-[2rem]">
          Choose your market
        </h1>

        <p className="mobile-market-description mt-2 max-w-[clamp(12rem,44vw,16rem)] text-[clamp(0.64rem,2.35vw,0.68rem)] leading-[1.42] text-[var(--color-text-ui-soft)] sm:mt-4 sm:max-w-[18rem] sm:text-[1.02rem] sm:leading-[1.55] md:mt-2.5 md:max-w-[9.5rem] md:text-[0.64rem] md:leading-[1.34] lg:mt-2.5 lg:max-w-[12rem] lg:text-[0.84rem] lg:leading-[1.42] xl:max-w-[12.5rem] xl:text-[0.88rem]">
          Pick a market first. Then choose the asset you wish you had bought
          earlier.
        </p>
      </div>

      <div
        ref={sliderRef}
        className="mobile-market-row scrollbar-none -mx-1 mt-2.5 flex flex-1 snap-x snap-mandatory items-stretch gap-[clamp(0.4rem,1.8vw,0.4375rem)] overflow-x-auto px-1 pb-1 md:col-start-2 md:row-span-2 md:mt-0 md:grid md:grid-cols-4 md:gap-2 md:overflow-visible md:px-0 md:pb-2 lg:mx-0 lg:mt-4 lg:grid lg:grid-cols-1 lg:gap-2 lg:overflow-visible lg:px-0 lg:pb-0 xl:mt-[1.125rem] xl:gap-[0.5625rem]"
      >
        {calculatorMarkets.map((market) => (
          <MarketCard
            key={market.id}
            market={market}
            isSelected={market.id === selectedMarketId}
            onSelect={onSelectedMarketChange}
            registerRef={(element) => {
              cardRefs.current[market.id] = element;
            }}
          />
        ))}
      </div>

      <div className="mt-auto md:col-start-2 md:mt-0 lg:hidden">
        <div className="mt-2 flex justify-center gap-1.5 md:mt-3">
          {calculatorMarkets.map((market) => (
            <span
              key={market.id}
              className={`h-2.5 rounded-full ${
                market.id === selectedMarketId ? "w-6" : "w-2.5 bg-[var(--color-brand-border)]"
              }`}
              style={
                market.id === selectedMarketId
                  ? { backgroundColor: selectedMarket.accentColor }
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
