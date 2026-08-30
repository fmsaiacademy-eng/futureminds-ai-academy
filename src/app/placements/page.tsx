import type { Metadata } from "next";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import LeadForm from "@/components/LeadForm";
import SuccessStory from "@/components/SuccessStory";
import {
  Arrow,
  Check,
  Container,
  Pill,
  Section,
  SectionHeading,
} from "@/components/ui";
import { courses } from "@/lib/courses";
import Confetti from "@/components/Confetti";
import { getApprovedPlacements, previewPlacements } from "@/lib/placements";
import { getApprovedReviews, previewReviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Placements, Success Stories & Reviews",
  description:
    "Placement records and learner reviews from FutureMinds AI Academy, Bengaluru — who got placed, where, in their own words, plus how our career support actually works.",
  alternates: { canonical: "/placements" },
};

/** Refresh at most every 5 minutes so newly approved stories appear. */
export const revalidate = 300;

const phases = [
  {
    phase: "During the cohort",
    items: [
      "Capstone projects chosen for interview value, not novelty",
      "Code reviewed by mentors to a professional standard",
      "GitHub and portfolio built continuously, not rushed at the end",
      "Weekly problem-solving and system design practice",
    ],
  },
  {
    phase: "Final four weeks",
    items: [
      "Role-specific resume rewritten with a hiring-manager lens",
      "LinkedIn profile rebuilt for recruiter search",
      "Mock technical, system design and behavioural interviews with feedback",
      "Project deep-dive rehearsal — defending your own build under questioning",
    ],
  },
  {
    phase: "After you graduate",
    items: [
      "Referrals into our hiring-partner and alumni network",
      "Application strategy and interview debriefs after each round",
      "Salary negotiation coaching for the Indian market",
      "Access to future cohort material and alumni sessions",
    ],
  },
];

const roleGroups = Array.from(new Set(courses.flatMap((c) => c.roles)));
const accents = ["cyan", "violet", "emerald", "sky", "amber", "rose"];

export default async function PlacementsPage() {
  const [realPlacements, realReviews] = await Promise.all([
    getApprovedPlacements(24),
    getApprovedReviews(12),
  ]);

  // Design preview only: sample stories and reviews stand in while the real
  // wall is empty, and never in a production build.
  const isDesignPreview = process.env.NODE_ENV !== "production";
  const placements =
    isDesignPreview && realPlacements.length === 0
      ? previewPlacements
      : realPlacements;
  const reviews =
    isDesignPreview && realReviews.length === 0 ? previewReviews : realReviews;

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="aurora" />
        <div className="absolute inset-0 grid-lines" aria-hidden="true" />
        <Container className="relative z-10 py-20 sm:py-24">
          <Pill className="bg-emerald-400/10 text-emerald-200 ring-emerald-400/25">
            Careers
          </Pill>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl">
            No placement guarantees. A great deal of placement{" "}
            <span className="text-gradient">work</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
            Any institute promising you a job is selling you something. What we
            commit to is the preparation, the portfolio, the introductions and
            the persistence — and we keep going after your cohort ends.
          </p>
        </Container>
      </section>

      {/* ------------------------------------------------- Success stories */}
      {placements.length > 0 && (
        <section id="success-stories" className="relative overflow-hidden py-20 sm:py-28">
          <Confetti className="opacity-70" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-emerald-400/8 to-transparent"
          />

          <Container className="relative z-10">
            <div className="text-center">
              <p className="eyebrow">Success stories</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                <span aria-hidden="true">🎉</span> Congratulations to our{" "}
                <span className="text-gradient">recently placed</span> learners
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
                Every story here is published with that person&apos;s
                permission — the offer they earned, in their own words, with
                appreciation from the mentors and peers who worked alongside
                them.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {placements.map((p, i) => (
                <SuccessStory key={p.id} placement={p} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Shown only until the first story is approved, so the page never
          looks broken while the wall is still empty. */}
      {placements.length === 0 && (
        <Section>
          <div className="card p-10 text-center sm:p-14">
            <h2 className="text-2xl font-bold">
              Our first cohorts are in progress.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-fg-muted">
              Placement stories will be published here as they happen — with
              each person&apos;s permission, and never invented. Until then,
              judge us on the curriculum and come meet the mentors.
            </p>
          </div>
        </Section>
      )}

      {/* -------------------------------------------------------- Reviews */}
      <Section id="reviews" className="border-y border-white/10 bg-ink-900/40">
        <SectionHeading
          eyebrow="In their words"
          title="What our learners say"
          intro="Reviews from people who finished a cohort, published with permission."
        />

        {reviews.length > 0 ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <figure key={r.id} className="card flex flex-col p-7">
                <span
                  className="text-sm tracking-[0.15em] text-amber-300"
                  aria-label={`${r.rating} out of 5`}
                >
                  {"★".repeat(r.rating)}
                  <span className="text-fg-subtle">
                    {"★".repeat(5 - r.rating)}
                  </span>
                </span>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5 border-t border-white/10 pt-5">
                  <Avatar
                    name={r.name}
                    photo={r.photo}
                    accent={accents[i % accents.length]}
                    size={44}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-fg">
                      {r.name}
                    </span>
                    <span className="block truncate text-xs text-fg-subtle">
                      {r.role ? `${r.role} · ` : ""}
                      {r.program}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="card mt-14 p-10 text-center sm:p-12">
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-fg-muted">
              No reviews are published yet. Every one that appears here is
              written by someone who finished a cohort and approved us to
              publish it — so this space stays empty until the first learner
              sends theirs in.
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/feedback"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
          >
            Studied with us? Share your experience <Arrow />
          </Link>
        </div>
      </Section>

      {/* -------------------------------------------------- Career support */}
      <Section className="border-t border-white/10">
        <SectionHeading
          eyebrow="The programme"
          title="Career support, phase by phase"
          intro="This runs in parallel with your technical training from week one, not as an afterthought in the last session."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {phases.map((p) => (
            <div key={p.phase} className="card p-7">
              <h3 className="font-mono text-xs uppercase tracking-widest text-emerald-300">
                {p.phase}
              </h3>
              <ul className="mt-6 space-y-4">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 text-emerald-300" />
                    <span className="text-sm leading-relaxed text-fg-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------ Target roles */}
      <Section className="border-y border-white/10 bg-ink-900/40">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Target roles"
              title="What our graduates interview for"
              intro="Across the six programmes, these are the titles we prepare people for in Bengaluru and remote-first Indian teams."
            />
          </div>
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-2.5">
              {roleGroups.map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm text-fg-muted"
                >
                  {r}
                </span>
              ))}
            </div>
            <p className="mt-8 text-sm leading-relaxed text-fg-subtle">
              Salary ranges quoted across this site are indicative of the wider
              Indian market for these roles at the experience levels our
              learners target. Your outcome depends on your background,
              interview performance and the market at the time. We do not
              guarantee employment or a specific salary.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Talk to us"
            title="Ask us exactly what support you would get."
            intro="Tell a counsellor your target role and current situation. They will walk you through what the career support looks like in practice for someone with your profile."
          />
          <LeadForm />
        </div>
      </Section>
    </>
  );
}
