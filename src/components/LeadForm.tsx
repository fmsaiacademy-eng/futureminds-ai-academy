"use client";

import { useState } from "react";
import { courses } from "@/lib/courses";
import { whatsappUrl } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:border-cyan-400/60 focus:bg-white/8 focus:outline-none";

const labelClass = "block text-xs font-medium tracking-wide text-fg-muted";

export default function LeadForm({
  defaultProgram = "",
}: {
  defaultProgram?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      form.reset();
      setStatus("sent");
      setMessage(
        "Thanks — we have your details. A counsellor will call you within one working day.",
      );
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "We could not send that. Please WhatsApp or call us instead.",
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8" noValidate={false}>
      <h2 className="text-xl font-bold">Talk to a course counsellor</h2>
      <p className="mt-2 text-sm text-fg-muted">
        Tell us where you are today and we will tell you honestly whether one of
        our programmes is the right next step.
      </p>

      {/* Honeypot — real users never fill this, bots usually do. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Full name <span className="text-cyan-300">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={`mt-2 ${inputClass}`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            Phone <span className="text-cyan-300">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            pattern="[0-9+\s\-()]{8,18}"
            placeholder="+91 98xxx xxxxx"
            className={`mt-2 ${inputClass}`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="email">
            Email <span className="text-cyan-300">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={`mt-2 ${inputClass}`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="program">
            Programme of interest
          </label>
          <select
            id="program"
            name="program"
            defaultValue={defaultProgram}
            className={`mt-2 ${inputClass}`}
          >
            <option value="">Not sure yet — advise me</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.title}>
                {c.shortTitle}
              </option>
            ))}
            <option value="Corporate training">Corporate training</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="experience">
            Experience
          </label>
          <select
            id="experience"
            name="experience"
            defaultValue=""
            className={`mt-2 ${inputClass}`}
          >
            <option value="">Select</option>
            <option>Student / fresher</option>
            <option>0–2 years</option>
            <option>3–5 years</option>
            <option>6–10 years</option>
            <option>10+ years</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">
            Anything you would like us to know
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Current role, goal, preferred batch timing…"
            className={`mt-2 resize-y ${inputClass}`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 w-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request a call back"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`mt-4 text-sm ${
          status === "error" ? "text-rose-300" : "text-emerald-300"
        }`}
      >
        {status === "sent" || status === "error" ? message : ""}
      </p>

      <p className="mt-4 text-center text-xs text-fg-subtle">
        Prefer to chat?{" "}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-300 underline underline-offset-2"
        >
          Message us on WhatsApp
        </a>
      </p>
    </form>
  );
}
