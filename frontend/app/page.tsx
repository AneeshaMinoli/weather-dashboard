"use client";

import { useState, useEffect, useCallback } from "react";
import { weatherPresets, PresetKey, WeatherPreset, IconType } from "@/lib/weatherPresets";
import { otherCities as demoCities } from "@/lib/otherCities";
import VideoBackground from "@/components/VideoBackground";
import DemoButton from "@/components/DemoButton";
import ModeToggle from "@/components/ModeToggle";
import LocationSearch from "@/components/LocationSearch";
import CityCard from "@/components/CityCard";
import WeatherNowCard from "@/components/WeatherNowCard";
import TodayWeekCard, { HourPill } from "@/components/TodayWeekCard";
import RainChanceChart, { HourBar } from "@/components/RainChanceChart";
import UVGauge from "@/components/UVGauge";
import WindChart, { WindBar } from "@/components/WindChart";
import HumidityCard from "@/components/HumidityCard";
import AuthForm from "@/components/AuthForm";
import { Toast, ConfirmDialog } from "@/components/Toast";

interface CityData { name: string; condition: string; temp: string; icon: IconType }
interface HourFull extends HourPill, HourBar, WindBar { }

export default function Home() {
  const [mode, setMode] = useState<"live" | "demo">("demo");
  const [demoKey, setDemoKey] = useState<PresetKey>("rainy");
  const [liveData, setLiveData] = useState<(WeatherPreset & { feelsLike?: string; uv?: number }) | null>(null);
  const [liveHourly, setLiveHourly] = useState<HourFull[]>([]);
  const [liveCities, setLiveCities] = useState<CityData[]>([]);
  const [city, setCity] = useState("Kandy");
  const [sunrise, setSunrise] = useState<string | null>(null);
  const [sunset, setSunset] = useState<string | null>(null);
  const [dayLength, setDayLength] = useState<string | null>(null);
  const [highToday, setHighToday] = useState<string | null>(null);
  const [lowToday, setLowToday] = useState<string | null>(null);
  const [searchError, setSearchError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const fetchLiveWeather = useCallback(async (cityName: string) => {
    setSearchError("");
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
      setLiveData({ ...visual, temp: mapped.temp, condition: mapped.condition, description: mapped.description, humidity: mapped.humidity, precipitation: mapped.precipitation, wind: mapped.wind, feelsLike: mapped.feelsLike, uv: mapped.uv });
      setLiveHourly(forecast.hourly ?? []);
      setLiveCities(cities.cities ?? []);
      setCity(mapped.locationName);
      setSunrise(forecast.sunrise);
      setSunset(forecast.sunset);
      setDayLength(forecast.dayLength);
      setHighToday(forecast.highToday);
      setLowToday(forecast.lowToday);
    } catch {
      setSearchError("Couldn't reach the server");
    }
  }, []);

  function handleAuthSuccess(newToken: string, username: string, name: string, livingCity: string) {
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("username", username);
    localStorage.setItem("userName", name);
    localStorage.setItem("livingCity", livingCity);
    setToken(newToken);
    setUserName(name);
    setCity(livingCity);
    setMode("live");
    fetchLiveWeather(livingCity);
  }

  function requestLogout() {
    setShowLogoutConfirm(true);
  }

  function confirmLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userName");
    localStorage.removeItem("livingCity");
    setToken(null);
    setUserName(null);
    setMode("demo");
    setShowLogoutConfirm(false);
    setShowLogoutToast(true);
  }

  function cancelLogout() {
    setShowLogoutConfirm(false);
  }

  useEffect(() => {
    const saved = localStorage.getItem("authToken");
    const savedName = localStorage.getItem("userName");
    const savedCity = localStorage.getItem("livingCity");
    if (saved) {
      setToken(saved);
      if (savedName) setUserName(savedName);
      if (savedCity) {
        setCity(savedCity);
        setMode("live");
        fetchLiveWeather(savedCity);
      }
    }
    setAuthChecked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!authChecked) return null;

  const data = mode === "demo" ? weatherPresets[demoKey] : liveData ?? weatherPresets[demoKey];
  const cities = mode === "live" && liveCities.length > 0 ? liveCities : demoCities;
  const hourly = mode === "live" ? liveHourly : [];

  return (
    <>
      {!token ? (
        <AuthForm onSuccess={handleAuthSuccess} />
      ) : (
        <main className="relative h-screen overflow-hidden text-white">
          <VideoBackground src={data.videoSrc} poster={data.poster} />

          <div className="relative z-30 h-full flex flex-col gap-4 p-6 md:p-8">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="shrink-0">
                {userName ? (
                  <p className="text-2xl font-serif">Hi, {userName}</p>
                ) : (
                  <span className="text-xs bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                    Weather forecast
                  </span>
                )}
              </div>

              {mode === "live" && (
                <div className="flex-1 min-w-[200px] max-w-xl">
                  <LocationSearch onSelect={(name) => fetchLiveWeather(name)} />
                </div>
              )}

              <div className="flex gap-2 items-center flex-wrap ml-auto">
                <ModeToggle mode={mode} onChange={setMode} />
                {mode === "demo" && <DemoButton active={demoKey} onSelect={setDemoKey} />}
                <button onClick={requestLogout} className="text-xs px-3 py-1.5 rounded-full border border-white/30 bg-white/10">
                  Log out
                </button>
              </div>
            </div>

            {searchError && <p className="text-xs text-red-300">{searchError}</p>}

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
              <div className="grid grid-rows-2 gap-4 min-h-0">
                <WeatherNowCard
                  location={mode === "live" ? city : "Central Kandy"}
                  temp={data.temp}
                  feelsLike={mode === "live" ? liveData?.feelsLike : undefined}
                  high={mode === "live" ? highToday : null}
                  low={mode === "live" ? lowToday : null}
                  icon={data.icon}
                />
                <TodayWeekCard hours={hourly} sunrise={sunrise} sunset={sunset} dayLength={dayLength} />
              </div>

              <div className="grid grid-rows-2 gap-4 min-h-0">
                <div className="bg-black/30 backdrop-blur-xl border border-white/15 rounded-3xl p-5">
                  <p className="text-sm opacity-80 mb-3">Today&apos;s Highlight</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-2xl p-3">
                      <p className="text-[11px] opacity-60 mb-1">Chances of Rain</p>
                      {hourly.length > 0 ? <RainChanceChart hours={hourly} /> : <p className="text-xs opacity-50 h-16 flex items-center">No live data</p>}
                    </div>
                    <div className="bg-white/10 rounded-2xl p-3">
                      <p className="text-[11px] opacity-60 mb-1">UV Index</p>
                      <UVGauge uv={mode === "live" ? (liveData?.uv ?? 0) : 5} />
                    </div>
                    <div className="bg-white/10 rounded-2xl p-3">
                      <p className="text-[11px] opacity-60 mb-1">Wind Status</p>
                      {hourly.length > 0 ? <WindChart hours={hourly} /> : <p className="text-xs opacity-50 h-16 flex items-center">No live data</p>}
                    </div>
                    <div className="bg-white/10 rounded-2xl p-3">
                      <p className="text-[11px] opacity-60 mb-1">Humidity</p>
                      <HumidityCard humidity={data.humidity} />
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 backdrop-blur-xl border border-white/15 rounded-3xl p-5">
                  <p className="text-sm opacity-80 mb-3">Other Cities</p>
                  <div className="grid grid-cols-3 gap-3 h-[calc(100%-2rem)]">
                    {cities.map((c) => (
                      <CityCard key={c.name} {...c} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {showLogoutConfirm && (
  <ConfirmDialog
    message="Are you sure you want to log out?"
    onConfirm={confirmLogout}
    onCancel={cancelLogout}
  />
)}

{showLogoutToast && (
  <Toast message="You've been logged out" onDone={() => setShowLogoutToast(false)} />
)}
    </>
  );
}