import CardDemo from "@/components/ui/cards-demo-3";

export default function LogoCloud() {
  return (
    <section className="relative border-y border-white/[0.06] bg-[#050505]">
      <div className="mx-auto max-w-[1200px] px-6 py-16 flex flex-col items-center gap-8">
        <p className="text-center text-xs text-[#555] uppercase tracking-[0.2em] font-medium">
          Built for the AI-native era
        </p>
        <CardDemo />
        <p className="text-center text-xs text-[#444] max-w-md">
          CompliVibe helps teams building on any AI stack — OpenAI, Claude, Gemini, Llama, Copilot — stay compliant with EU AI Act and India DPDP.
        </p>
      </div>
    </section>
  );
}
