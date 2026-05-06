"use client";

import { useState } from "react";
import Link from "next/link";

// TODO: wire to POST /api/v1/auth/login
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm text-[#888]">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-[#555] focus:border-white/30 focus:outline-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm text-[#888]">
            Password
          </label>
          <a href="#" className="text-xs text-[#555] hover:text-white transition-colors">
            Forgot password?
          </a>
        </div>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-[#555] focus:border-white/30 focus:outline-none transition-colors"
        />
      </div>

      <button
        type="submit"
        className="mt-2 h-11 w-full rounded-xl bg-white text-sm font-semibold text-black hover:bg-[#ededed] transition-colors"
      >
        Sign in
      </button>

      <p className="text-center text-sm text-[#555]">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-white hover:text-compliance-green transition-colors">
          Sign up →
        </Link>
      </p>
    </form>
  );
}
