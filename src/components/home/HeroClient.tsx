"use client";

import { useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ParticlesBackground from "../ParticlesBackground";

type Hero = {
  title: string;
  desktopImage: string;
  mobileImage?: string | null;
};

export default function HeroClient({ hero }: { hero: Hero }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = {
    damping: 20,
    stiffness: 150,
    mass: 0.5,
  };

  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const translateX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);

  const translateY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;

    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section className="relative mt-20 w-full overflow-hidden">
      {/* =========================================
          DESKTOP HERO
      ========================================= */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 hidden w-full md:block bg-gradient-to-br from-[#f3b348] via-[#ffb300] to-[#f3b348]"
        style={{
          height: "80vh",
          perspective: 1000,
        }}
      >
        {/* Idle animation */}
        <motion.div
          className="h-full w-full"
          animate={{
            y: [0, -14, 0],
            scale: [1, 1.015, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Mouse interaction */}
          <motion.div
            className="h-full w-full"
            style={{
              x: translateX,
              y: translateY,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.img
              src={hero.desktopImage}
              alt={hero.title}
              className="h-full w-full object-contain"
              initial={{
                opacity: 0,
                scale: 1.08,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: isHovering ? 1.03 : 1,
                y: 0,
              }}
              transition={{
                opacity: {
                  duration: 0.9,
                  ease: "easeOut",
                },
                y: {
                  duration: 0.9,
                  ease: "easeOut",
                },
                scale: {
                  duration: 0.6,
                  ease: "easeOut",
                },
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* =========================================
          MOBILE HERO
      ========================================= */}
      <div className="relative z-10 block overflow-hidden md:hidden">
        <motion.img
          src={hero.mobileImage || "/images/Banner/ban1.jpeg"}
          alt={hero.title}
          className="h-auto w-full object-cover"
          initial={{
            opacity: 0,
            scale: 1.1,
          }}
          animate={{
            opacity: 1,
            scale: [1.1, 1.18, 1.1],
          }}
          transition={{
            opacity: {
              duration: 1,
              ease: "easeOut",
            },
            scale: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      </div>

      {/* =========================================
          FULL SECTION PARTICLES
      ========================================= */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <ParticlesBackground count={300} colors={["255,255,255"]} />
      </div>

      {/* =========================================
          PINK OVERLAY
      ========================================= */}
    </section>
  );
}
