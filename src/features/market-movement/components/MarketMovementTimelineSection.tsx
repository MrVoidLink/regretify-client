import {
  marketMovementTimelineFilters,
  marketMovementTimelineItems,
} from "@/features/market-movement/data/timelineContent";
import type {
  MarketMovementTimelineFilter,
  MarketMovementTimelineItem,
} from "@/features/market-movement/types";

function getFilterClassName(filter: MarketMovementTimelineFilter) {
  if (filter.isActive) {
    return "border-[color:var(--color-brand-border)] bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] text-white shadow-[0_12px_24px_rgba(124,58,237,0.18)]";
  }

  return "border-[color:var(--color-border-ui-subtle)] bg-white text-zinc-700 hover:bg-[var(--color-surface-ui-subtle)]";
}

function getMovementPillClassName(item: MarketMovementTimelineItem) {
  if (item.movementType === "dump") {
    return "bg-[var(--color-danger-soft)] text-[var(--color-danger)]";
  }

  if (item.movementType === "breakout") {
    return "bg-[rgba(124,58,237,0.12)] text-[var(--color-brand-strong)]";
  }

  return "bg-[rgba(34,197,94,0.12)] text-[var(--color-success)]";
}

function getChangeClassName(changeLabel: string) {
  return changeLabel.startsWith("-")
    ? "text-[var(--color-danger)]"
    : "text-[var(--color-success)]";
}

function TimelineRow({ item, isLast }: { item: MarketMovementTimelineItem; isLast: boolean }) {
  return (
    <article className="py-4">
      <div className="flex gap-3 sm:hidden">
        <div className="relative flex w-4 shrink-0 justify-center">
          {!isLast ? (
            <span
              aria-hidden="true"
              className="absolute top-3 left-1/2 h-[calc(100%+1rem)] w-px -translate-x-1/2 bg-[var(--color-brand-border)]"
            />
          ) : null}
          <span className="relative z-10 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-[var(--color-brand)] shadow-[0_0_0_4px_rgba(124,58,237,0.12)]" />
        </div>

        <div className="min-w-0 flex-1 rounded-[1.15rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(251,249,255,0.92)_100%)] p-3.5 shadow-[0_12px_28px_rgba(24,24,27,0.035)]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[0.74rem] font-semibold ${item.assetMarkClassName}`}
              >
                {item.assetMark}
              </span>
              <div className="min-w-0">
                <p className="type-title text-[0.88rem] font-semibold text-zinc-950">
                  {item.assetTicker}
                </p>
                <p className="truncate text-[0.72rem] text-[var(--color-text-ui-soft)]">
                  {item.assetName}
                </p>
              </div>
            </div>

            <span className="shrink-0 pt-0.5 text-[0.72rem] font-medium text-[var(--color-text-ui-muted)]">
              {item.timeLabel}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between gap-3">
            <span
              className={`inline-flex min-h-7 items-center rounded-[0.75rem] px-2.5 text-[0.7rem] font-semibold ${getMovementPillClassName(item)}`}
            >
              {item.movementType === "breakout"
                ? "Breakout"
                : item.movementType === "dump"
                  ? "Dump"
                  : "Pump"}
            </span>
            <span className={`text-[0.78rem] font-semibold ${getChangeClassName(item.changeLabel)}`}>
              {item.changeLabel}
            </span>
          </div>

          <p className="mt-2.5 text-[0.8rem] leading-5.5 text-zinc-800">{item.summary}</p>
        </div>
      </div>

      <div className="hidden grid-cols-[5.5rem_1rem_7.5rem_6.5rem_minmax(0,1fr)] gap-4 sm:grid sm:items-center">
        <span className="pt-0.5 text-[0.82rem] font-medium text-[var(--color-text-ui-muted)]">
          {item.timeLabel}
        </span>

        <div className="relative flex justify-center">
          {!isLast ? (
            <span
              aria-hidden="true"
              className="absolute top-3 left-1/2 h-[calc(100%+1rem)] w-px -translate-x-1/2 bg-[var(--color-brand-border)]"
            />
          ) : null}
          <span className="relative z-10 mt-1 h-3 w-3 rounded-full border-2 border-white bg-[var(--color-brand)] shadow-[0_0_0_4px_rgba(124,58,237,0.12)]" />
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[0.82rem] font-semibold ${item.assetMarkClassName}`}
          >
            {item.assetMark}
          </span>
          <div className="min-w-0">
            <p className="type-title text-[0.92rem] font-semibold text-zinc-950">{item.assetTicker}</p>
            <p className="truncate text-[0.76rem] text-[var(--color-text-ui-soft)]">{item.assetName}</p>
          </div>
        </div>

        <div>
          <span className={`inline-flex min-h-8 items-center rounded-[0.8rem] px-3 text-[0.78rem] font-semibold ${getMovementPillClassName(item)}`}>
            {item.movementType === "breakout"
              ? "Breakout"
              : item.movementType === "dump"
                ? "Dump"
                : "Pump"}
          </span>
        </div>

        <div>
          <p className="text-[0.86rem] leading-6 text-zinc-800">{item.summary}</p>
        </div>
      </div>
    </article>
  );
}

export function MarketMovementTimelineSection() {
  return (
    <section className="rounded-[2rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(252,250,255,0.94)_100%)] p-5 shadow-[0_22px_58px_rgba(24,24,27,0.05)] sm:p-6 lg:rounded-[2.2rem] lg:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="type-title text-[1.45rem] font-semibold text-zinc-950">Market Movement Timeline</h2>

        <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-2">
            {marketMovementTimelineFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`inline-flex min-h-9.5 shrink-0 items-center rounded-[0.85rem] border px-3 text-[0.76rem] font-semibold transition-colors sm:min-h-10 sm:rounded-[0.9rem] sm:px-3.5 sm:text-[0.8rem] ${getFilterClassName(filter)}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 divide-y divide-[color:var(--color-border-ui-subtle)]">
        {marketMovementTimelineItems.map((item, index) => (
          <TimelineRow
            key={item.id}
            item={item}
            isLast={index === marketMovementTimelineItems.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
