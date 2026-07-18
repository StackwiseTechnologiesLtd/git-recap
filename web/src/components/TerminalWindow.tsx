"use client";

import { useEffect, useRef, useState } from "react";

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
  /** Restart the demo after it finishes (hero). */
  loop?: boolean;
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

export function TerminalWindow({
  command,
  lines,
  title = "git-recap",
  caption,
  className = "",
  loop = false,
}: TerminalWindowProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [typed, setTyped] = useState("");
  const [visibleCount, setVisibleCount] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing" | "output" | "done">(
    "idle",
  );

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    let cancelled = false;
    const timers: number[] = [];
    const output = lines;
    const reduced = prefersReducedMotion();

    function finishImmediate() {
      if (cancelled) return;
      setTyped(command);
      setVisibleCount(output.length);
      setPhase("done");
    }

    function run() {
      if (reduced) {
        finishImmediate();
        return;
      }

      setTyped("");
      setVisibleCount(0);
      setPhase("typing");

      let i = 0;
      const typeNext = () => {
        if (cancelled) return;
        if (i <= command.length) {
          setTyped(command.slice(0, i));
          i += 1;
          timers.push(window.setTimeout(typeNext, 28 + Math.random() * 22));
          return;
        }
        setPhase("output");
        let line = 0;
        const revealNext = () => {
          if (cancelled) return;
          if (line < output.length) {
            line += 1;
            setVisibleCount(line);
            timers.push(window.setTimeout(revealNext, 70));
            return;
          }
          setPhase("done");
          if (loop) {
            timers.push(
              window.setTimeout(() => {
                if (!cancelled) run();
              }, 4200),
            );
          }
        };
        timers.push(window.setTimeout(revealNext, 280));
      };

      timers.push(window.setTimeout(typeNext, 320));
    }

    timers.push(window.setTimeout(run, 0));

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [active, command, loop, lines]);

  const showCaret = phase === "typing" || phase === "idle";
  const showEndCaret = phase === "done" || (phase === "output" && visibleCount === lines.length);

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
            {/* Reserve full command width so the line doesn't reflow while typing */}
            <span className="invisible" aria-hidden>
              {command.slice(typed.length)}
            </span>
            {showCaret ? (
              <span className="animate-caret text-term-green">▌</span>
            ) : null}
          </div>

          <div className="h-3" aria-hidden />

          {lines.map((line, index) => {
            const visible = index < visibleCount;
            const hidden = visible ? "" : "invisible";

            if (line.kind === "dim") {
              return (
                <div key={index} className={`text-term-faint ${hidden}`} aria-hidden={!visible}>
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
            className={`mt-3 text-term-fg ${showEndCaret ? "" : "invisible"}`}
            aria-hidden={!showEndCaret}
          >
            <span className="text-term-prompt select-none">$ </span>
            {showEndCaret ? (
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
