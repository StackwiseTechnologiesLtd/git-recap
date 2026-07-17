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
      className={`flex items-stretch overflow-hidden rounded-xl border border-line-strong bg-bg-elevated transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-[0_10px_28px_rgba(84,17,17,0.08)] ${className}`}
    >
      <pre className="flex-1 overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-relaxed text-fg sm:text-sm">
        <span className="text-accent select-none">$ </span>
        {command}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy install command"}
        className="shrink-0 border-l border-line-strong px-4 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
