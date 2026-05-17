"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type SectionWrapperProps = {
  id: string;
  label: string;
  title: string;
  intro: string;
  children: React.ReactNode;
  showPortrait?: boolean;
};

export function SectionWrapper({ id, label, title, intro, children, showPortrait = false }: SectionWrapperProps) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      id={id}
      className="section-shell py-14 sm:py-20"
      initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-8 sm:mb-10">
        <div className={`flex items-start gap-8 ${showPortrait ? "lg:items-center lg:justify-between" : ""}`}>
          <div className="min-w-0">
            <p className="mb-2 text-xs uppercase tracking-[0.2em]" style={{ color: "color-mix(in srgb, var(--accent) 72%, var(--text-muted))" }}>
              {label}
            </p>
            <h2 className="theme-heading font-[var(--font-display)] text-3xl leading-tight tracking-[-0.02em] sm:text-4xl">
              {title}
            </h2>
            <p className="theme-text mt-4 max-w-2xl text-sm sm:text-base">{intro}</p>
          </div>
          {showPortrait ? (
            <motion.div
              className="relative hidden lg:block"
              initial={reduced ? false : { opacity: 0, y: 12, scale: 0.96 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              animate={reduced ? undefined : { y: [0, -4, 0] }}
              whileHover={reduced ? undefined : { y: -2, scale: 1.01 }}
              transition={
                reduced
                  ? undefined
                  : {
                      opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                      scale: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                      y: { duration: 8.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                    }
              }
            >
              <div
                className="relative h-40 w-40 overflow-hidden rounded-full border p-1"
                style={{
                  borderColor: "color-mix(in srgb, var(--accent) 20%, var(--border-soft))",
                  boxShadow: "0 16px 34px -26px color-mix(in srgb, var(--accent-2) 24%, transparent)"
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src="/nasheen-profile.jfif"
                    alt="Mohamed Nasheen portrait"
                    fill
                    sizes="160px"
                    className="object-cover object-[50%_24%]"
                  />
                </div>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
      {children}
    </motion.section>
  );
}
