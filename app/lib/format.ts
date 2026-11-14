const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** "May 2025" → { y: 2025, m: 4 }. "Present" → today. Returns null if it can't parse. */
function parseMonthYear(s: string): { y: number; m: number } | null {
  if (s.trim().toLowerCase() === "present") {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  }
  const match = s.trim().match(/^([a-z]{3})[a-z]*\.?\s+(\d{4})$/i);
  if (!match) return null;
  const m = MONTHS.indexOf(match[1].toLowerCase());
  return m === -1 ? null : { y: Number(match[2]), m };
}

/** Human duration between two month strings, inclusive: "8 mos", "1 yr 1 mo". */
export function duration(start: string, end: string): string | null {
  const a = parseMonthYear(start);
  const b = parseMonthYear(end);
  if (!a || !b) return null;
  const total = (b.y - a.y) * 12 + (b.m - a.m) + 1;
  if (total <= 0) return null;
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  const parts = [];
  if (yrs) parts.push(`${yrs} yr${yrs > 1 ? "s" : ""}`);
  if (mos) parts.push(`${mos} mo${mos > 1 ? "s" : ""}`);
  return parts.join(" ");
}

/** Index-padded label, e.g. 3 → "03". */
export const pad2 = (n: number) => String(n).padStart(2, "0");
