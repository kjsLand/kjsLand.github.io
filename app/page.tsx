import { papers, projects, socials } from "@/content";
import Background from "@/app/components/layout/Background";
import CommandPalette, { type PaletteItem } from "@/app/components/layout/CommandPalette";
import Footer from "@/app/components/layout/Footer";
import Navbar from "@/app/components/layout/Navbar";
import ScrollEffects from "@/app/components/layout/ScrollEffects";
import Hero from "@/app/sections/Hero";
import SkillMarquee from "@/app/sections/SkillMarquee";
import { sections } from "@/app/sections";
import { site } from "@/content";
import { pageNav } from "@/app/lib/nav";

export default function HomePage() {
  // Section numbering (01/02/03) and the ⌘K "Sections" group. The navbar itself only links pages (app/lib/nav.ts).
  const nav = sections.filter((s) => s.inNav !== false).map(({ id, label }) => ({ id, label }));

  // Everything in the ⌘K palette is generated from content, so there's nothing to keep in sync.
  const paletteItems: PaletteItem[] = [
    { label: "Top", group: "Sections", href: "#top" },
    ...nav.map((s) => ({ label: s.label, group: "Sections", href: `#${s.id}` })),
    { label: "Experience", group: "Pages", hint: "Every role", href: "/experience" },
    ...projects.map((p) => ({
      label: p.title,
      group: "Projects",
      hint: p.kind,
      href: (!p.private && (p.links?.live ?? p.links?.repo)) || "#projects",
      external: !p.private && Boolean(p.links?.live ?? p.links?.repo),
    })),
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
        href={`#${nav[0]?.id ?? "top"}`}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Background />
      <ScrollEffects />
      <Navbar items={pageNav} brand={site.name} current="home" />
      <CommandPalette items={paletteItems} />

      <main className="overflow-x-clip">
        <Hero />
        <SkillMarquee />
        {sections.map(({ id, Component, inNav }) => {
          // Only navigable sections get a 01/02/03 number.
          const n = nav.findIndex((s) => s.id === id);
          return <Component key={id} index={inNav === false ? undefined : n + 1} />;
        })}
      </main>

      <Footer />
    </>
  );
}
