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
      className={`flex items-stretch overflow-hidden rounded-xl border border-term-border bg-term-bg transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/20 ${className}`}
    >
      <pre className="flex-1 overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-relaxed text-term-fg sm:text-sm">
        <span className="text-term-prompt select-none">$ </span>
        {command}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy install command"}
        className="shrink-0 border-l border-term-border px-4 text-sm font-medium text-term-muted transition-colors hover:bg-white/5 hover:text-term-fg"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
