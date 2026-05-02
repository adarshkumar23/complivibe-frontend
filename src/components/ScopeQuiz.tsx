"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, AlertTriangle, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const questions = [
  { id: 1, text: "Do you deploy AI systems in your products or operations?", weight: 10 },
  { id: 2, text: "Do you have customers or users in the European Union?", weight: 40 },
  { id: 3, text: "Does your AI make or assist decisions that affect people (hiring, credit, health, etc.)?", weight: 30 },
  { id: 4, text: "Are you in healthcare, finance, HR, education, or critical infrastructure?", weight: 15 },
  { id: 5, text: "Is your company's annual revenue over €50M?", weight: 5 },
];

type ScopeResult = "in-scope" | "possibly" | "out-of-scope";

function getResult(score: number): { result: ScopeResult; title: string; desc: string; color: string } {
  if (score >= 70) return { result: "in-scope", title: "You are in scope.", desc: "Your AI systems likely fall under EU AI Act high-risk obligations. You need Annex IV documentation, risk classification, and a compliance program before August 2026.", color: "urgency" };
  if (score >= 30) return { result: "possibly", title: "Possibly in scope.", desc: "Your AI systems may be subject to EU AI Act requirements depending on specific use cases. We recommend a detailed assessment.", color: "india-orange" };
  return { result: "out-of-scope", title: "Likely out of scope.", desc: "Based on your answers, your current AI usage may not fall under high-risk EU AI Act categories. However, transparency requirements may still apply.", color: "compliance-green" };
}

export default function ScopeQuiz({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const currentQ = questions[step];
  const score = Object.entries(answers).reduce((sum, [id, yes]) => {
    const q = questions.find((q) => q.id === Number(id));
    return sum + (yes && q ? q.weight : 0);
  }, 0);
  const done = step >= questions.length;
  const result = done ? getResult(score) : null;

  function answer(yes: boolean) {
    if (!currentQ) return;
    setAnswers({ ...answers, [currentQ.id]: yes });
    setStep(step + 1);
  }

  function reset() {
    setStep(0);
    setAnswers({});
  }

  return (
    <Dialog.Root open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-md rounded-2xl border border-white/[0.1] bg-[#0A0A0A] p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-compliance-green" />
                    <Dialog.Title className="text-base font-bold text-white">Am I In Scope?</Dialog.Title>
                  </div>
                  <Dialog.Close className="rounded-lg p-1.5 text-[#555] hover:text-white hover:bg-white/[0.05] transition-colors">
                    <X className="h-4 w-4" />
                  </Dialog.Close>
                </div>

                {!done && currentQ ? (
                  <>
                    {/* Progress */}
                    <div className="flex items-center gap-1.5 mb-6">
                      {questions.map((_, i) => (
                        <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${i <= step ? "bg-compliance-green" : "bg-white/[0.06]"}`} />
                      ))}
                    </div>

                    <p className="text-xs text-[#555] mb-2">Question {step + 1} of {questions.length}</p>
                    <p className="text-base text-white font-medium mb-8 leading-relaxed">{currentQ.text}</p>

                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => answer(true)}
                        className="flex items-center justify-center gap-2 h-12 rounded-xl border border-compliance-green/20 bg-compliance-green/5 text-sm font-semibold text-compliance-green hover:bg-compliance-green/10 transition-colors">
                        <Check className="h-4 w-4" /> Yes
                      </button>
                      <button onClick={() => answer(false)}
                        className="flex items-center justify-center gap-2 h-12 rounded-xl border border-white/[0.1] bg-white/[0.03] text-sm font-semibold text-[#888] hover:bg-white/[0.06] transition-colors">
                        <X className="h-4 w-4" /> No
                      </button>
                    </div>
                  </>
                ) : result ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${
                      result.result === "in-scope" ? "border-urgency/20 bg-urgency/10 text-urgency" :
                      result.result === "possibly" ? "border-india-orange/20 bg-india-orange/10 text-india-orange" :
                      "border-compliance-green/20 bg-compliance-green/10 text-compliance-green"
                    }`}>
                      {result.result === "in-scope" ? <AlertTriangle className="h-4 w-4" /> : result.result === "possibly" ? <Shield className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      <span className="text-sm font-semibold">{result.title}</span>
                    </div>
                    <p className="text-sm text-[#888] leading-relaxed mb-8">{result.desc}</p>
                    <div className="flex flex-col gap-3">
                      <Link href="/signup" onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-2 h-11 rounded-full bg-white text-black text-sm font-semibold hover:bg-[#ededed] transition-colors">
                        Start Free — Get Compliant <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link href="/score" onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-2 h-11 rounded-full border border-white/[0.1] bg-white/[0.03] text-sm text-white hover:bg-white/[0.06] transition-colors">
                        Get Detailed Score
                      </Link>
                    </div>
                  </motion.div>
                ) : null}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
