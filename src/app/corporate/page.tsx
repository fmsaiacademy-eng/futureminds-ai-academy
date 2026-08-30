import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import {
  Check,
  Container,
  Pill,
  Section,
  SectionHeading,
} from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Corporate AI Training in Bengaluru",
  description:
    "Custom AI upskilling for engineering teams in Bengaluru — Generative and Agentic AI, MLOps, LLM application engineering and AI-assisted development, delivered on-site or online against your own codebase.",
  alternates: { canonical: "/corporate" },
};

const offerings = [
  {
    title: "Generative & Agentic AI for engineering teams",
    body: "Get an existing engineering org productive with LLM APIs, RAG, tool use and agent patterns — including the evaluation and guardrail practices that make shipping safe.",
    length: "2–5 days, or a 6-week part-time track",
  },
  {
    title: "MLOps & LLMOps enablement",
    body: "Take your team from ad-hoc model deployment to reproducible pipelines, model registries, monitoring and cost governance, mapped onto your existing cloud stack.",
    length: "3–5 days, or an 8-week part-time track",
  },
  {
    title: "AI-assisted development adoption",
    body: "Practical, security-aware adoption of AI coding tools: where they add real leverage, how to review their output, and the standards to enforce in code review.",
    length: "1–2 days",
  },
  {
    title: "Forward Deployed Engineering for solutions teams",
    body: "For product companies with enterprise customers: discovery, scoping, integration engineering, evaluation and deployment into restricted customer environments.",
    length: "4 days, or a 6-week part-time track",
  },
];

const howItWorks = [
  "Discovery session with your engineering leadership to establish the real skill gap",
  "Baseline assessment of the team so the content starts at the right level",
  "Curriculum tailored to your stack, your cloud and — where you allow it — your own codebase",
  "Delivery on-site at your office, at our Marathahalli campus, or live online",
  "Hands-on labs and a team project tied to a problem you actually have",
  "Post-training report on team capability, plus an optional follow-up clinic",
];

const audience = [
  "Product engineering teams adding AI features for the first time",
  "Data and platform teams moving from notebooks to production ML",
  "Services and GCC teams building AI delivery capability",
  "Solutions and pre-sales engineering teams at AI product companies",
  "Engineering colleges running final-year and faculty development programmes",
];

export default function CorporatePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="aurora" />
        <div className="absolute inset-0 grid-lines" aria-hidden="true" />
        <Container className="relative z-10 py-20 sm:py-24">
          <Pill className="bg-amber-400/10 text-amber-200 ring-amber-400/25">
            For organisations
          </Pill>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl">
            Upskill your engineers on{" "}
            <span className="text-gradient">your own codebase</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
            Generic AI training rarely survives contact with a real system. We
            build the programme around your stack, your constraints and a
            problem your team is actually trying to solve.
          </p>
        </Container>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Programmes"
          title="What we deliver for teams"
          intro="Every engagement is scoped after a discovery call — the tracks below are starting points, not fixed packages."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {offerings.map((o) => (
            <div key={o.title} className="card p-7">
              <h3 className="text-lg font-bold leading-snug">{o.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {o.body}
              </p>
              <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-widest text-amber-300">
                {o.length}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-y border-white/10 bg-ink-900/40">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Process" title="How an engagement runs" />
            <div className="mt-8">
              <h3 className="eyebrow">Who we work with</h3>
              <ul className="mt-5 space-y-3">
                {audience.map((a) => (
                  <li key={a} className="text-sm leading-relaxed text-fg-muted">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ol className="space-y-5 lg:col-span-7">
            {howItWorks.map((step, i) => (
              <li key={step} className="flex items-start gap-4">
                <span className="mt-0.5 font-mono text-sm font-semibold text-amber-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base leading-relaxed text-fg-muted">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Enquire"
              title="Tell us what your team needs to be able to do."
              intro="Send a short brief and we will come back with a proposed curriculum, format and commercials. Select “Corporate training” in the form, or email us directly."
            />
            <div className="mt-10 space-y-5 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4 break-all text-fg-muted transition-colors hover:text-cyan-300"
              >
                <span className="eyebrow w-16 shrink-0">Email</span>
                <span className="font-medium">{site.email}</span>
              </a>
              <a
                href={`tel:${site.phoneHref}`}
                className="flex items-center gap-4 text-fg-muted transition-colors hover:text-cyan-300"
              >
                <span className="eyebrow w-16">Call</span>
                <span className="font-medium">{site.phone}</span>
              </a>
            </div>

            <ul className="mt-10 space-y-4">
              {[
                "NDA and vendor onboarding supported",
                "GST-compliant invoicing from a registered Pvt. Ltd.",
                "Delivery across Bengaluru, or remote for distributed teams",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3">
                  <Check className="mt-0.5 text-amber-300" />
                  <span className="text-sm leading-relaxed text-fg-muted">
                    {x}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <LeadForm defaultProgram="Corporate training" />
        </div>
      </Section>
    </>
  );
}
