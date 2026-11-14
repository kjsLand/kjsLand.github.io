"use client";

import { useEffect, useRef } from "react";

/**
 * A grid of dim steel-grey digits with slow "digital rain" running through it.
 * Moving the cursor over the grid lights nearby digits up gold; the glow fades out behind it.
 *
 * Performance: cells are bucketed by color so each frame is a few dozen fillStyle changes,
 * not thousands. The loop pauses when the hero is offscreen or the tab is hidden.
 * Reduced motion turns the rain off but keeps the (user-driven) hover glow.
 */
const CELL_W = 18; // px
const CELL_H = 22; // px
const FONT_SIZE = 13; // px
const HOVER_RADIUS = 110; // px
const GLOW_DECAY = 0.93; // per frame
const RAIN_DECAY = 0.955; // per frame
const RAIN_LEVELS = 6;
const GLOW_LEVELS = 10;

// Steel-grey base → brighter for the rain trail (a lighter tint of #3f5470).
const BASE_ALPHA = 0.16;
const RAIN_ALPHA = 0.45;
const GREY = [128, 146, 172] as const;
// Hover glow: gold (#dea01e), with the hottest cells warming toward cream (#ffedcb).
const GOLD = [222, 160, 30] as const;
const CREAM = [255, 237, 203] as const;

