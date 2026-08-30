import Image from "next/image";
import { initials } from "@/lib/mentors";

const ring: Record<string, string> = {
  cyan: "from-cyan-400/30 to-sky-500/10 text-cyan-200 ring-cyan-400/30",
  violet: "from-violet-400/30 to-fuchsia-500/10 text-violet-200 ring-violet-400/30",
  emerald: "from-emerald-400/30 to-teal-500/10 text-emerald-200 ring-emerald-400/30",
  sky: "from-sky-400/30 to-blue-500/10 text-sky-200 ring-sky-400/30",
  amber: "from-amber-400/30 to-orange-500/10 text-amber-200 ring-amber-400/30",
  rose: "from-rose-400/30 to-pink-500/10 text-rose-200 ring-rose-400/30",
};

/**
 * Shows a real headshot when one is supplied, otherwise a gradient monogram.
 * Deliberately never invents a face — the monogram is the honest placeholder
 * until a genuine photo is added to /public/mentors/.
 */
export default function Avatar({
  name,
  photo,
  accent = "cyan",
  size = 64,
  className = "",
}: {
  name: string;
  photo?: string;
  accent?: string;
  size?: number;
  className?: string;
}) {
  const dim = { width: size, height: size };

  if (photo) {
    return (
      <Image
        src={photo}
        alt={name}
        {...dim}
        className={`shrink-0 rounded-full object-cover ring-1 ring-white/15 ${className}`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      style={dim}
      className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br ring-1 ring-inset ${
        ring[accent] ?? ring.cyan
      } ${className}`}
    >
      <span
        className="font-display font-bold leading-none"
        style={{ fontSize: Math.round(size * 0.36) }}
      >
        {initials(name)}
      </span>
    </span>
  );
}
