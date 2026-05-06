"use client";

import { useState } from "react";

// TODO: wire to email service
export default function ResourcesSubscribeForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Subscribe:", email);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="text-compliance-green font-medium text-sm">
        ✓ You&apos;re subscribed. Regulatory updates within 48 hours.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="flex-1 h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-[#555] focus:border-white/30 focus:outline-none transition-colors"
      />
      <button
        type="submit"
        className="h-11 rounded-xl bg-white px-5 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors shrink-0"
      >
        Subscribe
      </button>
    </form>
  );
}
