"use client";

export default function ModeToggle({ mode, onChange }: { mode: "live" | "demo"; onChange: (m: "live" | "demo") => void }) {
  return (
    <div className="flex bg-white/15 backdrop-blur-md border border-white/30 rounded-full p-1 text-sm">
      <button
        onClick={() => onChange("live")}
        className={`px-3 py-1 rounded-full ${mode === "live" ? "bg-white text-black" : "text-white"}`}
      >
        Live
      </button>
      <button
        onClick={() => onChange("demo")}
        className={`px-3 py-1 rounded-full ${mode === "demo" ? "bg-white text-black" : "text-white"}`}
      >
        Demo
      </button>
    </div>
  );
}