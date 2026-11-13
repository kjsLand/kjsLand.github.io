import type { CSSProperties } from "react";
import type { GpaTerm } from "@/content";

const W = 600;
const H = 230;
const PAD = { l: 44, r: 24, t: 34, b: 40 };

/**
 * A responsive SVG line chart of GPA per term. Inside a <Reveal>, the line draws itself
 * and the dots pop in (see .draw-line / .chart-dot in globals.css).
 * The y-axis range adapts to the data, so it works for any GPA history.
 */
export default function GpaChart({ terms, id }: { terms: GpaTerm[]; id: string }) {
  if (terms.length === 0) return null;

  const min = Math.min(...terms.map((t) => t.gpa));
  const yMin = Math.max(0, Math.floor((min - 0.1) * 10) / 10);
  const yMax = 4.0;
  const range = yMax - yMin;
  const step = range <= 0.6 ? 0.1 : range <= 1.2 ? 0.2 : 0.5;
  const ticks: number[] = [];
  for (let v = yMin; v <= yMax + 1e-9; v += step) ticks.push(Math.round(v * 10) / 10);

  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;
  const x = (i: number) => (terms.length === 1 ? PAD.l + iw / 2 : PAD.l + (i / (terms.length - 1)) * iw);
  const y = (g: number) => PAD.t + (1 - (g - yMin) / range) * ih;

  const line = terms.map((t, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(t.gpa).toFixed(1)}`).join(" ");
  const area = `${line} L${x(terms.length - 1).toFixed(1)},${PAD.t + ih} L${x(0).toFixed(1)},${PAD.t + ih} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label={`GPA by term: ${terms.map((t) => `${t.term} ${t.gpa.toFixed(2)}`).join(", ")}`}
    >
      <defs>
        <linearGradient id={`${id}-stroke`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--color-violet)" />
          <stop offset="100%" stopColor="var(--color-cyan)" />
        </linearGradient>
        <linearGradient id={`${id}-fill`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-violet)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-violet)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {ticks.map((v) => (
        <g key={v}>
          <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} stroke="rgb(255 255 255 / 0.06)" strokeDasharray="2 4" />
          <text x={PAD.l - 10} y={y(v)} textAnchor="end" dominantBaseline="middle" className="fill-faint font-mono text-[11px]">
            {v.toFixed(1)}
          </text>
        </g>
      ))}

      {terms.length > 1 && (
        <>
          <path d={area} fill={`url(#${id}-fill)`} className="wipe-up" />
          <path
            d={line}
            pathLength={1}
            fill="none"
            stroke={`url(#${id}-stroke)`}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="draw-line"
          />
        </>
      )}

      {terms.map((t, i) => (
        <g key={t.term} className="chart-dot group" style={{ "--i": i } as CSSProperties}>
          <circle cx={x(i)} cy={y(t.gpa)} r={14} fill="transparent" />
          <circle cx={x(i)} cy={y(t.gpa)} r={5} fill="var(--color-ink)" stroke="var(--color-cyan)" strokeWidth={2} />
          <text
            x={x(i)}
            y={y(t.gpa) - 14}
            textAnchor="middle"
            className="fill-muted font-mono text-[11px] transition-colors group-hover:fill-fg"
          >
            {t.gpa.toFixed(2)}
          </text>
          <text x={x(i)} y={H - 12} textAnchor="middle" className="fill-faint font-mono text-[10px] uppercase tracking-wider">
            {t.term}
          </text>
        </g>
      ))}
    </svg>
  );
}
