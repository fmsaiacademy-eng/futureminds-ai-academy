import Link from "next/link";
import { accents, type Course } from "@/lib/courses";
import { Arrow, Pill } from "./ui";

export default function CourseCard({ course }: { course: Course }) {
  const a = accents[course.accent];

  return (
    <Link
      href={`/programs/${course.slug}`}
      className="card card-hover group relative flex flex-col overflow-hidden p-6 sm:p-7"
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${a.bar} opacity-60`}
      />

      <div className="flex items-center justify-between gap-3">
        <span className={`font-mono text-[0.6875rem] tracking-widest ${a.text}`}>
          {course.code}
        </span>
        <Pill className={`${a.chip} ring-inset`}>{course.level}</Pill>
      </div>

      <h3 className="mt-5 text-xl font-bold leading-snug text-fg">
        {course.title}
      </h3>
      <p className={`mt-2 text-sm font-medium ${a.text}`}>{course.tagline}</p>

      <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-fg-muted">
        {course.summary}
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-sm">
        <div>
          <dt className="text-xs text-fg-subtle">Duration</dt>
          <dd className="mt-1 font-medium text-fg">{course.duration}</dd>
        </div>
        <div>
          <dt className="text-xs text-fg-subtle">Typical range</dt>
          <dd className="mt-1 font-medium text-fg">{course.salaryRange}</dd>
        </div>
      </dl>

      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-fg">
        View curriculum
        <Arrow className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
