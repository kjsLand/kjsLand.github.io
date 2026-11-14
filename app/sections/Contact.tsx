import { FiArrowUpRight, FiMail } from "react-icons/fi";
import { site, socials } from "@/content";
import CopyEmail from "@/app/components/contact/CopyEmail";
import MagneticLink from "@/app/components/ui/MagneticLink";
import Reveal from "@/app/components/ui/Reveal";
import SocialIcon from "@/app/components/ui/SocialIcon";
import SpotlightCard from "@/app/components/ui/SpotlightCard";

export default function Contact({ index }: { index?: number }) {
  return (
    <section id="contact" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="conic-border relative overflow-hidden rounded-[2rem] bg-ink-2/80 px-6 py-16 text-center md:px-16 md:py-24">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 opacity-60"
              style={{
                background:
                  "radial-gradient(50% 60% at 50% 0%, rgb(139 92 246 / 0.25), transparent 70%), radial-gradient(40% 50% at 50% 110%, rgb(34 211 238 / 0.18), transparent 70%)",
              }}
            />
            <p className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
              {index !== undefined && <span className="text-cyan">{String(index).padStart(2, "0")}</span>}
              <span className="h-px w-10 bg-accent-gradient" />
              Contact
            </p>
            <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-fg md:text-7xl">
              Let&apos;s build something{" "}
              <span className="text-gradient pr-1 font-serif font-normal italic">meaningful.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-muted md:text-lg">
              Whether it&apos;s a role, a research collaboration, or a side project, my inbox is open.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticLink href={`mailto:${site.email}`}>
                <FiMail aria-hidden /> Say hello
              </MagneticLink>
              <CopyEmail email={site.email} />
            </div>
          </div>
        </Reveal>

        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 80}>
              <SpotlightCard className="h-full">
                <a
                  href={s.href}
                  {...(s.icon === "email" ? {} : { target: "_blank", rel: "noreferrer" })}
                  className="group flex h-full items-center gap-4 p-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-muted transition-colors group-hover:border-cyan/30 group-hover:text-cyan">
                    <SocialIcon icon={s.icon} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{s.label}</span>
                    <span className="block truncate text-sm text-fg">{s.handle}</span>
                  </span>
                  <FiArrowUpRight
                    aria-hidden
                    className="ml-auto h-4 w-4 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                  />
                </a>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
