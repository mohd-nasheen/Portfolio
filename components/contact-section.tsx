"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="section-shell py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.78, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="glass relative overflow-hidden rounded-[2rem] border theme-border px-6 py-10 sm:px-10 sm:py-12"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full blur-[90px]"
          style={{ background: "color-mix(in srgb, var(--accent) 24%, transparent)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-12 left-1/3 h-44 w-44 rounded-full blur-[80px]"
          style={{ background: "color-mix(in srgb, var(--accent-2) 24%, transparent)" }}
        />

        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "color-mix(in srgb, var(--accent) 70%, var(--text-muted))" }}>
          Contact
        </p>
        <h2 className="theme-heading mt-3 font-[var(--font-display)] text-3xl leading-tight tracking-[-0.02em] sm:text-4xl">
          Building customer-trusted systems with engineering precision.
        </h2>
        <p className="theme-text mt-4 max-w-2xl text-sm sm:text-base">
          If you need someone who can own integrations, decode incidents, and partner with product to improve outcomes, let&apos;s connect.
        </p>

        <div className="relative z-10 mt-7 flex flex-wrap items-center gap-3 md:flex-nowrap">
          {[
            {
              href: "mailto:nasheenmohammed15@gmail.com",
              label: "nasheenmohammed15@gmail.com",
              icon: Mail,
              external: false
            },
            {
              href: "https://www.linkedin.com/in/mohamednasheen/",
              label: "LinkedIn",
              icon: Linkedin,
              external: true
            },
            {
              href: "https://github.com/mohd-nasheen",
              label: "GitHub",
              icon: Github,
              external: true
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="theme-chip inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/20"
                style={{
                  borderColor: "color-mix(in srgb, var(--border-soft) 84%, transparent)",
                  background: "color-mix(in srgb, var(--surface-card-strong) 66%, transparent)",
                  boxShadow: "0 0 0 0 color-mix(in srgb, var(--accent) 0%, transparent)",
                  pointerEvents: "auto"
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.borderColor = "color-mix(in srgb, var(--accent) 46%, transparent)";
                  event.currentTarget.style.boxShadow =
                    "0 10px 24px -18px color-mix(in srgb, var(--accent-2) 36%, transparent)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.borderColor = "color-mix(in srgb, var(--border-soft) 84%, transparent)";
                  event.currentTarget.style.boxShadow = "0 0 0 0 color-mix(in srgb, var(--accent) 0%, transparent)";
                }}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
