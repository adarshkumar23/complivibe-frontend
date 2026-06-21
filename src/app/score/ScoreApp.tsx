"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RefreshCw,
  ShieldCheck,
  Boxes,
  Archive,
  Layers,
  Eye,
  Activity,
  FileBarChart,
  Sparkles,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { submitWeb3Form } from "@/lib/submitWeb3Form";

/* ------------------------------------------------------------------ */
/*  Assessment data                                                    */
/* ------------------------------------------------------------------ */
type SectionKey = "governance" | "evidence" | "compliance" | "observability" | "reporting";

type Question = {
  category: string;
  question: string;
  section: SectionKey;
  icon: typeof Boxes;
  accent: string;
};

const QUESTIONS: Question[] = [
  {
    category: "AI System Visibility",
    question: "Do you have a clear inventory of every AI system, model, vendor, and use case?",
    section: "governance",
    icon: Boxes,
    accent: "#2563eb",
  },
  {
    category: "Ownership & Governance",
    question: "Does every AI system have an owner, reviewer, policy, and approval workflow?",
    section: "governance",
    icon: ShieldCheck,
    accent: "#7c3aed",
  },
  {
    category: "Evidence Readiness",
    question: "Can your team prove reviews, approvals, controls, and decisions with evidence?",
    section: "evidence",
    icon: Archive,
    accent: "#10b981",
  },
  {
    category: "Compliance Mapping",
    question: "Are your AI systems mapped to relevant AI, privacy, security, and trust frameworks?",
    section: "compliance",
    icon: Layers,
    accent: "#2563eb",
  },
  {
    category: "Vendor & Model Risk",
    question: "Do you track third-party AI vendors, LLM APIs, model changes, and risk exposure?",
    section: "compliance",
    icon: Eye,
    accent: "#7c3aed",
  },
  {
    category: "Observability Signals",
    question:
      "Do you monitor usage, drift indicators, incidents, latency, errors, or production trust signals?",
    section: "observability",
    icon: Activity,
    accent: "#06b6d4",
  },
  {
    category: "Trust Reporting",
    question: "Can you generate customer-ready, auditor-ready, or board-ready AI trust reports?",
    section: "reporting",
    icon: FileBarChart,
    accent: "#f59e0b",
  },
];

const ANSWERS = [
  { label: "Not started", value: 0 },
  { label: "Partially", value: 1 },
  { label: "Mostly", value: 2 },
  { label: "Continuously managed", value: 3 },
];

const SECTIONS: { key: SectionKey; label: string; questions: number[] }[] = [
  { key: "governance", label: "Governance readiness", questions: [0, 1] },
  { key: "evidence", label: "Evidence readiness", questions: [2] },
  { key: "compliance", label: "Compliance readiness", questions: [3, 4] },
  { key: "observability", label: "Observability readiness", questions: [5] },
  { key: "reporting", label: "Trust reporting readiness", questions: [6] },
];

const RECOMMENDATIONS: Record<SectionKey, string> = {
  governance:
    "Stand up an AI system inventory with clear owners, reviewers, and approval workflows.",
  evidence:
    "Automate evidence collection so reviews, approvals, and controls are always provable.",
  compliance:
    "Map your AI systems to the AI, privacy, and security frameworks that apply to you.",
  observability:
    "Add observability for usage, drift, incidents, and production trust signals.",
  reporting:
    "Set up trust reporting so you can produce customer-, auditor-, and board-ready reports.",
};

const TOTAL = QUESTIONS.length;
const MAX_SCORE = TOTAL * 3;

type Band = { min: number; label: string; color: string };
const BANDS: Band[] = [
  { min: 85, label: "Strong AI trust posture", color: "#10b981" },
  { min: 65, label: "Operational trust layer forming", color: "#2563eb" },
  { min: 40, label: "Early trust readiness", color: "#f59e0b" },
  { min: 0, label: "Trust foundation missing", color: "#dc2626" },
];

function bandFor(score: number): Band {
  return BANDS.find((b) => score >= b.min) ?? BANDS[BANDS.length - 1];
}

