export * from "./types";
export { site, socials } from "./site";
export { experience } from "./experience";
export { education, educationHonors } from "./education";
export { projects } from "./projects";
export { papers } from "./papers";
export { skills } from "./skills";

import { experience } from "./experience";
import { education } from "./education";
import { projects } from "./projects";
import { papers } from "./papers";

/** Hero stats — computed, so they never go stale. Reorder or relabel freely. */
export const stats = [
  { value: experience.length, label: "Work Experiences" },
  { value: projects.length, label: "Personal Projects" },
  { value: education.length, label: "Degrees" },
  { value: papers.length, label: "Papers" },
];
