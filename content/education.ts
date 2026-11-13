import type { Degree } from "./types";

/**
 * Degrees, newest first. Each term adds a point to that degree's GPA chart.
 *
 * Template:
 *   {
 *     degree: "Ph.D. Computer Science",
 *     school: "University",
 *     location: "City, ST",
 *     terms: [{ term: "Fall 2026", gpa: 4.0 }],
 *     focus: ["Topic"], // optional chips
 *   },
 */
export const education: Degree[] = [
  {
    degree: "M.S. Computer Science",
    school: "Rochester Institute of Technology",
    location: "Rochester, NY",
    // `timeline` is omitted on purpose: it's built from the terms ("Spring 2025 – Fall 2025").
    terms: [
      { term: "Spring 2025", gpa: 3.83 },
      { term: "Fall 2025", gpa: 4.0 },
    ],
    focus: ["Quantum Computing", "Computer Graphics", "Artificial Intelligence"],
  },
  {
    degree: "B.S. Computer Science",
    school: "Rochester Institute of Technology",
    location: "Rochester, NY",
    timeline: "Aug 2021 – Dec 2024",
    terms: [
      { term: "Fall 2021", gpa: 3.95 },
      { term: "Spring 2022", gpa: 3.94 },
      { term: "Fall 2022", gpa: 3.87 },
      { term: "Spring 2023", gpa: 3.82 },
      { term: "Spring 2024", gpa: 3.75 },
      { term: "Fall 2024", gpa: 3.78 },
    ],
  },
];

/** Honors shown as badges under the degree cards. */
export const educationHonors: string[] = [
  "7× Dean's List",
  "Magna Cum Laude",
  "Gen-Ed Immersion in Economics",
];
