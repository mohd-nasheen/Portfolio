"use client";

import { useEffect } from "react";

export function AnimatedCursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cursor = document.createElement("div");
    cursor.setAttribute("aria-hidden", "true");
    cursor.style.position = "fixed";
    cursor.style.left = "0";
    cursor.style.top = "0";
    cursor.style.width = "14px";
    cursor.style.height = "14px";
    cursor.style.borderRadius = "999px";
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = "80";
    cursor.style.mixBlendMode = "screen";
    cursor.style.opacity = "0.75";
    document.body.appendChild(cursor);

    const applyTheme = () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      cursor.style.background = isLight
        ? "radial-gradient(circle, rgba(95,142,214,0.85) 0%, rgba(137,118,221,0.48) 72%)"
        : "radial-gradient(circle, rgba(125,211,252,0.95) 0%, rgba(124,92,255,0.55) 70%)";
      cursor.style.boxShadow = isLight
        ? "0 0 22px rgba(108, 150, 219, 0.45)"
        : "0 0 24px rgba(125, 211, 252, 0.65)";
    };
    applyTheme();

    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };
    let rafId = 0;

    const onMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };

    const loop = () => {
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;
      cursor.style.transform = `translate3d(${current.x - 7}px, ${current.y - 7}px, 0)`;
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      cursor.remove();
    };
  }, []);

  return null;
}
