"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  assetsExplorerChips,
  assetsExplorerRows,
  assetsTrendingItems,
} from "@/features/assets/data/assetsExplorerContent";
import type { AssetsExplorerRow, AssetsTrendingItem } from "@/features/assets/types";

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 text-[var(--color-text-ui-muted)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="9" r="5.5" />
      <path d="m13.3 13.3 3.2 3.2" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10h11.5" />
      <path d="m11 4.5 5 5.5-5 5.5" />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4.5" y="2.5" width="11" height="15" rx="2.2" />
      <path d="M7 6.25h6" />
      <path d="M7 10.25h1.5" />
      <path d="M10 10.25h1.5" />
      <path d="M13 10.25h0.01" />
      <path d="M7 13.25h1.5" />
      <path d="M10 13.25h1.5" />
      <path d="M13 13.25h0.01" />
    </svg>
  );
}

function PopularitySparkline({
  path,
  tone,
}: {
  path: string;
  tone: "positive" | "negative";
}) {
  const stroke = tone === "negative" ? "#ef4444" : "#22c55e";
  const fill = tone === "negative" ? "rgba(239,68,68,0.14)" : "rgba(34,197,94,0.14)";
  const fillId = `assets-popularity-${tone}-${path.length}`;

  return (
    <svg viewBox="0 0 120 30" className="h-8 w-[6.7rem]" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={fillId} x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor={fill} />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <path d={`${path} L120 30 L0 30 Z`} fill={`url(#${fillId})`} />
      <path d={path} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function categoryToneClassName(tone: AssetsExplorerRow["categoryTone"]) {
  if (tone === "amber") {
    return "bg-[rgba(245,158,11,0.1)] text-[var(--color-warning)]";
  }

  if (tone === "blue") {
    return "bg-[rgba(59,130,246,0.1)] text-[#2563eb]";
  }

  return "bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)]";
}

function MobileAssetsExplorerTableRowItem({ asset }: { asset: AssetsExplorerRow }) {
  const isNegative = asset.dailyChangeLabel.startsWith("-");
  const changeToneClassName = isNegative
    ? "text-[var(--color-danger)]"
    : "text-[var(--color-success)]";

  return (
    <tr className="border-t border-[color:var(--color-border-ui-subtle)]">
      <td className="py-2.5 pr-1.5 pl-2.5 sm:py-4 sm:pr-4 sm:pl-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className={`grid h-8 w-8 place-items-center rounded-full text-[0.74rem] font-semibold sm:h-10 sm:w-10 sm:text-[0.88rem] ${asset.markClassName}`}
          >
            {asset.mark}
          </span>
          <div className="min-w-0">
            <p className="type-title text-[0.84rem] font-semibold text-zinc-950 sm:text-[1rem]">
              {asset.ticker}
            </p>
            <p className="truncate text-[0.68rem] text-[var(--color-text-ui-soft)] sm:text-[0.8rem]">
              {asset.name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-1.5 py-2.5 sm:px-4 sm:py-4">
        <span
          className={`inline-flex min-h-6 items-center rounded-[0.7rem] px-2 text-[0.66rem] font-semibold sm:min-h-8 sm:rounded-[0.8rem] sm:px-3 sm:text-[0.8rem] ${categoryToneClassName(asset.categoryTone)}`}
        >
          {asset.categoryLabel}
        </span>
      </td>
      <td className="whitespace-nowrap px-1.5 py-2.5 text-[0.76rem] font-semibold text-zinc-950 sm:px-4 sm:py-4 sm:text-[0.96rem]">
        {asset.priceLabel}
      </td>
      <td className={`whitespace-nowrap px-1.5 py-2.5 text-[0.78rem] font-semibold sm:px-4 sm:py-4 sm:text-[0.98rem] ${changeToneClassName}`}>
        {asset.dailyChangeLabel}
      </td>
      <td className="whitespace-nowrap px-1.5 py-2.5 text-[0.76rem] font-semibold text-zinc-950 sm:px-4 sm:py-4 sm:text-[0.96rem]">
        {asset.marketCapLabel}
      </td>
      <td className="px-1.5 py-2.5 sm:px-4 sm:py-4">
        <PopularitySparkline path={asset.popularityPath} tone={isNegative ? "negative" : "positive"} />
      </td>
      <td className="px-1 py-2.5 sm:px-4 sm:py-4">
        <Link
          href="/asset-selection"
          className="inline-flex min-h-8 items-center gap-1.5 rounded-[0.8rem] bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] px-2.5 text-[0.72rem] font-semibold text-white shadow-[0_10px_20px_rgba(111,67,255,0.18)] sm:min-h-10 sm:gap-2 sm:px-3 sm:text-[0.8rem]"
        >
          <span>Calc</span>
          <CalculatorIcon />
        </Link>
      </td>
      <td className="py-2.5 pr-2 pl-1 text-right sm:py-4 sm:pr-5 sm:pl-2">
        <Link
          href="/asset-selection"
          className="inline-flex min-h-8 items-center gap-1.5 rounded-[0.8rem] border border-[color:var(--color-border-ui-subtle)] bg-white px-2.5 text-[0.72rem] font-semibold text-zinc-950 shadow-[0_8px_18px_rgba(24,24,27,0.04)] sm:min-h-10 sm:gap-2 sm:px-3 sm:text-[0.8rem]"
        >
          <span>View</span>
          <ArrowIcon />
        </Link>
      </td>
    </tr>
  );
}

function TrendingRow({
  item,
  index,
}: {
  item: AssetsTrendingItem;
  index: number;
}) {
  return (
    <div className="flex items-center gap-3 py-4 first:pt-0 last:pb-0">
      <span className="w-4 shrink-0 text-[0.86rem] font-semibold text-zinc-500">{index + 1}</span>
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-[0.96rem] font-semibold ${item.markClassName}`}
      >
        {item.mark}
      </span>
      <div className="min-w-0 flex-1">
        <p className="type-title text-[0.98rem] font-semibold text-zinc-950">{item.ticker}</p>
        <p className="truncate text-[0.82rem] text-[var(--color-text-ui-soft)]">{item.name}</p>
      </div>
      <span className="text-[0.92rem] font-semibold text-[var(--color-success)]">{item.moveLabel}</span>
    </div>
  );
}

export function AssetsExplorerSection() {
  const initialVisibleCount = 7;
  const showMoreStep = 5;
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState("All Categories");
  const categoryMenuRef = useRef<HTMLDivElement | null>(null);
  const visibleRows = assetsExplorerRows.slice(0, visibleCount);
  const hasMoreRows = visibleCount < assetsExplorerRows.length;

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!categoryMenuRef.current?.contains(event.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  return (
    <section className="mx-auto max-w-[96rem] px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8 lg:pb-12">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="overflow-hidden rounded-[2rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(252,250,255,0.94)_100%)] shadow-[0_22px_58px_rgba(24,24,27,0.05)] lg:rounded-[2.2rem]">
          <div className="border-b border-[color:var(--color-border-ui-subtle)] px-5 py-5 sm:px-6 lg:px-7 lg:py-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="type-title text-[1.45rem] font-semibold text-zinc-950">Asset Explorer</h2>
                <p className="mt-1 text-[0.92rem] text-[var(--color-text-ui-soft)]">
                  Search, filter, and open the assets people keep coming back to.
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:w-auto lg:flex-row lg:items-center">
                <label className="flex min-h-11 w-full items-center gap-2 rounded-[0.95rem] border border-[color:var(--color-border-ui-subtle)] bg-white px-4 text-[0.88rem] text-[var(--color-text-ui-soft)] shadow-[0_10px_24px_rgba(24,24,27,0.03)] lg:w-[12.5rem]">
                  <SearchIcon />
                  <input
                    type="search"
                    placeholder="Search assets..."
                    aria-label="Search assets"
                    className="w-full bg-transparent text-zinc-950 outline-none placeholder:text-[var(--color-text-ui-muted)]"
                  />
                </label>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-2 lg:gap-3">
              <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex w-max gap-2.5 pr-1">
                  {assetsExplorerChips.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      className={`inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-[0.9rem] border px-3.5 text-[0.82rem] font-semibold transition-colors ${
                        chip.isActive
                          ? "border-[color:var(--color-brand-border)] bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] text-white shadow-[0_12px_24px_rgba(124,58,237,0.18)]"
                          : "border-[color:var(--color-border-ui-subtle)] bg-white text-zinc-700 hover:bg-[var(--color-surface-ui-subtle)]"
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              <div ref={categoryMenuRef} className="relative shrink-0">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isCategoryMenuOpen}
                  onClick={() => setIsCategoryMenuOpen((current) => !current)}
                  className="sticky right-0 inline-flex min-h-10 items-center gap-2 rounded-[0.9rem] border border-[color:var(--color-border-ui-subtle)] bg-white/96 px-3.5 text-[0.82rem] font-semibold text-zinc-950 shadow-[0_10px_24px_rgba(24,24,27,0.04)] transition-colors hover:bg-[var(--color-surface-ui-subtle)] lg:static"
                >
                  <span>{selectedCategoryLabel}</span>
                  <span className="h-4 w-px bg-[color:var(--color-border-ui-subtle)]" aria-hidden="true" />
                  <span
                    className={`transition-transform duration-200 ${isCategoryMenuOpen ? "rotate-180" : ""}`}
                  >
                    <ChevronDownIcon />
                  </span>
                </button>

                {isCategoryMenuOpen ? (
                  <div
                    role="menu"
                    className="absolute top-full right-0 z-20 mt-2 min-w-[11rem] rounded-[1rem] border border-[color:var(--color-border-ui-subtle)] bg-white p-1.5 shadow-[0_18px_42px_rgba(24,24,27,0.12)]"
                  >
                    {["All Categories", "Crypto", "Stocks", "Commodities"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setSelectedCategoryLabel(option);
                          setIsCategoryMenuOpen(false);
                        }}
                        className={`flex min-h-10 w-full items-center rounded-[0.8rem] px-3 text-left text-[0.82rem] font-semibold transition-colors ${
                          selectedCategoryLabel === option
                            ? "bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)]"
                            : "text-zinc-800 hover:bg-[var(--color-surface-ui-subtle)]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="grid grid-cols-[minmax(0,1.35fr)_6rem_7rem_7rem_7rem_7rem_6.5rem_5rem] gap-4 px-7 py-4 text-[0.76rem] font-semibold tracking-[0.06em] text-[var(--color-text-ui-muted)] uppercase">
              <p>Asset</p>
              <p>Category</p>
              <p>Price</p>
              <p>24H Change</p>
              <p>Market Cap</p>
              <p>Popularity</p>
              <p>Calculate</p>
              <p>View</p>
            </div>

            <div>
              {visibleRows.map((asset) => {
                const isNegative = asset.dailyChangeLabel.startsWith("-");
                const changeToneClassName = isNegative
                  ? "text-[var(--color-danger)]"
                  : "text-[var(--color-success)]";

                return (
                  <div
                    key={asset.id}
                    className="grid grid-cols-[minmax(0,1.35fr)_6rem_7rem_7rem_7rem_7rem_6.5rem_5rem] gap-4 border-t border-[color:var(--color-border-ui-subtle)] px-7 py-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-[0.92rem] font-semibold ${asset.markClassName}`}
                      >
                        {asset.mark}
                      </span>
                      <div className="min-w-0">
                        <p className="type-title text-[1rem] font-semibold text-zinc-950">{asset.name}</p>
                        <p className="text-[0.78rem] text-[var(--color-text-ui-soft)]">{asset.ticker}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span
                        className={`inline-flex min-h-7 items-center rounded-[0.8rem] px-2.5 text-[0.72rem] font-semibold ${categoryToneClassName(asset.categoryTone)}`}
                      >
                        {asset.categoryLabel}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <p className="type-title text-[0.98rem] font-semibold text-zinc-950">{asset.priceLabel}</p>
                    </div>

                    <div className="flex items-center">
                      <p className={`type-title text-[0.98rem] font-semibold ${changeToneClassName}`}>
                        {asset.dailyChangeLabel}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="type-title text-[0.98rem] font-semibold text-zinc-950">{asset.marketCapLabel}</p>
                    </div>

                    <div className="flex items-center">
                      <PopularitySparkline
                        path={asset.popularityPath}
                        tone={isNegative ? "negative" : "positive"}
                      />
                    </div>

                    <div className="flex items-center">
                      <Link
                        href="/asset-selection"
                        className="inline-flex min-h-10 items-center gap-2 rounded-[0.95rem] bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] px-3 text-[0.8rem] font-semibold text-white shadow-[0_12px_26px_rgba(111,67,255,0.2)] transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        <span>Calc</span>
                        <CalculatorIcon />
                      </Link>
                    </div>

                    <div className="flex items-center justify-end">
                      <Link
                        href="/asset-selection"
                        className="inline-flex min-h-10 items-center gap-2 rounded-[0.95rem] border border-[color:var(--color-border-ui-subtle)] bg-white px-3 text-[0.8rem] font-semibold text-zinc-950 shadow-[0_10px_22px_rgba(24,24,27,0.04)] transition-colors hover:bg-[var(--color-surface-ui-subtle)]"
                      >
                        <span>View</span>
                        <ArrowIcon />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {hasMoreRows ? (
              <div className="flex justify-center border-t border-[color:var(--color-border-ui-subtle)] px-7 py-5">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((current) =>
                      Math.min(current + showMoreStep, assetsExplorerRows.length),
                    )
                  }
                  className="inline-flex min-h-11 items-center gap-2 rounded-[0.95rem] border border-[color:var(--color-border-ui-subtle)] bg-white px-4.5 text-[0.88rem] font-semibold text-zinc-950 shadow-[0_10px_22px_rgba(24,24,27,0.04)] transition-colors hover:bg-[var(--color-surface-ui-subtle)]"
                >
                  <span>Show more</span>
                  <ArrowIcon />
                </button>
              </div>
            ) : null}
          </div>

          <div className="lg:hidden">
            <div className="max-w-full overflow-x-auto overscroll-x-contain touch-pan-x pb-1">
              <table className="min-w-max border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="border-y border-t border-[color:var(--color-border-ui-subtle)] bg-white/86 py-2.5 pr-1.5 pl-2.5 text-left text-[0.64rem] font-semibold tracking-[0.03em] text-[var(--color-text-ui-muted)] first:rounded-tl-[1.2rem] sm:pr-4 sm:pl-5 sm:py-3 sm:text-[0.78rem]">
                      Asset
                    </th>
                    <th className="whitespace-nowrap border-y border-t border-[color:var(--color-border-ui-subtle)] px-1.5 py-2.5 text-left text-[0.64rem] font-semibold tracking-[0.03em] text-[var(--color-text-ui-muted)] sm:px-4 sm:py-3 sm:text-[0.78rem]">
                      Category
                    </th>
                    <th className="whitespace-nowrap border-y border-t border-[color:var(--color-border-ui-subtle)] px-1.5 py-2.5 text-left text-[0.64rem] font-semibold tracking-[0.03em] text-[var(--color-text-ui-muted)] sm:px-4 sm:py-3 sm:text-[0.78rem]">
                      Price
                    </th>
                    <th className="whitespace-nowrap border-y border-t border-[color:var(--color-border-ui-subtle)] px-1.5 py-2.5 text-left text-[0.64rem] font-semibold tracking-[0.03em] text-[var(--color-text-ui-muted)] sm:px-4 sm:py-3 sm:text-[0.78rem]">
                      Change
                    </th>
                    <th className="whitespace-nowrap border-y border-t border-[color:var(--color-border-ui-subtle)] px-1.5 py-2.5 text-left text-[0.64rem] font-semibold tracking-[0.03em] text-[var(--color-text-ui-muted)] sm:px-4 sm:py-3 sm:text-[0.78rem]">
                      Market Cap
                    </th>
                    <th className="whitespace-nowrap border-y border-t border-[color:var(--color-border-ui-subtle)] px-1.5 py-2.5 text-left text-[0.64rem] font-semibold tracking-[0.03em] text-[var(--color-text-ui-muted)] sm:px-4 sm:py-3 sm:text-[0.78rem]">
                      Popularity
                    </th>
                    <th className="whitespace-nowrap border-y border-t border-[color:var(--color-border-ui-subtle)] px-1 py-2.5 text-left text-[0.64rem] font-semibold tracking-[0.03em] text-[var(--color-text-ui-muted)] sm:px-4 sm:py-3 sm:text-[0.78rem]">
                      Calc
                    </th>
                    <th className="whitespace-nowrap border-y border-t border-[color:var(--color-border-ui-subtle)] py-2.5 pr-2 pl-1 text-right text-[0.64rem] font-semibold tracking-[0.03em] text-[var(--color-text-ui-muted)] last:rounded-tr-[1.2rem] sm:py-3 sm:pr-5 sm:pl-2 sm:text-[0.78rem]">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {visibleRows.map((asset) => (
                    <MobileAssetsExplorerTableRowItem key={asset.id} asset={asset} />
                  ))}
                </tbody>
              </table>
            </div>

            {hasMoreRows ? (
              <div className="border-t border-[color:var(--color-border-ui-subtle)] px-4 py-4 sm:px-5">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((current) =>
                      Math.min(current + showMoreStep, assetsExplorerRows.length),
                    )
                  }
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[0.95rem] border border-[color:var(--color-border-ui-subtle)] bg-white px-4 text-[0.88rem] font-semibold text-zinc-950 shadow-[0_10px_22px_rgba(24,24,27,0.04)] transition-colors hover:bg-[var(--color-surface-ui-subtle)]"
                >
                  <span>Show more assets</span>
                  <ArrowIcon />
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <aside className="space-y-6">
          <section className="overflow-hidden rounded-[2rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,#f8f3ff_0%,#ffffff_100%)] shadow-[0_22px_58px_rgba(24,24,27,0.05)]">
            <div className="px-5 pt-5 pb-4 sm:px-6 sm:pt-6">
              <h3 className="type-title text-[1.75rem] font-semibold text-[var(--color-brand-strong)]">
                Calculate your regret
              </h3>
              <p className="mt-2 max-w-[16rem] text-[0.94rem] leading-6 text-[var(--color-text-ui-soft)]">
                See how much you could have made or lost in seconds.
              </p>
            </div>

            <div className="mx-5 mb-5 rounded-[1.55rem] border border-[color:rgba(111,67,255,0.12)] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.96)_0%,rgba(241,235,255,0.9)_100%)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:mx-6 sm:mb-6">
              <div className="flex items-end justify-between gap-4">
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center gap-2 rounded-[0.95rem] bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] px-4 text-[0.88rem] font-semibold text-white shadow-[0_12px_26px_rgba(111,67,255,0.2)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <span>Try Calculator</span>
                  <ArrowIcon />
                </Link>

                <div className="grid h-28 w-28 place-items-center rounded-[1.5rem] border border-dashed border-[color:rgba(111,67,255,0.22)] bg-white/65 text-center text-[0.74rem] font-semibold text-[var(--color-brand-muted)]">
                  Visual
                  <br />
                  slot
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,#ffffff_0%,#faf7ff_100%)] px-5 py-5 shadow-[0_22px_58px_rgba(24,24,27,0.05)] sm:px-6 sm:py-6">
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                >
                  <path d="M10.7 2.2a.75.75 0 0 0-1.4 0L7.9 6.3 3.8 7.1a.75.75 0 0 0-.2 1.39l3.1 2.2-.8 4.1a.75.75 0 0 0 1.1.79L10 14l3 1.58a.75.75 0 0 0 1.1-.79l-.8-4.1 3.1-2.2a.75.75 0 0 0-.2-1.39l-4.1-.8-1.4-4.1Z" />
                </svg>
              </span>
              <h3 className="type-title text-[1.28rem] font-semibold text-zinc-950">Trending Assets</h3>
            </div>

            <div className="mt-5 divide-y divide-[color:rgba(24,24,27,0.08)]">
              {assetsTrendingItems.map((item, index) => (
                <TrendingRow key={item.id} item={item} index={index} />
              ))}
            </div>

            <Link
              href="/assets"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[1rem] border border-[color:var(--color-border-ui-subtle)] bg-white text-[0.9rem] font-semibold text-[var(--color-brand-strong)] shadow-[0_12px_28px_rgba(24,24,27,0.04)] transition-colors hover:bg-[var(--color-surface-ui-subtle)]"
            >
              <span>View all trending assets</span>
              <ArrowIcon />
            </Link>
          </section>
        </aside>
      </div>
    </section>
  );
}
