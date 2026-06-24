"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MarketSelectionSidebar } from "@/features/calculator/components/MarketSelectionSidebar";
import { calculatorMarkets } from "@/features/calculator/data/markets";
import type { CalculatorMarket } from "@/features/calculator/types";
import type { MiniGameStageTelemetry } from "@/features/calculator/components/mini-game/CalculatorMiniGameCanvas";

const CalculatorMiniGameCanvas = dynamic(
  () =>
    import("@/features/calculator/components/mini-game/CalculatorMiniGameCanvas").then(
      (module) => module.CalculatorMiniGameCanvas,
    ),
  {
    loading: () => <MiniGameCanvasLoadingState />,
    ssr: false,
  },
);

function MiniGameCanvasLoadingState() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden">
      <div className="rounded-[1.1rem] border border-white/80 bg-white/80 px-4 py-3 text-center shadow-[0_14px_36px_rgba(24,24,27,0.06)] backdrop-blur-sm">
        <div className="text-[0.8rem] font-semibold text-zinc-700 sm:text-[0.88rem]">
          Loading mini-game
        </div>
        <p className="mt-1 text-[0.72rem] leading-5 text-zinc-500 sm:text-[0.78rem]">
          Stage shell is ready. WebGL loads independently here.
        </p>
      </div>
    </div>
  );
}

function HudMouseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-950" fill="none" aria-hidden="true">
      <rect x="6.5" y="2.75" width="11" height="18.5" rx="5.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 2.75v7.25" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function HudAngleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-950" fill="none" aria-hidden="true">
      <path d="M5 18.5A9.5 9.5 0 0 1 18.5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 12 18.5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

function HudReleaseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-950" fill="none" aria-hidden="true">
      <rect x="6.5" y="2.75" width="11" height="18.5" rx="5.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 2.75v7.25" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 14.5h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m15.5 11.5 3 3-3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function HudWindIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-950" fill="none" aria-hidden="true">
      <path d="M3.5 9.5h8.5c2.2 0 3.5-1.2 3.5-3 0-1.5-1.1-2.75-2.75-2.75-1.3 0-2.3.75-2.8 1.95" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M3.5 14.5h13c2.2 0 3.5 1.25 3.5 3s-1.3 3-3.1 3c-1.35 0-2.45-.7-3.05-1.85" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function HudArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-zinc-950" fill="none" aria-hidden="true">
      <path d="M4 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m14 7 6 5-6 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HudExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-9 w-9 text-zinc-950" fill="none" aria-hidden="true">
      <path d="M9 5H5v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 5 11 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15 19h4v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m19 19-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MiniGameGuideStrip() {
  return (
    <div className="hidden w-full max-w-[46rem] items-center justify-between divide-x divide-zinc-200/75 rounded-[1.35rem] border border-white/78 bg-white/88 px-5 py-2.5 shadow-[0_22px_50px_rgba(24,24,27,0.08)] backdrop-blur-md lg:flex">
      <div className="flex min-w-0 flex-1 items-center gap-2.5 pr-4">
        <HudMouseIcon />
        <div>
          <div className="text-[0.66rem] font-semibold tracking-[0.14em] text-zinc-950">DRAG</div>
          <div className="text-[0.74rem] text-zinc-600">to aim</div>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-2.5 px-4">
        <HudAngleIcon />
        <div>
          <div className="text-[0.66rem] font-semibold tracking-[0.14em] text-zinc-950">ADJUST ANGLE</div>
          <div className="text-[0.74rem] text-zinc-600">find the sweet spot</div>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-2.5 px-4">
        <HudReleaseIcon />
        <div>
          <div className="text-[0.66rem] font-semibold tracking-[0.14em] text-zinc-950">RELEASE</div>
          <div className="text-[0.74rem] text-zinc-600">to shoot</div>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2.5 pl-4">
        <div className="flex items-center gap-2.5">
          <HudWindIcon />
          <div>
            <div className="text-[0.66rem] font-semibold tracking-[0.14em] text-zinc-950">WIND</div>
            <div className="text-[0.8rem] font-semibold text-zinc-950">0.0 m/s</div>
          </div>
        </div>
        <HudArrowIcon />
      </div>
    </div>
  );
}

