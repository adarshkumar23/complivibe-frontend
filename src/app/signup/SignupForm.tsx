"use client";

import Link from "next/link";

import WaitlistForm from "../waitlist/WaitlistForm";

export default function SignupForm() {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center text-white">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold">New registrations are currently closed.</p>
        <p className="text-sm text-[#888]">To get early access, join our waitlist.</p>
      </div>

      <WaitlistForm />

      <Link href="/book-demo" className="text-sm text-[#888] transition-colors hover:text-white">
        Need a demo instead? Book here →
      </Link>
    </div>
  );
}
