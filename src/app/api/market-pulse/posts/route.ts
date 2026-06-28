import { NextResponse } from "next/server";
import { fetchMarketPulseFeed } from "@/features/market-pulse/lib/publicApi";
import type { MarketFeedCategoryId } from "@/features/market-feed/types";

function toPositiveInteger(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const payload = await fetchMarketPulseFeed({
      page: toPositiveInteger(searchParams.get("page"), 1),
      limit: toPositiveInteger(searchParams.get("limit"), 12),
      category: (searchParams.get("category") ?? "all") as MarketFeedCategoryId,
    });

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Could not load Market Pulse posts.",
      },
      { status: 500 },
    );
  }
}
