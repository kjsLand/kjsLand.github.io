"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollTimelineProps = {
  /** The timeline stops, each marked with `data-tl-item` and containing a `data-tl-node`. */
  children: ReactNode;
  count: number;
  /** Start year per stop, shown big in the background as you move through. */
  years: number[];
};

const PINNED_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

/**
 * A horizontal timeline you move through by scrolling.
 *
 * Desktop: the section pins to the viewport and vertical scroll slides the track sideways.
 * Mobile / reduced motion: a plain swipeable row with scroll snapping (also the no-JS state).
 * Either way, stops light up as they pass ~55% across the viewport and the rail fills behind them.
 */
export default function ScrollTimeline({ children, count, years }: ScrollTimelineProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  /** How far the track travels sideways. 0 means "not pinned" (swipe mode). */
  const [distance, setDistance] = useState(0);
  const pinned = distance > 0;

  // Measure how far the track needs to travel, and whether to pin at all.
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const mq = window.matchMedia(PINNED_QUERY);
    const measure = () => setDistance(mq.matches ? Math.max(0, track.scrollWidth - viewport.clientWidth) : 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(viewport);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Scroll → track position, active stops, rail fill, counter, and year.
  useEffect(() => {
    const outer = outerRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!outer || !viewport || !track || !fill) return;
    const items = Array.from(track.querySelectorAll<HTMLElement>("[data-tl-item]"));
    const rail = track.querySelector<HTMLElement>("[data-tl-rail]");

    let raf = 0;
    const update = () => {
      raf = 0;
      if (pinned) {
        const r = outer.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, -r.top / (r.height - window.innerHeight)));
        track.style.transform = `translate3d(${-p * distance}px,0,0)`;
      } else {
        track.style.transform = "";
      }

      const v = viewport.getBoundingClientRect();
      const anchor = v.left + v.width * 0.55;
      let last = 0;
      items.forEach((item, i) => {
        const node = item.querySelector("[data-tl-node]") ?? item;
        const on = i === 0 || node.getBoundingClientRect().left < anchor;
        item.toggleAttribute("data-active", on);
        if (on) last = i;
      });
      if (rail) {
        const rr = rail.getBoundingClientRect();
        fill.style.transform = `scaleX(${Math.max(0, Math.min(1, (anchor - rr.left) / rr.width))})`;
      }
      if (counterRef.current) counterRef.current.textContent = String(last + 1).padStart(2, "0");
      if (yearRef.current) yearRef.current.textContent = String(years[last] ?? "");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    // Keyboard users: tabbing into an off-screen stop scrolls the page so it slides into view.
    const onFocus = (e: FocusEvent) => {
      if (!pinned) return;
      const item = (e.target as HTMLElement).closest<HTMLElement>("[data-tl-item]");
      if (!item) return;
      const p = Math.max(0, Math.min(1, (item.offsetLeft - viewport.clientWidth * 0.25) / distance));
      const top = outer.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + p * (outer.offsetHeight - window.innerHeight), behavior: "instant" });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    viewport.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("focusin", onFocus);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      viewport.removeEventListener("scroll", onScroll);
      track.removeEventListener("focusin", onFocus);
      cancelAnimationFrame(raf);
    };
  }, [pinned, distance, years]);

  return (
    // Full-bleed: break out of the section's max-width container.
    <div
      ref={outerRef}
      className="relative mx-[calc(50%-50vw)]"
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div
        ref={viewportRef}
        className={
          pinned
            ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-16"
            : "snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        }
      >
        {/* Big outlined year that follows the active stop. */}
        <span
          ref={yearRef}
          aria-hidden
          className="pointer-events-none absolute right-[4vw] top-1/2 -z-10 hidden -translate-y-1/2 select-none font-heading text-[clamp(8rem,22vw,20rem)] font-bold leading-none tracking-tighter text-transparent md:block"
          style={{ WebkitTextStroke: "1px rgb(255 237 203 / 0.045)" }}
        >
          {years[0]}
        </span>

        <div
          ref={trackRef}
          className="relative flex w-max items-start gap-6 px-[max(1.25rem,calc((100vw-72rem)/2+2rem))] will-change-transform md:gap-10"
        >
          {/* The rail runs behind every node; the fill grows as stops become active. */}
          <div data-tl-rail aria-hidden className="absolute inset-x-0 top-[calc(2.5rem+7px)] h-px bg-line">
            <div
              ref={fillRef}
              className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-steel-light via-gold to-gold shadow-[0_0_12px_rgb(222_160_30/0.5)]"
            />
          </div>
          {children}
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-6xl items-center justify-between px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-faint md:px-8">
          <p>
            <span ref={counterRef} className="text-gold">
              01
            </span>{" "}
            / {String(count).padStart(2, "0")}
          </p>
          <p aria-hidden>{pinned ? "Scroll" : "Swipe"} →</p>
        </div>
      </div>
    </div>
  );
}
