const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const KEY = process.env.WEATHERAPI_KEY;

function mapPresetKey(text) {
  const t = (text || "").toLowerCase();
  if (t.includes("thunder")) return "thunderstorm";
  if (t.includes("rain") || t.includes("drizzle") || t.includes("shower")) return "rainy";
  if (t.includes("cloud") || t.includes("overcast") || t.includes("mist") || t.includes("fog")) return "cloudy";
  if (t.includes("wind") || t.includes("gale")) return "windy";
  return "day";
}

function mapIcon(text, isDay = true) {
  const t = (text || "").toLowerCase();
  if (t.includes("thunder")) return "storm";
  if (t.includes("rain") || t.includes("drizzle") || t.includes("shower")) return "rain";
  if (t.includes("wind") || t.includes("gale")) return "wind";
  if (t.includes("partly")) return "cloud-sun";
  if (t.includes("cloud") || t.includes("overcast") || t.includes("mist") || t.includes("fog")) return "cloud";
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

    res.json({
      locationName: raw.location?.name ?? city,
      localTime: raw.location?.localtime ?? null,
      temp: `${Math.round(raw.current?.temp_c ?? 0)}°`,
      condition: raw.current?.condition?.text ?? "Unknown",
      description: raw.current?.is_day ? "Daytime conditions" : "Nighttime conditions",
      humidity: `${raw.current?.humidity ?? 0}%`,
      precipitation: `${raw.current?.precip_mm ?? 0} mm`,
      wind: `${Math.round(raw.current?.wind_kph ?? 0)} km/h`,
      presetKey: mapPresetKey(raw.current?.condition?.text),
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

    const days = (raw.forecast?.forecastday ?? []).map((d) => {
      const date = new Date(d.date);
      return {
        label: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date),
        temp: `${Math.round(d.day?.maxtemp_c ?? 0)}°`,
        icon: mapIcon(d.day?.condition?.text, true),
        condition: d.day?.condition?.text ?? "Unknown",
        presetKey: mapPresetKey(d.day?.condition?.text),
        humidity: `${d.day?.avghumidity ?? 0}%`,
        precipitation: `${d.day?.daily_chance_of_rain ?? 0}%`,
        wind: `${Math.round(d.day?.maxwind_kph ?? 0)} km/h`,
      };
    });

    res.json({ days });
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
        return {
          name,
          condition: raw.current?.condition?.text ?? "Unknown",
          temp: `${Math.round(raw.current?.temp_c ?? 0)}°`,
          icon: mapIcon(raw.current?.condition?.text, raw.current?.is_day),
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