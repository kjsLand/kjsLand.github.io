"use client";

import { useEffect, useRef } from "react";

/**
 * One passive scroll listener for the whole site. It:
 *  - publishes `--scroll-y` on <html> (used by .parallax-* / .hero-scroll-away in globals.css)
 *  - drives the gradient reading-progress bar at the top of the page
 */
export default function ScrollEffects() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-y", String(Math.round(y)));
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
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
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px]">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-accent-gradient" />
    </div>
  );
}
