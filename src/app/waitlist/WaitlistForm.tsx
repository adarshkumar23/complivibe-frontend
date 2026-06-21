"use client";

import { useState } from "react";
import { submitWeb3Form } from "@/lib/submitWeb3Form";

const CONTACT_EMAIL = "contact@complivibe.in";

const stageOptions = ["Startup", "Growth", "Enterprise", "Investor / Advisor", "Other"];
const interestOptions = [
  "AI Governance",
  "Compliance Automation",
  "Evidence Vault",
  "Data Observability",
  "Trust Center",
  "Not sure yet",
];

type FormState = {
  fullName: string;
  email: string;
  company: string;
  role: string;
  companyStage: string;
  interest: string;
  message: string;
};

const emptyForm: FormState = {
  fullName: "",
  email: "",
  company: "",
  role: "",
  companyStage: "",
  interest: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [botcheck, setBotcheck] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) next.email = "Work email is required.";
    else if (!EMAIL_RE.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (!form.company.trim()) next.company = "Company is required.";
    if (!form.role.trim()) next.role = "Role is required.";
    if (!form.companyStage) next.companyStage = "Select a company stage.";
    if (!form.interest) next.interest = "Select an interest.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (botcheck) return; // honeypot tripped — silently ignore bots
    if (!validate()) return;

    setStatus("submitting");
    setErrorMsg("");
    try {
      await submitWeb3Form({
        name: form.fullName,
        email: form.email,
        company: form.company,
        role: form.role,
        company_stage: form.companyStage,
        interest: form.interest,
        message: form.message,
        subject: "New CompliVibe waitlist signup",
        source: "website_waitlist",
        botcheck: "",
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : `Something went wrong. Please try again or email ${CONTACT_EMAIL}.`,
      );
    }
  }

  if (status === "success") {
    return (
      <div className="w-full rounded-xl border border-[#10b981]/30 bg-[#10b981]/[0.08] p-5 text-center text-sm font-medium text-[var(--cv-ink)]">
        You&apos;re on the waitlist. We&apos;ll reach out when early access opens.
      </div>
    );
  }

  const inputClass =
    "h-11 w-full rounded-xl border border-[var(--cv-border)] bg-[var(--cv-surface)] px-4 text-sm text-[var(--cv-ink)] placeholder:text-[var(--cv-muted)] transition-colors focus:border-[#2563eb]/50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/15";
  const labelClass = "text-sm font-medium text-[var(--cv-ink)]";
  const errorClass = "text-xs font-medium text-[#dc2626] dark:text-[#f87171]";
  const req = <span className="text-[#dc2626] dark:text-[#f87171]">*</span>;
  const fieldError = (k: keyof FormState) =>
    errors[k] ? <span className={errorClass}>{errors[k]}</span> : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-4 text-left">
      {/* Honeypot — hidden from humans, bots tend to fill it */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        value={botcheck}
        onChange={(e) => setBotcheck(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="wl-fullName" className={labelClass}>Full name {req}</label>
        <input id="wl-fullName" name="fullName" type="text" value={form.fullName} onChange={handleChange} aria-invalid={!!errors.fullName} placeholder="Arjun Sharma" className={inputClass} />
        {fieldError("fullName")}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="wl-email" className={labelClass}>Work email {req}</label>
        <input id="wl-email" name="email" type="email" value={form.email} onChange={handleChange} aria-invalid={!!errors.email} placeholder="arjun@yourcompany.com" className={inputClass} />
        {fieldError("email")}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="wl-company" className={labelClass}>Company {req}</label>
        <input id="wl-company" name="company" type="text" value={form.company} onChange={handleChange} aria-invalid={!!errors.company} placeholder="Acme AI Pvt. Ltd." className={inputClass} />
        {fieldError("company")}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="wl-role" className={labelClass}>Role {req}</label>
          <input id="wl-role" name="role" type="text" value={form.role} onChange={handleChange} aria-invalid={!!errors.role} placeholder="e.g. CTO, Head of GRC" className={inputClass} />
          {fieldError("role")}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="wl-stage" className={labelClass}>Company stage {req}</label>
          <select id="wl-stage" name="companyStage" value={form.companyStage} onChange={handleChange} aria-invalid={!!errors.companyStage} className={`${inputClass} cursor-pointer`}>
            <option value="">Select…</option>
            {stageOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          {fieldError("companyStage")}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="wl-interest" className={labelClass}>Interest {req}</label>
        <select id="wl-interest" name="interest" value={form.interest} onChange={handleChange} aria-invalid={!!errors.interest} className={`${inputClass} cursor-pointer`}>
          <option value="">Select…</option>
          {interestOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {fieldError("interest")}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="wl-message" className={labelClass}>Message <span className="font-normal text-[var(--cv-muted)]">(optional)</span></label>
        <textarea id="wl-message" name="message" rows={3} value={form.message} onChange={handleChange} placeholder="Anything you'd like us to know…" className="w-full resize-none rounded-xl border border-[var(--cv-border)] bg-[var(--cv-surface)] px-4 py-3 text-sm text-[var(--cv-ink)] placeholder:text-[var(--cv-muted)] transition-colors focus:border-[#2563eb]/50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/15" />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-[#dc2626]/30 bg-[#dc2626]/[0.08] px-4 py-3 text-sm text-[#dc2626] dark:text-[#f87171]">
          {errorMsg || `Something went wrong. Please try again or email ${CONTACT_EMAIL}.`}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 h-11 w-full rounded-full text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
        style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", boxShadow: "0 8px 24px rgba(37,99,235,0.28)" }}
      >
        {status === "submitting" ? "Joining…" : "Join waitlist"}
      </button>
    </form>
  );
}
