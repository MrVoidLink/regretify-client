import {
  marketMovementBiggestMoveCard,
  marketMovementHeroContent,
} from "@/features/market-movement/data/heroContent";
import { MarketMovementMoversTableSection } from "@/features/market-movement/components/MarketMovementMoversTableSection";
import { MarketMovementRightRailSection } from "@/features/market-movement/components/MarketMovementRightRailSection";
import { MarketMovementExploreMoreSection } from "@/features/market-movement/components/MarketMovementExploreMoreSection";
import { MarketMovementTimelineSection } from "@/features/market-movement/components/MarketMovementTimelineSection";
import type {
  MarketMovementStatTone,
  MarketMovementSummaryStat,
} from "@/features/market-movement/types";

function BoltAccent() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-7 w-7 text-[var(--color-brand)] sm:h-8 sm:w-8"
      fill="currentColor"
    >
      <path d="m10.8 1.8-4 6.3h2.9L8.7 18.2l5.1-7H11l-.2-9.4Z" />
    </svg>
  );
}

function BiggestMoveSparkline() {
  return (
    <svg
      viewBox="0 0 220 112"
      className="mt-3.5 h-22 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="movement-sparkline-fill" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(34,197,94,0.24)" />
          <stop offset="100%" stopColor="rgba(34,197,94,0)" />
        </linearGradient>
      </defs>
      <path
        d="M0 92 C12 74 20 72 30 78 C40 84 50 86 60 74 C69 64 79 66 90 79 C100 92 112 88 122 76 C132 64 143 67 153 54 C164 41 176 46 186 29 C196 13 206 19 220 5"
        fill="none"
        stroke="#22c55e"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M0 112 L0 92 C12 74 20 72 30 78 C40 84 50 86 60 74 C69 64 79 66 90 79 C100 92 112 88 122 76 C132 64 143 67 153 54 C164 41 176 46 186 29 C196 13 206 19 220 5 L220 112 Z"
        fill="url(#movement-sparkline-fill)"
      />
    </svg>
  );
}

function SummaryStatIcon({
  icon,
  tone,
}: {
  icon: MarketMovementSummaryStat["icon"];
  tone: MarketMovementStatTone;
}) {
  const toneClassName =
    tone === "negative"
      ? "bg-[var(--color-danger-soft)] text-[var(--color-danger)]"
      : tone === "neutral"
        ? "bg-[var(--color-surface-ui-muted)] text-zinc-700"
        : "bg-[var(--color-brand-soft)] text-[var(--color-brand)]";

  return (
    <span
      className={`grid h-10 w-10 place-items-center rounded-[1rem] ${toneClassName}`}
      aria-hidden="true"
    >
      {icon === "flash" ? (
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
          <path d="m10.8 1.8-4 6.3h2.9L8.7 18.2l5.1-7H11l-.2-9.4Z" />
        </svg>
      ) : icon === "arrow-up" ? (
        <svg
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 14 14 4" />
          <path d="M7 4h7v7" />
        </svg>
      ) : icon === "arrow-down" ? (
        <svg
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6 14 16" />
          <path d="M14 9v7H7" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 12.2a3.3 3.3 0 0 1-3.3 3.3H7.4L4 18v-2.5a3.3 3.3 0 0 1-2.3-3.1V7.3A3.3 3.3 0 0 1 5 4h7.7A3.3 3.3 0 0 1 16 7.3Z" />
        </svg>
      )}
    </span>
  );
}

