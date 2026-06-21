"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MotionLink = motion(Link);
const MotionButton = motion.button;

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={cn("fixed inset-x-0 top-3 z-50 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, {
              visible,
            })
          : child,
      )}
    </div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <div
      style={{
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        width: visible ? "min(1000px, calc(100% - 2rem))" : "min(1600px, calc(100% - 2rem))",
        transform: visible ? "translateY(4px)" : "translateY(0px)",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden h-16 flex-row items-center justify-between rounded-full border px-7 transition-[width,transform,box-shadow,background-color,border-color] duration-300 ease-out lg:flex",
        // Liquid glass surface — light by default, refined dark variant
        "border-white/50 bg-white/70 dark:border-white/10 dark:bg-[#0b0f17]/70",
        visible
          ? "border-white/60 bg-white/80 dark:border-white/[0.14] dark:bg-[#0b0f17]/82 shadow-[0_14px_44px_rgba(15,23,42,0.14),0_0_22px_rgba(37,99,235,0.10),inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_14px_44px_rgba(0,0,0,0.5),0_0_22px_rgba(59,130,246,0.18),inset_0_1px_0_rgba(255,255,255,0.06)]"
          : "shadow-[0_8px_30px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center gap-8 text-sm font-semibold text-slate-600 dark:text-neutral-300 lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative rounded-full px-3 py-2 text-slate-600 transition hover:text-slate-900 dark:text-neutral-300 dark:hover:text-white"
          key={item.name}
          href={item.link}
        >
          {hovered === idx && (
            <div className="absolute inset-0 h-full w-full rounded-full bg-slate-900/[0.05] dark:bg-white/5" />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <div
      style={{
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        width: visible ? "min(92%, 560px)" : "calc(100% - 1rem)",
        transform: visible ? "translateY(4px)" : "translateY(0px)",
      }}
      className={cn(
        "relative z-50 mx-auto flex flex-col items-center justify-between rounded-full border px-4 py-3 transition-[width,transform,box-shadow,background-color,border-color] duration-300 ease-out lg:hidden",
        "border-white/50 bg-white/75 dark:border-white/10 dark:bg-[#0b0f17]/75",
        visible
          ? "shadow-[0_14px_44px_rgba(15,23,42,0.14),0_0_22px_rgba(37,99,235,0.10),inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_14px_44px_rgba(0,0,0,0.5),0_0_22px_rgba(59,130,246,0.18),inset_0_1px_0_rgba(255,255,255,0.06)]"
          : "shadow-[0_8px_30px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
  return (
    <div className={cn("flex w-full flex-row items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
      }}
      className={cn(
        "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-3xl border px-5 py-6",
        "border-white/50 bg-white/85 text-slate-700 shadow-[0_24px_60px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.6)]",
        "dark:border-white/10 dark:bg-[#0b0f17]/90 dark:text-neutral-300 dark:shadow-[0_24px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-900/[0.05] dark:text-white dark:hover:bg-white/5"
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <Link href="/" className="relative z-20 flex items-center gap-2.5 text-sm font-normal transition-opacity duration-200 hover:opacity-90">
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[13px] font-black tracking-tight text-white"
        style={{
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
          boxShadow: "0 6px 18px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
      >
        CV
      </span>
      <span className="text-base font-semibold text-slate-900 dark:text-white">
        Compli
        <span
          style={{
            background: "linear-gradient(135deg,#0070F3,#00C48C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Vibe
        </span>
      </span>
    </Link>
  );
};

export const NavbarButton = ({
  href,
  children,
  className,
  variant = "primary",
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  onClick?: () => void;
}) => {
  const baseStyles =
    "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full px-4 text-[13px] font-semibold transition duration-200";

  const variantStyles = {
    primary:
      "bg-[linear-gradient(135deg,#2563eb,#7c3aed)] text-white shadow-[0_6px_20px_rgba(37,99,235,0.28),inset_0_1px_0_rgba(255,255,255,0.3)] hover:brightness-110",
    secondary:
      "bg-transparent text-slate-600 shadow-none hover:bg-slate-900/[0.05] hover:text-slate-900 dark:text-neutral-300 dark:hover:bg-white/5 dark:hover:text-white",
    dark: "bg-slate-900 text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] dark:bg-white dark:text-slate-900",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0_2px_0_rgba(255,255,255,0.25)_inset]",
  };

  if (href) {
    return (
      <MotionLink
        href={href}
        onClick={onClick}
        className={cn(baseStyles, variantStyles[variant], className)}
        whileHover={variant === "primary" ? { scale: 1.02, filter: "brightness(1.1)" } : undefined}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <MotionButton
      type="button"
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], className)}
      whileHover={variant === "primary" ? { scale: 1.02, filter: "brightness(1.1)" } : undefined}
    >
      {children}
    </MotionButton>
  );
};
