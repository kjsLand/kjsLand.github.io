import type { ReactNode } from "react";

/**
 * Cover art for a role on the Experience page: a Bauhaus-style grid of bold shapes.
 *
 * The technique follows frontend.horse's "Generative SVG Grids": every cell gets a background
 * colour and one randomly chosen shape (circle, quarter circle, half circle, triangle, cross,
 * diamond…), both picked from one small curated palette, plus one big block laid over the grid
 * as a focal point. The randomness is seeded from the company name, so each role always gets
 * the same artwork and no two roles look alike. Solid fills only.
 *
 * On hover every cell turns a quarter turn, staggered across the grid.
 */

const INK = "#0a0d12";
const INK2 = "#121821";
const STEEL = "#3f5470";
const STEEL_LIGHT = "#8fa3c0";
const GOLD = "#dea01e";
const CREAM = "#ffedcb";
const DARK = new Set([INK, INK2]);

/** [colour, weight]. Backgrounds lean dark so the page stays calm; shapes lean bright. */
const BACKGROUNDS: [string, number][] = [
  [INK2, 4],
  [STEEL, 2.5],
  [INK, 1.5],
  [GOLD, 1],
  [STEEL_LIGHT, 0.6],
  [CREAM, 0.6],
];
const FOREGROUNDS: [string, number][] = [
  [GOLD, 3],
  [CREAM, 2],
  [STEEL_LIGHT, 2],
  [STEEL, 1],
  [INK, 1],
];

const COLS = 8;
const ROWS = 3;
const CELL = 50;
const W = COLS * CELL;
const H = ROWS * CELL;

