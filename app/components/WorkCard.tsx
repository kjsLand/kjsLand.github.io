type WorkExperience = {
  timeline: string;   // e.g. "Jun 2024 – Aug 2024"
  role: string;       // e.g. "Software Engineering Intern"
  company: string;    // e.g. "Trendyol Group"
  description: string;
};

const experiences: WorkExperience[] = [
  {
    timeline: "Aug 2023 – Aug 2024",
    role: "Junior Software Engineer",
    company: "Metrics That Matter",
    description:
      "• Converted legacy Selenium-based test suites to JavaScript-based automated tests integrated into CI workflows triggered by Git pushes • Participated in daily Agile stand-ups and collaborated with cross-functional engineers to improve test reliability and deployment confidence",
  },
  {
    timeline: "May 2023 – Aug 2023",
    role: "Software Engineer Internship",
    company: "Consortium",
    description:
      "• Developed Python-based Selenium pipelines to scrape, clean, and preprocess data from 47,000+ companies for downstream machine learning workflows • Presented technical findings to an audience of ~50 through a structured internship presentation, improving cross-team understanding of data processing and ML integration",
  },
  {
    timeline: "Aug 2021 – Dec 2021",
    role: "Teaching Assistant",
    company: "Rochester Institute of Technology",
    description:
      "• Supported Python-based CS coursework, grading and providing feedback for 24 students using GitHub Classroom workflows",
  },
];

function WorkExperienceCard({ exp }: { exp: WorkExperience }) {
  return (
    <article
      className="
        w-[440px] h-[420px]
        rounded-3xl
        bg-gradient-to-br from-white to-gray-50
        border border-gray-200
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        hover:-translate-y-1
        hover:border-blue-300
      "
    >
      <div className="p-9 h-full flex flex-col">

        {/* Top row */}
        <div className="flex items-center justify-between">
          <span
            className="
              text-xs font-medium
              px-4 py-1.5 rounded-full
              bg-blue-50 text-blue-700
            "
          >
            {exp.timeline}
          </span>
        </div>

        {/* Role */}
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-gray-900">
          {exp.role}
        </h3>

        {/* Company */}
        <p className="mt-1 text-lg font-medium text-gray-600">
          {exp.company}
        </p>

        {/* Divider */}
        <div className="mt-5 h-px w-full bg-gradient-to-r from-blue-400/40 to-transparent" />

        {/* Description */}
        <p className="mt-5 text-base leading-relaxed text-gray-700">
          {exp.description}
        </p>

        {/* Spacer pushes bottom content down if you add later */}
        <div className="flex-grow" />
      </div>
    </article>
  );
}

export default function WorkExperienceRow() {
  return (
    <section className="max-w-4xl pt-10 mx-auto">
      {/* Centered scroller */}
      <div className="flex justify-center">
        <div
          className="
            flex gap-6
            overflow-x-auto
            pb-4
            snap-x snap-mandatory
            [scrollbar-width:thin]
            max-w-full
          "
        >
          {experiences.map((exp) => (
            <div
              key={`${exp.company}-${exp.role}-${exp.timeline}`}
              className="snap-start flex justify-center"
            >
              <WorkExperienceCard exp={exp} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile hint */}
      <p className="mt-3 text-xs text-gray-500 text-center sm:hidden">
        Swipe sideways to see more
      </p>
    </section>
  );
}
