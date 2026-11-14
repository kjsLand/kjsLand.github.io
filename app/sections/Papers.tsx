import { FiArrowUpRight, FiCode, FiFileText } from "react-icons/fi";
import { papers, site } from "@/content";
import Reveal from "@/app/components/ui/Reveal";
import Section from "@/app/components/ui/Section";
import SpotlightCard from "@/app/components/ui/SpotlightCard";
import Tag from "@/app/components/ui/Tag";

const linkMeta = {
  paper: { label: "Paper", Icon: FiArrowUpRight },
  pdf: { label: "PDF", Icon: FiFileText },
  code: { label: "Code", Icon: FiCode },
} as const;

export default function Papers({ index }: { index?: number }) {
  return (
    <Section
      id="papers"
      index={index}
      eyebrow="Research"
      title="Papers &"
      accent="preprints"
      description="Quantum algorithms research: amplitude estimation, interferometry, and the problems they speed up."
    >
      <div className="grid gap-5">
        {papers.map((p, i) => {
          const lead = p.authors[0] === site.name;
          const links = Object.entries(p.links ?? {}).filter(([, href]) => Boolean(href)) as [
            keyof typeof linkMeta,
            string,
          ][];
          return (
            <Reveal key={p.title} delay={i * 100}>
              <SpotlightCard as="article" className="grid gap-6 p-6 md:grid-cols-[9rem_1fr] md:gap-10 md:p-9">
                <div className="flex items-center gap-3 md:block">
                  <p className="font-serif text-5xl italic leading-none text-fg/90 md:text-6xl">{p.year}</p>
                  <div className="flex flex-wrap gap-2 md:mt-5">
                    <Tag tone="gold">{p.status}</Tag>
                    {p.venue && <Tag>{p.venue}</Tag>}
                  </div>
                </div>

                <div>
                  {lead && (
                    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Lead author</p>
                  )}
                  <h3 className="text-xl font-semibold leading-snug tracking-tight text-fg md:text-2xl">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted">
                    {p.authors.map((a, j) => (
                      <span key={a}>
                        <span className={a === site.name ? "font-medium text-fg underline decoration-gold/60 underline-offset-4" : ""}>
                          {a}
                        </span>
                        {j < p.authors.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                  <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted">{p.abstract}</p>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {p.tags?.map((t) => (
                      <Tag key={t} tone="accent">
                        {t}
                      </Tag>
                    ))}
                    {links.length > 0 && <span className="mx-2 h-4 w-px bg-line" aria-hidden />}
                    {links.map(([k, href]) => {
                      const { label, Icon } = linkMeta[k];
                      return (
                        <a
                          key={k}
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-fg transition-colors hover:border-white/25"
                        >
                          <Icon aria-hidden /> {label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
