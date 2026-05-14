/* ============================================================
   HERO SECTION — Obsidian Intelligence
   Full-bleed dark hero with iridescent background image,
   adaptive rotating role title, and animated entrance.
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/110102467/Ze9D6rPfroPwfnzFMpwZ4R/whitney-hero-bg-QkeFFgZepfUqraj6LWWVLL.webp";

const ROLES = [
  "AI Operations Strategist",
  "Customer Experience Architect",
  "Human-Centered AI Educator",
  "Workflow Systems Designer",
  "Voice of Customer Analyst",
];

interface HeroSectionProps {
  onAskWhit?: () => void;
  onChoosePath?: () => void;
}

export default function HeroSection({ onAskWhit, onChoosePath }: HeroSectionProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Rotate role titles every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Cursor glow tracking
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    const el = heroRef.current;
    el?.addEventListener("mousemove", handler);
    return () => el?.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ background: "#070409" }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.65 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(7,4,9,0.3) 0%, rgba(7,4,9,0.5) 50%, rgba(7,4,9,0.95) 100%)",
          }}
        />
      </div>

      {/* Cursor glow */}
      <div
        className="absolute pointer-events-none transition-all duration-300"
        style={{
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(155,109,255,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 container pb-20 md:pb-28">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="section-label">Portfolio · 2025</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="font-display font-semibold leading-none mb-4"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            color: "#f0ebe0",
            letterSpacing: "-0.02em",
          }}
        >
          Whitney
          <br />
          <span style={{ color: "#c8c0b0", fontWeight: 300, fontStyle: "italic" }}>
            Johnson
          </span>
        </motion.h1>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-6"
          style={{
            height: "1px",
            width: "min(480px, 100%)",
            background: "linear-gradient(90deg, rgba(155,109,255,0.6), rgba(139,233,253,0.3), transparent)",
            transformOrigin: "left",
          }}
        />

        {/* Adaptive role title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-8 h-8 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="font-mono-label text-sm tracking-widest uppercase"
              style={{ color: "rgba(155,109,255,0.9)" }}
            >
              {ROLES[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="text-base md:text-lg mb-10 max-w-xl leading-relaxed"
          style={{ color: "rgba(200,192,176,0.75)" }}
        >
          I translate complexity into clarity — building AI systems, customer insight programs, and operational workflows that actually work for real people.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          className="flex flex-wrap gap-4 items-center"
        >
          <button onClick={onChoosePath} className="btn-primary">
            Explore My Work
          </button>
          <button onClick={onAskWhit} className="btn-ghost flex items-center gap-2">
            <span className="animate-pulse-glow inline-block w-2 h-2 rounded-full bg-violet-400" />
            Ask Whit
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-8 right-6 md:right-12 flex flex-col items-center gap-2"
        >
          <span className="font-mono-label text-xs" style={{ color: "rgba(200,192,176,0.35)", writingMode: "vertical-rl" }}>
            scroll
          </span>
          <div
            className="w-px h-12"
            style={{ background: "linear-gradient(to bottom, rgba(155,109,255,0.5), transparent)" }}
          />
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        className="relative z-10 border-t"
        style={{ borderColor: "rgba(240,235,224,0.06)", background: "rgba(7,4,9,0.6)", backdropFilter: "blur(12px)" }}
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {[
              { value: "10+", label: "Years Experience" },
              { value: "500K+", label: "Customers Impacted" },
              { value: "40%", label: "CSAT Improvement" },
              { value: "3", label: "AI Systems Built" },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-5 text-center">
                <div
                  className="font-display text-2xl md:text-3xl font-semibold mb-1 iridescent-text"
                >
                  {stat.value}
                </div>
                <div className="font-mono-label text-xs" style={{ color: "rgba(200,192,176,0.5)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
