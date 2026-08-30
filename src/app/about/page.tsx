import type { Metadata } from "next";
import {
  Arrow,
  Container,
  GhostLink,
  Pill,
  PrimaryLink,
  Section,
  SectionHeading,
} from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the Institute",
  description:
    "FutureMinds AI Academy & Careers Pvt. Ltd is a Bengaluru institute training engineers for applied AI roles — Forward Deployed Engineering, Data Science & AI Engineering, Generative and Agentic AI, and Full Stack with AI.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Teach for the job, not the exam",
    body: "Every module traces back to something a hiring manager will probe. If a topic looks impressive but never comes up in real work or real interviews, it does not make the syllabus.",
  },
  {
    title: "Small cohorts, real review",
    body: "Cohorts are deliberately capped so every learner's code gets read by a mentor. Feedback on your actual work is the part that cannot be replaced by a video.",
  },
  {
    title: "Honest about outcomes",
    body: "We do not promise placements or print salary figures we cannot stand behind. We publish indicative market ranges, we tell applicants when a programme is wrong for them, and we keep supporting graduates until they land.",
  },
  {
    title: "Current, deliberately",
    body: "This field moves quarterly. Curricula are revised every cohort, and mentors are practitioners who are still building these systems — so what you learn reflects how the work is done now.",
  },
];

const facts = [
  { label: "Registered name", value: site.legalName },
  { label: "Campus", value: "Marathahalli, Bengaluru" },
  { label: "Delivery", value: "Live classroom & live online" },
  { label: "Focus", value: "Applied AI engineering & careers" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="aurora" />
        <div className="absolute inset-0 grid-lines" aria-hidden="true" />
        <Container className="relative z-10 py-20 sm:py-24">
          <Pill className="bg-violet-400/10 text-violet-200 ring-violet-400/25">
            About us
          </Pill>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl">
            Built because the gap between{" "}
            <span className="text-gradient">learning AI</span> and being{" "}
            <span className="text-gradient">employed in AI</span> kept widening.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
            {site.legalName} is a Bengaluru institute for people who want to
            build and operate AI systems professionally — not collect another
            certificate.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Why we exist" title="The problem we set out to fix" />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-fg-muted">
              <p>
                Bengaluru has no shortage of AI courses. It has a serious
                shortage of people who can take an AI system into production and
                keep it working. Companies here are hiring for Forward Deployed
                Engineers, AI engineers, agent engineers and full stack
                developers who can build AI features properly — and interviewing
                candidates who have only ever run a notebook.
              </p>
              <p>
                We started FutureMinds to close that specific gap. The
                curriculum is written backwards from live job descriptions and
                real interview loops. The teaching is live and hands-on because
                code review is where learning actually happens. And the careers
                half of the business exists because a curriculum without an
                outcome is just an expensive hobby.
              </p>
              <p>
                We are candid with applicants. If a programme is not right for
                your background, or if the timing is wrong, we will tell you on
                the counselling call rather than take the enrolment.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <dl className="card divide-y divide-white/10">
              {facts.map((f) => (
                <div key={f.label} className="px-7 py-5">
                  <dt className="text-xs text-fg-subtle">{f.label}</dt>
                  <dd className="mt-1.5 text-sm font-semibold text-fg">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section className="border-y border-white/10 bg-ink-900/40">
        <SectionHeading
          eyebrow="How we teach"
          title="Four principles we do not bend on"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p.title} className="card p-7">
              <span className="font-mono text-xs tracking-widest text-violet-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="card relative overflow-hidden p-10 text-center sm:p-16">
          <div className="aurora opacity-60" />
          <div className="relative z-10">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">
              Come and judge us in person.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg-muted">
              Sit in on a live session at our Marathahalli campus, meet a
              mentor, and look at what current learners are building before you
              decide anything.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <PrimaryLink href="/contact">
                Book a campus visit <Arrow />
              </PrimaryLink>
              <GhostLink href="/programs">See the programmes</GhostLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
