/**
 * Decorative confetti band.
 *
 * Positions are a fixed table rather than Math.random() — a random layout
 * would differ between the server and client render and trip a hydration
 * mismatch. Purely ornamental, so it is hidden from assistive tech.
 */

type Piece = {
  x: number;
  y: number;
  r: number;
  s: number;
  c: string;
  shape: "rect" | "circle" | "tri";
};

const palette = ["#22d3ee", "#a78bfa", "#34d399", "#fbbf24", "#fb7185", "#38bdf8"];

const pieces: Piece[] = [
  { x: 4, y: 18, r: 24, s: 1.1, c: palette[0], shape: "rect" },
  { x: 11, y: 62, r: -18, s: 0.8, c: palette[3], shape: "circle" },
  { x: 17, y: 30, r: 42, s: 1.0, c: palette[1], shape: "tri" },
  { x: 24, y: 74, r: 12, s: 0.9, c: palette[2], shape: "rect" },
  { x: 31, y: 22, r: -35, s: 1.2, c: palette[4], shape: "rect" },
  { x: 38, y: 55, r: 8, s: 0.7, c: palette[5], shape: "circle" },
  { x: 45, y: 14, r: 55, s: 1.0, c: palette[0], shape: "tri" },
  { x: 52, y: 68, r: -22, s: 1.1, c: palette[3], shape: "rect" },
  { x: 59, y: 34, r: 30, s: 0.8, c: palette[1], shape: "circle" },
  { x: 66, y: 78, r: -48, s: 1.0, c: palette[2], shape: "tri" },
  { x: 73, y: 20, r: 16, s: 0.9, c: palette[4], shape: "rect" },
  { x: 80, y: 58, r: -12, s: 1.2, c: palette[5], shape: "rect" },
  { x: 86, y: 28, r: 38, s: 0.75, c: palette[0], shape: "circle" },
  { x: 92, y: 70, r: -30, s: 1.0, c: palette[1], shape: "tri" },
  { x: 97, y: 40, r: 20, s: 0.85, c: palette[3], shape: "rect" },
];

export default function Confetti({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 90"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      {pieces.map((p, i) => {
        const t = `rotate(${p.r} ${p.x} ${p.y}) scale(${p.s})`;
        const common = {
          fill: p.c,
          opacity: 0.55,
          transform: t,
          transformOrigin: `${p.x}px ${p.y}px`,
        };
        if (p.shape === "circle") {
          return <circle key={i} cx={p.x} cy={p.y} r={1.1} {...common} />;
        }
        if (p.shape === "tri") {
          return (
            <polygon
              key={i}
              points={`${p.x},${p.y - 1.4} ${p.x + 1.3},${p.y + 1} ${p.x - 1.3},${p.y + 1}`}
              {...common}
            />
          );
        }
        return (
          <rect
            key={i}
            x={p.x - 0.9}
            y={p.y - 1.6}
            width={1.8}
            height={3.2}
            rx={0.4}
            {...common}
          />
        );
      })}
    </svg>
  );
}
