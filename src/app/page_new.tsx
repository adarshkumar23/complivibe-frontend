import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Code2,
  CloudLightning,
  Globe2,
  Gauge,
  Lock,
  Rocket,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
  Shield,
} from "lucide-react";

const featureGroups = [
  {
    title: "Git-connected deploys",
    eyebrow: "Ship from your repo",
    description:
      "From localhost to https, in seconds. Deploy from Git or your CLI.",
    accent: "from-white/10 to-transparent",
    icon: Rocket,
    stats: ["Instant previews", "Atomic rollbacks", "Zero config"],
  },
  {
    title: "Collaborative pre-production",
    eyebrow: "Review in context",
    description:
      "Chat with your team on real, production-grade UI, not just designs.",
    accent: "from-sky-500/20 to-transparent",
    icon: Sparkles,
    stats: ["Team feedback", "Visual diffs", "Shared state"],
  },
  {
    title: "Frontend observability",
    eyebrow: "Measure what matters",
    description:
      "See views, clicks, and conversion changes without adding heavy analytics.",
    accent: "from-emerald-500/20 to-transparent",
    icon: Gauge,
    stats: ["Privacy-friendly", "Realtime metrics", "Low overhead"],
  },
  {
    title: "Conformance at scale",
    eyebrow: "Keep velocity high",
    description:
      "Use code owners, checks, and quality gates to ship fast without regressions.",
    accent: "from-orange-500/20 to-transparent",
    icon: ShieldCheck,
    stats: ["Owner rules", "Quality scores", "Monorepo ready"],
  },
] as const;

const solutionCards = [
  { label: "AI", description: "Quickstart templates for AI apps" },
  { label: "Apps", description: "Full-stack application deployment" },
  { label: "Marketing", description: "Content and marketing sites" },
  { label: "E-commerce", description: "High-performance stores" },
] as const;

const platformCards = [
  {
    title: "Deploy automatically",
    copy: "from git or with our CLI",
    icon: Terminal,
  },
  {
    title: "Wide framework support",
    copy: "Next.js, React, Astro, Svelte, Nuxt, Python",
    icon: Code2,
  },
  {
    title: "Previews for every push",
    copy: "Share links instantly with your team",
    icon: CloudLightning,
  },
  {
    title: "Automatic HTTPS",
    copy: "secure every domain by default",
    icon: Lock,
  },
] as const;

const infrastructureFeatures = [
  { label: "Reliability", value: "99.99% uptime", icon: Shield },
  { label: "Performance", value: "100+ edge locations", icon: Zap },
  { label: "Security", value: "DDoS mitigation", icon: ShieldCheck },
  { label: "Compute", value: "Optimized for all workloads", icon: Globe2 },
] as const;

