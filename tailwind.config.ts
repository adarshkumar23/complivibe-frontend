import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vercel design tokens (keep)
        "v-bg": "#000000",
        "v-bg-1": "#0A0A0A",
        "v-bg-2": "#111111",
        "v-bg-3": "#1a1a1a",
        "v-fg": "#FFFFFF",
        "v-fg-1": "#ededed",
        "v-fg-2": "#a0a0a0",
        "v-fg-3": "#666666",
        "v-border": "rgba(255,255,255,0.1)",
        "v-border-2": "rgba(255,255,255,0.06)",
        "v-blue": "#0070F3",
        "v-blue-dark": "#0060D1",
        "v-success": "#50E3C2",
        "v-error": "#E00",
        "v-warning": "#F5A623",
        "v-accents-1": "#111",
        "v-accents-2": "#333",
        "v-accents-3": "#444",
        "v-accents-4": "#666",
        "v-accents-5": "#888",
        "v-accents-6": "#999",
        "v-accents-7": "#eaeaea",
        "v-accents-8": "#fafafa",
        // CompliVibe tokens
        urgency: "#FF3B3B",
        "compliance-green": "#00C48C",
        "india-orange": "#FF6B35",
        "cv-blue": "#0070F3",
        "cv-purple": "#7928CA",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem,5vw,5rem)", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "700" }],
        "display-lg": ["clamp(2rem,4vw,3.75rem)", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "700" }],
        "display-md": ["clamp(1.5rem,3vw,2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.03em", fontWeight: "600" }],
        "display-sm": ["clamp(1.25rem,2.5vw,1.875rem)", { lineHeight: "1.3", letterSpacing: "-0.02em", fontWeight: "600" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "radial-gradient(ellipse 80% 50% at 50% -20%,rgba(120,119,198,0.3),hsla(0,0%,100%,0))",
        "beam-gradient": "linear-gradient(180deg,transparent,rgba(255,255,255,.1) 50%,transparent)",
        "grid-fine":
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 30px), repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 30px)",
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,112,243,0.18) 0%, rgba(121,40,202,0.08) 50%, transparent 70%)",
      },
      boxShadow: {
        "glow-blue": "0 0 20px rgba(0,112,243,0.3), 0 0 60px rgba(0,112,243,0.10)",
        "glow-green": "0 0 20px rgba(0,196,140,0.3), 0 0 60px rgba(0,196,140,0.10)",
        "card-lifted": "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        beam: "beam 2s linear infinite",
        "countdown-pulse": "countdown-pulse 2s ease-in-out infinite",
        "ticker-scroll": "ticker-scroll 30s linear infinite",
        spotlight: "spotlight 2s ease 0.75s 1 forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "animate-shimmer": "shimmer 4s linear infinite",
        "animate-float": "float 8s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "slide-up": { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        beam: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(400%)" } },
        "countdown-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255,59,59,0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(255,59,59,0)" },
        },
        "ticker-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%, -40%) scale(1)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(0,196,140,0)" },
          "50%": { boxShadow: "0 0 30px 6px rgba(0,196,140,0.15)" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
