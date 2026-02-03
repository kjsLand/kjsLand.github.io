type Preprint = {
  title: string;
  authors: string; // keep as a string for easy formatting
  year: string | number;
  status?: string; // "Preprint", "Under review", etc.
  venue?: string;  // "arXiv", "SSRN", etc.
  abstract?: string;
  tags?: string[];
  links?: {
    pdf?: string;
    preprint?: string; // arXiv/SSRN link
    code?: string;
  };
};

export default function PreprintCard({ p }: { p: Preprint }) {
  return (
    <article
      className="
        rounded-2xl border border-gray-200 bg-white
        shadow-sm hover:shadow-xl
        transition-all duration-200
        hover:-translate-y-0.5
      "
    >
      <div className="p-7">
        {/* Top meta row */}
        <div className="flex flex-wrap items-center gap-2">
          {p.status ? (
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700">
              {p.status}
            </span>
          ) : null}

          {p.venue ? (
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs text-blue-800">
              {p.venue}
            </span>
          ) : null}

          <span className="ml-auto text-sm text-gray-500">{p.year}</span>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-xl font-semibold text-gray-900 leading-snug">
          {p.title}
        </h3>

        {/* Authors */}
        <p className="mt-2 text-sm text-gray-700">
          <span className="font-medium text-gray-900">Authors:</span>{" "}
          {p.authors}
        </p>

        {/* Abstract */}
        {p.abstract ? (
          <p className="mt-4 text-sm leading-relaxed text-gray-700 line-clamp-4">
            {p.abstract}
          </p>
        ) : null}

        {/* Tags */}
        {p.tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