export default function MatrixField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fontFamily =
      getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim() || "monospace";

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let ox = 0;
    let oy = 0;
    let raf = 0;
    let running = false;
    let visible = true;

    let digits = new Uint8Array(0);
    let glow = new Float32Array(0);
    let rain = new Float32Array(0);
    // One falling "head" per column: its row (fractional) and speed in rows/frame.
    let heads = new Float32Array(0);
    let speeds = new Float32Array(0);

    const last = { x: 0, y: 0, has: false };

    // Precomputed fill colors per (rain level, glow level).
    const colors: string[] = [];
    for (let g = 0; g < GLOW_LEVELS; g++) {
      for (let r = 0; r < RAIN_LEVELS; r++) {
        const gt = g / (GLOW_LEVELS - 1);
        const rt = r / (RAIN_LEVELS - 1);
        const greyA = BASE_ALPHA + rt * (RAIN_ALPHA - BASE_ALPHA);
        const a = greyA + (1 - greyA) * gt;
        const toGold = Math.min(1, gt * 1.4);
        const toCream = Math.max(0, (gt - 0.8) / 0.2) * 0.6;
        const c = GREY.map((v, i) => {
          const gold = v + (GOLD[i] - v) * toGold;
          return Math.round(gold + (CREAM[i] - gold) * toCream);
        });
        colors.push(`rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a.toFixed(3)})`);
      }
    }
    const buckets: number[][] = colors.map(() => []);

    function randomHead() {
      return -Math.random() * rows * 1.5;
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / CELL_W) + 1;
      rows = Math.ceil(h / CELL_H) + 1;
      ox = (w - (cols - 1) * CELL_W) / 2;
      oy = (h - (rows - 1) * CELL_H) / 2;

      const n = cols * rows;
      digits = new Uint8Array(n);
      for (let i = 0; i < n; i++) digits[i] = (Math.random() * 10) | 0;
      glow = new Float32Array(n);
      rain = new Float32Array(n);
      heads = new Float32Array(cols);
      speeds = new Float32Array(cols);
      for (let c = 0; c < cols; c++) {
        heads[c] = Math.random() * rows * 2 - rows;
        speeds[c] = 0.08 + Math.random() * 0.14;
      }
    }

    /** Light up cells around (x, y). */
    function splash(x: number, y: number) {
      const c0 = Math.max(0, Math.floor((x - ox - HOVER_RADIUS) / CELL_W));
      const c1 = Math.min(cols - 1, Math.ceil((x - ox + HOVER_RADIUS) / CELL_W));
      const r0 = Math.max(0, Math.floor((y - oy - HOVER_RADIUS) / CELL_H));
      const r1 = Math.min(rows - 1, Math.ceil((y - oy + HOVER_RADIUS) / CELL_H));
      for (let r = r0; r <= r1; r++) {
        const cy = oy + r * CELL_H;
        for (let c = c0; c <= c1; c++) {
          const d = Math.hypot(ox + c * CELL_W - x, cy - y) / HOVER_RADIUS;
          if (d >= 1) continue;
          const v = (1 - d) * (1 - d);
          const i = r * cols + c;
          if (v > glow[i]) {
            // Digits flip as the glow first reaches them.
            if (glow[i] < 0.15 && v > 0.3) digits[i] = (Math.random() * 10) | 0;
            glow[i] = v;
          }
        }
      }
    }

    function step() {
      const n = glow.length;
      for (let i = 0; i < n; i++) {
        glow[i] *= GLOW_DECAY;
        rain[i] *= RAIN_DECAY;
      }
      if (reduced) return;
      for (let c = 0; c < cols; c++) {
        const prev = Math.floor(heads[c]);
        heads[c] += speeds[c];
        const row = Math.floor(heads[c]);
        if (row !== prev && row >= 0 && row < rows) {
          const i = row * cols + c;
          rain[i] = 1;
          digits[i] = (Math.random() * 10) | 0;
        }
        if (row > rows + 8) {
          heads[c] = randomHead();
          speeds[c] = 0.08 + Math.random() * 0.14;
        }
      }
      // A few random flickers keep the field alive.
      for (let k = 0; k < 6; k++) digits[(Math.random() * n) | 0] = (Math.random() * 10) | 0;
    }

    function draw() {
      for (const b of buckets) b.length = 0;
      const n = cols * rows;
      for (let i = 0; i < n; i++) {
        const g = Math.min(GLOW_LEVELS - 1, Math.round(glow[i] * (GLOW_LEVELS - 1)));
        const r = Math.min(RAIN_LEVELS - 1, Math.round(rain[i] * (RAIN_LEVELS - 1)));
        buckets[g * RAIN_LEVELS + r].push(i);
      }

      ctx!.clearRect(0, 0, w, h);
      ctx!.font = `${FONT_SIZE}px ${fontFamily}`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      for (let b = 0; b < buckets.length; b++) {
        const cells = buckets[b];
        if (!cells.length) continue;
        ctx!.fillStyle = colors[b];
        // Brightest gold cells get a soft bloom.
        const bloom = b >= (GLOW_LEVELS - 3) * RAIN_LEVELS;
        ctx!.shadowBlur = bloom ? 8 : 0;
        ctx!.shadowColor = bloom ? `rgba(${GOLD[0]}, ${GOLD[1]}, ${GOLD[2]}, 0.8)` : "transparent";
        for (const i of cells) {
          const c = i % cols;
          const r = (i / cols) | 0;
          ctx!.fillText(String(digits[i]), ox + c * CELL_W, oy + r * CELL_H);
        }
      }
      ctx!.shadowBlur = 0;
    }

    function loop() {
      step();
      draw();
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (running || !visible || document.hidden) return;
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
      const inside = x >= -HOVER_RADIUS && y >= -HOVER_RADIUS && x <= w + HOVER_RADIUS && y <= h + HOVER_RADIUS;
      if (!inside) {
        last.has = false;
        return;
      }
      // Interpolate along fast moves so the trail stays continuous.
      if (last.has) {
        const dist = Math.hypot(x - last.x, y - last.y);
        const steps = Math.min(12, Math.floor(dist / (HOVER_RADIUS * 0.4)));
        for (let s = 1; s <= steps; s++) {
          const t = s / (steps + 1);
          splash(last.x + (x - last.x) * t, last.y + (y - last.y) * t);
        }
      }
      splash(x, y);
      last.x = x;
      last.y = y;
      last.has = true;
    };
    const onLeave = () => (last.has = false);
    const onVisibility = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    resize();
    draw();
    start();
    // Redraw once the webfont is ready so the first frames don't use the fallback.
    document.fonts?.ready.then(() => draw());

    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);
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
