import Link from "next/link";
import type { CalculatorScenarioAsset } from "@/features/calculator/types";

const regretWindows = [
  ["Apr 12, 2020", "May 12, 2024", "$7,842", "+684.2%"],
  ["Mar 11, 2019", "May 12, 2024", "$18,932", "+1,793.2%"],
  ["Jan 1, 2018", "May 12, 2024", "$26,501", "+2,550.1%"],
  ["Jan 1, 2016", "May 12, 2024", "$91,274", "+9,027.4%"],
];

const milestones = [
  ["Apr 12, 2020", "$6,878", "COVID-19 market crash low"],
  ["Nov 10, 2021", "$69,000", "All-time high cycle peak"],
  ["Nov 21, 2022", "$15,479", "FTX collapse low"],
  ["Jan 11, 2024", "$46,000", "Spot ETF approvals"],
  ["Mar 13, 2024", "$73,000", "New all-time high"],
];

const scenarios = [
  ["$1,000 on Jan 1, 2020", "See 4+ years of market growth", "B"],
  ["$1,000 before ATH (Nov 2021)", "What if you bought at the peak?", "A"],
  ["$1,000 after the crash (Nov 2022)", "Bought the dip? See the payoff", "D"],
  ["$500 monthly since 2019", "Dollar-cost average comparison", "M"],
];

const faqs = [
  [
    "How does the Bitcoin regret calculator work?",
    "You choose an amount and date range. We use historical BTC prices to show how your investment could have grown.",
  ],
  [
    "Is this financial advice?",
    "No. Regretify provides scenario insights for educational purposes only. Always do your own research.",
  ],
  [
    "Where does the price data come from?",
    "We aggregate reliable data from leading market sources to deliver accurate historical prices.",
  ],
];

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
      <path d="M4.5 10h10" />
      <path d="m11 5 5 5-5 5" />
    </svg>
  );
}

function SectionIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[0.55rem] bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
      {children}
    </span>
  );
}

