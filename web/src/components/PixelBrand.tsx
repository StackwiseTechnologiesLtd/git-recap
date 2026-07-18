/** Pixel-art brand mark + wordmark for the install terminal. */

const LOGO_GRID = [
  "................",
  "......XXXX......",
  "....XX....XX....",
  "...X........X...",
  "..X..........X..",
  "..X..........X..",
  ".X....XX......X.",
  ".X...X..X.....X.",
  ".X...X..XX....X.",
  ".X....XX.X....X.",
  "..X......X....X.",
  "..X.....X.X..X..",
  "...X...X...XX...",
  "....XX.....XX...",
  "......XXXXX.X...",
  ".............X..",
];

/** 5×7 glyphs for the wordmark (1 = on). */
const GLYPHS: Record<string, string[]> = {
  g: [
    ".###.",
    "#...#",
    "#....",
    "#.###",
    "#...#",
    "#...#",
    ".###.",
  ],
  i: [
    ".##..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    ".###.",
  ],
  t: [
    "#####",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
  ],
  "-": [
    ".....",
    ".....",
    ".....",
    "#####",
    ".....",
    ".....",
    ".....",
  ],
  r: [
    "####.",
    "#...#",
    "#...#",
    "####.",
    "#.#..",
    "#..#.",
    "#...#",
  ],
  e: [
    "#####",
    "#....",
    "#....",
    "####.",
    "#....",
    "#....",
    "#####",
  ],
  c: [
    ".###.",
    "#...#",
    "#....",
    "#....",
    "#....",
    "#...#",
    ".###.",
  ],
  a: [
    ".###.",
    "#...#",
    "#...#",
    "#####",
    "#...#",
    "#...#",
    "#...#",
  ],
  p: [
    "####.",
    "#...#",
    "#...#",
    "####.",
    "#....",
    "#....",
    "#....",
  ],
  " ": [
    ".....",
    ".....",
    ".....",
    ".....",
    ".....",
    ".....",
    ".....",
  ],
};

type PixelLogoProps = {
  className?: string;
  size?: number;
};

export function PixelLogo({ className = "", size = 72 }: PixelLogoProps) {
  const rows = LOGO_GRID.length;
  const cols = LOGO_GRID[0].length;

  return (
    <svg
      width={size}
      height={(size / cols) * rows}
      viewBox={`0 0 ${cols} ${rows}`}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {LOGO_GRID.map((row, y) =>
        row.split("").map((ch, x) =>
          ch === "X" ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill="#541111"
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

type PixelWordmarkProps = {
  text?: string;
  className?: string;
  /** Pixel size in SVG units */
  scale?: number;
};

export function PixelWordmark({
  text = "git-recap",
  className = "",
  scale = 3,
}: PixelWordmarkProps) {
  const chars = text.toLowerCase().split("");
  const glyphW = 5;
  const glyphH = 7;
  const gap = 1;
  const width = chars.length * (glyphW + gap) - gap;
  const height = glyphH;

  const pixels: { x: number; y: number }[] = [];
  chars.forEach((ch, i) => {
    const glyph = GLYPHS[ch] ?? GLYPHS[" "];
    const ox = i * (glyphW + gap);
    glyph.forEach((row, y) => {
      row.split("").forEach((bit, x) => {
        if (bit === "#") pixels.push({ x: ox + x, y });
      });
    });
  });

  const shadow = pixels.map((p) => ({ x: p.x + 1, y: p.y + 1 }));

  return (
    <svg
      viewBox={`0 0 ${width + 2} ${height + 2}`}
      width={(width + 2) * scale}
      height={(height + 2) * scale}
      className={`max-w-full ${className}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label={text}
    >
      {shadow.map((p, i) => (
        <rect
          key={`s-${i}`}
          x={p.x}
          y={p.y}
          width={1}
          height={1}
          fill="rgba(255,255,255,0.14)"
        />
      ))}
      {pixels.map((p, i) => (
        <rect key={`p-${i}`} x={p.x} y={p.y} width={1} height={1} fill="#e8e8e8" />
      ))}
    </svg>
  );
}
