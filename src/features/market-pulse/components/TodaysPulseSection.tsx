import Link from "next/link";
import { pulseCategories, pulseStories, pulseTrends } from "@/features/market-pulse/data/todaysPulse";
import { marketPulseFeedPath } from "@/features/market-pulse/lib/routes";
import type {
  PulseCategory,
  PulseStory,
  PulseTrend,
} from "@/features/market-pulse/types";

function CategoryPill({ category }: { category: PulseCategory }) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-10 items-center rounded-full border px-4 text-[0.8rem] font-medium transition-colors ${
        category.isSelected
          ? "border-transparent bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] text-white shadow-[0_12px_28px_rgba(90,40,223,0.24)]"
          : "border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] text-[var(--color-text-ui-soft)] hover:bg-[var(--color-brand-soft)]"
      }`}
    >
      {category.label}
    </button>
  );
}

function SortButton() {
  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center justify-between gap-3 rounded-[1rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] px-4 text-[0.82rem] font-medium text-[var(--color-text-ui-soft)] shadow-[0_10px_24px_rgba(24,24,27,0.04)]"
    >
      <span>Latest</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-4 w-4 text-zinc-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6.5 8 3.5 4 3.5-4" />
      </svg>
    </button>
  );
}

function StorySparkline() {
  return (
    <svg
      viewBox="0 0 100 42"
      className="absolute inset-x-0 bottom-0 h-28 w-full text-emerald-400/95"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="pulse-neon-line">
          <feGaussianBlur stdDeviation="2.2" result="blurred" />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M0 35 C11 35 16 36 24 34 C33 32 36 22 42 24 C48 26 52 18 58 20 C65 22 69 16 74 18 C81 20 86 10 92 11 C96 11 98 5 100 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        filter="url(#pulse-neon-line)"
      />
    </svg>
  );
}

function TrendSparkline({ trend }: { trend: PulseTrend }) {
  const strokeColor = trend.tone === "positive" ? "#52d18c" : "#ef7f8f";

  return (
    <svg
      viewBox="0 0 74 28"
      className="h-7 w-[4.6rem] shrink-0"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={trend.sparklinePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StoryVisual({ story }: { story: PulseStory }) {
  switch (story.visual) {
    case "chart":
      return (
        <>
          <div className="absolute right-5 top-5 grid h-14 w-14 place-items-center rounded-full bg-[linear-gradient(180deg,#ffa93d_0%,#ff7a00_100%)] text-[1.18rem] font-bold text-white shadow-[0_16px_30px_rgba(255,122,0,0.28)]">
            B
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.34)_100%)]" />
          <StorySparkline />
        </>
      );
    case "party":
      return (
        <>
          <div className="absolute inset-x-0 bottom-2 text-center">
            <div className="mx-auto h-28 w-28 rounded-[2.2rem] bg-[radial-gradient(circle_at_50%_28%,#d4ff7e_0%,#67d58f_46%,#ffcf59_78%,#ff9a47_100%)] shadow-[0_16px_32px_rgba(24,24,27,0.12)]" />
          </div>
          <div className="absolute bottom-19 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[0.95rem] border-b-[1.6rem] border-x-transparent border-b-fuchsia-400" />
          <div className="absolute bottom-18 left-[39%] h-3.5 w-3.5 rounded-full bg-zinc-950" />
          <div className="absolute bottom-18 right-[39%] h-3.5 w-3.5 rounded-full bg-zinc-950" />
          <div className="absolute bottom-14 left-1/2 h-3 w-7 -translate-x-1/2 rounded-full bg-fuchsia-500/90" />
          <div className="absolute bottom-31 left-[18%] h-2 w-2 rounded-full bg-fuchsia-300" />
          <div className="absolute bottom-20 left-[13%] h-1.5 w-1.5 rounded-full bg-orange-300" />
          <div className="absolute right-[15%] top-10 h-2 w-1 rounded-full bg-emerald-400" />
          <div className="absolute right-[22%] top-16 h-1.5 w-1.5 rotate-45 bg-violet-300" />
        </>
      );
    case "panic":
      return (
        <div className="absolute inset-x-0 bottom-4 mx-auto h-24 w-24 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff4a8_0%,#ffce4d_70%,#ffad23_100%)] shadow-[0_18px_32px_rgba(255,190,70,0.24)]">
          <div className="absolute left-6 top-7 h-4 w-1.5 rotate-45 rounded-full bg-violet-900" />
          <div className="absolute left-[2.65rem] top-7 h-4 w-1.5 -rotate-45 rounded-full bg-violet-900" />
          <div className="absolute right-6 top-7 h-4 w-1.5 rotate-45 rounded-full bg-violet-900" />
          <div className="absolute right-[2.65rem] top-7 h-4 w-1.5 -rotate-45 rounded-full bg-violet-900" />
          <div className="absolute left-1/2 top-[3.45rem] h-7 w-7 -translate-x-1/2 rounded-full bg-fuchsia-600" />
        </div>
      );
    case "toilet":
      return (
        <>
          <div className="absolute bottom-4 right-4 text-[4.9rem] leading-none opacity-92">
            WC
          </div>
          <svg
            viewBox="0 0 72 30"
            className="absolute bottom-4 left-3 h-13 w-22 text-emerald-400/70"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M2 24 C11 24 18 18 25 19 C31 20 36 12 43 13 C50 14 57 9 70 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </>
      );
    case "gold":
      return (
        <div className="absolute bottom-4 right-4">
          <div className="grid translate-x-4 gap-1">
            <div className="h-5 w-11 rounded-[0.45rem] bg-[linear-gradient(180deg,#ffd86b_0%,#f0b735_100%)] shadow-[0_8px_16px_rgba(240,183,53,0.24)]" />
            <div className="ml-4 h-5 w-11 rounded-[0.45rem] bg-[linear-gradient(180deg,#ffd86b_0%,#eaa91c_100%)] shadow-[0_8px_16px_rgba(240,183,53,0.22)]" />
            <div className="-ml-2 h-5 w-11 rounded-[0.45rem] bg-[linear-gradient(180deg,#ffdf82_0%,#f2b321_100%)] shadow-[0_8px_16px_rgba(240,183,53,0.2)]" />
          </div>
        </div>
      );
    case "profile":
      return (
        <>
          <div className="absolute bottom-5 right-5 h-9 w-16 rounded-full bg-[radial-gradient(circle_at_30%_35%,#5a2bd9_0%,#3d2167_100%)] shadow-[0_12px_24px_rgba(90,43,217,0.22)]" />
          <div className="absolute bottom-5 right-17 h-9 w-16 rounded-full bg-[radial-gradient(circle_at_30%_35%,#5a2bd9_0%,#3d2167_100%)] shadow-[0_12px_24px_rgba(90,43,217,0.22)]" />
          <div className="absolute bottom-5 left-4 grid h-11 w-11 place-items-center rounded-full bg-zinc-950 text-white shadow-[0_10px_22px_rgba(24,24,27,0.16)]">
            <span className="text-[0.95rem] font-semibold leading-none">X</span>
          </div>
        </>
      );
    case "rocket":
      return (
        <>
          <div className="absolute bottom-5 right-7 h-11 w-24 rotate-[22deg] rounded-[999px] bg-[linear-gradient(180deg,#ffffff_0%,#efe8ff_100%)] shadow-[0_12px_26px_rgba(104,74,214,0.16)]" />
          <div className="absolute bottom-[3.35rem] right-3 h-0 w-0 rotate-[22deg] border-y-[0.9rem] border-l-[1.3rem] border-y-transparent border-l-violet-500" />
          <div className="absolute bottom-[2.4rem] right-[5.2rem] h-0 w-0 rotate-[18deg] border-r-[1rem] border-t-[0.7rem] border-r-violet-400 border-t-transparent" />
          <div className="absolute bottom-[1.85rem] right-[5.1rem] h-0 w-0 rotate-[18deg] border-r-[1rem] border-b-[0.7rem] border-r-violet-400 border-b-transparent" />
          <div className="absolute bottom-[2.85rem] right-[6.1rem] h-4.5 w-4.5 rounded-full border-2 border-violet-300 bg-white" />
          <div className="absolute bottom-[2.2rem] right-[7rem] h-4 w-10 -rotate-[18deg] rounded-full bg-[radial-gradient(circle_at_left,#ffd87d_0%,#ff9a1f_58%,rgba(255,154,31,0)_100%)] opacity-95 blur-[1px]" />
        </>
      );
    case "alarm":
      return (
        <>
          <div className="absolute bottom-5 right-6 h-20 w-20 rounded-[1.8rem] bg-[linear-gradient(180deg,#111827_0%,#1f2937_100%)] shadow-[0_14px_28px_rgba(24,24,27,0.14)]" />
          <div className="absolute bottom-11 right-12 h-8 w-8 rounded-full border-2 border-white/85" />
          <div className="absolute bottom-[4.45rem] right-[4.15rem] h-3.5 w-0.5 rounded-full bg-white" />
          <div className="absolute bottom-[4.05rem] right-[3.4rem] h-0.5 w-3 rounded-full bg-white" />
          <div className="absolute bottom-[5.65rem] right-[2.85rem] h-4 w-4 rounded-full bg-rose-400 shadow-[0_8px_18px_rgba(244,114,182,0.24)]" />
          <div className="absolute bottom-[4.8rem] right-[5.65rem] h-2.5 w-12 -rotate-12 rounded-full bg-emerald-300/85" />
        </>
      );
  }
}

function StoryCard({ story }: { story: PulseStory }) {
  const layoutClassName =
    story.size === "hero"
      ? "md:col-span-2 xl:col-span-1 xl:row-span-2 min-h-[18.5rem] sm:min-h-[21rem]"
      : story.size === "medium"
        ? "min-h-[14rem]"
        : "min-h-[10.8rem]";

  const toneClassName =
    story.tone === "night"
      ? "border-zinc-900/80 bg-[radial-gradient(circle_at_top_right,#221340_0%,#05070d_44%,#05070d_100%)] text-white"
      : story.tone === "blush"
        ? "border-fuchsia-100 bg-[linear-gradient(180deg,#fff3fb_0%,#ffeef8_100%)] text-zinc-950"
        : story.tone === "cream"
          ? "border-orange-100 bg-[linear-gradient(180deg,#fff7ef_0%,#fff4ea_100%)] text-zinc-950"
          : story.tone === "lilac"
            ? "border-violet-100 bg-[linear-gradient(180deg,#f8f2ff_0%,#f6f0ff_100%)] text-zinc-950"
            : story.tone === "sky"
              ? "border-sky-100 bg-[linear-gradient(180deg,#f4fbff_0%,#eef8ff_100%)] text-zinc-950"
              : story.tone === "ice"
                ? "border-slate-100 bg-[linear-gradient(180deg,#f6fbff_0%,#edf6ff_100%)] text-zinc-950"
                : story.tone === "violet"
                  ? "border-violet-100 bg-[linear-gradient(180deg,#f6f1ff_0%,#efe8ff_100%)] text-zinc-950"
                  : "border-emerald-100 bg-[linear-gradient(180deg,#f2fff9_0%,#ebfff5_100%)] text-zinc-950";

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.6rem] border p-4 shadow-[0_14px_34px_rgba(24,24,27,0.04)] ${layoutClassName} ${toneClassName}`}
    >
      <div className="relative z-10 flex h-full flex-col">
        <div
          className={`w-fit rounded-full px-2.5 py-1 text-[0.58rem] font-semibold tracking-[0.11em] uppercase ${
            story.tone === "night"
              ? "bg-[linear-gradient(180deg,#7f48ff_0%,#5a2bd9_100%)] text-white"
              : "bg-white/78 text-zinc-500"
          }`}
        >
          {story.eyebrow}
        </div>

        <h3
          className={`type-title mt-3 max-w-[16rem] font-semibold ${
            story.size === "hero" ? "text-[2rem]" : "text-[1.15rem]"
          }`}
        >
          {story.title}
        </h3>

        <p
          className={`mt-3 max-w-[14rem] ${
            story.tone === "night" ? "text-white/75" : "text-zinc-600"
          } ${story.size === "small" ? "text-[0.82rem] leading-5" : "text-[0.94rem] leading-5.5"}`}
        >
          {story.summary}
        </p>

        <div
          className={`mt-auto pt-8 text-[0.72rem] ${
            story.tone === "night" ? "text-white/55" : "text-zinc-400"
          }`}
        >
          {story.meta}
        </div>
      </div>

      <StoryVisual story={story} />
    </article>
  );
}

