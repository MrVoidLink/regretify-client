import Image from "next/image";

type HeroCopyProps = {
  copyWidthClassName: string;
  eyebrowClassName: string;
  titleClassName: string;
  descriptionClassName: string;
  ctaClassName: string;
  description: string;
  ctaLabel: string;
  useDesktopArrow?: boolean;
};

function HeroCopy({
  copyWidthClassName,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  ctaClassName,
  description,
  ctaLabel,
  useDesktopArrow = false,
}: HeroCopyProps) {
  return (
    <div className={copyWidthClassName}>
      <p className={eyebrowClassName}>Market Pulse</p>

      <h1 className={titleClassName}>
        The market
        <br />
        never <span className="text-[var(--color-brand)]">sleeps.</span>
      </h1>

      <p className={descriptionClassName}>{description}</p>

      <a href="#today-pulse" className={ctaClassName}>
        <span>{ctaLabel}</span>
        <span
          aria-hidden="true"
          className="grid h-5 w-5 place-items-center rounded-full bg-[linear-gradient(180deg,#ffb347_0%,#ff7a00_100%)] text-white"
        >
          {useDesktopArrow ? (
            <svg
              viewBox="0 0 20 20"
              className="h-2.75 w-2.75"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 14 14 6" />
              <path d="M7 6h7v7" />
            </svg>
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          )}
        </span>
      </a>
    </div>
  );
}

export function MarketPulseHero() {
  return (
    <>
      <section className="relative -mt-16 h-[44dvh] min-h-[18.5rem] w-full overflow-hidden bg-white md:hidden">
        <div className="relative h-full w-full bg-[#f6f0ff]">
          <Image
            src="/images/market-pulse/hero-background-mobile-v1.jpg"
            alt=""
            fill
            preload
            unoptimized
            sizes="100vw"
            className="object-cover object-[72%_46%]"
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,241,255,0.9)_0%,rgba(247,241,255,0.64)_36%,rgba(247,241,255,0.08)_62%,rgba(247,241,255,0)_100%)]" />

          <div className="relative z-10 flex h-full items-start">
            <div className="w-full px-5 pt-23">
              <HeroCopy
                copyWidthClassName="max-w-[11.5rem]"
                eyebrowClassName="text-[0.68rem] font-semibold tracking-[0.12em] text-[var(--color-brand)] uppercase"
                titleClassName="type-display mt-2.5 text-[2.35rem] font-semibold text-zinc-950"
                descriptionClassName="mt-3.5 max-w-[10.5rem] text-[0.84rem] leading-5.5 text-[var(--color-text-ui-soft)]"
                ctaClassName="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full bg-zinc-950 px-4 text-[0.82rem] font-medium text-white shadow-[0_12px_28px_rgba(24,24,27,0.18)]"
                description="News, memes and chaos from the world of money."
                ctaLabel="What's trending?"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-18 hidden h-[31rem] w-full overflow-hidden bg-white md:block lg:hidden">
        <div className="relative h-full w-full bg-[#f6f0ff]">
          <Image
            src="/images/market-pulse/hero-background-tablet-v1.png"
            alt=""
            fill
            preload
            unoptimized
            sizes="100vw"
            className="object-cover object-[62%_52%]"
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,241,255,0.92)_0%,rgba(247,241,255,0.72)_30%,rgba(247,241,255,0.18)_56%,rgba(247,241,255,0)_76%)]" />

          <div className="relative z-10 flex h-full items-start">
            <div className="w-full px-8 pt-24">
              <HeroCopy
                copyWidthClassName="max-w-[15.5rem]"
                eyebrowClassName="text-[0.72rem] font-semibold tracking-[0.13em] text-[var(--color-brand)] uppercase"
                titleClassName="type-display mt-3 text-[3.15rem] font-semibold text-zinc-950"
                descriptionClassName="mt-4 max-w-[14rem] text-[0.9rem] leading-6 text-[var(--color-text-ui-soft)]"
                ctaClassName="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-950 px-4.5 text-[0.88rem] font-medium text-white shadow-[0_14px_32px_rgba(24,24,27,0.18)]"
                description="News, memes and chaos from the world of money."
                ctaLabel="What's trending?"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-20 hidden h-[80dvh] w-full overflow-hidden bg-white lg:block lg:-mt-18">
        <div className="h-full w-full">
          <div className="relative h-full w-full bg-[#f6f0ff]">
            <Image
              src="/images/market-pulse/hero-background-v7.jpg"
              alt=""
              fill
              preload
              unoptimized
              sizes="100vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,241,255,0.68)_0%,rgba(247,241,255,0.22)_26%,rgba(247,241,255,0)_42%)]" />

            <div className="relative z-10 flex h-full items-start">
              <div className="w-full px-9 pt-32 lg:px-11 lg:pt-36 xl:px-13 xl:pt-40">
                <HeroCopy
                  copyWidthClassName="max-w-[24rem] lg:max-w-[28rem]"
                  eyebrowClassName="text-[0.78rem] font-semibold tracking-[0.14em] text-[var(--color-brand)] uppercase lg:text-[0.82rem]"
                  titleClassName="type-display mt-3 text-[3.8rem] font-semibold text-zinc-950 lg:mt-4 lg:text-[4.35rem]"
                  descriptionClassName="mt-4 max-w-[18rem] text-[0.98rem] leading-6 text-[var(--color-text-ui-soft)] lg:mt-5 lg:max-w-[20rem] lg:text-[1.04rem] lg:leading-7"
                  ctaClassName="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-950 px-4.5 text-[0.9rem] font-medium text-white shadow-[0_14px_34px_rgba(24,24,27,0.18)] transition-transform duration-200 hover:-translate-y-0.5 lg:mt-7 lg:min-h-12 lg:px-5 lg:text-[0.95rem]"
                  description="The latest buzz, wild moves, funny stories and everything in between."
                  ctaLabel="What's trending today?"
                  useDesktopArrow
                />
              </div>
            </div>

            <div className="pointer-events-none absolute right-[9.5%] top-[28%] z-10 rounded-[1.15rem] border border-white/85 bg-white/84 px-4 py-3 text-zinc-700 shadow-[0_20px_48px_rgba(123,97,255,0.14)] backdrop-blur-md lg:right-[10.5%] lg:top-[26.5%] lg:rounded-[1.3rem] lg:px-4.5 lg:py-3.5">
              <div className="flex max-w-[10.25rem] items-start gap-2.5 lg:max-w-[11rem]">
                <span className="mt-0.5 text-[var(--color-brand)]">
                  <svg
                    viewBox="0 0 20 20"
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M11.2 1.8 5.9 10h3L7.8 18.2 14 9.9h-3.2l.4-8.1Z" />
                  </svg>
                </span>

                <p className="text-[0.72rem] leading-5 text-zinc-700 lg:text-[0.78rem] lg:leading-5.5">
                  Breaking
                  <span className="text-zinc-500"> (not so serious)</span>
                  <br />
                  news from the world
                  <br />
                  of money.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="today-pulse" className="sr-only">
        Today&apos;s Pulse
      </div>
    </>
  );
}
