"use client";

import { motion } from "framer-motion";

type AboutCardProps = {
  title: string;
  description: string;
  highlights: string[];
  className?: string;
};

export function AboutCard({ title, description, highlights, className = "" }: AboutCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.22 }}
      whileHover={{ y: -6, scale: 1.008 }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      className={`card-gradient glass group rounded-3xl border theme-border p-5 sm:p-6 ${className}`}
      style={{ boxShadow: "0 16px 46px -30px color-mix(in srgb, var(--accent-2) 35%, transparent)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(130deg, color-mix(in srgb, var(--accent) 16%, transparent), color-mix(in srgb, var(--accent-2) 14%, transparent), transparent 65%)"
        }}
      />

      <h3 className="theme-heading relative z-10 font-[var(--font-display)] text-lg">{title}</h3>
      <p className="theme-text relative z-10 mt-2 text-sm">{description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {highlights.map((item) => (
          <li
            key={item}
            className="theme-chip relative z-10 rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.11em]"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
