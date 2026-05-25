import {
  marketMovementFilters,
  marketMovementTableRows,
  marketMovementTimeRange,
} from "@/features/market-movement/data/movementTableContent";
import type {
  MarketMovementChartTone,
  MarketMovementFilter,
  MarketMovementTableRow,
} from "@/features/market-movement/types";

function getFilterClassName(filter: MarketMovementFilter) {
  if (filter.isActive) {
    return "border-[color:var(--color-brand-border)] bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] text-white shadow-[0_14px_28px_rgba(124,58,237,0.22)]";
  }

  return "border-[color:var(--color-border-ui-subtle)] bg-white text-zinc-700 hover:bg-[var(--color-surface-ui-subtle)]";
}

function getMovementBadgeClassName(type: MarketMovementTableRow["movementType"]) {
  if (type === "dump") {
    return "bg-[var(--color-danger-soft)] text-[var(--color-danger)]";
  }

  if (type === "breakout") {
    return "bg-[rgba(124,58,237,0.12)] text-[var(--color-brand-strong)]";
  }

  if (type === "whale") {
    return "bg-[rgba(59,130,246,0.12)] text-[#2563eb]";
  }

  return "bg-[rgba(34,197,94,0.12)] text-[var(--color-success)]";
}

function getChangeClassName(changeLabel: string) {
  return changeLabel.startsWith("-")
    ? "text-[var(--color-danger)]"
    : "text-[var(--color-success)]";
}

function getChartTonePalette(tone: MarketMovementChartTone) {
  if (tone === "red") {
    return {
      stroke: "#ef4444",
      glow: "rgba(239,68,68,0.16)",
      fillId: "movement-row-fill-red",
      fillStart: "rgba(239,68,68,0.18)",
    };
  }

  if (tone === "blue") {
    return {
      stroke: "#3b82f6",
      glow: "rgba(59,130,246,0.16)",
      fillId: "movement-row-fill-blue",
      fillStart: "rgba(59,130,246,0.18)",
    };
  }

  if (tone === "violet") {
    return {
      stroke: "#8b5cf6",
      glow: "rgba(139,92,246,0.16)",
      fillId: "movement-row-fill-violet",
      fillStart: "rgba(139,92,246,0.18)",
    };
  }

  return {
    stroke: "#22c55e",
    glow: "rgba(34,197,94,0.16)",
    fillId: "movement-row-fill-green",
    fillStart: "rgba(34,197,94,0.18)",
  };
}

