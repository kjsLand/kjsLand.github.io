import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
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
    tagClasses: "bg-indigo-100 text-indigo-800",
    title: "E-commerce Redesign",
    description:
      "Complete overhaul of shopping experience with focus on conversion optimization.",
    gradient: "from-indigo-500 to-purple-600",
    href: "#",
  },
  {
    tag: "Frontend Development",
    tagClasses: "bg-blue-100 text-blue-800",
    title: "Dashboard UI Kit",
    description:
      "Component library for data-heavy applications with real-time visualization.",
    gradient: "from-blue-500 to-cyan-600",
    href: "#",
  },
  {
    tag: "Brand Identity",
    tagClasses: "bg-green-100 text-green-800",
    title: "Fintech Mobile App",
    description:
      "Design system and mobile interface for personal finance management.",
    gradient: "from-green-500 to-teal-600",
    href: "#",
  },
];

const skills = [
  "Figma",
  "React",
  "TypeScript",
  "Design Systems",
  "User Research",
];

export default function HomePage() {
  return (
    <div className="font-sans">
      <Navbar />

      <main>
        <Hero />

        {/* WORK */}
        <section id="work" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Projects
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A selection of my recent work where design meets functionality
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((p) => (
                <div
                  key={p.title}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div
                    className={`h-48 bg-gradient-to-r ${p.gradient}`}
                    aria-hidden="true"
                  />
                  <div className="p-6">
                    <span
                      className={`inline-block ${p.tagClasses} text-xs px-2 py-1 rounded mb-3`}
                    >
                      {p.tag}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                    <p className="text-gray-600 mb-4">{p.description}</p>
                    <a
                      href={p.href ?? "#"}
                      className="text-indigo-600 font-medium inline-flex items-center"
                    >
                      View Case Study
                      <FiArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a href="#" className="inline-flex items-center text-indigo-600 font-medium">
                View All Projects
                <FiChevronRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  My journey in design and development
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/3 w-full">
                  {/* Replace with Image later if you want */}
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80" />
                </div>

                <div className="md:w-2/3">
                  <p className="text-gray-700 mb-6">
                    I&apos;m a product designer and frontend developer with over 5 years
                    of experience creating digital products that users love. My approach
                    combines strategic thinking with meticulous attention to detail.
                  </p>
                  <p className="text-gray-700 mb-6">
                    Currently, I lead design initiatives at Trendyol Group, where I work
                    on building scalable design systems and crafting intuitive user
                    experiences for millions of users.
                  </p>
                  <p className="text-gray-700">
                    When I&apos;m not designing or coding, you can find me exploring new
                    design tools, contributing to open-source projects, or sharing
                    knowledge through writing and mentoring.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {skills.map((s) => (
                      <span
                        key={s}
                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
