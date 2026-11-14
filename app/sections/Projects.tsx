import { FiArrowUpRight, FiGithub, FiLock } from "react-icons/fi";
import { projects } from "@/content";
import ProjectCover from "@/app/components/projects/ProjectCover";
import Reveal from "@/app/components/ui/Reveal";
import SpotlightCard from "@/app/components/ui/SpotlightCard";
import Tag from "@/app/components/ui/Tag";

export default function Projects({ index }: { index?: number }) {
  return (
    <section id="projects" className="relative scroll-mt-24 pb-24 pt-8 md:pb-32 md:pt-12">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            {index !== undefined && <span className="text-gold">{String(index).padStart(2, "0")}</span>}
            <span className="h-px w-10 bg-accent-gradient" />
            Projects
            <span className="text-faint">· {projects.length}</span>
          </p>
        </Reveal>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 3) * 90} className="h-full">
              <SpotlightCard as="article" className="group flex h-full flex-col overflow-hidden">
                <div className="relative h-48">
                  <ProjectCover project={p} />
                  <div className="absolute left-4 top-4 flex gap-2">
                    <Tag className="border-white/15 bg-ink/50 text-fg backdrop-blur">{p.kind}</Tag>
                    {p.year && <Tag className="border-white/15 bg-ink/50 backdrop-blur">{p.year}</Tag>}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.description}</p>

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
          ))}
        </ul>
      </div>
    </section>
  );
}
