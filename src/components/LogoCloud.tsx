export default function LogoCloud() {
  const logos = [
    { name: "AWS", text: "AWS" },
    { name: "Google Cloud", text: "GOOGLE CLOUD" },
    { name: "Microsoft Azure", text: "AZURE" },
    { name: "Bhashini", text: "BHASHINI" },
    { name: "ISO 42001", text: "ISO 42001" },
    { name: "GDPR", text: "GDPR" },
    { name: "SOC 2", text: "SOC 2" },
    { name: "NIST", text: "NIST" },
  ];

  return (
    <section className="relative border-y border-white/[0.06] bg-[#050505]">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <p className="text-center text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-12">
          Trusted by compliance-conscious teams across India and Europe
        </p>

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-10 items-center justify-items-center">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center text-[#333] hover:text-[#555] transition-colors duration-300 cursor-default"
              title={logo.name}
            >
              <span className="text-sm font-mono font-bold tracking-[0.15em]">{logo.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
