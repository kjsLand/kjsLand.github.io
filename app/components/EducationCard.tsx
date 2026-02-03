type GpaPoint = {
  term: string;
  gpa: number; // 0.0 to 4.0
};

type Degree = {
  degree: string;
  school: string;
  location: string;
  timeline: string;
  gpaByTerm: GpaPoint[];
};

const degrees: Degree[] = [
  {
    degree: "M.S. Computer Science",
    school: "Rochester Institute of Technology",
    location: "Rochester, NY",
    timeline: "Aug 2021 - Dec 2024",
    gpaByTerm: [
      { term: "Spring 2025", gpa: 3.830  },
      { term: "Fall 2025", gpa: 4.000 },
    ],
  },
  {
    degree: "B.S. Computer Science",
    school: "Rochester Institute of Technology",
    location: "Rochester, NY",
    timeline: "Aug 2021 - Dec 2024",
    gpaByTerm: [
      { term: "Fall 2021", gpa: 3.940 },
      { term: "Spring 2022", gpa: 3.940 },
      { term: "Fall 2022", gpa: 3.710 },
      { term: "Spring 2023", gpa: 3.670 },
      { term: "Spring 2024", gpa: 3.400  },
      { term: "Fall 2024", gpa: 3.930  },
    ],
  },
];

function GpaLineSparkline({
  points,
  minGpa = 3.0,
  maxGpa = 4.0,
  width = 520,
  height = 180,
}: {
  points: GpaPoint[];
  minGpa?: number;
  maxGpa?: number;
  width?: number;
  height?: number;
}) {
  if (!points || points.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Add GPA points to show the graph.
      </p>
    );
  }

  const paddingLeft = 40;
  const paddingRight = 24;
  const paddingTop = 24;
  const paddingBottom = 40;
  
  const usableWidth = width - paddingLeft - paddingRight;
  const usableHeight = height - paddingTop - paddingBottom;

  const clamp = (n: number) => Math.max(minGpa, Math.min(maxGpa, n));

  const getX = (i: number) =>
    paddingLeft + (i / Math.max(points.length - 1, 1)) * usableWidth;

  const getY = (gpa: number) =>
    paddingTop + (1 - (clamp(gpa) - minGpa) / (maxGpa - minGpa)) * usableHeight;

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(p.gpa)}`)
    .join(" ");

  const latest = points[points.length - 1].gpa;

  // Generate y-axis labels from 3.0 to 4.0 in 0.1 increments
  const yAxisLabels = [];
  for (let i = minGpa; i <= maxGpa; i += 0.1) {
    yAxisLabels.push(Math.round(i * 10) / 10);
  }

  return (
    <div className="mt-5 overflow-x-auto">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="block"
      >
        {/* Background */}
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          rx="12"
          fill="rgba(59,130,246,0.05)"
        />

        {/* Horizontal grid lines */}
        {yAxisLabels.map((g) => (
          <line
            key={g}
            x1={paddingLeft}
            y1={getY(g)}
            x2={width - paddingRight}
            y2={getY(g)}
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
          />
        ))}

        {/* Y-axis labels */}
        {yAxisLabels.map((g) => (
          <text
            key={`label-${g}`}
            x={paddingLeft - 8}
            y={getY(g)}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize="11"
            fill="rgb(107,114,128)"
          >
            {g.toFixed(1)}
          </text>
        ))}

        {/* Line */}
        <path
          d={path}
          fill="none"
          stroke="rgb(37,99,235)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {points.map((p, i) => (
          <g key={`${p.term}-${i}`}>
            <circle cx={getX(i)} cy={getY(p.gpa)} r="5" fill="white" />
            <circle
              cx={getX(i)}
              cy={getY(p.gpa)}
              r="4"
              fill="rgb(37,99,235)"
            />
          </g>
        ))}

        {/* X-axis labels */}
        {points.map((p, i) => (
          <text
            key={`x-label-${i}`}
            x={getX(i)}
            y={height - paddingBottom + 20}
            textAnchor="middle"
            fontSize="11"
            fill="rgb(107,114,128)"
          >
            {p.term}
          </text>
        ))}
      </svg>
    </div>
  );
}

function DegreeCard({ d }: { d: Degree }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white shadow-sm p-7">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{d.degree}</h3>
          <p className="mt-1 text-gray-700">
            <span className="font-medium">{d.school}</span>{" "}
            <span className="text-gray-500">• {d.location}</span>
          </p>
        </div>

        <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700 h-fit">
          {d.timeline}
        </div>
      </div>

      <GpaLineSparkline points={d.gpaByTerm} />
    </article>
  );
}

export default function EducationSection() {
  return (
    <section id="education" className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-6">
          {degrees.map((d) => (
            <DegreeCard key={`${d.school}-${d.degree}-${d.timeline}`} d={d} />
          ))}
        </div>
      </div>
    </section>
  );
}