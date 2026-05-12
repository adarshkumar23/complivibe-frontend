"use client";

import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export default function CardDemo() {
  return (
    <Card>
      <CardSkeletonContainer className="h-[280px]">
        <Skeleton />
      </CardSkeletonContainer>
      <CardTitle>In-house highly intelligent compliance AI</CardTitle>
      <CardDescription>
        CompliVibe&apos;s AI engine maps your systems across EU AI Act, India DPDP, GDPR, ISO 42001, SOC 2,
        NIST, FedRAMP and more — automatically, in real time, with zero legal team dependency.
      </CardDescription>
    </Card>
  );
}

const Skeleton = () => {
  const innerFrameworks = [
    { name: "EU AI Act", top: "15%", left: "50%" },
    { name: "GDPR", top: "50%", left: "85%" },
    { name: "DPDP", top: "85%", left: "50%" },
    { name: "ISO 42001", top: "50%", left: "15%" },
  ];
  const outerFrameworks = [
    { name: "SOC 2", top: "20%", left: "20%" },
    { name: "NIST", top: "20%", left: "80%" },
    { name: "FedRAMP", top: "80%", left: "80%" },
    { name: "HIPAA", top: "80%", left: "20%" },
  ];

  return (
    <div className="relative h-[280px] w-full overflow-hidden">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
        <line x1="50" y1="50" x2="50" y2="15" stroke="rgba(0,196,140,0.15)" strokeWidth="1" />
        <line x1="50" y1="50" x2="85" y2="50" stroke="rgba(0,196,140,0.15)" strokeWidth="1" />
        <line x1="50" y1="50" x2="50" y2="85" stroke="rgba(0,196,140,0.15)" strokeWidth="1" />
        <line x1="50" y1="50" x2="15" y2="50" stroke="rgba(0,196,140,0.15)" strokeWidth="1" />
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(0,196,140,0.4)]"
        animate={{ scale: [1, 3], opacity: [0.3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />

      <div className="absolute inset-0">
        <Sparkles />
      </div>

      <motion.div
        className="absolute left-1/2 top-1/2 z-30 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[20px] font-bold text-black shadow-[0px_0px_30px_8px_rgba(0,196,140,0.4)]"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        CV
      </motion.div>

      {innerFrameworks.map((framework, index) => (
        <motion.div
          key={framework.name}
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ top: framework.top, left: framework.left }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.18 }}
        >
          <Container className="!h-14 !w-14 border border-white/20 bg-[rgba(40,40,40,0.9)] px-1 text-center text-[8px] font-bold uppercase leading-tight tracking-wider text-white shadow-[0_0_18px_rgba(0,196,140,0.12)_inset]">
            {framework.name}
          </Container>
        </motion.div>
      ))}

      {outerFrameworks.map((framework, index) => (
        <motion.div
          key={framework.name}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ top: framework.top, left: framework.left }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.28 }}
        >
          <Container className="!h-12 !w-12 border border-white/10 bg-[rgba(40,40,40,0.9)] px-1 text-center text-[7px] font-bold uppercase leading-tight tracking-wider text-white shadow-[0_0_16px_rgba(255,255,255,0.06)_inset]">
            {framework.name}
          </Container>
        </motion.div>
      ))}
    </div>
  );
};

const Sparkles = () => {
  const particles = [
    { top: "12%", left: "20%", delay: 0.1 },
    { top: "28%", left: "72%", delay: 0.4 },
    { top: "42%", left: "36%", delay: 0.7 },
    { top: "58%", left: "84%", delay: 1 },
    { top: "76%", left: "16%", delay: 1.3 },
    { top: "8%", left: "58%", delay: 1.6 },
    { top: "64%", left: "52%", delay: 1.9 },
    { top: "86%", left: "68%", delay: 2.2 },
    { top: "34%", left: "8%", delay: 2.5 },
    { top: "50%", left: "94%", delay: 2.8 },
    { top: "70%", left: "30%", delay: 3.1 },
    { top: "18%", left: "44%", delay: 3.4 },
  ];

  return (
    <div className="absolute inset-0">
      {particles.map((particle, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: particle.delay }}
          style={{
            position: "absolute",
            top: particle.top,
            left: particle.left,
            width: "2px",
            height: "2px",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-white"
        />
      ))}
    </div>
  );
};

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-sm rounded-[2rem] border border-white/[0.08] bg-black p-4 shadow-2xl shadow-cyan-500/[0.08]",
        className,
      )}
    >
      {children}
    </div>
  );
};

const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <h3 className={cn("mt-4 text-lg font-semibold tracking-tight text-white", className)}>{children}</h3>;
};

const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <p className={cn("mt-2 text-sm leading-relaxed text-white/50", className)}>{children}</p>;
};

const CardSkeletonContainer = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative flex h-48 w-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]",
        className,
      )}
    >
      {children}
    </div>
  );
};

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative z-20 flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] shadow-[0_0_24px_rgba(255,255,255,0.08)_inset]",
        className,
      )}
    >
      {children}
    </div>
  );
};
