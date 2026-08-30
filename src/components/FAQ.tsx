export type QA = { q: string; a: string };

/**
 * Native disclosure accordion — no JS needed, keyboard accessible for free.
 * Emits FAQPage structured data so answers can surface directly in search.
 */
export default function FAQ({ items }: { items: QA[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="divide-y divide-white/10 border-y border-white/10">
        {items.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-base font-semibold text-fg transition-colors hover:text-cyan-300 [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                aria-hidden="true"
                className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-white/20 text-fg-muted transition-transform duration-200 group-open:rotate-45"
              >
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                  <path
                    d="M6 1v10M1 6h10"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </summary>
            <p className="pb-6 pr-10 text-sm leading-relaxed text-fg-muted">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </>
  );
}
