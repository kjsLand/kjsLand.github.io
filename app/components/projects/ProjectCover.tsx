import type { Project } from "@/content";

/**
 * Cover art for a project tile. If `project.image` is set it shows the screenshot.
 * Otherwise it generates art in the site palette (gold / steel / cream), using `project.hue` as a
 * seed for which color leads and where the glows sit: a mesh gradient, a dot lattice,
 * concentric "wavefront" rings, and a big monogram.
 * The inner layer drifts with scroll (.cover-parallax uses animation-timeline: view()).
 */
export default function ProjectCover({ project }: { project: Pick<Project, "title" | "hue" | "image"> }) {
  const h = project.hue;
  // Rotate the palette by the seed so neighbouring covers don't look identical.
  const palette = ["222 160 30", "63 84 112", "255 237 203"]; // gold, steel, cream (rgb)
  const lead = Math.floor(h / 120) % 3;
  const [c1, c2, c3] = [palette[lead], palette[(lead + 1) % 3], palette[(lead + 2) % 3]];
  const px = 15 + (h % 50); // lead glow x position, %
  const initials = project.title
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]">
      <div className="cover-parallax h-full w-full">
        {project.image ? (
          // A plain <img>: next/image optimization is off for static export anyway.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div
            className="relative h-full w-full"
            style={{
              background: [
                `radial-gradient(60% 80% at ${px}% 20%, rgb(${c1} / 0.5), transparent 60%)`,
                `radial-gradient(50% 70% at 85% 30%, rgb(${c2} / 0.5), transparent 60%)`,
                `radial-gradient(70% 60% at 60% 100%, rgb(${c3} / 0.22), transparent 60%)`,
                "linear-gradient(160deg, #1a2230, #0a0d12)",
              ].join(","),
            }}
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: "radial-gradient(rgb(255 237 203 / 0.35) 1px, transparent 1.2px)",
                backgroundSize: "16px 16px",
                maskImage: "linear-gradient(120deg, transparent 20%, black 70%)",
              }}
            />
            <div
              className="absolute -right-1/4 top-1/2 aspect-square w-[90%] -translate-y-1/2 rounded-full opacity-50"
              style={{
                background: "repeating-radial-gradient(circle, transparent 0 18px, rgb(255 237 203 / 0.16) 18px 19px)",
              }}
            />
          </div>
        )}
      </div>
      </div>

      {!project.image && (
        <span
          aria-hidden
          className="absolute bottom-3 left-5 select-none font-serif text-7xl italic leading-none text-cream/80 mix-blend-overlay md:text-8xl"
        >
          {initials}
        </span>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
    </div>
  );
}
