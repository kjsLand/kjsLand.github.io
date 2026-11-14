import { site } from "./site";
import { experience } from "./experience";
import { projects } from "./projects";
import { papers } from "./papers";

/**
 * The "box score" poster. Counts are computed from the other content files, so they
 * stay current; swap in any number you like (keep it to four rows for the classic look).
 */
export const statline = {
  name: site.name,
  /** The small line under the name, styled like "FEBRUARY 17, 1994 V. PISTONS". */
  game: "December 2025 v. RIT",
  /** Optional photo, e.g. "/statline.jpg" (put the file in /public). Falls back to a monogram. */
  photo: undefined as string | undefined,
  stats: [
    { value: projects.length, label: "Projects" },
    { value: experience.length, label: "Jobs" },
    { value: papers.length, label: "Papers" },
    { value: 7, label: "Dean's Lists" },
  ],
};
