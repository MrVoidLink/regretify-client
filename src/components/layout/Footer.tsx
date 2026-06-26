import Link from "next/link";
import { assetSelectionAssets } from "@/features/calculator/data/assetSelection";
import { getAssetRoute } from "@/features/calculator/lib/assets";
import { getMarketPulseCategoryPath } from "@/features/market-pulse/lib/routes";
import { productFlags } from "@/lib/productFlags";

const primaryLinks = [
  { href: "/", label: "Calculator" },
  { href: "/market-pulse", label: "Market Pulse" },
  ...(productFlags.assetsEnabled ? [{ href: "/assets", label: "Assets" }] : []),
  ...(productFlags.marketMovementEnabled
    ? [{ href: "/market-movement", label: "Market Movement" }]
    : []),
];

const marketPulseQuickLinks = [
  "crypto",
  "stocks",
  "memes",
  "macro",
  "people",
  "tech",
  "defi",
] as const;

function formatQuickLinkLabel(label: (typeof marketPulseQuickLinks)[number]) {
  return label === "defi" ? "DeFi" : `${label.charAt(0).toUpperCase()}${label.slice(1)}`;
}

const calculatorQuickAssets = assetSelectionAssets.slice(0, 8);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,#111827_0%,#09090b_100%)] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8rem] top-10 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(111,67,255,0.28)_0%,rgba(111,67,255,0)_72%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-6rem] right-[-5rem] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_70%)] blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-[96rem] flex-col gap-8 px-5 py-10 sm:px-7 sm:py-12 lg:px-10 lg:py-14">
        <section className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[34rem]">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-border)]">
                Regret Calculator
              </p>
              <h2 className="type-display mt-3 text-[1.9rem] font-semibold tracking-[-0.05em] text-white sm:text-[2.45rem]">
                Missed the move? Quantify the damage.
              </h2>
              <p className="mt-3 max-w-[30rem] text-[0.95rem] leading-7 text-white/70 sm:text-[1rem]">
                Regretify turns a past investment moment into a clean, shareable
                hindsight result without pretending to be financial advice.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-[1rem] bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] px-5 text-[0.92rem] font-semibold text-white shadow-[0_16px_34px_rgba(111,67,255,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Open Calculator
              </Link>
              <Link
                href="/market-pulse"
                className="inline-flex min-h-12 items-center justify-center rounded-[1rem] border border-white/12 bg-white/7 px-5 text-[0.92rem] font-semibold text-white/88 transition-colors duration-200 hover:bg-white/12 hover:text-white"
              >
                Read Market Pulse
              </Link>
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.65fr)_minmax(0,0.8fr)_minmax(0,0.85fr)]">
          <section className="max-w-[30rem]">
            <Link
              href="/"
              className="inline-flex items-end text-[1.8rem] font-bold tracking-[-0.04em] text-white transition-opacity hover:opacity-85"
            >
              Regretify
              <span className="ml-0.5 align-top text-[0.82rem] text-[var(--color-brand)]">
                .
              </span>
            </Link>
            <p className="mt-4 text-[0.96rem] leading-7 text-white/66">
              A regret-first investing experience for missed upside, historical
              scenarios, and emotionally legible numbers.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <span className="rounded-full border border-white/10 bg-white/7 px-3 py-1.5 text-[0.74rem] font-medium text-white/76">
                Historical what-if
              </span>
              <span className="rounded-full border border-white/10 bg-white/7 px-3 py-1.5 text-[0.74rem] font-medium text-white/76">
                Shareable hindsight
              </span>
              <span className="rounded-full border border-white/10 bg-white/7 px-3 py-1.5 text-[0.74rem] font-medium text-white/76">
                Not financial advice
              </span>
            </div>
          </section>

          <nav aria-label="Footer primary" className="grid gap-3">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white/46">
              Explore
            </p>
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-[0.95rem] text-white/76 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Market Pulse quick access" className="grid gap-3">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white/46">
              Market Pulse
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {marketPulseQuickLinks.map((category) => (
                <Link
                  key={category}
                  href={getMarketPulseCategoryPath(category)}
                  className="w-fit text-[0.95rem] text-white/76 transition-colors hover:text-white"
                >
                  {formatQuickLinkLabel(category)}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Calculator quick access" className="grid gap-3">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white/46">
              Quick Calculate
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {calculatorQuickAssets.map((asset) => (
                <Link
                  key={asset.ticker}
                  href={getAssetRoute(asset)}
                  className="w-fit text-[0.95rem] text-white/76 transition-colors hover:text-white"
                >
                  {asset.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/8 pt-5 text-[0.8rem] text-white/48 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Regretify. Historical comparison, education, and entertainment.</p>
          <p>Built for clear scenarios, strong visuals, and crawlable product pages.</p>
        </div>
      </div>
    </footer>
  );
}
