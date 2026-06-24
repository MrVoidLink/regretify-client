"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mobileHeaderOverrides } from "@/features/calculator/data/assetSelection";
import { getAssetSelectionAssetBySlug } from "@/features/calculator/lib/assets";
import { productFlags } from "@/lib/productFlags";

type NavItem = {
  href: string;
  label: string;
  children?: Array<{
    href: string;
    label: string;
    summary?: string;
  }>;
};

const navItems: NavItem[] = [
  { href: "/", label: "Calculator" },
  ...(productFlags.marketPulseEnabled
    ? [{ href: "/market-pulse", label: "Market Pulse" }]
    : []),
  ...(productFlags.marketMovementEnabled
    ? [{ href: "/market-movement", label: "Market Movement" }]
    : []),
  ...(productFlags.assetsEnabled ? [{ href: "/assets", label: "Assets" }] : []),
];

function isNavItemActive(pathname: string | null, href: string) {
  if (!pathname) {
    return false;
  }

  if (href === "/") {
    const possibleAssetSlug = pathname.startsWith("/") ? pathname.slice(1) : "";

    return (
      pathname === "/" ||
      pathname.startsWith("/asset-selection") ||
      (!possibleAssetSlug.includes("/") &&
        getAssetSelectionAssetBySlug(possibleAssetSlug) !== null)
    );
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const pathname = usePathname();
  const possibleAssetSlug = pathname?.startsWith("/") ? pathname.slice(1) : "";
  const isAssetCalculatorRoute =
    Boolean(possibleAssetSlug) &&
    !possibleAssetSlug.includes("/") &&
    getAssetSelectionAssetBySlug(possibleAssetSlug) !== null;
  const mobileHeaderOverride =
    mobileHeaderOverrides.find((override) =>
      pathname?.startsWith(override.routePrefix),
    ) ??
    (isAssetCalculatorRoute
      ? {
          routePrefix: pathname ?? "",
          leadingHref: "/asset-selection",
          leadingLabel: "Back",
          compactBrand: true,
        }
      : null);
  const isTransparentHeaderRoute = pathname === "/";
  const isHeaderSolid =
    !isTransparentHeaderRoute || hasScrolledPastHero || isMobileMenuOpen;
  const isHeroHeaderTransparent = isTransparentHeaderRoute && !isHeaderSolid;
  const headerTextClass = "text-zinc-950";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isTransparentHeaderRoute) {
      return;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const updateHeaderSurface = () => {
      setHasScrolledPastHero(window.scrollY > 18);
    };

    window.addEventListener("scroll", updateHeaderSurface, { passive: true });
    const frameId = window.requestAnimationFrame(updateHeaderSurface);

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateHeaderSurface);
    };
  }, [isTransparentHeaderRoute]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-5 py-3 transition-[background-color,box-shadow,backdrop-filter] duration-300 sm:px-7 lg:px-10 ${
          isHeroHeaderTransparent
            ? "bg-transparent"
            : "bg-white/82 shadow-[0_1px_0_rgba(24,24,27,0.04)] backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto grid w-full max-w-[96rem] grid-cols-[1fr_auto_1fr] items-center">
          <Link
            href="/"
            className={`justify-self-start text-[1.42rem] font-bold tracking-[-0.028em] md:text-[1.65rem] lg:text-[1.95rem] ${
              headerTextClass
            } ${
              mobileHeaderOverride ? "hidden md:inline-block" : ""
            }`}
          >
            Regretify
            <span className="ml-0.5 align-top text-[0.74rem] text-[var(--color-brand)] md:text-[0.9rem]">
              .
            </span>
          </Link>

          {mobileHeaderOverride ? (
            <>
              <Link
                href={mobileHeaderOverride.leadingHref}
                className="inline-flex min-h-9 items-center gap-1.5 justify-self-start rounded-[0.8rem] px-0.5 text-[0.74rem] font-medium text-zinc-950 transition-opacity hover:opacity-70 md:hidden"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m11.5 4.5-5 5 5 5" />
                  <path d="M6.5 9.5h8" />
                </svg>
                <span>{mobileHeaderOverride.leadingLabel}</span>
              </Link>

              <Link
                href="/"
                className="text-[1.28rem] font-bold tracking-[-0.028em] text-zinc-950 md:hidden"
              >
                Regretify
                <span className="ml-0.5 align-top text-[0.68rem] text-[var(--color-brand)]">.</span>
              </Link>
            </>
          ) : null}

          <nav
            aria-label="Primary"
            className={`hidden items-center gap-6 text-[0.84rem] font-medium md:flex lg:gap-11 lg:text-[1rem] ${
              headerTextClass
            }`}
          >
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={`whitespace-nowrap pb-2 transition-colors ${
                    isNavItemActive(pathname, item.href)
                      ? headerTextClass
                      : "text-zinc-950 hover:opacity-65"
                  }`}
                >
                  {item.label}
                </Link>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[var(--color-brand)] transition-opacity ${
                    isNavItemActive(pathname, item.href) ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Open account menu"
            className={`hidden h-9 w-9 justify-self-end rounded-full text-[0.82rem] font-semibold transition-opacity hover:opacity-75 md:grid md:place-items-center ${
              isHeroHeaderTransparent
                ? "border border-zinc-950/10 bg-white/24 text-zinc-950 shadow-none backdrop-blur-sm"
                : "border border-zinc-950/10 bg-white text-zinc-950 shadow-[0_8px_24px_rgba(24,24,27,0.08)]"
            }`}
          >
            R
          </button>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className={`col-start-3 grid h-7 w-7 justify-self-end place-items-center transition-opacity hover:opacity-65 md:hidden ${
              headerTextClass
            }`}
          >
            <span className="relative block h-[13px] w-5" aria-hidden="true">
              <span
                className={`absolute inset-x-0 top-0 h-0.5 rounded-full bg-current transition-transform duration-300 ${
                  isMobileMenuOpen ? "translate-y-[5.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-current transition-transform duration-300 ${
                  isMobileMenuOpen ? "-translate-y-[5.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/16 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-x-4 top-[4.3rem] z-50 origin-top rounded-[1.75rem] border border-zinc-950/8 bg-white/94 p-3 shadow-[0_24px_70px_rgba(24,24,27,0.16)] backdrop-blur-xl transition-[opacity,transform] duration-300 md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-3 scale-[0.98] opacity-0"
        }`}
      >
        <nav aria-label="Mobile primary" className="grid gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex min-h-13 items-center justify-between rounded-2xl px-4 text-[1rem] font-medium transition-colors ${
                isNavItemActive(pathname, item.href)
                  ? "bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                  : "text-zinc-950 hover:bg-zinc-950/4"
              }`}
            >
              <span>{item.label}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-4 w-4 text-zinc-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m7 4 6 6-6 6" />
              </svg>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
