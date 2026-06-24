const storytellingSteps = [
  {
    step: "01",
    eyebrow: "Signal appears",
    title: "The move never feels legendary at the start.",
    description:
      "It begins as a small breakout, a strange meme, or a quiet price jump that does not yet look historic.",
    sideNote: "You notice it. You do not act yet.",
    cardClassName:
      "border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(250,247,255,0.94)_100%)]",
    glowClassName: "bg-[radial-gradient(circle_at_top_left,rgba(111,67,255,0.16)_0%,rgba(255,255,255,0)_48%)]",
    offsetClassName: "lg:ml-0",
  },
  {
    step: "02",
    eyebrow: "Delay sets in",
    title: "Waiting for confirmation quietly becomes the whole mistake.",
    description:
      "One more candle. One more dip. One more day. The market keeps moving while the decision keeps slipping.",
    sideNote: "Regret usually starts as hesitation, not ignorance.",
    cardClassName:
      "border-zinc-950/10 bg-[linear-gradient(180deg,#151426_0%,#24164c_50%,#120f1e_100%)] text-white",
    glowClassName: "bg-[radial-gradient(circle_at_80%_20%,rgba(125,211,252,0.2)_0%,rgba(0,0,0,0)_38%)]",
    offsetClassName: "lg:ml-16",
  },
  {
    step: "03",
    eyebrow: "The number lands",
    title: "Now the miss needs a number, not another feeling.",
    description:
      "Regretify turns the asset, amount, and date range into one clean result you can actually look at.",
    sideNote: "This is where hindsight becomes measurable.",
    cardClassName:
      "border-[color:var(--color-brand-border)] bg-[linear-gradient(180deg,rgba(247,242,255,0.98)_0%,rgba(255,255,255,0.96)_100%)]",
    glowClassName: "bg-[radial-gradient(circle_at_22%_22%,rgba(16,185,129,0.16)_0%,rgba(255,255,255,0)_44%)]",
    offsetClassName: "lg:ml-6",
  },
  {
    step: "04",
    eyebrow: "The payoff",
    title: "The final output is a poster, because emotion spreads better than spreadsheets.",
    description:
      "The result should feel sharp enough to share, memorable enough to sting, and simple enough to understand instantly.",
    sideNote: "One scenario. One visual. One painful takeaway.",
    cardClassName:
      "border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,252,252,0.98)_0%,rgba(255,245,248,0.94)_100%)]",
    glowClassName: "bg-[radial-gradient(circle_at_78%_18%,rgba(251,113,133,0.18)_0%,rgba(255,255,255,0)_40%)]",
    offsetClassName: "lg:ml-20",
  },
];

const stickyMilestones = [
  "Catch the signal",
  "Feel the delay",
  "Measure the cost",
  "Share the poster",
];

