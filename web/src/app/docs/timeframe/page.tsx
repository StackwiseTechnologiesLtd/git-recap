import { ScrollReveal } from "@/components/ScrollReveal";
import { DocTable } from "@/components/DocTable";
import { CopyCommand } from "@/components/CopyCommand";
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
  { method: "Custom Flag", example: 'git-recap --since "3 days ago"' },
  { method: "Bounded Window", example: 'git-recap --until yesterday' },
  { method: "Environment", example: 'GIT_RECAP_SINCE="1 week ago" git-recap' },
];

export default function TimeframePage() {
  return (
    <div className="pb-20">
      <ScrollReveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
          Timeframe Handling
        </h1>
        <p className="mt-3 text-lg text-muted leading-relaxed">
          git-recap integrates seamlessly with Git's internal date parsing engine, meaning you can pass almost any natural language date or specific timestamp to filter your commits.
        </p>
      </ScrollReveal>

      <div className="mt-16">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Deep Dive into Git Dates</h2>
          <p className="text-muted leading-relaxed mb-6">
            Under the hood, any value passed to the <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">--since</code> or <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">--until</code> flags is directly fed into <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">git log</code>. This provides immense flexibility. You can use relative dates ("2 weeks ago"), absolute dates ("2023-10-01"), or even specific times ("yesterday 10:00am").
          </p>
          <DocTable
            headers={["Scenario", "Command Example"]}
            rows={timeframes.map((r) => [r.method, r.example])}
          />
        </ScrollReveal>
      </div>

      <div className="mt-16">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Common Scenarios</h2>
          
          <div className="space-y-8">
            <div className="p-5 rounded-2xl border border-line bg-bg-panel shadow-sm">
              <h3 className="text-lg font-medium text-fg mb-2">The Daily Standup</h3>
              <p className="text-sm text-muted mb-4 leading-relaxed">
                If your standup is every morning, you typically want to see everything you did yesterday, plus any early-morning commits today. The <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">--yesterday</code> flag perfectly encapsulates "from Yesterday 00:00 to Today 00:00". Alternatively, use <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">--today</code> to get everything since midnight.
              </p>
              <div className="bg-term-bg rounded-lg border border-term-border">
                <CopyCommand command="git-recap --today" className="border-0 shadow-none hover:translate-y-0" />
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-line bg-bg-panel shadow-sm">
              <h3 className="text-lg font-medium text-fg mb-2">The Weekly Sync</h3>
              <p className="text-sm text-muted mb-4 leading-relaxed">
                For weekly updates, sprint planning, or 1-on-1s, you can use the <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">--week</code> shortcut, or specify exact boundaries if your sprint starts on a Wednesday.
              </p>
              <div className="bg-term-bg rounded-lg border border-term-border">
                <CopyCommand command='git-recap --since "last wednesday"' className="border-0 shadow-none hover:translate-y-0" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-16">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Environment Variables</h2>
          <p className="text-muted leading-relaxed mb-6">
            If you find yourself frequently running the same timeframe, you can set it via environment variables in your <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">~/.bashrc</code> or <code className="font-mono text-xs text-fg/80 bg-bg-elevated px-1 py-0.5 rounded border border-line/50">~/.zshrc</code> file.
          </p>
          <pre className="overflow-x-auto rounded-2xl border border-term-border bg-term-bg px-5 py-4 font-mono text-[13px] leading-relaxed text-term-fg sm:text-sm shadow-sm">
            <span className="text-term-muted"># Set default recap window to the last 48 hours</span>{"\n"}
            <span className="text-term-prompt select-none">export </span>
            GIT_RECAP_SINCE=&quot;2 days ago&quot;{"\n"}
          </pre>
        </ScrollReveal>
      </div>

    </div>
  );
}