const templateCards = [
  { label: "Next.js Templates", tone: "from-zinc-900 to-black" },
  { label: "React Templates", tone: "from-cyan-950 to-zinc-950" },
  { label: "Astro Templates", tone: "from-fuchsia-950 to-black" },
  { label: "Svelte Templates", tone: "from-orange-950 to-black" },
  { label: "Nuxt Templates", tone: "from-emerald-950 to-black" },
  { label: "Python Templates", tone: "from-stone-950 to-black" },
] as const;

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.24em] text-white/55">
        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
        {eyebrow}
      </div>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-7 text-white/55 md:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.10),transparent_28%),linear-gradient(to_bottom,#050505,#000_30%,#030303_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px] opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent_85%)]" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-6">
          <div className="flex items-center gap-8">
            <Link href="#top" className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-bold">
                V
              </div>
              VERCEL
            </Link>
            <nav className="hidden items-center gap-6 text-sm text-white/60 lg:flex">
              <Link href="#products" className="transition hover:text-white">Products</Link>
              <Link href="#solutions" className="transition hover:text-white">Solutions</Link>
              <Link href="#infrastructure" className="transition hover:text-white">Infrastructure</Link>
              <Link href="#docs" className="transition hover:text-white">Templates</Link>
              <Link href="#pricing" className="transition hover:text-white">Pricing</Link>
            </nav>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Link href="#contact" className="hidden text-white/55 transition hover:text-white sm:inline-flex">Contact</Link>
            <Link href="#login" className="inline-flex h-9 items-center rounded-md border border-white/15 bg-white/5 px-4 text-white/90 transition hover:bg-white/10">
              Log In
            </Link>
            <Link href="#start" className="inline-flex h-9 items-center rounded-md bg-white px-4 font-medium text-black transition hover:bg-white/90">
              Start Deploying
            </Link>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-[1440px] px-4 pb-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-x border-white/10">
          <div className="border-b border-white/10 px-4 py-4 sm:px-6 lg:px-12">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-sm text-white/65 backdrop-blur md:flex-row md:text-left">
              <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <span className="rounded-full bg-emerald-950 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400">New</span>
                <p>Vercel Ship on 5/23: Connect with your Frontend Cloud ecosystem in NYC or live online</p>
              </div>
              <Link href="#ship" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black px-4 py-2 text-white/90 transition hover:border-white/30 hover:bg-white/5">
                Join Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative border-b border-white/10 px-4 py-12 sm:px-6 lg:px-12 lg:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_58%)]" />
            <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-teal-950/70 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-teal-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400" /> Frontend Cloud
                </div>
                <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Vercel is the Frontend Cloud.
                  <span className="block text-white/55"> Build, scale, and secure a faster, personalized web.</span>
                </h1>
                <p className="max-w-2xl text-pretty text-lg leading-8 text-white/60 sm:text-xl">
                  The complete platform for developers to build and deploy modern web applications with speed and confidence.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="#start" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 font-medium text-black transition hover:bg-white/90">
                    Start Deploying <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="#demo" className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-black px-6 font-medium text-white/90 transition hover:border-white/30 hover:bg-white/5">
                    Get a Demo
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-xl">
                <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_35%,rgba(45,212,191,0.16),transparent_35%),radial-gradient(circle_at_50%_60%,rgba(14,165,233,0.16),transparent_30%)] blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/80 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_80px_rgba(0,0,0,0.55)]">
                  <div className="grid grid-cols-12 gap-1.5 opacity-80">
                    {Array.from({ length: 96 }).map((_, index) => (
                      <div key={index} className="h-10 rounded-sm border border-white/10 bg-white/[0.03]" />
                    ))}
                  </div>
                  <div className="absolute left-1/2 top-1/2 flex w-[68%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 rounded-[1.75rem] border border-white/15 bg-black/80 px-6 py-10 text-center shadow-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-black">
                      <Sparkles className="h-3.5 w-3.5" /> Ship faster
                    </div>
                    <p className="text-4xl font-semibold tracking-tight text-white">What will you ship?</p>
                    <p className="max-w-sm text-sm leading-6 text-white/55">
                      Build and deploy with the speed of a single click.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-0 border-b border-white/10 lg:grid-cols-3">
            <div className="border-b border-white/10 px-6 py-8 lg:border-b-0 lg:border-r">
              <div className="text-center text-3xl font-semibold text-white">Develop with your favorite tools</div>
              <div className="mt-3 flex justify-center text-white/50"><ChevronDown className="h-5 w-5" /></div>
            </div>
            <div className="border-b border-white/10 px-6 py-8 lg:border-b-0 lg:border-r">
              <div className="text-center text-3xl font-semibold text-white">Launch globally, instantly</div>
              <div className="mt-3 flex justify-center text-white/50"><Globe2 className="h-5 w-5" /></div>
            </div>
            <div className="px-6 py-8">
              <div className="text-center text-3xl font-semibold text-white">Keep pushing</div>
              <div className="mt-3 flex justify-center text-white/50"><ArrowRight className="h-5 w-5" /></div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="border-x border-b border-white/10 px-4 py-16 sm:px-6 lg:px-12">
          <SectionTitle
            eyebrow="Solutions"
            title="The web's best experiences"
            description="Build solutions faster with Vercel's pre-built templates and optimized infrastructure for every use case."
          />
          
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {solutionCards.map((solution) => (
              <article key={solution.label} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6 transition hover:bg-white/[0.08]">
                <div className="mb-4 h-32 rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/5" />
                <h3 className="text-xl font-semibold text-white">{solution.label}</h3>
                <p className="mt-2 text-sm text-white/60">{solution.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/70 group-hover:text-white transition">
                  Explore <ArrowRight className="h-4 w-4" />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Platform Features */}
        <section id="products" className="border-x border-b border-white/10 px-4 py-16 sm:px-6 lg:px-12">
          <SectionTitle
            eyebrow="Platform"
            title="Everything you need to ship the web"
            description="A complete platform with all the tools developers need to build, deploy, and iterate on ideas."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {featureGroups.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 transition duration-500 group-hover:opacity-100`} />
                  <div className="relative flex h-full flex-col gap-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/70 text-white/85">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs uppercase tracking-[0.24em] text-white/35">{feature.eyebrow}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">{feature.description}</p>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {feature.stats.map((stat) => (
                        <span key={stat} className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs text-white/60">
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="border-x border-b border-white/10 px-4 py-16 sm:px-6 lg:px-12">
          <SectionTitle
            eyebrow="How it works"
            title="From deploys to observability"
            description="Git-connected deployments, collaborative workflows, and built-in observability for modern teams."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {platformCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.05]">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/60 text-white/80">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">{card.copy}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Infrastructure */}
        <section id="infrastructure" className="border-x border-b border-white/10 px-4 py-16 sm:px-6 lg:px-12">
          <SectionTitle
            eyebrow="Infrastructure"
            title="Deploy once, deliver everywhere"
            description="Global edge network with 100+ data centers for optimal performance, reliability, and security."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {infrastructureFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.label} className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.05]">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/60 text-white/80">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.24em] text-white/35">{feature.label}</p>
                  <p className="mt-3 text-lg font-semibold text-white">{feature.value}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Templates */}
        <section id="docs" className="border-x border-b border-white/10 px-4 py-16 sm:px-6 lg:px-12">
          <SectionTitle
            eyebrow="Templates"
            title="Your framework, your way"
            description="Deploy with your favorite framework. Choose from our collection of ready-to-deploy templates."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {templateCards.map((card) => (
              <article key={card.label} className={`group overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${card.tone} p-6 transition hover:border-white/20`}>
                <div className="flex h-32 items-center justify-center rounded-[1.35rem] border border-white/10 bg-white/5 font-semibold text-white/50" />
                <div className="mt-5 flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">{card.label}</h3>
                  <ArrowRight className="h-4 w-4 text-white/55 transition group-hover:translate-x-1 group-hover:text-white" />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section id="pricing" className="border-x border-b border-white/10 px-4 py-16 sm:px-6 lg:px-12">
          <div className="grid gap-4 overflow-hidden rounded-[2rem] border border-white/10 lg:grid-cols-2">
            <div className="bg-white/[0.03] p-8 lg:p-10">
              <p className="text-xs uppercase tracking-[0.24em] text-white/35">Ready to deploy?</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Start building with a free account.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/60 md:text-lg">
                Deploy your first project in minutes. Scale to millions of users with our global infrastructure and enterprise support.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#start" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 font-medium text-black transition hover:bg-white/90">
                  Start Deploying
                </Link>
                <Link href="#contact" className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 font-medium text-white/85 transition hover:border-white/30 hover:bg-white/5">
                  Contact Sales
                </Link>
              </div>
            </div>
            <div className="bg-black p-8 lg:p-10">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 text-sm text-white/50">
                  <span>All systems normal.</span>
                  <span className="inline-flex items-center gap-2 text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-400" /> healthy</span>
                </div>
                <div className="mt-6 space-y-4 text-sm text-white/60">
                  <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3"><span>Deploy status</span><span className="text-emerald-400">Live</span></div>
                  <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3"><span>Uptime</span><span className="text-emerald-400">99.99%</span></div>
                  <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3"><span>Support</span><span>24/7</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-[1440px] border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-x border-white/10 bg-black/40 px-6 py-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-bold">V</div>
              VERCEL
            </div>
            <p className="max-w-sm text-sm leading-6 text-white/50">The complete platform for developing modern web applications. Build, ship, and scale with confidence.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-4">
            {[
              ["Product", ["DX Platform", "Next.js", "Infrastructure", "Analytics"]],
              ["Resources", ["Docs", "Pricing", "Customers", "Templates"]],
              ["Company", ["About", "Blog", "Careers", "Contact Us"]],
              ["Preferences", ["Systems", "Themes", "Legal", "Open Source"]],
            ].map(([title, items]) => (
              <div key={title as string} className="space-y-3">
                <h3 className="font-medium text-white/90">{title as string}</h3>
                <ul className="space-y-2 text-white/45">
                  {(items as string[]).map((item) => (
                    <li key={item}><Link href="#" className="transition hover:text-white">{item}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
