"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "qubixcore-theme";

type ThemeMode = "light" | "dark";

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? (localStorage.getItem(THEME_KEY) as ThemeMode | null)
        : null;
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextMode: ThemeMode = saved ?? (prefersDark ? "dark" : "light");
    document.documentElement.dataset.theme = nextMode;
    setMode(nextMode);
  }, []);

  const toggleTheme = () => {
    const nextMode: ThemeMode = mode === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextMode;
    localStorage.setItem(THEME_KEY, nextMode);
    setMode(nextMode);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--panel)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:translate-y-[-1px]"
      aria-label="Toggle theme"
    >
      <span className="h-2 w-2 rounded-full bg-[color:var(--accent)] shadow-[0_0_12px_var(--glow)]" />
      {mode === "dark" ? "Dark" : "Light"}
    </button>
  );
}
