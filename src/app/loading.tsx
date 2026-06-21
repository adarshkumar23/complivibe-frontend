import { Shield } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="cv-page flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="relative flex h-12 w-12 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2563eb] opacity-20" />
        <div
          className="relative flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)" }}
        >
          <Shield className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
      </div>
      <span className="animate-pulse text-sm text-[var(--cv-muted)]">Loading CompliVibe…</span>
    </div>
  );
}
