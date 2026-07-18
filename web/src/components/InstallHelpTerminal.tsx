"use client";

import { useMemo, useRef } from "react";
import { PixelLogo, PixelWordmark } from "@/components/PixelBrand";
import { useScrollProgress } from "@/hooks/useScrollProgress";

type HelpRow = { cmd: string; note: string };

type InstallHelpTerminalProps = {
  rows: HelpRow[];
  installLabel?: string;
  installCommand: string;
  tagline?: string;
  className?: string;
};

export function InstallHelpTerminal({
  rows,
  installLabel = "install",
  installCommand,
  tagline = "Your commits, ready for standup",
  className = "",
}: InstallHelpTerminalProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(rootRef, { start: 0.95, end: 0.22 });

  const { brandOpacity, rowCount, typedInstall, typingInstall, done } =
    useMemo(() => {
      // 0–0.18 brand, 0.18–0.62 rows, 0.62–1 install typing
      const brandOpacity = Math.min(1, progress / 0.18);

      let rowCount = 0;
      if (progress > 0.18) {
        const rowT = Math.min(1, (progress - 0.18) / 0.44);
        rowCount = Math.round(rowT * rows.length);
      }

      let typedInstall = "";
      let typingInstall = false;
      let done = false;
      if (progress > 0.62) {
        const typeT = Math.min(1, (progress - 0.62) / 0.38);
        const chars = Math.round(typeT * installCommand.length);
        typedInstall = installCommand.slice(0, chars);
        typingInstall = chars < installCommand.length;
        done = chars >= installCommand.length;
      } else if (rowCount >= rows.length && progress > 0.55) {
        typingInstall = true;
      }

      return { brandOpacity, rowCount, typedInstall, typingInstall, done };
    }, [progress, rows.length, installCommand]);

  return (
    <div
      ref={rootRef}
      className={`overflow-hidden rounded-2xl border border-term-border bg-term-bg ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-term-border bg-term-elevated px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-term-faint">git-recap — help</span>
      </div>

      <div className="px-5 py-9 sm:px-10 sm:py-12">
        <div
          style={{
            opacity: brandOpacity,
            transform: `translateY(${(1 - brandOpacity) * 12}px)`,
          }}
          className="will-change-transform"
        >
          <div className="flex items-center justify-center gap-4 sm:gap-5">
            <PixelLogo size={64} className="shrink-0 sm:scale-110" />
            <div className="min-w-0 text-left">
              <PixelWordmark
                text="git-recap"
                scale={3.5}
                className="max-w-full"
              />
              <p className="mt-2.5 font-mono text-xs text-term-muted sm:text-sm">
                &quot;{tagline}&quot;
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-9 max-w-xl rounded-xl border border-term-border/80 bg-black/25 px-4 py-4 sm:mt-11 sm:px-5 sm:py-5">
          <div className="space-y-3">
            {rows.map((row, index) => (
              <div
                key={row.cmd}
                className="grid gap-1 font-mono text-[12px] leading-relaxed sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] sm:items-baseline sm:gap-6 sm:text-[13px]"
                style={{
                  opacity: index < rowCount ? 1 : 0,
                  transform:
                    index < rowCount ? "none" : "translateY(4px)",
                }}
              >
                <span className="min-w-0 truncate text-term-fg">
                  <span className="text-term-prompt select-none">$ </span>
                  {row.cmd}
                </span>
                <span className="truncate text-term-muted sm:text-right">{row.note}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-xl sm:mt-9">
          <div className="rounded-xl border border-term-border bg-term-elevated/80 px-4 py-3.5 sm:px-5">
            <p className="min-h-[3.25rem] break-words font-mono text-[12px] leading-relaxed text-term-fg sm:min-h-[2.5rem] sm:text-[13px]">
              <span className="text-term-muted">{installLabel}: </span>
              <span className="text-term-green">{typedInstall}</span>
              {typingInstall || done ? (
                <span className="animate-caret text-term-green">▌</span>
              ) : null}
            </p>
          </div>
          <p className="mt-4 text-center font-mono text-[11px] text-term-faint sm:text-xs">
            by{" "}
            <a
              href="https://stackwisetechnologies.com/"
              target="_blank"
              rel="noreferrer"
              className="text-term-muted transition-colors hover:text-term-fg"
            >
              Stackwise Technologies
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
