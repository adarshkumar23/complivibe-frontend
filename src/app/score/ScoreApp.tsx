"use client";
import { useState } from "react";
import Link from "next/link";
export default function ScoreApp() {
  const [step, setStep] = useState(0);
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Compliance Readiness Score</h1>
      <p className="text-[#888] mb-8">Take the 2-minute assessment to see your risk exposure.</p>
      {step === 0 ? (
        <button onClick={() => setStep(1)} className="inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">Start Assessment</button>
      ) : (
        <div className="flex flex-col gap-4">
           <h2 className="text-xl font-medium">Do you process EU citizen data?</h2>
           <div className="flex gap-4 justify-center">
             <button onClick={() => setStep(2)} className="h-10 px-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10">Yes</button>
             <button onClick={() => setStep(2)} className="h-10 px-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10">No</button>
           </div>
        </div>
      )}
    </div>
  );
}
