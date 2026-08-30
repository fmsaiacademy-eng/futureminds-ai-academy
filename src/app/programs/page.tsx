import type { Metadata } from "next";
import CourseCard from "@/components/CourseCard";
import LeadForm from "@/components/LeadForm";
import { Container, Section, SectionHeading, Pill } from "@/components/ui";
import { courses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "AI & Software Programmes in Bengaluru",
  description:
    "Compare FutureMinds AI Academy programmes: Forward Deployed Engineer, Generative & Agentic AI, Data Science & AI Engineer, Full Stack with AI, Full Stack with Data Science and Data Engineering for AI. Live cohorts in Marathahalli, Bengaluru.",
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="aurora" />
        <Container className="relative z-10 py-20 sm:py-24">
          <Pill className="bg-cyan-400/10 text-cyan-200 ring-cyan-400/25">
            Programmes
          </Pill>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl">
            Pick the role. We will get you ready for it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
            Every programme below is a live, mentor-led cohort built from real
            job descriptions and interview loops. All of them run both at our
            Marathahalli campus and online.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </Section>

      {/* Comparison table — the fastest way for a visitor to self-select */}
      <Section className="border-y border-white/10 bg-ink-900/40">
        <SectionHeading
          eyebrow="Side by side"
          title="Which one fits you?"
          intro="Indicative salary ranges reflect the wider Indian market for these roles at the experience levels our graduates target. They are not guarantees."
        />

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/15">
                {[
                  "Programme",
                  "Level",
                  "Duration",
                  "Weekly effort",
                  "Target roles",
                  "Typical range",
                ].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="whitespace-nowrap px-4 py-4 font-mono text-[0.6875rem] uppercase tracking-widest text-fg-subtle first:pl-0"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {courses.map((c) => (
                <tr key={c.slug} className="align-top transition-colors hover:bg-white/3">
                  <th scope="row" className="px-4 py-5 pl-0 font-semibold text-fg">
                    <a
                      href={`/programs/${c.slug}`}
                      className="transition-colors hover:text-cyan-300"
                    >
                      {c.shortTitle}
                    </a>
                    <span className="mt-1 block font-mono text-[0.6875rem] font-normal text-fg-subtle">
                      {c.code}
                    </span>
                  </th>
                  <td className="whitespace-nowrap px-4 py-5 text-fg-muted">
                    {c.level}
                  </td>
                  <td className="whitespace-nowrap px-4 py-5 text-fg-muted">
                    {c.duration}
                  </td>
                  <td className="whitespace-nowrap px-4 py-5 text-fg-muted">
                    {c.effort}
                  </td>
                  <td className="px-4 py-5 text-fg-muted">
                    {c.roles.slice(0, 3).join(", ")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-5 font-medium text-fg">
                    {c.salaryRange}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Not sure?"
            title="Let us help you choose."
            intro="Send us your background and goal. A counsellor will walk you through the two or three programmes that actually make sense for you — and rule out the ones that do not."
          />
          <LeadForm />
        </div>
      </Section>
    </>
  );
}
