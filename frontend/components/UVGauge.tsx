export default function UVGauge({ uv }: { uv: number }) {
  const pct = Math.min(uv / 11, 1);
  const circumference = 2 * Math.PI * 40;
  const arc = circumference * 0.75;
  const offset = arc - pct * arc;
  const label = uv <= 2 ? "Low" : uv <= 5 ? "Moderate" : uv <= 7 ? "High" : uv <= 10 ? "Very High" : "Extreme";

  return (
    <div className="flex flex-col items-center justify-center h-16">
      <svg viewBox="0 0 100 100" className="w-20 h-20 -mt-2">
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" strokeDasharray={`${arc} ${circumference}`} strokeDashoffset="0" strokeLinecap="round" transform="rotate(135 50 50)" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#34d399" strokeWidth="8" strokeDasharray={`${arc} ${circumference}`} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(135 50 50)" />
        <text x="50" y="52" textAnchor="middle" fontSize="20" fill="white" fontWeight="600">{uv}/10</text>
      </svg>
      <span className="text-[10px] opacity-70 -mt-1">{label}</span>
    </div>
  );
}