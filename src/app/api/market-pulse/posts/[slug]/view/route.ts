import { NextResponse } from "next/server";

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

export async function POST(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;

  try {
    const response = await fetch(
      `${getCoreApiBaseUrl()}/market-pulse/posts/${encodeURIComponent(slug)}/views`,
      {
        method: "POST",
        cache: "no-store",
      },
    );

    const payload = await response.json().catch(() => ({ error: "Request failed" }));
    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Could not record Market Pulse view.",
      },
      { status: 500 },
    );
  }
}
