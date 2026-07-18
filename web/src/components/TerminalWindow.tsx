"use client";

import { useMemo, useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export type TerminalLine =
  | { kind: "dim"; text: string }
  | { kind: "title"; text: string }
  | { kind: "cat"; text: string; tone?: "green" | "yellow" | "magenta" | "cyan" }
  | { kind: "bullet"; text: string; hash?: string };

type TerminalWindowProps = {
  command: string;
  lines: TerminalLine[];
  title?: string;
  caption?: string;
  className?: string;
  /** Viewport fraction where typing starts (element top). */
  scrollStart?: number;
  /** Viewport fraction where output completes (element top). */
  scrollEnd?: number;
};

const toneClass = {
  green: "text-term-green",
  yellow: "text-term-yellow",
  magenta: "text-term-magenta",
  cyan: "text-term-cyan",
} as const;

export function TerminalWindow({
  command,
  lines,
  title = "git-recap",
  caption,
  className = "",
  scrollStart,
  scrollEnd,
}: TerminalWindowProps) {
  const rootRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(rootRef, {
    start: scrollStart,
    end: scrollEnd,
  });

  const { typed, visibleCount, typing, done } = useMemo(() => {
    const typeWeight = Math.max(command.length, 10);
    const lineWeight = Math.max(lines.length, 1) * 2.2;
    const total = typeWeight + lineWeight;
    const units = progress * total;

    if (units <= typeWeight) {
      const chars = Math.round((units / typeWeight) * command.length);
      return {
        typed: command.slice(0, chars),
        visibleCount: 0,
        typing: chars < command.length,
        done: false,
      };
    }

    const lineProgress = (units - typeWeight) / lineWeight;
    const count = Math.min(
      lines.length,
      Math.round(lineProgress * lines.length),
    );
    return {
      typed: command,
      visibleCount: count,
      typing: false,
      done: count >= lines.length,
    };
  }, [command, lines, progress]);

  return (
    <figure ref={rootRef} className={className}>
      <div className="panel-hover overflow-hidden rounded-2xl border border-term-border bg-term-bg">
        <div className="flex items-center gap-2 border-b border-term-border bg-term-elevated px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-xs text-term-faint">{title}</span>
        </div>
        <pre className="overflow-x-auto px-4 py-4 font-mono text-[12px] leading-6 text-term-fg sm:px-5 sm:text-[13px]">
          <div className="text-term-fg">
            <span className="text-term-prompt select-none">$ </span>
            <span>{typed}</span>
            <span className="invisible" aria-hidden>
              {command.slice(typed.length)}
            </span>
            {typing || progress < 0.02 ? (
              <span className="animate-caret text-term-green">▌</span>
            ) : null}
          </div>

          <div className="h-3" aria-hidden />

          {lines.map((line, index) => {
            const visible = index < visibleCount;
            const hidden = visible ? "" : "invisible";

            if (line.kind === "dim") {
              return (
                <div
                  key={index}
                  className={`text-term-faint ${hidden}`}
                  aria-hidden={!visible}
                >
                  {line.text}
                </div>
              );
            }
            if (line.kind === "title") {
              return (
                <div
                  key={index}
                  className={`font-medium text-term-cyan ${hidden}`}
                  aria-hidden={!visible}
                >
                  {line.text}
                </div>
              );
            }
            if (line.kind === "cat") {
              return (
                <div
                  key={index}
                  className={`mt-2 font-medium ${toneClass[line.tone ?? "green"]} ${hidden}`}
                  aria-hidden={!visible}
                >
                  {line.text}
                </div>
              );
            }
            return (
              <div
                key={index}
                className={`pl-3 text-term-fg/95 ${hidden}`}
                aria-hidden={!visible}
              >
                <span className="text-term-prompt">• </span>
                {line.text}
                {line.hash ? (
                  <span className="text-term-faint"> ({line.hash})</span>
                ) : null}
              </div>
            );
          })}

          <div
            className={`mt-3 text-term-fg ${done ? "" : "invisible"}`}
            aria-hidden={!done}
          >
            <span className="text-term-prompt select-none">$ </span>
            {done ? (
              <span className="animate-caret text-term-green">▌</span>
            ) : (
              <span className="text-term-green">▌</span>
            )}
          </div>
        </pre>
      </div>
      {caption ? (
        <figcaption className="mt-4 text-center font-mono text-xs text-faint sm:text-[13px]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
