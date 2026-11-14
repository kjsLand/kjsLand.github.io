import type { ComponentType } from "react";
import Work from "./Work";
import Education from "./Education";
import Projects from "./Projects";
import Papers from "./Papers";
import Skills from "./Skills";
import Contact from "./Contact";

/**
 * Section registry: the single place that controls page order, navbar links,
 * the ⌘K palette's "Sections" group, and the 01/02/03 numbering.
 *
 * To add a new section (e.g. "Talks"):
 *   1. Create app/sections/Talks.tsx (copy Skills.tsx as a starting point; wrap it in <Section id="talks" …>).
 *   2. Import it above and add { id: "talks", label: "Talks", Component: Talks } where you want it.
 * To hide a section, comment out its line.
 */
export type SectionEntry = {
  id: string;
  label: string;
  Component: ComponentType<{ index?: number }>;
  /** Set false to keep a section on the page but out of the navbar. */
  inNav?: boolean;
};

export const sections: SectionEntry[] = [
  { id: "work", label: "Work", Component: Work },
  { id: "education", label: "Education", Component: Education },
  { id: "projects", label: "Projects", Component: Projects },
  { id: "papers", label: "Papers", Component: Papers },
  { id: "skills", label: "Skills", Component: Skills },
  { id: "contact", label: "Contact", Component: Contact },
];
