"use client";

import { useState } from "react";
import { weatherPresets, PresetKey } from "@/lib/weatherPresets";

export default function DemoButton({ active, onSelect }: { active: PresetKey | null; onSelect: (key: PresetKey) => void }) {
  const [open, setOpen] = useState(false);
  const keys = Object.keys(weatherPresets) as PresetKey[];

  return (
    <div className="relative z-10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="px-4 py-2 rounded-full border border-white/40 bg-white/15 backdrop-blur-md text-white text-sm"
      >
        {active ? `Demo: ${weatherPresets[active].label}` : "Demo mode"}
      </button>

      {open && (
<div className="absolute top-[calc(100%+8px)] right-0 bg-black/85 backdrop-blur-xl border border-white/20 rounded-2xl p-2 grid grid-cols-2 gap-1.5 min-w-[220px]">          {keys.map((k) => (
            <button
              key={k}
              onClick={() => { onSelect(k); setOpen(false); }}
              className={`px-2.5 py-2 rounded-lg text-left text-sm text-white ${active === k ? "bg-white/25" : "hover:bg-white/10"}`}
            >
              {weatherPresets[k].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}