const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const KEY = process.env.WEATHERAPI_KEY;

function mapPresetKey(text, precipMm = 0) {
  const t = (text || "").toLowerCase();
  if (t.includes("thunder")) return "thunderstorm";
  if (t.includes("rain") || t.includes("drizzle") || t.includes("shower")) {
    return precipMm >= 0.2 ? "rainy" : "cloudy";
  }
  if (t.includes("cloud") || t.includes("overcast") || t.includes("mist") || t.includes("fog") || t.includes("patchy")) return "cloudy";
  if (t.includes("wind") || t.includes("gale")) return "windy";
  return "day";
}

function mapIcon(text, isDay = true, precipMm = 0) {
  const t = (text || "").toLowerCase();
  if (t.includes("thunder")) return "storm";
  if (t.includes("rain") || t.includes("drizzle") || t.includes("shower")) {
    return precipMm >= 0.2 ? "rain" : (t.includes("partly") ? "cloud-sun" : "cloud");
  }
  if (t.includes("wind") || t.includes("gale")) return "wind";
  if (t.includes("partly")) return "cloud-sun";
  if (t.includes("cloud") || t.includes("overcast") || t.includes("mist") || t.includes("fog") || t.includes("patchy")) return "cloud";
  if (!isDay) return "moon";
  return "sun";
}

app.get("/api/weather", async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "city is required" });

  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${encodeURIComponent(city)}`;
    const response = await fetch(url);
    const raw = await response.json();

    if (raw.error) return res.status(404).json({ error: raw.error.message });

    const precipMm = raw.current?.precip_mm ?? 0;

    res.json({
      locationName: raw.location?.name ?? city,
      localTime: raw.location?.localtime ?? null,
      temp: `${Math.round(raw.current?.temp_c ?? 0)}°`,
      feelsLike: `${Math.round(raw.current?.feelslike_c ?? 0)}°`,
      uv: raw.current?.uv ?? 0,
      condition: raw.current?.condition?.text ?? "Unknown",
      description: raw.current?.is_day ? "Daytime conditions" : "Nighttime conditions",
      humidity: `${raw.current?.humidity ?? 0}%`,
      precipitation: `${precipMm} mm`,
      wind: `${Math.round(raw.current?.wind_kph ?? 0)} km/h`,
      presetKey: mapPresetKey(raw.current?.condition?.text, precipMm),
      isDaytime: !!raw.current?.is_day,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

app.get("/api/forecast", async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "city is required" });

  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${encodeURIComponent(city)}&days=6`;
    const response = await fetch(url);
    const raw = await response.json();

    if (raw.error) return res.status(404).json({ error: raw.error.message });

    const forecastDaysRaw = raw.forecast?.forecastday ?? [];

    const days = forecastDaysRaw.map((d) => {
      const date = new Date(d.date);
      const dayPrecip = d.day?.totalprecip_mm ?? 0;
      return {
        label: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date),
        temp: `${Math.round(d.day?.maxtemp_c ?? 0)}°`,
        icon: mapIcon(d.day?.condition?.text, true, dayPrecip),
        condition: d.day?.condition?.text ?? "Unknown",
        presetKey: mapPresetKey(d.day?.condition?.text, dayPrecip),
        humidity: `${d.day?.avghumidity ?? 0}%`,
        precipitation: `${d.day?.daily_chance_of_rain ?? 0}%`,
        wind: `${Math.round(d.day?.maxwind_kph ?? 0)} km/h`,
      };
    });

    const allHours = forecastDaysRaw.flatMap((d) => d.hour ?? []);
    const nowEpoch = raw.location?.localtime_epoch ?? Math.floor(Date.now() / 1000);
    const next24 = allHours
      .filter((h) => h.time_epoch >= nowEpoch)
      .slice(0, 24)
      .map((h) => ({
        time: new Intl.DateTimeFormat("en-US", { hour: "numeric" }).format(new Date(h.time_epoch * 1000)),
        temp: `${Math.round(h.temp_c ?? 0)}°`,
        icon: mapIcon(h.condition?.text, h.is_day, h.precip_mm ?? 0),
        chanceOfRain: h.chance_of_rain ?? 0,
        windKph: Math.round(h.wind_kph ?? 0),
      }));

      //this one line is giving the hourly rate for those sunrise and sun set cards
    const todayAstro = forecastDaysRaw[0]?.astro ?? {};
    const todayMax = forecastDaysRaw[0]?.day?.maxtemp_c ?? null;
    const todayMin = forecastDaysRaw[0]?.day?.mintemp_c ?? null;

    function to24h(t) {
      if (!t) return null;
      const [time, meridiem] = t.split(" ");
      let [h, m] = time.split(":").map(Number);
      if (meridiem === "PM" && h !== 12) h += 12;
      if (meridiem === "AM" && h === 12) h = 0;
      return { h, m };
    }

    let dayLength = null;
    const sr = to24h(todayAstro.sunrise);
    const ss = to24h(todayAstro.sunset);
    if (sr && ss) {
      const mins = (ss.h * 60 + ss.m) - (sr.h * 60 + sr.m);
      dayLength = `${Math.floor(mins / 60)} hr ${mins % 60} min`;
    }

    res.json({
      days,
      hourly: next24,
      sunrise: todayAstro.sunrise ?? null,
      sunset: todayAstro.sunset ?? null,
      dayLength,
      highToday: todayMax !== null ? `${Math.round(todayMax)}°` : null,
      lowToday: todayMin !== null ? `${Math.round(todayMin)}°` : null,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

app.get("/api/cities", async (req, res) => {
  const cities = ["Kandy", "Colombo", "Jaffna"];

  try {
    const results = await Promise.all(
      cities.map(async (name) => {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${encodeURIComponent(name)}`
        );
        const raw = await response.json();
        const precipMm = raw.current?.precip_mm ?? 0;
        return {
          name,
          condition: raw.current?.condition?.text ?? "Unknown",
          temp: `${Math.round(raw.current?.temp_c ?? 0)}°`,
          icon: mapIcon(raw.current?.condition?.text, raw.current?.is_day, precipMm),
        };
      })
    );
    res.json({ cities: results });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));