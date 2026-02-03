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
    tag: "UI/UX Design",
    tagClasses: "bg-blue-500/20 text-blue-100 border border-blue-400/30",
    title: "E-commerce Redesign",
    description:
      "Complete overhaul of shopping experience with focus on conversion optimization.",
    gradient: "from-blue-600 to-blue-800",
    href: "#",
  },
  {
    tag: "Frontend Development",
    tagClasses: "bg-emerald-500/20 text-emerald-100 border border-emerald-400/30",
    title: "Dashboard UI Kit",
    description:
      "Component library for data-heavy applications with real-time visualization.",
    gradient: "from-emerald-600 to-teal-800",
    href: "#",
  },
  {
    tag: "Brand Identity",
    tagClasses: "bg-pink-500/20 text-pink-100 border border-pink-400/30",
    title: "Fintech Mobile App",
    description:
      "Design system and mobile interface for personal finance management.",
    gradient: "from-pink-600 to-fuchsia-800",
    href: "#",
  },
];

export default function Projects(){
    return (
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Featured Projects
              </h2>
              <p className="mt-4 text-sm md:text-base opacity-80 font-sans">
                A selection of my recent work where design meets functionality
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((p) => (
                <div
                  key={p.title}
                  className="
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
                      className={`
                        inline-block text-[10px] px-2 py-1 rounded-md
                        ${p.tagClasses}
                      `}
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
          </div>
        </section>
    );

}