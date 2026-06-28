import type {
  MarketFeedArticleBadge,
  MarketFeedArticleCard,
  MarketFeedCardTone,
  MarketFeedCategoryId,
} from "@/features/market-feed/types";
import type { MarketPulseStory, MarketPulseStoryAuthor } from "@/features/market-pulse-story/types";

export const MARKET_PULSE_PAGE_SIZE = 12;
const defaultStoryHeroImagePath = "/images/market-pulse-story/market-pulse-story-hero-v2.png";
const defaultAuthorAvatarPath = "/images/market-pulse-story/market-pulse-story-author-avatar-v2.png";

type PublicMarketPulsePost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  badge: string;
  accent: string;
  summaryHeading: string;
  bodyHtml: string;
  tags: string;
  feedHeroAssetKey: string | null;
  storyHeroAssetKey: string | null;
  viewsCount: number;
  likesCount: number;
  author: {
    username: string;
    displayName: string;
    authorRole: string;
    avatarAssetKey: string | null;
  };
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type MarketPulseFeedResponse = {
  items: PublicMarketPulsePost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  summary: {
    total: number;
    byBadge: Record<string, number>;
    byCategory: Record<string, number>;
  };
};

function getCoreApiBaseUrl() {
  const value =
    process.env.CORE_API_BASE_URL?.trim() ??
    process.env.NEXT_PUBLIC_CORE_API_BASE_URL?.trim();

  if (!value) {
    throw new Error("Missing required env: CORE_API_BASE_URL");
  }

  const normalized = value.replace(/\/$/, "");

  if (normalized.endsWith("/api")) {
    return normalized;
  }

  return `${normalized}/api`;
}

function normalizeCategoryLabel(input: string) {
  const value = input.trim();
  return value || "Market";
}

function normalizeBadge(input: string): MarketFeedArticleBadge {
  switch (input.trim().toLowerCase()) {
    case "breaking":
      return "Breaking";
    case "trending":
      return "Trending";
    case "most talked":
      return "Most Talked";
    case "funniest":
      return "Funniest";
    case "biggest moves":
      return "Biggest Moves";
    case "weirdest":
      return "Weirdest";
    default:
      return "Trending";
  }
}

function mapToneFromPost(post: PublicMarketPulsePost): MarketFeedCardTone {
  const seed = `${post.category}:${post.badge}`.toLowerCase();

  if (seed.includes("breaking")) return "midnight";
  if (seed.includes("funniest") || seed.includes("meme")) return "rose";
  if (seed.includes("most talked")) return "crimson";
  if (seed.includes("biggest")) return "emerald";
  if (seed.includes("weird")) return "teal";
  if (seed.includes("stock")) return "amber";
  if (seed.includes("tech")) return "sky";
  if (seed.includes("macro")) return "sunset";

  return "midnight";
}

function formatCompactMetric(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatRelativePublishedAt(value: string | null) {
  if (!value) {
    return "Just now";
  }

  const now = Date.now();
  const publishedAt = new Date(value).getTime();
  const diffHours = Math.max(0, Math.round((now - publishedAt) / (1000 * 60 * 60)));

  if (diffHours < 1) {
    return "Just now";
  }

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.round(diffHours / 24);

  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function formatPublishedAtLabel(value: string | null) {
  const date = value ? new Date(value) : new Date();

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function toAbsoluteAssetUrl(assetKey: string | null) {
  if (!assetKey?.trim()) {
    return null;
  }

  if (/^https?:\/\//i.test(assetKey)) {
    return assetKey;
  }

  return `${getCoreApiBaseUrl()}/${assetKey.replace(/^\/+/, "")}`;
}

function normalizeTags(tags: string) {
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function toMarketFeedArticleCard(
  post: PublicMarketPulsePost,
): MarketFeedArticleCard {
  return {
    kind: "article",
    id: post.id,
    slug: post.slug,
    badge: normalizeBadge(post.badge),
    title: post.title,
    excerpt: post.excerpt,
    category: normalizeCategoryLabel(post.category),
    timeAgo: formatRelativePublishedAt(post.publishedAt),
    metrics: {
      views: formatCompactMetric(post.viewsCount),
      likes: formatCompactMetric(post.likesCount),
    },
    accent: post.accent?.trim() || undefined,
    tone: mapToneFromPost(post),
  };
}

function toMarketPulseStoryAuthor(post: PublicMarketPulsePost): MarketPulseStoryAuthor {
  return {
    name: post.author.displayName,
    username: post.author.username,
    role: post.author.authorRole,
    avatarSrc: toAbsoluteAssetUrl(post.author.avatarAssetKey) ?? defaultAuthorAvatarPath,
    publishedAtLabel: formatPublishedAtLabel(post.publishedAt),
    publishedAtIso: post.publishedAt ?? post.createdAt,
  };
}

export function toMarketPulseStory(post: PublicMarketPulsePost): MarketPulseStory {
  const feedCard = toMarketFeedArticleCard(post);

  return {
    ...feedCard,
    summaryHeading: post.summaryHeading,
    bodyHtml: post.bodyHtml,
    tags: normalizeTags(post.tags),
    feedHeroImageSrc: toAbsoluteAssetUrl(post.feedHeroAssetKey),
    storyHeroImageSrc: toAbsoluteAssetUrl(post.storyHeroAssetKey) ?? defaultStoryHeroImagePath,
    author: toMarketPulseStoryAuthor(post),
  };
}

async function requestJson<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${getCoreApiBaseUrl()}${path}`, {
    ...init,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Market Pulse request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}

export async function fetchMarketPulseFeed(params?: {
  page?: number;
  limit?: number;
  category?: MarketFeedCategoryId;
}) {
  const query = new URLSearchParams();

  query.set("page", String(params?.page ?? 1));
  query.set("limit", String(params?.limit ?? MARKET_PULSE_PAGE_SIZE));

  if (params?.category && params.category !== "all") {
    query.set("category", params.category);
  }

  return requestJson<MarketPulseFeedResponse>(
    `/market-pulse/posts?${query.toString()}`,
  );
}

export async function fetchMarketPulseFeedThroughPage(
  page: number,
  category: MarketFeedCategoryId,
) {
  const firstPageResponse = await fetchMarketPulseFeed({
    page: 1,
    limit: MARKET_PULSE_PAGE_SIZE,
    category,
  });

  const effectivePage = Math.min(page, firstPageResponse.pagination.totalPages);

  if (effectivePage <= 1) {
    return {
      items: firstPageResponse.items,
      totalPages: firstPageResponse.pagination.totalPages,
      summary: firstPageResponse.summary,
    };
  }

  const pageNumbers = Array.from({ length: effectivePage - 1 }, (_, index) => index + 2);
  const remainingResponses = await Promise.all(
    pageNumbers.map((pageNumber) =>
      fetchMarketPulseFeed({
        page: pageNumber,
        limit: MARKET_PULSE_PAGE_SIZE,
        category,
      }),
    ),
  );

  return {
    items: [
      ...firstPageResponse.items,
      ...remainingResponses.flatMap((response) => response.items),
    ],
    totalPages: firstPageResponse.pagination.totalPages,
    summary: firstPageResponse.summary,
  };
}

export async function fetchMarketPulseStory(slug: string) {
  return requestJson<PublicMarketPulsePost>(
    `/market-pulse/posts/${encodeURIComponent(slug)}`,
  );
}
