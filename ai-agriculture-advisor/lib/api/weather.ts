// Real Weather API Implementation using OpenWeatherMap

export interface WeatherData {
  current: {
    location: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
  };
  daily: Array<{
    date: string;
    day: string;
    high: number;
    low: number;
    description: string;
    icon: string;
    precipitation: number;
  }>;
  hourly: Array<{
    time: string;
    temperature: number;
    feelsLike: number;
  }>;
  alerts: Array<{
    type: string;
    severity: "high" | "medium" | "low";
    message: string;
    actions: string[];
  }>;
  irrigationAdvice: {
    shouldWater: boolean;
    reason: string;
    amount?: string;
  };
}

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Get user's location (default to Delhi, India)
async function getCoordinates() {
  // Default to Delhi for Indian agriculture context
  return { lat: 28.6139, lon: 77.2090, city: "Delhi, India" };
}

// Fetch current weather from OpenWeatherMap
async function getCurrentWeather(lat: number, lon: number) {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }
  return response.json();
}

// Fetch 5-day forecast from OpenWeatherMap
async function getForecast(lat: number, lon: number) {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Forecast API error: ${response.status}`);
  }
  return response.json();
}

// Transform OpenWeatherMap data to our app format
function transformWeatherData(current: any, forecast: any, city: string): WeatherData {
  // Current weather
  const currentWeather = {
    location: city,
    temperature: Math.round(current.main.temp),
    feelsLike: Math.round(current.main.feels_like),
    humidity: current.main.humidity,
    windSpeed: Math.round(current.wind.speed * 3.6), // Convert m/s to km/h
    description: current.weather[0].description,
    icon: current.weather[0].icon,
  };

  // Daily forecast - aggregate by day
  const dailyMap = new Map();
  forecast.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split("T")[0];

    if (!dailyMap.has(dateKey)) {
      const dayIndex = date.getDay();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const today = new Date().toISOString().split("T")[0];
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowKey = tomorrow.toISOString().split("T")[0];

      let dayLabel;
      if (dateKey === today) dayLabel = "Today";
      else if (dateKey === tomorrowKey) dayLabel = "Tomorrow";
      else dayLabel = days[dayIndex];

      dailyMap.set(dateKey, {
        date: dateKey,
        day: dayLabel,
        high: item.main.temp_max,
        low: item.main.temp_min,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        precipitation: (item.pop || 0) * 100, // Probability of precipitation
      });
    } else {
      const existing = dailyMap.get(dateKey);
      existing.high = Math.max(existing.high, item.main.temp_max);
      existing.low = Math.min(existing.low, item.main.temp_min);
      existing.precipitation = Math.max(existing.precipitation, (item.pop || 0) * 100);
    }
  });

  const daily = Array.from(dailyMap.values()).slice(0, 7).map((day) => ({
    ...day,
    high: Math.round(day.high),
    low: Math.round(day.low),
    precipitation: Math.round(day.precipitation),
  }));

  // Hourly forecast (next 24 hours)
  const hourly = forecast.list.slice(0, 8).map((item: any) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temperature: Math.round(item.main.temp),
    feelsLike: Math.round(item.main.feels_like),
  }));

  // Calculate average precipitation for irrigation advice
  const avgPrecipitation = daily.slice(0, 3).reduce((sum, d) => sum + d.precipitation, 0) / 3;

  // Irrigation recommendation based on weather
  const irrigationAdvice = {
    shouldWater: avgPrecipitation < 30 && currentWeather.humidity < 60,
    reason:
      avgPrecipitation < 30
        ? "Low rainfall expected in the coming days. Soil moisture may be insufficient."
        : "Adequate rainfall expected. Skip irrigation to conserve water.",
    amount: avgPrecipitation < 30 ? "15-20mm per irrigation cycle" : undefined,
  };

  // Generate farming-specific weather alerts
  const alerts = [];
  if (currentWeather.temperature > 35) {
    alerts.push({
      type: "Heat Wave Alert",
      severity: "high" as const,
      message: "Extreme heat conditions detected. Crops may experience heat stress.",
      actions: [
        "Increase irrigation frequency",
        "Apply mulch to retain soil moisture",
        "Consider shade netting for sensitive crops",
        "Avoid midday field work",
      ],
    });
  }
  if (avgPrecipitation > 70) {
    alerts.push({
      type: "Heavy Rainfall Warning",
      severity: "medium" as const,
      message: "High precipitation expected. Risk of waterlogging and fungal diseases.",
      actions: [
        "Ensure proper drainage in fields",
        "Delay fertilizer application",
        "Monitor for fungal infections",
        "Cover sensitive crops if possible",
      ],
    });
  }
  if (currentWeather.temperature < 10) {
    alerts.push({
      type: "Frost Warning",
      severity: "high" as const,
      message: "Low temperatures may cause frost damage to crops.",
      actions: [
        "Cover sensitive plants overnight",
        "Use frost protection methods",
        "Delay planting of frost-sensitive crops",
        "Monitor temperature closely",
      ],
    });
  }

  return {
    current: currentWeather,
    daily,
    hourly,
    alerts,
    irrigationAdvice,
  };
}

// Main export function
export async function getWeatherData(): Promise<WeatherData> {
  try {
    if (!API_KEY) {
      throw new Error("OpenWeatherMap API key not configured. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to .env.local");
    }

    const { lat, lon, city } = await getCoordinates();

    // Fetch both current weather and forecast in parallel
    const [current, forecast] = await Promise.all([
      getCurrentWeather(lat, lon),
      getForecast(lat, lon),
    ]);

    return transformWeatherData(current, forecast, city);
  } catch (error) {
    console.error("Weather API Error:", error);
    throw error;
  }
}
