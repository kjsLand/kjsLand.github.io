import { FiArrowUpRight, FiGithub, FiLock } from "react-icons/fi";
import { projects, socials, type Project } from "@/content";
import ProjectCover from "@/app/components/projects/ProjectCover";
import Reveal from "@/app/components/ui/Reveal";
import Section from "@/app/components/ui/Section";
import SpotlightCard from "@/app/components/ui/SpotlightCard";
import Tag from "@/app/components/ui/Tag";

/**
 * Bento layout on a 6-column grid. Featured projects want 4 columns and the rest want 2.
 * When an item doesn't fit, the previous tile stretches to close the row,
 * so rows are always full however many projects there are.
 */
function bentoSpans(list: Project[]): number[] {
  const spans: number[] = [];
  let used = 0;
  list.forEach((p) => {
    const want = p.featured ? 4 : 2;
    if (used + want > 6) {
      spans[spans.length - 1] += 6 - used;
      used = 0;
    }
    spans.push(want);
    used = (used + want) % 6;
  });
  if (used !== 0 && spans.length) spans[spans.length - 1] += 6 - used;
  return spans;
}

const spanClass: Record<number, string> = {
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  6: "md:col-span-6",
};

export default function Projects({ index }: { index?: number }) {
  const spans = bentoSpans(projects);
  const github = socials.find((s) => s.icon === "github");

  return (
    <Section
      id="projects"
      index={index}
      eyebrow="Projects"
      title="Things I've"
      accent="built"
      description="Side projects, tools, and research code where design meets functionality."
    >
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-6">
        {projects.map((p, i) => {
          const wide = spans[i] >= 4;
          return (
            <Reveal as="li" key={p.title} delay={(i % 3) * 90} className={`${spanClass[spans[i]] ?? ""} h-full`}>
              <SpotlightCard as="article" className="group flex h-full flex-col overflow-hidden">
                <div className={`relative ${wide ? "h-56 md:h-72" : "h-48 md:h-56"}`}>
                  <ProjectCover project={p} />
                  <div className="absolute left-4 top-4 flex gap-2">
                    <Tag className="border-white/15 bg-ink/50 text-fg backdrop-blur">{p.kind}</Tag>
                    {p.year && <Tag className="border-white/15 bg-ink/50 backdrop-blur">{p.year}</Tag>}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">{p.title}</h3>
                  <p className={`mt-3 text-[15px] leading-relaxed text-muted ${wide ? "max-w-xl" : ""}`}>{p.description}</p>

                  {p.tech && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                    {p.links?.live && (
                      <a
                        href={p.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
                      >
                        Visit site <FiArrowUpRight aria-hidden />
                      </a>
                    )}
                    {p.links?.repo && !p.private && (
                      <a
                        href={p.links.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-fg transition-colors hover:border-white/25 hover:bg-white/[0.05]"
                      >
                        <FiGithub aria-hidden /> Source
                      </a>
                    )}
                    {p.private && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line px-4 py-2 font-mono text-xs text-faint">
                        <FiLock aria-hidden /> Repo private until publication
                      </span>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </ul>

      {github && (
        <Reveal delay={150}>
          <p className="mt-10 text-center">
            <a
              href={github.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-fg"
            >
              More on GitHub
              <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </p>
        </Reveal>
      )}
    </Section>
  );
}
