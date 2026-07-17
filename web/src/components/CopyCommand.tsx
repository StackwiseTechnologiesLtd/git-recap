"use client";

import { useState } from "react";

type CopyCommandProps = {
  command: string;
  className?: string;
};

export function CopyCommand({ command, className = "" }: CopyCommandProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-term-border bg-term-bg transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/20 ${className}`}
    >
      <pre className="overflow-x-auto py-3.5 pr-24 pl-4 font-mono text-[13px] leading-relaxed text-term-fg sm:pr-28 sm:text-sm">
        <span className="text-term-prompt select-none">$ </span>
        {command}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy install command"}
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg bg-accent-fill px-3 py-1.5 text-xs font-medium tracking-wide text-white transition-colors hover:bg-accent-fill-hover sm:right-2.5 sm:px-3.5 sm:text-sm"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
