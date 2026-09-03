import WeatherIcon from "./WeatherIcon";
import { IconType } from "@/lib/weatherPresets";
import { MapPin } from "lucide-react";

export default function WeatherNowCard({
  location, temp, feelsLike, high, low, icon,
}: { location: string; temp: string; feelsLike?: string; high?: string | null; low?: string | null; icon: IconType }) {
  return (
    <div className="bg-black/30 backdrop-blur-xl border border-white/15 rounded-3xl p-6 h-full flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1.5 text-sm opacity-85 bg-white/10 px-3 py-1 rounded-full w-fit">
          <MapPin size={13} />
          <span>{location}</span>
        </div>
        <WeatherIcon type={icon} size={44} />
      </div>
      <div>
        <p className="text-xs opacity-60 mb-1">Weather Now</p>
        <div className="flex items-baseline gap-2">
          <span className="text-6xl font-semibold">{temp}</span>
        </div>
        {feelsLike && <p className="text-xs opacity-60 mt-1">Feels like {feelsLike}</p>}
        {(high || low) && (
          <p className="text-xs opacity-70 mt-2">High: {high ?? "—"} &nbsp; Low: {low ?? "—"}</p>
        )}
      </div>
    </div>
  );
}