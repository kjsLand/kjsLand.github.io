"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
};

const variants = {
  primary:
    "bg-fg text-ink hover:shadow-[0_0_40px_-6px_rgb(222_160_30/0.55)]",
  ghost:
    "border border-line bg-white/[0.03] text-fg hover:border-white/20 hover:bg-white/[0.06]",
};

/** A button-style link that leans toward the cursor and springs back when it leaves. */
export default function MagneticLink({ href, children, variant = "primary", className = "", external }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(e: PointerEvent<HTMLAnchorElement>) {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[transform,box-shadow,background-color,border-color] duration-500 ease-out-expo ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
