"use client";

import Link from "next/link";
import { getCalculatorScenarioSteps } from "@/features/calculator/lib/assets";
import type {
  CalculatorScenarioAsset,
  CalculatorScenarioStep,
} from "@/features/calculator/types";

function StepItem({ step }: { step: CalculatorScenarioStep }) {
  const isComplete = step.status === "complete";

  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <div
        className={`grid h-[1.625rem] w-[1.625rem] shrink-0 place-items-center rounded-full border text-[0.66rem] font-semibold ${
          isComplete
            ? "border-[color:var(--color-success-border)] bg-[var(--color-success-soft)] text-[var(--color-success)]"
            : "border-[color:var(--color-brand)] bg-[var(--color-brand)] text-white"
        }`}
      >
        {isComplete ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m4.5 10 3 3 8-8" />
          </svg>
        ) : (
          step.id
        )}
      </div>

      <div className="min-w-0">
        <p className="text-[0.62rem] leading-none text-[var(--color-text-ui-muted)]">
          {step.label}
        </p>
        <p className="type-title mt-0.5 truncate text-[0.76rem] font-semibold text-zinc-950">
          {step.value}
        </p>
      </div>
    </div>
  );
}

function ScenarioProgress({ steps }: { steps: CalculatorScenarioStep[] }) {
  return (
    <div className="flex min-w-0 flex-1 items-center justify-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {steps.map((step, index) => (
        <div key={step.id} className="flex shrink-0 items-center gap-3">
          <StepItem step={step} />
          {index < steps.length - 1 ? (
            <div className="h-px w-10 border-t border-dashed border-[color:var(--color-border-ui-subtle)] sm:w-16 lg:w-24" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function ScenarioTopBar({ asset }: { asset: CalculatorScenarioAsset }) {
  const steps = getCalculatorScenarioSteps(asset);

  return (
    <section className="rounded-[1rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(249,246,255,0.9)_100%)] px-3 py-1.5 shadow-[0_12px_28px_rgba(24,24,27,0.035)]">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <Link
          href="/asset-selection"
          className="inline-flex min-h-8 w-fit shrink-0 items-center gap-2 rounded-[0.75rem] border border-[color:var(--color-border-ui-subtle)] bg-white px-2.5 text-[0.76rem] font-semibold text-zinc-950 shadow-[0_8px_18px_rgba(24,24,27,0.035)] transition-colors hover:bg-[var(--color-surface-ui-subtle)]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m11.5 4.5-5 5 5 5" />
            <path d="M6.5 9.5h8" />
          </svg>
          <span>Back</span>
        </Link>

        <ScenarioProgress steps={steps} />

        <div className="hidden shrink-0 items-center gap-2 rounded-full bg-[var(--color-success-soft)] px-2.5 py-1 text-[0.7rem] font-semibold text-[var(--color-success)] lg:inline-flex">
          <span
            className="h-2 w-2 rounded-full bg-[var(--color-success)]"
            aria-hidden="true"
          />
          <span>Live scenario preview</span>
        </div>
      </div>
    </section>
  );
}
