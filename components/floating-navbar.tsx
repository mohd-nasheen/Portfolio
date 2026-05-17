"use client";

import { Home, UserRound, BriefcaseBusiness, Mail } from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { type ComponentType, useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import Image from "next/image";

type NavItem = {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: UserRound },
  { id: "work", label: "Work", icon: BriefcaseBusiness },
  { id: "contact", label: "Contact", icon: Mail }
];

export function FloatingNavbar() {
  const [active, setActive] = useState("home");
  const [mounted, setMounted] = useState(false);
  const clickLockUntilRef = useRef(0);
  const clickTargetRef = useRef<string | null>(null);
  const reduced = useReducedMotion();
  const { resolvedTheme, cycleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const updateActiveFromScroll = () => {
      const now = performance.now();
      if (now < clickLockUntilRef.current) return;

      const pivot = window.scrollY + window.innerHeight * 0.32;
      let bestId = sections[0].id;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const top = section.offsetTop;
        const distance = Math.abs(top - pivot);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = section.id;
        }
      }

      setActive((current) => (current === bestId ? current : bestId));
    };

    const onScroll = () => {
      const targetId = clickTargetRef.current;
      if (targetId) {
        const target = document.getElementById(targetId);
        if (target) {
          const distance = Math.abs(target.getBoundingClientRect().top);
          if (distance < 18) {
            clickTargetRef.current = null;
            clickLockUntilRef.current = 0;
            setActive(targetId);
          }
        }
      }
      updateActiveFromScroll();
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
    };
  }, []);

  const ThemeIcon = !mounted ? Moon : resolvedTheme === "dark" ? Moon : Sun;
  const themeLabel = `Theme: ${resolvedTheme}. Click to toggle.`;

  return (
    <nav className="fixed inset-x-0 top-4 z-50 flex justify-center px-3" aria-label="Primary">
      <div
        className="glass relative inline-flex items-center justify-center rounded-full px-1.5 py-1.5"
        style={{
          boxShadow:
            "0 12px 50px -28px color-mix(in srgb, var(--accent-2) 48%, transparent), 0 8px 20px -18px rgba(0,0,0,0.35)"
        }}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full border opacity-70"
          style={{ borderColor: "color-mix(in srgb, var(--border-strong) 84%, transparent)" }}
          animate={reduced ? undefined : { opacity: [0.56, 0.84, 0.56] }}
          transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="relative z-10 mr-1.5 hidden sm:block"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduced ? undefined : { y: -1.5, scale: 1.02 }}
        >
          <div
            className="relative h-9 w-9 overflow-hidden rounded-full border"
            style={{
              borderColor: "color-mix(in srgb, var(--accent) 42%, transparent)",
              boxShadow:
                "0 12px 24px -14px color-mix(in srgb, var(--accent-2) 44%, transparent), inset 0 0 0 1px color-mix(in srgb, white 18%, transparent)"
            }}
          >
            <Image
              src="/nasheen-profile.jfif"
              alt="Nasheen profile portrait"
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
        <div className="relative z-10 flex items-center gap-0.5">
          {navItems.map((item) => {
            const isActive = item.id === active;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  clickTargetRef.current = item.id;
                  clickLockUntilRef.current = performance.now() + 700;
                  setActive(item.id);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                aria-current={isActive ? "page" : undefined}
                className={`relative inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs tracking-wide transition-all duration-300 sm:text-sm ${
                  isActive ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border"
                    style={{
                      background:
                        "linear-gradient(120deg, color-mix(in srgb, var(--accent) 22%, transparent), color-mix(in srgb, var(--accent-2) 22%, transparent))",
                      borderColor: "color-mix(in srgb, var(--accent) 42%, transparent)"
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.25 }}
                  />
                ) : null}
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div
          className="relative z-10 ml-0.5 flex items-center border-l pl-1.5"
          style={{ borderColor: "color-mix(in srgb, var(--border-soft) 75%, transparent)" }}
        >
          <motion.button
            type="button"
            onClick={cycleTheme}
            aria-label={themeLabel}
            disabled={!mounted}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text-primary)] disabled:cursor-default"
            style={{
              borderColor: "color-mix(in srgb, var(--border-soft) 88%, transparent)",
              background: "color-mix(in srgb, var(--surface-card-strong) 68%, transparent)"
            }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -1 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <ThemeIcon className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
