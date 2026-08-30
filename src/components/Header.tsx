"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import Logo from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink-950/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-cyan-300"
                    : "text-fg-muted hover:bg-white/5 hover:text-fg"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phoneHref}`}
            className="hidden text-sm font-medium text-fg-muted transition-colors hover:text-fg xl:block"
          >
            {site.phone}
          </a>
          <Link
            href="/contact"
            className="hidden rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.03] sm:block"
          >
            Book a free counselling call
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-fg lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                  open ? "top-1.75 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.75 h-0.5 w-5 rounded bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                  open ? "top-1.75 -rotate-45" : "top-3.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-white/10 bg-ink-950/95 backdrop-blur-xl lg:hidden"
      >
        <nav className="mx-auto max-w-7xl px-5 py-4 sm:px-8" aria-label="Mobile">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-3.5 text-base font-medium text-fg-muted transition-colors hover:text-cyan-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 text-center text-sm font-semibold text-ink-950"
          >
            Book a free counselling call
          </Link>
          <a
            href={`tel:${site.phoneHref}`}
            className="mt-3 block text-center text-sm text-fg-muted"
          >
            Call {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
