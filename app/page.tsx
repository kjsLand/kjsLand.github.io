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

export default function HomePage() {
  const nav = sections.filter((s) => s.inNav !== false).map(({ id, label }) => ({ id, label }));

  // Everything in the ⌘K palette is generated from content, so there's nothing to keep in sync.
  const paletteItems: PaletteItem[] = [
    { label: "Top", group: "Sections", href: "#top" },
    ...nav.map((s) => ({ label: s.label, group: "Sections", href: `#${s.id}` })),
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
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Background />
      <ScrollEffects />
      <Navbar items={nav} brand={site.name} />
      <CommandPalette items={paletteItems} />

      <main className="overflow-x-clip">
        <Hero />
        <SkillMarquee />
        {sections.map(({ id, Component }, i) => (
          <Component key={id} index={i + 1} />
        ))}
      </main>

      <Footer />
    </>
  );
}
