/**
 * Fixed, decorative page background: slow-floating aurora glows (with scroll parallax)
 * over a faint masked dot grid. The film grain is body::after in globals.css.
 */
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.35] mask-radial"
        style={{
          backgroundImage: "radial-gradient(rgb(255 237 203 / 0.1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="parallax-medium absolute -right-[20%] top-[25%] h-[60vmax] w-[60vmax]">
        <div
          className="h-full w-full animate-float rounded-full bg-[radial-gradient(circle,rgb(222_160_30/0.07),transparent_60%)] blur-3xl"
          style={{ animationDelay: "-6s", animationDuration: "24s" }}
        />
      </div>
      <div className="parallax-slow absolute -bottom-[30%] left-[20%] h-[55vmax] w-[55vmax]">
        <div
          className="h-full w-full animate-float rounded-full bg-[radial-gradient(circle,rgb(63_84_112/0.3),transparent_60%)] blur-3xl"
          style={{ animationDelay: "-12s", animationDuration: "30s" }}
        />
      </div>
    </div>
  );
}
