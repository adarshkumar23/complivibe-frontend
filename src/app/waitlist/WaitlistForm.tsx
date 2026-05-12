"use client";

import { useState } from "react";

const inputClass =
  "h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-[#555] focus:border-white/30 focus:outline-none transition-colors w-full";

export default function WaitlistForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [problem, setProblem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    // TODO: wire to POST /api/v1/waitlist
    console.log({ fullName, company, role });

    window.setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  }

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 text-center text-sm font-medium text-white">
        You&apos;re on the list. We&apos;ll reach out within 48 hours.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 text-left">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="waitlist-full-name" className="text-sm text-[#888]">
          Full Name
        </label>
        <input
          id="waitlist-full-name"
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="waitlist-email" className="text-sm text-[#888]">
          Work Email
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="waitlist-company" className="text-sm text-[#888]">
          Company Name
        </label>
        <input
          id="waitlist-company"
          type="text"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="waitlist-role" className="text-sm text-[#888]">
          Your Role
        </label>
        <input
          id="waitlist-role"
          type="text"
          required
          placeholder="e.g. CTO, Head of Legal, Compliance Officer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="waitlist-problem" className="text-sm text-[#888]">
          What compliance problem are you solving?
        </label>
        <textarea
          id="waitlist-problem"
          rows={4}
          required
          placeholder="e.g. We need to comply with EU AI Act before August 2026 deadline..."
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#555] focus:border-white/30 focus:outline-none transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 h-11 w-full rounded-xl bg-white text-sm font-semibold text-black transition-colors hover:bg-[#ededed] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Adding you to the list..." : "Join waitlist"}
      </button>
    </form>
  );
}
