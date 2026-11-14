import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  tone?: "default" | "accent" | "gold";
  className?: string;
};

const tones = {
  default: "border-line bg-white/[0.03] text-muted",
  accent: "border-steel-light/30 bg-steel/25 text-steel-light",
  gold: "border-gold/30 bg-gold/10 text-gold",
};

/** A small mono "chip" for tech, tags, and statuses. */
export default function Tag({ children, tone = "default", className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
