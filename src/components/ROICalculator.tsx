"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ChevronDown, ArrowRight } from "lucide-react";

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

function formatInr(n: number) {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(1)}Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1)}L`;
  return `₹${n.toLocaleString()}`;
}

export default function ROICalculator() {
  const [dealSize, setDealSize] = useState(100_000);
  const [revenueIdx, setRevenueIdx] = useState(1);
  const [aiSystems, setAiSystems] = useState(5);
  const [calculated, setCalculated] = useState(false);

  // Keep existing logic exactly as-is
  const revenue = revenueBrackets[revenueIdx]!.value;
  const maxFinePercent = revenue * 0.07;
  const maxFineCap = 35_000_000;
  const maxFine = Math.min(maxFinePercent, maxFineCap);

  const compliVibeCost = aiSystems <= 3 ? 350 * 12 : aiSystems <= 10 ? 3500 * 12 : 12000 * 12;
  const savingsMultiple = Math.round(maxFine / compliVibeCost);

  // India DPDP fine (using cap from spec)
  const maxIndiaFine = 2_500_000_000; // ₹250Cr

  // Mock conversion for display if requested ₹ for compliVibeCost
  const compliVibeCostInr = compliVibeCost * 90; // Approx conversion to make Result 3 look "realistic" in ₹ as requested

  const dealSizePct = ((dealSize - 10000) / (500000 - 10000)) * 100;
  const aiSystemsPct = ((aiSystems - 1) / (50 - 1)) * 100;

  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background */}
      <div className="absolute left-1/2 top-[30%] -translate-x-1/2 w-full h-[600px] pointer-events-none" 
           style={{ background: "radial-gradient(circle, rgba(255,59,59,0.06) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#FF3B3B] font-semibold mb-4">RISK CALCULATOR</p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.5))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Know your exposure. Before regulators do.
          </h2>
          <p className="text-[#555] text-[15px] max-w-[480px] mx-auto mt-4">
            Calculate your maximum fine exposure under EU AI Act and India DPDP, then see what CompliVibe costs by comparison.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="max-w-[900px] mx-auto bg-[#0A0A0A] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Inputs */}
            <div className="p-8 border-r border-white/[0.06]">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#0070F3]" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#444]">Your AI Profile</span>
              </div>

              {/* EU Deal Size */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[13px] font-medium text-[#888]">EU Deal Size</span>
                  <div className="rounded-lg bg-[#111] border border-white/[0.08] px-3 py-1">
                    <span className="text-[15px] font-bold font-mono text-white">{formatEur(dealSize)}</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min={10000} 
                  max={500000} 
                  step={5000} 
                  value={dealSize} 
                  onChange={(e) => setDealSize(Number(e.target.value))}
                  className="w-full h-1 bg-[#1a1a1a] rounded-full appearance-none cursor-pointer accent-[#0070F3]"
                  style={{
                    background: `linear-gradient(to right, #0070F3 0%, #0070F3 ${dealSizePct}%, #1a1a1a ${dealSizePct}%, #1a1a1a 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] text-[#333] mt-2 font-mono">
                  <span>€10K</span>
                  <span>€500K</span>
                </div>
              </div>

              {/* Company Revenue */}
              <div className="mb-6">
                <label className="block text-[13px] font-medium text-[#888] mb-3">Company Revenue</label>
                <div className="relative">
                  <select 
                    value={revenueIdx} 
                    onChange={(e) => setRevenueIdx(Number(e.target.value))}
                    className="w-full appearance-none rounded-xl bg-[#111] border border-white/[0.08] px-4 py-3 text-[13px] text-white outline-none focus:border-white/20 transition-colors cursor-pointer"
                  >
                    {revenueBrackets.map((b, i) => <option key={i} value={i}>{b.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444] pointer-events-none" />
                </div>
              </div>

              {/* AI Systems Count */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[13px] font-medium text-[#888]">AI Systems</span>
                  <div className="rounded-lg bg-[#111] border border-white/[0.08] px-3 py-1">
                    <span className="text-[15px] font-bold font-mono text-white">{aiSystems}</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min={1} 
                  max={50} 
                  value={aiSystems} 
                  onChange={(e) => setAiSystems(Number(e.target.value))}
                  className="w-full h-1 bg-[#1a1a1a] rounded-full appearance-none cursor-pointer accent-[#00C48C]"
                  style={{
                    background: `linear-gradient(to right, #00C48C 0%, #00C48C ${aiSystemsPct}%, #1a1a1a ${aiSystemsPct}%, #1a1a1a 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] text-[#333] mt-2 font-mono">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCalculated(true)}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#FF3B3B] to-[#F5A623] text-white font-semibold text-[14px] shadow-[0_0_20px_rgba(255,59,59,0.25)] transition-all"
              >
                Calculate My Exposure
              </motion.button>
            </div>

            {/* Right Column - Results */}
            <div className="p-8 bg-[#080808]/50">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#FF3B3B]" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#444]">Your Exposure</span>
              </div>

              <AnimatePresence mode="wait">
                {!calculated ? (
                  <motion.div 
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full min-h-[300px] gap-4"
                  >
                    <AlertTriangle size={32} className="text-[#333]" />
                    <p className="text-[14px] text-[#333] text-center max-w-[200px]">
                      Fill in your details and click Calculate to see your fine exposure.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    {/* EU Exposure */}
                    <div className="rounded-xl bg-[#FF3B3B]/[0.05] border border-[#FF3B3B]/20 p-5 relative overflow-hidden">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] uppercase tracking-widest text-[#FF3B3B]/60 font-bold">🇪🇺 EU AI Act — Maximum Fine</span>
                      </div>
                      <div className="text-[36px] font-bold font-mono text-[#FF3B3B] leading-none tracking-tight">
                        {formatEur(maxFine)}
                      </div>
                      <div className="text-[11px] text-[#FF3B3B]/50 mt-1">or 7% of global turnover</div>
                    </div>

                    {/* India Exposure */}
                    <div className="rounded-xl bg-[#F5A623]/[0.05] border border-[#F5A623]/20 p-5 relative overflow-hidden">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] uppercase tracking-widest text-[#F5A623]/60 font-bold">🇮🇳 India DPDP — Maximum Fine</span>
                      </div>
                      <div className="text-[36px] font-bold font-mono text-[#F5A623] leading-none tracking-tight">
                        {formatInr(maxIndiaFine)}
                      </div>
                      <div className="text-[11px] text-[#F5A623]/50 mt-1">per contravention under Section 33</div>
                    </div>

                    <div className="flex items-center gap-3 my-4">
                      <div className="h-px flex-1 bg-white/[0.06]" />
                      <span className="text-[10px] text-[#333] uppercase tracking-widest font-bold">vs</span>
                      <div className="h-px flex-1 bg-white/[0.06]" />
                    </div>

                    {/* CompliVibe Cost */}
                    <div className="rounded-xl bg-[#00C48C]/[0.05] border border-[#00C48C]/20 p-5">
                      <div className="text-[9px] uppercase tracking-widest text-[#00C48C]/60 font-bold mb-2">✓ CompliVibe Annual Cost</div>
                      <div className="text-[28px] font-bold font-mono text-[#00C48C] leading-none">
                        {formatInr(compliVibeCostInr)}
                      </div>
                      <div className="text-[11px] text-[#00C48C]/50 mt-1">Covers all AI systems</div>
                    </div>

                    {/* ROI Summary */}
                    <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center">
                          <div className="text-[20px] font-bold font-mono text-white">{formatEur(maxFine)}</div>
                          <div className="text-[10px] text-[#444] mt-0.5 uppercase">Fine Avoided</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[20px] font-bold font-mono text-white">{savingsMultiple}x</div>
                          <div className="text-[10px] text-[#444] mt-0.5 uppercase">Return on Investment</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[20px] font-bold font-mono text-white">{formatEur(maxFine - 100000)}</div>
                          <div className="text-[10px] text-[#444] mt-0.5 uppercase">Risk Reduced</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[20px] font-bold font-mono text-white">6 weeks</div>
                          <div className="text-[10px] text-[#444] mt-0.5 uppercase">Time to Compliant</div>
                        </div>
                      </div>
                    </div>

                    <motion.a 
                      href="/score"
                      whileHover={{ x: 4 }}
                      className="w-full h-11 mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0070F3] hover:bg-[#0060D1] transition-colors text-white font-semibold text-[13px]"
                    >
                      Start protecting your AI systems
                      <ArrowRight size={14} />
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
