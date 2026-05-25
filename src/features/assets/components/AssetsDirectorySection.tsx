import { assetDirectoryItems } from "@/features/assets/data/assetsPageTopContent";
import type { AssetDirectoryItem } from "@/features/assets/types";

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

function DirectoryRow({ asset }: { asset: AssetDirectoryItem }) {
  const yearlyMoveTone =
    asset.yearlyMoveLabel.startsWith("-") ? "text-[var(--color-danger)]" : "text-[var(--color-success)]";
  const volatilityTone =
    asset.volatilityLabel === "High"
      ? "bg-[var(--color-danger-soft)] text-[var(--color-danger)]"
      : asset.volatilityLabel === "Medium"
        ? "bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)]"
        : "bg-[rgba(34,197,94,0.12)] text-[var(--color-success)]";

  return (
    <article className="grid gap-4 border-t border-[color:var(--color-border-ui-subtle)] px-4 py-4 first:border-t-0 sm:px-5 lg:grid-cols-[minmax(0,1.4fr)_7rem_7rem_7rem_9.5rem] lg:items-center">
      <div className="flex min-w-0 items-start gap-3">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-[0.92rem] font-semibold ${asset.markClassName}`}
        >
          {asset.mark}
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="type-title text-[1rem] font-semibold text-zinc-950">{asset.ticker}</p>
            <span className="inline-flex min-h-7 items-center rounded-[0.75rem] bg-[var(--color-surface-ui-subtle)] px-2.5 text-[0.72rem] font-semibold text-zinc-700">
              {asset.marketLabel}
            </span>
          </div>
          <p className="mt-0.5 text-[0.78rem] text-[var(--color-text-ui-soft)]">{asset.name}</p>
          <p className="mt-2 max-w-[34rem] text-[0.84rem] leading-6 text-zinc-800">{asset.regretAngle}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 lg:block">
        <p className="text-[0.72rem] font-semibold tracking-[0.05em] text-[var(--color-text-ui-muted)] uppercase lg:mb-1.5">
          Price
        </p>
        <p className="type-title text-[0.98rem] font-semibold text-zinc-950">{asset.priceLabel}</p>
      </div>

      <div className="flex items-center justify-between gap-3 lg:block">
        <p className="text-[0.72rem] font-semibold tracking-[0.05em] text-[var(--color-text-ui-muted)] uppercase lg:mb-1.5">
          1Y Move
        </p>
        <p className={`type-title text-[0.98rem] font-semibold ${yearlyMoveTone}`}>{asset.yearlyMoveLabel}</p>
      </div>

      <div className="flex items-center justify-between gap-3 lg:block">
        <p className="text-[0.72rem] font-semibold tracking-[0.05em] text-[var(--color-text-ui-muted)] uppercase lg:mb-1.5">
          Volatility
        </p>
        <span className={`inline-flex min-h-8 items-center rounded-[0.8rem] px-3 text-[0.76rem] font-semibold ${volatilityTone}`}>
          {asset.volatilityLabel}
        </span>
      </div>

      <div className="pt-1 lg:pt-0 lg:text-right">
        <button
          type="button"
          className="inline-flex min-h-10 items-center gap-2 rounded-[0.9rem] px-1 text-[0.82rem] font-semibold text-[var(--color-brand-strong)] transition-opacity hover:opacity-75"
        >
          <span>Calculate regret</span>
          <ArrowIcon />
        </button>
      </div>
    </article>
  );
}

export function AssetsDirectorySection() {
  return (
    <section className="mt-8 rounded-[2rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(252,250,255,0.94)_100%)] shadow-[0_22px_58px_rgba(24,24,27,0.05)] lg:rounded-[2.2rem]">
      <div className="border-b border-[color:var(--color-border-ui-subtle)] px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="type-title text-[1.45rem] font-semibold text-zinc-950">Asset Directory</h2>
            <p className="mt-1 text-[0.9rem] text-[var(--color-text-ui-soft)]">
              Browse the strongest regret candidates and jump straight into the calculator.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[0.78rem] font-semibold text-[var(--color-text-ui-muted)]">
            <span className="inline-flex min-h-9 items-center rounded-[0.8rem] bg-[var(--color-surface-ui-subtle)] px-3">
              Sorted by attention
            </span>
            <span className="inline-flex min-h-9 items-center rounded-[0.8rem] bg-[var(--color-surface-ui-subtle)] px-3">
              8 curated picks
            </span>
          </div>
        </div>
      </div>

      <div>
        {assetDirectoryItems.map((asset) => (
          <DirectoryRow key={asset.id} asset={asset} />
        ))}
      </div>
    </section>
  );
}
