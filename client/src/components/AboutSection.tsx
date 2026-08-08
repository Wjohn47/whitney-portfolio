/* ============================================================
   ABOUT SECTION — Obsidian Intelligence
   Asymmetric editorial layout with warm champagne texture background.
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ABOUT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/110102467/Ze9D6rPfroPwfnzFMpwZ4R/whitney-about-texture-GLHth9Ez69mScSrEJcu5Jn.webp";
const HEADSHOT = "/headshotwj.png";

const TIMELINE = [
  { year: "2023 - Present", role: "Founder, AI with Whit", note: "AI education & automation for everyday people" },
  { year: "2021 - 2023", role: "Senior CX Strategist", note: "VoC program design, CSAT improvement, AI integration" },
  { year: "2019 - 2021", role: "Customer Operations Lead", note: "Workflow architecture, team training, process design" },
  { year: "2017 - 2019", role: "CX Analyst & Trainer", note: "Data analysis, customer journey mapping, facilitation" },
];

const TOOLS = [
  "Salesforce", "Zendesk", "Qualtrics", "Medallia", "n8n",
  "ChatGPT", "Claude", "Perplexity", "Manus", "Make",
  "Notion", "Miro", "Figma", "Google Analytics", "Tableau",
  "SQL", "Slack", "Asana",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

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
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "rgba(7,4,9,1)" }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-20">
        <img src={ABOUT_BG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(7,4,9,0.6)" }} />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="section-label block mb-6">About</span>
              <h2
                className="font-display font-semibold leading-tight mb-8"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f0ebe0" }}
              >
                I make AI work
                <br />
                <span style={{ color: "#e2c98a", fontStyle: "italic", fontWeight: 300 }}>
                  for real people
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-5 mb-10"
            >
              <p className="text-base leading-relaxed" style={{ color: "rgba(220,214,200,0.90)" }}>
                I'm Whitney Johnson, a customer experience strategist who fell in love with AI not because of the technology, but because of what it can do for people. I've spent over a decade building systems that help organizations actually understand their customers.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "rgba(210,204,190,0.82)" }}>
                Now I'm applying that same lens to AI: making it accessible, practical, and human. Through <span style={{ color: "#e2c98a" }}>AI with Whit</span>, I teach people how to use AI tools without the overwhelm. Through my consulting work, I help organizations build AI-powered CX systems that don't lose the human touch.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "rgba(210,204,190,0.82)" }}>
                I believe the best AI systems are invisible. They just make things work better. My job is to design those systems and teach the people who run them.
              </p>
            </motion.div>

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="border-l-2 pl-6 mb-10"
              style={{ borderColor: "#9b6dff" }}
            >
              <p
                className="font-display text-xl italic leading-relaxed"
                style={{ color: "#f0ebe0" }}
              >
                "AI is not passive. The people shaping the future will be the ones who understand it deeply enough to question it, build with it, and use it intentionally."
              </p>
            </motion.blockquote>

            {/* Tool stack */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <p className="section-label mb-4">Tool Stack</p>
              <div className="flex flex-wrap gap-2">
                {TOOLS.map((tool) => (
                  <button
                    key={tool}
                    onMouseEnter={() => setHoveredTool(tool)}
                    onMouseLeave={() => setHoveredTool(null)}
                    className="font-mono-label text-xs px-3 py-1.5 rounded-sm transition-all duration-200"
                    style={{
                      color: hoveredTool === tool ? "#f0ebe0" : "rgba(200,192,176,0.55)",
                      background: hoveredTool === tool ? "rgba(155,109,255,0.15)" : "rgba(240,235,224,0.04)",
                      border: `1px solid ${hoveredTool === tool ? "rgba(155,109,255,0.4)" : "rgba(240,235,224,0.08)"}`,
                    }}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Photo + Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Headshot */}
            <div className="relative mb-10">
              <div
                className="relative overflow-hidden rounded-sm"
                style={{
                  aspectRatio: "4 / 5",
                  maxWidth: "320px",
                  boxShadow: "0 0 40px rgba(155,109,255,0.15), 0 0 80px rgba(226,201,138,0.06)",
                  border: "1px solid rgba(240,235,224,0.1)",
                }}
              >
                <img
                  src={HEADSHOT}
                  alt="Whitney Johnson"
                  className="w-full h-full object-cover object-top"
                />
                {/* Subtle iridescent overlay at bottom */}
                <div
                  className="absolute inset-x-0 bottom-0"
                  style={{
                    height: "35%",
                    background: "linear-gradient(to top, rgba(7,4,9,0.65) 0%, transparent 100%)",
                  }}
                />
              </div>
              {/* Decorative accent line */}
              <div
                className="absolute -bottom-3 left-0"
                style={{
                  width: "60px",
                  height: "2px",
                  background: "linear-gradient(90deg, #9b6dff, #8be9fd)",
                }}
              />
            </div>

            <p className="section-label mb-8">Experience</p>
            <div className="space-y-0">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="flex gap-6 group"
                >
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 transition-all duration-300 group-hover:scale-150"
                      style={{ background: "#9b6dff", boxShadow: "0 0 8px rgba(155,109,255,0.5)" }}
                    />
                    {i < TIMELINE.length - 1 && (
                      <div
                        className="w-px flex-1 mt-2"
                        style={{ background: "rgba(155,109,255,0.2)", minHeight: "48px" }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-10">
                    <p className="font-mono-label text-xs mb-1" style={{ color: "#9b6dff" }}>
                      {item.year}
                    </p>
                    <h4
                      className="font-display text-lg font-semibold mb-1 transition-colors duration-200 group-hover:text-champagne"
                      style={{ color: "#f0ebe0" }}
                    >
                      {item.role}
                    </h4>
                    <p className="text-sm" style={{ color: "rgba(210,204,190,0.70)" }}>
                      {item.note}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Education / Certs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-4 p-5 rounded-sm"
              style={{
                background: "rgba(15,11,20,0.6)",
                border: "1px solid rgba(226,201,138,0.15)",
              }}
            >
              <p className="section-label mb-3">Education & Certifications</p>
              <div className="space-y-2">
                {[
                  "Texas Department of Information Resources Certified",
                  "AI Fluency for Educators - Anthropic",
                  "AI Fundamentals - Google & DeepLearning.AI",
                  "Salesforce Certified Administrator",
                  "Qualtrics XM Certified",
                ].map((cert) => (
                  <div key={cert} className="flex items-start gap-2">
                    <span style={{ color: "#e2c98a", fontSize: "0.6rem", marginTop: "4px" }}>◆</span>
                    <p className="text-sm" style={{ color: "rgba(210,204,190,0.82)" }}>{cert}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
