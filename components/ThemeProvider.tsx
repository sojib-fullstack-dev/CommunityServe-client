"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

 type Theme = "light" | "dark";

type ThemeContextValue = {
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [resolvedTheme, setResolvedTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme: Theme = savedTheme === "dark" ? "dark" : "light";
    const frame = window.requestAnimationFrame(() => {
      setResolvedTheme(initialTheme);
      document.documentElement.classList.toggle("dark", initialTheme === "dark");
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const setTheme = (theme: Theme) => {
    setResolvedTheme(theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider value={{ resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
