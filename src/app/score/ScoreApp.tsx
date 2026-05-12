"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RefreshCw, AlertTriangle } from "lucide-react";

// --- Types ---
type RiskCategory = "UNACCEPTABLE" | "HIGH" | "LIMITED" | "MINIMAL" | "UNKNOWN";

interface ClassifyRequest {
  system_description: string;
  ai_use_cases: string[];
  data_subjects: string[];
  industry: string;
}

interface ClassifyResponse {
  risk_category: RiskCategory;
  annex_iii_match: boolean;
  matched_annex_iii_items: string[];
  confidence_score: number;
  reasoning: string;
  applicable_obligations_count: number;
}

// --- Form state ---
interface FormState {
  system_description: string;
  industry: string;
  ai_use_cases: string[];
  data_subjects: string[];
  has_eu_customers: boolean | null;
  has_indian_users: boolean | null;
  high_risk_sector: string;
}

const INDUSTRY_OPTIONS = [
  "Healthcare",
  "Fintech",
  "HR & Recruitment",
  "Legal",
  "Education",
  "Logistics",
  "E-commerce",
  "Government",
  "SaaS / B2B Tech",
  "Other",
];

const AI_USE_CASE_OPTIONS = [
  "Makes automated decisions about people",
  "Ranks or scores individuals",
  "Processes biometric data",
  "Detects emotions or behaviour",
  "Recommends content or products",
  "Classifies or categorises people",
  "Controls physical systems or infrastructure",
  "Assists in medical diagnosis",
  "Screens job applicants",
  "Other",
];

const DATA_SUBJECT_OPTIONS = [
  "Job applicants",
  "Employees",
  "Customers",
  "Patients",
  "Students",
  "Citizens / public",
  "Financial borrowers",
  "Minors",
  "Other",
];

const HIGH_RISK_SECTOR_OPTIONS = [
  "Healthcare / medical devices",
  "Credit scoring / insurance",
  "Hiring / HR decisions",
  "Law enforcement",
  "Critical infrastructure",
  "Education assessment",
  "None of the above",
];

const TOTAL_STEPS = 7;

// --- Risk badge config ---
const RISK_CONFIG: Record<RiskCategory, { label: string; bg: string; border: string; text: string; dot: string }> = {
  UNACCEPTABLE: {
    label: "UNACCEPTABLE RISK",
    bg: "bg-urgency/10",
    border: "border-urgency/30",
    text: "text-urgency",
    dot: "bg-urgency",
  },
  HIGH: {
    label: "HIGH RISK",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-400",
    dot: "bg-orange-400",
  },
  LIMITED: {
    label: "LIMITED RISK",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
    dot: "bg-yellow-400",
  },
  MINIMAL: {
    label: "MINIMAL RISK",
    bg: "bg-compliance-green/10",
    border: "border-compliance-green/30",
    text: "text-compliance-green",
    dot: "bg-compliance-green",
  },
  UNKNOWN: {
    label: "UNKNOWN",
    bg: "bg-white/5",
    border: "border-white/20",
    text: "text-[#888]",
    dot: "bg-[#888]",
  },
};

