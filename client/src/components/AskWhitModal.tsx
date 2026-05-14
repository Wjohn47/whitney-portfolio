/* ============================================================
   ASK WHIT MODAL — Obsidian Intelligence
   Interactive AI-style guide that routes visitors to relevant content.
   ============================================================ */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { VisitorType } from "./ChoosePathSection";

const QUESTIONS = [
  "What kind of work do you do?",
  "Are you open to full-time roles?",
  "What AI tools do you work with?",
  "Can you help my team adopt AI?",
  "What does a VoC program look like?",
  "How do I contact you?",
];

const ANSWERS: Record<string, string> = {
  "What kind of work do you do?": "I work at the intersection of AI, customer experience, and operations. I build VoC programs, design AI adoption workshops, redesign workflows, and help organizations understand their customers better. Think of me as the person who makes complex systems feel simple.",
  "Are you open to full-time roles?": "Yes, I'm actively exploring full-time opportunities in AI enablement, CX strategy, product operations, and AI training roles. I'm especially interested in companies that are serious about using AI responsibly and want someone who can bridge the gap between technical teams and real customers.",
  "What AI tools do you work with?": "I work with ChatGPT, Claude, n8n for automation, Notion AI, and various AI-powered CX tools. I also teach others how to use these tools through my AI with Whit platform. I'm tool-agnostic. I care more about solving the right problem than using the trendiest stack.",
  "Can you help my team adopt AI?": "Absolutely. I've designed and delivered AI literacy programs for teams of 10 to 200+. My approach is practical, plain-language, and hands-on. No jargon, no hype. Just real skills people can use the next day. Reach out through the contact section to talk about what your team needs.",
  "What does a VoC program look like?": "A good VoC program starts with listening architecture (where and how you collect feedback) and ends with a closed-loop system that actually changes decisions. I've built programs from scratch and redesigned broken ones. The key is making sure insights reach the people who can act on them.",
  "How do I contact you?": "Scroll down to the contact section, or click the 'Let's Talk' button. You can also reach me at whitney@aiwithwhit.com. I respond within 48 hours.",
};

interface AskWhitModalProps {
  open: boolean;
  onClose: () => void;
  onSelectPath?: (type: VisitorType) => void;
}

export default function AskWhitModal({ open, onClose, onSelectPath }: AskWhitModalProps) {
  const [messages, setMessages] = useState<{ role: "whit" | "user"; text: string }[]>([
    { role: "whit", text: "Hey, I'm Whit. What are you trying to understand? Ask me anything, or pick a question below." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const answer = ANSWERS[text] || "Great question. I'd love to tell you more in person. Scroll down to the contact section and let's set up a conversation.";
      setMessages((prev) => [...prev, { role: "whit", text: answer }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(7,4,9,0.85)", backdropFilter: "blur(8px)" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-x-4 bottom-4 md:inset-auto md:right-6 md:bottom-6 md:w-[420px] z-50 rounded-sm overflow-hidden"
            style={{
              background: "rgba(15,11,20,0.97)",
              border: "1px solid rgba(155,109,255,0.25)",
              boxShadow: "0 24px 80px rgba(155,109,255,0.15), 0 0 0 1px rgba(155,109,255,0.1)",
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid rgba(240,235,224,0.07)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(155,109,255,0.2)", border: "1px solid rgba(155,109,255,0.4)" }}
                >
                  <span className="animate-pulse-glow inline-block w-2 h-2 rounded-full bg-violet-400" />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold" style={{ color: "#f0ebe0" }}>Ask Whit</p>
                  <p className="font-mono-label text-xs" style={{ color: "rgba(155,109,255,0.7)" }}>AI Portfolio Guide</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded-sm transition-colors duration-200"
                style={{ color: "rgba(200,192,176,0.5)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ebe0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(200,192,176,0.5)")}
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[85%] px-4 py-3 rounded-sm text-sm leading-relaxed"
                    style={
                      msg.role === "whit"
                        ? {
                            background: "rgba(155,109,255,0.1)",
                            border: "1px solid rgba(155,109,255,0.2)",
                            color: "rgba(200,192,176,0.9)",
                          }
                        : {
                            background: "rgba(240,235,224,0.08)",
                            border: "1px solid rgba(240,235,224,0.1)",
                            color: "#f0ebe0",
                          }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-3 rounded-sm flex gap-1 items-center"
                    style={{ background: "rgba(155,109,255,0.1)", border: "1px solid rgba(155,109,255,0.2)" }}
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-violet-400"
                        style={{ animation: `pulse-glow 1.2s ease-in-out ${i * 0.2}s infinite` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick questions */}
            <div
              className="px-5 py-3 overflow-x-auto"
              style={{ borderTop: "1px solid rgba(240,235,224,0.06)" }}
            >
              <div className="flex gap-2 pb-1" style={{ width: "max-content" }}>
                {QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="font-mono-label text-xs px-3 py-1.5 rounded-sm whitespace-nowrap transition-all duration-200"
                    style={{
                      color: "rgba(200,192,176,0.6)",
                      background: "rgba(240,235,224,0.04)",
                      border: "1px solid rgba(240,235,224,0.08)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#f0ebe0";
                      e.currentTarget.style.borderColor = "rgba(155,109,255,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(200,192,176,0.6)";
                      e.currentTarget.style.borderColor = "rgba(240,235,224,0.08)";
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div
              className="px-5 py-4"
              style={{ borderTop: "1px solid rgba(240,235,224,0.07)" }}
            >
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 px-4 py-2.5 text-sm rounded-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(240,235,224,0.05)",
                    border: "1px solid rgba(240,235,224,0.1)",
                    color: "#f0ebe0",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(155,109,255,0.4)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(240,235,224,0.1)")}
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-sm transition-all duration-200"
                  style={{
                    background: "rgba(155,109,255,0.2)",
                    border: "1px solid rgba(155,109,255,0.4)",
                    color: "#f0ebe0",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(155,109,255,0.35)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(155,109,255,0.2)")}
                >
                  →
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
