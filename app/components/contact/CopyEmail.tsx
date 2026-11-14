"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

/** Copies the email to the clipboard and shows a confirmation for two seconds. */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-3 rounded-full border border-line bg-white/[0.03] py-2 pl-5 pr-2 font-mono text-sm text-fg transition-colors hover:border-white/20"
    >
      {email}
      <span
        className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
          copied ? "bg-mint text-ink" : "bg-white/[0.08] text-muted group-hover:text-fg"
        }`}
      >
        {copied ? <FiCheck aria-hidden /> : <FiCopy aria-hidden />}
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
}
