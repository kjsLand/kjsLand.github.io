import type { SkillGroup } from "./types";

/**
 * Skills, grouped. Add a string to any group (or add a new group) and it shows
 * up in the Skills section, the hero marquee, and the ⌘K palette.
 *
 * Brand icons are matched by name in app/components/ui/SkillIcon.tsx. Unknown
 * skills get a neutral dot, so nothing breaks.
 */
export const skills: SkillGroup[] = [
  {
    name: "Languages",
    items: ["Python", "JavaScript", "C++", "SQL"],
  },
  {
    name: "Web & Cloud",
    items: ["Next.js", "React", "Tailwind CSS", "HTML", "CSS", "PostgreSQL", "AWS", "FastAPI"],
  },
  {
    name: "Tools & Practices",
    items: ["Git", "GitHub Actions", "CI/CD", "Selenium", "Jupyter Notebooks", "Agile"],
  },
];