/** Small deterministic PRNG (mulberry32), seeded from a string hash. */
function rng(seed: string) {
  let a = 0;
  for (const c of seed) a = (Math.imul(a ^ c.charCodeAt(0), 2654435761) + 0x9e3779b9) | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rand = ReturnType<typeof rng>;

const int = (r: Rand, n: number) => Math.floor(r() * n);

function weighted(r: Rand, list: [string, number][], exclude?: string) {
  const options = list.filter(([c]) => c !== exclude);
  let pick = r() * options.reduce((s, [, w]) => s + w, 0);
  for (const [c, w] of options) {
    pick -= w;
    if (pick <= 0) return c;
  }
  return options[options.length - 1][0];
}

/** A foreground that stands out from the background (never dark-on-dark). */
function foregroundFor(r: Rand, bg: string) {
  let fg = weighted(r, FOREGROUNDS, bg);
  for (let i = 0; i < 4 && DARK.has(bg) && DARK.has(fg); i++) fg = weighted(r, FOREGROUNDS, bg);
  return fg;
}

/** Corner `k` (0 top-left, clockwise) of a square at x,y with side s. */
const corner = (x: number, y: number, s: number, k: number): [number, number] =>
  [
    [x, y],
    [x + s, y],
    [x + s, y + s],
    [x, y + s],
  ][k % 4] as [number, number];

/** Quarter disc of radius `rad` centred on corner `k`, curving into the square. */
function quarter(x: number, y: number, s: number, k: number, rad: number, fill: string) {
  const [cx, cy] = corner(x, y, s, k);
  const sx = k === 0 || k === 3 ? 1 : -1;
  const sy = k < 2 ? 1 : -1;
  const sweep = sx * sy > 0 ? 1 : 0;
  return <path d={`M${cx} ${cy} L${cx + sx * rad} ${cy} A${rad} ${rad} 0 0 ${sweep} ${cx} ${cy + sy * rad} Z`} fill={fill} />;
}

/** One cell's shape. `big` limits the choice to shapes that read well at large sizes. */
function shape(r: Rand, x: number, y: number, s: number, bg: string, fg: string, big = false): ReactNode {
  const cx = x + s / 2;
  const cy = y + s / 2;
  const designs = big ? 4 : 7;
  switch (int(r, designs)) {
    case 0: // circle, sometimes with a ring cut out
      return (
        <>
          <circle cx={cx} cy={cy} r={s * 0.4} fill={fg} />
          {r() < 0.35 && <circle cx={cx} cy={cy} r={s * 0.18} fill={bg} />}
        </>
      );
    case 1: // quarter circle from a corner
      return quarter(x, y, s, int(r, 4), s, fg);
    case 2: {
      // half circle sitting on one edge
      const side = int(r, 4);
      const rad = s / 2;
      const d = [
        `M${x} ${y} A${rad} ${rad} 0 0 0 ${x + s} ${y} Z`,
        `M${x + s} ${y} A${rad} ${rad} 0 0 0 ${x + s} ${y + s} Z`,
        `M${x + s} ${y + s} A${rad} ${rad} 0 0 0 ${x} ${y + s} Z`,
        `M${x} ${y + s} A${rad} ${rad} 0 0 0 ${x} ${y} Z`,
      ][side];
      return <path d={d} fill={fg} />;
    }
    case 3: {
      // half the square, cut on a diagonal
      const k = int(r, 4);
      const pts = [0, 1, 2].map((i) => corner(x, y, s, k + i).join(",")).join(" ");
      return <polygon points={pts} fill={fg} />;
    }
    case 4: // two quarter circles in opposite corners
    {
      const k = int(r, 2);
      return (
        <>
          {quarter(x, y, s, k, s / 2, fg)}
          {quarter(x, y, s, k + 2, s / 2, fg)}
        </>
      );
    }
    case 5: {
      // plus, or a cross 30% of the time
      const t = s * 0.18;
      const l = s * 0.64;
      return (
        <g transform={r() < 0.3 ? `rotate(45 ${cx} ${cy})` : undefined} fill={fg}>
          <rect x={cx - l / 2} y={cy - t / 2} width={l} height={t} />
          <rect x={cx - t / 2} y={cy - l / 2} width={t} height={l} />
        </g>
      );
    }
    default: {
      // square or diamond
      const q = s * 0.46;
      return (
        <rect
          x={cx - q / 2}
          y={cy - q / 2}
          width={q}
          height={q}
          fill={fg}
          transform={r() < 0.5 ? `rotate(45 ${cx} ${cy})` : undefined}
        />
      );
    }
  }
}

/** A cell (or the big block): background square + shape, turning a quarter on card hover. */
function Block({ x, y, s, delay, children, bg }: { x: number; y: number; s: number; delay: number; bg: string; children: ReactNode }) {
  return (
    <g
      className="origin-center transition-[rotate] duration-700 ease-out-expo [transform-box:fill-box] group-hover:rotate-90"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <rect x={x} y={y} width={s} height={s} fill={bg} shapeRendering="crispEdges" />
      {children}
    </g>
  );
}

export default function ExperienceCover({ seed }: { seed: string }) {
  const r = rng(seed);

  // The focal block: 2×2 cells, somewhere on the grid.
  const bigCol = int(r, COLS - 1);
  const bigRow = int(r, ROWS - 1);
  const covered = (c: number, row: number) => c >= bigCol && c < bigCol + 2 && row >= bigRow && row < bigRow + 2;

  const cells: ReactNode[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let c = 0; c < COLS; c++) {
      if (covered(c, row)) continue;
      const bg = weighted(r, BACKGROUNDS);
      const fg = foregroundFor(r, bg);
      const x = c * CELL;
      const y = row * CELL;
      cells.push(
        <Block key={`${c}-${row}`} x={x} y={y} s={CELL} bg={bg} delay={(c + row) * 40}>
          {shape(r, x, y, CELL, bg, fg)}
        </Block>,
      );
    }
  }

  const bigBg = weighted(r, BACKGROUNDS);
  const bigFg = foregroundFor(r, bigBg);
  const bx = bigCol * CELL;
  const by = bigRow * CELL;

  return (
    <div className="overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden>
        {cells}
        <Block x={bx} y={by} s={CELL * 2} bg={bigBg} delay={(bigCol + bigRow) * 40}>
          {shape(r, bx, by, CELL * 2, bigBg, bigFg, true)}
        </Block>
      </svg>
    </div>
  );
}
