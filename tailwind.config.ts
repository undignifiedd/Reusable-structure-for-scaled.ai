import type { Config } from "tailwindcss";

/**
 * Section 3 of the shared-structure spec — semantic tokens only.
 * Every color is a CSS variable defined in src/index.css, so a property
 * re-skins by editing --accent / --sidebar there, not by touching components.
 */
const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  // State hues are applied dynamically (bg-${hue}/25, text-${hue}), so the
  // scanner can't see them in source — safelist the combinations we use.
  safelist: [
    ...["red", "amber", "blue", "green", "violet", "teal"].flatMap((h) => [
      `bg-${h}`,
      `text-${h}`,
      `bg-${h}/5`,
      `bg-${h}/10`,
      `bg-${h}/25`,
    ]),
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        ink: "hsl(var(--ink) / <alpha-value>)",
        card: "hsl(var(--card) / <alpha-value>)",
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-foreground) / <alpha-value>)",
        },
        // state hues — icon chips, stat tiles, status pills
        red: "hsl(var(--st-red) / <alpha-value>)",
        amber: "hsl(var(--st-amber) / <alpha-value>)",
        blue: "hsl(var(--st-blue) / <alpha-value>)",
        green: "hsl(var(--st-green) / <alpha-value>)",
        violet: "hsl(var(--st-violet) / <alpha-value>)",
        teal: "hsl(var(--st-teal) / <alpha-value>)",
      },
      borderRadius: {
        "3xl": "1.5rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
