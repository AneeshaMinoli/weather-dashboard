export default function WaveLine() {
  return (
    <svg viewBox="0 0 700 60" className="w-full h-10 -mb-2" preserveAspectRatio="none">
      <path
        d="M0,30 C60,10 120,10 180,30 C240,50 300,50 350,30 C400,10 460,10 520,30 C580,50 640,50 700,30"
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
      />
    </svg>
  );
}