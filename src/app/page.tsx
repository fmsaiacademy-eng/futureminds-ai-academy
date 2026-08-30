import type { Metadata } from "next";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import {
  Arrow,
  Check,
  Container,
  GhostLink,
  Pill,
  PrimaryLink,
  Section,
  SectionHeading,
} from "@/components/ui";
import { courses } from "@/lib/courses";
import { site, addressOneLine, mapsUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Training Institute in Bengaluru — FDE, Data Science & AI, Generative & Agentic AI",
  description:
    "FutureMinds AI Academy in Marathahalli, Bengaluru trains engineers in Forward Deployed Engineering, Data Science & AI Engineering, Generative & Agentic AI and Full Stack with AI. Live cohorts, real projects, placement support.",
  alternates: { canonical: "/" },
};

/* Figures below are computed from the published curriculum, so they stay
   true automatically as programmes are added or edited. */
const totalWeeks = courses.reduce(
  (sum, c) => sum + (parseInt(c.duration, 10) || 0),
  0,
);
const uniqueTools = new Set(courses.flatMap((c) => c.tools)).size;
const totalCapstones = courses.reduce((sum, c) => sum + c.capstones.length, 0);

const stats = [
  { value: `${courses.length}`, label: "Career programmes" },
  { value: `${totalWeeks}`, label: "Weeks of curriculum" },
  { value: `${uniqueTools}+`, label: "Production tools covered" },
  { value: `${totalCapstones}`, label: "Portfolio capstones" },
];

const differentiators = [
  {
    title: "We teach the roles, not just the topics",
    body: "Forward Deployed Engineer, AI engineer, agent engineering — these are job titles being hired for right now in Bengaluru. Each programme is reverse-engineered from real job descriptions and interview loops, not from a textbook table of contents.",
  },
  {
    title: "Everything is built, nothing is watched",
    body: "You will not sit through recorded lectures. Every module ends in working software that runs, gets reviewed, and goes into a portfolio you can show an interviewer. Broken builds are part of the syllabus.",
  },
  {
    title: "Production reality, including the boring parts",
    body: "Evaluation harnesses, cost control, drift monitoring, auth, incident response, handover docs. The unglamorous work is exactly what separates someone who can demo from someone who gets hired.",
  },
  {
    title: "Mentors who still ship",
    body: "Sessions are led by practitioners who build and operate these systems for a living, so what you learn matches what production actually looks like this quarter — not two years ago.",
  },
];

const process = [
  {
    step: "01",
    title: "Counselling & fit check",
    body: "A free call where we look at your background and goals. If none of our programmes is right for you, we will say so rather than sell you one.",
  },
  {
    step: "02",
    title: "Foundations sprint",
    body: "A levelling module so everyone in the cohort starts from the same technical baseline, whatever their background.",
  },
  {
    step: "03",
    title: "Build weeks",
    body: "Live sessions plus lab time. You ship something every module, get it code-reviewed by a mentor, and iterate on the feedback.",
  },
  {
    step: "04",
    title: "Capstone & defence",
    body: "A substantial project taken to production and defended in front of a panel, exactly like a real system design and project deep-dive interview.",
  },
  {
    step: "05",
    title: "Career launch",
    body: "Resume and LinkedIn rework, portfolio review, mock interviews, referrals into our hiring network, and support until you land.",
  },
];

const careerSupport = [
  "Role-specific resume and LinkedIn rebuild",
  "Portfolio and GitHub review with a hiring-manager lens",
  "Mock technical, system design and behavioural interviews",
  "Salary negotiation coaching for the Indian market",
  "Introductions to hiring partners and our alumni network",
  "Continued support after the cohort ends until you are placed",
];

