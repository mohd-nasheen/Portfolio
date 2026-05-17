"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type ThemePreference = Theme;

type ThemeContextValue = {
  preference: ThemePreference;
  resolvedTheme: Theme;
  cycleTheme: () => void;
};

const STORAGE_KEY = "theme-preference";
const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>("dark");
  const [resolvedTheme, setResolvedTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemePreference | "system" | null;
    const nextResolved =
      stored === "light" || stored === "dark" ? stored : getSystemTheme();
    const nextPreference: ThemePreference = nextResolved;
    setPreference(nextPreference);
    setResolvedTheme(nextResolved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-ready");
    root.setAttribute("data-theme", resolvedTheme);
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, preference);
  }, [preference]);

  const cycleTheme = () => {
    const nextPreference: ThemePreference = preference === "dark" ? "light" : "dark";
    const nextResolved = nextPreference;

    document.documentElement.classList.add("theme-transition");
    window.setTimeout(() => document.documentElement.classList.remove("theme-transition"), 520);

    setPreference(nextPreference);
    setResolvedTheme(nextResolved);
  };

  const value = useMemo(
    () => ({
      preference,
      resolvedTheme,
      cycleTheme
    }),
    [preference, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
