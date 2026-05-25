import Link from "next/link";
import { marketMovementExploreMoreItems } from "@/features/market-movement/data/exploreMoreContent";
import type { MarketMovementExploreMoreItem } from "@/features/market-movement/types";

function ExploreIcon({ icon }: { icon: MarketMovementExploreMoreItem["icon"] }) {
  if (icon === "calculator") {
    return (
      <span className="grid h-12 w-12 place-items-center rounded-[1rem] bg-[linear-gradient(180deg,#edf1ff_0%,#dbe7ff_100%)] text-[#334155] shadow-[0_12px_22px_rgba(59,130,246,0.12)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="2.8" width="12" height="14.4" rx="2.2" />
          <path d="M6.7 6.4h6.6" />
          <path d="M6.7 10h1.6" />
          <path d="M10 10h1.6" />
          <path d="M13.3 10h.01" />
          <path d="M6.7 13.2h1.6" />
          <path d="M10 13.2h1.6" />
          <path d="M13.3 13.2h.01" />
        </svg>
      </span>
    );
  }

  if (icon === "moves") {
    return (
      <span className="grid h-12 w-12 place-items-center rounded-[1rem] bg-[linear-gradient(180deg,#fff0ea_0%,#ffe1d5_100%)] text-[#f97316] shadow-[0_12px_22px_rgba(249,115,22,0.12)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 13.5 8.5 9l2.5 2.5L16 6.5" />
          <path d="M11.5 6.5H16v4.5" />
        </svg>
      </span>
    );
  }

  if (icon === "whale") {
    return (
      <span className="grid h-12 w-12 place-items-center rounded-[1rem] bg-[linear-gradient(180deg,#ebf7ff_0%,#d9efff_100%)] text-[#0ea5e9] shadow-[0_12px_22px_rgba(14,165,233,0.12)]">
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
          <path d="M16.9 10.8c-.6-.8-1.7-1.3-2.7-1.2.5-1.7 0-3.5-1.6-4.6-1.8-1.2-4.3-.8-5.7 1-.5.6-.8 1.2-1 1.9-.4-.3-1-.5-1.5-.5-1.4 0-2.4 1.1-2.4 2.4 0 1.4 1 2.4 2.4 2.4.4 0 .9-.1 1.2-.3.6 1.7 2.1 2.9 4 2.9 1.6 0 3-.8 3.8-2.1.6.4 1.2.6 2 .6 1.4 0 2.5-1.1 2.5-2.5 0-.6-.3-1.3-1-2Z" />
        </svg>
      </span>
    );
  }

  return (
    <span className="grid h-12 w-12 place-items-center rounded-[1rem] bg-[linear-gradient(180deg,#f4ecff_0%,#ebe0ff_100%)] text-[var(--color-brand-strong)] shadow-[0_12px_22px_rgba(124,58,237,0.12)]">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 6.5h11" />
        <path d="M4.5 10h7.5" />
        <path d="M4.5 13.5h11" />
        <path d="m12.5 8 3-3 3 3" />
      </svg>
    </span>
  );
}

function ExploreMoreCard({ item }: { item: MarketMovementExploreMoreItem }) {
  return (
    <Link
      href={item.href}
      className="group flex min-h-[9.5rem] items-center gap-4 rounded-[1.5rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(252,250,255,0.94)_100%)] p-5 shadow-[0_18px_42px_rgba(24,24,27,0.04)] transition-transform duration-200 hover:-translate-y-0.5"
    >
      <ExploreIcon icon={item.icon} />
      <div className="min-w-0 flex-1">
        <p className="type-title text-[1rem] font-semibold text-zinc-950">{item.title}</p>
        <p className="mt-1.5 max-w-[15rem] text-[0.84rem] leading-6 text-[var(--color-text-ui-soft)]">
          {item.description}
        </p>
      </div>
      <span className="shrink-0 text-[var(--color-brand-strong)] transition-transform group-hover:translate-x-0.5">
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
      </span>
    </Link>
  );
}

export function MarketMovementExploreMoreSection() {
  return (
    <section className="mt-8 rounded-[2rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(252,250,255,0.94)_100%)] p-5 shadow-[0_22px_58px_rgba(24,24,27,0.05)] sm:p-6 lg:rounded-[2.2rem] lg:p-7">
      <h2 className="type-title text-[1.5rem] font-semibold text-zinc-950">Explore More</h2>

      <div className="mt-5 grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        {marketMovementExploreMoreItems.map((item) => (
          <ExploreMoreCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
