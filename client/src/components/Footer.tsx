/* ============================================================
   FOOTER — Obsidian Intelligence
   Minimal dark footer with easter egg hint.
   ============================================================ */

export default function Footer() {
  return (
    <footer
      className="py-8"
      style={{
        background: "rgba(7,4,9,1)",
        borderTop: "1px solid rgba(240,235,224,0.06)",
      }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-semibold" style={{ color: "#f0ebe0" }}>
              W<span className="iridescent-text">J</span>
            </span>
            <span className="font-mono-label text-xs" style={{ color: "rgba(200,192,176,0.3)" }}>
              © 2025 Whitney Johnson
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono-label text-xs" style={{ color: "rgba(200,192,176,0.25)" }}>
              Built with intention
            </span>
            <span
              className="font-mono-label text-xs cursor-default select-none"
              style={{ color: "rgba(200,192,176,0.12)" }}
              title="Try typing 'hire' anywhere on this page"
            >
              ◌
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
