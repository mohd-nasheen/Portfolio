"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

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
          className="absolute -right-16 -top-16 h-52 w-52 rounded-full blur-[90px]"
          style={{ background: "color-mix(in srgb, var(--accent) 24%, transparent)" }}
        />
        <div
          className="absolute -bottom-12 left-1/3 h-44 w-44 rounded-full blur-[80px]"
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

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="mailto:nasheenmohammed15@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5"
            style={{
              borderColor: "color-mix(in srgb, var(--accent) 40%, transparent)",
              background: "color-mix(in srgb, var(--accent) 16%, transparent)",
              color: "color-mix(in srgb, var(--text-primary) 92%, white)"
            }}
          >
            <Mail className="h-4 w-4" />
            nasheenmohammed15@gmail.com
          </a>
          {/* <a
            href="#"
            className="theme-btn-soft inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
          >
            <FileText className="h-4 w-4" />
            Download Resume
          </a> */}
        </div>

        <div className="theme-text mt-6 flex flex-wrap gap-3 text-sm">
          <a
            href="https://www.linkedin.com/in/mohamednasheen/"
            target="_blank"
            rel="noreferrer"
            className="theme-chip inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-colors duration-300 hover:bg-white/20"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/mohd-nasheen"
            target="_blank"
            rel="noreferrer"
            className="theme-chip inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-colors duration-300 hover:bg-white/20"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}
