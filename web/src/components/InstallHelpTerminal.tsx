"use client";

import { useEffect, useRef, useState } from "react";
import { PixelLogo, PixelWordmark } from "@/components/PixelBrand";

type HelpRow = { cmd: string; note: string };

type InstallHelpTerminalProps = {
  rows: HelpRow[];
  installLabel?: string;
  installCommand: string;
  tagline?: string;
  className?: string;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function InstallHelpTerminal({
  rows,
  installLabel = "install",
  installCommand,
  tagline = "Your commits, ready for standup",
  className = "",
}: InstallHelpTerminalProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [typedInstall, setTypedInstall] = useState("");
  const [typingInstall, setTypingInstall] = useState(false);
  const [done, setDone] = useState(false);

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
      { threshold: 0.18 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    let cancelled = false;
    const timers: number[] = [];
    const demoRows = rows;
    const reduced = prefersReducedMotion();

    const start = () => {
      if (cancelled) return;

      if (reduced) {
        setBrandVisible(true);
        setRowCount(demoRows.length);
        setTypedInstall(installCommand);
        setDone(true);
        return;
      }

      setBrandVisible(false);
      setRowCount(0);
      setTypedInstall("");
      setTypingInstall(false);
      setDone(false);

      timers.push(
        window.setTimeout(() => {
          if (!cancelled) setBrandVisible(true);
        }, 200),
      );

      let row = 0;
      const revealRows = () => {
        if (cancelled) return;
        if (row < demoRows.length) {
          row += 1;
          setRowCount(row);
          timers.push(window.setTimeout(revealRows, 110));
          return;
        }

        setTypingInstall(true);
        let i = 0;
        const typeInstall = () => {
          if (cancelled) return;
          if (i <= installCommand.length) {
            setTypedInstall(installCommand.slice(0, i));
            i += 1;
            timers.push(window.setTimeout(typeInstall, 20 + Math.random() * 16));
            return;
          }
          setTypingInstall(false);
          setDone(true);
        };
        timers.push(window.setTimeout(typeInstall, 380));
      };

      timers.push(window.setTimeout(revealRows, 850));
    };

    timers.push(window.setTimeout(start, 0));

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [active, installCommand, rows]);

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
          className={`transition-all duration-700 ${
            brandVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
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
                className={`grid gap-1 font-mono text-[12px] leading-relaxed transition-opacity duration-300 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] sm:items-baseline sm:gap-6 sm:text-[13px] ${
                  index < rowCount ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="min-w-0 text-term-fg">
                  <span className="text-term-prompt select-none">$ </span>
                  {row.cmd}
                </span>
                <span className="text-term-muted sm:text-right">{row.note}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-xl sm:mt-9">
          <div className="rounded-xl border border-term-border bg-term-elevated/80 px-4 py-3.5 sm:px-5">
            <p className="min-h-[3.25rem] break-all font-mono text-[12px] leading-relaxed text-term-fg sm:min-h-[2.5rem] sm:text-[13px]">
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
