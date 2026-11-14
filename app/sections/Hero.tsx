import { FiFileText } from "react-icons/fi";
import { site, socials } from "@/content";
import MatrixField from "@/app/components/hero/MatrixField";
import MagneticLink from "@/app/components/ui/MagneticLink";
import Reveal from "@/app/components/ui/Reveal";
import SocialIcon from "@/app/components/ui/SocialIcon";
import SplitText from "@/app/components/ui/SplitText";
import Typewriter from "@/app/components/ui/Typewriter";

/**
 * Compact intro above the project grid: name, roles, tagline, and the site's one set of social links.
 */
export default function Hero() {
  const [first, ...rest] = site.name.split(" ");
  const last = rest.join(" ");

  return (
    <section id="top" className="relative overflow-hidden pb-6 pt-32 md:pb-10 md:pt-40">
      {/* Signature effect: a field of grey digits with digital rain. Hovering lights them up gold. */}
      {/* Masked to fade out at the bottom so it blends into the project grid below. */}
      <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
        <MatrixField />
      </div>
      {/* Soft vignette behind the copy so the name stays readable over the digits. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_55%_at_50%_50%,rgb(10_13_18/0.85),transparent_75%)]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 text-center md:px-8">
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

        <h1 className="mt-6 font-heading text-[clamp(3rem,10vw,6.5rem)] font-bold leading-[1] tracking-[-0.02em] text-fg">
          <SplitText text={first} />{" "}
          <SplitText text={last} offset={first.length} gradient />
        </h1>

        <Reveal delay={500}>
          <p className="mt-6 font-mono text-base text-muted md:text-lg">
            <span className="text-gold">&gt;</span> <Typewriter words={site.roles} className="text-fg" />
          </p>
        </Reveal>

        <Reveal delay={650}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">{site.tagline}</p>
        </Reveal>

        <Reveal delay={800}>
          <ul className="mt-7 flex items-center justify-center gap-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  title={s.handle}
                  {...(s.icon === "email" ? {} : { target: "_blank", rel: "noreferrer" })}
                  className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
                >
                  <SocialIcon icon={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {site.resumeUrl && (
          <Reveal delay={900}>
            <div className="mt-5">
              <MagneticLink href={site.resumeUrl} variant="ghost" external>
                <FiFileText aria-hidden /> Résumé
              </MagneticLink>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
