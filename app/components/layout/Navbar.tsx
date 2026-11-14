"use client";

import { useEffect, useState } from "react";
import { FiCommand, FiMenu, FiX } from "react-icons/fi";
import { openCommandPalette } from "./CommandPalette";

/** `href` defaults to `#id` (an in-page section). Set it to link to another page, e.g. "/experience". */
export type NavItem = { id: string; label: string; href?: string };

/**
 * Floating glass navbar. It hides on scroll down, reappears on scroll up, and highlights
 * the section in view (scroll-spy), or the `current` page. Page links live in app/lib/nav.ts.
 */
export default function Navbar({
  items,
  brand,
  brandHref = "#top",
  current,
}: {
  items: NavItem[];
  brand: string;
  /** Where the monogram links. On sub-pages, point it at "/". */
  brandHref?: string;
  /** Force an item to show as active (for a page link rather than a scroll-spied section). */
  current?: string;
}) {
  const [spied, setActive] = useState<string>("");
  const active = current ?? spied;
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Hide on scroll down / show on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 8) {
        setHidden(y > last && y > 400);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: the section crossing the middle band of the viewport is "active".
  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <header
      className={`fixed inset-x-0 top-3 z-50 flex justify-center px-3 transition-transform duration-500 ease-out-expo md:top-5 ${
        hidden && !open ? "-translate-y-[150%]" : ""
      }`}
    >
      <nav
        aria-label="Primary"
        className={`glass flex w-full max-w-4xl items-center justify-between gap-2 rounded-full py-2 pl-5 pr-2 transition-shadow duration-500 ${
          scrolled ? "shadow-[0_10px_40px_-10px_rgb(0_0_0/0.8)]" : ""
        }`}
      >
        <a href={brandHref} className="flex items-center gap-2 font-semibold tracking-tight text-fg">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-gold font-mono text-[11px] font-bold text-ink">
            {brand
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </span>
          <span className="hidden sm:inline">{brand}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={item.href ?? `#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active === item.id ? "bg-white/[0.08] text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openCommandPalette}
            className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-white/20 hover:text-fg"
            aria-label="Open command palette"
          >
            <FiCommand className="h-3.5 w-3.5" /> K
          </button>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-nav" className="absolute border border-line bg-ink-2/95 backdrop-blur-xl inset-x-3 top-[calc(100%+0.5rem)] rounded-3xl p-3 md:hidden">
          <ul className="grid gap-1">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href ?? `#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-base ${
                    active === item.id ? "bg-white/[0.08] text-fg" : "text-muted"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
