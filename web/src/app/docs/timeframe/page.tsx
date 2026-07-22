import { ScrollReveal } from "@/components/ScrollReveal";
import { DocTable } from "@/components/DocTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeframe",
  description: "Learn how to configure timeframes in git-recap.",
};

const timeframes = [
  { method: "Default", example: 'last 24 hours ("1 day ago")' },
  { method: "Today", example: "git-recap --today" },
  { method: "Yesterday", example: "git-recap --yesterday" },
  { method: "Week", example: "git-recap --week" },
  { method: "Flag", example: 'git-recap --since "3 days ago"' },
  { method: "Until", example: 'git-recap --until yesterday' },
  { method: "Env", example: 'GIT_RECAP_SINCE="1 week ago" git-recap' },
];

export default function TimeframePage() {
  return (
    <div className="pb-20">
      <ScrollReveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
          Timeframe
        </h1>
        <p className="mt-3 text-muted">
          Values pass through to{" "}
          <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">git log --since</code>
          , so any Git date expression works.{" "}
          <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">--yesterday</code> uses{" "}
          <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">
            --since &quot;yesterday 00:00&quot; --until &quot;today 00:00&quot;
          </code>
          .
        </p>
        <DocTable
          headers={["Method", "Example"]}
          rows={timeframes.map((r) => [r.method, r.example])}
        />
      </ScrollReveal>
    </div>
  );
}