function TrendingSidebar() {
  return (
    <aside className="flex h-full flex-col rounded-[1.7rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] p-5 shadow-[0_14px_34px_rgba(24,24,27,0.04)]">
      <div className="flex items-center gap-2">
      <h3 className="type-display text-[1.65rem] font-semibold text-zinc-950">
        Trending Now
      </h3>
        <span className="text-[1rem] text-[var(--color-brand)]">+</span>
      </div>

      <div className="mt-5 grid gap-3">
        {pulseTrends.map((trend) => (
          <div
            key={trend.ticker}
            className="grid grid-cols-[1.2rem_minmax(0,1fr)_4.6rem_auto] items-center gap-3"
          >
            <div className="text-[1rem] font-semibold tracking-[-0.04em] text-zinc-900">
              {trend.rank}
            </div>

            <div className="flex min-w-0 items-center gap-2.5">
              <div
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-zinc-950 ${trend.iconClassName}`}
              >
                {trend.icon}
              </div>

              <div className="min-w-0">
                <div className="text-[0.86rem] font-semibold leading-none text-zinc-900">
                  {trend.ticker}
                </div>
              <div className="mt-1 truncate text-[0.72rem] leading-none text-[var(--color-text-ui-muted)]">
                  {trend.name}
                </div>
              </div>
            </div>

            <TrendSparkline trend={trend} />

            <div
              className={`text-[0.9rem] font-semibold tracking-[-0.03em] ${
                trend.tone === "positive" ? "text-emerald-500" : "text-rose-400"
              }`}
            >
              {trend.percent}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[color:var(--color-border-ui-subtle)] bg-[var(--color-surface-ui-muted)] px-4 text-[0.86rem] font-medium text-zinc-900 transition-colors hover:bg-[var(--color-brand-soft)]"
      >
        <span>See all trends</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 10h12" />
          <path d="m11.5 4.5 5 5-5 5" />
        </svg>
      </button>
    </aside>
  );
}

function SeeAllPulseButton() {
  return (
    <Link
      href={marketPulseFeedPath}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] px-5 text-[0.86rem] font-medium text-zinc-900 shadow-[0_10px_24px_rgba(24,24,27,0.04)] transition-colors hover:bg-[var(--color-brand-soft)]"
    >
      <span>See all pulse</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 10h12" />
        <path d="m11.5 4.5 5 5-5 5" />
      </svg>
    </Link>
  );
}

export function TodaysPulseSection() {
  return (
    <section className="relative z-10 -mt-6 pb-6 sm:-mt-8 sm:pb-7 lg:-mt-12 lg:pb-8">
      <div className="mx-auto max-w-[96rem] px-3 sm:px-7 lg:px-8">
        <div className="rounded-[2rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(250,247,255,0.94)_100%)] p-4 shadow-[0_24px_70px_rgba(24,24,27,0.06)] sm:p-6 lg:rounded-[2.25rem] lg:p-6">
          <div className="grid gap-4 xl:grid-cols-[15rem_minmax(0,1fr)_7rem] xl:items-start">
            <div className="flex items-start justify-between gap-3 xl:block">
              <h2 className="type-display text-[2rem] font-semibold text-zinc-950">
                Today&apos;s Pulse
              </h2>

              <div className="shrink-0 xl:hidden">
                <SortButton />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 xl:justify-center">
              {pulseCategories.map((category) => (
                <CategoryPill key={category.id} category={category} />
              ))}
            </div>

            <div className="hidden xl:justify-self-end xl:block">
              <SortButton />
            </div>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_18.5rem]">
            <div className="flex min-w-0 flex-col gap-4">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.34fr_0.9fr_0.9fr]">
                {pulseStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>

              <div className="flex justify-center">
                <SeeAllPulseButton />
              </div>
            </div>

            <TrendingSidebar />
          </div>
        </div>
      </div>
    </section>
  );
}
