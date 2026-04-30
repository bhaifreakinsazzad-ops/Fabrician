import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-shell py-20">
      <div className="rounded-3xl border border-dashed border-[var(--line)] bg-white p-12 text-center">
        <p className="serif text-4xl text-[var(--ink)]">404</p>
        <h1 className="mt-2 text-2xl font-bold text-[var(--ink)]">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          The page you requested is not available.
        </p>
        <Link href="/" className="fabric-btn mt-6 inline-flex">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
