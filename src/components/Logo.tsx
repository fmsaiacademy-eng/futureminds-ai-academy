import { site } from "@/lib/site";

/**
 * Wordmark plus a neural-node glyph: three input nodes converging on one
 * output, which reads as both a network and a forward arrow.
 */
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        role="img"
        aria-label={`${site.name} logo`}
      >
        <defs>
          <linearGradient id="fm-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="55%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
        </defs>
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="11"
          fill="url(#fm-grad)"
          opacity="0.14"
        />
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="11"
          fill="none"
          stroke="url(#fm-grad)"
          strokeWidth="1.5"
          opacity="0.55"
        />
        <g stroke="url(#fm-grad)" strokeWidth="1.6" strokeLinecap="round">
          <path d="M12 11 L27 20" />
          <path d="M12 20 L27 20" />
          <path d="M12 29 L27 20" />
        </g>
        <g fill="url(#fm-grad)">
          <circle cx="12" cy="11" r="3" />
          <circle cx="12" cy="20" r="3" />
          <circle cx="12" cy="29" r="3" />
          <circle cx="28" cy="20" r="4.2" />
        </g>
      </svg>

      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.0625rem] font-bold tracking-tight text-fg">
            Future<span className="text-gradient">Minds</span>
          </span>
          <span className="mt-1 font-mono text-[0.5625rem] tracking-[0.2em] text-fg-subtle uppercase">
            AI Academy
          </span>
        </span>
      )}
    </span>
  );
}
