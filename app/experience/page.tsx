import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft, FiArrowUpRight, FiMail } from "react-icons/fi";
import { experience, papers, site, socials, type Experience } from "@/content";
import { duration, monthNumber, pad2 } from "@/app/lib/format";
import { sections } from "@/app/sections";
import { pageNav } from "@/app/lib/nav";
import CommandPalette, { type PaletteItem } from "@/app/components/layout/CommandPalette";
import Footer from "@/app/components/layout/Footer";
import Navbar from "@/app/components/layout/Navbar";
import ScrollEffects from "@/app/components/layout/ScrollEffects";
import EducationAndPapers from "@/app/components/experience/EducationAndPapers";
import ProjectCover from "@/app/components/projects/ProjectCover";
import Reveal from "@/app/components/ui/Reveal";
import Tag from "@/app/components/ui/Tag";

export const metadata: Metadata = {
  title: `Experience — ${site.name}`,
  description: `Where ${site.firstName} has worked and studied: every role, start to finish.`,
};

/** Stable 0–360 hue from a name, so each company gets its own cover art. */
function hueFor(name: string) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 360;
  return h;
}

const domainOf = (url?: string) => (url ? url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : undefined);
const yearOf = (s: string) => Math.floor((monthNumber(s) ?? 0) / 12);

export default function ExperiencePage() {
  const homeNav = sections.filter((s) => s.inNav !== false);
  const paletteItems: PaletteItem[] = [
    { label: "Home", group: "Pages", href: "/" },
    { label: "Experience", group: "Pages", href: "#top" },
    ...homeNav.map((s) => ({ label: s.label, group: "Home sections", href: `/#${s.id}` })),
    ...experience.map((j, i) => ({ label: j.company, group: "Roles", hint: j.role, href: `#role-${i + 1}` })),
    { label: "Education", group: "Sections", href: "#education" },
    ...papers.map((p) => ({ label: p.title, group: "Papers", hint: String(p.year), href: "#papers" })),
    ...socials.map((s) => ({
      label: s.label,
      group: "Links",
      hint: s.handle,
      href: s.href,
      external: s.icon !== "email",
    })),
  ];

  return (
    <>
      <a
        href="#roles"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <ScrollEffects />
      <Navbar items={pageNav} brand={site.name} brandHref="/" current="experience" />
      <CommandPalette items={paletteItems} />

      <main className="overflow-x-clip">
        {/* ── Intro ─────────────────────────────────────────────── */}
        <header id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-48">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
              <span className="h-px w-10 bg-line" />
              Experience
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-fg md:text-7xl">
              Where I&apos;ve worked,{" "}
              <span className="pr-1 font-serif font-normal italic text-gold">what I&apos;ve built.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
              From test automation and data pipelines to quantum algorithms research, and now product development
              at {experience[0]?.company}.
            </p>
          </Reveal>
        </header>

        {/* ── Roles (alternating, project-showcase style) ───────── */}
        <section id="roles" aria-label="Roles" className="mx-auto max-w-6xl space-y-28 px-5 md:space-y-40 md:px-8">
          {experience.map((job, i) => (
            <RoleRow key={`${job.company}-${job.role}`} job={job} index={i} />
          ))}
        </section>

        {/* ── Education + papers, side by side ──────────────────── */}
        <EducationAndPapers />

        {/* ── Outro ─────────────────────────────────────────────── */}
        <section className="mx-auto mt-32 flex max-w-6xl flex-col items-start justify-between gap-6 px-5 pb-28 md:mt-48 md:flex-row md:items-center md:px-8">
          <p className="max-w-lg text-2xl font-semibold tracking-tight text-fg md:text-3xl">
            Want the rest of the story? <span className="text-muted">Projects live on the home page.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#projects"
              className="flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-fg transition-colors hover:border-white/25"
            >
              <FiArrowLeft className="h-4 w-4" aria-hidden /> Back to home
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              <FiMail className="h-4 w-4" aria-hidden /> Get in touch
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/** One role: browser-window cover on one side, details on the other, alternating sides. */
function RoleRow({ job, index }: { job: Experience; index: number }) {
  const current = job.end === "Present";
  const domain = domainOf(job.companyUrl);
  const span = duration(job.start, job.end);
  const flip = index % 2 === 1;

  return (
    <article id={`role-${index + 1}`} className="grid scroll-mt-28 items-center gap-10 md:grid-cols-2 md:gap-16">
      <Reveal className={flip ? "md:order-2" : ""}>
        <div className="group overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)]">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="ml-3 truncate font-mono text-[11px] text-faint">
              {domain ?? job.company.toLowerCase().replace(/\s+/g, "")}
            </span>
          </div>
          <div className="relative aspect-[16/10]">
            <ProjectCover project={{ title: job.company, hue: hueFor(job.company) }} />
            <div className="absolute left-6 top-6 right-6 md:left-8 md:top-8">
              <p className="font-heading text-3xl font-bold tracking-tight text-fg md:text-4xl">{job.company}</p>
              <p className="mt-1 h-0.5 w-12 rounded-full bg-gold/80" />
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-cream/70">{job.role}</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <p className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.12em]">
          <span className="text-gold">{pad2(index + 1)}</span>
          <span className="text-muted">{yearOf(job.start)}</span>
          <span className="h-px w-8 bg-line" />
          {current ? (
            <span className="flex items-center gap-2 text-gold">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              Current role
            </span>
          ) : (
            <span className="text-faint">Completed</span>
          )}
        </p>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-fg md:text-4xl">{job.role}</h2>
        <p className="mt-2 font-mono text-sm text-muted">
          {job.company}
          {job.location && <span className="text-faint"> · {job.location}</span>}
        </p>

        <ul className="mt-6 space-y-3">
          {job.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-muted md:text-base">
              <span aria-hidden className="mt-[0.65em] h-1 w-3 shrink-0 bg-accent-dash" />
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

        <div className="mt-7 flex flex-wrap items-end gap-x-8 gap-y-3">
          <p className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-fg">{job.start}</span>
            <span className="text-sm text-faint">→ {job.end}</span>
          </p>
          {span && (
            <p className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight text-fg">{span}</span>
              <span className="text-sm text-faint">{current ? "so far" : "total"}</span>
            </p>
          )}
        </div>

        {job.companyUrl && (
          <a
            href={job.companyUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm text-gold transition-opacity hover:opacity-80"
          >
            {domain} <FiArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        )}
      </Reveal>
    </article>
  );
}
