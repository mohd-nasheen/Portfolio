"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export type ProjectItem = {
  label: string;
  title: string;
  impact: string;
  summary: string;
  tags: string[];
  accent: string;
  link?: string;
  privateStatus?: string;
};

export function ProjectCard({ project }: { project: ProjectItem }) {
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const rotateXTarget = useMotionValue(0);
  const rotateYTarget = useMotionValue(0);
  const glowXTarget = useMotionValue(50);
  const glowYTarget = useMotionValue(50);

  const rotateX = useSpring(rotateXTarget, { stiffness: 110, damping: 22, mass: 0.35 });
  const rotateY = useSpring(rotateYTarget, { stiffness: 110, damping: 22, mass: 0.35 });
  const glowX = useSpring(glowXTarget, { stiffness: 120, damping: 28, mass: 0.4 });
  const glowY = useSpring(glowYTarget, { stiffness: 120, damping: 28, mass: 0.4 });

  const glowBackground = useMotionTemplate`radial-gradient(240px circle at ${glowX}% ${glowY}%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 64%)`;

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 360);
    return () => window.clearTimeout(timer);
  }, []);

  const onPointerMove: React.PointerEventHandler<HTMLElement> = (event) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * 4.2;
    const ry = (px - 0.5) * 5;
    rotateXTarget.set(rx);
    rotateYTarget.set(ry);
    glowXTarget.set(px * 100);
    glowYTarget.set(py * 100);
  };

  const onPointerLeave = () => {
    rotateXTarget.set(0);
    rotateYTarget.set(0);
    glowXTarget.set(50);
    glowYTarget.set(50);
    setHovered(false);
  };

  if (!ready) {
    return (
      <article className="glass rounded-3xl border theme-border p-5">
        <div className="skeleton h-40 rounded-2xl" />
        <div className="skeleton mt-4 h-5 w-3/4 rounded-lg" />
        <div className="skeleton mt-2 h-4 w-full rounded-lg" />
        <div className="skeleton mt-2 h-4 w-5/6 rounded-lg" />
      </article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.22 }}
      whileHover={reduced ? undefined : { y: -10, scale: 1.014 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={onPointerLeave}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="card-gradient glass group transform-gpu overflow-hidden rounded-3xl border theme-border p-5"
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformPerspective: 900,
        boxShadow: hovered
          ? "0 28px 68px -30px color-mix(in srgb, var(--accent-2) 46%, transparent)"
          : "0 20px 54px -34px color-mix(in srgb, var(--accent-2) 34%, transparent)"
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glowBackground }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
        animate={hovered && !reduced ? { x: ["-8%", "340%"], opacity: [0, 0.2, 0] } : { x: "-8%", opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <div
        className={`mb-4 h-44 rounded-2xl border theme-border bg-gradient-to-br ${project.accent} from-5% via-45% to-100% p-4 transition-[filter] duration-300 group-hover:saturate-125`}
      >
        <div
          className="flex h-full flex-col justify-between rounded-xl border p-3"
          style={{
            borderColor: "color-mix(in srgb, var(--border-soft) 82%, transparent)",
            background: "color-mix(in srgb, var(--surface-card-strong) 72%, transparent)"
          }}
        >
          <p className="theme-muted text-[11px] uppercase tracking-[0.18em]">{project.label}</p>
          <p className="theme-heading max-w-[18ch] text-sm">{project.impact}</p>
        </div>
      </div>

      {/* <div className="flex items-start justify-between gap-3">
        <h3 className="theme-heading font-[var(--font-display)] text-xl">{project.title}</h3>
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} repository`}
            className="theme-text transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <span className="theme-muted text-[11px] uppercase tracking-[0.15em]">{project.privateStatus ?? ""}</span>
        )}
      </div> */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="theme-heading font-[var(--font-display)] text-xl">
        {project.title}
        </h3>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} repository`}
            className="theme-text transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>

      <p className="theme-text mt-3 text-sm">{project.summary}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag, idx) => (
          <motion.li
            key={tag}
            className="theme-chip rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.12em]"
            animate={
              hovered && !reduced
                ? { y: -2, opacity: 1 }
                : { y: 0, opacity: 0.94 }
            }
            transition={{ duration: 0.28, delay: idx * 0.02, ease: "easeOut" }}
          >
            {tag}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}
