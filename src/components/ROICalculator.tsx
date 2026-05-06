"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, TrendingDown } from "lucide-react";

const revenueBrackets = [
  { label: "Under €10M", value: 10_000_000 },
  { label: "€10M – €50M", value: 50_000_000 },
  { label: "€50M – €200M", value: 200_000_000 },
  { label: "€200M – €500M", value: 500_000_000 },
  { label: "Over €500M", value: 1_000_000_000 },
];

function formatEur(n: number) {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `€${(n / 1_000).toFixed(0)}K`;
  return `€${n}`;
}

export default function ROICalculator() {
  const [dealSize, setDealSize] = useState(100_000);
  const [revenueIdx, setRevenueIdx] = useState(1);
  const [aiSystems, setAiSystems] = useState(5);
  const [calculated, setCalculated] = useState(false);

  const revenue = revenueBrackets[revenueIdx]!.value;
  const maxFinePercent = revenue * 0.07;
  const maxFineCap = 35_000_000;
  const maxFine = Math.min(maxFinePercent, maxFineCap);

  const compliVibeCost = aiSystems <= 3 ? 350 * 12 : aiSystems <= 10 ? 3500 * 12 : 12000 * 12;
  const savingsMultiple = Math.round(maxFine / compliVibeCost);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,59,59,0.06) 0%, transparent 70%)" }} />
      <div className="relative mx-auto max-w-[900px] px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium">ROI Calculator</p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: "1.2", letterSpacing: "-0.03em", fontWeight: "700", background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.5))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Calculate your fine exposure vs CompliVibe cost
          </h2>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Deal size slider */}
            <div>
              <label className="block text-xs text-[#555] uppercase tracking-wider mb-2">EU Deal Size</label>
              <div className="text-xl font-bold text-white mb-3">{formatEur(dealSize)}</div>
              <input type="range" min={10000} max={500000} step={5000} value={dealSize} onChange={(e) => setDealSize(Number(e.target.value))}
                className="w-full h-1.5 bg-white/[0.06] rounded-full appearance-none cursor-pointer accent-urgency [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-urgency [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black" />
              <div className="flex justify-between text-[10px] text-[#444] mt-1"><span>€10K</span><span>€500K</span></div>
            </div>

            {/* Revenue dropdown */}
            <div>
              <label className="block text-xs text-[#555] uppercase tracking-wider mb-2">Company Revenue</label>
              <select value={revenueIdx} onChange={(e) => setRevenueIdx(Number(e.target.value))}
                className="w-full rounded-xl border border-white/[0.1] bg-[#0A0A0A] px-4 py-3 text-sm text-white outline-none focus:border-white/20 transition-colors">
                {revenueBrackets.map((b, i) => <option key={i} value={i}>{b.label}</option>)}
              </select>
            </div>

            {/* AI systems count */}
            <div>
              <label className="block text-xs text-[#555] uppercase tracking-wider mb-2">AI Systems Count</label>
              <div className="text-xl font-bold text-white mb-3">{aiSystems}</div>
              <input type="range" min={1} max={50} value={aiSystems} onChange={(e) => setAiSystems(Number(e.target.value))}
                className="w-full h-1.5 bg-white/[0.06] rounded-full appearance-none cursor-pointer accent-compliance-green [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-compliance-green [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black" />
              <div className="flex justify-between text-[10px] text-[#444] mt-1"><span>1</span><span>50</span></div>
            </div>
          </div>

          <button onClick={() => setCalculated(true)}
            className="w-full flex items-center justify-center gap-2 h-11 rounded-full bg-white text-black text-sm font-semibold hover:bg-[#ededed] transition-colors mb-6">
            Calculate Exposure
          </button>

          <AnimatePresence>
            {calculated && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-urgency/20 bg-urgency/5 p-5 text-center">
                  <AlertTriangle className="h-5 w-5 text-urgency mx-auto mb-2" />
                  <div className="text-xs text-[#555] mb-1">Max Fine Exposure</div>
                  <div className="text-2xl font-bold text-urgency">{formatEur(maxFine)}</div>
                  <div className="text-[10px] text-[#555] mt-1">7% of global turnover or €35M cap</div>
                </div>
                <div className="rounded-xl border border-compliance-green/20 bg-compliance-green/5 p-5 text-center">
                  <Shield className="h-5 w-5 text-compliance-green mx-auto mb-2" />
                  <div className="text-xs text-[#555] mb-1">CompliVibe Annual Cost</div>
                  <div className="text-2xl font-bold text-compliance-green">{formatEur(compliVibeCost)}</div>
                  <div className="text-[10px] text-[#555] mt-1">{aiSystems <= 3 ? "Starter" : aiSystems <= 10 ? "Growth" : "Enterprise"} plan</div>
                </div>
                <div className="rounded-xl border border-v-blue/20 bg-v-blue/5 p-5 text-center">
                  <TrendingDown className="h-5 w-5 text-v-blue mx-auto mb-2" />
                  <div className="text-xs text-[#555] mb-1">Savings Multiple</div>
                  <div className="text-2xl font-bold text-v-blue">{savingsMultiple}x</div>
                  <div className="text-[10px] text-[#555] mt-1">CompliVibe vs fine exposure</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
