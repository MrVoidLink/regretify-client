import Image from "next/image";
import { dailyPulseNewsletter } from "@/features/market-pulse/data/dailyPulseNewsletter";

function PaperPlaneOutline({
  className,
}: {
  className: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 58 100 18 72 102 55 68 16 58Z" />
      <path d="M55 68 100 18" />
    </svg>
  );
}

function SubscribeButton() {
  return (
    <button
      type="button"
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[1.2rem] bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] px-5 text-[0.92rem] font-medium text-white shadow-[0_14px_32px_rgba(90,40,223,0.24)] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto"
    >
      <span>{dailyPulseNewsletter.ctaLabel}</span>
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
        <path d="M4.5 15.5 15.5 4.5" />
        <path d="M7 4.5h8.5V13" />
      </svg>
    </button>
  );
}

export function DailyPulseNewsletterSection() {
  return (
    <section className="pt-0 pb-16 sm:pb-20" aria-labelledby="daily-pulse-newsletter-heading">
      <div className="mx-auto max-w-[96rem] px-3 sm:px-5 md:px-7 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-violet-100/90 bg-[linear-gradient(135deg,#eee4ff_0%,#f6efff_36%,#f2ebff_66%,#efe4ff_100%)] shadow-[0_24px_70px_rgba(109,66,255,0.12)] lg:rounded-[2.25rem]">
          <div className="absolute left-[-10%] top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[#8d62ff]/16 blur-3xl" />
          <div className="absolute right-[-4%] top-[-10%] h-44 w-44 rounded-full bg-white/55 blur-3xl" />
          <div className="absolute bottom-[-18%] right-[10%] h-36 w-36 rounded-full bg-[#c3a8ff]/22 blur-3xl" />
          <div className="absolute inset-y-0 left-[18.5rem] hidden w-px bg-white/40 lg:block" />
          <div className="absolute right-[6%] top-[16%] hidden text-violet-300/50 lg:block">
            <PaperPlaneOutline className="h-12 w-12 rotate-6" />
          </div>
          <div className="absolute right-[2%] top-[8%] hidden text-violet-200/60 lg:block">
            <PaperPlaneOutline className="h-16 w-16 -rotate-12" />
          </div>

          <div className="relative z-10 grid gap-4 px-4 py-4 sm:px-5 sm:py-5 md:grid-cols-[13.5rem_minmax(0,1fr)] md:items-center md:gap-x-5 md:gap-y-5 lg:grid-cols-[15.75rem_minmax(0,1.2fr)_23rem] lg:px-7 lg:py-4 xl:grid-cols-[16.5rem_minmax(0,1.3fr)_24rem] xl:px-8">
            <div className="relative mx-auto h-[10.4rem] w-full max-w-[12.9rem] sm:h-[11.2rem] sm:max-w-[13.4rem] md:mx-0 md:h-[12.3rem] md:max-w-none lg:h-[12.4rem] xl:h-[12.8rem]">
              <div className="absolute left-[15%] top-[7%] h-20 w-20 rounded-full bg-white/42 blur-2xl sm:left-[15%] md:left-[12%]" />
              <div className="absolute bottom-3 left-7 h-24 w-24 rounded-full bg-[#9b73ff]/22 blur-3xl sm:left-8 md:left-4 md:h-26 md:w-26" />
              <Image
                src="/images/market-pulse/newsletter-mascot-v2.png"
                alt=""
                width={520}
                height={520}
                unoptimized
                className="absolute bottom-[-0.9rem] left-1/2 h-auto w-[13.9rem] max-w-none -translate-x-1/2 drop-shadow-[0_18px_40px_rgba(70,35,170,0.18)] sm:bottom-[-1rem] sm:w-[14.8rem] md:bottom-[-1.1rem] md:left-[-0.35rem] md:w-[15.7rem] md:translate-x-0 lg:bottom-[-0.95rem] lg:left-[-0.35rem] lg:w-[16rem] xl:bottom-[-1rem] xl:left-[-0.15rem] xl:w-[16.9rem]"
              />
            </div>

            <div className="text-center md:text-left lg:max-w-[36rem]">
              <p className="text-[0.74rem] font-semibold tracking-[0.08em] text-[var(--color-brand)] sm:text-[0.76rem]">
                {dailyPulseNewsletter.eyebrow}
              </p>

              <h2
                id="daily-pulse-newsletter-heading"
                className="type-display mt-2 text-[2rem] font-semibold text-zinc-950 sm:text-[2.18rem] md:max-w-[26rem] md:text-[2.2rem] lg:max-w-[34rem] lg:text-[2.15rem] xl:max-w-[36rem] xl:text-[2.35rem]"
              >
                {dailyPulseNewsletter.title.lead}
                <span className="block text-[var(--color-brand-strong)]">
                  {dailyPulseNewsletter.title.accent}
                </span>
              </h2>

              <p className="mt-2.5 max-w-[31rem] text-[0.96rem] leading-6 text-[var(--color-text-ui-soft)] md:text-[0.94rem] lg:pr-6">
                {dailyPulseNewsletter.description}
              </p>
            </div>

            <div className="md:col-span-2 lg:col-span-1 lg:justify-self-end lg:w-full lg:max-w-[23rem]">
              <div className="rounded-[1.65rem] border border-white/70 bg-white/36 p-2.5 shadow-[0_16px_44px_rgba(95,44,224,0.10)] backdrop-blur-sm">
                <div className="flex flex-col gap-2.5 rounded-[1.3rem] bg-white p-1.5 shadow-[0_12px_28px_rgba(24,24,27,0.06)] sm:flex-row sm:items-center">
                  <label className="sr-only" htmlFor="daily-pulse-newsletter-email">
                    Email address
                  </label>
                  <input
                    id="daily-pulse-newsletter-email"
                    type="email"
                    placeholder={dailyPulseNewsletter.emailPlaceholder}
                    className="h-12 min-w-0 flex-1 rounded-[1rem] border border-transparent bg-transparent px-4 text-[0.94rem] text-zinc-900 outline-none placeholder:text-[var(--color-text-ui-muted)]"
                  />
                  <div className="sm:shrink-0">
                    <SubscribeButton />
                  </div>
                </div>
                <p className="px-2 pt-2.5 text-center text-[0.72rem] text-[var(--color-text-ui-muted)] sm:text-left">
                  {dailyPulseNewsletter.socialProof}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
