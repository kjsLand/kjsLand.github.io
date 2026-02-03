import React from "react";

type CrtTerminalPanelProps = {
  title?: string;
  subtitle?: string;
  tags?: string[];
  children?: React.ReactNode;
  primaryHref?: string;
  primaryText?: string;
  secondaryHref?: string;
  secondaryText?: string;
};

export default function CrtTerminalPanel({
  title = "user@terminal:~$ whoami",
  subtitle = "Product Designer + Frontend Developer. Building clean interfaces and fast systems.",
  tags = ["CONNECTED", "SSH", "PORTFOLIO"],
  children,
  primaryHref = "#work",
  primaryText = "View Work",
  secondaryHref = "#contact",
  secondaryText = "Contact",
}: CrtTerminalPanelProps) {
  return (
    <div className="relative w-full">
      <div
        className="relative overflow-hidden rounded-2xl border border-emerald-300/15"
        style={{
          background:
            "radial-gradient(900px 600px at 20% -10%, rgba(34,197,94,0.10), transparent 60%)," +
            "radial-gradient(800px 500px at 80% 10%, rgba(34,197,94,0.08), transparent 60%)," +
            "#02060a",
          boxShadow:
            "0 18px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(34,197,94,0.10)",
        }}
      >
        {/* Scanlines overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
          style={{
            background:
              "repeating-linear-gradient(to bottom," +
              "rgba(255,255,255,0.035)," +
              "rgba(255,255,255,0.035) 1px," +
              "rgba(0,0,0,0) 4px," +
              "rgba(0,0,0,0) 8px)",
          }}
        />

        {/* Vignette + slight chroma */}
        <div
          className="pointer-events-none absolute inset-[-40px] opacity-[0.35]"
          style={{
            background:
              "radial-gradient(circle at center, transparent 55%, rgba(0,0,0,0.60) 100%)," +
              "linear-gradient(90deg, rgba(0,255,140,0.06), transparent 35%, rgba(0,255,140,0.04))",
          }}
        />

        <div className="relative p-7 md:p-10 text-emerald-50">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="text-[11px] px-3 py-1 rounded-full border border-emerald-300/20 bg-emerald-400/10 text-emerald-50/90"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Title line */}
          <h2 className="mt-5 text-xl md:text-2xl font-semibold tracking-tight text-emerald-50">
            <span className="text-emerald-200/90">{title}</span>
            <BlinkCursor />
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-base md:text-lg text-emerald-50/80">
            {subtitle}
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                         border border-emerald-300/25
                         bg-gradient-to-b from-emerald-400/15 to-emerald-400/5
                         text-emerald-50/95 font-bold tracking-[0.08em] uppercase
                         transition duration-200
                         hover:-translate-y-[1px]
                         hover:border-emerald-300/40
                         hover:shadow-[0_0_22px_rgba(34,197,94,0.35)]"
            >
              {primaryText}
            </a>

            <a
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                         border border-emerald-300/25
                         bg-gradient-to-b from-emerald-400/15 to-emerald-400/5
                         text-emerald-50/95 font-bold tracking-[0.08em] uppercase
                         transition duration-200
                         hover:-translate-y-[1px]
                         hover:border-emerald-300/40
                         hover:shadow-[0_0_22px_rgba(34,197,94,0.35)]"
            >
              {secondaryText}
            </a>
          </div>

          {/* Extra area */}
          {children ? (
            <div className="mt-8 rounded-xl border border-emerald-300/15 bg-black/25 p-4 text-sm text-emerald-50/80">
              {children}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-emerald-300/15 bg-black/25 p-4 text-sm text-emerald-50/80">
              <p>$ status --summary</p>
              <p className="mt-2 text-emerald-50/70">
                ✓ design systems • ✓ react/ts • ✓ ui/ux • ✓ shipping fast
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BlinkCursor() {
  return (
    <span
      className="ml-2 inline-block translate-y-[2px]"
      style={{
        width: 10,
        height: 18,
        background: "rgba(183,255,207,0.9)",
        boxShadow: "0 0 10px rgba(34,197,94,0.35)",
        animation: "blink 1.05s steps(1) infinite",
      }}
    />
  );
}