const faqs = [
  {
    q: "Do I need a computer science degree to join?",
    a: "No. Our Full Stack with AI and Full Stack with Data Science programmes are designed for beginners and career switchers from any degree background. The advanced programmes — Forward Deployed Engineer, Generative & Agentic AI and Data Science & AI Engineer — assume you can already write Python and work with APIs.",
  },
  {
    q: "Are classes online or at your Marathahalli campus?",
    a: `Both. Every cohort runs live and you can attend in person at our campus at ${addressOneLine}, or join the same live session online. Sessions are recorded so you can revisit them, but attendance is live because the labs and code reviews are interactive.`,
  },
  {
    q: "What is a Forward Deployed Engineer, and why should I care?",
    a: "A Forward Deployed Engineer works alongside a company's biggest customers to make an AI product actually work in their environment — scoping the problem, building the integration, and proving the results. It blends engineering, solution design and customer-facing judgement, it is one of the highest-paid AI roles today, and almost no institute in India trains for it specifically.",
  },
  {
    q: "Can I do this alongside a full-time job?",
    a: "Yes, and most of our learners do. Weekday-evening and weekend batches are available, with roughly 10 to 15 hours of commitment per week including lab time. Tell your counsellor your constraints and they will map you to a batch that fits.",
  },
  {
    q: "Do you guarantee placement?",
    a: "No, and be careful of any institute that does. What we do guarantee is the work: portfolio projects, interview preparation, referrals into our hiring network, and career support that continues after your cohort ends until you are placed. Salary figures shown on this site are indicative market ranges, not promises.",
  },
  {
    q: "What are the fees and are instalments available?",
    a: "Fees vary by programme and batch format. We offer instalment plans and early-enrolment discounts. Request a call back and a counsellor will share the current fee structure for the programme you are considering.",
  },
  {
    q: "Will I get a certificate?",
    a: `Yes. On completing the coursework and your capstone you receive a verifiable certificate of completion from ${site.legalName}, along with the project artefacts that matter far more in an interview.`,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="aurora" />
        <div className="absolute inset-0 grid-lines" aria-hidden="true" />

        <Container className="relative z-10 pb-20 pt-16 sm:pb-28 sm:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Pill className="bg-cyan-400/10 text-cyan-200 ring-cyan-400/25">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
                Now enrolling · Marathahalli, Bengaluru
              </Pill>

              <h1 className="mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
                Train for the AI jobs that{" "}
                <span className="text-gradient">actually exist</span> in 2026.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
                FutureMinds is a Bengaluru career school for applied AI
                engineering. Forward Deployed Engineering, Data Science and AI
                Engineering, Generative and Agentic AI, and Full Stack with AI —
                taught live, built in code, and reverse-engineered from the roles
                companies are hiring for today.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <PrimaryLink href="/contact">
                  Book a free counselling call <Arrow />
                </PrimaryLink>
                <GhostLink href="/programs">Explore the programmes</GhostLink>
              </div>

              <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="block font-display text-3xl font-bold text-fg">
                        {s.value}
                      </span>
                      <span className="mt-1.5 block text-xs leading-snug text-fg-subtle">
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Terminal-style visual: signals "this is an engineering school" */}
            <div className="lg:col-span-5">
              <div className="card overflow-hidden shadow-lift">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  <span className="ml-2 font-mono text-[0.6875rem] text-fg-subtle">
                    cohort_2026 — agent.py
                  </span>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-[0.75rem] leading-relaxed text-fg-muted sm:text-[0.8125rem]">
                  <code>
                    <span className="text-fg-subtle">
                      {"# week 12 · agentic systems lab"}
                    </span>
                    {"\n"}
                    <span className="text-violet-300">from</span> futureminds{" "}
                    <span className="text-violet-300">import</span> Agent, Tools
                    {"\n\n"}
                    agent = Agent(
                    {"\n"}
                    {"  "}model=
                    <span className="text-emerald-300">
                      &quot;claude-opus-5&quot;
                    </span>
                    ,{"\n"}
                    {"  "}tools=Tools.mcp(
                    <span className="text-emerald-300">
                      &quot;postgres&quot;
                    </span>
                    , <span className="text-emerald-300">&quot;search&quot;</span>
                    ),{"\n"}
                    {"  "}memory=
                    <span className="text-cyan-300">Episodic</span>(ttl=
                    <span className="text-amber-300">7</span>),{"\n"}
                    {"  "}guardrails=[
                    <span className="text-cyan-300">PIIRedactor</span>(),{" "}
                    <span className="text-cyan-300">CostCap</span>(
                    <span className="text-amber-300">0.40</span>)],
                    {"\n"})
                    {"\n\n"}
                    result = agent.run(brief){"\n"}
                    evals.score(result){"  "}
                    <span className="text-fg-subtle">
                      {"# → 0.94 grounded"}
                    </span>
                  </code>
                </pre>
              </div>

              <p className="mt-4 text-center text-xs text-fg-subtle">
                Illustrative of the lab work in the Generative &amp; Agentic AI cohort.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ Tech bar */}
      <div className="border-y border-white/10 bg-ink-900/50 py-6">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 font-mono text-xs tracking-wide text-fg-subtle sm:gap-x-10">
            {[
              "PyTorch",
              "LangGraph",
              "Kubernetes",
              "MCP",
              "vLLM",
              "MLflow",
              "Next.js",
              "FastAPI",
              "Spark",
              "Terraform",
              "pgvector",
              "Airflow",
            ].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </Container>
      </div>

      {/* ------------------------------------------------------------ Programs */}
      <Section id="programs">
        <SectionHeading
          eyebrow="Programmes"
          title="Six routes into an AI career"
          intro="Each programme runs as a live cohort with mentor-led labs, code review and a capstone you can defend in an interview. Choose by the role you want, not by the buzzword."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>

        <div className="mt-12">
          <GhostLink href="/programs">
            Compare all programmes <Arrow />
          </GhostLink>
        </div>
      </Section>

      {/* ------------------------------------------------------------ Why us */}
      <Section className="border-y border-white/10 bg-ink-900/40">
        <SectionHeading
          eyebrow="Why FutureMinds"
          title="Most AI courses teach the demo. We teach the deployment."
          intro="There is a large gap between finishing a tutorial and being trusted with a production AI system. Closing that gap is the entire design of this institute."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {differentiators.map((d, i) => (
            <div key={d.title} className="card p-7">
              <span className="font-mono text-xs tracking-widest text-cyan-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-bold">{d.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {d.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------ Process */}
      <Section>
        <SectionHeading
          eyebrow="How it works"
          title="From first call to first offer"
        />

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((p) => (
            <li key={p.step} className="relative">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-semibold text-cyan-300">
                  {p.step}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-gradient-to-r from-cyan-400/40 to-transparent"
                />
              </div>
              <h3 className="mt-4 text-base font-bold">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ------------------------------------------------------------ Careers */}
      <Section className="border-y border-white/10 bg-ink-900/40">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Careers"
              title="The training is half of it. The other half is getting hired."
              intro="FutureMinds AI Academy & Careers exists because a curriculum without a career outcome is just an expensive hobby. Career support is built into every programme and it does not stop on the last day of your cohort."
            />
            <div className="mt-8">
              <GhostLink href="/placements">
                How placement support works <Arrow />
              </GhostLink>
            </div>
          </div>

          <ul className="space-y-4">
            {careerSupport.map((item) => (
              <li key={item} className="flex items-start gap-3.5">
                <Check className="mt-0.5 text-cyan-300" />
                <span className="text-sm leading-relaxed text-fg-muted">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ------------------------------------------------------------- Campus */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Campus"
              title="Come and see the place before you enrol."
              intro="Our campus sits in Marathahalli, a short hop from the Outer Ring Road tech corridor, Whitefield and Bellandur — so you can get here after work without crossing the city."
            />

            <address className="mt-8 not-italic">
              <p className="text-base font-semibold text-fg">
                {site.legalName}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {site.address.line1}
                <br />
                {site.address.line2}, {site.address.city}
                <br />
                {site.address.state} {site.address.postalCode}, India
              </p>
              <p className="mt-4 text-sm text-fg-muted">{site.hours}</p>
            </address>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/contact">
                Book a campus visit <Arrow />
              </PrimaryLink>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-cyan-400/50 hover:bg-white/5"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          <div className="card overflow-hidden">
            <iframe
              title={`Map to ${site.name}, Marathahalli, Bengaluru`}
              src="https://www.google.com/maps?q=CKB%20Layout%2C%20Marathahalli%2C%20Bengaluru%2C%20Karnataka%20560037&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[380px] w-full border-0 grayscale-[0.35] contrast-[1.1]"
            />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- FAQ */}
      <Section className="border-t border-white/10 bg-ink-900/40">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Questions"
              title="Answers before you ask"
              intro="Still unsure? A counselling call is free and there is no obligation to enrol."
            />
          </div>
          <div className="lg:col-span-8">
            <FAQ items={faqs} />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- CTA */}
      <Section id="enquire">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Get started"
              title={
                <>
                  Your next role is a{" "}
                  <span className="text-gradient">conversation</span> away.
                </>
              }
              intro="Tell us where you are and what you want to be doing in a year. We will map you to the right programme, or tell you honestly if now is not the time."
            />

            <div className="mt-10 space-y-5 text-sm">
              <a
                href={`tel:${site.phoneHref}`}
                className="flex items-center gap-4 text-fg-muted transition-colors hover:text-cyan-300"
              >
                <span className="eyebrow w-16">Call</span>
                <span className="font-medium">{site.phone}</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4 break-all text-fg-muted transition-colors hover:text-cyan-300"
              >
                <span className="eyebrow w-16 shrink-0">Email</span>
                <span className="font-medium">{site.email}</span>
              </a>
              <Link
                href="/corporate"
                className="flex items-center gap-4 text-fg-muted transition-colors hover:text-cyan-300"
              >
                <span className="eyebrow w-16">Teams</span>
                <span className="font-medium">
                  Corporate and campus training →
                </span>
              </Link>
            </div>
          </div>

          <LeadForm />
        </div>
      </Section>
    </>
  );
}
