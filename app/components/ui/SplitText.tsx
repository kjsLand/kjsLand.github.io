import type { CSSProperties } from "react";

/**
 * Splits text into letters that rise in with a stagger. CSS only, no JS.
 * Screen readers get the plain string through aria-label.
 * Color it with `className` (e.g. "text-gold"); the letters inherit it.
 */
export default function SplitText({
  text,
  className = "",
  offset = 0,
}: {
  text: string;
  className?: string;
  offset?: number;
}) {
  return (
    <span aria-label={text} role="text" className={className}>
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden className="split-char" style={{ "--i": i + offset } as CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
