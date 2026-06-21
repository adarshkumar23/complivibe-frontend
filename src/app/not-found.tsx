import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="cv-page">
      <Nav />
      <main className="aurora-bg relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center">
        <h1 className="mb-4 text-7xl font-bold tracking-tight text-gradient-trust">404</h1>
        <h2 className="mb-6 text-2xl font-semibold text-[var(--cv-ink)]">Page not found</h2>
        <p className="mb-8 max-w-md text-[var(--cv-muted)]">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-full px-8 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
            boxShadow: "0 8px 24px rgba(37,99,235,0.28)",
          }}
        >
          Return home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
