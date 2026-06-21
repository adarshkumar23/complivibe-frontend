"use client";

import { useState } from "react";
import { submitWeb3Form } from "@/lib/submitWeb3Form";

const CONTACT_EMAIL = "contact@complivibe.in";

const companySizeOptions = ["1–10", "11–50", "51–200", "201–1000", "1000+"];
const interestOptions = [
  "AI Governance",
  "Compliance Automation",
  "Evidence Vault",
  "Data Observability",
  "Trust Center",
  "Pricing",
  "Not sure yet",
];
const timeOptions = ["This week", "Next week", "Flexible"];

type FormState = {
  fullName: string;
  email: string;
  company: string;
  role: string;
  companySize: string;
  primaryInterest: string;
  preferredTime: string;
  message: string;
};

const emptyForm: FormState = {
  fullName: "",
  email: "",
  company: "",
  role: "",
  companySize: "",
  primaryInterest: "",
  preferredTime: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookDemoForm() {
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
    if (!form.companySize) next.companySize = "Select a company size.";
    if (!form.primaryInterest) next.primaryInterest = "Select a primary interest.";
    if (!form.preferredTime) next.preferredTime = "Select a preferred time.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (botcheck) return; // honeypot tripped
    if (!validate()) return;

    setStatus("submitting");
    setErrorMsg("");
    try {
      await submitWeb3Form({
        name: form.fullName,
        email: form.email,
        company: form.company,
        role: form.role,
        company_size: form.companySize,
        primary_interest: form.primaryInterest,
        preferred_time: form.preferredTime,
        message: form.message,
        subject: "New CompliVibe demo request",
        source: "website_book_demo",
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
      <div className="rounded-xl border border-[#10b981]/30 bg-[#10b981]/[0.08] p-5 text-center">
        <p className="text-sm font-semibold text-[var(--cv-ink)]">
          Demo request sent. We&apos;ll get back to you shortly.
        </p>
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
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Honeypot */}
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
        <label htmlFor="bd-fullName" className={labelClass}>Full name {req}</label>
        <input id="bd-fullName" name="fullName" type="text" value={form.fullName} onChange={handleChange} aria-invalid={!!errors.fullName} placeholder="Arjun Sharma" className={inputClass} />
        {fieldError("fullName")}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="bd-email" className={labelClass}>Work email {req}</label>
        <input id="bd-email" name="email" type="email" value={form.email} onChange={handleChange} aria-invalid={!!errors.email} placeholder="arjun@yourcompany.com" className={inputClass} />
        {fieldError("email")}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="bd-company" className={labelClass}>Company {req}</label>
        <input id="bd-company" name="company" type="text" value={form.company} onChange={handleChange} aria-invalid={!!errors.company} placeholder="Acme AI Pvt. Ltd." className={inputClass} />
        {fieldError("company")}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bd-role" className={labelClass}>Role {req}</label>
          <input id="bd-role" name="role" type="text" value={form.role} onChange={handleChange} aria-invalid={!!errors.role} placeholder="e.g. CTO, Head of GRC" className={inputClass} />
          {fieldError("role")}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bd-size" className={labelClass}>Company size {req}</label>
          <select id="bd-size" name="companySize" value={form.companySize} onChange={handleChange} aria-invalid={!!errors.companySize} className={`${inputClass} cursor-pointer`}>
            <option value="">Select…</option>
            {companySizeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          {fieldError("companySize")}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bd-interest" className={labelClass}>Primary interest {req}</label>
          <select id="bd-interest" name="primaryInterest" value={form.primaryInterest} onChange={handleChange} aria-invalid={!!errors.primaryInterest} className={`${inputClass} cursor-pointer`}>
            <option value="">Select…</option>
            {interestOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          {fieldError("primaryInterest")}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bd-time" className={labelClass}>Preferred time {req}</label>
          <select id="bd-time" name="preferredTime" value={form.preferredTime} onChange={handleChange} aria-invalid={!!errors.preferredTime} className={`${inputClass} cursor-pointer`}>
            <option value="">Select…</option>
            {timeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          {fieldError("preferredTime")}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="bd-message" className={labelClass}>Message <span className="font-normal text-[var(--cv-muted)]">(optional)</span></label>
        <textarea id="bd-message" name="message" rows={3} value={form.message} onChange={handleChange} placeholder="Anything you'd like us to cover in the walkthrough…" className="w-full resize-none rounded-xl border border-[var(--cv-border)] bg-[var(--cv-surface)] px-4 py-3 text-sm text-[var(--cv-ink)] placeholder:text-[var(--cv-muted)] transition-colors focus:border-[#2563eb]/50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/15" />
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
        {status === "submitting" ? "Sending…" : "Request demo"}
      </button>
    </form>
  );
}
