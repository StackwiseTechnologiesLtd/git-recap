"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

// Hardcoded search index
const searchIndex = [
  {
    section: "Getting Started",
    items: [
      { title: "Introduction", desc: "Why git-recap and what it does", url: "/docs" },
      { title: "Installation", desc: "Install via Homebrew or source", url: "/docs#installation" },
      { title: "Quick Start", desc: "Run your first recap", url: "/docs#quick-start" },
    ],
  },
  {
    section: "Built-in Modules",
    items: [
      { title: "The Grouping Algorithm", desc: "How conventional commits are handled", url: "/docs/modules#the-grouping-algorithm" },
      { title: "Categories Overview", desc: "Features, Fixes, Docs, Refactors, Tests, Performance, Chores", url: "/docs/modules#categories-overview" },
      { title: "The Other Bucket", desc: "Uncategorized commits", url: "/docs/modules#the-other-bucket" },
    ],
  },
  {
    section: "Timeframe Handling",
    items: [
      { title: "Deep Dive into Git Dates", desc: "How --since and --until flags work", url: "/docs/timeframe" },
      { title: "Common Scenarios", desc: "The Daily Standup and The Weekly Sync", url: "/docs/timeframe#common-scenarios" },
      { title: "Environment Variables", desc: "Setting GIT_RECAP_SINCE", url: "/docs/timeframe#environment-variables" },
    ],
  },
  {
    section: "Routing & Monorepos",
    items: [
      { title: "Directory Scanning", desc: "How it automatically finds repositories", url: "/docs/routing" },
      { title: "Deep Scanning (-r)", desc: "Recursive scanning for nested repos", url: "/docs/routing#deep-scanning--r" },
      { title: "Targeted Runs", desc: "Passing explicit directory paths", url: "/docs/routing#targeted-runs" },
    ],
  },
  {
    section: "Options & API",
    items: [
      { title: "Time & Author Filtering", desc: "--since, --until, --today, --yesterday, --author", url: "/docs/options" },
      { title: "Output Formatting", desc: "--plain, --color, --summary-only, --flat, --json", url: "/docs/options" },
      { title: "Integration Use-Cases", desc: "JSON automation and GitHub PR Reviews", url: "/docs/options#integration-use-cases" },
    ],
  },
  {
    section: "Requirements",
    items: [
      { title: "System Prerequisites", desc: "Bash and Git dependencies", url: "/docs/requirements" },
      { title: "Troubleshooting Author Matching", desc: "Fixing empty output and git config user.email", url: "/docs/requirements#troubleshooting-author-matching" },
    ],
  },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Flatten items for easy keyboard navigation
  const filteredSections = searchIndex
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.desc.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  const flatItems = filteredSections.flatMap((s) => s.items);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      // Small timeout to allow render before focus
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % flatItems.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length);
          break;
        case "Enter":
          e.preventDefault();
          if (flatItems[selectedIndex]) {
            router.push(flatItems[selectedIndex].url);
            onClose();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, flatItems, selectedIndex, onClose, router]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32"
      onClick={onClose}
    >
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      {/* Modal */}
      <div 
        className="relative w-full max-w-2xl transform rounded-2xl bg-bg-panel border border-line shadow-2xl transition-all m-4 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Area */}
        <div className="flex items-center border-b border-line px-4">
          <svg
            className="pointer-events-none h-5 w-5 text-muted"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="h-14 w-full bg-transparent border-0 px-4 text-fg placeholder:text-muted focus:ring-0 sm:text-sm outline-none"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="hidden sm:inline-flex items-center rounded-md bg-bg-elevated border border-line px-2 py-0.5 text-xs font-medium text-muted">
            ESC
          </span>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-line scrollbar-track-transparent">
          {flatItems.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted">
              No results found for &quot;{query}&quot;.
            </div>
          ) : (
            filteredSections.map((section) => (
              <div key={section.section} className="mb-2">
                <h2 className="px-4 py-2 text-xs font-semibold text-muted tracking-wider uppercase">
                  {section.section}
                </h2>
                <ul className="text-sm text-fg">
                  {section.items.map((item) => {
                    const globalIndex = flatItems.findIndex((f) => f.url === item.url);
                    const isSelected = globalIndex === selectedIndex;
                    
                    return (
                      <li
                        key={item.url}
                        className={`flex cursor-pointer items-center justify-between px-4 py-3 select-none ${
                          isSelected ? "bg-accent/10 text-accent" : "hover:bg-bg-elevated/50"
                        }`}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        onClick={() => {
                          router.push(item.url);
                          onClose();
                        }}
                      >
                        <div className="flex flex-col">
                          <span className={`font-medium ${isSelected ? "text-accent" : "text-fg"}`}>
                            {item.title}
                          </span>
                          <span className={`text-xs mt-0.5 ${isSelected ? "text-accent/80" : "text-muted"}`}>
                            {item.desc}
                          </span>
                        </div>
                        {isSelected && (
                          <svg className="h-5 w-5 ml-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                          </svg>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
        
        {/* Footer */}
        <div className="border-t border-line px-4 py-3 bg-bg-elevated/30 flex items-center justify-end text-xs text-muted">
          <span className="flex items-center gap-1.5">
            Use <kbd className="font-sans px-1.5 py-0.5 rounded-md bg-bg-panel border border-line text-[10px]">↑</kbd> <kbd className="font-sans px-1.5 py-0.5 rounded-md bg-bg-panel border border-line text-[10px]">↓</kbd> to navigate, <kbd className="font-sans px-1.5 py-0.5 rounded-md bg-bg-panel border border-line text-[10px]">↵</kbd> to select
          </span>
        </div>
      </div>
    </div>
  );
}
