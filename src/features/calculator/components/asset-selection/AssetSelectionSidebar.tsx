import Link from "next/link";

export function AssetSelectionSidebar({ scenarioHref }: { scenarioHref: string }) {
  return (
    <aside className="hidden gap-3 xl:sticky xl:top-22 xl:grid">
      <section className="rounded-[1rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(249,246,255,0.92)_100%)] px-4 py-4 shadow-[0_14px_34px_rgba(24,24,27,0.04)]">
        <div className="relative overflow-hidden rounded-[0.95rem] bg-[radial-gradient(circle_at_top,_rgba(236,226,255,0.72),_rgba(255,255,255,0)_62%)] px-3 py-4">
          <span className="absolute left-4 top-4 h-1.5 w-1.5 rotate-45 rounded-[2px] bg-violet-300" />
          <span className="absolute right-6 top-5 h-1.5 w-1.5 rotate-45 rounded-[2px] bg-violet-300" />
          <span className="absolute left-7 top-13 h-1.5 w-1.5 rotate-45 rounded-[2px] bg-violet-400" />
          <span className="absolute right-4 top-15 h-1.5 w-1.5 rotate-45 rounded-[2px] bg-blue-300" />
          <span className="absolute left-4 bottom-11 h-1.5 w-1.5 rotate-45 rounded-[2px] bg-violet-300" />
          <span className="absolute right-7 bottom-12 h-1.5 w-1.5 rotate-45 rounded-[2px] bg-pink-300" />

          <div className="relative mx-auto grid h-24 w-24 place-items-center">
            <div className="absolute h-18 w-18 rounded-full border-[8px] border-[var(--color-brand)]" />
            <div className="absolute h-12 w-12 rounded-full border-[6px] border-[var(--color-brand-muted)]" />
            <div className="absolute h-6 w-6 rounded-full border-[5px] border-[var(--color-brand-border)]" />
            <div className="absolute left-[1.6rem] top-[3.8rem] h-2 w-9 rotate-[35deg] rounded-full bg-rose-700" />
            <div className="absolute left-[3.7rem] top-[3rem] h-3 w-3 rotate-45 border-r-[5px] border-t-[5px] border-rose-700" />
          </div>
        </div>

        <h2 className="type-title mt-3 text-[0.95rem] font-semibold text-zinc-950">
          You nailed the market shot!
        </h2>
        <p className="mt-1 text-[0.74rem] leading-4.5 text-[var(--color-text-ui-soft)]">
          Now the real choices begin.
        </p>
      </section>

      <section className="rounded-[1rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(249,246,255,0.92)_100%)] px-4 py-3.5 shadow-[0_14px_34px_rgba(24,24,27,0.04)]">
        <div className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">
          Why this matters
        </div>
        <p className="mt-1.5 text-[0.74rem] leading-4.5 text-[var(--color-text-ui-soft)]">
          The asset you choose will shape your regret calculation. Pick the one you
          wish you had in your portfolio.
        </p>
      </section>

      <section className="rounded-[1rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(249,246,255,0.92)_100%)] px-4 py-3.5 shadow-[0_14px_34px_rgba(24,24,27,0.04)]">
        <div className="type-title flex items-center gap-2 text-[0.78rem] font-semibold text-zinc-950">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[var(--color-brand)]">
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
              <path d="M10 3.5a4.3 4.3 0 0 0-2 8.1v1.4h4v-1.4a4.3 4.3 0 0 0-2-8.1Z" />
              <path d="M8 15h4" />
              <path d="M8.6 17h2.8" />
            </svg>
          </span>
          <span>Regretify tip</span>
        </div>
        <p className="mt-2 text-[0.74rem] leading-4.5 text-[var(--color-text-ui-soft)]">
          Think about the asset you heard about, but did not buy. The one that keeps
          you thinking &quot;what if?&quot;
        </p>
      </section>

      <Link
        href={scenarioHref}
        className="inline-flex h-10 items-center justify-between rounded-[0.95rem] bg-[linear-gradient(90deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] px-4 text-[0.78rem] font-semibold text-white shadow-[0_12px_24px_rgba(92,44,233,0.24)] transition-transform hover:-translate-y-0.5"
      >
        <span>Continue to scenario</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 10h12" />
          <path d="m11 4 5 6-5 6" />
        </svg>
      </Link>

      <div className="flex items-center justify-center gap-1.5 text-center text-[0.66rem] text-[var(--color-text-ui-muted)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4.8" y="8.7" width="10.4" height="6.5" rx="1.6" />
          <path d="M7.2 8.7V6.9A2.8 2.8 0 0 1 10 4.1a2.8 2.8 0 0 1 2.8 2.8v1.8" />
        </svg>
        <span>You&apos;ll set your dates and investment next</span>
      </div>
    </aside>
  );
}
