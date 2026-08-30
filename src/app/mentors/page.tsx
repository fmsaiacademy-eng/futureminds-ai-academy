import type { Metadata } from "next";
import Avatar from "@/components/Avatar";
import {
  Arrow,
  Container,
  GhostLink,
  Pill,
  PrimaryLink,
  Section,
  SectionHeading,
} from "@/components/ui";
import { mentors } from "@/lib/mentors";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentors & Faculty",
  description:
    "Meet the FutureMinds AI Academy faculty — practising architects and engineers in full stack AI, data science, data engineering, DevOps and quality engineering, teaching live in Marathahalli, Bengaluru.",
  alternates: { canonical: "/mentors" },
};

export default function MentorsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Faculty at ${site.legalName}`,
    itemListElement: mentors.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
        worksFor: { "@type": "Organization", name: site.legalName },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="aurora" />
        <div className="absolute inset-0 grid-lines" aria-hidden="true" />
        <Container className="relative z-10 py-20 sm:py-24">
          <Pill className="bg-violet-400/10 text-violet-200 ring-violet-400/25">
            Faculty
          </Pill>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl">
            Taught by architects who still{" "}
            <span className="text-gradient">build</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
            Every session is led by someone who does this work professionally.
            That is why the curriculum reflects how these systems are built now,
            and why code review here is worth more than a video course.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {mentors.map((m) => (
            <article key={m.id} className="card card-hover flex gap-5 p-7">
              <Avatar name={m.name} photo={m.photo} accent={m.accent} size={72} />

              <div className="min-w-0">
                <h2 className="text-lg font-bold text-fg">{m.name}</h2>
                <p className="mt-1 text-sm font-medium text-fg-muted">{m.role}</p>

                {m.years !== undefined && (
                  <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-widest text-cyan-300">
                    {m.years}+ years experience
                  </p>
                )}

                {m.bio && (
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {m.bio}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {m.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-lg border border-white/10 bg-white/4 px-2.5 py-1 text-xs text-fg-muted"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200"
                  >
                    LinkedIn <Arrow className="h-3 w-3" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="border-t border-white/10 bg-ink-900/40">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <SectionHeading
            eyebrow="Meet them"
            title="Sit in on a live session before you enrol."
            intro="Come to the Marathahalli campus, watch a mentor teach, and talk to the people already in the cohort. We would rather you decide with evidence."
          />
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <PrimaryLink href="/contact">
              Book a campus visit <Arrow />
            </PrimaryLink>
            <GhostLink href="/programs">See the programmes</GhostLink>
          </div>
        </div>
      </Section>
    </>
  );
}
