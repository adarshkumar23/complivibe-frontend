"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Boxes } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageBentoCard, { bentoContainer } from "@/components/PageBentoCard";
import PageCTA from "@/components/PageCTA";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedFrameworksFor } from "@/lib/seo";
import { solutions } from "@/components/solutions-data";

export default function SolutionTemplate({ slug }: { slug: string }) {
  const data = solutions[slug];
  if (!data) return null;
  const Icon = data.icon;

  return (
    <>
      <PageHero
        kicker="Solution"
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Start Trust Scan", href: "/score" }}
      >
        <div className="liquid-card glass-highlight flex items-center gap-4 p-6 md:p-8">
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border"
            style={{ backgroundColor: `${data.accent}14`, borderColor: `${data.accent}33` }}
          >
            <Icon className="h-7 w-7" style={{ color: data.accent }} />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--cv-muted)]">
              Built for
            </p>
            <p className="mt-1 text-lg font-bold capitalize tracking-tight text-[var(--cv-ink)]">
              {data.audience}
            </p>
          </div>
          <div className="ml-auto hidden items-center gap-2 rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-3 py-1.5 sm:inline-flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#10b981]" />
            <span className="text-[11px] text-[var(--cv-muted)]">One operating layer</span>
          </div>
        </div>
      </PageHero>

      {/* Struggles */}
      <PageSection kicker="The Challenge" title="What this team struggles with">
        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
          variants={bentoContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {data.struggles.map((s) => (
            <PageBentoCard key={s.title} icon={AlertTriangle} accent="#f59e0b" title={s.title} body={s.desc} />
          ))}
        </motion.div>
      </PageSection>

      {/* How CompliVibe helps */}
      <PageSection kicker="The Solution" title="How CompliVibe helps" aurora>
        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
          variants={bentoContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {data.helps.map((h) => (
            <PageBentoCard key={h.title} icon={CheckCircle2} accent={data.accent} title={h.title} body={h.desc} />
          ))}
        </motion.div>
      </PageSection>

      {/* Trust workflow */}
      <PageSection kicker="Trust Workflow" title="One continuous trust loop">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3">
          {data.workflow.map((step, i) => (
            <motion.div
              key={step}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <span className="liquid-card glass-highlight inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[var(--cv-ink)]">
                <span className="font-mono text-[11px]" style={{ color: data.accent }}>
                  0{i + 1}
                </span>
                {step}
              </span>
              {i < data.workflow.length - 1 && <span className="text-[var(--cv-muted)]">→</span>}
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* Platform modules */}
      <PageSection kicker="Connected Platform" title="Platform modules used" aurora>
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2.5">
          {data.modules.map((m) => (
            <span
              key={m}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-4 py-2 text-sm font-medium text-[var(--cv-muted)] backdrop-blur-sm"
            >
              <Boxes className="h-3.5 w-3.5" style={{ color: data.accent }} />
              {m}
            </span>
          ))}
        </div>
      </PageSection>

      <RelatedLinks
        kicker="Frameworks"
        title="Frameworks that matter here"
        subtitle={`Obligations ${data.audience} most often need to map, evidence, and report on.`}
        links={relatedFrameworksFor(slug)}
      />

      <PageCTA
        title={data.ctaTitle}
        subtitle={data.ctaSubtitle}
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Start Trust Scan", href: "/score" }}
      />
    </>
  );
}
