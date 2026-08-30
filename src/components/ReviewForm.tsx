"use client";

import { useState } from "react";
import { courses } from "@/lib/courses";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:border-cyan-400/60 focus:bg-white/8 focus:outline-none";
const labelClass = "block text-xs font-medium tracking-wide text-fg-muted";

export default function ReviewForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: data.get("name"),
      role: data.get("role"),
      program: data.get("program"),
      quote: data.get("quote"),
      company: data.get("company"), // honeypot
      rating,
      consent: data.get("consent") === "on",
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Something went wrong.");

      form.reset();
      setRating(5);
      setStatus("sent");
      setMessage(
        "Thank you — that means a lot. We review every submission before it appears on the site.",
      );
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not send that.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8">
      <h2 className="text-xl font-bold">Share your experience</h2>
      <p className="mt-2 text-sm text-fg-muted">
        If FutureMinds helped you, tell the next person. Nothing is published
        until we have read it and you have confirmed we may.
      </p>

      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="r-company">Company</label>
        <input id="r-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="r-name">
            Your name <span className="text-cyan-300">*</span>
          </label>
          <input
            id="r-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={`mt-2 ${inputClass}`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="r-role">
            Current role
          </label>
          <input
            id="r-role"
            name="role"
            placeholder="e.g. Data Engineer at Acme"
            className={`mt-2 ${inputClass}`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="r-program">
            Programme you took
          </label>
          <select
            id="r-program"
            name="program"
            defaultValue=""
            className={`mt-2 ${inputClass}`}
          >
            <option value="">Select a programme</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.title}>
                {c.shortTitle}
              </option>
            ))}
            <option value="Corporate training">Corporate training</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <span className={labelClass}>
            Rating <span className="text-cyan-300">*</span>
          </span>
          <div className="mt-2 flex gap-1.5" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                onClick={() => setRating(n)}
                className={`grid h-10 w-10 place-items-center rounded-lg border text-lg transition-colors ${
                  n <= rating
                    ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                    : "border-white/10 text-fg-subtle hover:border-white/25"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="r-quote">
            Your feedback <span className="text-cyan-300">*</span>
          </label>
          <textarea
            id="r-quote"
            name="quote"
            rows={5}
            required
            minLength={20}
            placeholder="What did you build, what changed for you, and who would you recommend this to?"
            className={`mt-2 resize-y ${inputClass}`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm text-fg-muted">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 h-4 w-4 shrink-0 accent-cyan-400"
            />
            <span>
              I give FutureMinds permission to publish this feedback along with
              my name and role on their website.{" "}
              <span className="text-cyan-300">*</span>
            </span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 w-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit feedback"}
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
    </form>
  );
}
