"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type YearGroup = { year: string; content: ReactNode };

/**
 * Vertical "journey" timeline: a sticky year + node on the left, that year's entries on the right,
 * and a dashed rail whose striped fill grows as you scroll. Years light up once the fill reaches them.
 *
 * Progress runs from "container top at 10% of the viewport" to "container bottom at 50%",
 * so the fill always reaches the last node before the timeline scrolls away.
 */
export default function YearTimeline({ groups }: { groups: YearGroup[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const rail = railRef.current;
    const fill = fillRef.current;
    if (!wrap || !rail || !fill) return;
    const rows = Array.from(wrap.querySelectorAll<HTMLElement>("[data-yt-row]"));

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const r = wrap.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (vh * 0.1 - r.top) / Math.max(1, r.height - vh * 0.4)));
      const h = rail.offsetHeight * p;
      fill.style.height = `${h}px`;
      fill.style.opacity = String(Math.min(1, p * 10));

      // A year is "reached" once the fill's leading edge passes its node.
      const edge = r.top + h;
      rows.forEach((row) => {
        const node = row.querySelector<HTMLElement>("[data-yt-node]");
        if (node) row.toggleAttribute("data-active", node.getBoundingClientRect().top + 20 <= edge);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const ro = new ResizeObserver(onScroll);
    ro.observe(wrap);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative pb-10">
      {groups.map((g) => (
        <div key={g.year} data-yt-row className="group flex justify-start pt-10 md:gap-10 md:pt-32 first:md:pt-10">
          {/* Sticky year + node */}
          <div className="sticky top-32 z-20 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
            <div
              data-yt-node
              className="absolute left-3 grid h-10 w-10 place-items-center rounded-full bg-ink"
            >
              <span className="h-4 w-4 rounded-full border border-line bg-ink-2 transition-all duration-500 group-data-active:border-gold/70 group-data-active:bg-gold group-data-active:shadow-[0_0_16px_rgb(222_160_30/0.7)]" />
            </div>
            <h3 className="hidden font-heading text-5xl font-bold tracking-tight text-faint transition-colors duration-500 group-data-active:text-fg md:block md:pl-20">
              {g.year}
            </h3>
          </div>

          {/* Entries for that year */}
          <div className="relative w-full pl-20 pr-1 md:pl-4">
            <h3 className="mb-4 block font-heading text-2xl font-bold text-faint transition-colors duration-500 group-data-active:text-fg md:hidden">
              {g.year}
            </h3>
            {g.content}
          </div>
        </div>
      ))}

      {/* The rail: a dashed track, with a striped fill that follows scroll. */}
      <div
        ref={railRef}
        aria-hidden
        className="absolute left-[31px] top-0 h-full w-[2px] overflow-hidden border-l-2 border-dashed border-line"
      >
        <div
          ref={fillRef}
          className="absolute inset-x-0 top-0 h-0 w-[2px] -ml-[2px] bg-accent-stripes opacity-0"
        />
      </div>
    </div>
  );
}
