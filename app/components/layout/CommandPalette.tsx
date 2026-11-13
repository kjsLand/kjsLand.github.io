"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FiArrowUpRight, FiCornerDownLeft, FiHash, FiSearch } from "react-icons/fi";

export type PaletteItem = {
  label: string;
  group: string;
  href: string;
  hint?: string;
  external?: boolean;
};

const OPEN_EVENT = "open-command-palette";

/** Call from anywhere (e.g. a button) to open the palette. */
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/**
 * ⌘K / Ctrl+K command palette. Items are generated from the content files in page.tsx,
 * so new projects and links show up here automatically.
 */
export default function CommandPalette({ items }: { items: PaletteItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setQuery("");
        setCursor(0);
        setOpen((o) => !o);
      }
    };
    const onOpen = () => {
      setQuery("");
      setCursor(0);
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => inputRef.current?.focus(), 10);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.group} ${i.hint ?? ""}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${cursor}"]`)?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  function go(item: PaletteItem) {
    setOpen(false);
    if (item.external) window.open(item.href, "_blank", "noopener,noreferrer");
    else window.location.assign(item.href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && results[cursor]) {
      e.preventDefault();
      go(results[cursor]);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]" onKeyDown={onKeyDown}>
      <button
        aria-label="Close command palette"
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="glass relative w-full max-w-xl overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <FiSearch className="h-4 w-4 text-muted" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            placeholder="Jump to a section, project, or link…"
            className="h-14 w-full bg-transparent text-sm text-fg outline-none placeholder:text-faint focus-visible:outline-none"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[cursor] ? `palette-${cursor}` : undefined}
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
        </div>

        <ul ref={listRef} id="palette-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">No results.</li>}
          {results.map((item, i) => {
            const header = i === 0 || results[i - 1].group !== item.group ? item.group : null;
            return (
              <li key={`${item.group}-${item.label}`} role="presentation">
                {header && (
                  <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{header}</p>
                )}
                <div
                  id={`palette-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={i === cursor}
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => go(item)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                    i === cursor ? "bg-white/[0.07] text-fg" : "text-muted"
                  }`}
                >
                  {item.external ? (
                    <FiArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                  ) : (
                    <FiHash className="h-4 w-4 shrink-0" aria-hidden />
                  )}
                  <span className="truncate">{item.label}</span>
                  {item.hint && <span className="ml-auto truncate font-mono text-[11px] text-faint">{item.hint}</span>}
                  {i === cursor && <FiCornerDownLeft className="ml-2 h-3.5 w-3.5 shrink-0 text-faint" aria-hidden />}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
