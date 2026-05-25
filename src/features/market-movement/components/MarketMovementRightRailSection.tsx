import Image from "next/image";
import { marketMovementWhaleActivityItems } from "@/features/market-movement/data/rightRailContent";
import type { MarketMovementWhaleActivityItem } from "@/features/market-movement/types";

function SponsoredCard() {
  return (
    <section className="rounded-[1.8rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,#ffffff_0%,#f7f2ff_100%)] p-4 shadow-[0_20px_46px_rgba(24,24,27,0.05)]">
      <p className="text-[0.74rem] font-semibold tracking-[0.08em] text-[var(--color-text-ui-muted)] uppercase">
        Sponsored
      </p>

      <div className="mt-4 overflow-hidden rounded-[1.4rem] bg-[linear-gradient(135deg,#2a124b_0%,#5b21b6_55%,#7c3aed_100%)] p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="type-title text-[1.1rem] font-semibold">Trade faster</p>
            <p className="mt-1 max-w-[11rem] text-[0.8rem] leading-5 text-white/82">
              Spot large moves early with a cleaner execution flow.
            </p>
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(180deg,#ffd166_0%,#f59e0b_100%)] text-[1.05rem] font-semibold text-[#4b2e00] shadow-[0_10px_20px_rgba(245,158,11,0.24)]">
            B
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-end gap-1 text-white/70">
            <span className="h-8 w-1.5 rounded-full bg-white/24" />
            <span className="h-12 w-1.5 rounded-full bg-white/36" />
            <span className="h-10 w-1.5 rounded-full bg-white/28" />
            <span className="h-15 w-1.5 rounded-full bg-white/55" />
            <span className="h-7 w-1.5 rounded-full bg-white/24" />
          </div>

          <button
            type="button"
            className="inline-flex min-h-10 items-center gap-2 rounded-[0.95rem] bg-white px-3.5 text-[0.78rem] font-semibold text-zinc-950 transition-opacity hover:opacity-85"
          >
            <span>Trade now</span>
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
        </div>
      </div>
    </section>
  );
}

function WhaleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 text-[#2563eb]"
      fill="currentColor"
    >
      <path d="M16.9 10.8c-.6-.8-1.7-1.3-2.7-1.2.5-1.7 0-3.5-1.6-4.6-1.8-1.2-4.3-.8-5.7 1-.5.6-.8 1.2-1 1.9-.4-.3-1-.5-1.5-.5-1.4 0-2.4 1.1-2.4 2.4 0 1.4 1 2.4 2.4 2.4.4 0 .9-.1 1.2-.3.6 1.7 2.1 2.9 4 2.9 1.6 0 3-.8 3.8-2.1.6.4 1.2.6 2 .6 1.4 0 2.5-1.1 2.5-2.5 0-.6-.3-1.3-1-2Z" />
    </svg>
  );
}

function WhaleActivityItem({ item }: { item: MarketMovementWhaleActivityItem }) {
  return (
    <article className="flex items-start gap-3">
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-[0.88rem] font-semibold ${item.assetMarkClassName}`}
      >
        {item.assetMark}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="type-title text-[0.9rem] font-semibold text-zinc-950">{item.whaleLabel}</p>
            <p className="mt-1 text-[0.8rem] text-[var(--color-text-ui-soft)]">{item.moveLabel}</p>
          </div>
          <span className="shrink-0 pt-0.5 text-[0.74rem] text-[var(--color-text-ui-muted)]">
            {item.timeLabel}
          </span>
        </div>
      </div>
    </article>
  );
}

function CalculateYourRegretCard() {
  return (
    <section className="overflow-hidden rounded-[1.8rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,#ffffff_0%,#f7f2ff_100%)] shadow-[0_20px_46px_rgba(24,24,27,0.05)]">
      <div className="relative aspect-[4/5]">
        <Image
          src="/images/market-movement/market-movement-regret-cta.png"
          alt="Calculate your regret promotional card with the Regretify mascot and a calculator."
          fill
          sizes="304px"
          className="object-cover"
        />
      </div>
    </section>
  );
}

export function MarketMovementRightRailSection() {
  return (
    <div className="hidden xl:flex xl:flex-col xl:gap-5">
      <SponsoredCard />

      <section className="rounded-[1.8rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,251,255,0.94)_100%)] p-4 shadow-[0_20px_46px_rgba(24,24,27,0.05)]">
        <div className="flex items-center gap-2">
          <WhaleIcon />
          <h2 className="type-title text-[1.02rem] font-semibold text-zinc-950">Whale Activity</h2>
        </div>

        <div className="mt-4 space-y-4">
          {marketMovementWhaleActivityItems.map((item) => (
            <WhaleActivityItem key={item.id} item={item} />
          ))}
        </div>

        <button
          type="button"
          className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-[0.95rem] px-1 text-[0.82rem] font-semibold text-[var(--color-brand-strong)] transition-opacity hover:opacity-75"
        >
          <span>View all whale activity</span>
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
        </button>
      </section>

      <CalculateYourRegretCard />
    </div>
  );
}
