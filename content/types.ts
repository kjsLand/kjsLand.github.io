/**
 * Shapes for every piece of content on the site.
 * You normally never need to touch this file. Edit the data files next to it instead.
 */

/** Month strings look like "May 2025". Use "Present" for an ongoing role. */
export type MonthYear = string;

export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  start: MonthYear;
  end: MonthYear | "Present";
  /** One bullet per entry. Keep each to one or two lines. */
  highlights: string[];
  tech?: string[];
};

export type GpaTerm = { term: string; gpa: number };

export type Degree = {
  degree: string;
  school: string;
  location?: string;
  /** Optional. If omitted, the range is built from the first and last term. */
  timeline?: string;
  terms: GpaTerm[];
  focus?: string[];
};

export type Project = {
  title: string;
  /** Short category label, e.g. "Chrome Extension". */
  kind: string;
  year?: number | string;
  description: string;
  tech?: string[];
  links?: { repo?: string; live?: string };
  /** Hides the repo button and shows a lock (e.g. until a paper is published). */
  private?: boolean;
  /** Not used by the current uniform grid; kept so a featured layout can come back without editing data. */
  featured?: boolean;
  /** Hue (0–360) used to generate the cover art when there's no image. */
  hue: number;
  /** Optional screenshot, e.g. "/projects/token-watcher.png" (place the file in /public/projects). */
  image?: string;
};

export type Paper = {
  title: string;
  authors: string[];
  year: number | string;
  status: string;
  venue?: string;
  abstract: string;
  tags?: string[];
  /** Only real URLs render. Leave a key out until the link exists. */
  links?: { paper?: string; pdf?: string; code?: string };
};

export type SkillGroup = { name: string; items: string[] };

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
  icon: "github" | "linkedin" | "email" | "medium" | "website" | "x";
};
