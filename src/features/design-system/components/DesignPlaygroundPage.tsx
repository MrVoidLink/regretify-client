import { Urbanist } from "next/font/google";
import { PlaygroundCharacterSkeletonLab } from "@/features/design-system/components/PlaygroundCharacterSkeletonLab";
import {
  brandPalette,
  neutralPalette,
  semanticPalette,
} from "@/features/design-system/data/playground";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

type Tone = {
  name: string;
  token: string;
  value: string;
  note?: string;
};

function ToneCard({ tone }: { tone: Tone }) {
  const isDarkSwatch = ["--color-brand", "--color-brand-strong", "--color-brand-muted"].includes(
    tone.token,
  );

  return (
    <article className="rounded-[1.35rem] border border-zinc-200/80 bg-white p-4 shadow-[0_14px_36px_rgba(24,24,27,0.05)]">
      <div
        className="h-24 rounded-[1rem] border border-black/5"
        style={{ backgroundColor: `var(${tone.token})` }}
      />
      <div className="mt-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-[0.98rem] font-semibold tracking-[-0.04em] text-zinc-950">
              {tone.name}
            </h2>
            <p className="mt-1 font-mono text-[0.7rem] text-zinc-500">{tone.token}</p>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-[0.66rem] font-semibold ${
              isDarkSwatch
                ? "bg-zinc-950 text-white"
                : "bg-zinc-100 text-zinc-700"
            }`}
          >
            {tone.value}
          </span>
        </div>
        {tone.note ? (
          <p className="mt-3 text-[0.78rem] leading-5 text-zinc-600">{tone.note}</p>
        ) : null}
      </div>
    </article>
  );
}

function PaletteSection({
  title,
  eyebrow,
  description,
  tones,
}: {
  title: string;
  eyebrow: string;
  description: string;
  tones: readonly Tone[];
}) {
  return (
    <section className="rounded-[1.75rem] border border-zinc-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,248,250,0.92)_100%)] p-5 shadow-[0_18px_48px_rgba(24,24,27,0.06)] sm:p-7">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[1.7rem] font-semibold tracking-[-0.06em] text-zinc-950 sm:text-[2rem]">
        {title}
      </h2>
      <p className="mt-2 max-w-[44rem] text-[0.92rem] leading-6 text-zinc-600">
        {description}
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tones.map((tone) => (
          <ToneCard key={tone.token} tone={tone} />
        ))}
      </div>
    </section>
  );
}

export function DesignPlaygroundPage() {
  return (
    <main className="min-h-[calc(100dvh-4.5rem)] bg-[linear-gradient(180deg,#fcfbff_0%,#f7f6fb_100%)] pb-16">
      <section className="mx-auto max-w-[96rem] px-5 pt-6 sm:px-7 lg:px-10">
        <div className="rounded-[2rem] border border-zinc-200/80 bg-white/86 p-6 shadow-[0_22px_64px_rgba(24,24,27,0.06)] backdrop-blur-sm sm:p-8">
          <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)]">
            Regretify Playground
          </p>
          <h1 className="type-display mt-4 max-w-[52rem] text-[2.35rem] font-semibold text-zinc-950 sm:text-[3.4rem]">
            Font and color baseline for the next pass of the product UI.
          </h1>
          <p className="mt-4 max-w-[42rem] text-[1rem] leading-7 text-zinc-600">
            The recommended primary font is <strong className="font-semibold text-zinc-950">Urbanist</strong>.
            It fits the product better because it feels softer and cleaner, while
            still holding enough personality for large headlines and bold product UI.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.9fr)]">
            <section
              className={`rounded-[1.5rem] border border-zinc-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#faf7ff_100%)] p-5 sm:p-6 ${urbanist.className}`}
            >
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Urbanist Sample
              </p>
              <h2 className="type-display mt-3 text-[2rem] font-semibold text-zinc-950 sm:text-[3rem]">
                If you bought Bitcoin earlier, how bad would the regret feel today?
              </h2>
              <p className="mt-4 max-w-[38rem] text-[1rem] leading-7 text-zinc-600">
                Urbanist feels softer and more fluid than the current app font. This
                preview is here only to evaluate tone, readability, and headline
                presence before making any global typography change.
              </p>
            </section>

            <section className="rounded-[1.5rem] border border-zinc-200/80 bg-zinc-950 p-5 text-white sm:p-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/62">
                Candidate Notes
              </p>
              <ul className="mt-4 grid gap-3 text-[0.95rem] leading-6 text-white/78">
                <li>Urbanist is now the main UI font for the project.</li>
                <li>This sample uses the same font with heading-specific spacing tweaks.</li>
                <li>It feels softer than the previous option without losing clarity.</li>
                <li>Next step is page-by-page typography and color cleanup.</li>
              </ul>
            </section>
          </div>
        </div>

        <div className="mt-6 grid gap-6">
          <PlaygroundCharacterSkeletonLab />
          <PaletteSection
            title="Brand palette"
            eyebrow="Primary UI"
            description="These are the shared Regretify UI accents. They should drive buttons, links, active states, chips, and branded highlights across the app."
            tones={brandPalette}
          />
          <PaletteSection
            title="Neutral palette"
            eyebrow="Surfaces"
            description="These tones should keep the product readable and stable. Most cards, borders, muted text, and layout shells should come from this layer instead of ad-hoc grays."
            tones={neutralPalette}
          />
          <PaletteSection
            title="Semantic palette"
            eyebrow="States"
            description="These colors are for product meaning such as positive moves, warnings, and negative outcomes. They are UI states, not asset identities."
            tones={semanticPalette}
          />
        </div>
      </section>
    </main>
  );
}
