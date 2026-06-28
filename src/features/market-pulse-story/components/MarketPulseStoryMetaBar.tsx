"use client";

import { useState } from "react";
import type { MarketPulseStory } from "@/features/market-pulse-story/types";

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
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 16.4 3.9 10.7a3.9 3.9 0 0 1 5.5-5.6L10 5.7l.6-.6a3.9 3.9 0 0 1 5.5 5.6Z" />
    </svg>
  );
}

function SaveIcon({ isSaved = false }: { isSaved?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill={isSaved ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 3.5h9v13l-4.5-2.8-4.5 2.8Z" />
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

function StoryMetric({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.84rem] text-[var(--color-text-ui-muted)]">
      <EyeIcon />
      <span>{label}</span>
    </span>
  );
}

function StoryLikeButton({ label }: { label: string }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <button
      type="button"
      aria-label={isLiked ? "Unlike story" : "Like story"}
      aria-pressed={isLiked}
      onClick={() => setIsLiked((current) => !current)}
      className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-[0.84rem] font-medium transition-colors ${
        isLiked
          ? "border-rose-200 bg-rose-50 text-rose-600"
          : "border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] text-[var(--color-text-ui-soft)] hover:bg-rose-50 hover:text-rose-500"
      }`}
    >
      <LikeIcon />
      <span>{label}</span>
    </button>
  );
}

function StorySaveButton() {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <button
      type="button"
      aria-label={isSaved ? "Remove saved story" : "Save story"}
      aria-pressed={isSaved}
      onClick={() => setIsSaved((current) => !current)}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
        isSaved
          ? "border-[color:var(--color-brand-border)] bg-[linear-gradient(180deg,var(--color-brand-soft)_0%,var(--color-brand-soft-strong)_100%)] text-[var(--color-brand-strong)]"
          : "border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] text-[var(--color-text-ui-soft)] hover:bg-[var(--color-brand-soft)]"
      }`}
    >
      <SaveIcon isSaved={isSaved} />
    </button>
  );
}

export function MarketPulseStoryMetaBar({
  story,
}: {
  story: MarketPulseStory;
}) {
  const author = story.author;
  const authorInitials = author.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <section className="rounded-b-[2rem] border border-t-0 border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] px-5 py-4 shadow-[0_16px_40px_rgba(24,24,27,0.06)] sm:px-7 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-13 w-13 shrink-0 overflow-hidden rounded-full shadow-[0_10px_24px_rgba(24,24,27,0.12)]">
            {author.avatarSrc ? (
              <img
                src={author.avatarSrc}
                alt={`${author.name} avatar`}
                className="h-full w-full bg-white object-cover object-top"
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-[linear-gradient(180deg,var(--color-brand-soft)_0%,var(--color-brand-soft-strong)_100%)] text-[1rem] font-semibold text-[var(--color-brand-strong)]">
                {authorInitials || "R"}
              </div>
            )}
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
          <StoryMetric label={`${story.metrics.views} views`} />
          <StoryLikeButton label={story.metrics.likes} />
          <StorySaveButton />
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
