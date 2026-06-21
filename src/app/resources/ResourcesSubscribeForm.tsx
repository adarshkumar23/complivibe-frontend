"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { submitWeb3Form } from "@/lib/submitWeb3Form";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ResourcesSubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
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
        name: "Resources subscriber",
        email: email.trim(),
        subject: "New resources subscriber",
        source: "website_resources",
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
      <p className="inline-flex items-center gap-2 text-sm font-medium text-[var(--cv-ink)]">
        <Check className="h-4 w-4 text-[#10b981]" strokeWidth={2.5} />
        You&apos;re subscribed. Watch your inbox.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="resources-email" className="sr-only">
        Email address
      </label>
      <input
        id="resources-email"
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        placeholder="you@company.com"
        className="h-11 flex-1 rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-4 text-sm text-[var(--cv-ink)] placeholder:text-[var(--cv-muted)] transition-colors focus:border-[#2563eb]/50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="h-11 shrink-0 rounded-full px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-70"
        style={{
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
          boxShadow: "0 8px 24px rgba(37,99,235,0.28)",
        }}
      >
        {status === "submitting" ? "Subscribing…" : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="w-full text-xs font-medium text-[#dc2626] dark:text-[#f87171] sm:absolute sm:mt-12">
          {msg}
        </p>
      )}
    </form>
  );
}