export function CalculatorStorytellingSection() {
  return (
    <section className="relative overflow-hidden border-t border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,#fffefe_0%,#f8f4ff_34%,#fcfbff_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_18%_16%,rgba(111,67,255,0.12)_0%,rgba(255,255,255,0)_34%),radial-gradient(circle_at_84%_18%,rgba(56,189,248,0.1)_0%,rgba(255,255,255,0)_30%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[9%] top-28 h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]/60 shadow-[0_0_20px_rgba(111,67,255,0.5)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[12%] top-[22rem] h-2 w-2 rounded-full bg-sky-300/80 shadow-[0_0_24px_rgba(125,211,252,0.8)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[16%] bottom-24 h-3 w-3 rounded-full bg-emerald-300/60 shadow-[0_0_26px_rgba(110,231,183,0.78)]"
      />

      <div className="mx-auto max-w-[96rem] px-4 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">
              Why Regretify Exists
            </p>
            <h2 className="type-display mt-3 text-[2rem] font-semibold tracking-[-0.055em] text-zinc-950 sm:text-[2.5rem] lg:text-[3.2rem]">
              This should feel like a slow punch, not a feature list.
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-xl text-[0.96rem] leading-7 text-[var(--color-text-ui-soft)] sm:text-[1rem]">
              The story starts with a market signal, passes through hesitation, and ends with a sharp visual answer.
              That arc deserves a more dramatic layout than plain cards.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)] lg:gap-12">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative overflow-hidden rounded-[2rem] border border-zinc-950/10 bg-[linear-gradient(180deg,#171427_0%,#1d1740_34%,#0f1019_100%)] p-5 text-white shadow-[0_24px_58px_rgba(24,24,27,0.16)] sm:p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_22%_18%,rgba(167,139,250,0.32)_0%,rgba(167,139,250,0)_42%),radial-gradient(circle_at_82%_20%,rgba(110,231,183,0.18)_0%,rgba(110,231,183,0)_30%)]"
              />

              <div className="relative z-10">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/58">
                  Regret Engine
                </p>
                <h3 className="type-display mt-3 max-w-xs text-[1.7rem] font-semibold tracking-[-0.05em] text-white sm:text-[2rem]">
                  A market memory turns into a visible consequence.
                </h3>
                <p className="mt-3 max-w-sm text-[0.88rem] leading-6 text-white/72">
                  The left side stays still while the story scrolls by. That contrast is the point.
                </p>

                <div className="mt-6 grid gap-4 rounded-[1.6rem] border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-[1rem] bg-white/12 text-[0.8rem] font-semibold text-white">
                      IF
                    </span>
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/46">
                        Core loop
                      </p>
                      <p className="mt-1 text-[0.96rem] font-semibold text-white">
                        Notice. Delay. Measure. Share.
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-3 top-1 bottom-1 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(167,139,250,0.7)_28%,rgba(110,231,183,0.65)_72%,rgba(255,255,255,0.16)_100%)]" />
                    <div className="space-y-4">
                      {stickyMilestones.map((milestone, index) => (
                        <div key={milestone} className="relative">
                          <span
                            className={`absolute left-[-1.7rem] top-1.5 h-3 w-3 rounded-full border border-white/30 ${
                              index === 2
                                ? "bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.75)]"
                                : index === 1
                                  ? "bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.65)]"
                                  : "bg-violet-300 shadow-[0_0_18px_rgba(196,181,253,0.65)]"
                            }`}
                          />
                          <p className="text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-white/44">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-1 text-[0.92rem] font-medium text-white/86">
                            {milestone}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_100%)] p-4">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-white/46">
                    Desired feeling
                  </p>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[1.9rem] font-semibold tracking-[-0.06em] text-white">
                        “I knew it.”
                      </p>
                      <p className="mt-2 max-w-[13rem] text-[0.82rem] leading-5 text-white/66">
                        Then the product shows exactly what that instinct was worth.
                      </p>
                    </div>
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[1.1rem] border border-white/14 bg-white/8 shadow-[0_0_30px_rgba(111,67,255,0.2)]">
                      <span className="h-2.5 w-2.5 rounded-full bg-violet-300 shadow-[0_0_20px_rgba(196,181,253,0.9)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-4 bottom-4 hidden w-px bg-[linear-gradient(180deg,rgba(111,67,255,0)_0%,rgba(111,67,255,0.22)_16%,rgba(111,67,255,0.14)_84%,rgba(111,67,255,0)_100%)] lg:block" />

            <div className="space-y-5 sm:space-y-6">
              {storytellingSteps.map((step) => {
                const isDarkCard = step.cardClassName.includes("#151426");

                return (
                  <article
                    key={step.step}
                    className={`group relative overflow-hidden rounded-[2rem] border p-5 shadow-[0_20px_48px_rgba(24,24,27,0.07)] sm:p-6 ${step.cardClassName} ${step.offsetClassName}`}
                  >
                    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${step.glowClassName}`} />
                    <div
                      aria-hidden="true"
                      className="absolute left-[-0.95rem] top-8 hidden h-8 w-8 items-center justify-center lg:flex"
                    >
                      <span className="absolute h-7 w-7 rounded-full bg-white shadow-[0_12px_26px_rgba(24,24,27,0.08)]" />
                      <span className="relative h-3.5 w-3.5 rounded-full bg-[var(--color-brand)] shadow-[0_0_20px_rgba(111,67,255,0.55)]" />
                    </div>

                    <div className="relative z-10 grid gap-5 md:grid-cols-[auto_minmax(0,1fr)] md:items-start">
                      <div className="flex items-start gap-3 md:block">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${
                            isDarkCard
                              ? "bg-white/10 text-white/72"
                              : "bg-white/92 text-[var(--color-brand)] shadow-[0_8px_20px_rgba(24,24,27,0.05)]"
                          }`}
                        >
                          {step.eyebrow}
                        </span>
                        <p
                          className={`mt-0 text-[2.8rem] font-semibold leading-none tracking-[-0.08em] md:mt-4 ${
                            isDarkCard ? "text-white/14" : "text-zinc-950/10"
                          }`}
                        >
                          {step.step}
                        </p>
                      </div>

                      <div className="min-w-0">
                        <h3
                          className={`type-title max-w-2xl text-[1.3rem] font-semibold leading-7 sm:text-[1.55rem] sm:leading-8 ${
                            isDarkCard ? "text-white" : "text-zinc-950"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`mt-3 max-w-2xl text-[0.92rem] leading-6 sm:text-[0.98rem] sm:leading-7 ${
                            isDarkCard ? "text-white/74" : "text-[var(--color-text-ui-soft)]"
                          }`}
                        >
                          {step.description}
                        </p>

                        <div
                          className={`mt-5 inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-2 text-[0.76rem] font-medium ${
                            isDarkCard
                              ? "border-white/12 bg-white/8 text-white/72"
                              : "border-[color:var(--color-border-ui-subtle)] bg-white/86 text-[var(--color-text-ui-soft)]"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              isDarkCard ? "bg-sky-300" : "bg-[var(--color-brand)]"
                            }`}
                          />
                          <span>{step.sideNote}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
