/* ============================================================
   CONTACT SECTION — Obsidian Intelligence
   Warm rose/champagne iridescent backdrop with context-aware CTA.
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { VisitorType } from "./ChoosePathSection";
import { toast } from "sonner";

const CONTACT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/110102467/Ze9D6rPfroPwfnzFMpwZ4R/whitney-contact-bg-Qnw5QYkggRPtA7ZijNHba3.webp";

const CTA_BY_PATH: Record<VisitorType, { headline: string; sub: string; button: string }> = {
  recruiter: {
    headline: "Let's talk about the role",
    sub: "I'm actively exploring full-time opportunities. Send me a message and I'll respond within 48 hours.",
    button: "Send a Message",
  },
  client: {
    headline: "Ready to fix what's broken?",
    sub: "Tell me about your CX challenge, AI adoption goal, or workflow problem. Let's figure out if I'm the right fit.",
    button: "Start a Conversation",
  },
  collaborator: {
    headline: "Let's build something together",
    sub: "I'm open to collaborations in AI education, community building, and human-centered tech. Tell me what you're working on.",
    button: "Let's Connect",
  },
  explorer: {
    headline: "You made it to the end",
    sub: "If something resonated, I'd love to hear about it. No agenda required.",
    button: "Say Hello",
  },
};

const DEFAULT_CTA = {
  headline: "Let's talk",
  sub: "Whether you're hiring, need help, or just want to connect, I'm here.",
  button: "Get in Touch",
};

interface ContactSectionProps {
  visitorType?: VisitorType | null;
}

export default function ContactSection({ visitorType }: ContactSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const cta = visitorType ? CTA_BY_PATH[visitorType] : DEFAULT_CTA;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast("Message received. I'll be in touch within 48 hours.", {
      description: "Thank you for reaching out, " + form.name + ".",
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img src={CONTACT_BG} alt="" className="w-full h-full object-cover opacity-60" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(7,4,9,0.7) 0%, rgba(7,4,9,0.5) 50%, rgba(7,4,9,0.85) 100%)" }}
        />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="section-label block mb-6">Contact</span>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={cta.headline}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5 }}
                  className="font-display font-semibold leading-tight mb-6"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f0ebe0" }}
                >
                  {cta.headline}
                </motion.h2>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={cta.sub}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-base leading-relaxed mb-8"
                  style={{ color: "rgba(200,192,176,0.7)" }}
                >
                  {cta.sub}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4"
            >
              {[
                { label: "Email", value: "whitney@aiwithwhit.com", href: "mailto:whitney@aiwithwhit.com" },
                { label: "LinkedIn", value: "linkedin.com/in/whitneyjohnson", href: "#" },
                { label: "AI with Whit", value: "aiwithwhit.com", href: "#" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="font-mono-label text-xs w-20" style={{ color: "rgba(155,109,255,0.7)" }}>
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(210,204,190,0.85)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ebe0")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(210,204,190,0.85)")}
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-sm text-center"
                style={{
                  background: "rgba(15,11,20,0.8)",
                  border: "1px solid rgba(155,109,255,0.25)",
                }}
              >
                <div className="text-3xl mb-4">◈</div>
                <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: "#f0ebe0" }}>
                  Message received
                </h3>
                <p className="text-sm" style={{ color: "rgba(210,204,190,0.85)" }}>
                  I'll be in touch within 48 hours. Talk soon.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8 rounded-sm space-y-5"
                style={{
                  background: "rgba(15,11,20,0.8)",
                  border: "1px solid rgba(240,235,224,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {[
                  { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="section-label block mb-2"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={form[field.id as "name" | "email"]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [field.id]: e.target.value }))}
                      className="w-full px-4 py-3 text-sm rounded-sm outline-none transition-all duration-200"
                      style={{
                        background: "rgba(240,235,224,0.04)",
                        border: "1px solid rgba(240,235,224,0.1)",
                        color: "#f0ebe0",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(155,109,255,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(240,235,224,0.1)")}
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="section-label block mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="What's on your mind?"
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 text-sm rounded-sm outline-none transition-all duration-200 resize-none"
                    style={{
                      background: "rgba(240,235,224,0.04)",
                      border: "1px solid rgba(240,235,224,0.1)",
                      color: "#f0ebe0",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(155,109,255,0.4)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(240,235,224,0.1)")}
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  {cta.button}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
