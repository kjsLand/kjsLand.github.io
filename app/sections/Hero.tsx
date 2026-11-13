import { FiArrowDown, FiArrowRight, FiFileText } from "react-icons/fi";
import { site, socials, stats } from "@/content";
import InterferenceField from "@/app/components/hero/InterferenceField";
import CountUp from "@/app/components/ui/CountUp";
import MagneticLink from "@/app/components/ui/MagneticLink";
import Reveal from "@/app/components/ui/Reveal";
import SocialIcon from "@/app/components/ui/SocialIcon";
import SplitText from "@/app/components/ui/SplitText";
import Typewriter from "@/app/components/ui/Typewriter";

export default function Hero() {
  const [first, ...rest] = site.name.split(" ");
  const last = rest.join(" ");

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-32">
      {/* Signature effect: live wave interference. The cursor is one of the sources. */}
      <div className="absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_90%_60%_at_60%_40%,black_15%,transparent_75%)] md:opacity-100 md:[mask-image:radial-gradient(ellipse_55%_75%_at_74%_45%,black_20%,transparent_80%)]">
        <InterferenceField />
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="hero-scroll-away mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 font-mono text-xs text-muted">
            {site.availability ? (
              <>
                <span className="h-2 w-2 rounded-full bg-mint [animation:pulse-ring_1.8s_ease-out_infinite]" />
                {site.availability}
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-accent-gradient" />
                {site.kicker}
              </>
            )}
          </p>
        </Reveal>

        <h1 className="mt-8 text-[clamp(3.75rem,16vw,9.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-fg">
          <SplitText text={first} />
          <br />
          <SplitText text={last} offset={first.length} gradient className="font-serif font-normal italic tracking-[-0.02em]" />
        </h1>

        <Reveal delay={500}>
          <p className="mt-8 font-mono text-base text-muted md:text-xl">
            <span className="text-cyan">&gt;</span> <Typewriter words={site.roles} className="text-fg" />
          </p>
        </Reveal>

        <Reveal delay={650}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{site.tagline}</p>
        </Reveal>

        <Reveal delay={800}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticLink href="#work">
              See my work <FiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
            </MagneticLink>
            <MagneticLink href="#contact" variant="ghost">
              Get in touch
            </MagneticLink>
            {site.resumeUrl && (
              <MagneticLink href={site.resumeUrl} variant="ghost" external>
                <FiFileText aria-hidden /> Résumé
              </MagneticLink>
            )}
            <div className="ml-1 flex items-center gap-1">
              {socials
                .filter((s) => s.icon !== "email")
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
                  >
                    <SocialIcon icon={s.icon} />
                  </a>
                ))}
            </div>
          </div>
        </Reveal>

        <dl className="mt-16 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={900 + i * 90}
              className="glass flex flex-col-reverse rounded-2xl px-5 py-5 transition-colors hover:border-white/15"
            >
              <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{s.label}</dt>
              <dd className="text-4xl font-semibold tracking-tight text-fg md:text-5xl">
                <CountUp value={s.value} />
                <span className="text-gradient">.</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>

      <a
        href="#work"
        aria-label="Scroll to work"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-faint md:flex"
      >
        scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-0 bg-accent-gradient [animation:scroll-cue_2.2s_ease-in-out_infinite]" />
        </span>
        <FiArrowDown className="sr-only" />
      </a>
    </section>
  );
}
