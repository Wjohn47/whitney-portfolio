/* ============================================================
   EXPERTISE SECTION — MagicBento-Inspired Cards
   Interactive bento grid with spotlight, border glow, tilt, and particles.
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const EXPERTISE = [
  {
    id: "voc",
    icon: "◈",
    title: "Customer Insight Systems",
    label: "VoC Strategy",
    description: "I turn messy feedback into patterns, priorities, and action. Built VoC programs that moved CSAT from 3.2 to 4.6 across 500K+ customers.",
    tags: ["Qualtrics", "Medallia", "NPS", "CSAT", "Journey Mapping"],
    size: "large",
    accent: "#9b6dff",
  },
  {
    id: "ai",
    icon: "◉",
    title: "AI Adoption",
    label: "Enablement",
    description: "I help teams move from AI curiosity to practical, responsible AI usage through workshops, demos, and plain-language guidance.",
    tags: ["ChatGPT", "Claude", "n8n", "Automation", "Prompt Engineering"],
    size: "medium",
    accent: "#8be9fd",
  },
  {
    id: "workflow",
    icon: "◎",
    title: "Workflow Architecture",
    label: "Operations",
    description: "I map broken processes and design cleaner systems: reducing manual work, clarifying ownership, and connecting the right tools.",
    tags: ["Salesforce", "Zendesk", "n8n", "Process Design", "SOP Writing"],
    size: "medium",
    accent: "#e2c98a",
  },
  {
    id: "human-ai",
    icon: "◌",
    title: "Human-Centered AI",
    label: "Ethics + Access",
    description: "I build AI experiences around real people, prioritizing accessibility, plain language, and community-first design.",
    tags: ["AI Ethics", "Accessibility", "Community", "Education"],
    size: "small",
    accent: "#c9a0b4",
  },
  {
    id: "facilitation",
    icon: "◆",
    title: "Facilitation",
    label: "Workshops",
    description: "I teach through demos, practice, and real examples. My workshops are practical, not theoretical.",
    tags: ["Training", "Workshops", "Demos", "Curriculum Design"],
    size: "small",
    accent: "#c77dff",
  },
  {
    id: "product-ops",
    icon: "◇",
    title: "Product Operations",
    label: "Translation",
    description: "I bridge customer needs, operations, product teams, and tools, translating complexity into clear requirements and roadmaps.",
    tags: ["Product Ops", "Requirements", "Stakeholder Mgmt", "Roadmapping"],
    size: "small",
    accent: "#8be9fd",
  },
];

function BentoCard({ card, index, visible }: { card: typeof EXPERTISE[0]; index: number; visible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, active: true });
    // Subtle tilt
    const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -4;
    const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 4;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setSpotlight((s) => ({ ...s, active: false }));
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-sm overflow-hidden cursor-default"
      style={{
        background: "rgba(15,11,20,0.85)",
        border: "1px solid rgba(240,235,224,0.07)",
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.25s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease, box-shadow 0.3s ease",
        gridColumn: card.size === "large" ? "span 2" : "span 1",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = card.accent + "40";
        e.currentTarget.style.boxShadow = `0 8px 40px ${card.accent}18, 0 0 0 1px ${card.accent}20`;
      }}
    >
      {/* Spotlight */}
      {spotlight.active && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${spotlight.x}%`,
            top: `${spotlight.y}%`,
            width: 240,
            height: 240,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${card.accent}18 0%, transparent 70%)`,
            borderRadius: "50%",
          }}
        />
      )}

      {/* Border glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-sm"
        style={{
          background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, ${card.accent}10 0%, transparent 60%)`,
          opacity: spotlight.active ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-7 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <span
            className="text-xl font-mono-label"
            style={{ color: card.accent }}
          >
            {card.icon}
          </span>
          <span
            className="font-mono-label text-xs px-2 py-1 rounded-sm"
            style={{
              color: card.accent,
              background: card.accent + "15",
              border: `1px solid ${card.accent}25`,
            }}
          >
            {card.label}
          </span>
        </div>

        <h3
          className="font-display text-xl md:text-2xl font-semibold mb-3"
          style={{ color: "#f0ebe0" }}
        >
          {card.title}
        </h3>

        <p
          className="text-sm leading-relaxed flex-1 mb-4"
          style={{ color: "rgba(210,204,190,0.82)" }}
        >
          {card.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono-label text-xs px-2 py-0.5"
              style={{
                color: "rgba(200,192,176,0.5)",
                background: "rgba(240,235,224,0.04)",
                border: "1px solid rgba(240,235,224,0.08)",
                borderRadius: "2px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 md:py-32"
      style={{ background: "rgba(15,11,20,1)" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="section-label block mb-4">Expertise</span>
            <h2
              className="font-display font-semibold leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#f0ebe0" }}
            >
              What I bring
              <br />
              <span style={{ color: "#c8c0b0", fontStyle: "italic", fontWeight: 300 }}>
                to the table
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed" style={{ color: "rgba(210,204,190,0.70)" }}>
            My work lives at the intersection of AI, customer experience, and operational design. I make complex systems feel simple.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {EXPERTISE.map((card, i) => (
            <BentoCard key={card.id} card={card} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
