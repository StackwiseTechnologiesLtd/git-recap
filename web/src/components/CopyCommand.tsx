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
      className={`flex items-center gap-2 overflow-hidden rounded-xl border border-term-border bg-term-bg transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/20 ${className}`}
    >
      <pre className="min-w-0 flex-1 overflow-x-auto py-3.5 pl-3 font-mono text-[10px] leading-none whitespace-nowrap text-term-fg [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:pl-4 sm:text-sm sm:leading-none">
        <span className="text-term-prompt select-none">$ </span>
        {command}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy install command"}
        className="mr-2 shrink-0 rounded-lg bg-accent-fill px-3 py-1.5 text-xs font-medium tracking-wide text-white transition-colors hover:bg-accent-fill-hover sm:mr-2.5 sm:px-3.5 sm:text-sm"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
