import { statline } from "@/content";
import CountUp from "@/app/components/ui/CountUp";
import Reveal from "@/app/components/ui/Reveal";

/**
 * A sports-broadcast style "box score" poster: name, a game line, a photo,
 * and four big numbers stacked down the right. Data lives in content/statline.ts.
 */
export default function Statline() {
  const { name, game, photo, stats } = statline;
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <section id="statline" aria-label="Career statline" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <article className="relative overflow-hidden rounded-2xl border border-line bg-[#07090d] px-5 pb-6 pt-7 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)] md:px-10 md:pb-10 md:pt-10">
            <h2 className="text-center font-heading text-[clamp(2.25rem,9vw,4.75rem)] font-bold uppercase leading-none tracking-tight text-fg">
              {name}
            </h2>

            <div className="mt-3 flex items-center gap-3 md:mt-4 md:gap-5">
              <span className="h-px flex-1 bg-fg/70" />
              <p className="whitespace-nowrap font-heading text-[clamp(0.7rem,2.4vw,1rem)] font-semibold uppercase tracking-wide text-fg/90">
                {game}
              </p>
              <span className="h-px flex-1 bg-fg/70" />
            </div>

            <div className="mt-6 grid grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] gap-4 md:mt-8 md:gap-8">
              {/* Photo (or a monogram until one is added). */}
              <div className="relative overflow-hidden border-2 border-fg/85 bg-ink-2">
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo} alt={name} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div aria-hidden className="absolute inset-0 grid place-items-center">
                    <div className="absolute inset-0 pattern-hatch" />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 border-t border-dashed border-fg/30 pattern-dots" />
                    <span className="relative font-heading text-gold text-[clamp(4rem,16vw,9rem)] font-bold leading-none tracking-tighter">
                      {initials}
                    </span>
                  </div>
                )}
              </div>

              <dl className="flex flex-col">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex flex-1 items-center gap-3 py-2 md:gap-4 md:py-3 ${
                      i > 0 ? "border-t border-dashed border-fg/45" : ""
                    }`}
                  >
                    <dt className="order-last font-heading text-[clamp(0.8rem,2.6vw,1.35rem)] font-semibold uppercase leading-tight tracking-wide text-fg">
                      {s.label}
                    </dt>
                    <dd className="shrink-0 font-heading text-[clamp(2.75rem,11vw,5.5rem)] font-bold leading-none tracking-tight text-fg">
                      <CountUp value={s.value} duration={1100 + i * 150} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
