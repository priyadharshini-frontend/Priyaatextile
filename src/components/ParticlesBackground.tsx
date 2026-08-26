"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
  colorIndex: number;
  pulseOffset: number;
};

export default function ParticlesBackground({
  count = 35,
 colors=[
    "255,255,255",
    "255,245,200",
    "255,225,120",
  ]
}: {
  count?: number;
  colors?: string[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let time = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);
    }

    function createParticles() {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.6,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.4 + 0.3,
        colorIndex: Math.floor(Math.random() * colors.length),
        pulseOffset: Math.random() * Math.PI * 2,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      time += 0.015;

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const pulse = Math.sin(time + p.pulseOffset) * 0.3 + 0.7;
        const r = p.radius;
        const color = colors[p.colorIndex];

        const gradient = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3.5);
        gradient.addColorStop(0, `rgba(${color}, ${p.opacity * pulse})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx!.beginPath();
        ctx!.fillStyle = gradient;
        ctx!.arc(p.x, p.y, r * 3.5, 0, Math.PI * 2);
        ctx!.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    function handleResize() {
      resize();
      createParticles();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [count, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}