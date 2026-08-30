import Avatar from "./Avatar";
import type { PublicPlacement } from "@/lib/placements";

const accents = ["cyan", "violet", "emerald", "sky", "amber", "rose"];

const ribbon: Record<string, string> = {
  cyan: "from-cyan-400/25 via-cyan-400/5",
  violet: "from-violet-400/25 via-violet-400/5",
  emerald: "from-emerald-400/25 via-emerald-400/5",
  sky: "from-sky-400/25 via-sky-400/5",
  amber: "from-amber-400/25 via-amber-400/5",
  rose: "from-rose-400/25 via-rose-400/5",
};

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2z" />
    </svg>
  );
}

/**
 * One placed candidate: photo, the offer, a congratulations line, their own
 * words, and appreciation from mentors, peers or the employer.
 */
export default function SuccessStory({
  placement,
  index = 0,
}: {
  placement: PublicPlacement;
  index?: number;
}) {
  const p = placement;
  const accent = accents[index % accents.length];

  return (
    <article className="card card-hover relative flex flex-col overflow-hidden">
      {/* Celebration header band */}
      <div
        className={`relative bg-gradient-to-b ${ribbon[accent]} to-transparent px-7 pb-6 pt-7`}
      >
        <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
          <Sparkle className="h-3 w-3" />
          Placed
        </span>

        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <Avatar name={p.name} photo={p.photo} accent={accent} size={72} />
            <span
              aria-hidden="true"
              className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-ink-900 text-sm ring-1 ring-white/15"
            >
              🎉
            </span>
          </div>

          <div className="min-w-0 pt-1">
            <h3 className="truncate text-lg font-bold leading-snug text-fg">
              {p.name}
            </h3>
            <p className="mt-1 text-sm font-semibold text-emerald-300">
              {p.role}
            </p>
            <p className="mt-0.5 truncate text-sm text-fg-muted">{p.company}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {p.package && (
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/25">
              {p.package}
            </span>
          )}
          <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs text-fg-muted">
            {p.program}
          </span>
          {p.placedOn && (
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-fg-subtle">
              {p.placedOn}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-7 pb-7">
        <p className="rounded-xl border border-white/10 bg-white/4 p-4 text-sm leading-relaxed text-fg">
          {p.congratsText}
        </p>

        {p.quote && (
          <blockquote className="mt-5 border-l-2 border-cyan-400/40 pl-4 text-sm italic leading-relaxed text-fg-muted">
            “{p.quote}”
            <cite className="mt-2 block text-xs not-italic text-fg-subtle">
              — {p.name}
            </cite>
          </blockquote>
        )}

        {p.appreciations.length > 0 && (
          <div className="mt-6 border-t border-white/10 pt-5">
            <h4 className="eyebrow flex items-center gap-1.5">
              <Sparkle className="h-3 w-3 text-amber-300" />
              Appreciation
            </h4>
            <ul className="mt-4 space-y-4">
              {p.appreciations.map((a, i) => (
                <li key={`${a.from}-${i}`} className="flex gap-3">
                  <Avatar
                    name={a.from}
                    accent={accents[(index + i + 1) % accents.length]}
                    size={32}
                  />
                  <div className="min-w-0">
                    <p className="text-sm leading-relaxed text-fg-muted">
                      “{a.text}”
                    </p>
                    <p className="mt-1 text-xs text-fg-subtle">
                      {a.from}
                      {a.role ? ` · ${a.role}` : ""}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
