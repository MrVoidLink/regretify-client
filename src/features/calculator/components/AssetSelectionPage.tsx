"use client";

import Link from "next/link";
import { useState } from "react";
import { AssetSelectionControls } from "@/features/calculator/components/asset-selection/AssetSelectionControls";
import { AssetSelectionList } from "@/features/calculator/components/asset-selection/AssetSelectionList";
import { AssetSelectionSidebar } from "@/features/calculator/components/asset-selection/AssetSelectionSidebar";
import { calculatorMarkets } from "@/features/calculator/data/markets";
import {
  getAssetRoute,
  getAssetSelectionAssetBySlug,
  getAssetSlug,
  getDefaultAssetSelectionAsset,
} from "@/features/calculator/lib/assets";
import type { CalculatorMarketId } from "@/features/calculator/types";

function BackButton() {
  return (
    <Link
      href="/"
      className="hidden h-8 items-center gap-1.5 rounded-[0.8rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] px-2.5 text-[0.76rem] font-medium text-zinc-900 shadow-[0_8px_18px_rgba(24,24,27,0.03)] transition-colors hover:bg-[var(--color-brand-soft)] md:inline-flex"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-3.25 w-3.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m11.5 4.5-5 5 5 5" />
        <path d="M6.5 9.5h8" />
      </svg>
      <span>Back to market</span>
    </Link>
  );
}

