/* ============================================================
   CASE STUDY PAGE — Obsidian Intelligence
   Full case study with overview, research, design, results sections.
   ============================================================ */

import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect } from "react";

const CASE_STUDIES: Record<string, {
  title: string;
  subtitle: string;
  accent: string;
  overview: string;
  background: string;
  previous: string;
  research: string[];
  solution: string;
  results: { metric: string; value: string }[];
  reflection: string;
  tags: string[];
}> = {
  "voc-transformation": {
    title: "VoC Program Transformation",
    subtitle: "From reactive complaints to proactive insight",
    accent: "#9b6dff",
    tags: ["VoC Strategy", "Qualtrics", "Journey Mapping", "CSAT", "CX Design"],
    overview: "A mid-size financial services company was drowning in customer feedback with no system to act on it. CSAT scores were declining, frontline teams felt unheard, and leadership had no visibility into what customers actually needed. I was brought in to redesign the entire feedback architecture.",
    background: "The organization had 6 separate tools collecting feedback: post-call surveys, email NPS, in-app ratings, social monitoring, complaint logs, and a manual spreadsheet process. None of them talked to each other. Insights were delayed by 3+ weeks. No one owned the data.",
    previous: "The previous state was characterized by tool fragmentation, no unified tagging taxonomy, 3-week lag from feedback to insight, no closed-loop follow-up process, and frontline teams who had stopped trusting the data because it never led to action.",
    research: [
      "Conducted 24 stakeholder interviews across CX, operations, product, and leadership to map current pain points",
      "Audited all 6 existing feedback tools and documented data flows, gaps, and duplication",
      "Ran a 2-week shadow study with frontline agents to understand how feedback was actually being used (or ignored)",
      "Benchmarked against 3 competitor VoC programs to identify industry-standard practices",
      "Facilitated a journey mapping workshop with 15 cross-functional participants",
    ],
    solution: "Designed a unified VoC architecture on Qualtrics, consolidating all feedback streams into a single platform with a shared tagging taxonomy. Built a weekly insight report cadence with automated distribution to relevant stakeholders. Implemented a closed-loop follow-up process for detractors. Trained frontline teams on how to use insights in their daily work. Created a governance model with clear ownership and escalation paths.",
    results: [
      { metric: "CSAT Improvement", value: "+40% in 18 months" },
      { metric: "Insight Lag", value: "Reduced from 3 weeks to 48 hours" },
      { metric: "Closed-Loop Rate", value: "68% of detractors followed up within 5 days" },
      { metric: "Stakeholder Adoption", value: "94% of weekly reports opened by leadership" },
      { metric: "Customers Impacted", value: "500,000+" },
    ],
    reflection: "The hardest part wasn't the technology. It was convincing people that the data could be trusted again. Trust had been broken by years of feedback going nowhere. The closed-loop process was the turning point: when customers started getting follow-up calls, and when frontline teams started seeing their feedback actually change decisions, the whole culture shifted.",
  },
  "ai-adoption-workshop": {
    title: "AI Adoption Workshop Series",
    subtitle: "Making AI practical for non-technical teams",
    accent: "#8be9fd",
    tags: ["AI Enablement", "Curriculum Design", "Facilitation", "Change Management"],
    overview: "A 200-person operations team was being told to 'use AI' with no guidance, no training, and no clear use cases. Anxiety was high. Adoption was near zero. I designed and delivered a 6-session workshop series that moved 78% of the team to active AI tool usage within 90 days.",
    background: "The organization had purchased enterprise licenses for several AI tools but had no adoption strategy. Managers were frustrated. Employees were overwhelmed. A previous vendor-led training had failed because it was too technical and too abstract.",
    previous: "Previous training was a 4-hour vendor demo with no hands-on practice, no role-specific examples, and no follow-up. Attendance was mandatory but engagement was low. Post-training survey showed 82% of attendees felt 'not confident' using AI tools.",
    research: [
      "Surveyed 200 team members to understand current AI knowledge, anxiety levels, and specific job tasks they wanted help with",
      "Conducted role analysis to identify the top 3 use cases per job function",
      "Reviewed existing vendor training materials to identify what was working and what wasn't",
      "Interviewed 8 'early adopters' who were already using AI tools to understand what made them successful",
      "Benchmarked against 4 other AI adoption programs in similar industries",
    ],
    solution: "Designed a 6-session progressive curriculum starting with fundamentals and building to role-specific applications. Each session included a 20-minute demo, 30-minute hands-on practice, and 10-minute Q&A. Created role-specific prompt libraries and cheat sheets. Built a peer support Slack channel. Established AI Champions, early adopters who could support their colleagues between sessions.",
    results: [
      { metric: "Tool Adoption", value: "78% active users at 90 days" },
      { metric: "Confidence Score", value: "Increased from 18% to 71% 'confident'" },
      { metric: "Time Saved", value: "Average 4.2 hours/week per active user" },
      { metric: "Session Attendance", value: "91% average across all 6 sessions" },
      { metric: "AI Champions", value: "24 peer supporters trained" },
    ],
    reflection: "The biggest insight was that people weren't afraid of AI. They were afraid of looking stupid in front of their colleagues. Once we made the learning environment safe and the examples relevant to their actual jobs, adoption happened naturally. The peer champion model was the most impactful thing we did.",
  },
  "workflow-redesign": {
    title: "Customer Operations Workflow Redesign",
    subtitle: "Eliminating the manual work that was slowing everything down",
    accent: "#e2c98a",
    tags: ["Workflow Design", "Automation", "n8n", "Salesforce", "Process Mapping"],
    overview: "A customer operations team was spending 40% of their time on manual, repetitive tasks that could be automated. Resolution times were slow, errors were frequent, and team morale was suffering. I audited 12 core workflows and redesigned them with automation and clearer ownership.",
    background: "The team had grown from 15 to 45 people over 3 years but their processes hadn't scaled with them. What worked at 15 people was now creating bottlenecks, errors, and frustration at 45. Leadership knew something was broken but didn't know where to start.",
    previous: "Manual data entry between Salesforce and Zendesk, no automated routing, unclear ownership for edge cases, 3-day average resolution time, 15+ hours per week of manual reporting, and no SLA tracking.",
    research: [
      "Conducted a 2-week workflow audit, shadowing team members across all 12 core processes",
      "Mapped each workflow end-to-end, documenting every manual step, decision point, and handoff",
      "Calculated time spent on each step and identified the highest-value automation opportunities",
      "Interviewed team leads to understand pain points, workarounds, and tribal knowledge",
      "Reviewed error logs and escalation data to identify where failures were most common",
    ],
    solution: "Redesigned 12 workflows with clear ownership, decision trees, and automation where appropriate. Built n8n automations to handle data sync between Salesforce and Zendesk, automated routing based on issue type, and automated reporting. Created SOPs for all redesigned workflows. Ran a 2-week parallel operation period to validate before full cutover.",
    results: [
      { metric: "Handle Time", value: "-32% average handle time" },
      { metric: "Manual Work Eliminated", value: "15 hours/week saved" },
      { metric: "Resolution Time", value: "3 days → same day for 68% of cases" },
      { metric: "Error Rate", value: "-58% data entry errors" },
      { metric: "Team Satisfaction", value: "+24 points on internal survey" },
    ],
    reflection: "The most surprising finding was how much tribal knowledge existed in the team: workarounds and shortcuts that nobody had ever documented. Capturing that knowledge and building it into the official process was as important as the automation itself. The team went from feeling like they were fighting the system to feeling like the system was working for them.",
  },
};

