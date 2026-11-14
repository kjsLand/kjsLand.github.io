import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionProps = {
  id: string;
  /** Two-digit index shown in the eyebrow, e.g. 1 → "01". */
  index?: number;
  eyebrow: string;
  /** Plain text for the heading. */
  title: string;
  /** Optional word appended in serif italic in the gold accent. */
  accent?: string;
  description?: string;
  /** Huge outlined word that drifts behind the heading. Defaults to the eyebrow. */
  ghost?: string;
  children: ReactNode;
  className?: string;
};

/**
 * The shared wrapper for every page section: consistent spacing, an eyebrow with an index,
 * a heading with an accent word, and a drifting "ghost" word behind it.
 */
export default function Section({
  id,
  index,
  eyebrow,
  title,
  accent,
  description,
  ghost,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`relative py-24 md:py-36 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <header className="relative mb-14 md:mb-20">
          <div
            aria-hidden
            className="ghost-drift pointer-events-none absolute -top-10 left-0 -z-10 select-none whitespace-nowrap font-sans text-[18vw] font-bold leading-none tracking-tighter text-transparent opacity-60 md:-top-16 md:text-[11rem]"
            style={{ WebkitTextStroke: "1px rgb(255 237 203 / 0.05)" }}
          >
            {ghost ?? eyebrow}
          </div>

          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
              {index !== undefined && <span className="text-gold">{String(index).padStart(2, "0")}</span>}
              <span className="h-px w-10 bg-accent-dash" />
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-fg md:text-6xl">
              {title}
              {accent && (
                <>
                  {" "}
                  <span className="pr-1 font-serif font-normal italic text-gold">{accent}</span>
                </>
              )}
            </h2>
          </Reveal>
          {description && (
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-base text-muted md:text-lg">{description}</p>
            </Reveal>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
