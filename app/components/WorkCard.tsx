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
        w-[420px] h-[420px]
        rounded-3xl
        border border-gray-200
        bg-white
        shadow-md hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
      "
    >
      <div className="p-8">
        {/* Timeline pill */}
        <div className="
          inline-flex items-center
          rounded-full
          border border-gray-300
          bg-gray-100
          px-4 py-1.5
          text-sm
          text-gray-700
        ">
          {exp.timeline}
        </div>

        {/* Role */}
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">
          {exp.role}
        </h3>

        {/* Company */}
        <p className="mt-2 text-base font-medium text-gray-600">
          {exp.company}
        </p>

        {/* Description */}
        <p className="mt-6 text-base leading-relaxed text-gray-700">
          {exp.description}
        </p>
      </div>
    </article>
  );
}

export default function WorkExperienceRow() {
  return (
    <section className="w-full pt-10">
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
