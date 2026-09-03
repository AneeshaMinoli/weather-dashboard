export interface WindBar { time: string; windKph: number }

export default function WindChart({ hours }: { hours: WindBar[] }) {
  const sample = hours.slice(0, 10);
  const max = Math.max(...sample.map((h) => h.windKph), 10);
  return (
    <div className="flex items-end justify-between gap-1 h-16">
      {sample.map((h, i) => (
        <div
          key={i}
className={`flex-1 rounded-full ${i === 2 ? "bg-emerald-400" : "bg-white/40"}`}          style={{ height: `${Math.max(8, (h.windKph / max) * 100)}%` }}
        />
      ))}
    </div>
  );
}