import { Shield } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
      <div className="relative flex h-12 w-12 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-compliance-green opacity-20" />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-compliance-green to-cv-blue">
          <Shield className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
      </div>
      <span className="text-sm text-[#555] animate-pulse">Loading CompliVibe…</span>
    </div>
  );
}
