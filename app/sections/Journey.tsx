import { FiArrowUpRight, FiAward, FiBookOpen, FiBriefcase } from "react-icons/fi";
import { education, educationHonors, experience, type Degree, type Experience } from "@/content";
import { degreeRange, duration, monthNumber } from "@/app/lib/format";
import GpaChart from "@/app/components/education/GpaChart";
import ScrollTimeline from "@/app/components/journey/ScrollTimeline";
import Reveal from "@/app/components/ui/Reveal";
import Section from "@/app/components/ui/Section";
import SpotlightCard from "@/app/components/ui/SpotlightCard";
import Tag from "@/app/components/ui/Tag";

type Stop =
  | { kind: "work"; key: string; sort: number; year: number; job: Experience }
  | { kind: "education"; key: string; sort: number; year: number; degree: Degree };

/** Jobs and degrees merged into one list, oldest first. Ties put the degree first. */
function buildStops(): Stop[] {
  const stops: Stop[] = [
    ...education.map((degree): Stop => {
      const sort = monthNumber(degreeRange(degree).start) ?? 0;
      return { kind: "education", key: `edu-${degree.degree}`, sort, year: Math.floor(sort / 12), degree };
    }),
    ...experience.map((job): Stop => {
      const sort = monthNumber(job.start) ?? 0;
      return { kind: "work", key: `job-${job.company}-${job.role}`, sort, year: Math.floor(sort / 12), job };
    }),
  ];
  return stops.sort((a, b) => a.sort - b.sort);
}

export default function Journey({ index }: { index?: number }) {
  const stops = buildStops();

  return (
    <Section
      id="journey"
      index={index}
      eyebrow="Journey"
      title="Work &"
      accent="education"
      description="Every job and degree, in order. Scroll (or swipe on mobile) to move through it."
    >
      <ScrollTimeline count={stops.length} years={stops.map((s) => s.year)}>
        {stops.map((s, i) => (
          <div
            key={s.key}
            data-tl-item
            className={`group relative shrink-0 snap-start scroll-ml-5 ${
              s.kind === "education" ? "w-[min(86vw,31rem)]" : "w-[min(86vw,26rem)]"
            }`}
          >
            {/* Date above the rail */}
            <div className="flex h-10 items-start gap-3 font-mono text-xs uppercase tracking-[0.1em]">
              <p className="whitespace-nowrap text-muted transition-colors duration-500 group-data-active:text-fg">
                {s.kind === "work" ? `${s.job.start} — ${s.job.end}` : degreeRange(s.degree).label}
              </p>
              <p className="whitespace-nowrap text-faint">
                {s.kind === "work"
                  ? duration(s.job.start, s.job.end)
                  : `${s.degree.terms.length} term${s.degree.terms.length === 1 ? "" : "s"}`}
              </p>
            </div>

            {/* Node on the rail */}
            <span
              data-tl-node
              aria-hidden
              className="relative z-10 grid h-[15px] w-[15px] place-items-center rounded-full border border-line bg-ink transition-colors duration-500 group-data-active:border-gold/60"
            >
              <span className="h-[5px] w-[5px] rounded-full bg-faint transition-all duration-500 group-data-active:bg-gold group-data-active:shadow-[0_0_10px_rgb(222_160_30)]" />
            </span>

            <Reveal delay={Math.min(i, 2) * 80} className="mt-5">
              <SpotlightCard
                as="article"
                className="p-6 opacity-45 transition-opacity duration-700 group-data-active:opacity-100 md:p-7"
              >
                {s.kind === "work" ? <JobCard job={s.job} /> : <DegreeCard degree={s.degree} id={`gpa-${i}`} />}
              </SpotlightCard>
            </Reveal>
          </div>
        ))}
      </ScrollTimeline>

      {educationHonors.length > 0 && (
        <Reveal delay={100}>
          <ul className="mt-12 flex flex-wrap justify-center gap-3">
            {educationHonors.map((h) => (
              <li key={h} className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-fg">
                <FiAward className="h-4 w-4 text-gold" aria-hidden /> {h}
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  );
}

function KindLabel({ kind }: { kind: Stop["kind"] }) {
  return kind === "work" ? (
    <Tag tone="accent">
      <FiBriefcase className="h-3 w-3" aria-hidden /> Work
    </Tag>
  ) : (
    <Tag tone="gold">
      <FiBookOpen className="h-3 w-3" aria-hidden /> Education
    </Tag>
  );
}

function JobCard({ job }: { job: Experience }) {
  return (
    <>
      <KindLabel kind="work" />
      <h3 className="mt-4 text-xl font-semibold tracking-tight text-fg md:text-2xl">{job.role}</h3>
      <p className="mt-1 text-base text-muted">
        {job.companyUrl ? (
          <a
            href={job.companyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-gold"
          >
            {job.company} <FiArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        ) : (
          job.company
        )}
        {job.location && <span className="text-faint"> · {job.location}</span>}
      </p>

      <ul className="mt-5 space-y-3">
        {job.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-muted">
            <span aria-hidden className="mt-[0.6em] h-1 w-3 shrink-0 bg-accent-dash" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {job.tech && job.tech.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {job.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}
    </>
  );
}

function DegreeCard({ degree, id }: { degree: Degree; id: string }) {
  const avg = degree.terms.length ? degree.terms.reduce((s, t) => s + t.gpa, 0) / degree.terms.length : null;
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <KindLabel kind="education" />
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-fg md:text-2xl">{degree.degree}</h3>
          <p className="mt-1 text-base text-muted">{degree.school}</p>
          {degree.location && <p className="text-sm text-faint">{degree.location}</p>}
        </div>
        {avg !== null && (
          <div className="shrink-0 text-right">
            <p className="text-3xl font-semibold tracking-tight text-gold md:text-4xl">{avg.toFixed(2)}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">avg. term GPA</p>
          </div>
        )}
      </div>

      {degree.focus && degree.focus.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {degree.focus.map((f) => (
            <Tag key={f} tone="accent">
              {f}
            </Tag>
          ))}
        </div>
      )}

      <div className="mt-6">
        <GpaChart terms={degree.terms} id={id} />
      </div>
    </>
  );
}
