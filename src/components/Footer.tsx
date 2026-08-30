import Link from "next/link";
import { courses } from "@/lib/courses";
import { site, nav, mapsUrl, whatsappUrl } from "@/lib/site";
import Logo from "./Logo";

const social = [
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "YouTube", href: site.social.youtube },
  { label: "Instagram", href: site.social.instagram },
  { label: "X", href: site.social.x },
];

export default function Footer({ address }: { address: string }) {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-ink-900">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted">
              {site.legalName} is a Bengaluru-based training institute for
              applied AI engineering. Live cohorts, real projects, and mentors
              who build these systems for a living.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-medium text-fg-muted transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow">Programs</h2>
            <ul className="mt-5 space-y-3">
              {courses.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/programs/${c.slug}`}
                    className="text-sm text-fg-muted transition-colors hover:text-cyan-300"
                  >
                    {c.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="eyebrow">Institute</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/feedback"
                  className="text-sm text-fg-muted transition-colors hover:text-cyan-300"
                >
                  Give feedback
                </Link>
              </li>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-sm text-fg-muted transition-colors hover:text-cyan-300"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow">Visit the campus</h2>
            <address className="mt-5 space-y-4 text-sm not-italic text-fg-muted">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block leading-relaxed transition-colors hover:text-cyan-300"
              >
                {address}
                <br />
                {site.address.state} {site.address.postalCode}, India
              </a>
              <a
                href={`tel:${site.phoneHref}`}
                className="block transition-colors hover:text-cyan-300"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="block break-all transition-colors hover:text-cyan-300"
              >
                {site.email}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-emerald-400/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/25 transition-colors hover:bg-emerald-400/20"
              >
                Chat on WhatsApp
              </a>
              <p className="text-xs text-fg-subtle">{site.hours}</p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>
            Salary and outcome figures are indicative market ranges, not
            guarantees.
          </p>
        </div>
      </div>
    </footer>
  );
}
