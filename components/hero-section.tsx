"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AmbientParticles } from "@/components/ambient-particles";
import { CalendlyModal } from "@/components/calendly-modal";

const heroTransition = { duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] as const };

export function HeroSection() {
  const reduced = useReducedMotion();
  const [openCalendly, setOpenCalendly] = useState(false);

  return (
    <section className="section-shell relative min-h-screen pt-28 sm:pt-32">
      <div className="noise-overlay glass relative overflow-hidden rounded-[2rem] border theme-border px-6 pb-12 pt-10 sm:px-10 sm:pb-16 sm:pt-14">
        <AmbientParticles className="absolute inset-0 z-0 opacity-70" density={52} speed={0.08} alpha={0.55} />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-[-30%] z-0 h-[30rem] w-[22rem] rotate-[18deg] rounded-[90px] blur-[44px]"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--accent) 24%, transparent), transparent 72%)"
          }}
          animate={reduced ? undefined : { y: [0, 16, -8, 0], opacity: [0.25, 0.42, 0.22, 0.25] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[-8rem] top-[-26%] z-0 h-[28rem] w-[20rem] rotate-[-22deg] rounded-[88px] blur-[44px]"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--accent-2) 24%, transparent), transparent 72%)"
          }}
          animate={reduced ? undefined : { y: [0, -12, 12, 0], opacity: [0.2, 0.34, 0.22, 0.2] }}
          transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.div
          className="relative z-10 mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em]"
          style={{
            borderColor: "color-mix(in srgb, var(--accent-3) 44%, transparent)",
            background: "color-mix(in srgb, var(--accent-3) 14%, transparent)",
            color: "color-mix(in srgb, var(--text-primary) 90%, var(--accent-3) 10%)"
          }}
          initial={reduced ? false : { opacity: 0, y: -10 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={heroTransition}
        >
          <span className="pulse-dot" />
          Available for Support Engineering Roles
        </motion.div>

        <motion.p
          className="theme-muted relative z-10 mb-4 text-sm uppercase tracking-[0.2em]"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ ...heroTransition, delay: 0.1 }}
        >
          Nash • Support Engineer
        </motion.p>

        <motion.h1
          className="theme-heading relative z-10 font-[var(--font-display)] text-[clamp(2.15rem,6.8vw,5.2rem)] leading-[0.95] tracking-[-0.03em]"
          initial={reduced ? false : { opacity: 0, y: 36 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ ...heroTransition, delay: 0.18 }}
        >
          Engineering clarity
          <br />
          for complex customer systems.
          <span className="text-gradient block pt-2">Built at the intersection of product, support, and AI.</span>
        </motion.h1>

        <motion.p
          className="theme-text relative z-10 mt-6 max-w-2xl text-base sm:text-lg"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ ...heroTransition, delay: 0.28 }}
        >
          I help engineer customer-facing workflows across integrations, automation, observability, and AI-powered support operations, combining technical depth with customer-first product reasoning.
        </motion.p>

        <motion.div
          className="relative z-20 mt-10 flex flex-wrap gap-3"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ ...heroTransition, delay: 0.34 }}
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2"
            style={{
              borderColor: "color-mix(in srgb, var(--accent) 40%, transparent)",
              background: "color-mix(in srgb, var(--accent) 18%, transparent)",
              color: "color-mix(in srgb, var(--text-primary) 92%, white)",
              boxShadow: "0 10px 30px -16px color-mix(in srgb, var(--accent) 42%, transparent)"
            }}
          >
            See impact
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpenCalendly(true)}
            // className="theme-btn-soft inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2"
            className="theme-btn-soft cursor-pointer inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2"
          >
            Schedule a call with me
            
          </button>
        </motion.div>

        <motion.div
          className="relative z-10 mt-10 grid gap-3 sm:grid-cols-3"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ ...heroTransition, delay: 0.4 }}
        >
          {[
            ["Enterprise Workflows", "Built and scaled enterprise workflows for SaaS teams."],
            ["Incident Intelligence", "Root-cause narratives in hours."],
            ["AI readiness + Automation", "Prompt + process + automation literacy"]
          ].map(([label, value]) => (
            <div key={label} className="theme-panel rounded-2xl border theme-border px-4 py-4">
              <p className="theme-muted text-xs uppercase tracking-[0.15em]">{label}</p>
              <p className="theme-heading mt-1 text-sm">{value}</p>
            </div>
          ))}
        </motion.div>

      </div>
      <CalendlyModal open={openCalendly} onClose={() => setOpenCalendly(false)} />
    </section>
  );
}
