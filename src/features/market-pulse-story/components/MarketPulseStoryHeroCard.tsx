import type { MarketPulseStory } from "@/features/market-pulse-story/types";

const marketPulseStoryHeroImagePath = "/images/market-pulse-story/market-pulse-story-hero-v2.png";

function HeroPill({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "brand";
}) {
  return (
    <span
      className={`inline-flex min-h-10 items-center rounded-2xl px-3.5 text-[0.8rem] font-semibold shadow-[0_12px_28px_rgba(24,24,27,0.18)] ${
        tone === "brand"
          ? "bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] text-white"
          : "border border-white/12 bg-white text-zinc-950"
      }`}
    >
      {children}
    </span>
  );
}

export function MarketPulseStoryHeroCard({ story }: { story: MarketPulseStory }) {
  const storyHeroImageSrc = story.storyHeroImageSrc ?? marketPulseStoryHeroImagePath;

  return (
    <section className="overflow-hidden rounded-[2rem] border border-violet-200/40 bg-[#11143d] shadow-[0_30px_70px_rgba(36,27,89,0.18)]">
      <div className="relative min-h-[17.5rem] overflow-hidden sm:min-h-[23rem] lg:min-h-[25rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(116,88,255,0.34)_0%,rgba(116,88,255,0.08)_28%,rgba(17,20,61,0)_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#11143d_0%,rgba(17,20,61,0.98)_36%,rgba(17,20,61,0.42)_60%,rgba(17,20,61,0)_78%)] sm:bg-[linear-gradient(90deg,#11143d_0%,rgba(17,20,61,0.94)_32%,rgba(17,20,61,0.2)_56%,rgba(17,20,61,0)_72%)]" />
        <div className="absolute inset-y-0 right-0 w-full sm:w-[72%] lg:w-[62%]">
          <img
            src={storyHeroImageSrc}
            alt={`${story.title} hero artwork`}
            className="h-full w-full object-cover object-[84%_center] sm:object-[72%_center] lg:object-[78%_center]"
          />
        </div>

        <div className="relative z-10 flex h-full flex-col px-4 py-4 sm:px-6 sm:py-5 lg:px-7 lg:py-6">
          <div className="flex items-start justify-between gap-3">
            <HeroPill>{story.badge}</HeroPill>
            <HeroPill tone="brand">{story.category}</HeroPill>
          </div>

          <div className="mt-auto max-w-[11.5rem] pb-1 pt-7 sm:max-w-[24rem] sm:pt-12 lg:max-w-[32rem] lg:pb-2">
            <h1 className="type-display text-[1.45rem] font-semibold text-white sm:text-[2.7rem] lg:max-w-[30rem] lg:text-[3.55rem]">
              {story.title}
            </h1>
            <p className="mt-3 max-w-[10.25rem] text-[0.72rem] leading-5 text-white/82 sm:mt-4 sm:max-w-[21rem] sm:text-[1.04rem] lg:max-w-[26rem] lg:text-[1.08rem] lg:leading-8">
              {story.excerpt}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
