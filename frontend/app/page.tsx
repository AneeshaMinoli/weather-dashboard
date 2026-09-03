"use client";

import { useState, useEffect, useCallback } from "react";
import { weatherPresets, PresetKey, WeatherPreset, IconType } from "@/lib/weatherPresets";
import { otherCities as demoCities } from "@/lib/otherCities";
import VideoBackground from "@/components/VideoBackground";
import DemoButton from "@/components/DemoButton";
import ModeToggle from "@/components/ModeToggle";
import LocationSearch from "@/components/LocationSearch";
import CityCard from "@/components/CityCard";
import ForecastStrip, { ForecastDay } from "@/components/ForecastStrip";
import WaveLine from "@/components/WaveLine";
import { MapPin, Wind, Droplet, Gauge, Clock } from "lucide-react";

interface CityData { name: string; condition: string; temp: string; icon: IconType }

export default function Home() {
  const [mode, setMode] = useState<"live" | "demo">("demo");
  const [demoKey, setDemoKey] = useState<PresetKey>("rainy");
  const [liveData, setLiveData] = useState<WeatherPreset | null>(null);
  const [liveForecast, setLiveForecast] = useState<ForecastDay[]>([]);
  const [liveCities, setLiveCities] = useState<CityData[]>([]);
  const [city, setCity] = useState("Kandy");
  const [localTime, setLocalTime] = useState<string | null>(null);
  const [searchError, setSearchError] = useState("");
  const [selectedDay, setSelectedDay] = useState(0);

  const fetchLiveWeather = useCallback(async (cityName: string) => {
    setSearchError("");
    setSelectedDay(0);
    try {
      const [weatherRes, forecastRes, citiesRes] = await Promise.all([
        fetch(`http://localhost:5000/api/weather?city=${encodeURIComponent(cityName)}`),
        fetch(`http://localhost:5000/api/forecast?city=${encodeURIComponent(cityName)}`),
        fetch(`http://localhost:5000/api/cities`),
      ]);
      const mapped = await weatherRes.json();
      if (!weatherRes.ok) { setSearchError(mapped.error ?? "Place not found"); return; }
      const forecast = await forecastRes.json();
      const cities = await citiesRes.json();
      const visual = weatherPresets[mapped.presetKey as PresetKey] ?? weatherPresets.day;
      setLiveData({ ...visual, temp: mapped.temp, condition: mapped.condition, description: mapped.description, humidity: mapped.humidity, precipitation: mapped.precipitation, wind: mapped.wind });
      setLiveForecast(forecast.days ?? []);
      setLiveCities(cities.cities ?? []);
      setCity(mapped.locationName);
      setLocalTime(mapped.localTime);
    } catch {
      setSearchError("Couldn't reach the server");
    }
  }, []);

  useEffect(() => {
    if (mode !== "live") return;
    fetchLiveWeather(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const baseData = mode === "demo" ? weatherPresets[demoKey] : liveData ?? weatherPresets[demoKey];
  const forecastDays = mode === "live" ? liveForecast : undefined;
  const cities = mode === "live" && liveCities.length > 0 ? liveCities : demoCities;
  const selectedForecast = mode === "live" && selectedDay > 0 ? liveForecast[selectedDay] : null;
  const data = selectedForecast
    ? { ...baseData, temp: selectedForecast.temp, condition: selectedForecast.condition ?? baseData.condition, humidity: selectedForecast.humidity ?? baseData.humidity, precipitation: selectedForecast.precipitation ?? baseData.precipitation, wind: selectedForecast.wind ?? baseData.wind, headline: selectedForecast.condition ?? baseData.headline, ...(weatherPresets[selectedForecast.presetKey as PresetKey] ? { videoSrc: weatherPresets[selectedForecast.presetKey as PresetKey].videoSrc, poster: weatherPresets[selectedForecast.presetKey as PresetKey].poster } : {}) }
    : baseData;

  return (
    <main className="relative h-screen overflow-hidden text-white">
      <VideoBackground src={data.videoSrc} poster={data.poster} />

      <div className="relative z-30 h-full flex flex-col justify-between p-6 md:p-10">
        <div className="flex justify-between items-start flex-wrap gap-3">
          <span className="text-xs bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
            Weather forecast
          </span>
          <div className="flex gap-2 items-center flex-wrap">
            {mode === "live" && <LocationSearch onSelect={(name) => fetchLiveWeather(name)} />}
            <ModeToggle mode={mode} onChange={setMode} />
            {mode === "demo" && <DemoButton active={demoKey} onSelect={setDemoKey} />}
          </div>
        </div>
        {searchError && <p className="text-xs text-red-300">{searchError}</p>}

        <div className="flex-1 flex items-start justify-between gap-8 mt-4">
          <div className="max-w-[480px]">
            <h1 className="text-6xl md:text-7xl font-semibold leading-[1.05] mb-5 whitespace-pre-line">{data.headline}</h1>
            <p className="text-sm md:text-base opacity-80 leading-relaxed">{data.description}</p>
          </div>

          <div className="w-full md:w-[260px] flex flex-col gap-3 shrink-0">
            <div className="bg-white/15 backdrop-blur-xl border border-white/35 rounded-2xl p-5">
              <div className="flex items-center gap-1.5 text-sm opacity-85 mb-1">
                <MapPin size={14} />
                <span>{mode === "live" ? city : "Central Kandy"}</span>
              </div>
              {mode === "live" && localTime && (
                <div className="flex items-center gap-1.5 text-xs opacity-60 mb-2">
                  <Clock size={12} />
                  <span>{localTime.split(" ")[1]} · {localTime.split(" ")[0]}</span>
                </div>
              )}
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

        <div>
          <WaveLine />
          <ForecastStrip days={forecastDays} activeDay={selectedDay} onSelectDay={setSelectedDay} />
        </div>
      </div>
    </main>
  );
}