export type PresetKey = "morning" | "day" | "cloudy" | "rainy" | "thunderstorm" | "windy" | "night";
export type IconType = "sun" | "cloud" | "cloud-sun" | "rain" | "storm" | "wind" | "moon";

export interface WeatherPreset {
  label: string;
  headline: string;
  temp: string;
  condition: string;
  description: string;
  humidity: string;
  precipitation: string;
  wind: string;
  icon: IconType;
  videoSrc: string;
  poster: string;
}

export const weatherPresets: Record<PresetKey, WeatherPreset> = {
  morning:      { label: "Morning",     headline: "Cool clear\nmorning",   temp: "22°", condition: "Clear morning",  icon: "cloud-sun", description: "Cool and calm, haze burning off by mid-morning.", humidity: "68%", precipitation: "5%",  wind: "6 km/h",  videoSrc: "/videos/morning.mp4",      poster: "/videos/posters/morning.jpg" },
  day:          { label: "Sunny",       headline: "Clear and\nsunny",      temp: "31°", condition: "Clear sky",      icon: "sun",       description: "Bright and dry, good visibility across the hills.", humidity: "54%", precipitation: "5%",  wind: "8 km/h",  videoSrc: "/videos/day.mp4",          poster: "/videos/posters/day.jpg" },
  cloudy:       { label: "Cloudy",      headline: "Overcast\nskies",       temp: "27°", condition: "Overcast",       icon: "cloud",     description: "Grey skies most of the day, no rain expected.",     humidity: "70%", precipitation: "20%", wind: "10 km/h", videoSrc: "/videos/cloudy.mp4",       poster: "/videos/posters/cloudy.jpg" },
  rainy:        { label: "Rain",        headline: "Storm\nwith heavy rain",temp: "24°", condition: "Light rain",     icon: "rain",      description: "Steady rain through the afternoon, bring an umbrella.", humidity: "88%", precipitation: "80%", wind: "14 km/h", videoSrc: "/videos/rain.mp4",     poster: "/videos/posters/rainy.jpg" },
  thunderstorm: { label: "Thunderstorm",headline: "Storm\nwith heavy rain",temp: "23°", condition: "Thunderstorms",  icon: "storm",     description: "Heavy rain with lightning, expect brief power flickers.", humidity: "92%", precipitation: "95%", wind: "32 km/h", videoSrc: "/videos/thunderstorm.mp4", poster: "/videos/posters/thunderstorm.jpg" },
  windy:        { label: "Windy",       headline: "Breezy and\nblustery",  temp: "26°", condition: "Breezy",         icon: "wind",      description: "Strong gusts, secure loose outdoor items.",         humidity: "60%", precipitation: "10%", wind: "38 km/h", videoSrc: "/videos/windy.mp4",        poster: "/videos/posters/windy.jpg" },
  night:        { label: "Night",       headline: "Clear and\nquiet night",temp: "20°", condition: "Clear night",    icon: "moon",      description: "Cool and quiet, clear skies for stargazing.",       humidity: "75%", precipitation: "5%",  wind: "5 km/h",  videoSrc: "/videos/night.mp4",        poster: "/videos/posters/night.jpg" },
};