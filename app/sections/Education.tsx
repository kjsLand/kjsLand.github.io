import { FiAward, FiMapPin } from "react-icons/fi";
import { education, educationHonors } from "@/content";
import GpaChart from "@/app/components/education/GpaChart";
import Reveal from "@/app/components/ui/Reveal";
import Section from "@/app/components/ui/Section";
import SpotlightCard from "@/app/components/ui/SpotlightCard";
import Tag from "@/app/components/ui/Tag";

export default function Education({ index }: { index?: number }) {
  return (
    <Section
      id="education"
      index={index}
      eyebrow="Education"
      title="The"
      accent="foundation"
      description="Two computer science degrees from RIT, with a consistent record term over term."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {education.map((d, i) => {
          const timeline =
            d.timeline ?? (d.terms.length ? `${d.terms[0].term} – ${d.terms[d.terms.length - 1].term}` : "");
          const avg = d.terms.length ? d.terms.reduce((s, t) => s + t.gpa, 0) / d.terms.length : null;
          return (
            <Reveal key={`${d.school}-${d.degree}`} delay={i * 120} className="h-full">
              <SpotlightCard as="article" className="flex h-full flex-col p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">{timeline}</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg">{d.degree}</h3>
                    <p className="mt-1 text-muted">{d.school}</p>
                    {d.location && (
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-faint">
                        <FiMapPin className="h-3.5 w-3.5" aria-hidden /> {d.location}
                      </p>
                    )}
                  </div>
                  {avg !== null && (
                    <div className="shrink-0 text-right">
                      <p className="text-gradient text-4xl font-semibold tracking-tight">{avg.toFixed(2)}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">avg. term GPA</p>
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

                <div className="mt-auto pt-8">
                  <GpaChart terms={d.terms} id={`gpa-${i}`} />
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>

      {educationHonors.length > 0 && (
        <Reveal delay={200}>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {educationHonors.map((h) => (
              <li
                key={h}
                className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-fg"
              >
                <FiAward className="h-4 w-4 text-cyan" aria-hidden /> {h}
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  );
}
