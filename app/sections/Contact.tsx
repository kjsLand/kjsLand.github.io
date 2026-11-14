import { FiArrowUpRight } from "react-icons/fi";
import { site, socials } from "@/content";
import CopyEmail from "@/app/components/contact/CopyEmail";
import Reveal from "@/app/components/ui/Reveal";
import SocialIcon from "@/app/components/ui/SocialIcon";
import SpotlightCard from "@/app/components/ui/SpotlightCard";

export default function Contact({ index }: { index?: number }) {
  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            {index !== undefined && <span className="text-gold">{String(index).padStart(2, "0")}</span>}
            <span className="h-px w-10 bg-accent-dash" />
            Contact
          </p>
          <CopyEmail email={site.email} />
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
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-muted transition-colors group-hover:border-gold/30 group-hover:text-gold">
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