function SummaryStatCard({ stat }: { stat: MarketMovementSummaryStat }) {
  const secondaryToneClassName =
    stat.tone === "negative"
      ? "text-[var(--color-danger)]"
      : stat.tone === "neutral"
        ? "text-[var(--color-text-ui-soft)]"
        : "text-[var(--color-success)]";

  const deltaToneClassName =
    stat.tone === "negative" ? "text-[var(--color-danger)]" : "text-[var(--color-success)]";

  return (
    <article className="rounded-[1rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] px-3 py-2.5 shadow-[0_10px_24px_rgba(24,24,27,0.035)] sm:rounded-[1.2rem] sm:p-4">
      <div className="flex items-center gap-2.5 sm:items-start sm:gap-3">
        <SummaryStatIcon icon={stat.icon} tone={stat.tone} />
        <div className="min-w-0 flex-1">
          <p className="text-[0.76rem] font-semibold tracking-[0.06em] text-[var(--color-text-ui-muted)] uppercase">
            {stat.label}
          </p>
          <div className="mt-1 flex items-baseline justify-between gap-2 sm:mt-3 sm:block">
            <p className="type-title shrink-0 text-[1.08rem] font-semibold text-zinc-950 sm:text-[1.7rem]">
              {stat.primaryValue}
            </p>
            <div className="min-w-0 flex items-center justify-end gap-1.5 overflow-hidden text-right text-[0.68rem] sm:hidden">
              <span className={`${secondaryToneClassName} truncate`}>{stat.secondaryValue}</span>
              <span className="shrink-0 text-[var(--color-text-ui-muted)]">&bull;</span>
              <span className={`shrink-0 font-semibold ${deltaToneClassName}`}>
                {stat.deltaLabel}
              </span>
            </div>
          </div>
          <div className="mt-0.5 hidden items-center gap-1.5 text-[0.68rem] sm:mt-2 sm:flex sm:flex-wrap sm:gap-2 sm:text-[0.84rem]">
            <span className={`${secondaryToneClassName} truncate`}>{stat.secondaryValue}</span>
            <span className="text-[var(--color-text-ui-muted)] sm:inline">&bull;</span>
            <span className={`font-semibold ${deltaToneClassName}`}>
              {stat.deltaLabel}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function BiggestMoveCard() {
  return (
    <aside className="flex h-full flex-col rounded-[1.7rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,#fbfffd_0%,#f4fff8_100%)] p-4 shadow-[0_18px_44px_rgba(24,24,27,0.05)] sm:p-[1.125rem]">
      <p className="text-[0.72rem] font-semibold tracking-[0.04em] text-zinc-950">
        {marketMovementBiggestMoveCard.label}
      </p>

      <div className="mt-3 flex items-center gap-2.5">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(180deg,#f7d067_0%,#e8b63c_100%)] text-[0.9rem] font-semibold text-white shadow-[0_12px_22px_rgba(232,182,60,0.24)]">
          D
        </div>
        <div>
          <p className="type-title text-[1rem] font-semibold text-zinc-950">
            {marketMovementBiggestMoveCard.assetTicker}
          </p>
          <p className="text-[0.74rem] text-[var(--color-text-ui-soft)]">
            {marketMovementBiggestMoveCard.assetName}
          </p>
        </div>
      </div>

      <p className="type-display mt-3 text-[2rem] font-semibold text-[var(--color-success)] sm:text-[2.15rem]">
        {marketMovementBiggestMoveCard.changeLabel}
      </p>

      <p className="mt-0.5 text-[0.76rem] text-[var(--color-text-ui-soft)]">
        Price{" "}
        <span className="font-semibold text-zinc-950">
          {marketMovementBiggestMoveCard.priceLabel}
        </span>
      </p>

      <BiggestMoveSparkline />

      <div className="mt-2 flex items-center justify-between gap-4 text-[0.72rem]">
        <div>
          <p className="text-[var(--color-text-ui-muted)]">24H Low</p>
          <p className="mt-1 font-semibold text-zinc-950">
            {marketMovementBiggestMoveCard.lowLabel}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[var(--color-text-ui-muted)]">24H High</p>
          <p className="mt-1 font-semibold text-zinc-950">
            {marketMovementBiggestMoveCard.highLabel}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="mt-auto inline-flex min-h-9.5 w-full items-center justify-center gap-1.5 rounded-[0.95rem] border border-[color:var(--color-brand-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,242,255,0.92)_100%)] px-3.5 text-[0.74rem] font-semibold text-[var(--color-brand-strong)] transition-colors hover:bg-[var(--color-brand-soft)]"
      >
        <span>View full chart</span>
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
          <path d="M4 10h11.5" />
          <path d="m11 4.5 5 5.5-5 5.5" />
        </svg>
      </button>
    </aside>
  );
}

function MarketMovementHeroSection() {
  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_19rem] xl:items-stretch">
      <div className="min-w-0 rounded-[2rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(250,247,255,0.94)_100%)] p-5 shadow-[0_22px_58px_rgba(24,24,27,0.06)] sm:p-7 lg:rounded-[2.2rem] lg:p-8">
        <div className="max-w-[36rem] min-w-0">
          <p className="text-[0.78rem] font-semibold tracking-[0.16em] text-[var(--color-brand)] uppercase">
            {marketMovementHeroContent.eyebrow}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <h1 className="type-display text-[2rem] font-semibold text-zinc-950 sm:text-[2.55rem] lg:text-[2.9rem]">
              {marketMovementHeroContent.title}
            </h1>
            <BoltAccent />
          </div>
          <p className="mt-3.5 max-w-[34rem] text-[0.94rem] leading-6.5 text-[var(--color-text-ui-soft)] sm:text-[0.98rem]">
            {marketMovementHeroContent.description}
          </p>
        </div>

        <div className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-3 md:grid-cols-2 xl:grid-cols-4">
          {marketMovementHeroContent.stats.map((stat) => (
            <SummaryStatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>

      <BiggestMoveCard />
    </section>
  );
}

export function MarketMovementPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#fcfbff_0%,#ffffff_22%,#ffffff_100%)] text-zinc-950">
      <section className="mx-auto max-w-[96rem] px-4 pt-3 pb-8 sm:px-6 sm:pt-4 sm:pb-10 lg:px-8 lg:pt-5 lg:pb-12">
        <MarketMovementHeroSection />
        <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_19rem] xl:items-start">
          <div className="min-w-0">
            <MarketMovementMoversTableSection />
          </div>
          <MarketMovementRightRailSection />
        </div>
        <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_19rem] xl:items-start">
          <div className="min-w-0">
            <MarketMovementTimelineSection />
          </div>
          <div aria-hidden="true" className="hidden xl:block" />
        </div>
        <MarketMovementExploreMoreSection />
      </section>
    </main>
  );
}
