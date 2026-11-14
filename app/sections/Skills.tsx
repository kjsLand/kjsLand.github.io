import { skills } from "@/content";
import Reveal from "@/app/components/ui/Reveal";
import Section from "@/app/components/ui/Section";
import SkillIcon from "@/app/components/ui/SkillIcon";
import SpotlightCard from "@/app/components/ui/SpotlightCard";

export default function Skills({ index }: { index?: number }) {
  return (
    <Section
      id="skills"
      index={index}
      eyebrow="Toolkit"
      title="Skills I"
      accent="bring"
      description="Collected across work, research, and side projects."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.name} delay={i * 100} className="h-full">
            <SpotlightCard className="h-full p-6 md:p-7">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold tracking-tight text-fg">{group.name}</h3>
                <span className="font-mono text-xs text-faint">{String(group.items.length).padStart(2, "0")}</span>
              </div>
              <ul className="mt-6 grid gap-1">
                {group.items.map((s) => (
                  <li
                    key={s}
                    className="group/skill flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] text-muted transition-colors hover:bg-white/[0.04] hover:text-fg"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-white/[0.02] text-faint transition-colors group-hover/skill:border-gold/30 group-hover/skill:text-gold">
                      <SkillIcon name={s} />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
