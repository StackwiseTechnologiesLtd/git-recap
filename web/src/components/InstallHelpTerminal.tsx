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
          timers.push(window.setTimeout(revealRows, 120));
          return;
        }

        setTypingInstall(true);
        let i = 0;
        const typeInstall = () => {
          if (cancelled) return;
          if (i <= installCommand.length) {
            setTypedInstall(installCommand.slice(0, i));
            i += 1;
            timers.push(window.setTimeout(typeInstall, 22 + Math.random() * 18));
            return;
          }
          setTypingInstall(false);
          setDone(true);
        };
        timers.push(window.setTimeout(typeInstall, 400));
      };

      timers.push(window.setTimeout(revealRows, 900));
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

      <div className="px-5 py-10 sm:px-10 sm:py-14">
        <div
          className={`flex flex-col items-center text-center transition-all duration-700 ${
            brandVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <PixelLogo size={88} className="mb-6 sm:mb-7" />
          <PixelWordmark
            text="git-recap"
            scale={4}
            className="max-w-full overflow-visible"
          />
          <p className="mt-5 font-mono text-sm text-term-muted sm:text-base">
            &quot;{tagline}&quot;
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl space-y-3.5 sm:mt-12">
          {rows.map((row, index) => (
            <div
              key={row.cmd}
              className={`flex flex-col gap-0.5 font-mono text-[13px] leading-relaxed transition-opacity duration-300 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:text-sm ${
                index < rowCount ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="shrink-0 text-term-fg">
                <span className="text-term-prompt select-none">$ </span>
                {row.cmd}
              </span>
              <span className="text-term-muted sm:text-right">{row.note}</span>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-xl border-t border-term-border pt-8 sm:mt-12">
          <p className="min-h-[3.5rem] break-all font-mono text-[12px] leading-relaxed text-term-fg sm:min-h-[2.75rem] sm:text-[13px]">
            <span className="text-term-muted">{installLabel}: </span>
            <span className="text-term-green">{typedInstall}</span>
            {typingInstall || done ? (
              <span className="animate-caret text-term-green">▌</span>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
}
