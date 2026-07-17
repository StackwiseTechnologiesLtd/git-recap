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
  green: "text-green",
  yellow: "text-yellow",
  magenta: "text-magenta",
  cyan: "text-cyan",
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
      <div className="panel-hover overflow-hidden rounded-2xl border border-line-strong bg-bg-panel">
        <div className="flex items-center gap-2 border-b border-line bg-bg-elevated px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#d9d2cf]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d9d2cf]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d9d2cf]" />
          <span className="ml-2 font-mono text-xs text-faint">{title}</span>
        </div>
        <pre className="min-h-[220px] overflow-x-auto px-4 py-4 font-mono text-[12px] leading-6 text-fg sm:min-h-[260px] sm:px-5 sm:text-[13px]">
          {lines.map((line, index) => {
            const lineStyle = animateLines
              ? {
                  animation: `rise 0.45s cubic-bezier(0.22, 1, 0.36, 1) ${0.05 * index}s both`,
                }
              : undefined;

            if (line.kind === "dim") {
              return (
                <div key={index} className="text-faint" style={lineStyle}>
                  {line.text}
                </div>
              );
            }
            if (line.kind === "title") {
              return (
                <div key={index} className="font-medium text-accent" style={lineStyle}>
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
              <div key={index} className="pl-3 text-fg/90" style={lineStyle}>
                <span className="text-accent">• </span>
                {line.text}
                {line.hash ? (
                  <span className="text-faint"> ({line.hash})</span>
                ) : null}
              </div>
            );
          })}
          {animateLines ? (
            <div className="mt-2 pl-1 text-accent">
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
