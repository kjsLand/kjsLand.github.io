import type { Paper } from "./types";

/**
 * Papers & preprints, newest first.
 * Authors: write your name exactly as `site.name` ("Kevin Land") so it gets highlighted,
 * and list it first to get the "Lead author" badge.
 *
 * Links only render once you add them, e.g.
 *   links: { paper: "https://arxiv.org/abs/2601.01234", pdf: "...", code: "..." }
 */
export const papers: Paper[] = [
  {
    title:
      "Quadratic Quantum Speedup in Sobol Index Estimation for Non-Smooth Models via Amplitude Estimation with Accuracy Gains from Gaussian Quadrature Rules",
    authors: ["Kevin Land", "Abigail Starkweather", "Ryan H. Vogt"],
    year: 2025,
    status: "Preprint",
    venue: "arXiv",
    abstract:
      "We present a quantum algorithm for estimating Sobol indices of non-smooth models with a quadratic speedup over classical methods, and accuracy improvements by leveraging Gaussian quadrature rules.",
    tags: ["QAEA", "PDE", "ODE"],
  },
  {
    title: "The Decoded Quantum Interferometry Algorithm for Knapsack and Beyond",
    authors: ["Kevin Land"],
    year: 2025,
    status: "Preprint",
    venue: "arXiv",
    abstract:
      "I propose a method for solving the knapsack problem more efficiently by using a quantum SAT solver backed by the DQI algorithm.",
    tags: ["DQI", "Gadgets", "SAT"],
  },
];
