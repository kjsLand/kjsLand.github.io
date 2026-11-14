import { FiArrowUp } from "react-icons/fi";
import { site, socials } from "@/content";
import SocialIcon from "@/app/components/ui/SocialIcon";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row md:px-8">
        <div className="text-center md:text-left">
          <p className="text-sm text-fg">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="mt-1 font-mono text-xs text-faint">
            Built with Next.js & Tailwind · press <kbd className="text-muted">⌘K</kbd> to navigate
          </p>
        </div>

        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              {...(s.icon === "email" ? {} : { target: "_blank", rel: "noreferrer" })}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-white/20 hover:text-fg"
            >
              <SocialIcon icon={s.icon} className="h-4 w-4" />
            </a>
          ))}
          <a
            href="#top"
            className="ml-2 flex items-center gap-1.5 rounded-full border border-line px-4 py-2.5 font-mono text-xs text-muted transition-colors hover:border-white/20 hover:text-fg"
          >
            <FiArrowUp className="h-3.5 w-3.5" aria-hidden /> Top
          </a>
        </div>
      </div>
    </footer>
  );
}
