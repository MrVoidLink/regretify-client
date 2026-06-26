import type { Metadata } from "next";
import { getMarketPulseStoryPath, marketPulsePath } from "@/features/market-pulse/lib/routes";
import { marketPulseStoryBodyContent } from "@/features/market-pulse-story/data/storyPageBodyContent";
import { marketPulseStoryTopContent } from "@/features/market-pulse-story/data/storyPageTopContent";
import type { MarketPulseStory } from "@/features/market-pulse-story/types";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

function toAbsoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}

function parseCompactMetric(value: string) {
  const normalized = value.trim().toUpperCase();

  if (normalized.endsWith("K")) {
    return Math.round(Number.parseFloat(normalized.slice(0, -1)) * 1000);
  }

  return Math.round(Number.parseFloat(normalized.replace(/,/g, "")) || 0);
}

function buildStoryDescription(story: MarketPulseStory) {
  const description = `${story.excerpt} ${marketPulseStoryBodyContent.summaryHeading}`;

  if (description.length <= 160) {
    return description;
  }

  return `${description.slice(0, 157).trimEnd()}...`;
}

function buildStoryKeywords(story: MarketPulseStory) {
  return [
    story.category,
    story.badge,
    ...marketPulseStoryBodyContent.tags.map((tag) => tag.replace(/^#/, "")),
  ];
}

function buildStoryWordCount() {
  const segments = [
    ...marketPulseStoryBodyContent.introParagraphs,
    marketPulseStoryBodyContent.quote.text,
    ...marketPulseStoryBodyContent.breakdown.points,
    ...marketPulseStoryBodyContent.analysis.paragraphs,
    ...marketPulseStoryBodyContent.takeaways.items,
    marketPulseStoryBodyContent.cta.description,
  ];

  return segments.join(" ").trim().split(/\s+/).length;
}

export function buildMarketPulseStoryMetadata(story: MarketPulseStory): Metadata {
  const author = marketPulseStoryTopContent.author;
  const canonical = toAbsoluteUrl(getMarketPulseStoryPath(story.slug));
  const description = buildStoryDescription(story);
  const heroImageUrl = toAbsoluteUrl(
    "/images/market-pulse-story/market-pulse-story-hero-v2.png",
  );

  return {
    title: `${story.title} | Regretify`,
    description,
    keywords: buildStoryKeywords(story),
    authors: [{ name: author.name }],
    category: story.category,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title: story.title,
      description,
      siteName: "Regretify",
      publishedTime: author.publishedAtIso,
      authors: [author.name],
      section: story.category,
      tags: buildStoryKeywords(story),
      images: [
        {
          url: heroImageUrl,
          width: 1600,
          height: 900,
          alt: `${story.title} hero artwork`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description,
      images: [heroImageUrl],
    },
  };
}

export function buildMarketPulseStoryJsonLd(story: MarketPulseStory) {
  const author = marketPulseStoryTopContent.author;
  const canonical = toAbsoluteUrl(getMarketPulseStoryPath(story.slug));
  const heroImageUrl = toAbsoluteUrl(
    "/images/market-pulse-story/market-pulse-story-hero-v2.png",
  );
  const description = buildStoryDescription(story);
  const keywords = buildStoryKeywords(story);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Market Pulse",
            item: toAbsoluteUrl(marketPulsePath),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: story.title,
            item: canonical,
          },
        ],
      },
      {
        "@type": "NewsArticle",
        mainEntityOfPage: canonical,
        headline: story.title,
        description,
        image: [heroImageUrl],
        datePublished: author.publishedAtIso,
        dateModified: author.publishedAtIso,
        articleSection: story.category,
        keywords,
        wordCount: buildStoryWordCount(),
        author: {
          "@type": "Organization",
          name: author.name,
          description: author.role,
        },
        publisher: {
          "@type": "Organization",
          name: "Regretify",
        },
        interactionStatistic: [
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/ViewAction",
            userInteractionCount: parseCompactMetric(story.metrics.views),
          },
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/LikeAction",
            userInteractionCount: parseCompactMetric(story.metrics.likes),
          },
        ],
      },
    ],
  };
}
