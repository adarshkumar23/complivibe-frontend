"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const STORAGE_KEY = "cv-theme";

/**
 * ThemeToggle — light/dark switch for CompliVibe.
 *
 * - Default theme is light.
 * - Persists the user's choice in localStorage ("cv-theme").
 * - Toggles the `dark` class on <html> via document.documentElement.
 * - Hydration-safe: renders a stable placeholder until mounted, then syncs
 *   with the class the inline bootstrap script (in layout <head>) already set.
 *
 * Note: not wired into the navbar yet — that happens in a later step.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const root = document.documentElement;
    if (next === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* localStorage unavailable — ignore */
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={
        "inline-flex h-9 w-9 items-center justify-center rounded-full border transition " +
        "border-[var(--cv-border)] text-[var(--cv-muted)] hover:text-[var(--cv-ink)] " +
        "hover:bg-[var(--cv-surface)] focus-visible:outline-2 " +
        className
      }
    >
      {/* Avoid hydration mismatch: keep icon neutral until mounted */}
      {!mounted ? (
        <Sun className="h-4 w-4 opacity-60" aria-hidden />
      ) : isDark ? (
        <Sun className="h-4 w-4" aria-hidden />
      ) : (
        <Moon className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
