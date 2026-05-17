"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect } from "react";
import { AmbientParticles } from "@/components/ambient-particles";

export function AnimatedBackground() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 36, damping: 18, mass: 0.35 });
  const py = useSpring(my, { stiffness: 36, damping: 18, mass: 0.35 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 18;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ x: px, y: py }}
      >
        <div className="theme-grid" />
      </motion.div>

      <AmbientParticles
        className="absolute inset-0 h-full w-full opacity-[0.86]"
        density={216}
        speed={0.036}
        alpha={0.48}
        interactionBoost={1.18}
      />
      <AmbientParticles
        className="absolute inset-0 h-full w-full opacity-[0.66]"
        density={148}
        speed={0.062}
        alpha={0.36}
        interactionBoost={1.06}
      />
      <AmbientParticles
        className="absolute inset-0 h-full w-full opacity-[0.4]"
        density={88}
        speed={0.028}
        alpha={0.28}
        interactionBoost={0.95}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-75"
        animate={
          reduced
            ? undefined
            : {
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
              }
        }
        transition={{ duration: 44, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 14% 12%, color-mix(in srgb, var(--accent) 24%, transparent), transparent 44%), radial-gradient(circle at 84% 20%, color-mix(in srgb, var(--accent-2) 24%, transparent), transparent 50%), radial-gradient(circle at 50% 92%, color-mix(in srgb, var(--accent-3) 20%, transparent), transparent 48%)"
        }}
      />

      <motion.div
        aria-hidden
        className="ambient-orb left-[-16rem] top-[-12rem] h-[34rem] w-[34rem]"
        style={{ background: "color-mix(in srgb, var(--accent) 22%, transparent)" }}
        animate={reduced ? undefined : { x: [0, 22, -14, 0], y: [0, -12, 10, 0] }}
        transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="ambient-orb right-[-14rem] top-[5rem] h-[30rem] w-[30rem]"
        style={{ background: "color-mix(in srgb, var(--accent-2) 20%, transparent)" }}
        animate={reduced ? undefined : { x: [0, -18, 20, 0], y: [0, 14, -10, 0] }}
        transition={{ duration: 26, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="ambient-orb bottom-[-16rem] left-[30%] h-[28rem] w-[28rem]"
        style={{ background: "color-mix(in srgb, var(--accent-3) 20%, transparent)" }}
        animate={reduced ? undefined : { x: [0, -20, 12, 0], y: [0, 10, -12, 0] }}
        transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  );
}
