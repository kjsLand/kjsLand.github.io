import type { IconType } from "react-icons";
import {
  SiAmazonwebservices,
  SiCplusplus,
  SiCss3,
  SiFastapi,
  SiGit,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiJupyter,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSelenium,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FiCode, FiDatabase, FiGitPullRequest, FiUsers } from "react-icons/fi";

/**
 * Maps a skill name (case-insensitive) to an icon.
 * Add new ones here, and browse https://react-icons.github.io/react-icons/icons/si/ for brand icons.
 */
const icons: Record<string, IconType> = {
  python: SiPython,
  javascript: SiJavascript,
  typescript: SiTypescript,
  "c++": SiCplusplus,
  sql: FiDatabase,
  "next.js": SiNextdotjs,
  react: SiReact,
  "tailwind css": SiTailwindcss,
  html: SiHtml5,
  css: SiCss3,
  postgresql: SiPostgresql,
  aws: SiAmazonwebservices,
  fastapi: SiFastapi,
  git: SiGit,
  "github actions": SiGithubactions,
  "ci/cd": FiGitPullRequest,
  selenium: SiSelenium,
  "jupyter notebooks": SiJupyter,
  agile: FiUsers,
};

export default function SkillIcon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const Icon = icons[name.toLowerCase()] ?? FiCode;
  return <Icon aria-hidden className={className} />;
}
