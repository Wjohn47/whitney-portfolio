/* ============================================================
   WORK / CASE STUDIES SECTION — Obsidian Intelligence
   Project cards with role-based TLDR, before/after slider, and case study links.
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import type { VisitorType } from "./ChoosePathSection";

const CASE_STUDY_BG = "https://d2xsxph8kpxj0f.cloudfront.net/110102467/Ze9D6rPfroPwfnzFMpwZ4R/whitney-case-study-bg-Zcg6uFHUzcKs7MPFM4EV3P.webp";

const PROJECTS = [
  {
    slug: "voc-transformation",
    number: "01",
    title: "VoC Program Transformation",
    subtitle: "From reactive complaints to proactive insight",
    description: "Redesigned a fragmented feedback system across 500K+ customers into a unified VoC program that drove a 40% CSAT improvement in 18 months.",
    tags: ["VoC Strategy", "Qualtrics", "Journey Mapping", "CSAT"],
    metrics: ["40% CSAT lift", "500K+ customers", "18 months"],
    accent: "#9b6dff",
    tldr: {
      recruiter: "Led end-to-end VoC redesign. Managed cross-functional stakeholders, built measurement framework, and drove 40% CSAT improvement.",
      client: "I can build or fix your VoC program. This project shows how I turn scattered feedback into a system that actually informs decisions.",
      collaborator: "Open to co-creating VoC frameworks for communities and orgs that don't have traditional customer research budgets.",
      explorer: "This is the project I'm most proud of. It started with a spreadsheet and ended with a system that changed how an entire org listened.",
    },
    before: "Feedback scattered across 6 tools, no tagging system, 3-week lag to insights",
    after: "Unified platform, real-time tagging, weekly insight reports, closed-loop follow-up",
  },
  {
    slug: "ai-adoption-workshop",
    number: "02",
    title: "AI Adoption Workshop Series",
    subtitle: "Making AI practical for non-technical teams",
    description: "Designed and delivered a 6-session AI literacy program for a 200-person operations team, resulting in 78% adoption of AI tools within 90 days.",
    tags: ["AI Enablement", "Curriculum Design", "Facilitation", "Change Management"],
    metrics: ["78% tool adoption", "200-person team", "90 days"],
    accent: "#8be9fd",
    tldr: {
      recruiter: "Designed and delivered AI training curriculum for non-technical staff. Measured adoption, iterated on content, and achieved 78% tool usage in 90 days.",
      client: "I can run this workshop for your team. Practical, plain-language, no jargon. People leave knowing how to actually use AI.",
      collaborator: "I'm building a public version of this curriculum through AI with Whit. Let's talk if you want to co-facilitate.",
      explorer: "The hardest part wasn't the AI. It was helping people feel safe enough to try it. That's what this project was really about.",
    },
    before: "Team intimidated by AI tools, no guidance, low confidence, inconsistent usage",
    after: "Structured curriculum, hands-on practice, 78% adoption, ongoing peer support",
  },
  {
    slug: "workflow-redesign",
    number: "03",
    title: "Customer Operations Workflow Redesign",
    subtitle: "Eliminating the manual work that was slowing everything down",
    description: "Audited and redesigned 12 core customer operations workflows, reducing average handle time by 32% and eliminating 15 hours of weekly manual work.",
    tags: ["Workflow Design", "Automation", "n8n", "Salesforce", "Process Mapping"],
    metrics: ["32% AHT reduction", "15 hrs/week saved", "12 workflows"],
    accent: "#e2c98a",
    tldr: {
      recruiter: "Mapped, audited, and redesigned 12 workflows. Implemented automation via n8n and Salesforce. Delivered measurable efficiency gains.",
      client: "I can audit your current workflows and show you exactly where the waste is, and how to fix it.",
      collaborator: "Interested in building open-source workflow templates for small CX teams. Let's connect.",
      explorer: "Every workflow I redesign starts with the same question: why is this step here? Usually nobody knows.",
    },
    before: "Manual data entry, siloed tools, unclear ownership, 3-day resolution time",
    after: "Automated routing, integrated tools, clear ownership, same-day resolution",
  },
];

interface WorkSectionProps {
  visitorType?: VisitorType | null;
}

export default function WorkSection({ visitorType }: WorkSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeSlider, setActiveSlider] = useState<string | null>(null);
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-24 md:py-32 relative"
      style={{ background: "rgba(7,4,9,1)" }}
    >
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-10">
        <img src={CASE_STUDY_BG} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="section-label block mb-4">Selected Work</span>
          <h2
            className="font-display font-semibold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#f0ebe0" }}
          >
            Case studies
          </h2>
          {visitorType && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 font-mono-label text-xs"
              style={{ color: "rgba(155,109,255,0.7)" }}
            >
              Showing summaries tailored for: {visitorType}
            </motion.p>
          )}
        </motion.div>

        {/* Projects */}
        <div className="space-y-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 32 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              className="group rounded-sm overflow-hidden"
              style={{
                background: "rgba(15,11,20,0.7)",
                border: "1px solid rgba(240,235,224,0.07)",
              }}
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span
                        className="font-mono-label text-xs"
                        style={{ color: project.accent, opacity: 0.7 }}
                      >
                        {project.number}
                      </span>
                      <div className="h-px flex-1" style={{ background: `${project.accent}20` }} />
                    </div>

                    <h3
                      className="font-display text-2xl md:text-3xl font-semibold mb-2"
                      style={{ color: "#f0ebe0" }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="font-display italic text-lg mb-4"
                      style={{ color: project.accent, opacity: 0.8 }}
                    >
                      {project.subtitle}
                    </p>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(210,204,190,0.85)" }}>
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono-label text-xs px-2 py-1 rounded-sm"
                          style={{
                            color: "rgba(210,204,190,0.68)",
                            background: "rgba(240,235,224,0.04)",
                            border: "1px solid rgba(240,235,224,0.08)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* TLDR if visitor type selected */}
                    {visitorType && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 rounded-sm mb-5"
                        style={{
                          background: `${project.accent}10`,
                          border: `1px solid ${project.accent}25`,
                        }}
                      >
                        <p className="font-mono-label text-xs mb-2" style={{ color: project.accent }}>
                          TLDR for {visitorType}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(220,214,200,0.92)" }}>
                          {project.tldr[visitorType]}
                        </p>
                      </motion.div>
                    )}

                    <Link href={`/case-study/${project.slug}`}>
                      <span className="btn-ghost text-xs py-2 px-4 inline-flex items-center gap-2">
                        View Case Study
                        <span style={{ color: project.accent }}>→</span>
                      </span>
                    </Link>
                  </div>

                  {/* Right: Metrics + Before/After */}
                  <div className="lg:w-72 space-y-4">
                    {/* Metrics */}
                    <div
                      className="p-4 rounded-sm"
                      style={{ background: "rgba(7,4,9,0.6)", border: "1px solid rgba(240,235,224,0.06)" }}
                    >
                      <p className="section-label mb-3">Results</p>
                      {project.metrics.map((metric) => (
                        <div key={metric} className="flex items-center gap-2 mb-2">
                          <span style={{ color: project.accent, fontSize: "0.5rem" }}>◆</span>
                          <span className="font-display text-base font-semibold" style={{ color: "#f0ebe0" }}>
                            {metric}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Before/After slider */}
                    <div
                      className="p-4 rounded-sm"
                      style={{ background: "rgba(7,4,9,0.6)", border: "1px solid rgba(240,235,224,0.06)" }}
                    >
                      <p className="section-label mb-3">Workflow X-Ray</p>
                      <div className="mb-3">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={sliderValues[project.slug] ?? 0}
                          onChange={(e) => setSliderValues((prev) => ({ ...prev, [project.slug]: Number(e.target.value) }))}
                          className="w-full h-1 rounded-full appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, ${project.accent} ${sliderValues[project.slug] ?? 0}%, rgba(240,235,224,0.1) ${sliderValues[project.slug] ?? 0}%)`,
                          }}
                        />
                        <div className="flex justify-between mt-1">
                          <span className="font-mono-label text-xs" style={{ color: "rgba(210,204,190,0.60)" }}>Before</span>
                          <span className="font-mono-label text-xs" style={{ color: project.accent }}>After</span>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(210,204,190,0.85)" }}>
                        {(sliderValues[project.slug] ?? 0) < 50 ? project.before : project.after}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
