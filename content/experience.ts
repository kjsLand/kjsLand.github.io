import type { Experience } from "./types";

/**
 * Work experience, newest first.
 *
 * To add a job, copy this template to the top of the list:
 *
 *   {
 *     role: "Software Engineer",
 *     company: "Company",
 *     companyUrl: "https://company.com", // optional
 *     start: "Jan 2026",
 *     end: "Present",
 *     highlights: ["What you did and the impact it had."],
 *     tech: ["TypeScript", "AWS"],          // optional
 *   },
 *
 * It shows up on the Journey timeline, merged with education/degrees by start date.
 */
export const experience: Experience[] = [
  {
    role: "Product Development Engineer",
    company: "Phenom",
    companyUrl: "https://www.phenom.com",
    location: "Horsham, PA",
    // TODO: set your real start month.
    start: "Jan 2026",
    end: "Present",
    highlights: [
      // TODO: replace with what you've built and the impact it had.
      "Building and shipping product features for Phenom's AI-powered talent experience platform.",
    ],
  },
  {
    role: "Research Engineer",
    company: "Vogt Labs",
    start: "May 2025",
    end: "Dec 2025",
    highlights: [
      "Conducted research on quantum algorithms for numerical integration, validating theoretical findings through Python/Jupyter implementations.",
      "Served as lead author on the resulting research paper.",
    ],
    tech: ["Python", "Jupyter Notebooks", "Quantum Algorithms"],
  },
  {
    role: "Junior Software Engineer",
    company: "Metrics That Matter",
    start: "Aug 2023",
    end: "Aug 2024",
    highlights: [
      "Converted legacy Selenium-based test suites to JavaScript-based automated tests integrated into CI workflows triggered by Git pushes.",
      "Participated in daily Agile stand-ups and collaborated with cross-functional engineers to improve test reliability and deployment confidence.",
    ],
    tech: ["JavaScript", "Selenium", "CI/CD", "GitHub Actions", "Agile"],
  },
  {
    role: "Software Engineer Intern",
    company: "Consortium",
    start: "May 2023",
    end: "Aug 2023",
    highlights: [
      "Developed Python-based Selenium pipelines to scrape, clean, and preprocess data from 47,000+ companies for downstream machine learning workflows.",
      "Presented technical findings to an audience of ~50, improving cross-team understanding of data processing and ML integration.",
    ],
    tech: ["Python", "Selenium", "Data Pipelines"],
  },
  {
    role: "Teaching Assistant",
    company: "Rochester Institute of Technology",
    companyUrl: "https://www.rit.edu",
    start: "Aug 2021",
    end: "Dec 2021",
    highlights: [
      "Supported Python-based CS coursework, grading and giving feedback for 24 students using GitHub Classroom workflows.",
    ],
    tech: ["Python", "Git"],
  },
];
