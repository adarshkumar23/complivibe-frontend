import Link from "next/link";
import { Shield } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Governance OS", href: "/platform" },
    { label: "48-Hour Engine", href: "/platform#engine" },
    { label: "CI/CD Gate", href: "/platform#cicd" },
    { label: "Audit Trail", href: "/platform#audit" },
    { label: "Live Monitor", href: "/platform#monitor" },
  ],
  Resources: [
    { label: "Compliance Compass", href: "/resources" },
    { label: "Demo Videos", href: "/resources" },
    { label: "Customer Stories", href: "/resources" },
    { label: "Ebooks", href: "/resources" },
    { label: "Training & Events", href: "/resources" },
    { label: "Trust Week", href: "/resources" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Book a Demo", href: "/book-demo" },
    { label: "Blog", href: "/resources" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Cookie Policy", href: "/legal/cookies" },
    { label: "Security", href: "/security" },
    { label: "GDPR DPA", href: "/legal/dpa" },
  ],
};

const legalLinks = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Cookie Preferences", href: "#" },
  { label: "Security", href: "/security" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050505]">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2" aria-label="CompliVibe Home">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-compliance-green to-cv-blue">
                <Shield className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold tracking-tight text-white">CompliVibe</span>
            </Link>
            <p className="text-sm text-[#555] leading-relaxed max-w-[200px]">
              EU AI Act + India DPDP compliance platform. One platform. Zero blocked deals.
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-2 text-xs text-compliance-green">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-compliance-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-compliance-green" />
              </span>
              All compliance feeds live
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/complivibe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="text-[#555] hover:text-white transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 5.978 5.45-5.978zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/complivibe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[#555] hover:text-white transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/c/CompliVibe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-[#555] hover:text-white transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#555]">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#555] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-8 border-t border-white/[0.06] opacity-60">
          {["ISO 42001", "GDPR", "India DPDP", "SOC 2 Type II"].map((badge) => (
            <div key={badge} className="flex items-center gap-2 px-3 py-1.5 rounded border border-white/10 bg-white/5 text-xs text-[#888]">
              <Shield className="h-3 w-3" />
              {badge}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-white/[0.06]">
          <p className="text-xs text-[#444]">
            © {new Date().getFullYear()} CompliVibe Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {legalLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-[#444] hover:text-[#888] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
