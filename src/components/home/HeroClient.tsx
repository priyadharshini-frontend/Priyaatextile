"use client";

import { useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import ParticlesBackground from "../ParticlesBackground";

type Hero = {
  title: string;
  desktopImage: string;
  mobileImage?: string | null;
};

export default function HeroClient({ hero }: { hero: Hero }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // ---- Mouse tilt (desktop pointer only) ----
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const translateX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
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

  // ---- Scroll-driven animation ----
  // Tracks progress as the hero itself scrolls from fully in view to
  // scrolled past, so the image parallaxes, scales up slightly and
  // fades as the user scrolls down the page.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      className="relative mt-20 w-full overflow-hidden bg-gradient-to-br from-[#f3b348] via-[#ffb300] to-[#f3b348]"
      style={{
        height: "clamp(320px, 70vh, 720px)",
        perspective: 1000,
      }}
    >
      {/* =========================================
          HERO IMAGE — single responsive element.
          <picture> swaps the source by breakpoint instead of
          rendering two hidden/visible copies of the image.
      ========================================= */}
      <motion.div
        className="relative z-10 h-full w-full"
        style={
          prefersReducedMotion
            ? undefined
            : { y: scrollY, opacity: scrollOpacity }
        }
      >
        {/* Gentle idle float, paused for reduced motion */}
        <motion.div
          className="h-full w-full"
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -14, 0], scale: [1, 1.015, 1] }
          }
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Mouse tilt, only meaningfully active on fine-pointer devices */}
          <motion.div
            className="h-full w-full"
            style={
              prefersReducedMotion
                ? undefined
                : {
                    x: translateX,
                    y: translateY,
                    rotateX,
                    rotateY,
                    scale: scrollScale,
                    transformStyle: "preserve-3d",
                  }
            }
          >
            <picture>
              {hero.mobileImage && (
                <source media="(max-width: 767px)" srcSet={hero.mobileImage} />
              )}
              <motion.img
                src={hero.desktopImage}
                alt={hero.title}
                className="h-full w-full object-cover md:object-contain"
                initial={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, scale: 1.08, y: 40 }
                }
                whileInView={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: 1,
                        scale: isHovering ? 1.03 : 1,
                        y: 0,
                      }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  opacity: { duration: 0.9, ease: "easeOut" },
                  y: { duration: 0.9, ease: "easeOut" },
                  scale: { duration: 0.6, ease: "easeOut" },
                }}
              />
            </picture>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* =========================================
          FULL SECTION PARTICLES — fewer on small
          screens to keep mobile scroll smooth.
      ========================================= */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <ParticlesBackground
          count={typeof window !== "undefined" && window.innerWidth < 768 ? 120 : 300}
          colors={["255,255,255"]}
        />
      </div>
    </section>
  );
}
