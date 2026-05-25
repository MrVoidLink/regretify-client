import Link from "next/link";
import { assetsTopMovers } from "@/features/assets/data/assetsHeroContent";

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

function SparkleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 text-[var(--color-brand-muted)]"
      fill="currentColor"
    >
      <path d="m10 1.6 1.8 5 5 1.8-5 1.8-1.8 5-1.8-5-5-1.8 5-1.8 1.8-5Z" />
    </svg>
  );
}

export function AssetsHeroSection() {
  return (
    <section className="mx-auto max-w-[96rem] px-4 pt-3 pb-8 sm:px-6 sm:pt-4 sm:pb-10 lg:px-8 lg:pt-5 lg:pb-12">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21.5rem]">
        <section className="overflow-hidden rounded-[2rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,244,255,0.94)_100%)] shadow-[0_24px_64px_rgba(24,24,27,0.06)]">
          <div className="grid gap-8 px-5 py-6 sm:px-7 sm:py-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(17rem,0.98fr)] lg:items-center lg:gap-6 lg:px-8 lg:py-8 xl:px-10 xl:py-9">
            <div className="max-w-[33rem]">
              <p className="text-[0.78rem] font-semibold tracking-[0.16em] text-[var(--color-brand)] uppercase">
                Assets
              </p>

              <h1 className="type-display mt-4 max-w-[13ch] text-[2.5rem] font-semibold text-zinc-950 sm:text-[3.25rem] lg:text-[4.2rem]">
                Explore every asset. Find your next{" "}
                <span className="text-[var(--color-brand)]">opportunity.</span>
              </h1>

              <p className="mt-4 max-w-[34rem] text-[0.96rem] leading-6.5 text-[var(--color-text-ui-soft)] sm:text-[1.02rem] sm:leading-7">
                Discover and track assets across crypto, stocks, commodities, and more, then
                move straight into the regret-first calculator flow.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/asset-selection"
                  className="inline-flex min-h-11 items-center gap-2 rounded-[0.95rem] bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] px-4.5 text-[0.9rem] font-semibold text-white shadow-[0_16px_34px_rgba(111,67,255,0.24)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <span>Explore Assets</span>
                  <ArrowIcon />
                </Link>

                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center gap-2 rounded-[0.95rem] border border-[color:var(--color-border-ui-subtle)] bg-white px-4.5 text-[0.9rem] font-semibold text-zinc-950 shadow-[0_12px_28px_rgba(24,24,27,0.04)] transition-colors hover:bg-[var(--color-surface-ui-subtle)]"
                >
                  <span>Learn more</span>
                  <ArrowIcon />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[18rem] lg:min-h-[22rem]">
              <div className="absolute left-[8%] top-[10%] hidden rounded-full bg-white/88 p-3 shadow-[0_18px_40px_rgba(111,67,255,0.12)] sm:block">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_100%)] text-[1rem] font-semibold text-[#f7931a]">
                  B
                </span>
              </div>

              <div className="absolute left-[16%] top-[34%] hidden rounded-full bg-white/84 p-3 shadow-[0_18px_40px_rgba(24,24,27,0.1)] lg:block">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(180deg,#f3f4f6_0%,#ffffff_100%)] text-[1rem] font-semibold text-zinc-700">
                  A
                </span>
              </div>

              <div className="absolute right-[14%] top-[16%] hidden rounded-full bg-white/88 p-3 shadow-[0_18px_40px_rgba(111,67,255,0.12)] sm:block">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(180deg,#eef2ff_0%,#ffffff_100%)] text-[1rem] font-semibold text-[#627eea]">
                  E
                </span>
              </div>

              <div className="absolute right-[8%] top-[43%] hidden rounded-full bg-white/88 p-3 shadow-[0_18px_40px_rgba(255,90,95,0.12)] sm:block">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(180deg,#fef2f2_0%,#ffffff_100%)] text-[1rem] font-semibold text-[#e82127]">
                  T
                </span>
              </div>

              <div className="relative flex h-full min-h-[18rem] items-end justify-center overflow-hidden rounded-[1.7rem] border border-[color:rgba(111,67,255,0.12)] bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.98)_0%,rgba(241,235,255,0.96)_43%,rgba(237,232,255,0.88)_100%)] px-5 pt-8 pb-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] lg:min-h-[22rem]">
                <div className="absolute inset-x-[12%] top-[15%] h-px bg-[linear-gradient(90deg,rgba(111,67,255,0)_0%,rgba(111,67,255,0.14)_50%,rgba(111,67,255,0)_100%)]" />
                <div className="absolute left-[18%] top-[10%]">
                  <SparkleIcon />
                </div>
                <div className="absolute right-[23%] top-[8%]">
                  <SparkleIcon />
                </div>
                <div className="absolute inset-x-[14%] bottom-[19%] h-[8.75rem] rounded-[1.6rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.66)_0%,rgba(255,255,255,0.24)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.88)]" />
                <div className="absolute inset-x-[17%] bottom-[26%] h-[1px] bg-[linear-gradient(90deg,rgba(111,67,255,0)_0%,rgba(111,67,255,0.18)_50%,rgba(111,67,255,0)_100%)]" />
                <div className="absolute inset-x-[18%] bottom-[22%] h-[4.9rem]">
                  <svg viewBox="0 0 320 110" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                    <path
                      d="M0 98 C24 82 36 90 58 56 C76 28 92 24 116 62 C135 92 154 80 177 42 C194 14 206 12 230 30 C248 44 264 74 286 62 C302 52 312 28 320 18"
                      fill="none"
                      stroke="rgba(111,67,255,0.24)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-[color:rgba(111,67,255,0.22)] bg-white/46 px-6 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(111,67,255,0.14)] bg-white/84 px-3 py-1.5 text-[0.76rem] font-semibold text-[var(--color-brand)] shadow-[0_10px_22px_rgba(111,67,255,0.08)]">
                    <SparkleIcon />
                    <span>Image Slot</span>
                  </div>

                  <p className="type-title mt-4 text-[1.45rem] font-semibold text-zinc-950 sm:text-[1.7rem]">
                    Hero visual placeholder
                  </p>
                  <p className="mt-2 max-w-[19rem] text-[0.88rem] leading-6 text-[var(--color-text-ui-soft)] sm:text-[0.94rem]">
                    This stage is reserved for the final artwork. The layout, spacing, and
                    floating asset markers are already in place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="rounded-[2rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,#ffffff_0%,#faf7ff_100%)] px-5 py-5 shadow-[0_24px_64px_rgba(24,24,27,0.05)] sm:px-6 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="type-title text-[1.28rem] font-semibold text-zinc-950">Top Movers (24H)</h2>
            <span className="rounded-full bg-[var(--color-success-soft)] px-2.5 py-1 text-[0.72rem] font-semibold text-[var(--color-success)]">
              Live mood
            </span>
          </div>

          <div className="mt-5 divide-y divide-[color:rgba(24,24,27,0.08)]">
            {assetsTopMovers.map((item, index) => (
              <div key={item.id} className="flex items-center gap-3 py-4 first:pt-0 last:pb-0">
                <span className="w-4 shrink-0 text-[0.86rem] font-semibold text-zinc-500">
                  {index + 1}
                </span>
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-[0.96rem] font-semibold ${item.markClassName}`}
                >
                  {item.mark}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="type-title text-[0.98rem] font-semibold text-zinc-950">{item.ticker}</p>
                  <p className="truncate text-[0.82rem] text-[var(--color-text-ui-soft)]">{item.name}</p>
                </div>
                <span className="text-[0.92rem] font-semibold text-[var(--color-success)]">
                  {item.moveLabel}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/market-movement"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[1rem] border border-[color:var(--color-border-ui-subtle)] bg-white text-[0.9rem] font-semibold text-[var(--color-brand-strong)] shadow-[0_12px_28px_rgba(24,24,27,0.04)] transition-colors hover:bg-[var(--color-surface-ui-subtle)]"
          >
            <span>View all market movement</span>
            <ArrowIcon />
          </Link>
        </aside>
      </div>
    </section>
  );
}
