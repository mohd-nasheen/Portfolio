"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { resolvedTheme, cycleTheme } = useTheme();

  const Icon = resolvedTheme === "dark" ? Moon : Sun;
  const label = `Theme: ${resolvedTheme}. Click to toggle.`;

  return (
    <div className="fixed right-4 top-20 z-[55] sm:right-6 sm:top-24">
      <motion.button
        type="button"
        onClick={cycleTheme}
        aria-label={label}
        className="glass group relative inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-[0_14px_50px_-26px_rgba(92,115,201,0.65)]"
        whileTap={{ scale: 0.95 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      >
        <span className="absolute inset-[1px] rounded-full border border-white/15 opacity-70" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={resolvedTheme}
            initial={{ opacity: 0, rotate: -28, scale: 0.84 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 28, scale: 0.84 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-[var(--text-secondary)]"
          >
            <Icon className="h-4 w-4" />
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
