/* ============================================================
   SECTION DIVIDER — Obsidian Intelligence
   Smooth gradient + animated shimmer transitions between sections.
   ============================================================ */

interface SectionDividerProps {
  variant?: "default" | "champagne" | "violet" | "fade";
  flip?: boolean;
}

export default function SectionDivider({ variant = "default", flip = false }: SectionDividerProps) {
  const shimmerColor = variant === "champagne"
    ? "rgba(226,201,138,0.35)"
    : variant === "violet"
    ? "rgba(155,109,255,0.35)"
    : "rgba(139,233,253,0.2)";

  const glowColor = variant === "champagne"
    ? "rgba(226,201,138,0.06)"
    : variant === "violet"
    ? "rgba(155,109,255,0.07)"
    : "rgba(155,109,255,0.04)";

  return (
    <div
      className="relative w-full overflow-hidden pointer-events-none"
      style={{
        height: "96px",
        marginTop: "-48px",
        marginBottom: "-48px",
        zIndex: 10,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "50%",
          background: "linear-gradient(180deg, transparent 0%, rgba(7,4,9,0.5) 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "50%",
          background: "linear-gradient(0deg, transparent 0%, rgba(7,4,9,0.5) 100%)",
        }}
      />

      {/* Ambient glow band */}
      <div
        className="absolute inset-x-0"
        style={{
          top: "40%",
          height: "20%",
          background: `radial-gradient(ellipse 60% 100% at 50% 50%, ${glowColor}, transparent)`,
        }}
      />

      {/* Static hairline */}
      <div
        className="absolute inset-x-0"
        style={{
          top: "50%",
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 30%, ${shimmerColor} 70%, transparent 100%)`,
          opacity: 0.5,
        }}
      />

      {/* Animated shimmer travel */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: 0,
          right: 0,
          height: "1px",
          overflow: "hidden",
        }}
      >
        <div
          className="animate-shimmer-travel"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "30%",
            height: "100%",
            background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
          }}
        />
      </div>
    </div>
  );
}
