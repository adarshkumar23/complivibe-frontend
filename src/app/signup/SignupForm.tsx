"use client";

import { useState } from "react";
import Link from "next/link";

// TODO: wire to POST /api/v1/auth/register
export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Signup attempt:", { fullName, email, company, password });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="fullName" className="text-sm text-[#888]">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Arjun Sharma"
          className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-[#555] focus:border-white/30 focus:outline-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm text-[#888]">
          Work Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="arjun@yourcompany.com"
          className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-[#555] focus:border-white/30 focus:outline-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="company" className="text-sm text-[#888]">
          Company Name
        </label>
        <input
          id="company"
          type="text"
          autoComplete="organization"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Acme Technologies Pvt. Ltd."
          className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-[#555] focus:border-white/30 focus:outline-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm text-[#888]">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min. 8 characters"
          className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-[#555] focus:border-white/30 focus:outline-none transition-colors"
        />
      </div>

      <button
        type="submit"
        className="mt-2 h-11 w-full rounded-xl bg-white text-sm font-semibold text-black hover:bg-[#ededed] transition-colors"
      >
        Create account
      </button>

      <p className="text-center text-[11px] text-[#444] leading-relaxed">
        By signing up you agree to our{" "}
        <Link href="/legal/terms" className="text-[#666] hover:text-white underline transition-colors">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/legal/privacy-policy" className="text-[#666] hover:text-white underline transition-colors">
          Privacy Policy
        </Link>
      </p>

      <p className="text-center text-sm text-[#555]">
        Already have an account?{" "}
        <Link href="/login" className="text-white hover:text-compliance-green transition-colors">
          Sign in →
        </Link>
      </p>
    </form>
  );
}
