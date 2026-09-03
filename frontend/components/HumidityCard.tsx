import { CloudRain } from "lucide-react";

export default function HumidityCard({ humidity }: { humidity: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-16 gap-1">
      <CloudRain size={28} className="opacity-80" />
      <span className="text-lg font-semibold">{humidity}</span>
    </div>
  );
}