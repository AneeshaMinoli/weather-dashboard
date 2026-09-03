export interface HourBar { time: string; chanceOfRain: number }

export default function RainChanceChart({ hours }: { hours: HourBar[] }) {
  const sample = hours.filter((_, i) => i % 3 === 0).slice(0, 6);
  const max = 100;
  return (
    <div className="flex items-end justify-between gap-2 h-16">
      {sample.map((h, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full bg-white/10 rounded-full h-12 flex items-end overflow-hidden">
            <div
              className="w-full bg-emerald-400/80 rounded-full"
              style={{ height: `${Math.max(6, (h.chanceOfRain / max) * 100)}%` }}
            />
          </div>
          <span className="text-[9px] opacity-60">{h.time}</span>
        </div>
      ))}
    </div>
  );
}