function RowSparkline({ row }: { row: MarketMovementTableRow }) {
  const palette = getChartTonePalette(row.chartTone);

  return (
    <svg viewBox="0 0 124 48" className="h-10 w-[6.5rem] lg:w-[7rem]" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={palette.fillId} x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor={palette.fillStart} />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <path
        d={`${row.chartPath} L124 48 L0 48 Z`}
        fill={`url(#${palette.fillId})`}
      />
      <path
        d={row.chartPath}
        fill="none"
        stroke={palette.stroke}
        strokeWidth="2.2"
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 6px 10px ${palette.glow})` }}
      />
    </svg>
  );
}

function FavoriteButton() {
  return (
    <button
      type="button"
      aria-label="Save move"
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-[var(--color-surface-ui-subtle)] hover:text-zinc-700"
    >
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
        <path d="m10 3.5 2.05 4.16 4.6.67-3.33 3.24.79 4.58L10 14.02 5.89 16.15l.79-4.58-3.33-3.24 4.6-.67L10 3.5Z" />
      </svg>
    </button>
  );
}

function MarketMovementTableRowItem({ row }: { row: MarketMovementTableRow }) {
  return (
    <tr className="border-t border-[color:var(--color-border-ui-subtle)]">
      <td className="py-2.5 pr-1.5 pl-2.5 sm:py-4 sm:pr-4 sm:pl-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className={`grid h-8 w-8 place-items-center rounded-full text-[0.74rem] font-semibold sm:h-10 sm:w-10 sm:text-[0.88rem] ${row.assetMarkClassName}`}
          >
            {row.assetMark}
          </span>
          <div className="min-w-0">
            <p className="type-title text-[0.84rem] font-semibold text-zinc-950 sm:text-[1rem]">
              {row.assetTicker}
            </p>
            <p className="truncate text-[0.68rem] text-[var(--color-text-ui-soft)] sm:text-[0.8rem]">
              {row.assetName}
            </p>
          </div>
        </div>
      </td>
      <td className="px-1.5 py-2.5 sm:px-4 sm:py-4">
        <span
          className={`inline-flex min-h-6 items-center rounded-[0.7rem] px-2 text-[0.66rem] font-semibold sm:min-h-8 sm:rounded-[0.8rem] sm:px-3 sm:text-[0.8rem] ${getMovementBadgeClassName(row.movementType)}`}
        >
          {row.movementType === "whale" ? "Whale" : row.movementType.charAt(0).toUpperCase() + row.movementType.slice(1)}
        </span>
      </td>
      <td className={`whitespace-nowrap px-1.5 py-2.5 text-[0.78rem] font-semibold sm:px-4 sm:py-4 sm:text-[0.98rem] ${getChangeClassName(row.changeLabel)}`}>
        {row.changeLabel}
      </td>
      <td className="whitespace-nowrap px-1.5 py-2.5 text-[0.76rem] font-semibold text-zinc-950 sm:px-4 sm:py-4 sm:text-[0.96rem]">
        {row.priceLabel}
      </td>
      <td className="whitespace-nowrap px-1.5 py-2.5 text-[0.76rem] font-semibold text-zinc-950 sm:px-4 sm:py-4 sm:text-[0.96rem]">
        {row.volumeLabel}
      </td>
      <td className="whitespace-nowrap px-1 py-2.5 text-[0.68rem] text-[var(--color-text-ui-soft)] sm:px-4 sm:py-4 sm:text-[0.88rem]">
        {row.timeLabel}
      </td>
      <td className="px-1.5 py-2.5 sm:px-4 sm:py-4">
        <RowSparkline row={row} />
      </td>
      <td className="py-2.5 pr-2 pl-1 text-right sm:py-4 sm:pr-5 sm:pl-2">
        <FavoriteButton />
      </td>
    </tr>
  );
}

export function MarketMovementMoversTableSection() {
  return (
    <section className="min-w-0 max-w-full rounded-[2rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(252,250,255,0.94)_100%)] p-4 shadow-[0_22px_58px_rgba(24,24,27,0.05)] sm:p-5 lg:rounded-[2.2rem] lg:p-6">
      <div className="flex items-start gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-2 pr-1">
            {marketMovementFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`inline-flex min-h-9.5 shrink-0 items-center whitespace-nowrap rounded-[0.85rem] border px-3.5 text-[0.8rem] font-semibold transition-colors sm:min-h-11 sm:rounded-[0.95rem] sm:px-4 sm:text-[0.86rem] ${getFilterClassName(filter)}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="sticky right-0 shrink-0 inline-flex min-h-9.5 items-center justify-center gap-1.5 rounded-[0.85rem] border border-[color:var(--color-border-ui-subtle)] bg-white px-3 text-[0.8rem] font-semibold text-zinc-950 shadow-[0_10px_24px_rgba(24,24,27,0.04)] transition-colors hover:bg-[var(--color-surface-ui-subtle)] sm:min-h-11 sm:rounded-[0.95rem] sm:px-4 sm:text-[0.9rem] lg:static lg:shadow-none"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5 text-[var(--color-text-ui-soft)] sm:h-4 sm:w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3.5" y="4.5" width="13" height="12" rx="2.5" />
            <path d="M6.5 2.8v3.4" />
            <path d="M13.5 2.8v3.4" />
            <path d="M3.5 8.5h13" />
          </svg>
          <span>{marketMovementTimeRange.label}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5 text-[var(--color-text-ui-soft)] sm:h-4 sm:w-4"
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

      <div className="mt-4 max-w-full overflow-x-auto overscroll-x-contain touch-pan-x pb-1 xl:overflow-visible xl:pb-0">
        <table className="min-w-max border-separate border-spacing-0 md:w-full md:min-w-[54rem] xl:min-w-full">
          <thead>
            <tr>
              <th className="border-y border-t border-[color:var(--color-border-ui-subtle)] bg-white/86 py-2.5 pr-1.5 pl-2.5 text-left text-[0.64rem] font-semibold tracking-[0.03em] text-[var(--color-text-ui-muted)] first:rounded-tl-[1.2rem] sm:pr-4 sm:pl-5 sm:py-3 sm:text-[0.78rem]">
                Asset
              </th>
              <th className="whitespace-nowrap border-y border-t border-[color:var(--color-border-ui-subtle)] px-1.5 py-2.5 text-left text-[0.64rem] font-semibold tracking-[0.03em] text-[var(--color-text-ui-muted)] sm:px-4 sm:py-3 sm:text-[0.78rem]">
                Type
              </th>
              <th className="whitespace-nowrap border-y border-t border-[color:var(--color-border-ui-subtle)] px-1.5 py-2.5 text-left text-[0.64rem] font-semibold tracking-[0.03em] text-[var(--color-text-ui-muted)] sm:px-4 sm:py-3 sm:text-[0.78rem]">
                Change
              </th>
              <th className="whitespace-nowrap border-y border-t border-[color:var(--color-border-ui-subtle)] px-1.5 py-2.5 text-left text-[0.64rem] font-semibold tracking-[0.03em] text-[var(--color-text-ui-muted)] sm:px-4 sm:py-3 sm:text-[0.78rem]">
                Price
              </th>
              <th className="whitespace-nowrap border-y border-t border-[color:var(--color-border-ui-subtle)] px-1.5 py-2.5 text-left text-[0.64rem] font-semibold tracking-[0.03em] text-[var(--color-text-ui-muted)] sm:px-4 sm:py-3 sm:text-[0.78rem]">
                Volume
              </th>
              <th className="whitespace-nowrap border-y border-t border-[color:var(--color-border-ui-subtle)] px-1 py-2.5 text-left text-[0.64rem] font-semibold tracking-[0.03em] text-[var(--color-text-ui-muted)] sm:px-4 sm:py-3 sm:text-[0.78rem]">
                Time
              </th>
              <th className="whitespace-nowrap border-y border-t border-[color:var(--color-border-ui-subtle)] px-1.5 py-2.5 text-left text-[0.64rem] font-semibold tracking-[0.03em] text-[var(--color-text-ui-muted)] sm:px-4 sm:py-3 sm:text-[0.78rem]">
                Chart (24h)
              </th>
              <th className="whitespace-nowrap border-y border-t border-[color:var(--color-border-ui-subtle)] py-2.5 pr-2 pl-1 text-right text-[0.64rem] font-semibold tracking-[0.03em] text-[var(--color-text-ui-muted)] last:rounded-tr-[1.2rem] sm:py-3 sm:pr-5 sm:pl-2 sm:text-[0.78rem]">
                Save
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {marketMovementTableRows.map((row) => (
              <MarketMovementTableRowItem key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
