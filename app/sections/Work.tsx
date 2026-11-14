import { FiArrowUpRight } from "react-icons/fi";
import { experience } from "@/content";
import { duration } from "@/app/lib/format";
import Reveal from "@/app/components/ui/Reveal";
import Section from "@/app/components/ui/Section";
import SpotlightCard from "@/app/components/ui/SpotlightCard";
import Tag from "@/app/components/ui/Tag";
import TimelineRail from "@/app/components/work/TimelineRail";

export default function Work({ index }: { index?: number }) {
  return (
    <Section
      id="work"
      index={index}
      eyebrow="Experience"
      title="Where I've"
      accent="worked"
      description="From teaching to research engineering: a timeline of the teams I've built with."
    >
      <div className="relative">
        <TimelineRail />
        <ol>
        {experience.map((job, i) => {
          const len = duration(job.start, job.end);
          return (
            <Reveal
              as="li"
              key={`${job.company}-${job.role}-${job.start}`}
              delay={i * 60}
              className="relative grid gap-4 pb-12 pl-10 last:pb-0 md:grid-cols-[13rem_1fr] md:gap-10 md:pl-0"
            >
              {/* Node on the rail */}
              <span
                aria-hidden
                className="absolute left-0 top-2 grid h-[15px] w-[15px] place-items-center rounded-full border border-gold/50 bg-ink md:left-[13rem]"
              >
                <span className="h-[5px] w-[5px] rounded-full bg-gold shadow-[0_0_10px_rgb(222_160_30)]" />
              </span>

              {/* Date column */}
              <div className="font-mono text-xs uppercase tracking-[0.1em] text-muted md:pr-8 md:pt-1.5 md:text-right">
                <p className="whitespace-nowrap text-fg/90">
                  {job.start} — {job.end}
                </p>
                {len && <p className="mt-1 text-faint">{len}</p>}
              </div>

              <SpotlightCard as="article" className="p-6 md:ml-2 md:p-8">
                <h3 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">{job.role}</h3>
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
              </SpotlightCard>
            </Reveal>
          );
        })}
        </ol>
      </div>
    </Section>
  );
}
