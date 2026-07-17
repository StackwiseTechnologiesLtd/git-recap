type Line =
  | { kind: "dim"; text: string }
  | { kind: "title"; text: string }
  | { kind: "cat"; text: string; tone?: "green" | "yellow" | "magenta" | "cyan" }
  | { kind: "bullet"; text: string; hash?: string };

type TerminalWindowProps = {
  title?: string;
  lines: Line[];
  caption?: string;
  className?: string;
  animateLines?: boolean;
};

const toneClass = {
  green: "text-term-green",
  yellow: "text-term-yellow",
  magenta: "text-term-magenta",
  cyan: "text-term-cyan",
} as const;

export function TerminalWindow({
  title = "git-recap",
  lines,
  caption,
  className = "",
  animateLines = false,
}: TerminalWindowProps) {
  return (
    <figure className={className}>
      <div className="panel-hover overflow-hidden rounded-2xl border border-term-border bg-term-bg shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
        <div className="flex items-center gap-2 border-b border-term-border bg-term-elevated px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-xs text-term-faint">{title}</span>
        </div>
        <pre className="min-h-[220px] overflow-x-auto px-4 py-4 font-mono text-[12px] leading-6 text-term-fg sm:min-h-[260px] sm:px-5 sm:text-[13px]">
          {lines.map((line, index) => {
            const lineStyle = animateLines
              ? {
                  animation: `rise 0.45s cubic-bezier(0.22, 1, 0.36, 1) ${0.05 * index}s both`,
                }
              : undefined;

            if (line.kind === "dim") {
              return (
                <div key={index} className="text-term-faint" style={lineStyle}>
                  {line.text}
                </div>
              );
            }
            if (line.kind === "title") {
              return (
                <div key={index} className="font-medium text-term-cyan" style={lineStyle}>
                  {line.text}
                </div>
              );
            }
            if (line.kind === "cat") {
              return (
                <div
                  key={index}
                  className={`mt-2 font-medium ${toneClass[line.tone ?? "green"]}`}
                  style={lineStyle}
                >
                  {line.text}
                </div>
              );
            }
            return (
              <div key={index} className="pl-3 text-term-fg/95" style={lineStyle}>
                <span className="text-term-prompt">• </span>
                {line.text}
                {line.hash ? (
                  <span className="text-term-faint"> ({line.hash})</span>
                ) : null}
              </div>
            );
          })}
          {animateLines ? (
            <div className="mt-2 pl-1 text-term-green">
              <span className="animate-caret">▌</span>
            </div>
          ) : null}
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
