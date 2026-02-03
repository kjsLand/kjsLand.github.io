import PreprintCard from "@/app/components/PreprintCard";

const preprints = [
  {
    title: "Quadratic Quantum Speedup in Sobol Index Estimation for Non-Smooth Models via Amplitude Estimation with Accuracy Gains from Gaussian Quadrature Rules",
    authors: "Kevin Land, Abigail Starkweather, Ryan H. Vogt",
    year: 2025,
    status: "Preprint",
    venue: "arXiv",
    abstract:
      "We propose a hybrid decoding pipeline that combines ... and show improvements on benchmark lattices...",
    tags: ["QAEA", "PDE", "ODE"],
    links: {
      preprint: "https://arxiv.org/abs/xxxx.xxxxx",
      pdf: "https://arxiv.org/pdf/xxxx.xxxxx.pdf",
      code: "https://github.com/yourname/repo",
    },
  },
  {
    title: "The Decoded Quantum Interferometry Algorithm For Knapsack and Beyond",
    authors: "Kevin Land",
    year: 2025,
    status: "Preprint",
    venue: "arXiv",
    abstract:
      "We propose a hybrid decoding pipeline that combines ... and show improvements on benchmark lattices...",
    tags: ["DQI", "Gadgets", "SAT"],
    links: {
      preprint: "https://arxiv.org/abs/xxxx.xxxxx",
      pdf: "https://arxiv.org/pdf/xxxx.xxxxx.pdf",
      code: "https://github.com/yourname/repo",
    },
  },
];

export default function PreprintsSection() {
  return (
    <section id="preprints" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white-900">Preprints</h2>
          <p className="mt-3 text-gray-600">
            Research drafts, working papers, and manuscripts.
          </p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {preprints.map((p) => (
            <PreprintCard key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
