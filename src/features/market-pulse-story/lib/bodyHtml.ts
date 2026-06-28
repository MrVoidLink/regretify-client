import type { MarketPulseStoryOutlineLink } from "@/features/market-pulse-story/types";

function stripHtmlTags(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function extractOutlineLinksFromBodyHtml(bodyHtml: string): MarketPulseStoryOutlineLink[] {
  const headingRegex = /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi;
  const links: MarketPulseStoryOutlineLink[] = [{ href: "#story-overview", label: "Market overview" }];
  const usedHrefs = new Set(links.map((link) => link.href));

  for (const match of bodyHtml.matchAll(headingRegex)) {
    const label = stripHtmlTags(match[1] ?? "");

    if (!label) {
      continue;
    }

    let href = `#${slugifyHeading(label) || "story-section"}`;
    let suffix = 2;

    while (usedHrefs.has(href)) {
      href = `#${slugifyHeading(label) || "story-section"}-${suffix}`;
      suffix += 1;
    }

    usedHrefs.add(href);
    links.push({ href, label });
  }

  return links;
}

export function decorateBodyHtmlWithHeadingIds(bodyHtml: string) {
  const usedIds = new Set<string>();

  return bodyHtml.replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi, (_match, attrs, innerHtml) => {
    const label = stripHtmlTags(innerHtml ?? "");
    const baseId = slugifyHeading(label) || "story-section";
    let nextId = baseId;
    let suffix = 2;

    while (usedIds.has(nextId)) {
      nextId = `${baseId}-${suffix}`;
      suffix += 1;
    }

    usedIds.add(nextId);

    if (/\sid\s*=/i.test(attrs)) {
      return `<h2${attrs}>${innerHtml}</h2>`;
    }

    return `<h2${attrs} id="${nextId}">${innerHtml}</h2>`;
  });
}
