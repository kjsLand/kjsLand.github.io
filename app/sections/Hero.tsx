import { FiArrowDown, FiArrowRight, FiFileText } from "react-icons/fi";
import { site, socials } from "@/content";
import MatrixField from "@/app/components/hero/MatrixField";
import MagneticLink from "@/app/components/ui/MagneticLink";
import Reveal from "@/app/components/ui/Reveal";
import SocialIcon from "@/app/components/ui/SocialIcon";
import SplitText from "@/app/components/ui/SplitText";
import Typewriter from "@/app/components/ui/Typewriter";

export default function Hero() {
  const [first, ...rest] = site.name.split(" ");
  const last = rest.join(" ");

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 md:pt-32">
      {/* Signature effect: a field of grey digits with digital rain. Hovering lights them up gold. */}
      <div className="absolute inset-0 -z-10">
        <MatrixField />
      </div>
      {/* Soft vignette behind the copy so the name stays readable over the digits. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_50%_45%,rgb(10_13_18/0.85),transparent_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-ink" />

      <div className="hero-scroll-away mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 pb-24 text-center md:px-8 md:pb-28">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            {site.availability ? (
              <span className="inline-flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-gold [animation:pulse-ring_1.8s_ease-out_infinite]" />
                {site.availability}
              </span>
            ) : (
              <>
                <span className="text-gold">[</span> {site.kicker} <span className="text-gold">]</span>
              </>
            )}
          </p>
        </Reveal>

        <h1 className="mt-7 font-heading text-[clamp(3.25rem,13vw,9.5rem)] font-bold leading-[1] tracking-[-0.02em] text-fg">
          <SplitText text={first} />{" "}
          <SplitText text={last} offset={first.length} gradient />
        </h1>

        <Reveal delay={500}>
          <p className="mt-7 font-mono text-base text-muted md:text-xl">
            <span className="text-gold">&gt;</span> <Typewriter words={site.roles} className="text-fg" />
          </p>
        </Reveal>

        <Reveal delay={650}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">{site.tagline}</p>
        </Reveal>

        <Reveal delay={800}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticLink href="#projects">
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
          </div>
        </Reveal>

        <Reveal delay={900}>
          <div className="mt-5 flex items-center justify-center gap-1">
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
        </Reveal>
      </div>

      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-faint md:flex"
      >
        scroll
        <span className="relative h-8 w-px overflow-hidden bg-line">
          <span className="absolute inset-0 bg-accent-gradient [animation:scroll-cue_2.2s_ease-in-out_infinite]" />
        </span>
        <FiArrowDown className="sr-only" />
      </a>
    </section>
  );
}
