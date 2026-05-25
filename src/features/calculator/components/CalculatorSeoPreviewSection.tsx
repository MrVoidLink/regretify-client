const seoPreviewItems = [
  {
    title: "Historical what-if scenarios",
    description:
      "Regretify is designed around simple questions people actually ask: what if I bought earlier, how much would that position be worth now, and how big was the missed move?",
  },
  {
    title: "Market-first exploration",
    description:
      "Users start with a market, move into a specific asset, and then test a past decision. The experience is meant to stay understandable before it becomes dramatic.",
  },
  {
    title: "Built for shareable hindsight",
    description:
      "The final result is not only a number. It should feel sharp enough to screenshot, compare, and share without turning into financial-advice theater.",
  },
];

export function CalculatorSeoPreviewSection() {
  return (
    <section className="border-t border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,#fcfbff_0%,#f7f4ff_100%)]">
      <div className="mx-auto max-w-[96rem] px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">
            Crawlable Preview
          </p>
          <h2 className="type-display mt-4 text-3xl font-semibold text-zinc-950 sm:text-4xl">
            A simple placeholder content block for the homepage
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-ui-soft)] sm:text-lg sm:leading-8">
            This section is intentionally simple for now. Its job is to create
            real below-the-fold page content so the homepage is not only a hero
            surface. Later this can become permanent educational copy, product
            explanation, or structured SEO content around missed investment
            scenarios.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {seoPreviewItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(251,249,255,0.92)_100%)] px-6 py-6 shadow-[0_16px_40px_rgba(24,24,27,0.05)]"
            >
              <h3 className="type-title text-xl font-semibold text-zinc-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-ui-soft)] sm:text-[0.98rem]">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 max-w-3xl rounded-[2rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(249,246,255,0.94)_100%)] px-6 py-7 shadow-[0_16px_40px_rgba(24,24,27,0.05)] sm:px-8">
          <h3 className="type-title text-2xl font-semibold text-zinc-950">
            Why this exists on the page
          </h3>
          <p className="mt-4 text-base leading-7 text-[var(--color-text-ui-soft)]">
            Search-friendly pages need visible text, meaningful headings, and
            content that explains the product beyond a visual interaction. This
            placeholder section gives the homepage some real informational
            weight until the final content model is ready.
          </p>
        </div>
      </div>
    </section>
  );
}
