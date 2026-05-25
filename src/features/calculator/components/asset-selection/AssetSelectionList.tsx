"use client";

import { useEffect, useRef, useState } from "react";
import { assetSelectionAssets } from "@/features/calculator/data/assetSelection";
import { getAssetSlug } from "@/features/calculator/lib/assets";

function InsightIcon({ rank }: { rank: number }) {
  if (rank % 5 === 0) {
    return (
      <span className="grid h-5 w-5 place-items-center rounded-full bg-blue-50 text-blue-500">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m4 13 4-4 3 3 5-6" />
          <path d="M12 6h4v4" />
        </svg>
      </span>
    );
  }

  if (rank % 3 === 0) {
    return (
      <span className="grid h-5 w-5 place-items-center rounded-full bg-violet-50 text-violet-500">
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor">
          <path d="m11.3 2.5-1.2 5.4 4.7 1-7 8.6 1.2-5.5-4.6-1 6.9-8.5Z" />
        </svg>
      </span>
    );
  }

  if (rank % 2 === 0) {
    return (
      <span className="grid h-5 w-5 place-items-center rounded-full bg-pink-50 text-pink-500">
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor">
          <path d="M10 16.2 4.2 10.8A3.7 3.7 0 0 1 9.5 5.7L10 6.3l.5-.6a3.7 3.7 0 0 1 5.3 5.1L10 16.2Z" />
        </svg>
      </span>
    );
  }

  return (
    <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m4 13 4-4 3 3 5-6" />
        <path d="M12 6h4v4" />
      </svg>
    </span>
  );
}

