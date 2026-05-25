import type { MarketPulseStorySponsorCard } from "@/features/market-pulse-story/types";

function ArrowRightIcon() {
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

function SponsorCoin() {
  return (
    <div className="relative h-22 w-22 rounded-full bg-[radial-gradient(circle_at_35%_35%,#ffe38b_0%,#f7c53b_48%,#d58b12_100%)] shadow-[0_22px_34px_rgba(245,180,40,0.24)]">
      <div className="absolute inset-2 rounded-full border border-white/35" />
      <div className="absolute inset-0 grid place-items-center text-[2rem] font-semibold text-[#6b4300]">
        B
      </div>
    </div>
  );
}

function SponsorBars() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-28 opacity-90 xl:block">
      <div className="absolute bottom-0 left-7 h-10 w-2 rounded-t-full bg-violet-500/50" />
      <div className="absolute bottom-0 left-11 h-16 w-2 rounded-t-full bg-violet-400/65" />
      <div className="absolute bottom-0 left-15 h-12 w-2 rounded-t-full bg-violet-500/55" />
      <div className="absolute bottom-0 left-20 h-20 w-2 rounded-t-full bg-violet-300/80" />
      <div className="absolute bottom-0 left-25 h-15 w-2 rounded-t-full bg-violet-500/55" />
      <div className="absolute bottom-0 right-22 h-12 w-2 rounded-t-full bg-violet-500/55" />
      <div className="absolute bottom-0 right-17 h-24 w-2 rounded-t-full bg-violet-300/75" />
      <div className="absolute bottom-0 right-12 h-18 w-2 rounded-t-full bg-violet-400/65" />
      <div className="absolute bottom-0 right-7 h-27 w-2 rounded-t-full bg-violet-300/85" />
      <div className="absolute bottom-7 right-24 h-px w-18 rotate-[14deg] bg-violet-300/80" />
    </div>
  );
}

export function MarketPulseStorySponsoredCard({
  sponsorCard,
}: {
  sponsorCard: MarketPulseStorySponsorCard;
}) {
  return (
    <aside className="relative h-full overflow-hidden rounded-[1.8rem] bg-[linear-gradient(180deg,#27115f_0%,#3a1880_56%,#5322a8_100%)] p-4 text-white shadow-[0_18px_48px_rgba(37,18,98,0.22)] xl:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(167,115,255,0.32)_0%,rgba(167,115,255,0)_42%)]" />
      <div className="absolute inset-y-0 right-0 w-24 bg-[linear-gradient(90deg,rgba(80,33,166,0)_0%,rgba(80,33,166,0.34)_100%)]" />
      <SponsorBars />

      <div className="relative z-10 flex min-h-[8.5rem] items-center justify-between gap-3 xl:min-h-full xl:flex-col xl:items-stretch">
        <div className="min-w-0 flex-1">
          <span className="text-[0.78rem] text-white/72 xl:text-[0.92rem]">{sponsorCard.label}</span>

          <div className="mt-2 max-w-[10.25rem] space-y-1.5 xl:mt-5 xl:max-w-[13rem] xl:space-y-4">
            <h2 className="text-[1rem] leading-[1.08] font-semibold tracking-[-0.06em] xl:text-[2rem] xl:leading-[0.98]">
            {sponsorCard.title}
            </h2>
            <p className="line-clamp-2 text-[0.72rem] leading-4.5 text-white/78 xl:text-[1rem] xl:leading-7">
              {sponsorCard.excerpt}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2.5 xl:mt-auto xl:justify-between xl:gap-4 xl:pt-8">
            <p className="type-title text-[0.95rem] font-semibold text-[#f7c53b] xl:text-[1.9rem]">
              {sponsorCard.sponsorName}
            </p>
            <button
              type="button"
              className="inline-flex min-h-7.5 items-center gap-1.5 rounded-lg bg-[#ffcf2f] px-2.5 text-[0.7rem] font-semibold text-zinc-950 transition-transform hover:translate-x-0.5 xl:min-h-11 xl:gap-2 xl:rounded-2xl xl:px-4 xl:text-[0.95rem]"
            >
              <span>{sponsorCard.ctaLabel}</span>
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        <div className="shrink-0 scale-[0.46] origin-center xl:scale-100 xl:self-end xl:pb-1">
          <SponsorCoin />
        </div>
      </div>
    </aside>
  );
}
