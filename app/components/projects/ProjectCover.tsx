import type { Project } from "@/content";

/**
 * Cover art for a project tile. If `project.image` is set it shows that image.
 * Otherwise it generates pattern art in the site palette (gold / steel / cream), using `project.hue`
 * as a seed for which color leads, the hatch angle, and where the shapes sit: a dot lattice,
 * a hatched disk, a set of concentric "wavefront" rings crossing it, and a big monogram.
 * All hard-edged patterns; no gradients.
 * The inner layer drifts with scroll (.cover-parallax uses animation-timeline: view()).
 */
export default function ProjectCover({ project }: { project: Pick<Project, "title" | "hue" | "image"> }) {
  const h = project.hue;
  // Rotate the palette by the seed so neighbouring covers don't look identical.
  const palette = ["#dea01e", "#8fa3c0", "#ffedcb"]; // gold, light steel, cream
  const lead = Math.floor(h / 120) % 3;
  const [c1, c2] = [palette[lead], palette[(lead + 1) % 3]];
  const angle = 30 + (h % 4) * 30; // hatch angle: 30/60/90/120°
  const dx = 90 + (h % 50) * 2.6; // disk center x (viewBox is 400×200)
  const rx = dx > 200 ? dx - 150 : dx + 150; // rings sit on the other side
  const id = `cv-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const initials = project.title
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink-2">
      <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]">
        <div className="cover-parallax h-full w-full">
          {project.image ? (
            // A plain <img>: next/image optimization is off for static export anyway.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image} alt="" className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
              <defs>
                <pattern id={`${id}-dots`} width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.9" fill="#ffedcb" fillOpacity="0.22" />
                </pattern>
                <pattern
                  id={`${id}-hatch`}
                  width="7"
                  height="7"
                  patternUnits="userSpaceOnUse"
                  patternTransform={`rotate(${angle})`}
                >
                  <line x1="0" y1="0" x2="0" y2="7" stroke={c1} strokeOpacity="0.55" strokeWidth="2" />
                </pattern>
              </defs>
              <rect width="400" height="200" fill={`url(#${id}-dots)`} />
              <circle cx={dx} cy="70" r="92" fill={`url(#${id}-hatch)`} />
              <circle cx={dx} cy="70" r="92" fill="none" stroke={c1} strokeOpacity="0.5" />
              <g fill="none" stroke={c2} strokeOpacity="0.35">
                {Array.from({ length: 22 }, (_, i) => (
                  <circle key={i} cx={rx} cy="150" r={(i + 1) * 9} />
                ))}
              </g>
              <circle cx={rx} cy="150" r="5" fill={c2} fillOpacity="0.8" />
            </svg>
          )}
        </div>
      </div>

      {!project.image && (
        <span
          aria-hidden
          className="absolute bottom-3 left-5 select-none font-heading text-7xl font-bold leading-none text-cream/80 mix-blend-overlay md:text-8xl"
        >
          {initials}
        </span>
      )}
    </div>
  );
}
