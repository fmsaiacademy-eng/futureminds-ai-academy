import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import { Container, Pill, Section, SectionHeading } from "@/components/ui";
import { site, mapsUrl, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Campus in Marathahalli, Bengaluru",
  description:
    "Talk to FutureMinds AI Academy — call, WhatsApp or visit our campus at 3rd Floor, #111, CKB Layout, Marathahalli, Bengaluru 560037. Free course counselling, no obligation.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    label: "Call us",
    value: site.phone,
    href: `tel:${site.phoneHref}`,
    note: site.hours,
  },
  {
    label: "WhatsApp",
    value: "Message the admissions team",
    href: whatsappUrl,
    note: "Usually replies within a few hours",
    external: true,
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "For syllabus, fees and corporate enquiries",
  },
];

const gettingHere = [
  "Walking distance from the Marathahalli bus stop on Outer Ring Road",
  "About 15 minutes from Whitefield, Bellandur and Brookefield",
  "Close to the ORR tech corridor — practical for evening batches after work",
  "Two-wheeler parking available in the building",
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="aurora" />
        <div className="absolute inset-0 grid-lines" aria-hidden="true" />
        <Container className="relative z-10 py-20 sm:py-24">
          <Pill className="bg-cyan-400/10 text-cyan-200 ring-cyan-400/25">
            Contact
          </Pill>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl">
            Free counselling. Straight answers.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
            Call, message, or drop into the campus. We will look at your
            background honestly and tell you which programme fits — or whether
            you should wait.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="card divide-y divide-white/10">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="block px-7 py-6 transition-colors hover:bg-white/4"
                >
                  <p className="eyebrow">{c.label}</p>
                  <p className="mt-2 break-words text-base font-semibold text-fg">
                    {c.value}
                  </p>
                  <p className="mt-1.5 text-xs text-fg-subtle">{c.note}</p>
                </a>
              ))}
            </div>

            <div className="card mt-6 p-7">
              <h2 className="eyebrow">Campus address</h2>
              <address className="mt-4 not-italic">
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
              </address>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-fg transition-colors hover:border-cyan-400/50 hover:bg-white/5"
              >
                Get directions
              </a>

              <h2 className="eyebrow mt-8">Getting here</h2>
              <ul className="mt-4 space-y-2.5">
                {gettingHere.map((g) => (
                  <li key={g} className="text-sm leading-relaxed text-fg-muted">
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LeadForm />

            <div className="card mt-6 overflow-hidden">
              <iframe
                title={`Map to ${site.name}, Marathahalli, Bengaluru`}
                src="https://www.google.com/maps?q=CKB%20Layout%2C%20Marathahalli%2C%20Bengaluru%2C%20Karnataka%20560037&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 grayscale-[0.35] contrast-[1.1]"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-white/10 bg-ink-900/40">
        <SectionHeading
          align="center"
          eyebrow="No pressure"
          title="A counselling call is not a sales call."
          intro="We would rather turn away someone who is not ready than take an enrolment that will not work out. Ask us anything — fees, batch timings, whether the market for a role is real, or what you should learn first."
        />
      </Section>
    </>
  );
}
