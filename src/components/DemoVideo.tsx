import { Play } from "lucide-react";

export default function DemoVideo() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="mx-auto max-w-[900px] px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-10">
          <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium">Product Demo</p>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              lineHeight: "1.2",
              letterSpacing: "-0.03em",
              fontWeight: "700",
              background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.5))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            See CompliVibe in 90 seconds
          </h2>
        </div>

        {/* Video placeholder */}
        <div className="relative rounded-2xl border border-white/[0.08] bg-[#0A0A0A] overflow-hidden aspect-video">
          {/* Fake video background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-compliance-green/5 via-[#0A0A0A] to-v-blue/5" />

          {/* Grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Play button + overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            {/* Play button */}
            <button className="relative group" aria-label="Play demo video">
              <div className="absolute -inset-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm group-hover:bg-white/15 transition-all">
                <Play className="h-6 w-6 text-white ml-1" fill="white" />
              </div>
            </button>

            {/* Coming soon overlay */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium text-white">Demo video coming soon</span>
              <span className="text-xs text-[#555]">90-second walkthrough of the Governance OS</span>
            </div>
          </div>

          {/* Fake timeline bar at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/60 to-transparent flex items-end px-4 pb-2">
            <div className="w-full h-1 bg-white/10 rounded-full">
              <div className="w-0 h-full bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
