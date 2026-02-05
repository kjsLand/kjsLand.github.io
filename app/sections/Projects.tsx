import { FiArrowRight, FiChevronRight } from "react-icons/fi";

type Project = {
  tag: string;
  tagClasses: string;
  title: string;
  description: string;
  gradient: string;
  href?: string;
};

const projects: Project[] = [
  {
    tag: "Chrome Extension",
    tagClasses: "bg-blue-500/20 text-blue-100 border border-blue-400/30",
    title: "The Scribbler",
    description:
      "Finds a canvas on the Jackbox TKO browser and draws a given image with the colors required by the game.",
    gradient: "from-blue-600 to-black-800",
    href: "https://github.com/kjsLand/TheScribbler",
  },
  {
    tag: "Python App",
    tagClasses: "bg-emerald-500/20 text-emerald-100 border border-emerald-400/30",
    title: "Rate It",
    description:
      "Uses requests library and Spotify's API to help users locally store ratings for songs. The goal is to quickly create playlists and discover new artists.",
    gradient: "from-emerald-600 to-black-800",
    href: "https://github.com/kjsLand/rate_it",
  },
  {
    tag: "Research Project",
    tagClasses: "bg-pink-500/20 text-pink-100 border border-pink-400/30",
    title: "DQI SAT Solver",
    description:
      "This is the capstone project I created for my master's program which explores the idea of a quantum speedup for the SAT problem. This github repo will be private until paper is released.",
    gradient: "from-pink-600 to-black-800",
    href: "https://github.com/kjsLand/DQI_SAT_Solver",
  },
  {
    tag: "Full Stack Website",
    tagClasses: "bg-yellow-500/20 text-yellow-100 border border-yellow-400/30",
    title: "Vendorstub",
    description:
      "Contract management platform MVP being developed. Tech stack is next.js, tailwind, postgresql, and AWS.",
    gradient: "from-yellow-600 to-black-800",
    href: "https://vendorstub.com/",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-15">
      <div className="container mx-auto px-4">

        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Featured Projects
          </h2>
          <p className="mt-4 text-sm md:text-base opacity-80 font-sans">
            A selection of my recent work where design meets functionality
          </p>
        </div>

        {/* Horizontal scroller */}
        <div className="max-w-5xl mx-auto">
          <div
            className="
              flex gap-6
              overflow-x-auto
              pb-4
              snap-x snap-mandatory
              [-webkit-overflow-scrolling:touch]
            "
          >

            {projects.map((p) => (
              <div
                key={p.title}
                className="
                  snap-start
                  shrink-0
                  w-[300px] sm:w-[340px] md:w-[360px]

                  pixel-card pixel-border pixel-shadow pixel-hover blue-glow
                  transition-all duration-200
                  overflow-hidden
                "
              >
                <div
                  className={`h-44 bg-gradient-to-r ${p.gradient}`}
                  aria-hidden="true"
                />

                <div className="p-6">
                  <span
                    className="
                      inline-block text-[10px] px-2 py-1 rounded-md
                    "
                  >
                    {p.tag}
                  </span>

                  <h3 className="mt-4 text-base font-bold leading-snug">
                    {p.title}
                  </h3>

                  <p className="mt-3 text-sm opacity-80 font-sans">
                    {p.description}
                  </p>

                  <a
                    href={p.href ?? "#"}
                    className="
                      mt-5 inline-flex items-center gap-2
                      text-sm
                      text-blue-200 hover:text-white
                      transition
                    "
                  >
                    View Case Study <FiArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile hint */}
          <p className="mt-3 text-xs text-center opacity-60 sm:hidden">
            Swipe sideways →
          </p>

        </div>
      </div>
    </section>
  );
}
