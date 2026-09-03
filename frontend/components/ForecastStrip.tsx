import WeatherIcon from "./WeatherIcon";
import { IconType } from "@/lib/weatherPresets";

export interface ForecastDay {
  label: string; temp: string; icon: IconType; condition?: string;
  presetKey?: string; humidity?: string; precipitation?: string; wind?: string;
}

const fallbackDays: ForecastDay[] = [
  { label: "Sunday", temp: "11°", icon: "cloud" },
  { label: "Monday", temp: "13°", icon: "cloud" },
  { label: "Tuesday", temp: "14°", icon: "cloud-sun" },
  { label: "Wednesday", temp: "10°", icon: "rain" },
  { label: "Thursday", temp: "19°", icon: "sun" },
  { label: "Friday", temp: "12°", icon: "cloud" },
];

export default function ForecastStrip({
  days, activeDay = 0, onSelectDay,
}: { days?: ForecastDay[]; activeDay?: number; onSelectDay?: (i: number) => void }) {
  const data = days && days.length > 0 ? days : fallbackDays;
  return (
    <div className="flex justify-between gap-4">
      {data.map((d, i) => (
        <button
          key={d.label + i}
          onClick={() => onSelectDay?.(i)}
          className="text-center bg-transparent border-none cursor-pointer"
        >
          <div className={`flex items-center gap-1.5 justify-center mb-1 ${i === activeDay ? "text-lg font-semibold" : "text-base opacity-70"}`}>
            <span>{d.temp}</span>
            <WeatherIcon type={d.icon} size={16} />
          </div>
          <p className={`text-xs ${i === activeDay ? "font-semibold opacity-100" : "opacity-60"}`}>{d.label}</p>
        </button>
      ))}
    </div>
  );
}