function StepItem({
  id,
  label,
  value,
  status,
}: {
  id: number;
  label: string;
  value: string;
  status: "complete" | "active" | "pending";
}) {
  const isComplete = status === "complete";
  const isActive = status === "active";

  return (
    <div className="flex min-w-0 flex-col items-center gap-1.5 text-center md:flex-row md:items-center md:gap-2.5 md:text-left">
      <div className="flex min-w-0 flex-col items-center gap-1 md:flex-row md:items-center md:gap-2">
        <div
          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[0.66rem] font-semibold ${
            isComplete
              ? "border-[color:var(--color-success-border)] bg-[var(--color-success-soft)] text-[var(--color-success)]"
              : isActive
                ? "border-[color:var(--color-brand)] bg-[var(--color-brand)] text-white"
                : "border-[color:var(--color-border-ui-subtle)] bg-white text-[var(--color-text-ui-muted)]"
          }`}
        >
          {isComplete ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-3.25 w-3.25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m4.5 10 3 3 8-8" />
            </svg>
          ) : (
            id
          )}
        </div>

        <div className="min-w-0">
          <div className="text-[0.62rem] leading-none text-[var(--color-text-ui-muted)]">{label}</div>
          <div className="type-title mt-0.5 text-[0.78rem] font-semibold text-zinc-950">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepsStrip({ marketName }: { marketName: string }) {
  const steps = [
    {
      id: 1,
      label: "Market",
      value: marketName,
      status: "complete",
    },
    {
      id: 2,
      label: "Asset",
      value: "Choose",
      status: "active",
    },
    {
      id: 3,
      label: "Calculate",
      value: "Scenario",
      status: "pending",
    },
  ] as const;

  return (
    <section className="px-1 py-0.5 sm:rounded-[1rem] sm:border sm:border-[color:var(--color-border-ui-subtle)] sm:bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(249,246,255,0.92)_100%)] sm:px-2.5 sm:py-2 sm:shadow-[0_10px_24px_rgba(24,24,27,0.03)]">
      <div className="grid grid-cols-[minmax(0,1fr)_1.8rem_minmax(0,1fr)_1.8rem_minmax(0,1fr)] items-start sm:items-center">
        <StepItem {...steps[0]} />
        <div className="mt-3 h-px border-t border-dashed border-[color:var(--color-border-ui-subtle)] sm:mt-0" />
        <StepItem {...steps[1]} />
        <div className="mt-3 h-px border-t border-dashed border-[color:var(--color-border-ui-subtle)] sm:mt-0" />
        <StepItem {...steps[2]} />
      </div>
    </section>
  );
}

function HeroRow({ selectedMarketId }: { selectedMarketId: CalculatorMarketId }) {
  const selectedMarket =
    calculatorMarkets.find((market) => market.id === selectedMarketId) ?? calculatorMarkets[0];

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_13.5rem] lg:items-start">
      <section className="min-w-0">
        <h1 className="type-display mx-auto w-fit whitespace-nowrap text-[1.38rem] font-semibold text-zinc-950 max-[389px]:text-[1.26rem] sm:mx-0 sm:w-auto sm:text-[2.05rem]">
          Choose the <span className="text-[var(--color-brand)]">asset</span> you missed
        </h1>
        <p className="mt-1.5 max-w-[32rem] text-center text-[0.76rem] leading-5 text-[var(--color-text-ui-soft)] max-[389px]:text-[0.72rem] max-[389px]:leading-4.5 sm:text-left sm:text-[0.8rem]">
          <span className="sm:hidden">
            Great shot. You locked in {selectedMarket.name}.
            <br />
            Now pick the asset you wish you had bought.
          </span>
          <span className="hidden sm:inline">
            Great shot. You locked in the {selectedMarket.name} market.
            <br />
            Now, pick the asset you wish you had bought earlier.
            <span className="ml-1 text-[0.84rem] text-[var(--color-brand-muted)]">*</span>
          </span>
        </p>
      </section>

      <section className="rounded-[1rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(249,246,255,0.9)_100%)] px-3 py-2 shadow-[0_12px_28px_rgba(24,24,27,0.04)] max-[389px]:px-2.5 max-[389px]:py-1.75">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.25 max-[389px]:gap-2">
            <div className="grid h-7.5 w-7.5 place-items-center rounded-[0.85rem] bg-[linear-gradient(180deg,#ffd76a_0%,#ffbd2f_100%)] text-[0.82rem] font-semibold text-white shadow-[0_8px_16px_rgba(255,189,47,0.2)] max-[389px]:h-7 max-[389px]:w-7 max-[389px]:rounded-[0.75rem] max-[389px]:text-[0.76rem]">
              B
            </div>
            <div className="min-w-0">
              <div className="type-title text-[0.8rem] font-semibold text-zinc-950 max-[389px]:text-[0.74rem]">
                {selectedMarket.name}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1 text-[0.64rem] text-[var(--color-text-ui-muted)] max-[389px]:text-[0.6rem]">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-3 w-3 max-[389px]:h-2.75 max-[389px]:w-2.75"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4.8" y="8.7" width="10.4" height="6.5" rx="1.6" />
              <path d="M7.2 8.7V6.9A2.8 2.8 0 0 1 10 4.1a2.8 2.8 0 0 1 2.8 2.8v1.8" />
            </svg>
            <span>Locked in</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function MobileBottomCta({ scenarioHref }: { scenarioHref: string }) {
  return (
    <div className="fixed inset-x-4 bottom-4 z-40 max-[389px]:inset-x-3 max-[389px]:bottom-3 xl:hidden">
      <div className="grid gap-2">
        <Link
          href={scenarioHref}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-[0.95rem] bg-[linear-gradient(90deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] px-4 text-[0.84rem] font-semibold text-white shadow-[0_14px_28px_rgba(92,44,233,0.24)] max-[389px]:h-10 max-[389px]:rounded-[0.85rem] max-[389px]:text-[0.78rem] md:h-12 md:rounded-[1rem] md:text-[0.9rem]"
        >
          <span>Continue to scenario</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-4 w-4 max-[389px]:h-3.5 max-[389px]:w-3.5 md:h-4.5 md:w-4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 10h12" />
            <path d="m11 4 5 6-5 6" />
          </svg>
        </Link>

        <div className="flex items-center justify-center gap-1.5 rounded-full bg-white/96 px-3 py-1.5 text-center text-[0.68rem] text-[var(--color-text-ui-muted)] shadow-[0_8px_20px_rgba(24,24,27,0.04)] max-[389px]:px-2.5 max-[389px]:py-1.25 max-[389px]:text-[0.6rem] md:text-[0.72rem]">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4.8" y="8.7" width="10.4" height="6.5" rx="1.6" />
            <path d="M7.2 8.7V6.9A2.8 2.8 0 0 1 10 4.1a2.8 2.8 0 0 1 2.8 2.8v1.8" />
          </svg>
          <span>You&apos;ll set your dates and investment next</span>
        </div>
      </div>
    </div>
  );
}

export function AssetSelectionPage({
  initialMarketId,
}: {
  initialMarketId: CalculatorMarketId;
}) {
  const [selectedAssetSlug, setSelectedAssetSlug] = useState(() =>
    getAssetSlug(getDefaultAssetSelectionAsset()),
  );
  const selectedAsset =
    getAssetSelectionAssetBySlug(selectedAssetSlug) ?? getDefaultAssetSelectionAsset();
  const scenarioHref = getAssetRoute(selectedAsset);
  const selectedMarket =
    calculatorMarkets.find((market) => market.id === initialMarketId) ?? calculatorMarkets[0];

  return (
    <main className="min-h-[calc(100dvh-4.5rem)] bg-[linear-gradient(180deg,#ffffff_0%,#faf8ff_100%)] pb-28 xl:pb-0">
      <section className="mx-auto max-w-[96rem] px-5 pt-0 sm:px-7 sm:pt-1.5 lg:px-10">
        <div className="grid items-center gap-2.5 lg:grid-cols-[1fr_1.18fr_1fr]">
          <div className="justify-self-start">
            <BackButton />
          </div>
          <div className="w-full">
            <StepsStrip marketName={selectedMarket.name} />
          </div>
          <div className="hidden lg:block" />
        </div>

        <div className="mt-3.5 grid gap-3 xl:grid-cols-[minmax(0,1fr)_15.5rem] xl:items-start">
          <div className="grid gap-3">
            <HeroRow selectedMarketId={selectedMarket.id} />
            <AssetSelectionControls />
            <AssetSelectionList
              selectedAssetSlug={selectedAssetSlug}
              onAssetSelect={setSelectedAssetSlug}
            />
          </div>
          <AssetSelectionSidebar scenarioHref={scenarioHref} />
        </div>
      </section>
      <MobileBottomCta scenarioHref={scenarioHref} />
    </main>
  );
}