/* ------------------------------------------------------------------ */
/*  Optional lead capture (only if Web3Forms is configured)           */
/* ------------------------------------------------------------------ */
const HAS_WEB3FORMS = Boolean(process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function EmailMyScore({ score, band }: { score: number; band: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setMsg("Enter a valid email address.");
      return;
    }
    setStatus("submitting");
    setMsg("");
    try {
      await submitWeb3Form({
        name: "AI Trust Score lead",
        email: email.trim(),
        ai_trust_score: String(score),
        readiness_band: band,
        subject: "AI Trust Score result",
        source: "website_score",
        botcheck: "",
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email contact@complivibe.in.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-[#10b981]/30 bg-[#10b981]/[0.08] p-4 text-center text-sm font-medium text-[var(--cv-ink)]">
        Sent — check your inbox for your AI Trust Score.
      </div>
    );
  }

  return (
    <form onSubmit={send} noValidate className="flex flex-col gap-2 sm:flex-row">
      <label htmlFor="score-email" className="sr-only">
        Email address
      </label>
      <input
        id="score-email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        placeholder="you@company.com"
        className="h-11 flex-1 rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-4 text-sm text-[var(--cv-ink)] placeholder:text-[var(--cv-muted)] transition-colors focus:border-[#2563eb]/50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/15"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="liquid-glass h-11 shrink-0 rounded-full px-5 text-sm font-semibold text-[var(--cv-ink)] transition-colors hover:border-[#2563eb]/40 disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : "Email me this score"}
      </button>
      {status === "error" && (
        <p className="text-xs font-medium text-[#dc2626] dark:text-[#f87171] sm:hidden">{msg}</p>
      )}
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress bar                                                       */
/* ------------------------------------------------------------------ */
function ProgressBar({ current, reduce }: { current: number; reduce: boolean | null }) {
  const pct = Math.round((current / TOTAL) * 100);
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-[var(--cv-muted)]">
        <span>
          Question {current} of {TOTAL}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--cv-surface-strong)]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)" }}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */
type Phase = "intro" | "quiz" | "result";

export default function ScoreApp() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0); // current question index (0-based)
  const [answers, setAnswers] = useState<Record<number, number>>({});

  function select(value: number) {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  }

  function next() {
    if (answers[index] === undefined) return;
    if (index === TOTAL - 1) {
      setPhase("result");
    } else {
      setIndex((i) => i + 1);
    }
  }

  function back() {
    setIndex((i) => Math.max(0, i - 1));
  }

  function reset() {
    setPhase("intro");
    setIndex(0);
    setAnswers({});
  }

  // --- Scoring (transparent, computed from real answers) ---
  const answeredCount = Object.keys(answers).length;
  const totalValue = Object.values(answers).reduce((a, b) => a + b, 0);
  const score = answeredCount === TOTAL ? Math.round((totalValue / MAX_SCORE) * 100) : 0;
  const band = bandFor(score);

  const sectionScores = SECTIONS.map((s) => {
    const vals = s.questions.map((q) => answers[q] ?? 0);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return { ...s, pct: Math.round((avg / 3) * 100) };
  });

  const strengths = sectionScores.filter((s) => s.pct >= 67);
  const gaps = [...sectionScores].filter((s) => s.pct < 50).sort((a, b) => a.pct - b.pct);
  const nextSteps =
    gaps.length > 0
      ? gaps.slice(0, 3).map((g) => RECOMMENDATIONS[g.key])
      : [
          "Maintain momentum — keep evidence, controls, and reports continuously up to date.",
          "Extend coverage to new AI systems and vendors as they ship.",
        ];

  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
      };

  /* ----------------------------- Intro ----------------------------- */
  if (phase === "intro") {
    return (
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-kicker mb-5">Free AI Trust Score</span>
        <h1
          className="font-semibold tracking-tight text-[var(--cv-ink)]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", letterSpacing: "-0.04em", lineHeight: 1.07 }}
        >
          Find your AI trust readiness in{" "}
          <span className="text-gradient-trust">minutes</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-[var(--cv-muted)] md:text-[1.125rem]">
          Answer a few questions to understand your AI governance, evidence, compliance, risk, and
          observability posture — no account required.
        </p>
        <button
          onClick={() => setPhase("quiz")}
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-full px-8 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
            boxShadow: "0 8px 24px rgba(37,99,235,0.28)",
          }}
        >
          Start assessment
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </button>
        <p className="mt-5 text-xs text-[var(--cv-muted)]">
          Built for teams using AI across products, operations, vendors, and internal workflows.
        </p>
      </motion.div>
    );
  }

  /* ----------------------------- Result ---------------------------- */
  if (phase === "result") {
    const R = 54;
    const C = 2 * Math.PI * R;
    return (
      <motion.div
        className="mx-auto max-w-3xl"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="liquid-card glass-highlight p-7 md:p-10">
          {/* Score header */}
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="relative h-36 w-36 shrink-0">
              <svg viewBox="0 0 128 128" className="h-36 w-36 -rotate-90">
                <circle cx="64" cy="64" r={R} fill="none" stroke="var(--cv-border)" strokeWidth="10" />
                <motion.circle
                  cx="64"
                  cy="64"
                  r={R}
                  fill="none"
                  stroke={band.color}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  initial={{ strokeDashoffset: reduce ? C - (score / 100) * C : C }}
                  animate={{ strokeDashoffset: C - (score / 100) * C }}
                  transition={{ duration: reduce ? 0 : 1.1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold tracking-tight text-[var(--cv-ink)]">{score}</span>
                <span className="text-xs text-[var(--cv-muted)]">/ 100</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 sm:items-start">
              <span className="section-kicker">Your AI Trust Score</span>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold"
                style={{ color: band.color, borderColor: `${band.color}44`, backgroundColor: `${band.color}12` }}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: band.color }} />
                {band.label}
              </span>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-[var(--cv-muted)]">
                Based on your answers across governance, evidence, compliance, risk, observability,
                and trust reporting.
              </p>
            </div>
          </div>

          {/* Section readiness */}
          <div className="mt-9">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--cv-muted)]">
              Readiness by area
            </p>
            <div className="flex flex-col gap-4">
              {sectionScores.map((s, i) => {
                const c = bandFor(s.pct).color;
                return (
                  <div key={s.key}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-medium text-[var(--cv-ink)]">{s.label}</span>
                      <span className="font-mono text-[13px] text-[var(--cv-muted)]">{s.pct}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--cv-surface-strong)]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: c }}
                        initial={{ width: reduce ? `${s.pct}%` : 0 }}
                        animate={{ width: `${s.pct}%` }}
                        transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strengths + Gaps */}
          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bento-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#10b981]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--cv-muted)]">
                  Strengths
                </span>
              </div>
              {strengths.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {strengths.map((s) => (
                    <li key={s.key} className="flex items-start gap-2 text-sm text-[var(--cv-ink)]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#10b981]" />
                      {s.label}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[var(--cv-muted)]">
                  No areas are fully managed yet — a clear opportunity to build your trust layer.
                </p>
              )}
            </div>

            <div className="bento-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-[#f59e0b]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--cv-muted)]">
                  Gaps
                </span>
              </div>
              {gaps.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {gaps.map((s) => (
                    <li key={s.key} className="flex items-start gap-2 text-sm text-[var(--cv-ink)]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f59e0b]" />
                      {s.label}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[var(--cv-muted)]">
                  No major gaps — focus on keeping every area continuously managed.
                </p>
              )}
            </div>
          </div>

          {/* Recommended next steps */}
          <div className="mt-4 liquid-panel p-5">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#2563eb] dark:text-[#3b82f6]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--cv-muted)]">
                Recommended next steps
              </span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {nextSteps.map((step) => (
                <li key={step} className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--cv-ink)]">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb] dark:text-[#3b82f6]" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Optional lead capture */}
          {HAS_WEB3FORMS && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-[var(--cv-ink)]">Email me this score</p>
              <EmailMyScore score={score} band={band.label} />
              <p className="mt-2 text-xs text-[var(--cv-muted)]">
                Optional — your score is already shown above. No account required.
              </p>
            </div>
          )}

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book-demo"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
              style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", boxShadow: "0 8px 24px rgba(37,99,235,0.28)" }}
            >
              Book a Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/waitlist"
              className="liquid-glass inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold text-[var(--cv-ink)] transition-colors hover:border-[#2563eb]/40"
            >
              Join Waitlist
            </Link>
          </div>

          <button
            onClick={reset}
            className="mt-5 inline-flex items-center gap-2 self-start text-xs font-medium text-[var(--cv-muted)] transition-colors hover:text-[var(--cv-ink)]"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retake assessment
          </button>
        </div>
      </motion.div>
    );
  }

  /* ------------------------------ Quiz ----------------------------- */
  const q = QUESTIONS[index];
  const Icon = q.icon;
  return (
    <div className="mx-auto max-w-2xl">
      <div className="liquid-card glass-highlight p-6 md:p-9">
        <ProgressBar current={index + 1} reduce={reduce} />

        <AnimatePresence mode="wait">
          <motion.div key={index} {...fade}>
            <div className="mb-5 flex items-center gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                style={{ backgroundColor: `${q.accent}14`, borderColor: `${q.accent}33` }}
              >
                <Icon className="h-5 w-5" style={{ color: q.accent }} />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--cv-muted)]">
                {q.category}
              </span>
            </div>

            <h2 className="text-balance text-lg font-bold tracking-tight text-[var(--cv-ink)] md:text-xl">
              {q.question}
            </h2>

            <div className="mt-6 flex flex-col gap-3">
              {ANSWERS.map((a) => {
                const active = answers[index] === a.value;
                return (
                  <motion.button
                    key={a.label}
                    type="button"
                    onClick={() => select(a.value)}
                    whileTap={reduce ? undefined : { scale: 0.99 }}
                    aria-pressed={active}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors ${
                      active
                        ? "border-[#2563eb] bg-[#2563eb]/[0.08] text-[var(--cv-ink)]"
                        : "border-[var(--cv-border)] bg-[var(--cv-surface)] text-[var(--cv-muted)] hover:border-[#2563eb]/40 hover:text-[var(--cv-ink)]"
                    }`}
                  >
                    {a.label}
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                        active ? "border-[#2563eb] bg-[#2563eb] text-white" : "border-[var(--cv-border)]"
                      }`}
                    >
                      {active && <Check className="h-3 w-3" strokeWidth={3} />}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-[var(--cv-border)] pt-6">
          {index > 0 ? (
            <button
              onClick={back}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--cv-muted)] transition-colors hover:text-[var(--cv-ink)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          ) : (
            <span />
          )}
          <button
            onClick={next}
            disabled={answers[index] === undefined}
            className="inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition-transform enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", boxShadow: "0 8px 24px rgba(37,99,235,0.24)" }}
          >
            {index === TOTAL - 1 ? "See my score" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
