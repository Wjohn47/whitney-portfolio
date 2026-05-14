/* ============================================================
   EASTER EGGS HOOK — Obsidian Intelligence
   Listens for:
   1. Typing "hire" anywhere → shows hiring easter egg toast
   2. Typing "whit" anywhere → triggers a special greeting
   3. Konami code → unlocks "secret mode"
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

export function useEasterEggs() {
  const typedRef = useRef<string>("");
  const konamiRef = useRef<string[]>([]);
  const [secretMode, setSecretMode] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Konami code
      konamiRef.current = [...konamiRef.current, e.key].slice(-KONAMI.length);
      if (konamiRef.current.join(",") === KONAMI.join(",")) {
        setSecretMode(true);
        toast("✦ Secret mode unlocked", {
          description: "You found the hidden layer. Welcome to the real portfolio.",
          duration: 6000,
        });
        konamiRef.current = [];
        return;
      }

      // Typed keyword detection
      if (e.key.length === 1) {
        typedRef.current = (typedRef.current + e.key).slice(-10).toLowerCase();

        if (typedRef.current.includes("hire")) {
          typedRef.current = "";
          toast("👀 You typed 'hire'", {
            description: "Smart. Let's talk — scroll to the contact section or click Ask Whit.",
            duration: 7000,
            action: {
              label: "Contact",
              onClick: () => {
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              },
            },
          });
        }

        if (typedRef.current.includes("whit")) {
          typedRef.current = "";
          toast("◈ Hey, that's me!", {
            description: "Whitney Johnson — AI Operations & CX Strategist. Nice to meet you.",
            duration: 5000,
          });
        }

        if (typedRef.current.includes("blaq")) {
          typedRef.current = "";
          toast("◆ BLAQ HAUS", {
            description: "You know about BLAQ HAUS? We should definitely talk.",
            duration: 6000,
          });
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return { secretMode };
}
