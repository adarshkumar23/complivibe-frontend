"use client";

import { useState } from "react";

// TODO: wire to email service
export default function BookDemoForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    aiSystem: "",
    preferredTime: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Demo booking:", form);
  }

  const inputClass =
    "h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-[#555] focus:border-white/30 focus:outline-none transition-colors w-full";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="fullName" className="text-sm text-[#888]">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          value={form.fullName}
          onChange={handleChange}
          placeholder="Arjun Sharma"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm text-[#888]">Work Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="arjun@yourcompany.com"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="company" className="text-sm text-[#888]">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          required
          value={form.company}
          onChange={handleChange}
          placeholder="Acme AI Pvt. Ltd."
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="aiSystem" className="text-sm text-[#888]">Describe your AI system</label>
        <textarea
          id="aiSystem"
          name="aiSystem"
          rows={4}
          value={form.aiSystem}
          onChange={handleChange}
          placeholder="e.g. A machine learning model that screens job applications and ranks candidates based on CV text..."
          className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#555] focus:border-white/30 focus:outline-none transition-colors w-full resize-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="preferredTime" className="text-sm text-[#888]">Preferred time</label>
        <input
          id="preferredTime"
          name="preferredTime"
          type="text"
          value={form.preferredTime}
          onChange={handleChange}
          placeholder="e.g. Weekdays after 3pm IST"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="mt-2 h-11 w-full rounded-xl bg-white text-sm font-semibold text-black hover:bg-[#ededed] transition-colors"
      >
        Book my demo
      </button>
    </form>
  );
}
