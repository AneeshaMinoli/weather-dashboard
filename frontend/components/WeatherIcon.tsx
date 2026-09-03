import { Sun, Cloud, CloudSun, CloudRain, CloudLightning, Wind, Moon } from "lucide-react";
import { IconType } from "@/lib/weatherPresets";

const icons = { sun: Sun, cloud: Cloud, "cloud-sun": CloudSun, rain: CloudRain, storm: CloudLightning, wind: Wind, moon: Moon };

export default function WeatherIcon({ type, size = 20 }: { type: IconType; size?: number }) {
  const Icon = icons[type];
  return <Icon size={size} strokeWidth={1.75} />;
}