// --- Helpers ---
function ProgressBar({ step }: { step: number }) {
  const pct = Math.round((step / TOTAL_STEPS) * 100);
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[#555]">Step {step} of {TOTAL_STEPS}</span>
        <span className="text-xs text-[#555]">{pct}%</span>
      </div>
      <div className="h-1 w-full rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-compliance-green transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function MultiSelectChips({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
}) {
  function toggle(opt: string) {
    onChange(
      selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`rounded-full border px-4 py-2 text-sm transition-all ${
              active
                ? "border-compliance-green bg-compliance-green/10 text-compliance-green"
                : "border-white/10 bg-white/[0.03] text-[#888] hover:border-white/25 hover:text-white"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function YesNoToggle({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex gap-3">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onChange(v)}
          className={`h-12 flex-1 rounded-xl border text-sm font-medium transition-all ${
            value === v
              ? "border-compliance-green bg-compliance-green/10 text-compliance-green"
              : "border-white/10 bg-white/[0.03] text-[#888] hover:border-white/25 hover:text-white"
          }`}
        >
          {v ? "Yes" : "No"}
        </button>
      ))}
    </div>
  );
}

// --- Main component ---
export default function ScoreApp() {
  const [step, setStep] = useState(0); // 0 = intro
  const [form, setForm] = useState<FormState>({
    system_description: "",
    industry: "",
    ai_use_cases: [],
    data_subjects: [],
    has_eu_customers: null,
    has_indian_users: null,
    high_risk_sector: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClassifyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  function canAdvance(): boolean {
    switch (step) {
      case 1: return form.system_description.trim().length > 10;
      case 2: return form.industry.length > 0;
      case 3: return form.ai_use_cases.length > 0;
      case 4: return form.data_subjects.length > 0;
      case 5: return form.has_eu_customers !== null;
      case 6: return form.has_indian_users !== null;
      case 7: return form.high_risk_sector.length > 0;
      default: return true;
    }
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);

    const payload: ClassifyRequest = {
      system_description: form.system_description,
      ai_use_cases: form.ai_use_cases,
      data_subjects: form.data_subjects,
      industry: form.industry,
    };

    // Simulate minimum loading state for UX
    const minDelay = new Promise((r) => setTimeout(r, 1500));

    try {
      const [res] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/classify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        minDelay,
      ]);

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data: ClassifyResponse = await res.json();
      setResult(data);
    } catch {
      setError(
        "Assessment unavailable — our servers may be starting up. Try again or book a demo."
      );
    } finally {
      setLoading(false);
    }
  }

  function advance() {
    if (step === TOTAL_STEPS) {
      handleSubmit();
    } else {
      setStep((s) => s + 1);
    }
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function reset() {
    setStep(0);
    setForm({
      system_description: "",
      industry: "",
      ai_use_cases: [],
      data_subjects: [],
      has_eu_customers: null,
      has_indian_users: null,
      high_risk_sector: "",
    });
    setResult(null);
    setError(null);
  }

  // --- Results screen ---
  if (result) {
    const cfg = RISK_CONFIG[result.risk_category] ?? RISK_CONFIG.UNKNOWN;
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-8 md:p-12">
        <div className="flex flex-col gap-8">
          {/* Risk badge */}
          <div className={`inline-flex items-center gap-3 self-start rounded-2xl border px-6 py-4 ${cfg.bg} ${cfg.border}`}>
            <span className={`h-3 w-3 rounded-full ${cfg.dot}`} />
            <span className={`text-2xl font-bold tracking-tight ${cfg.text}`}>
              {cfg.label}
            </span>
          </div>

          {/* Confidence + obligations */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="text-xs text-[#555] uppercase tracking-wider mb-1">Confidence</div>
              <div className="text-3xl font-bold text-white">
                {Math.round(result.confidence_score * 100)}
                <span className="text-lg text-[#555]">%</span>
              </div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="text-xs text-[#555] uppercase tracking-wider mb-1">Obligations</div>
              <div className="text-3xl font-bold text-white">{result.applicable_obligations_count}</div>
            </div>
          </div>

          {/* Reasoning */}
          <div>
            <div className="text-xs text-[#555] uppercase tracking-wider mb-3">Assessment</div>
            <p className="text-[#888] text-sm leading-relaxed">{result.reasoning}</p>
          </div>

          {/* Annex III matches */}
          {result.annex_iii_match && result.matched_annex_iii_items.length > 0 && (
            <div>
              <div className="text-xs text-[#555] uppercase tracking-wider mb-3">
                Matched Annex III categories
              </div>
              <div className="flex flex-wrap gap-2">
                {result.matched_annex_iii_items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-urgency/20 bg-urgency/5 px-3 py-1 text-xs text-urgency"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/signup"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-black hover:bg-[#ededed] transition-colors"
            >
              Generate your Annex IV documentation →
            </Link>
            <Link
              href="/book-demo"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] text-sm font-semibold text-white hover:bg-white/[0.08] transition-all"
            >
              Book a compliance call →
            </Link>
          </div>

          <button
            onClick={reset}
            className="inline-flex items-center gap-2 self-start text-xs text-[#555] hover:text-white transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Start over
          </button>
        </div>
      </div>
    );
  }

  // --- Error screen ---
  if (error) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-12 text-center">
        <AlertTriangle className="h-10 w-10 text-urgency mx-auto mb-4" />
        <p className="text-white font-semibold text-lg mb-2">Assessment unavailable</p>
        <p className="text-[#888] text-sm mb-8 max-w-sm mx-auto">
          {error}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => { setError(null); setLoading(false); handleSubmit(); }}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try again
          </button>
          <Link
            href="/book-demo"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-5 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all"
          >
            Book a demo
          </Link>
        </div>
      </div>
    );
  }

  // --- Loading screen ---
  if (loading) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-12 text-center">
        <div className="flex justify-center gap-1.5 mb-6">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-full bg-compliance-green animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-white font-semibold text-xl mb-2">Analysing your AI system…</p>
        <p className="text-[#555] text-sm">Checking against Annex III categories and 719 obligations</p>
      </div>
    );
  }

  // --- Intro screen ---
  if (step === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-8 md:p-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-urgency/20 bg-urgency/5 px-4 py-1.5 text-xs text-urgency font-medium mb-6">
          EU AI Act enforcement: August 2, 2026
        </div>
        <h1 className="text-3xl font-bold mb-4 text-white">AI Risk Assessment</h1>
        <p className="text-[#888] mb-2 max-w-md mx-auto leading-relaxed">
          7 questions. Discover your EU AI Act risk category, matched Annex III items, and applicable obligations — in under 3 minutes.
        </p>
        <p className="text-[#555] text-sm mb-8">No account required.</p>
        <button
          onClick={() => setStep(1)}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors"
        >
          Start Assessment
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // --- Question screens ---
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-8 md:p-12">
      <ProgressBar step={step} />

      {/* Q1 */}
      {step === 1 && (
        <div>
          <h2 className="text-white font-semibold text-xl mb-2">Describe your AI system</h2>
          <p className="text-[#555] text-sm mb-6">
            What does your AI do? Who does it affect? How are decisions made?
          </p>
          <textarea
            value={form.system_description}
            onChange={(e) => setForm((f) => ({ ...f, system_description: e.target.value }))}
            rows={5}
            placeholder="e.g. A machine learning model that screens job applications and ranks candidates based on CV text, work history, and social profiles"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#555] focus:border-white/30 focus:outline-none transition-colors resize-none"
          />
        </div>
      )}

      {/* Q2 */}
      {step === 2 && (
        <div>
          <h2 className="text-white font-semibold text-xl mb-2">What industry are you in?</h2>
          <p className="text-[#555] text-sm mb-6">Select the primary sector your AI operates in.</p>
          <div className="grid grid-cols-2 gap-2.5">
            {INDUSTRY_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setForm((f) => ({ ...f, industry: opt }))}
                className={`rounded-xl border px-4 py-3 text-sm text-left transition-all ${
                  form.industry === opt
                    ? "border-compliance-green bg-compliance-green/10 text-compliance-green"
                    : "border-white/10 bg-white/[0.03] text-[#888] hover:border-white/25 hover:text-white"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Q3 */}
      {step === 3 && (
        <div>
          <h2 className="text-white font-semibold text-xl mb-2">What does your AI system do?</h2>
          <p className="text-[#555] text-sm mb-6">Select all that apply.</p>
          <MultiSelectChips
            options={AI_USE_CASE_OPTIONS}
            selected={form.ai_use_cases}
            onChange={(v) => setForm((f) => ({ ...f, ai_use_cases: v }))}
          />
        </div>
      )}

      {/* Q4 */}
      {step === 4 && (
        <div>
          <h2 className="text-white font-semibold text-xl mb-2">Who does your AI make decisions about?</h2>
          <p className="text-[#555] text-sm mb-6">Select all that apply.</p>
          <MultiSelectChips
            options={DATA_SUBJECT_OPTIONS}
            selected={form.data_subjects}
            onChange={(v) => setForm((f) => ({ ...f, data_subjects: v }))}
          />
        </div>
      )}

      {/* Q5 */}
      {step === 5 && (
        <div>
          <h2 className="text-white font-semibold text-xl mb-2">
            Do you have EU customers or process EU citizen data?
          </h2>
          <p className="text-[#555] text-sm mb-6">This determines EU AI Act applicability.</p>
          <YesNoToggle
            value={form.has_eu_customers}
            onChange={(v) => setForm((f) => ({ ...f, has_eu_customers: v }))}
          />
        </div>
      )}

      {/* Q6 */}
      {step === 6 && (
        <div>
          <h2 className="text-white font-semibold text-xl mb-2">Do you process Indian user data?</h2>
          <p className="text-[#555] text-sm mb-6">This determines India DPDP applicability.</p>
          <YesNoToggle
            value={form.has_indian_users}
            onChange={(v) => setForm((f) => ({ ...f, has_indian_users: v }))}
          />
        </div>
      )}

      {/* Q7 */}
      {step === 7 && (
        <div>
          <h2 className="text-white font-semibold text-xl mb-2">
            Is your AI used in any of these sectors?
          </h2>
          <p className="text-[#555] text-sm mb-6">
            These are Annex III high-risk categories under EU AI Act.
          </p>
          <div className="flex flex-col gap-2.5">
            {HIGH_RISK_SECTOR_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setForm((f) => ({ ...f, high_risk_sector: opt }))}
                className={`rounded-xl border px-4 py-3 text-sm text-left transition-all ${
                  form.high_risk_sector === opt
                    ? "border-compliance-green bg-compliance-green/10 text-compliance-green"
                    : "border-white/10 bg-white/[0.03] text-[#888] hover:border-white/25 hover:text-white"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
        {step > 1 ? (
          <button
            onClick={back}
            className="inline-flex items-center gap-2 text-sm text-[#555] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          onClick={advance}
          disabled={!canAdvance()}
          className={`inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold transition-all ${
            canAdvance()
              ? "bg-white text-black hover:bg-[#ededed]"
              : "bg-white/10 text-[#555] cursor-not-allowed"
          }`}
        >
          {step === TOTAL_STEPS ? "Analyse my AI system" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
