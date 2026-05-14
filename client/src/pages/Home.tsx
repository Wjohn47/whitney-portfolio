/* ============================================================
   HOME PAGE — Obsidian Intelligence
   Assembles all portfolio sections with state management for
   visitor type, Ask Whit modal, and easter eggs.
   ============================================================ */

import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ChoosePathSection, { type VisitorType } from "@/components/ChoosePathSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import AskWhitModal from "@/components/AskWhitModal";
import Footer from "@/components/Footer";
import { useEasterEggs } from "@/hooks/useEasterEggs";

export default function Home() {
  const [askWhitOpen, setAskWhitOpen] = useState(false);
  const [visitorType, setVisitorType] = useState<VisitorType | null>(null);
  const pathRef = useRef<HTMLDivElement>(null);

  // Activate easter eggs
  useEasterEggs();

  const handleChoosePath = () => {
    document.querySelector("#path")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectPath = (type: VisitorType) => {
    setVisitorType(type);
    // Scroll to work after a brief delay
    setTimeout(() => {
      document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <div className="min-h-screen" style={{ background: "#070409" }}>
      {/* Navigation */}
      <Navigation onAskWhit={() => setAskWhitOpen(true)} />

      {/* Hero */}
      <HeroSection
        onAskWhit={() => setAskWhitOpen(true)}
        onChoosePath={handleChoosePath}
      />

      {/* Choose Your Path */}
      <div ref={pathRef}>
        <ChoosePathSection
          onSelect={handleSelectPath}
          selectedPath={visitorType}
        />
      </div>

      {/* Work / Case Studies */}
      <WorkSection visitorType={visitorType} />

      {/* Expertise (MagicBento) */}
      <ExpertiseSection />

      {/* About */}
      <AboutSection />

      {/* Contact */}
      <ContactSection visitorType={visitorType} />

      {/* Footer */}
      <Footer />

      {/* Ask Whit Modal */}
      <AskWhitModal
        open={askWhitOpen}
        onClose={() => setAskWhitOpen(false)}
        onSelectPath={setVisitorType}
      />
    </div>
  );
}
