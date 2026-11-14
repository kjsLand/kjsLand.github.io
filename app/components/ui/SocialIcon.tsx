import { FiGithub, FiGlobe, FiLinkedin, FiMail } from "react-icons/fi";
import { SiMedium, SiX } from "react-icons/si";
import type { SocialLink } from "@/content";

const map = {
  github: FiGithub,
  linkedin: FiLinkedin,
  email: FiMail,
  medium: SiMedium,
  website: FiGlobe,
  x: SiX,
} as const;

export default function SocialIcon({ icon, className = "h-5 w-5" }: { icon: SocialLink["icon"]; className?: string }) {
  const Icon = map[icon];
  return <Icon aria-hidden className={className} />;
}
