"use client";

import { useEffect, useState } from "react";

/** Types, pauses, and deletes each word in turn. Reduced motion shows the first word statically. */
export default function Typewriter({ words, className = "" }: { words: readonly string[]; className?: string }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const word = words[wordIndex];
    let delay = deleting ? 35 : 70;
    if (!deleting && text === word) delay = 2200;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words]);

  return (
    <span className={className}>
      {/* Screen readers get the full list once instead of a stream of letters. */}
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden>
        {text}
        <span className="ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.15em] animate-blink bg-cyan" />
      </span>
    </span>
  );
}
