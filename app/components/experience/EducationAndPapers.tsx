import type { ReactNode } from "react";
import { FiArrowUpRight, FiAward, FiCode, FiFileText, FiMapPin } from "react-icons/fi";
import { education, educationHonors, papers, site, type Degree, type Paper } from "@/content";
import Reveal from "@/app/components/ui/Reveal";
import SpotlightCard from "@/app/components/ui/SpotlightCard";
import Tag from "@/app/components/ui/Tag";

const linkMeta = {
  paper: { label: "Paper", Icon: FiArrowUpRight },
  pdf: { label: "PDF", Icon: FiFileText },
  code: { label: "Code", Icon: FiCode },
} as const;

/** Bottom of the Experience page: degrees on the left, papers on the right (stacked on small screens). */
export default function EducationAndPapers() {
  return (
    <section
      aria-label="Education and papers"
      className="mx-auto mt-32 flex max-w-6xl flex-col gap-14 px-5 md:mt-48 md:px-8 lg:flex-row lg:gap-10"
    >
      <Column id="education" eyebrow="Education" title="Degrees">
        {education.map((d, i) => (
          <Reveal key={`${d.school}-${d.degree}`} delay={i * 100}>
            <DegreeCard degree={d} />
          </Reveal>
        ))}
        {educationHonors.length > 0 && (
          <Reveal delay={education.length * 100}>
            <ul className="flex flex-wrap gap-2">
              {educationHonors.map((h) => (
                <li key={h} className="glass flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm text-fg">
                  <FiAward className="h-3.5 w-3.5 text-gold" aria-hidden /> {h}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Column>

      <Column id="papers" eyebrow="Research" title="Papers">
        {papers.map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <PaperCard paper={p} />
          </Reveal>
        ))}
      </Column>
    </section>
  );
}

function Column({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div id={id} className="flex min-w-0 flex-1 scroll-mt-28 flex-col gap-5">
      <Reveal>
        <p className="mb-2 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          <span className="h-px w-10 bg-accent-gradient" />
          {eyebrow}
        </p>
        <h2 className="mb-3 text-3xl font-semibold tracking-tight text-fg md:text-4xl">{title}</h2>
      </Reveal>
      {children}
    </div>
  );
}

function DegreeCard({ degree: d }: { degree: Degree }) {
  const timeline = d.timeline ?? (d.terms.length ? `${d.terms[0].term} – ${d.terms[d.terms.length - 1].term}` : "");
  const avg = d.terms.length ? d.terms.reduce((s, t) => s + t.gpa, 0) / d.terms.length : null;

  return (
    <SpotlightCard as="article" className="p-6 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">{timeline}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg md:text-2xl">{d.degree}</h3>
          <p className="mt-1 text-muted">{d.school}</p>
          {d.location && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-faint">
              <FiMapPin className="h-3.5 w-3.5" aria-hidden /> {d.location}
            </p>
          )}
        </div>
        {avg !== null && (
          <div className="shrink-0 text-right">
            <p className="text-gradient text-3xl font-semibold tracking-tight">{avg.toFixed(2)}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">avg. GPA</p>
          </div>
        )}
      </div>

      {d.focus && d.focus.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {d.focus.map((f) => (
            <Tag key={f} tone="accent">
              {f}
            </Tag>
          ))}
        </div>
      )}
    </SpotlightCard>
  );
}

function PaperCard({ paper: p }: { paper: Paper }) {
  const lead = p.authors[0] === site.name;
  const links = Object.entries(p.links ?? {}).filter(([, href]) => Boolean(href)) as [
    keyof typeof linkMeta,
    string,
  ][];

  return (
    <SpotlightCard as="article" className="p-6 md:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 font-serif text-2xl italic leading-none text-fg/90">{p.year}</span>
        <Tag tone="gold">{p.status}</Tag>
        {p.venue && <Tag>{p.venue}</Tag>}
        {lead && (
          <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Lead author</span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-fg md:text-xl">{p.title}</h3>
      <p className="mt-2 text-sm text-muted">
        {p.authors.map((a, j) => (
          <span key={a}>
            <span className={a === site.name ? "font-medium text-fg underline decoration-gold/60 underline-offset-4" : ""}>
              {a}
            </span>
            {j < p.authors.length - 1 && ", "}
          </span>
        ))}
      </p>
      <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.abstract}</p>

      {(p.tags?.length || links.length > 0) && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {p.tags?.map((t) => (
            <Tag key={t} tone="accent">
              {t}
            </Tag>
          ))}
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
      )}
    </SpotlightCard>
  );
}
