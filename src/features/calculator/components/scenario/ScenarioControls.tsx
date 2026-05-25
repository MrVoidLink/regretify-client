"use client";

import { investmentPresets } from "@/features/calculator/data/calculationScenario";
import type { CalculatorScenarioAsset } from "@/features/calculator/types";

export function AssetControl({ asset }: { asset: CalculatorScenarioAsset }) {
  return (
    <div className="inline-flex min-h-11 items-center gap-3 rounded-[1.05rem] border border-[color:var(--color-border-ui-subtle)] bg-white px-3.5 text-left shadow-[0_12px_28px_rgba(24,24,27,0.04)]">
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[0.9rem] font-semibold ${asset.markClassName}`}
      >
        {asset.mark}
      </span>
      <span className="min-w-0">
        <span className="type-title block text-[0.95rem] font-semibold text-zinc-950">
          {asset.name}
        </span>
        <span className="block text-[0.68rem] text-[var(--color-text-ui-soft)]">
          {asset.ticker}
        </span>
      </span>
    </div>
  );
}

export function InvestmentControls({
  amount,
  onAmountChange,
}: {
  amount: string;
  onAmountChange: (amount: string) => void;
}) {
  return (
    <section>
      <div className="flex items-center gap-1.5">
        <h2 className="type-title text-[0.9rem] font-semibold text-zinc-950">
          Investment amount
        </h2>
        <span className="grid h-3.5 w-3.5 place-items-center rounded-full border border-[color:var(--color-border-ui-subtle)] text-[0.58rem] font-semibold text-[var(--color-text-ui-muted)]">
          i
        </span>
      </div>

      <div className="mt-1.5 grid gap-1.5 lg:grid-cols-[minmax(12rem,0.58fr)_minmax(0,1fr)] lg:items-center">
        <label className="block">
          <span className="sr-only">Investment amount</span>
          <div className="flex min-h-10 items-center rounded-[0.8rem] border border-[color:var(--color-border-ui-subtle)] bg-white px-3 shadow-[0_10px_24px_rgba(24,24,27,0.035)] focus-within:border-[color:var(--color-brand-border)]">
            <span className="pr-2 text-[0.98rem] font-semibold text-[var(--color-text-ui-muted)]">
              $
            </span>
            <input
              inputMode="numeric"
              value={amount}
              onChange={(event) =>
                onAmountChange(event.target.value.replace(/[^\d]/g, ""))
              }
              className="min-w-0 flex-1 bg-transparent text-[1.16rem] font-semibold text-zinc-950 outline-none placeholder:text-zinc-300"
              placeholder="0"
            />
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full px-1.5 text-[0.64rem] font-semibold text-zinc-700"
            >
              USD
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-3 w-3 text-[var(--color-text-ui-muted)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5.5 7.5 4.5 5 4.5-5" />
              </svg>
            </button>
          </div>
        </label>

        <div className="grid grid-cols-5 gap-1.5">
          {investmentPresets.map((preset) => {
            const isSelected = Number(amount) === preset.value;

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onAmountChange(String(preset.value))}
                className={`inline-flex min-h-8 items-center justify-center rounded-[0.65rem] border px-2 text-[0.7rem] font-semibold transition-colors ${
                  isSelected
                    ? "border-[color:var(--color-brand)] bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] text-white shadow-[0_10px_20px_rgba(111,67,255,0.18)]"
                    : "border-[color:var(--color-border-ui-subtle)] bg-white text-zinc-800 hover:bg-[var(--color-surface-ui-subtle)]"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
