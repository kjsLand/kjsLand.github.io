import { skills } from "@/content";
import SkillIcon from "@/app/components/ui/SkillIcon";

/** An infinite strip of every skill. The list is doubled so the -50% loop is seamless. Pauses on hover. */
export default function SkillMarquee() {
  const all = skills.flatMap((g) => g.items);
  const loop = [...all, ...all];

  return (
    <div aria-label="Skills" className="group relative overflow-hidden border-y border-line bg-ink-2/60 py-6">
      <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
        {loop.map((skill, i) => (
          <li
            key={`${skill}-${i}`}
            aria-hidden={i >= all.length}
            className="flex items-center gap-3 px-6 font-mono text-sm uppercase tracking-[0.2em] text-muted transition-colors hover:text-fg"
          >
            <SkillIcon name={skill} className="h-4 w-4 text-faint" />
            {skill}
            <span className="ml-6 text-gold/60">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
