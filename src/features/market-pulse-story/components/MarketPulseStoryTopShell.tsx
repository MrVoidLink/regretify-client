import Link from "next/link";
import { marketPulseFeedPath } from "@/features/market-pulse/lib/routes";
import { marketPulseStorySponsorCard } from "@/features/market-pulse-story/data/storySponsorCard";
import { MarketPulseStoryHeroCard } from "@/features/market-pulse-story/components/MarketPulseStoryHeroCard";
import { MarketPulseStoryMetaBar } from "@/features/market-pulse-story/components/MarketPulseStoryMetaBar";
import { MarketPulseStorySponsoredCard } from "@/features/market-pulse-story/components/MarketPulseStorySponsoredCard";
import type { MarketPulseStory } from "@/features/market-pulse-story/types";

function BackArrowIcon() {
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
      <path d="M11.5 5.5 7 10l4.5 4.5" />
      <path d="M7.5 10h7.5" />
    </svg>
  );
}

export function MarketPulseStoryTopShell({ story }: { story: MarketPulseStory }) {
  return (
    <section className="space-y-3 lg:space-y-4">
      <Link
        href={marketPulseFeedPath}
        className="inline-flex min-h-8 items-center gap-2 py-0.5 text-[0.92rem] font-semibold text-[var(--color-brand)] transition-colors hover:text-[var(--color-brand-strong)]"
      >
        <BackArrowIcon />
        <span>Back to Pulse</span>
      </Link>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-stretch">
        <div>
          <MarketPulseStoryHeroCard story={story} />
          <MarketPulseStoryMetaBar story={story} />
        </div>

        <MarketPulseStorySponsoredCard sponsorCard={marketPulseStorySponsorCard} />
      </div>
    </section>
  );
}
