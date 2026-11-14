import type { Project } from "./types";

/**
 * Projects, in the order they appear. Featured projects get wider tiles, and the
 * grid rebalances itself automatically no matter how many you add.
 *
 * Template:
 *   {
 *     title: "My Project",
 *     kind: "Web App",
 *     year: 2026,
 *     description: "One or two sentences on what it does and why it's interesting.",
 *     tech: ["Next.js", "PostgreSQL"],
 *     links: { repo: "https://github.com/kjsLand/...", live: "https://..." },
 *     hue: 200,            // 0–360, seeds the cover art (which palette color leads)
 *     featured: false,
 *     image: "/projects/my-project.png", // optional screenshot in /public/projects
 *   },
 */
export const projects: Project[] = [
  {
    title: "Token Watcher",
    kind: "Chrome Extension",
    description:
      "Counts the tokens of prompts, responses, and files when developing with browser LLM tools — something they don't support natively.",
    tech: ["JavaScript", "Chrome Extension", "LLM Tooling"],
    links: { repo: "https://github.com/kjsLand/token_watcher" },
    hue: 22,
    featured: true,
  },
  {
    title: "The Scribbler",
    kind: "Chrome Extension",
    description:
      "Finds the canvas in Jackbox's TKO browser game and draws any given image using only the colors the game allows.",
    tech: ["JavaScript", "Canvas", "Color Clamping"],
    links: { repo: "https://github.com/kjsLand/TheScribbler" },
    hue: 205,
  },
  {
    title: "Rate It",
    kind: "Python App",
    description:
      "Uses the Spotify API to let users store song ratings locally — the goal is to quickly build playlists and discover new artists.",
    tech: ["Python", "Spotify API", "Requests"],
    links: { repo: "https://github.com/kjsLand/rate_it" },
    hue: 145,
  },
  {
    title: "DQI SAT Solver",
    kind: "Research Project",
    description:
      "My master's capstone, exploring a quantum speedup for the SAT problem via Decoded Quantum Interferometry.",
    tech: ["Python", "Quantum Computing", "SAT"],
    links: { repo: "https://github.com/kjsLand/DQI_SAT_Solver" },
    private: true,
    hue: 320,
  },
  {
    title: "Vendorstub",
    kind: "Full-Stack Website",
    description:
      "A contract management platform MVP in active development, with a RAG system for working with contract documents.",
    tech: ["Next.js", "Tailwind CSS", "PostgreSQL", "AWS", "RAG"],
    links: { live: "https://vendorstub.com/" },
    hue: 45,
    featured: true,
  },
];
