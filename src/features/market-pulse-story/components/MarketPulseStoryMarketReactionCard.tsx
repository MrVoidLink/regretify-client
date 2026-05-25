import type { MarketPulseStoryMarketReaction } from "@/features/market-pulse-story/types";

function ArrowRightIcon() {
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
      <path d="M4 10h11.5" />
      <path d="m11 4.5 5 5.5-5 5.5" />
    </svg>
  );
}

function CoinIcon({ coin }: { coin: MarketPulseStoryMarketReaction["coin"] }) {
  if (coin === "btc") {
    return (
      <div className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(180deg,#ffb248_0%,#ff8a00_100%)] text-sm font-bold text-white shadow-[0_10px_18px_rgba(255,138,0,0.26)]">
        B
      </div>
    );
  }

  if (coin === "eth") {
    return (
      <div className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(180deg,#111827_0%,#334155_100%)] text-sm font-bold text-white shadow-[0_10px_18px_rgba(15,23,42,0.18)]">
        E
      </div>
    );
  }

  return (
    <div className="grid h-11 w-11 place-items-center rounded-full bg-zinc-950 shadow-[0_10px_18px_rgba(24,24,27,0.18)]">
      <div className="grid gap-1">
        <span className="block h-1.5 w-5 rounded-full bg-emerald-300" />
        <span className="block h-1.5 w-5 rounded-full bg-violet-300" />
        <span className="block h-1.5 w-5 rounded-full bg-emerald-300" />
      </div>
    </div>
  );
}

function MarketReactionItem({ item }: { item: MarketPulseStoryMarketReaction }) {
  return (
    <div className="flex items-center justify-between gap-3 py-4">
      <div className="flex items-center gap-3">
        <CoinIcon coin={item.coin} />
        <p className="text-[1.08rem] font-semibold tracking-[-0.03em] text-zinc-950">{item.symbol}</p>
      </div>

      <div className="text-right">
        <p className="text-[1rem] font-semibold tracking-[-0.03em] text-zinc-950">{item.priceLabel}</p>
        <p
          className={`mt-0.5 text-[0.94rem] font-semibold ${
            item.tone === "positive" ? "text-emerald-600" : "text-rose-500"
          }`}
        >
          {item.changeLabel}
        </p>
      </div>
    </div>
  );
}

export function MarketPulseStoryMarketReactionCard({
  items,
}: {
  items: MarketPulseStoryMarketReaction[];
}) {
  return (
    <aside className="rounded-[1.8rem] border border-zinc-200/80 bg-white p-5 shadow-[0_18px_48px_rgba(24,24,27,0.06)] sm:p-6">
      <h2 className="text-[1.55rem] font-semibold tracking-[-0.05em] text-zinc-950">
        Market Reaction
      </h2>

      <div className="mt-4 divide-y divide-zinc-200/80">
        {items.map((item) => (
          <MarketReactionItem key={item.id} item={item} />
        ))}
      </div>

      <button
        type="button"
        className="mt-5 inline-flex min-h-11 items-center gap-2 text-[1rem] font-semibold text-violet-600 transition-colors hover:text-violet-700"
      >
        <span>View more markets</span>
        <ArrowRightIcon />
      </button>
    </aside>
  );
}
