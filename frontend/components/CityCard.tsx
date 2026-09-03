import WeatherIcon from "./WeatherIcon";
import { IconType } from "@/lib/weatherPresets";

export default function CityCard({ name, condition, temp, icon }: { name: string; condition: string; temp: string; icon: IconType }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex justify-between items-center">
      <div>
        <p className="text-xs opacity-70 mb-0.5">Sri Lanka</p>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs opacity-70">{condition}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-2xl font-semibold">{temp}</p>
        <WeatherIcon type={icon} size={22} />
      </div>
    </div>
  );
}