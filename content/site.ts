import type { SocialLink } from "./types";

/**
 * Global info used across the site (hero, navbar, footer, contact, metadata).
 */
export const site = {
  name: "Kevin Land",
  firstName: "Kevin",
  /** Browser tab + search engine description. */
  description:
    "Kevin Land — software engineer working across full-stack development, AI, and quantum computing.",
  /** Small pill above the name in the hero. */
  kicker: "kevin.js.land@gmail.com",
  /** Cycles in the hero typewriter. Order matters: the first one shows first. */
  roles: [
    "Software Engineer",
    "Full-Stack Developer",
    "Integrations",
    "Information Retrieval",
  ],
  tagline:
    "Welcome to my area of the internet. Make yourself at home and click a bunch of links.",
  /**
   * Optional green "status" dot in the hero, e.g. "Open to new roles".
   * Leave as undefined to hide it.
   */
  availability: undefined as string | undefined,
  /** Optional: drop a PDF in /public and set this to "/resume.pdf" to show a Résumé button. */
  resumeUrl: undefined as string | undefined,
  email: "kevin.js.land@gmail.com",
} as const;

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    handle: "github.com/kjsLand",
    href: "https://github.com/kjsLand",
    icon: "github",
  },
  {
    label: "LinkedIn",
    handle: "in/kevin-land-401b88250",
    href: "https://www.linkedin.com/in/kevin-land-401b88250",
    icon: "linkedin",
  },
  {
    label: "Blog",
    handle: "@kevin_docs",
    href: "https://medium.com/@kevin_docs",
    icon: "medium",
  },
];
