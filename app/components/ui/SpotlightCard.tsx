"use client";

import type { ElementType, PointerEvent, ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/**
 * A card with a glow and border highlight that follow the cursor.
 * It writes CSS variables directly (no React re-render per mouse move). The look lives in globals.css (.spotlight).
 */
export default function SpotlightCard({ children, as: Tag = "div", className = "" }: SpotlightCardProps) {
  function onPointerMove(e: PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <Tag onPointerMove={onPointerMove} className={`spotlight ${className}`}>
      {children}
    </Tag>
  );
}
