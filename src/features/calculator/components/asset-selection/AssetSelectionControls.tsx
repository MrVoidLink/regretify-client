const filterChips = [
  { label: "Most missed", isActive: true },
  { label: "Top movers", isActive: false },
  { label: "Popular picks", isActive: false },
] as const;

function FilterIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`h-3.5 w-3.5 ${isActive ? "text-[var(--color-brand)]" : "text-zinc-400"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 13 4-4 3 3 5-6" />
      <path d="M12 6h4v4" />
    </svg>
  );
}

export function AssetSelectionControls() {
  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-center">
      <label className="order-1 flex h-7.5 items-center gap-2 rounded-full border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] px-3.5 shadow-[0_8px_18px_rgba(24,24,27,0.02)] max-[389px]:h-7 max-[389px]:gap-1.5 max-[389px]:px-3 lg:order-2">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 shrink-0 text-zinc-400 max-[389px]:h-3 max-[389px]:w-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8.5" cy="8.5" r="4.5" />
          <path d="m12 12 4 4" />
        </svg>
        <input
          type="search"
          placeholder="Search assets..."
          className="min-w-0 flex-1 bg-transparent text-[0.72rem] text-zinc-950 outline-none placeholder:text-[var(--color-text-ui-muted)] max-[389px]:text-[0.68rem]"
        />
      </label>

      <div className="order-2 grid grid-cols-3 gap-2 max-[389px]:gap-1.5 lg:order-1">
        {filterChips.map((chip) => (
          <button
            key={chip.label}
            type="button"
            className={`inline-flex h-7.5 min-w-0 items-center justify-center gap-1 rounded-full px-2 text-[0.63rem] font-medium whitespace-nowrap transition-colors max-[389px]:h-7 max-[389px]:gap-0.75 max-[389px]:px-1.5 max-[389px]:text-[0.58rem] sm:gap-1.5 sm:px-3 sm:text-[0.72rem] ${
              chip.isActive
                ? "border border-[color:var(--color-brand-border)] bg-[linear-gradient(180deg,var(--color-brand-soft)_0%,var(--color-brand-soft-strong)_100%)] text-[var(--color-brand)] shadow-[0_8px_18px_rgba(92,44,233,0.08)]"
                : "border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] text-[var(--color-text-ui-soft)] shadow-[0_8px_18px_rgba(24,24,27,0.02)] hover:bg-[var(--color-brand-soft)]"
            }`}
          >
            <FilterIcon isActive={chip.isActive} />
            <span className="truncate">{chip.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
