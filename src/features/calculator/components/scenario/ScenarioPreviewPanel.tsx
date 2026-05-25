"use client";

import Image from "next/image";
import type { CalculatorScenarioAsset } from "@/features/calculator/types";
import { ArrowIcon } from "@/features/calculator/components/scenario/ArrowIcon";
import type { CalculatorScenarioResult } from "@/features/calculator/types";

function PosterTemplatePreview({
  asset,
  result,
}: {
  asset: CalculatorScenarioAsset;
  result: CalculatorScenarioResult;
}) {
  const isProfit = result.tone === "profit";
  const isLoss = result.tone === "loss";

  return (
    <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-[1.05rem] bg-white p-3 text-left shadow-[inset_0_0_0_1px_rgba(111,67,255,0.14)]">
      {isProfit ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_36%,rgba(187,247,208,0.38)_0%,rgba(255,255,255,0)_25%),linear-gradient(180deg,#ffffff_0%,#f4fff7_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[3.2rem] bottom-[4.1rem] opacity-95"
          >
            <Image
              src="/images/calculator/poster-profit-chart-v1.png"
              alt=""
              fill
              className="object-contain object-right-top"
              sizes="420px"
            />
          </div>
        </>
      ) : isLoss ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_34%,rgba(254,202,202,0.4)_0%,rgba(255,255,255,0)_24%),linear-gradient(180deg,#ffffff_0%,#fff5f5_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[3.2rem] bottom-[4.1rem] opacity-95"
          >
            <Image
              src="/images/calculator/poster-loss-chart-v2.png"
              alt=""
              fill
              className="object-contain object-right-top mix-blend-screen [mask-image:linear-gradient(180deg,black_0%,black_74%,transparent_100%)]"
              sizes="420px"
            />
          </div>
        </>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/calculator/poster-neutral-background-v1.svg')",
          }}
        />
      )}

      <div className="relative z-10 flex min-h-0 w-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-brand)] text-[0.64rem] font-black tracking-[-0.08em] text-white shadow-[0_10px_22px_rgba(111,67,255,0.22)]">
              IF
            </span>
            <span className="type-title text-[0.9rem] font-semibold text-zinc-950">
              Regretify
            </span>
          </div>
          <span className="inline-flex min-h-6 items-center gap-1.5 rounded-full border border-[color:var(--color-brand-border)] bg-white/78 px-2.5 text-[0.64rem] font-semibold text-[var(--color-brand)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" />
            Preview
          </span>
        </div>

        <div className="mt-3 inline-flex w-fit items-center gap-2 rounded-[0.85rem] border border-[color:var(--color-border-ui-subtle)] bg-white/88 px-2.5 py-1.5 shadow-[0_12px_24px_rgba(24,24,27,0.06)]">
          <span
            className={`grid h-8 w-8 place-items-center rounded-full text-[0.72rem] font-semibold ${asset.markClassName}`}
          >
            {asset.mark}
          </span>
          <span>
            <span className="type-title block text-[0.78rem] font-semibold text-zinc-950">
              {asset.name}
            </span>
            <span className="block text-[0.62rem] text-[var(--color-text-ui-muted)]">
              {asset.ticker}
            </span>
          </span>
        </div>

        <div className="mt-3 min-h-0 flex-1">
          <h3 className="max-w-[17rem] text-[1.75rem] font-black leading-[0.92] tracking-[-0.08em] text-[#090926]">
            Your regret poster is{" "}
            <span className="text-[var(--color-brand)]">waiting</span>
          </h3>
          <p className="mt-1.5 max-w-[14rem] text-[0.68rem] leading-4.5 text-[var(--color-text-ui-soft)]">
            Build a scenario to reveal the result.
          </p>

          <div className="mt-2.5 flex items-end justify-between gap-3">
            <div className="w-[9.5rem] rounded-[0.85rem] border border-white/84 bg-white/32 px-3 py-2.5 shadow-[0_12px_24px_rgba(24,24,27,0.06)] backdrop-blur-2xl">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-ui-muted)]">
                Potential result
              </p>
              <p className="type-title mt-0.5 text-[1.45rem] font-semibold text-[var(--color-brand)]">
                {result.profitAmountLabel}
              </p>
            </div>
            <div className="relative h-16 w-16 shrink-0 self-end overflow-visible">
              <div className="pointer-events-none absolute -bottom-[8.1rem] -right-[0.9rem] h-[17.85rem] w-[15.64rem]">
                <Image
                  src={
                    isProfit
                      ? "/images/calculator/regretify-mascot-profit-v1.png"
                      : isLoss
                        ? "/images/calculator/regretify-mascot-loss-v1.png"
                      : "/images/calculator/regretify-mascot-neutral-v1.png"
                  }
                  alt={
                    isProfit
                      ? "Regretify profit poster mascot in a happier pose."
                      : isLoss
                        ? "Regretify loss poster mascot in a worried pose holding a phone."
                      : "Regretify neutral poster mascot holding a magnifying glass."
                  }
                  fill
                  className="object-contain object-bottom drop-shadow-[0_18px_36px_rgba(24,24,27,0.18)]"
                  sizes="250px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 -mt-3 grid grid-cols-3 rounded-[0.85rem] border border-white/84 bg-white/32 px-2.5 py-2 shadow-[0_18px_34px_rgba(24,24,27,0.1)] backdrop-blur-2xl">
          {[
            ["Invested", result.investedAmountLabel],
            ["Start date", result.startDateLabel],
            ["End date", result.endDateLabel],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`min-w-0 px-2 ${index > 0 ? "border-l border-white/55" : ""}`}
            >
              <p className="text-[0.54rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-ui-muted)]">
                {label}
              </p>
              <p className="mt-1 truncate text-[0.72rem] font-semibold text-zinc-950">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="relative z-10 mt-1.5 ml-auto mr-auto grid w-[82%] grid-cols-3 rounded-[0.78rem] border border-white/80 bg-white/22 px-2 py-1.5 shadow-[0_10px_22px_rgba(24,24,27,0.06)] backdrop-blur-2xl">
          {[
            ["Daily profit", result.dailyProfitLabel],
            ["Monthly profit", result.monthlyProfitLabel],
            ["Yearly profit", result.yearlyProfitLabel],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`min-w-0 px-1.5 ${index > 0 ? "border-l border-white/45" : ""}`}
            >
              <p className="text-[0.48rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-ui-muted)]">
                {label}
              </p>
              <p className="mt-0.75 truncate text-[0.64rem] font-semibold text-zinc-950">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ScenarioPreviewPanel({
  asset,
  result,
}: {
  asset: CalculatorScenarioAsset;
  result: CalculatorScenarioResult;
}) {
  return (
    <aside className="grid gap-3 xl:h-full xl:grid-rows-[minmax(0,1fr)_auto]">
      <section className="flex min-h-0 flex-col rounded-[1.35rem] border border-[color:var(--color-border-ui-subtle)] bg-white p-2.5 shadow-[0_20px_48px_rgba(24,24,27,0.045)] lg:rounded-[1.55rem]">
        <PosterTemplatePreview asset={asset} result={result} />

        <div className="mt-2 grid grid-cols-3 gap-2">
          {["Share", "Download", "Remix"].map((action, index) => (
            <button
              key={action}
              type="button"
              className={`inline-flex min-h-8 items-center justify-center rounded-[0.75rem] border px-2.5 text-[0.7rem] font-semibold shadow-[0_10px_22px_rgba(24,24,27,0.04)] ${
                index === 0
                  ? "border-[color:var(--color-brand)] bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] text-white"
                  : "border-[color:var(--color-border-ui-subtle)] bg-white text-zinc-950"
              }`}
            >
              {action}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[1.25rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,#ffffff_0%,#f8f3ff_100%)] px-3 py-2.5 shadow-[0_20px_48px_rgba(24,24,27,0.045)] lg:rounded-[1.35rem]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.66rem] font-semibold tracking-[0.1em] text-[var(--color-text-ui-muted)] uppercase">
              Sponsored
            </p>
            <h3 className="type-title mt-1 text-[0.98rem] font-semibold text-zinc-950">
              Ready to make the trade for real?
            </h3>
            <p className="mt-0.5 max-w-[17rem] text-[0.72rem] leading-4.5 text-[var(--color-text-ui-soft)]">
              Join through a trusted partner after the regret scenario is clear.
            </p>
          </div>
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[0.8rem] bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_100%)] text-[1rem] font-semibold text-[#f59e0b] shadow-[0_14px_28px_rgba(245,158,11,0.16)]">
            B
          </div>
        </div>

        <div className="mt-2 grid gap-2 sm:grid-cols-4 xl:grid-cols-4">
          {["Low fees", "Fast signup", "Secure platform"].map((item) => (
            <div
              key={item}
              className="rounded-[0.8rem] border border-[color:var(--color-border-ui-subtle)] bg-white px-2.5 py-1.5"
            >
              <p className="text-[0.68rem] font-semibold leading-4 text-zinc-950">
                {item}
              </p>
              <p className="mt-0.5 text-[0.58rem] leading-3.5 text-[var(--color-text-ui-muted)]">
                Partner benefit
              </p>
            </div>
          ))}
          <button
            type="button"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[0.85rem] bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] px-3 text-[0.76rem] font-semibold text-white shadow-[0_12px_24px_rgba(111,67,255,0.2)]"
          >
            <span>Start</span>
            <ArrowIcon />
          </button>
        </div>
      </section>
    </aside>
  );
}
