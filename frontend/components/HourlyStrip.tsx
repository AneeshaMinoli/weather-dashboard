import WeatherIcon from "./WeatherIcon";
import { IconType } from "@/lib/weatherPresets";

export interface HourlyPoint { time: string; temp: string; icon: IconType; chanceOfRain: number }

export default function HourlyStrip({ hours }: { hours: HourlyPoint[] }) {
  if (!hours || hours.length === 0) return null;

  return (
    <div className="flex gap-4 overflow-x-auto pb-1 [scrollbar-width:thin]">
      {hours.map((h, i) => (
        <div key={i} className="flex flex-col items-center gap-1 min-w-[52px] shrink-0">
          <span className="text-xs opacity-70">{i === 0 ? "Now" : h.time}</span>
          <WeatherIcon type={h.icon} size={20} />
          <span className="text-sm font-medium">{h.temp}</span>
          {h.chanceOfRain > 0 && <span className="text-[10px] opacity-60">{h.chanceOfRain}%</span>}
        </div>
      ))}
    </div>
  );
}