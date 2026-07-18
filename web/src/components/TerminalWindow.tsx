"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  /** Timed loop (hero). Ignores scroll. */
  loop?: boolean;
  /** Viewport fraction where typing starts when not looping. */
  scrollStart?: number;
  /** Viewport fraction where output completes when not looping. */
  scrollEnd?: number;
};

const toneClass = {
  green: "text-term-green",
  yellow: "text-term-yellow",
  magenta: "text-term-magenta",
  cyan: "text-term-cyan",
} as const;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function progressToState(
  progress: number,
  command: string,
  lineCount: number,
) {
  const typeWeight = Math.max(command.length, 10);
  const lineWeight = Math.max(lineCount, 1) * 2.2;
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
  const count = Math.min(lineCount, Math.round(lineProgress * lineCount));
  return {
    typed: command,
    visibleCount: count,
    typing: false,
    done: count >= lineCount,
  };
}

function useLoopProgress(enabled: boolean, lineCount: number, commandLen: number) {
  const [progress, setProgress] = useState(enabled ? 0 : 1);

  useEffect(() => {
    if (!enabled) return;

    if (prefersReducedMotion()) {
      const id = window.requestAnimationFrame(() => setProgress(1));
      return () => window.cancelAnimationFrame(id);
    }

    let cancelled = false;
    let frame = 0;
    const start = performance.now();
    // ~ command typing + line reveals + hold
    const typeMs = Math.max(900, commandLen * 45);
    const lineMs = Math.max(600, lineCount * 120);
    const holdMs = 3200;
    const cycle = typeMs + lineMs + holdMs;

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = (now - start) % cycle;
      let next: number;
      if (elapsed < typeMs) {
        next = (elapsed / typeMs) * 0.42;
      } else if (elapsed < typeMs + lineMs) {
        next = 0.42 + ((elapsed - typeMs) / lineMs) * 0.58;
      } else {
        next = 1;
      }
      setProgress((prev) => (Math.abs(prev - next) < 0.004 ? prev : next));
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [enabled, lineCount, commandLen]);

  return progress;
}

export function TerminalWindow({
  command,
  lines,
  title = "git-recap",
  caption,
  className = "",
  loop = false,
  scrollStart,
  scrollEnd,
}: TerminalWindowProps) {
  const rootRef = useRef<HTMLElement>(null);
  const scrollProgress = useScrollProgress(rootRef, {
    start: scrollStart,
    end: scrollEnd,
    enabled: !loop,
  });
  const loopProgress = useLoopProgress(loop, lines.length, command.length);
  const progress = loop ? loopProgress : scrollProgress;

  const { typed, visibleCount, typing, done } = useMemo(
    () => progressToState(progress, command, lines.length),
    [progress, command, lines.length],
  );

  return (
    <figure ref={rootRef} className={className}>
      <div className="panel-hover overflow-hidden rounded-2xl border border-term-border bg-term-bg">
        <div className="flex items-center gap-2 border-b border-term-border bg-term-elevated px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 truncate font-mono text-xs text-term-faint">
            {title}
          </span>
        </div>
        <pre className="overflow-hidden px-3 py-3.5 font-mono text-[11px] leading-5 break-words whitespace-pre-wrap text-term-fg sm:px-5 sm:py-4 sm:text-[13px] sm:leading-6">
          <div className="text-term-fg">
            <span className="text-term-prompt select-none">$ </span>
            <span>{typed}</span>
            {typing || progress < 0.02 ? (
              <span className="animate-caret text-term-green">▌</span>
            ) : null}
            <span className="invisible" aria-hidden>
              {command.slice(typed.length)}
            </span>
          </div>

          <div className="h-2.5 sm:h-3" aria-hidden />

          {lines.map((line, index) => {
            const visible = index < visibleCount;
            const hidden = visible ? "" : "invisible";

            if (line.kind === "dim") {
              return (
                <div
                  key={index}
                  className={`truncate text-term-faint ${hidden}`}
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
                  className={`truncate font-medium text-term-cyan ${hidden}`}
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
                  className={`mt-1.5 truncate font-medium sm:mt-2 ${toneClass[line.tone ?? "green"]} ${hidden}`}
                  aria-hidden={!visible}
                >
                  {line.text}
                </div>
              );
            }
            return (
              <div
                key={index}
                className={`truncate pl-2 text-term-fg/95 sm:pl-3 ${hidden}`}
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
            className={`mt-2 text-term-fg sm:mt-3 ${done ? "" : "invisible"}`}
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
