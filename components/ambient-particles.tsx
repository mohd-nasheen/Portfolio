"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type AmbientParticlesProps = {
  className?: string;
  density?: number;
  speed?: number;
  alpha?: number;
  interactionBoost?: number;
};

type Particle = {
  x: number;
  y: number;
  depth: number;
  radius: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  offsetX: number;
  offsetY: number;
  targetX: number;
  targetY: number;
  driftAngle: number;
  driftSpeed: number;
  driftRadius: number;
  pulseSpeed: number;
  pulseOffset: number;
  parallax: number;
  glow: number;
  mouseStrength: number;
};

type Palette = {
  fillR: number;
  fillG: number;
  fillB: number;
  glow: string;
  alphaBoost: number;
  glowBoost: number;
};

export function AmbientParticles({
  className = "",
  density = 64,
  speed = 0.06,
  alpha = 0.65,
  interactionBoost = 1
}: AmbientParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = document.documentElement;
    const mqMobile = window.matchMedia("(max-width: 768px)");
    const mqFinePointer = window.matchMedia("(pointer:fine)");

    let width = 0;
    let height = 0;
    let rafId = 0;
    let lastTime = 0;

    const particles: Particle[] = [];

    const mouseTarget = { x: 0, y: 0, px: 0, py: 0 };
    const mouse = { x: 0, y: 0, px: 0, py: 0 };

    const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

    const getPalette = (): Palette => {
      const isLight = root.getAttribute("data-theme") === "light";
      return isLight
        ? {
            // Slightly deeper blue-gray for better light-mode legibility.
            fillR: 42,
            fillG: 65,
            fillB: 102,
            glow: "rgba(88, 132, 204, 0.52)",
            alphaBoost: 1.14,
            glowBoost: 1.22
          }
        : {
            // Soft cyan-blue for dark mode.
            fillR: 170,
            fillG: 214,
            fillB: 255,
            glow: "rgba(112, 202, 255, 0.56)",
            alphaBoost: 1,
            glowBoost: 1
          };
    };

    const resize = () => {
      width = Math.max(canvas.clientWidth, window.innerWidth);
      height = Math.max(canvas.clientHeight, window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticle = (): Particle => {
      // Keep large particles sparse by biasing toward lower depth.
      const depth = Math.pow(Math.random(), 2.2) * 0.9 + 0.14;
      return {
        x: 0,
        y: 0,
        depth,
        radius: 0.36 + Math.pow(Math.random(), 1.85) * 1.05 + depth * 0.54,
        vx: (Math.random() - 0.5) * speed * (0.5 + depth * 0.95),
        vy: (Math.random() - 0.5) * speed * (0.5 + depth * 0.95),
        baseX: 0,
        baseY: 0,
        offsetX: 0,
        offsetY: 0,
        targetX: 0,
        targetY: 0,
        driftAngle: Math.random() * Math.PI * 2,
        driftSpeed: 0.0018 + Math.random() * 0.0032,
        driftRadius: 0.24 + Math.random() * (1.15 + depth * 1.7),
        pulseSpeed: 0.001 + Math.random() * 0.002,
        pulseOffset: Math.random() * Math.PI * 2,
        parallax: (6.2 + depth * 21.8) * interactionBoost,
        glow: 4.4 + depth * 12.8,
        mouseStrength: (0.9 + depth * 2.3) * interactionBoost
      };
    };

    const init = () => {
      particles.length = 0;
      const area = Math.max(1, width * height);
      const desktopScale = area / (1920 * 1080);
      const baseCount = Math.round(density * clamp(desktopScale, 0.82, 1.4));
      const count = mqMobile.matches ? Math.floor(baseCount * 0.58) : baseCount;

      // Stratified distribution keeps full-page coverage while avoiding clusters.
      const cols = Math.max(1, Math.round(Math.sqrt(count * (width / Math.max(1, height)))));
      const rows = Math.max(1, Math.ceil(count / cols));
      const cellW = width / cols;
      const cellH = height / rows;

      for (let i = 0; i < count; i += 1) {
        const p = createParticle();
        const col = i % cols;
        const row = Math.floor(i / cols);
        const jitterX = (Math.random() - 0.5) * cellW * 0.9;
        const jitterY = (Math.random() - 0.5) * cellH * 0.9;
        p.x = col * cellW + cellW * 0.5 + jitterX;
        p.y = row * cellH + cellH * 0.5 + jitterY;
        particles.push(p);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      const normX = event.clientX / window.innerWidth - 0.5;
      const normY = event.clientY / window.innerHeight - 0.5;
      mouseTarget.x = normX;
      mouseTarget.y = normY;
      mouseTarget.px = event.clientX;
      mouseTarget.py = event.clientY;
    };

    const wrap = (p: Particle) => {
      const pad = 24;
      if (p.x < -pad) p.x = width + pad;
      if (p.x > width + pad) p.x = -pad;
      if (p.y < -pad) p.y = height + pad;
      if (p.y > height + pad) p.y = -pad;
    };

    const render = (time: number) => {
      if (!lastTime) lastTime = time;
      const dt = clamp((time - lastTime) / 16.6667, 0.45, 2.0);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      const palette = getPalette();

      // Smooth cursor interpolation for premium motion response.
      mouse.x = lerp(mouse.x, mouseTarget.x, 0.085);
      mouse.y = lerp(mouse.y, mouseTarget.y, 0.085);
      mouse.px = lerp(mouse.px, mouseTarget.px || width * 0.5, 0.12);
      mouse.py = lerp(mouse.py, mouseTarget.py || height * 0.5, 0.12);

      const localInfluenceRadius = mqMobile.matches ? 220 : 360;
      const localInfluenceRadiusSq = localInfluenceRadius * localInfluenceRadius;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.driftAngle += p.driftSpeed * dt * 16.6667;
        wrap(p);

        const driftX = Math.cos(p.driftAngle) * p.driftRadius;
        const driftY = Math.sin(p.driftAngle * 1.15) * p.driftRadius;
        p.baseX = p.x + driftX;
        p.baseY = p.y + driftY;

        // Global parallax gives large-scale depth.
        const globalParallaxX = mouse.x * p.parallax;
        const globalParallaxY = mouse.y * p.parallax;

        // Local cursor field adds premium nearby interaction.
        const dx = p.baseX - mouse.px;
        const dy = p.baseY - mouse.py;
        const distanceSq = dx * dx + dy * dy;
        let localX = 0;
        let localY = 0;
        if (distanceSq < localInfluenceRadiusSq) {
          const distance = Math.sqrt(Math.max(1, distanceSq));
          const falloff = 1 - distance / localInfluenceRadius;
          const lift = falloff * falloff * p.mouseStrength * (mqMobile.matches ? 2.3 : 3.2);
          localX = (dx / distance) * lift;
          localY = (dy / distance) * lift;
        }

        p.targetX = globalParallaxX + localX;
        p.targetY = globalParallaxY + localY;

        // Depth-based smoothing: near particles react more, far particles react less.
        const response = 0.065 + p.depth * 0.082;
        p.offsetX = lerp(p.offsetX, p.targetX, response);
        p.offsetY = lerp(p.offsetY, p.targetY, response);

        const drawX = p.baseX + p.offsetX;
        const drawY = p.baseY + p.offsetY;

        const pulse = 0.74 + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.26;
        const opacity = clamp((0.26 + p.depth * 0.74) * pulse, 0.08, 1);
        const radius = p.radius * (0.84 + p.depth * 0.28);

        ctx.save();
        if (p.depth > 0.7) {
          ctx.shadowBlur = p.glow * pulse * palette.glowBoost;
          ctx.shadowColor = palette.glow;
        }
        ctx.fillStyle = `rgba(${palette.fillR}, ${palette.fillG}, ${palette.fillB}, ${alpha * palette.alphaBoost})`;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafId = requestAnimationFrame(render);
    };

    resize();
    init();
    rafId = requestAnimationFrame(render);

    const onResize = () => {
      resize();
      init();
    };

    if (mqFinePointer.matches) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [alpha, density, reduced, speed]);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none ${className}`} />;
}
