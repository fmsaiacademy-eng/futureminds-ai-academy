import type { Metadata } from "next";
import ReviewForm from "@/components/ReviewForm";
import {
  Arrow,
  Container,
  GhostLink,
  Pill,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Share Your Feedback",
  description:
    "Studied at FutureMinds AI Academy in Bengaluru? Share your experience. Every review is read and published only with the author's permission.",
  alternates: { canonical: "/feedback" },
};

export default function FeedbackPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="aurora" />
        <div className="absolute inset-0 grid-lines" aria-hidden="true" />
        <Container className="relative z-10 py-20 sm:py-24">
          <Pill className="bg-emerald-400/10 text-emerald-200 ring-emerald-400/25">
            Feedback
          </Pill>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl">
            Tell us how it went.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
            Honest feedback — good or bad — is how the programmes get better,
            and how the next person decides whether this is right for them.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="How this works"
              title="Nothing is published without your say-so."
            />
            <ul className="mt-8 space-y-5 text-sm leading-relaxed text-fg-muted">
              <li>
                <strong className="text-fg">You tick the consent box.</strong>{" "}
                Without it we cannot publish your words, name or role — the form
                will not submit.
              </li>
              <li>
                <strong className="text-fg">We read every submission.</strong>{" "}
                Reviews arrive unapproved and stay invisible on the site until a
                person at FutureMinds approves them.
              </li>
              <li>
                <strong className="text-fg">
                  Critical feedback is welcome.
                </strong>{" "}
                If something did not work for you, we would genuinely rather
                hear it than not. Write to us directly if you would prefer it
                stayed private.
              </li>
              <li>
                <strong className="text-fg">You can withdraw.</strong> Email us
                any time and we will remove your review.
              </li>
            </ul>
          </div>

          <ReviewForm />
        </div>
      </Section>

      <Section className="border-t border-white/10 bg-ink-900/40">
        <SectionHeading
          align="center"
          eyebrow="Already published"
          title="Reviews and success stories live on the placements page."
          intro="Once approved, your words appear there alongside our placement records."
        />
        <div className="mt-8 text-center">
          <GhostLink href="/placements">
            See placements &amp; reviews <Arrow />
          </GhostLink>
        </div>
      </Section>

    </>
  );
}
