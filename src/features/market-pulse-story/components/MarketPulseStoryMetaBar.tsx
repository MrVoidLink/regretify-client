import Image from "next/image";
import type { MarketPulseStory, MarketPulseStoryAuthor } from "@/features/market-pulse-story/types";

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.2 10s2.8-4.5 7.8-4.5 7.8 4.5 7.8 4.5-2.8 4.5-7.8 4.5S2.2 10 2.2 10Z" />
      <circle cx="10" cy="10" r="2.1" />
    </svg>
  );
}

function LikeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 16.4 3.9 10.7a3.9 3.9 0 0 1 5.5-5.6L10 5.7l.6-.6a3.9 3.9 0 0 1 5.5 5.6Z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.5 4.8a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" />
      <path d="M4.5 11.8a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" />
      <path d="M14.5 19.8a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" />
      <path d="m6.5 8.6 4.1-2.2" />
      <path d="m6.5 10.4 6 3.2" />
    </svg>
  );
}

function VerifiedDot() {
  return <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]" aria-hidden="true" />;
}

function StoryMetric({
  icon,
  label,
}: {
  icon: "views" | "likes";
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.84rem] text-[var(--color-text-ui-muted)]">
      {icon === "views" ? <EyeIcon /> : <LikeIcon />}
      <span>{label}</span>
    </span>
  );
}

export function MarketPulseStoryMetaBar({
  author,
  story,
  viewsLabel,
}: {
  author: MarketPulseStoryAuthor;
  story: MarketPulseStory;
  viewsLabel: string;
}) {
  return (
    <section className="rounded-b-[2rem] border border-t-0 border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] px-5 py-4 shadow-[0_16px_40px_rgba(24,24,27,0.06)] sm:px-7 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-13 w-13 shrink-0 overflow-hidden rounded-full shadow-[0_10px_24px_rgba(24,24,27,0.12)]">
            <Image
              src={author.avatarSrc}
              alt={`${author.name} avatar`}
              fill
              className="bg-white object-cover object-top"
              sizes="52px"
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="type-title text-[1rem] font-semibold text-zinc-950">
                {author.name}
              </p>
              <VerifiedDot />
            </div>
            <p className="mt-0.5 max-w-[20rem] text-[0.82rem] leading-5 text-[var(--color-text-ui-soft)]">
              {author.role}
            </p>
            <time
              dateTime={author.publishedAtIso}
              className="mt-0.5 block text-[0.84rem] text-[var(--color-text-ui-muted)]"
            >
              {author.publishedAtLabel}
            </time>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <StoryMetric icon="views" label={`${viewsLabel} views`} />
          <StoryMetric icon="likes" label={story.metrics.likes} />
          <button
            type="button"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] px-4 text-[0.85rem] font-medium text-[var(--color-text-ui-soft)] shadow-[0_8px_20px_rgba(24,24,27,0.04)] transition-colors hover:bg-[var(--color-brand-soft)]"
          >
            <ShareIcon />
            <span>Share</span>
          </button>
        </div>
      </div>
    </section>
  );
}