export function AssetCalculatorSeoMainContent({
  asset,
}: {
  asset: CalculatorScenarioAsset;
}) {
  return (
    <div className="grid gap-4">
      <section className="rounded-[1.6rem] border border-[color:var(--color-border-ui-subtle)] bg-white p-5 shadow-[0_18px_48px_rgba(24,24,27,0.045)]">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full text-[0.78rem] font-semibold text-[var(--color-brand)]">
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-[0.7rem] ${asset.markClassName}`}
              >
                {asset.mark}
              </span>
              <span>{asset.name} regret calculator</span>
            </div>
            <h2 className="type-title mt-4 text-[2.15rem] font-semibold text-zinc-950 sm:text-[2.65rem]">
              What if you bought {asset.name} earlier?
            </h2>
            <p className="mt-3 max-w-3xl text-[0.95rem] leading-6.5 text-[var(--color-text-ui-soft)]">
              Our {asset.name} regret calculator lets you explore how a $1,000
              investment could have grown if you bought {asset.ticker} at any point
              in the past. Compare different timeframes, market moments, and
              outcomes to measure missed opportunities in seconds.
            </p>
            <div className="mt-4 inline-flex max-w-full items-start gap-2 rounded-[0.9rem] bg-[var(--color-brand-soft)] px-3.5 py-2.5 text-[0.74rem] text-[var(--color-text-ui-soft)]">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-brand)] text-[0.72rem] font-semibold text-white">
                i
              </span>
              <p>
                <strong className="text-zinc-950">
                  Would $1,000 in {asset.name} have changed everything?
                </strong>{" "}
                This page explains the scenario, not financial advice.
              </p>
            </div>
          </div>

          <aside className="rounded-[1.2rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,#ffffff_0%,#faf8ff_100%)] p-4">
            <div className="flex items-center gap-2.5">
              <SectionIcon>
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 4v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 10a6 6 0 1 0 12 0 6 6 0 0 0-12 0Z" />
                </svg>
              </SectionIcon>
              <h3 className="type-title text-[0.95rem] font-semibold text-zinc-950">
                SEO intent map
              </h3>
            </div>
            <dl className="mt-4 grid gap-3 text-[0.72rem]">
              {[
                ["Primary intent", "Informational / Transactional"],
                ["Who is this for?", "Crypto investors & curious savers"],
                ["What they want", "See missed gains, compare timelines"],
                ["Page goal", "Educate, engage, and help decide"],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[7.2rem_1fr] gap-3">
                  <dt className="font-semibold text-zinc-950">{label}</dt>
                  <dd className="text-[var(--color-text-ui-soft)]">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-[1.35rem] border border-[color:var(--color-border-ui-subtle)] bg-white p-4 shadow-[0_18px_48px_rgba(24,24,27,0.04)]">
          <div className="flex items-center gap-2.5">
            <SectionIcon>
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="5" width="12" height="11" rx="2" />
                <path d="M7 3.5v3" />
                <path d="M13 3.5v3" />
                <path d="M4 8.5h12" />
              </svg>
            </SectionIcon>
            <h3 className="type-title text-[1rem] font-semibold text-zinc-950">
              Historical regret windows
            </h3>
          </div>
          <p className="mt-2 text-[0.74rem] text-[var(--color-text-ui-soft)]">
            Explore how timing impacted a $1,000 investment.
          </p>
          <div className="mt-4 grid gap-3 text-[0.68rem]">
            <div className="grid grid-cols-[1fr_1fr_1fr_0.9fr] gap-2 font-semibold uppercase tracking-[0.06em] text-[var(--color-text-ui-muted)]">
              <span>Start date</span>
              <span>End date</span>
              <span>Value today</span>
              <span>Growth</span>
            </div>
            {regretWindows.map(([start, end, value, growth]) => (
              <div key={start} className="grid grid-cols-[1fr_1fr_1fr_0.9fr] gap-2 text-[var(--color-text-ui-soft)]">
                <span>{start}</span>
                <span>{end}</span>
                <span className="font-semibold text-zinc-950">{value}</span>
                <span className="font-semibold text-[var(--color-success)]">{growth}</span>
              </div>
            ))}
          </div>
          <Link href="#time-ranges" className="mt-5 flex min-h-9 items-center justify-center gap-2 rounded-[0.8rem] bg-[var(--color-brand-soft)] text-[0.74rem] font-semibold text-[var(--color-brand)]">
            <span>Explore more time ranges</span>
            <ArrowRightIcon />
          </Link>
        </article>

        <article className="rounded-[1.35rem] border border-[color:var(--color-border-ui-subtle)] bg-white p-4 shadow-[0_18px_48px_rgba(24,24,27,0.04)]">
          <div className="flex items-center gap-2.5">
            <span className={`grid h-6 w-6 place-items-center rounded-full text-[0.7rem] ${asset.markClassName}`}>
              {asset.mark}
            </span>
            <h3 className="type-title text-[1rem] font-semibold text-zinc-950">
              {asset.name} price milestones
            </h3>
          </div>
          <p className="mt-2 text-[0.74rem] text-[var(--color-text-ui-soft)]">
            Key {asset.ticker} moments that shaped the market.
          </p>
          <div className="relative mt-4 grid gap-3 pl-4 text-[0.72rem]">
            <span className="absolute bottom-2 left-[0.3rem] top-2 w-px bg-[var(--color-brand-border)]" />
            {milestones.map(([date, price, note]) => (
              <div key={date} className="relative grid grid-cols-[5.2rem_1fr] gap-3">
                <span className="absolute -left-[1.05rem] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]" />
                <span className="font-semibold text-zinc-950">{date}</span>
                <span>
                  <span className="font-semibold text-zinc-950">{price}</span>
                  <span className="block text-[var(--color-text-ui-soft)]">{note}</span>
                </span>
              </div>
            ))}
          </div>
          <Link href="#timeline" className="mt-5 flex min-h-9 items-center justify-center gap-2 rounded-[0.8rem] bg-[var(--color-brand-soft)] text-[0.74rem] font-semibold text-[var(--color-brand)]">
            <span>See full {asset.name} timeline</span>
            <ArrowRightIcon />
          </Link>
        </article>

        <article className="rounded-[1.35rem] border border-[color:var(--color-border-ui-subtle)] bg-white p-4 shadow-[0_18px_48px_rgba(24,24,27,0.04)]">
          <div className="flex items-center gap-2.5">
            <SectionIcon>
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 5h10v10H5z" />
                <path d="M8 10h4" />
              </svg>
            </SectionIcon>
            <h3 className="type-title text-[1rem] font-semibold text-zinc-950">
              Popular what-if scenarios
            </h3>
          </div>
          <p className="mt-2 text-[0.74rem] text-[var(--color-text-ui-soft)]">
            Quick presets to spark your regret calculation.
          </p>
          <div className="mt-4 grid gap-2">
            {scenarios.map(([title, copy, mark]) => (
              <Link
                href="#calculator"
                key={title}
                className="flex min-h-13 items-center gap-3 rounded-[0.9rem] border border-[color:var(--color-border-ui-subtle)] bg-white px-3 transition-colors hover:bg-[var(--color-surface-ui-subtle)]"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--color-brand-soft)] text-[0.68rem] font-semibold text-[var(--color-brand)]">
                  {mark}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="type-title block truncate text-[0.78rem] font-semibold text-zinc-950">{title}</span>
                  <span className="block truncate text-[0.66rem] text-[var(--color-text-ui-soft)]">{copy}</span>
                </span>
                <ArrowRightIcon />
              </Link>
            ))}
          </div>
          <Link href="#scenario-ideas" className="mt-5 flex min-h-9 items-center justify-center gap-2 rounded-[0.8rem] bg-[var(--color-brand-soft)] text-[0.74rem] font-semibold text-[var(--color-brand)]">
            <span>View all scenario ideas</span>
            <ArrowRightIcon />
          </Link>
        </article>
      </section>

      <section className="rounded-[1.35rem] border border-[color:var(--color-border-ui-subtle)] bg-white p-4 shadow-[0_18px_48px_rgba(24,24,27,0.04)]">
        <div className="flex items-center gap-2.5">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--color-brand)] text-[0.78rem] font-semibold text-white">
            ?
          </span>
          <h3 className="type-title text-[1.05rem] font-semibold text-zinc-950">
            Frequently asked questions about {asset.name} regret
          </h3>
        </div>
        <div className="mt-4 grid gap-2">
          {faqs.map(([question, answer]) => (
            <details
              key={question}
              className="group rounded-[0.95rem] border border-[color:var(--color-border-ui-subtle)] bg-white px-3.5 py-3"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[0.78rem] font-semibold text-zinc-950">
                {question}
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[color:var(--color-border-ui-subtle)] text-[var(--color-text-ui-muted)] group-open:rotate-180">
                 ⌄
                </span>
              </summary>
              <p className="mt-1.5 text-[0.72rem] leading-5 text-[var(--color-text-ui-soft)]">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-[1.35rem] border border-[color:var(--color-border-ui-subtle)] bg-white p-4 shadow-[0_18px_48px_rgba(24,24,27,0.04)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="type-title text-[1.05rem] font-semibold text-zinc-950">
              Explore more crypto regret calculators
            </h3>
            <p className="mt-1 text-[0.78rem] text-[var(--color-text-ui-soft)]">
              Compare assets, timeframes, and missed opportunities across the market.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Ethereum (ETH)", "Solana (SOL)", "Dogecoin (DOGE)"].map((item) => (
              <Link
                key={item}
                href="/assets"
                className="rounded-full border border-[color:var(--color-border-ui-subtle)] bg-white px-3.5 py-2 text-[0.74rem] font-semibold text-zinc-950"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
