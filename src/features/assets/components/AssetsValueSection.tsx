import Link from "next/link";
import { assetsValueCards } from "@/features/assets/data/assetsValueContent";
import type { AssetsValueCard } from "@/features/assets/types";

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

function ValueIcon({ icon }: { icon: AssetsValueCard["icon"] }) {
  if (icon === "scale") {
    return (
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
        <path d="M10 3v14" />
        <path d="M5 6h10" />
        <path d="m6 6-2.5 4h5L6 6Z" />
        <path d="m14 6-2.5 4h5L14 6Z" />
      </svg>
    );
  }

  if (icon === "trophy") {
    return (
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
        <path d="M6 3.5h8v2.8a4 4 0 0 1-8 0V3.5Z" />
        <path d="M8 13h4" />
        <path d="M10 10.3v2.7" />
        <path d="M6 16.5h8" />
        <path d="M6 4H3.8a2 2 0 0 0 2 3H6" />
        <path d="M14 4h2.2a2 2 0 0 1-2 3H14" />
      </svg>
    );
  }

  if (icon === "mood") {
    return (
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
        <circle cx="10" cy="10" r="6.5" />
        <path d="M7.5 8h.01" />
        <path d="M12.5 8h.01" />
        <path d="M6.8 13.2c.9-1.1 2-1.7 3.2-1.7s2.3.6 3.2 1.7" />
      </svg>
    );
  }

  return (
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
      <rect x="4" y="3.5" width="12" height="13" rx="2" />
      <path d="M7 6.5h6" />
      <path d="M7 9.5h6" />
      <path d="M7 12.5h4" />
    </svg>
  );
}

export function AssetsValueSection() {
  return (
    <section className="mx-auto max-w-[96rem] px-4 pb-10 sm:px-6 sm:pb-12 lg:px-8 lg:pb-14">
      <div className="rounded-[2rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(252,250,255,0.94)_100%)] p-4 shadow-[0_22px_58px_rgba(24,24,27,0.05)] sm:p-5 lg:rounded-[2.2rem] lg:p-6">
        <div className="mb-4 sm:mb-5">
          <h2 className="type-title text-[1.35rem] font-semibold text-zinc-950 sm:text-[1.5rem]">
            Learn. Compare. Decide better.
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {assetsValueCards.map((card) => (
            <article
              key={card.id}
              className="group rounded-[1.45rem] border border-[color:var(--color-border-ui-subtle)] bg-white p-4 shadow-[0_14px_34px_rgba(24,24,27,0.04)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-[1rem] bg-[var(--color-brand-soft)] text-[var(--color-brand)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <ValueIcon icon={card.icon} />
                </span>
                <span className="text-[var(--color-brand-muted)] transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </div>

              <h3 className="type-title mt-4 text-[1.02rem] font-semibold text-zinc-950">
                {card.title}
              </h3>
              <p className="mt-2 max-w-[18rem] text-[0.86rem] leading-6 text-[var(--color-text-ui-soft)]">
                {card.description}
              </p>

              <Link
                href="/assets"
                className="mt-4 inline-flex min-h-9 items-center gap-2 text-[0.82rem] font-semibold text-[var(--color-brand-strong)] transition-opacity hover:opacity-75"
              >
                <span>Explore</span>
                <ArrowIcon />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
