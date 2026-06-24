import Link from "next/link";
import type { CalculatorScenarioAsset } from "@/features/calculator/types";

const quickAnswers = [
  "What is a Bitcoin regret calculator?",
  "Why do people use regret calculators?",
  "What's the best date to test?",
  "Can I compare multiple assets?",
  "Is Bitcoin a good long-term investment?",
];

const relatedCalculators = [
  {
    name: "Ethereum regret calculator",
    ticker: "ETH",
    href: "/ethereum",
    mark: "E",
    className:
      "bg-[radial-gradient(circle_at_35%_30%,#a5b9ff_0%,#647cf4_70%)] text-white",
  },
  {
    name: "Solana regret calculator",
    ticker: "SOL",
    href: "/solana",
    mark: "S",
    className: "bg-zinc-950 text-white",
  },
  {
    name: "Dogecoin regret calculator",
    ticker: "DOGE",
    href: "/dogecoin",
    mark: "D",
    className:
      "bg-[linear-gradient(180deg,#dfc861_0%,#c8a233_100%)] text-white",
  },
  {
    name: "Bitcoin regret calculator",
    ticker: "BTC",
    href: "/bitcoin",
    mark: "B",
    className:
      "bg-[linear-gradient(180deg,#f7b14a_0%,#f7931a_100%)] text-white",
  },
];

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M10 5v10" />
      <path d="M5 10h10" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 4.5 12.5 10 7 15.5" />
    </svg>
  );
}

export function AssetCalculatorSeoSidebar({
  asset,
}: {
  asset: CalculatorScenarioAsset;
}) {
  const answers = quickAnswers.map((answer, index) =>
    index === 0 ? `What is a ${asset.name} regret calculator?` : answer,
  );

  return (
    <aside className="grid gap-4 xl:sticky xl:top-24">
      <section className="rounded-[1.55rem] border border-[color:var(--color-border-ui-subtle)] bg-white p-4 shadow-[0_18px_48px_rgba(24,24,27,0.045)]">
        <div className="flex items-center gap-2.5">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--color-brand)] text-[0.8rem] font-semibold text-white">
            ?
          </span>
          <h2 className="type-title text-[1.05rem] font-semibold text-zinc-950">
            Quick answers
          </h2>
        </div>

        <div className="mt-4 grid gap-2">
          {answers.map((answer) => (
            <button
              key={answer}
              type="button"
              className="flex min-h-10 items-center justify-between gap-3 rounded-full border border-[color:var(--color-border-ui-subtle)] bg-white px-3.5 text-left text-[0.78rem] font-semibold text-zinc-950 shadow-[0_8px_20px_rgba(24,24,27,0.025)] transition-colors hover:bg-[var(--color-surface-ui-subtle)]"
            >
              <span>{answer}</span>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[color:var(--color-border-ui-subtle)] text-zinc-700">
                <PlusIcon />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[1.55rem] border border-[color:var(--color-border-ui-subtle)] bg-white p-4 shadow-[0_18px_48px_rgba(24,24,27,0.045)]">
        <div className="flex items-center gap-2.5">
          <span className="grid h-6 w-6 place-items-center text-[var(--color-brand)]">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-5 w-5"
              fill="none"
            >
              <path d="M4 11.5v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 8v7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 5.5v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M16 3.5v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <h2 className="type-title text-[1.05rem] font-semibold text-zinc-950">
            Related calculators
          </h2>
        </div>

        <div className="mt-4 grid gap-2">
          {relatedCalculators.map((calculator) => (
            <Link
              key={calculator.name}
              href={calculator.href}
              className="flex min-h-13 items-center gap-3 rounded-[1rem] border border-[color:var(--color-border-ui-subtle)] bg-white px-3 text-zinc-950 shadow-[0_8px_20px_rgba(24,24,27,0.025)] transition-colors hover:bg-[var(--color-surface-ui-subtle)]"
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[0.72rem] font-semibold ${calculator.className}`}
              >
                {calculator.mark}
              </span>
              <span className="min-w-0 flex-1">
                <span className="type-title block truncate text-[0.78rem] font-semibold">
                  {calculator.name}
                </span>
                <span className="block truncate text-[0.66rem] text-[var(--color-text-ui-muted)]">
                  {calculator.ticker}
                </span>
              </span>
              <span className="text-[var(--color-text-ui-muted)]">
                <ArrowRightIcon />
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/asset-selection"
          className="mx-auto mt-4 flex w-fit items-center gap-1.5 text-[0.74rem] font-semibold text-[var(--color-brand)]"
        >
          <span>Choose another asset</span>
          <ArrowRightIcon />
        </Link>
      </section>

      <section className="overflow-hidden rounded-[1.55rem] border border-[color:var(--color-border-ui-subtle)] bg-white p-4 shadow-[0_18px_48px_rgba(24,24,27,0.045)]">
        <div className="rounded-[1.25rem] bg-[radial-gradient(circle_at_90%_50%,rgba(111,67,255,0.12)_0%,rgba(111,67,255,0)_35%),linear-gradient(180deg,#fbf8ff_0%,#f2ecff_100%)] px-4 py-5">
          <div className="flex items-start gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[var(--color-brand)] shadow-[0_10px_24px_rgba(111,67,255,0.1)]">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="currentColor">
                <path d="m10.7 2.5.9 3.7 3.7.9-3.7.9-.9 3.7-.9-3.7-3.7-.9 3.7-.9.9-3.7Z" />
                <path d="m5.5 10.6.5 2.1 2.1.5-2.1.5-.5 2.1-.5-2.1-2.1-.5 2.1-.5.5-2.1Z" />
              </svg>
            </span>
            <div>
              <h2 className="type-title text-[1.05rem] font-semibold text-zinc-950">
                Unlock more insights
              </h2>
              <p className="mt-1 text-[0.78rem] leading-5 text-[var(--color-text-ui-soft)]">
                Save scenarios, compare assets, and track your what-if outcomes over
                time.
              </p>
            </div>
          </div>

          <ul className="mt-5 grid gap-3 text-[0.74rem] text-[var(--color-text-ui-soft)]">
            {[
              "Unlimited scenario history",
              "Portfolio regret comparisons",
              "Export & share your results",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="text-[var(--color-brand)]">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="mt-6 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-[0.9rem] bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] px-4 text-[0.82rem] font-semibold text-white shadow-[0_14px_28px_rgba(111,67,255,0.24)]"
          >
            <span>Create free account</span>
            <ArrowRightIcon />
          </button>

          <p className="mt-3 text-center text-[0.68rem] text-[var(--color-text-ui-muted)]">
            No credit card required. Free forever.
          </p>
        </div>
      </section>
    </aside>
  );
}
