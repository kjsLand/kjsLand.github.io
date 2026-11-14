import type { CSSProperties } from "react";

/**
 * Splits text into letters that rise in with a stagger. CSS only, no JS.
 * Screen readers get the plain string through aria-label.
 *
 * `gradient`: background-clip:text doesn't reach transformed children, so each letter
 * gets its own slice of one wide gradient. That reads as a single continuous gradient.
 */
export default function SplitText({
  text,
  className = "",
  offset = 0,
  gradient = false,
}: {
  text: string;
  className?: string;
  offset?: number;
  gradient?: boolean;
}) {
  const chars = Array.from(text);
  const n = chars.length;
  return (
    <span aria-label={text} role="text" className={className}>
      {chars.map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className={`split-char ${gradient ? "text-gradient" : ""}`}
          style={
            {
              "--i": i + offset,
              ...(gradient && {
                backgroundSize: `${n * 100}% 100%`,
                backgroundPosition: `${n > 1 ? (i / (n - 1)) * 100 : 0}% 0`,
                paddingRight: "0.06em",
                marginRight: "-0.06em",
              }),
            } as CSSProperties
          }
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
