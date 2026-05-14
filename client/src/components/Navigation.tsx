/* ============================================================
   NAVIGATION — Obsidian Intelligence
   Minimal fixed top nav with scroll-aware background.
   ============================================================ */

import { useEffect, useState } from "react";
import { Link } from "wouter";

interface NavigationProps {
  onAskWhit?: () => void;
}

export default function Navigation({ onAskWhit }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(7, 4, 9, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(240,235,224,0.06)" : "none",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <span
              className="font-display text-xl font-semibold tracking-wide cursor-pointer"
              style={{ color: "#f0ebe0" }}
            >
              W<span className="iridescent-text">J</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="font-mono-label text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: "rgba(200,192,176,0.7)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ebe0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(200,192,176,0.7)")}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={onAskWhit}
              className="btn-primary text-xs py-2 px-4"
            >
              <span className="animate-pulse-glow inline-block w-1.5 h-1.5 rounded-full bg-violet-400 mr-1" />
              Ask Whit
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: "#f0ebe0",
                transform: mobileOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: "#f0ebe0",
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: "#f0ebe0",
                transform: mobileOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-400"
        style={{
          maxHeight: mobileOpen ? "300px" : "0",
          background: "rgba(7,4,9,0.97)",
          borderBottom: mobileOpen ? "1px solid rgba(240,235,224,0.06)" : "none",
        }}
      >
        <div className="container py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="font-mono-label text-xs tracking-widest uppercase text-left transition-colors duration-200"
              style={{ color: "rgba(200,192,176,0.7)" }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { setMobileOpen(false); onAskWhit?.(); }}
            className="btn-primary text-xs py-2 px-4 w-fit mt-2"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-400 mr-1" />
            Ask Whit
          </button>
        </div>
      </div>
    </nav>
  );
}
