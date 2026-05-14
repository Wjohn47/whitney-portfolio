/* ============================================================
   CONTACT SECTION — Obsidian Intelligence
   Centered editorial CTA with Ask Whit chatbot button.
   No form — conversation-first approach.
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { VisitorType } from "./ChoosePathSection";

const CONTACT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/110102467/Ze9D6rPfroPwfnzFMpwZ4R/whitney-contact-bg-Qnw5QYkggRPtA7ZijNHba3.webp";

const CTA_BY_PATH: Record<VisitorType, { headline: string; sub: string; chatLabel: string }> = {
  recruiter: {
    headline: "Let's talk about the role",
    sub: "I'm actively exploring full-time opportunities. Ask Whit anything about my background, or reach out directly.",
    chatLabel: "Ask Whit About My Experience",
  },
  client: {
    headline: "Ready to fix what's broken?",
    sub: "Tell me about your CX challenge, AI adoption goal, or workflow problem. Start with Ask Whit or email me directly.",
    chatLabel: "Chat About Your Project",
  },
  collaborator: {
    headline: "Let's build something together",
    sub: "I'm open to collaborations in AI education, community building, and human-centered tech. Start the conversation.",
    chatLabel: "Start a Collaboration Chat",
  },
  explorer: {
    headline: "You made it to the end",
    sub: "If something resonated, I'd love to hear about it. No agenda required.",
    chatLabel: "Say Hello to Whit",
  },
};

const DEFAULT_CTA = {
  headline: "Let's talk",
  sub: "Whether you're hiring, need help, or just want to connect, I'm here. Start with Ask Whit or send a direct email.",
  chatLabel: "Chat with Whit",
};

interface ContactSectionProps {
  visitorType?: VisitorType | null;
  onAskWhit?: () => void;
}

export default function ContactSection({ visitorType, onAskWhit }: ContactSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [btnHovered, setBtnHovered] = useState<"chat" | "email" | null>(null);

  const cta = visitorType ? CTA_BY_PATH[visitorType] : DEFAULT_CTA;

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
      id="contact"
      ref={sectionRef}
      className="py-28 md:py-40 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img src={CONTACT_BG} alt="" className="w-full h-full object-cover opacity-50" />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(7,4,9,0.75) 0%, rgba(7,4,9,0.45) 50%, rgba(7,4,9,0.88) 100%)",
          }}
        />
      </div>

      {/* Ambient iridescent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(155,109,255,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="section-label block mb-6">Contact</span>

          {/* Headline — animates when visitor type changes */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={cta.headline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="font-display font-semibold leading-tight mb-6"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#f0ebe0" }}
            >
              {cta.headline}
            </motion.h2>
          </AnimatePresence>

          {/* Sub text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={cta.sub}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-base leading-relaxed mb-12"
              style={{ color: "rgba(210,204,190,0.82)" }}
            >
              {cta.sub}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            {/* Primary: Chat with Whit */}
            <button
              onClick={onAskWhit}
              onMouseEnter={() => setBtnHovered("chat")}
              onMouseLeave={() => setBtnHovered(null)}
              className="relative flex items-center gap-3 px-8 py-4 rounded-sm font-sans text-sm tracking-wide transition-all duration-250"
              style={{
                background: btnHovered === "chat"
                  ? "linear-gradient(135deg, rgba(155,109,255,0.35), rgba(139,233,253,0.2))"
                  : "linear-gradient(135deg, rgba(155,109,255,0.18), rgba(139,233,253,0.08))",
                border: `1px solid ${btnHovered === "chat" ? "rgba(155,109,255,0.65)" : "rgba(155,109,255,0.35)"}`,
                color: "#f0ebe0",
                boxShadow: btnHovered === "chat" ? "0 0 28px rgba(155,109,255,0.22)" : "none",
                transform: btnHovered === "chat" ? "translateY(-2px)" : "translateY(0)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {/* Pulsing dot */}
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ background: "#9b6dff" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: "#9b6dff" }}
                />
              </span>
              {cta.chatLabel}
            </button>

            {/* Secondary: Email */}
            <a
              href="mailto:whitney@aiwithwhit.com"
              onMouseEnter={() => setBtnHovered("email")}
              onMouseLeave={() => setBtnHovered(null)}
              className="flex items-center gap-3 px-8 py-4 rounded-sm font-sans text-sm tracking-wide transition-all duration-250"
              style={{
                background: "transparent",
                border: `1px solid ${btnHovered === "email" ? "rgba(240,235,224,0.35)" : "rgba(240,235,224,0.14)"}`,
                color: btnHovered === "email" ? "#f0ebe0" : "rgba(210,204,190,0.80)",
                transform: btnHovered === "email" ? "translateY(-2px)" : "translateY(0)",
                fontFamily: "'DM Sans', sans-serif",
                textDecoration: "none",
              }}
            >
              whitney@aiwithwhit.com
            </a>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={visible ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="divider-line mb-10"
          />

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex items-center justify-center gap-8"
          >
            {[
              { label: "LinkedIn", href: "#" },
              { label: "AI with Whit", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono-label text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: "rgba(155,109,255,0.6)", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#9b6dff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(155,109,255,0.6)")}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
