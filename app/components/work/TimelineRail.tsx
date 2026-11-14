"use client";

import { useEffect, useRef } from "react";

/**
 * The vertical rail of the work timeline. Its fill grows with scroll so
 * it "draws" down as you read. It sits in the parent's coordinate space.
 */
export default function TimelineRail() {
  const fillRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const fill = fillRef.current;
    if (!rail || !fill) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.style.transform = "scaleY(1)";
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = rail.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const p = Math.max(0, Math.min(1, (anchor - r.top) / r.height));
      fill.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={railRef} aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px border-l border-dashed border-line md:left-[calc(13rem+7px)]">
      <div
        ref={fillRef}
        className="h-full w-full origin-top scale-y-0 bg-gold"
      />
    </div>
  );
}
