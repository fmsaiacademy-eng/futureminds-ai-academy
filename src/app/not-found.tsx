import { Container, GhostLink, PrimaryLink, Arrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora" />
      <Container className="relative z-10 py-32 text-center sm:py-44">
        <p className="font-mono text-sm tracking-widest text-cyan-300">
          404 — NOT FOUND
        </p>
        <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold leading-[1.1] sm:text-5xl">
          That page has been deprecated.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-fg-muted">
          The link you followed does not exist. Try the programmes page, or talk
          to a counsellor and we will point you to the right place.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <PrimaryLink href="/programs">
            Browse programmes <Arrow />
          </PrimaryLink>
          <GhostLink href="/">Back to home</GhostLink>
        </div>
      </Container>
    </section>
  );
}
