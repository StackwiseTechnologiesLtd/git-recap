"use client";

import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "#features", label: "features" },
  { href: "#install", label: "install" },
  { href: "#help", label: "help" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:h-16 sm:px-8">
        <a href="#" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Image
            src="/logo.svg"
            alt=""
            width={28}
            height={27}
            className="h-7 w-auto"
            priority
          />
          <span>git-recap</span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-fg"
            >
              {link.label}
            </a>
          ))}
          <span className="h-4 w-px bg-line-strong" aria-hidden />
          <a
            href="https://github.com/StackwiseTechnologiesLtd/git-recap"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-fg"
            aria-label="GitHub"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
        </nav>

        <button
          type="button"
          className="rounded-lg border border-line-strong px-3 py-1.5 text-sm text-muted md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </div>

      {open ? (
        <nav className="border-t border-line px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm text-muted">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-fg"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/StackwiseTechnologiesLtd/git-recap"
              target="_blank"
              rel="noreferrer"
              className="hover:text-fg"
            >
              GitHub
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6a4.6 4.6 0 0 1 1.2-3.2 4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.6 4.4 18.6 4.7 18.6 4.7a4.3 4.3 0 0 1 .1 3.2 4.6 4.6 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
    </svg>
  );
}
