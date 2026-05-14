/* ============================================================
   CHOOSE YOUR PATH SECTION — Obsidian Intelligence
   Audience-selector cards that personalize the portfolio experience.
   ============================================================ */

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export type VisitorType = "recruiter" | "client" | "collaborator" | "explorer";

const PATHS = [
  {
    id: "recruiter" as VisitorType,
    icon: "◈",
    title: "I'm Hiring",
    subtitle: "Recruiter / Hiring Manager",
    description: "See role fit, key skills, case studies, and resume.",
    accent: "#9b6dff",
    tldr: "10+ years across CX, AI operations, and workflow design. Available for full-time roles in AI enablement, CX strategy, product ops, and operations.",
  },
  {
    id: "client" as VisitorType,
    icon: "◉",
    title: "I Need Help",
    subtitle: "Business Owner / CX Leader",
    description: "Explore AI workshops, CX strategy, and workflow services.",
    accent: "#e2c98a",
    tldr: "I offer AI adoption workshops, VoC program design, workflow audits, and customer insight systems. Let's talk about what's broken and how to fix it.",
  },
  {
    id: "collaborator" as VisitorType,
    icon: "◎",
    title: "Let's Build",
    subtitle: "Collaborator / Partner",
    description: "Explore partnership, community work, and shared projects.",
    accent: "#8be9fd",
    tldr: "I'm building AI with Whit and BLAQ HAUS. I'm open to collaborations in AI education, community building, and human-centered tech.",
  },
  {
    id: "explorer" as VisitorType,
    icon: "◌",
    title: "Just Exploring",
    subtitle: "Curious Visitor",
    description: "Take the full tour — no agenda required.",
    accent: "#c9a0b4",
    tldr: "Welcome. Take your time. There are a few hidden things to find if you're curious enough.",
  },
];

interface ChoosePathSectionProps {
  onSelect?: (type: VisitorType) => void;
  selectedPath?: VisitorType | null;
}

export default function ChoosePathSection({ onSelect, selectedPath }: ChoosePathSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="path"
      ref={sectionRef}
      className="py-24 md:py-32"
      style={{ background: "linear-gradient(to bottom, rgba(7,4,9,1), rgba(15,11,20,1))" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="section-label block mb-4">Start Here</span>
          <h2
            className="font-display font-semibold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#f0ebe0" }}
          >
            Who are you?
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed" style={{ color: "rgba(200,192,176,0.65)" }}>
            This portfolio adapts to you. Choose how you want to experience it.
          </p>
        </motion.div>

        {/* Path cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PATHS.map((path, i) => (
            <motion.button
              key={path.id}
              initial={{ opacity: 0, y: 32 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => onSelect?.(path.id)}
              className="text-left p-6 rounded-sm transition-all duration-300 group relative overflow-hidden"
              style={{
                background: selectedPath === path.id
                  ? `rgba(${path.id === 'recruiter' ? '155,109,255' : path.id === 'client' ? '226,201,138' : path.id === 'collaborator' ? '139,233,253' : '201,160,180'}, 0.12)`
                  : "rgba(15,11,20,0.8)",
                border: `1px solid ${selectedPath === path.id ? path.accent + '60' : 'rgba(240,235,224,0.07)'}`,
              }}
              onMouseEnter={(e) => {
                if (selectedPath !== path.id) {
                  e.currentTarget.style.borderColor = path.accent + "40";
                  e.currentTarget.style.background = "rgba(15,11,20,0.95)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPath !== path.id) {
                  e.currentTarget.style.borderColor = "rgba(240,235,224,0.07)";
                  e.currentTarget.style.background = "rgba(15,11,20,0.8)";
                }
              }}
            >
              {/* Glow on selected */}
              {selectedPath === path.id && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${path.accent}18 0%, transparent 70%)`,
                  }}
                />
              )}

              <div className="relative z-10">
                <div
                  className="text-2xl mb-4 font-mono-label transition-all duration-300"
                  style={{ color: selectedPath === path.id ? path.accent : "rgba(200,192,176,0.4)" }}
                >
                  {path.icon}
                </div>
                <h3
                  className="font-display text-xl font-semibold mb-1"
                  style={{ color: "#f0ebe0" }}
                >
                  {path.title}
                </h3>
                <p
                  className="font-mono-label text-xs mb-3"
                  style={{ color: path.accent, opacity: 0.8 }}
                >
                  {path.subtitle}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(200,192,176,0.6)" }}>
                  {path.description}
                </p>

                {/* TLDR on selected */}
                {selectedPath === path.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 pt-4"
                    style={{ borderTop: `1px solid ${path.accent}30` }}
                  >
                    <p className="font-mono-label text-xs mb-1" style={{ color: path.accent }}>
                      TLDR
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(200,192,176,0.75)" }}>
                      {path.tldr}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
