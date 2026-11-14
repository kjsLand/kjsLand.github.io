import type { Project } from "./types";

/**
 * Projects, in the order they appear in the home page grid (every tile is the same size).
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
 *     image: "/projects/my-project.png", // optional image in /public/projects (screenshot or illustration, ~2:1)
 *   },
 */
export const projects: Project[] = [
  {
    title: "Token Watcher",
    kind: "Chrome Extension",
    description:
      "A side panel that counts the tokens in prompts, responses, and attached or downloaded files on Claude, ChatGPT, Gemini, and DeepSeek — numbers the chat apps don't show on free and pro plans.",
    tech: ["JavaScript", "Chrome MV3", "tiktoken (WASM)", "JSZip"],
    links: {
      repo: "https://github.com/kjsLand/token_watcher",
      live: "https://chromewebstore.google.com/detail/llm-token-watcher/pmojbcgdepabgeiedlibmolidajjclkm",
    },
    hue: 22,
    image: "/projects/token-watcher.svg",
    featured: true,
  },
  {
    title: "Algo-Rythm",
    kind: "Desktop App & Plugin",
    description:
      "Generates song starters — chord progressions, guitar voicings, strum patterns, and a hook — and exports them as MIDI, tab, or MusicXML to give producers a jumping-off point for a beat. Runs as a desktop app, a CLI, and a VST3/AU plugin.",
    tech: ["C++17", "JUCE", "CMake", "MIDI", "Python"],
    links: { repo: "https://github.com/kjsLand/Algo-Rythm" },
    hue: 270,
    image: "/projects/algo-rythm.svg",
    featured: true,
  },
  {
    title: "The Scribbler",
    kind: "Chrome Extension",
    description:
      "Turns any image into a Jackbox TKO drawing: it finds the game's canvas, matches each pixel to the nearest color the game allows, and draws it for you.",
    tech: ["JavaScript", "Chrome Extension", "Canvas", "Color Matching"],
    links: {
      repo: "https://github.com/kjsLand/TheScribbler",
      live: "https://chromewebstore.google.com/detail/leanngcjjmeiaghmgpmkhabfledidong",
    },
    hue: 205,
    image: "/projects/the-scribbler.svg",
  },
  {
    title: "Rate It",
    kind: "Desktop & Mobile App",
    description:
      "Rate songs from your Spotify library, keep each rating's history, and build playlists and discover artists from them. Being rebuilt with Tauri 2 as one app for macOS, Windows, Linux, iOS, and Android.",
    tech: ["Rust", "TypeScript", "React", "Tauri 2", "SQLite", "Spotify API"],
    links: { repo: "https://github.com/kjsLand/rate_it" },
    hue: 145,
    image: "/projects/rate-it.svg",
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
    image: "/projects/dqi-sat-solver.svg",
  },
];