function MiniGameTelemetryPanel({
  accentColor,
  telemetry,
}: {
  accentColor: string;
  telemetry: MiniGameStageTelemetry;
}) {
  const angleDegrees = Math.round(telemetry.targetAimAngle);
  const powerPercent = Math.round(telemetry.drawProgress * 100);
  const powerFillWidth = Math.max(powerPercent, 6);

  return (
    <div className="hidden w-full max-w-[40rem] items-center gap-5 rounded-[1.35rem] border border-white/82 bg-white/90 px-6 py-3 shadow-[0_22px_50px_rgba(24,24,27,0.08)] backdrop-blur-md lg:flex">
      <div className="flex min-w-[12rem] items-center gap-3">
        <HudExpandIcon />
        <div className="min-w-0">
          <div className="flex items-end gap-2">
            <span className="text-[1.6rem] font-semibold leading-none text-zinc-950">{angleDegrees}</span>
            <span className="pb-0.5 text-[0.92rem] font-semibold text-zinc-950">&deg;</span>
          </div>
          <div className="mt-0.5 text-[0.68rem] font-semibold tracking-[0.16em] text-zinc-500">
            ANGLE
          </div>
        </div>
      </div>

      <div className="h-10 w-px bg-zinc-200/85" />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3 text-zinc-950">
          <span className="text-[0.74rem] font-semibold tracking-[0.16em]">POWER</span>
          <span className="text-[0.92rem] font-semibold">{powerPercent}%</span>
        </div>
        <div className="mt-2.5 h-1.5 rounded-full bg-zinc-200/95">
          <div
            className="relative h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
              width: `${powerFillWidth}%`,
            }}
          >
            <span
              className="absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 translate-x-1/2 rounded-full border-2 bg-white"
              style={{
                borderColor: accentColor,
                boxShadow: `0 4px 10px ${accentColor}52`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniGameMobileInstructionPanel({
  accentColor,
  className,
  telemetry,
}: {
  accentColor: string;
  className?: string;
  telemetry: MiniGameStageTelemetry;
}) {
  const angleDegrees = Math.round(telemetry.targetAimAngle);
  const powerPercent = Math.round(telemetry.drawProgress * 100);
  const powerFillWidth = Math.max(powerPercent, 6);

  return (
    <div className={`grid gap-2.5 ${className ?? "md:hidden"}`}>
      <div className="grid grid-cols-3 divide-x divide-zinc-200/80 rounded-[1.22rem] border border-white/80 bg-white/88 px-2 py-1.75 shadow-[0_18px_42px_rgba(24,24,27,0.06)] backdrop-blur-md">
        <div className="flex items-center justify-center gap-1.5 px-1.5">
          <HudMouseIcon />
          <div className="min-w-0">
            <div className="text-[0.58rem] font-semibold tracking-[0.14em] text-zinc-950">
              DRAG
            </div>
            <div className="text-[0.66rem] leading-3.5 text-zinc-600">Aim</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5 px-1.5">
          <HudAngleIcon />
          <div className="min-w-0">
            <div className="text-[0.58rem] font-semibold tracking-[0.14em] text-zinc-950">
              ANGLE
            </div>
            <div className="text-[0.66rem] leading-3.5 text-zinc-600">Set</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5 px-1.5">
          <HudReleaseIcon />
          <div className="min-w-0">
            <div className="text-[0.58rem] font-semibold tracking-[0.14em] text-zinc-950">
              RELEASE
            </div>
            <div className="text-[0.66rem] leading-3.5 text-zinc-600">Shoot</div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.22rem] border border-white/80 bg-white/90 px-3 py-2 shadow-[0_18px_42px_rgba(24,24,27,0.06)] backdrop-blur-md">
        <div className="grid grid-cols-[auto_1fr] gap-3">
          <div className="flex min-w-[5.75rem] items-center gap-2">
            <HudExpandIcon />
            <div className="min-w-0">
              <div className="flex items-end gap-1.5">
                <span className="text-[1.35rem] font-semibold leading-none text-zinc-950">
                  {angleDegrees}
                </span>
                <span className="pb-0.5 text-[0.76rem] font-semibold text-zinc-950">&deg;</span>
              </div>
              <div className="mt-0.5 text-[0.58rem] font-semibold tracking-[0.16em] text-zinc-500">
                ANGLE
              </div>
            </div>
          </div>

          <div className="min-w-0 border-l border-zinc-200/85 pl-3">
            <div className="flex items-center gap-2.5 text-zinc-950">
              <span className="text-[0.64rem] font-semibold tracking-[0.16em]">POWER</span>
              <span className="text-[0.8rem] font-semibold">{powerPercent}%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-zinc-200/95">
              <div
                className="relative h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
                  width: `${powerFillWidth}%`,
                }}
              >
                <span
                  className="absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 translate-x-1/2 rounded-full border-2 bg-white"
                  style={{
                    borderColor: accentColor,
                    boxShadow: `0 4px 10px ${accentColor}52`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniGameStage({
  accentColor,
  onTelemetryChange,
  selectedMarketId,
  telemetry,
}: {
  accentColor: string;
  onTelemetryChange: (telemetry: MiniGameStageTelemetry) => void;
  selectedMarketId: CalculatorMarket["id"];
  telemetry: MiniGameStageTelemetry;
}) {
  return (
    <div className="relative h-full min-h-[15.5rem] overflow-hidden rounded-[1.1rem] sm:min-h-[20rem] sm:rounded-[1.5rem] md:min-h-0 md:rounded-[1.55rem] lg:min-h-full lg:rounded-none">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-3.5 pt-4 text-center sm:px-5 sm:pt-5 md:px-6 md:pt-4 lg:pt-8">
        <div className="type-display text-[1.3rem] font-semibold text-zinc-950 sm:text-[2rem] md:text-[1.72rem] lg:text-[2.75rem]">
          Take your shot
        </div>
        <p className="mt-1 text-[0.76rem] text-[var(--color-text-ui-soft)] sm:text-[0.9rem] md:text-[0.82rem] lg:mt-1.5 lg:text-[0.94rem]">
          Drag to draw, aim, and release
        </p>
      </div>

      <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
        <CalculatorMiniGameCanvas
          onTelemetryChange={onTelemetryChange}
          selectedMarketId={selectedMarketId}
          targetHaloColor={accentColor}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 px-2.5 sm:px-4 md:hidden">
        <MiniGameMobileInstructionPanel
          accentColor={accentColor}
          telemetry={telemetry}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-2 z-20 hidden justify-center px-8 lg:flex xl:bottom-3">
        <div className="flex w-full max-w-[46rem] flex-col items-center gap-2">
          <MiniGameGuideStrip />
          <MiniGameTelemetryPanel accentColor={accentColor} telemetry={telemetry} />
        </div>
      </div>
    </div>
  );
}

export function CalculatorHeroExperience() {
  const desktopHeroBackgroundImagePath = "/images/home/hero-background-test-backg-lite.webp";
  const mobileStageBackgroundImagePath = "/images/home/hero-stage-mobile-v4.png";
  const tabletStageBackgroundImagePath = "/images/home/hero-stage-tablet-v1.png";
  const [selectedMarketId, setSelectedMarketId] = useState<CalculatorMarket["id"]>(
    calculatorMarkets.find((market) => market.isSelected)?.id ?? calculatorMarkets[0].id,
  );
  const selectedMarket =
    calculatorMarkets.find((market) => market.id === selectedMarketId) ?? calculatorMarkets[0];
  const [miniGameTelemetry, setMiniGameTelemetry] = useState<MiniGameStageTelemetry>({
    drawProgress: 0,
    dragging: false,
    releasing: false,
    targetAimAngle: 50,
    activeAimAnchorAngle: 50,
  });

  return (
    <section className="mobile-profile-shell relative -mt-16 min-h-[100dvh] overflow-hidden pt-16 md:-mt-20 md:h-[100dvh] md:pt-20 lg:h-auto lg:min-h-[100dvh] lg:-mt-[4.5rem] lg:pt-[4.5rem]">
      <div
        aria-hidden="true"
        className="absolute inset-0 md:hidden"
        style={{
          backgroundColor: "#f7f5fb",
          backgroundImage: `url('${mobileStageBackgroundImagePath}')`,
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          filter: "saturate(1.01) brightness(1.01) contrast(1)",
          opacity: 1,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden md:block lg:hidden"
        style={{
          backgroundColor: "#f7f5fb",
          backgroundImage: `url('${tabletStageBackgroundImagePath}')`,
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          filter: "saturate(1.02) brightness(1.01) contrast(1)",
          opacity: 1,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{
          backgroundColor: "#050715",
          backgroundImage: `url('${desktopHeroBackgroundImagePath}')`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          filter: "saturate(1.02) brightness(1) contrast(1)",
          opacity: 1,
        }}
      />
      <div className="absolute inset-0 bg-transparent" />
      <div
        aria-hidden="true"
        className="absolute inset-x-[-4%] bottom-[-2%] h-[34%]"
        style={{
          backgroundImage: "none",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          maskImage: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.68) 28%, rgba(0,0,0,1) 100%)",
          opacity: 0,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-[15%] bottom-[-1%] h-[26%]"
        style={{
          backgroundImage: "none",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          filter: "saturate(0.92) brightness(1.02) contrast(1.16)",
          maskImage:
            "radial-gradient(ellipse at center bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 42%, rgba(0,0,0,0.72) 62%, transparent 84%)",
          opacity: 0,
        }}
      />
      <div className="mobile-profile-grid mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-[96rem] grid-cols-1 grid-rows-[minmax(10.5rem,3fr)_minmax(11.5rem,2fr)] gap-2.5 px-3 py-2.5 sm:gap-4 sm:px-8 sm:py-6 sm:grid-rows-[minmax(12rem,3fr)_minmax(12.5rem,2fr)] md:h-full md:min-h-0 md:grid-rows-[minmax(0,3fr)_minmax(0,1fr)] md:px-6 md:py-4 lg:h-auto lg:grid-cols-[18rem_1fr] lg:grid-rows-1 lg:content-start lg:gap-2 lg:px-8 lg:py-3 xl:grid-cols-[18.75rem_1fr] xl:gap-3">
        <div className="relative order-2 h-full lg:order-1">
          <div className="absolute inset-x-0 -top-[7.15rem] z-10 hidden justify-center md:flex lg:hidden">
            <MiniGameMobileInstructionPanel
              accentColor={selectedMarket.accentColor}
              className="hidden w-[78%] max-w-[27rem] md:grid lg:hidden"
              telemetry={miniGameTelemetry}
            />
          </div>
          <div className="mobile-market-shell relative h-full overflow-hidden rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.74)_0%,rgba(249,246,255,0.8)_100%)] p-3 shadow-[0_16px_38px_rgba(24,24,27,0.04)] backdrop-blur-[2px] sm:rounded-[1.5rem] sm:p-5 md:rounded-[1.65rem] md:p-4 lg:px-3 lg:py-7 xl:py-8">
            <MarketSelectionSidebar
              selectedMarketId={selectedMarketId}
              onSelectedMarketChange={setSelectedMarketId}
            />
          </div>
        </div>

        <div className="mobile-stage-shell relative order-1 h-full rounded-[1.35rem] p-2.5 sm:rounded-[1.75rem] sm:p-5 md:rounded-[1.85rem] md:p-4 lg:order-2 lg:min-h-[calc(100dvh-7.75rem)] lg:p-0">
          <MiniGameStage
            accentColor={selectedMarket.accentColor}
            onTelemetryChange={setMiniGameTelemetry}
            selectedMarketId={selectedMarketId}
            telemetry={miniGameTelemetry}
          />
        </div>
      </div>
    </section>
  );
}
