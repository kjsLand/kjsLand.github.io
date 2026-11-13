"use client";

import { useEffect, useRef } from "react";

/**
 * A halftone dot field showing the interference of two circular waves:
 *   amplitude = sin(k·r₁ − ωt) + sin(k·r₂ − ωt)
 * Dot size follows intensity (amplitude²). One source follows the cursor, the other orbits.
 * A nod to Decoded Quantum *Interferometry*.
 *
 * Performance: dots are bucketed by size and color into a handful of Path2D fills per frame.
 * The loop pauses when the hero is offscreen or the tab is hidden, and reduced motion
 * renders one still frame.
 */
const SPACING = 18; // px between dots
const WAVELENGTH = 84; // px
const SPEED = 1.5; // rad/s
const LEVELS = 7; // size buckets

export default function InterferenceField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let visible = true;
    const k = (2 * Math.PI) / WAVELENGTH;

    // Cursor-following source, eased toward its target.
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, active: false };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!mouse.active) {
        mouse.x = mouse.tx = w * 0.3;
        mouse.y = mouse.ty = h * 0.45;
      }
    }

    function draw(t: number) {
      const time = t / 1000;
      // Source B orbits slowly on the right. Source A follows the cursor, or orbits on the left when idle.
      const bx = w * 0.72 + Math.cos(time * 0.25) * w * 0.08;
      const by = h * 0.5 + Math.sin(time * 0.31) * h * 0.12;
      if (!mouse.active) {
        mouse.tx = w * 0.28 + Math.sin(time * 0.2) * w * 0.06;
        mouse.ty = h * 0.45 + Math.cos(time * 0.27) * h * 0.1;
      }
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      const phase = time * SPEED;
      const pos: Path2D[] = Array.from({ length: LEVELS }, () => new Path2D());
      const neg: Path2D[] = Array.from({ length: LEVELS }, () => new Path2D());

      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      const ox = (w - (cols - 1) * SPACING) / 2;
      const oy = (h - (rows - 1) * SPACING) / 2;

      for (let j = 0; j < rows; j++) {
        const y = oy + j * SPACING;
        for (let i = 0; i < cols; i++) {
          const x = ox + i * SPACING;
          const r1 = Math.hypot(x - mouse.x, y - mouse.y);
          const r2 = Math.hypot(x - bx, y - by);
          const amp = (Math.sin(k * r1 - phase) + Math.sin(k * r2 - phase)) / 2; // −1..1
          const intensity = amp * amp;
          const level = Math.min(LEVELS - 1, Math.floor(intensity * LEVELS));
          const radius = 0.7 + (level / (LEVELS - 1)) * 2.6;
          const path = amp >= 0 ? pos[level] : neg[level];
          path.moveTo(x + radius, y);
          path.arc(x, y, radius, 0, Math.PI * 2);
        }
      }

      ctx!.clearRect(0, 0, w, h);
      for (let l = 0; l < LEVELS; l++) {
        const a = 0.1 + Math.pow(l / (LEVELS - 1), 1.4) * 0.85;
        ctx!.fillStyle = `rgba(34, 211, 238, ${a})`; // cyan crests
        ctx!.fill(pos[l]);
        ctx!.fillStyle = `rgba(139, 92, 246, ${a})`; // violet troughs
        ctx!.fill(neg[l]);
      }
    }

    function loop(t: number) {
      draw(t);
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (mouse.active) {
        mouse.tx = x;
        mouse.ty = y;
      }
    };
    const onLeave = () => (mouse.active = false);
    const onVisibility = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    resize();
    draw(4000); // first paint (also the static frame for reduced motion)
    start();

    if (!reduced) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />;
}
