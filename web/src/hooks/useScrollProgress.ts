"use client";

import { useEffect, useState, type RefObject } from "react";

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n));
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Maps an element's position in the viewport to 0–1 progress.
 * Scrolls both ways: progress rises as the element moves up into view,
 * and falls again when scrolling back up.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  options?: {
    /** Viewport fraction where animation starts (element top). Default 0.92 */
    start?: number;
    /** Viewport fraction where animation completes (element top). Default 0.28 */
    end?: number;
    /** When false, progress stays at 0 and listeners are skipped. */
    enabled?: boolean;
  },
) {
  const startFrac = options?.start ?? 0.92;
  const endFrac = options?.end ?? 0.28;
  const enabled = options?.enabled ?? true;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) {
      const id = window.requestAnimationFrame(() => setProgress(0));
      return () => window.cancelAnimationFrame(id);
    }

    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const reduced = prefersReducedMotion();

    const measure = () => {
      frame = 0;
      if (reduced) {
        setProgress(1);
        return;
      }
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * startFrac;
      const end = vh * endFrac;
      const next = clamp((start - rect.top) / Math.max(start - end, 1));
      setProgress((prev) => (Math.abs(prev - next) < 0.002 ? prev : next));
    };

    const onScrollOrResize = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    frame = window.requestAnimationFrame(measure);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [ref, startFrac, endFrac, enabled]);

  return progress;
}
