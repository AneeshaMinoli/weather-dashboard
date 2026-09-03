import WeatherIcon from "./WeatherIcon";
import { IconType } from "@/lib/weatherPresets";

export interface HourPill { time: string; temp: string; icon: IconType }

export default function TodayWeekCard({
  hours, sunrise, sunset, dayLength,
}: { hours: HourPill[]; sunrise: string | null; sunset: string | null; dayLength: string | null }) {
  return (
    <div className="bg-black/30 backdrop-blur-xl border border-white/15 rounded-3xl p-5 flex gap-4 h-full">
      <div className="flex-1 flex flex-col">
        <p className="text-sm opacity-80 mb-3">Today / Week</p>
        <div className="flex gap-2 flex-1">
          {hours.slice(0, 5).map((h, i) => (
            <div key={i} className="flex-1 bg-white/10 rounded-2xl p-2 flex flex-col items-center justify-center gap-1">
              <span className="text-[10px] opacity-60">{i === 0 ? "Now" : h.time}</span>
              <WeatherIcon type={h.icon} size={18} />
              <span className="text-sm font-medium">{h.temp}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[110px] bg-white/10 rounded-2xl p-3 flex flex-col justify-between text-xs shrink-0">
        <div>
          <p className="opacity-60 mb-0.5">Sunrise</p>
          <p className="font-medium mb-2">{sunrise ?? "—"}</p>
          <p className="opacity-60 mb-0.5">Sunset</p>
          <p className="font-medium mb-2">{sunset ?? "—"}</p>
        </div>
        <div>
          <p className="opacity-60 mb-0.5">Day Length</p>
          <p className="font-medium">{dayLength ?? "—"}</p>
        </div>
      </div>
    </div>
  );
}