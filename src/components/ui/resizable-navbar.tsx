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
        backdropFilter: visible ? "blur(16px)" : "blur(0px)",
        boxShadow: visible
          ? "0 18px 44px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.08) inset"
          : "none",
        width: visible ? "min(1000px, calc(100% - 2rem))" : "min(1600px, calc(100% - 2rem))",
        transform: visible ? "translateY(4px)" : "translateY(0px)",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden h-16 flex-row items-center justify-between rounded-full border border-transparent bg-transparent px-7 transition-[width,transform,backdrop-filter,box-shadow,background-color,border-color] duration-300 ease-out lg:flex",
        visible && "border-white/10 bg-[#050505]/95",
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
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center gap-8 text-sm font-semibold text-neutral-300 lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative rounded-full px-3 py-2 text-neutral-300 transition hover:text-white"
          key={item.name}
          href={item.link}
        >
          {hovered === idx && (
            <div className="absolute inset-0 h-full w-full rounded-full bg-white/5" />
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
        backdropFilter: visible ? "blur(16px)" : "blur(8px)",
        boxShadow: visible ? "0 18px 44px rgba(0,0,0,0.42)" : "none",
        width: visible ? "min(92%, 560px)" : "calc(100% - 1rem)",
        transform: visible ? "translateY(4px)" : "translateY(0px)",
      }}
      className={cn(
        "relative z-50 mx-auto flex flex-col items-center justify-between rounded-full border border-white/10 bg-[#050505]/95 px-4 py-3 transition-[width,transform,backdrop-filter,box-shadow] duration-300 ease-out lg:hidden",
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
      className={cn(
        "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl border border-white/10 bg-[#050505] px-5 py-6 shadow-2xl",
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/5"
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <Link href="/" className="relative z-20 flex items-center gap-2.5 text-sm font-normal text-white transition-opacity duration-200 hover:opacity-90">
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[13px] font-black tracking-tight text-white"
        style={{
          background: "linear-gradient(135deg, #0070F3 0%, #7928CA 100%)",
          boxShadow: "0 0 16px rgba(0,112,243,0.3)",
        }}
      >
        CV
      </span>
      <span className="text-base font-semibold text-white">
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
    "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-bold transition duration-200";

  const variantStyles = {
    primary: "bg-[linear-gradient(135deg,#0070F3,#7928CA)] text-white shadow-[0_0_20px_rgba(0,112,243,0.25)] hover:brightness-110 hover:shadow-glow-blue",
    secondary: "bg-transparent !text-[#888] shadow-none hover:!text-white",
    dark: "bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
    gradient: "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0_2px_0_rgba(255,255,255,0.25)_inset]",
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