export default function CaseStudy() {
  const [, params] = useRoute("/case-study/:slug");
  const slug = params?.slug ?? "";
  const study = CASE_STUDIES[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#070409" }}>
        <div className="text-center">
          <p className="font-mono-label text-xs mb-4" style={{ color: "rgba(155,109,255,0.7)" }}>404</p>
          <h1 className="font-display text-3xl mb-6" style={{ color: "#f0ebe0" }}>Case study not found</h1>
          <Link href="/">
            <span className="btn-ghost">← Back to portfolio</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#070409" }}>
      {/* Back nav */}
      <div
        className="fixed top-0 left-0 right-0 z-50 py-4"
        style={{ background: "rgba(7,4,9,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(240,235,224,0.06)" }}
      >
        <div className="container">
          <Link href="/">
            <span
              className="font-mono-label text-xs flex items-center gap-2 transition-colors duration-200 w-fit"
              style={{ color: "rgba(210,204,190,0.68)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ebe0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(210,204,190,0.68)")}
            >
              ← Back to portfolio
            </span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="pt-24 pb-16" style={{ borderBottom: "1px solid rgba(240,235,224,0.06)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label block mb-6">Case Study</span>
            <h1
              className="font-display font-semibold leading-tight mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#f0ebe0" }}
            >
              {study.title}
            </h1>
            <p
              className="font-display italic text-xl mb-8"
              style={{ color: study.accent, opacity: 0.85 }}
            >
              {study.subtitle}
            </p>
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono-label text-xs px-3 py-1 rounded-sm"
                  style={{
                    color: "rgba(200,192,176,0.55)",
                    background: "rgba(240,235,224,0.04)",
                    border: "1px solid rgba(240,235,224,0.08)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="container max-w-3xl">
          {[
            { label: "Overview", content: study.overview },
            { label: "Background", content: study.background },
            { label: "Previous State", content: study.previous },
          ].map((section, i) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="mb-12"
            >
              <span className="section-label block mb-4">{section.label}</span>
              <p className="text-base leading-relaxed" style={{ color: "rgba(220,214,200,0.90)" }}>
                {section.content}
              </p>
            </motion.div>
          ))}

          {/* Research */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <span className="section-label block mb-4">Research & Insights</span>
            <div className="space-y-3">
              {study.research.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span style={{ color: study.accent, fontSize: "0.5rem", marginTop: "6px", flexShrink: 0 }}>◆</span>
                  <p className="text-base leading-relaxed" style={{ color: "rgba(220,214,200,0.90)" }}>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <span className="section-label block mb-4">Solution</span>
            <p className="text-base leading-relaxed" style={{ color: "rgba(220,214,200,0.90)" }}>
              {study.solution}
            </p>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <span className="section-label block mb-6">Results</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {study.results.map((result) => (
                <div
                  key={result.metric}
                  className="p-5 rounded-sm"
                  style={{
                    background: "rgba(15,11,20,0.8)",
                    border: `1px solid ${study.accent}25`,
                  }}
                >
                  <div
                    className="font-display text-2xl font-semibold mb-1 iridescent-text"
                  >
                    {result.value}
                  </div>
                  <div className="font-mono-label text-xs" style={{ color: "rgba(210,204,190,0.68)" }}>
                    {result.metric}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Reflection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <span className="section-label block mb-4">Reflection</span>
            <blockquote
              className="border-l-2 pl-6"
              style={{ borderColor: study.accent }}
            >
              <p
                className="font-display text-xl italic leading-relaxed"
                style={{ color: "#f0ebe0" }}
              >
                {study.reflection}
              </p>
            </blockquote>
          </motion.div>

          {/* Back */}
          <Link href="/">
            <span className="btn-ghost">← Back to portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