function AssetLogo({ ticker, name }: { ticker: string; name: string }) {
  if (ticker === "BTC") {
    return (
      <div className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(180deg,#ffad33_0%,#ff7a00_100%)] text-[0.86rem] font-semibold text-white shadow-[0_10px_18px_rgba(255,122,0,0.22)]">
        B
      </div>
    );
  }

  if (ticker === "ETH") {
    return (
      <div className="grid h-8 w-8 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#a5b9ff_0%,#647cf4_70%)] shadow-[0_10px_18px_rgba(100,124,244,0.18)]">
        <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5.5 w-5.5">
          <path fill="#fff" d="M24 6.5 15 24l9-5.2L33 24Z" opacity=".95" />
          <path fill="#eef2ff" d="M24 41.5 15 26.2l9 5.2 9-5.2Z" />
          <path fill="#dbe4ff" d="M24 29 15 24l9-5.2 9 5.2Z" />
        </svg>
      </div>
    );
  }

  if (ticker === "SOL") {
    return (
      <div className="grid h-8 w-8 place-items-center rounded-full bg-zinc-950 shadow-[0_10px_18px_rgba(24,24,27,0.2)]">
        <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5.5 w-5.5">
          <defs>
            <linearGradient id="solana-row-gradient" x1="0%" x2="100%" y1="100%" y2="0%">
              <stop offset="0%" stopColor="#b64cff" />
              <stop offset="55%" stopColor="#42e7c0" />
              <stop offset="100%" stopColor="#12d1ff" />
            </linearGradient>
          </defs>
          <path fill="url(#solana-row-gradient)" d="M12 11h24l-4 4.4H8z" />
          <path fill="url(#solana-row-gradient)" d="M16 21.3h24l-4 4.4H12z" />
          <path fill="url(#solana-row-gradient)" d="M12 31.6h24l-4 4.4H8z" />
        </svg>
      </div>
    );
  }

  if (ticker === "BNB") {
    return (
      <div className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(180deg,#ffd247_0%,#f3ba2f_100%)] shadow-[0_10px_18px_rgba(243,186,47,0.18)]">
        <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5.5 w-5.5">
          <path
            fill="#fff"
            d="m24 10 3.8 3.8-3.8 3.8-3.8-3.8L24 10Zm-8 8 3.8 3.8-3.8 3.8-3.8-3.8L16 18Zm16 0 3.8 3.8-3.8 3.8-3.8-3.8L32 18Zm-8 8 3.8 3.8-3.8 3.8-3.8-3.8L24 26Zm0-5.5 3.8 3.8-3.8 3.8-3.8-3.8 3.8-3.8Z"
          />
        </svg>
      </div>
    );
  }

  if (ticker === "XRP") {
    return (
      <div className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(180deg,#343b44_0%,#1e232a_100%)] shadow-[0_10px_18px_rgba(30,35,42,0.18)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="h-5 w-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 14c3.1 0 4.5 4.5 8 4.5h12c3.5 0 4.9-4.5 8-4.5" />
          <path d="M10 34c3.1 0 4.5-4.5 8-4.5h12c3.5 0 4.9 4.5 8 4.5" />
        </svg>
      </div>
    );
  }

  if (ticker === "DOGE") {
    return (
      <div className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(180deg,#dfc861_0%,#c8a233_100%)] text-[0.82rem] font-semibold text-white shadow-[0_10px_18px_rgba(200,162,51,0.18)]">
        D
      </div>
    );
  }

  if (ticker === "AVAX") {
    return (
      <div className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(180deg,#ff6f68_0%,#e84142_100%)] shadow-[0_10px_18px_rgba(232,65,66,0.18)]">
        <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5.5 w-5.5">
          <path fill="#fff" d="M24 10.5 35.3 32H24.8l-6.5-12.4 5.7-9.1Z" />
          <path fill="#fff" d="M14.7 32.2h7.4l-3.7-7.1-3.7 7.1Z" />
        </svg>
      </div>
    );
  }

  if (ticker === "LINK") {
    return (
      <div className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(180deg,#5684ff_0%,#2b60e4_100%)] shadow-[0_10px_18px_rgba(43,96,228,0.18)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="h-5.5 w-5.5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="m24 10 12 7v14l-12 7-12-7V17l12-7Z" />
        </svg>
      </div>
    );
  }

  const palette: Record<string, string> = {
    ADA: "bg-[linear-gradient(180deg,#3c6bff_0%,#2551d6_100%)]",
    DOT: "bg-[linear-gradient(180deg,#ff6bb2_0%,#e73c91_100%)]",
    TON: "bg-[linear-gradient(180deg,#56b7ff_0%,#2588e6_100%)]",
    TRX: "bg-[linear-gradient(180deg,#ff746c_0%,#ef4444_100%)]",
    LTC: "bg-[linear-gradient(180deg,#d4d4d8_0%,#a1a1aa_100%)]",
    XLM: "bg-[linear-gradient(180deg,#64748b_0%,#334155_100%)]",
    APT: "bg-[linear-gradient(180deg,#111827_0%,#030712_100%)]",
    SUI: "bg-[linear-gradient(180deg,#8dd8ff_0%,#3b82f6_100%)]",
    UNI: "bg-[linear-gradient(180deg,#ff8ac1_0%,#ff4d9d_100%)]",
    NEAR: "bg-[linear-gradient(180deg,#3f3f46_0%,#18181b_100%)]",
    RNDR: "bg-[linear-gradient(180deg,#ff8960_0%,#ea580c_100%)]",
    ARB: "bg-[linear-gradient(180deg,#8cb8ff_0%,#3b82f6_100%)]",
    KAS: "bg-[linear-gradient(180deg,#60f5d2_0%,#14b8a6_100%)]",
    HBAR: "bg-[linear-gradient(180deg,#3f3f46_0%,#18181b_100%)]",
    FIL: "bg-[linear-gradient(180deg,#58d0ff_0%,#0ea5e9_100%)]",
    VET: "bg-[linear-gradient(180deg,#60a5fa_0%,#2563eb_100%)]",
    ATOM: "bg-[linear-gradient(180deg,#818cf8_0%,#4f46e5_100%)]",
    ALGO: "bg-[linear-gradient(180deg,#52525b_0%,#18181b_100%)]",
    XMR: "bg-[linear-gradient(180deg,#ff9d52_0%,#f97316_100%)]",
    ICP: "bg-[linear-gradient(180deg,#ff8bd3_0%,#8b5cf6_100%)]",
    POL: "bg-[linear-gradient(180deg,#a78bfa_0%,#7c3aed_100%)]",
    PEPE: "bg-[linear-gradient(180deg,#86efac_0%,#22c55e_100%)]",
  };

  return (
    <div
      className={`grid h-8 w-8 place-items-center rounded-full text-[0.72rem] font-semibold text-white shadow-[0_10px_18px_rgba(24,24,27,0.12)] ${
        palette[ticker] ?? "bg-[linear-gradient(180deg,#d4d4d8_0%,#71717a_100%)]"
      }`}
    >
      {name.charAt(0)}
    </div>
  );
}

export function AssetSelectionList({
  selectedAssetSlug,
  onAssetSelect,
}: {
  selectedAssetSlug: string;
  onAssetSelect: (slug: string) => void;
}) {
  const initialVisibleCount = 7;
  const increment = 14;
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const [isAutoLoadEnabled, setIsAutoLoadEnabled] = useState(false);
  const [hasScrolledAfterExpand, setHasScrolledAfterExpand] = useState(false);
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);
  const autoLoadStartScrollYRef = useRef(0);
  const visibleAssets = assetSelectionAssets.slice(0, visibleCount);
  const hasMoreAssets = visibleCount < assetSelectionAssets.length;
  const nextVisibleCount = Math.min(visibleCount + increment, assetSelectionAssets.length);

  useEffect(() => {
    if (isAutoLoadEnabled && !hasScrolledAfterExpand) {
      const handleScroll = () => {
        if (window.scrollY > autoLoadStartScrollYRef.current + 24) {
          setHasScrolledAfterExpand(true);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [hasScrolledAfterExpand, isAutoLoadEnabled]);

  useEffect(() => {
    if (
      !isAutoLoadEnabled ||
      !hasScrolledAfterExpand ||
      !hasMoreAssets ||
      !loadMoreTriggerRef.current
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting) {
          return;
        }

        setVisibleCount((current) => Math.min(current + increment, assetSelectionAssets.length));
      },
      { root: null, threshold: 1 },
    );

    observer.observe(loadMoreTriggerRef.current);

    return () => observer.disconnect();
  }, [hasMoreAssets, hasScrolledAfterExpand, increment, isAutoLoadEnabled]);

  return (
    <section className="rounded-[1rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(249,246,255,0.9)_100%)] p-1 shadow-[0_16px_32px_rgba(24,24,27,0.03)] max-[389px]:p-0.75 md:p-1.5">
      <form className="grid gap-1">
        {visibleAssets.map((asset) => {
          const assetSlug = getAssetSlug(asset);
          const isSelected = assetSlug === selectedAssetSlug;

          return (
            <label
              key={asset.ticker}
              className={`grid cursor-pointer grid-cols-[0.8rem_2rem_minmax(0,1fr)_3.9rem_1.3rem] items-center gap-x-2.5 rounded-[0.85rem] border px-2.5 py-1.25 transition-all max-[389px]:grid-cols-[0.7rem_1.8rem_minmax(0,1fr)_3.45rem_1.15rem] max-[389px]:gap-x-2 max-[389px]:rounded-[0.78rem] max-[389px]:px-2 max-[389px]:py-1 md:grid-cols-[1rem_2rem_10.9rem_minmax(0,1fr)_7rem_1.5rem] md:gap-x-4 md:rounded-[0.9rem] md:px-3 md:py-2 ${
                isSelected
                ? "border-[color:var(--color-brand-border)] bg-white shadow-[0_10px_22px_rgba(92,44,233,0.08)]"
                : "border-transparent bg-white/62 hover:border-[color:var(--color-border-ui-subtle)] hover:bg-white"
            }`}
            >
            <span className="text-[0.68rem] text-[var(--color-text-ui-muted)] max-[389px]:text-[0.62rem] md:text-center">
              {asset.rank}
            </span>

            <div className="flex items-center">
              <div className="[&>div]:h-8 [&>div]:w-8 [&>div]:text-[0.82rem] max-[389px]:[&>div]:h-7 max-[389px]:[&>div]:w-7 max-[389px]:[&>div]:text-[0.72rem] md:[&>div]:h-8 md:[&>div]:w-8 md:[&>div]:text-[0.72rem]">
                <AssetLogo ticker={asset.ticker} name={asset.name} />
              </div>
            </div>

            <div className="min-w-0 md:hidden">
              <div className="type-title truncate text-[0.78rem] font-semibold text-zinc-950 max-[389px]:text-[0.72rem]">
                {asset.name}
              </div>
              <div className="mt-0.25 text-[0.62rem] text-[var(--color-text-ui-muted)] max-[389px]:text-[0.56rem]">{asset.ticker}</div>
            </div>

            <div className="text-left md:hidden">
              <div className="text-[0.72rem] font-semibold tracking-[-0.03em] text-emerald-600 max-[389px]:text-[0.64rem]">
                {asset.upside}
              </div>
              <div className="text-[0.58rem] leading-3.5 text-zinc-500 max-[389px]:text-[0.52rem] max-[389px]:leading-3">
                You could&apos;ve grown more
              </div>
            </div>

            <div className="hidden min-w-0 md:grid md:grid-cols-[minmax(0,1fr)_2.05rem] md:items-center md:gap-1">
              <span className="type-title block truncate text-[0.82rem] font-semibold text-zinc-950">
                {asset.name}
              </span>
              <span className="block truncate text-center text-[0.66rem] text-[var(--color-text-ui-muted)]">
                {asset.ticker}
              </span>
            </div>

            <div className="hidden min-w-0 md:block md:justify-self-center md:w-[11.5rem]">
              <div className="flex items-center gap-1.5 text-left">
                <InsightIcon rank={asset.rank} />
                <div className="min-w-0 text-left">
                  <div className="truncate text-[0.72rem] font-medium text-[var(--color-text-ui-soft)]">
                    {asset.insight}
                  </div>
                  <div className="truncate text-[0.66rem] text-[var(--color-text-ui-muted)]">{asset.detail}</div>
                </div>
              </div>
            </div>

            <div className="hidden text-left md:block md:text-right">
              <div className="text-[0.78rem] font-semibold tracking-[-0.03em] text-emerald-600">
                {asset.upside}
              </div>
              <div className="text-[0.64rem] text-[var(--color-text-ui-muted)]">Potential upside</div>
            </div>

            <div className="flex items-center justify-end">
              <span
                className={`grid h-4 w-4 place-items-center rounded-full border transition-colors max-[389px]:h-3.5 max-[389px]:w-3.5 md:h-4.5 md:w-4.5 ${
                  isSelected
                    ? "border-[var(--color-brand)] bg-[var(--color-brand)] shadow-[inset_0_0_0_2px_white]"
                    : "border-zinc-300 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="selected-asset"
                  value={assetSlug}
                  checked={isSelected}
                  onChange={() => onAssetSelect(assetSlug)}
                  className="sr-only"
                />
              </span>
            </div>
            </label>
          );
        })}
      </form>

      <div className="mt-1.5 flex justify-center gap-2">
        {!isAutoLoadEnabled && hasMoreAssets ? (
          <button
            type="button"
            onClick={() => {
              autoLoadStartScrollYRef.current = window.scrollY;
              setVisibleCount(nextVisibleCount);
              setIsAutoLoadEnabled(true);
              setHasScrolledAfterExpand(false);
            }}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] px-3.5 text-[0.72rem] font-medium text-[var(--color-text-ui-soft)] shadow-[0_8px_18px_rgba(24,24,27,0.03)] transition-colors hover:bg-[var(--color-brand-soft)]"
          >
            <span>View more</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5.5 8 4.5 4.5L14.5 8" />
            </svg>
          </button>
        ) : null}

        {visibleCount > initialVisibleCount ? (
          <button
            type="button"
            onClick={() => {
              setVisibleCount(initialVisibleCount);
              setIsAutoLoadEnabled(false);
              setHasScrolledAfterExpand(false);
            }}
            className="inline-flex h-8 items-center rounded-full border border-[color:var(--color-border-ui-subtle)] bg-[var(--color-surface-ui-muted)] px-3.5 text-[0.72rem] font-medium text-[var(--color-text-ui-soft)] transition-colors hover:bg-[var(--color-brand-soft)]"
          >
            Show less
          </button>
        ) : null}
      </div>

      {isAutoLoadEnabled && hasMoreAssets ? (
        <div ref={loadMoreTriggerRef} className="h-3 w-full" aria-hidden="true" />
      ) : null}
    </section>
  );
}
