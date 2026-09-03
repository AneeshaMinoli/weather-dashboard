"use client";

import { useState, useEffect } from "react";
import { weatherPresets, PresetKey, WeatherPreset, IconType } from "@/lib/weatherPresets";
import { otherCities as demoCities } from "@/lib/otherCities";
import VideoBackground from "@/components/VideoBackground";
import DemoButton from "@/components/DemoButton";
import ModeToggle from "@/components/ModeToggle";
import CityCard from "@/components/CityCard";
import ForecastStrip, { ForecastDay } from "@/components/ForecastStrip";
import { MapPin, Wind, Droplet, Gauge } from "lucide-react";

interface CityData { name: string; condition: string; temp: string; icon: IconType }

export default function Home() {
  const [mode, setMode] = useState<"live" | "demo">("demo");
  const [demoKey, setDemoKey] = useState<PresetKey>("rainy");
  const [liveData, setLiveData] = useState<WeatherPreset | null>(null);
  const [liveForecast, setLiveForecast] = useState<ForecastDay[]>([]);
  const [liveCities, setLiveCities] = useState<CityData[]>([]);

  useEffect(() => {
    if (mode !== "live") return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;

      const [weatherRes, forecastRes, citiesRes] = await Promise.all([
        fetch(`http://localhost:5000/api/weather?lat=${lat}&lng=${lng}`),
        fetch(`http://localhost:5000/api/forecast?lat=${lat}&lng=${lng}`),
        fetch(`http://localhost:5000/api/cities`),
      ]);

      const mapped = await weatherRes.json();
      const forecast = await forecastRes.json();
      const cities = await citiesRes.json();

      const visual = weatherPresets[mapped.presetKey as PresetKey] ?? weatherPresets.day;
      setLiveData({ ...visual, temp: mapped.temp, condition: mapped.condition, description: mapped.description, humidity: mapped.humidity, precipitation: mapped.precipitation, wind: mapped.wind });
      setLiveForecast(forecast.days ?? []);
      setLiveCities(cities.cities ?? []);
    });
  }, [mode]);

  const data = mode === "demo" ? weatherPresets[demoKey] : liveData ?? weatherPresets[demoKey];
  const forecastDays = mode === "live" ? liveForecast : undefined;
  const cities = mode === "live" && liveCities.length > 0 ? liveCities : demoCities;

  return (
    <main className="relative min-h-screen overflow-hidden text-white p-8">
      <VideoBackground src={data.videoSrc} poster={data.poster} />

      <div className="relative z-[5] flex justify-between items-start">
        <span className="text-xs bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
          Weather forecast
        </span>
        <div className="flex gap-2">
          <ModeToggle mode={mode} onChange={setMode} />
          {mode === "demo" && <DemoButton active={demoKey} onSelect={setDemoKey} />}
        </div>
      </div>

      <div className="relative z-[5] flex flex-col md:flex-row justify-between gap-8 mt-8">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-5xl font-semibold leading-[1.1] mb-4 whitespace-pre-line">{data.headline}</h1>
            <p className="text-sm opacity-80 max-w-[420px] leading-relaxed">{data.description}</p>
          </div>
          <div className="mt-16">
            <ForecastStrip days={forecastDays} />
          </div>
        </div>

        <div className="w-full md:w-[260px] flex flex-col gap-3 shrink-0">
          <div className="bg-white/15 backdrop-blur-xl border border-white/35 rounded-2xl p-5">
            <div className="flex items-center gap-1.5 text-sm opacity-85 mb-2">
              <MapPin size={14} />
              <span>Central Kandy</span>
            </div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-5xl font-semibold">{data.temp}</span>
              <span className="text-2xl opacity-70">C</span>
            </div>
            <div className="flex gap-4 text-xs opacity-90">
              <span className="flex items-center gap-1"><Wind size={14} />{data.wind}</span>
              <span className="flex items-center gap-1"><Droplet size={14} />{data.precipitation}</span>
              <span className="flex items-center gap-1"><Gauge size={14} />{data.humidity}</span>
            </div>
          </div>
          {cities.map((c) => (
            <CityCard key={c.name} {...c} />
          ))}
        </div>
      </div>
    </main>
  );
}