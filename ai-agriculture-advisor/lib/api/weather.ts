// Mock Weather API

export interface WeatherCondition {
  id: number;
  main: string; // "Clear", "Clouds", "Rain", etc.
  description: string;
  icon: string;
}

export interface CurrentWeather {
  location: string;
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  pressure: number;
  sunrise: string;
  sunset: string;
}

export interface DailyForecast {
  date: string;
  dayName: string;
  high: number;
  low: number;
  condition: WeatherCondition;
  precipitation: number;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: WeatherCondition;
}

export interface WeatherAlert {
  type: "Heavy Rain" | "Heat Wave" | "Frost" | "Storm" | "Drought";
  severity: "low" | "medium" | "high";
  message: string;
  actions: string[];
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
  alerts: WeatherAlert[];
  irrigationAdvice: {
    shouldWater: boolean;
    reason: string;
    amount?: string;
  };
}

const weatherConditions = [
  { id: 1, main: "Clear", description: "Clear sky", icon: "☀️" },
  { id: 2, main: "Clouds", description: "Partly cloudy", icon: "⛅" },
  { id: 3, main: "Clouds", description: "Overcast", icon: "☁️" },
  { id: 4, main: "Rain", description: "Light rain", icon: "🌦️" },
  { id: 5, main: "Rain", description: "Heavy rain", icon: "🌧️" },
  { id: 6, main: "Thunderstorm", description: "Thunderstorm", icon: "⛈️" },
];

const locations = ["Pune, Maharashtra", "Delhi, NCR", "Bengaluru, Karnataka"];

function getRandomCondition(): WeatherCondition {
  return weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
}

function generateHourlyForecast(): HourlyForecast[] {
  const hourly: HourlyForecast[] = [];
  const baseTemp = 20 + Math.random() * 15; // 20-35°C

  for (let i = 0; i < 24; i++) {
    // Temperature varies throughout the day
    const timeOfDay = i / 24;
    const tempVariation = Math.sin(timeOfDay * Math.PI * 2 - Math.PI / 2) * 8;

    hourly.push({
      time: `${i.toString().padStart(2, '0')}:00`,
      temperature: Math.round(baseTemp + tempVariation),
      condition: i % 6 === 0 ? getRandomCondition() : hourly[i - 1]?.condition || getRandomCondition(),
    });
  }

  return hourly;
}

function generateDailyForecast(): DailyForecast[] {
  const daily: DailyForecast[] = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const baseHigh = 28 + Math.random() * 10; // 28-38°C

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayIndex = date.getDay();
    const tempVariation = (Math.random() - 0.5) * 6;
    const high = Math.round(baseHigh + tempVariation);
    const low = Math.round(high - 8 - Math.random() * 4);

    daily.push({
      date: date.toISOString().split('T')[0],
      dayName: i === 0 ? "Today" : i === 1 ? "Tomorrow" : days[dayIndex],
      high,
      low,
      condition: getRandomCondition(),
      precipitation: Math.round(Math.random() * 80),
    });
  }

  return daily;
}

function generateWeatherAlerts(): WeatherAlert[] {
  const alerts: WeatherAlert[] = [];
  const random = Math.random();

  if (random > 0.7) {
    alerts.push({
      type: "Heavy Rain",
      severity: "high",
      message: "Heavy rainfall expected tomorrow. Potential flooding in low-lying areas.",
      actions: [
        "Ensure proper drainage in fields",
        "Cover sensitive crops",
        "Postpone spraying activities",
        "Check irrigation channels",
      ],
    });
  } else if (random > 0.5) {
    alerts.push({
      type: "Heat Wave",
      severity: "medium",
      message: "Temperature expected to rise above 40°C for the next 3 days.",
      actions: [
        "Increase irrigation frequency",
        "Provide shade for young plants",
        "Monitor for heat stress",
        "Avoid midday field work",
      ],
    });
  }

  return alerts;
}

export async function getWeatherData(location?: string): Promise<WeatherData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const selectedLocation = location || locations[Math.floor(Math.random() * locations.length)];
  const currentTemp = 22 + Math.random() * 15;
  const currentCondition = getRandomCondition();
  const daily = generateDailyForecast();
  const hourly = generateHourlyForecast();
  const alerts = generateWeatherAlerts();

  // Irrigation logic
  const hasRainAlert = alerts.some((a) => a.type === "Heavy Rain");
  const recentRain = currentCondition.main === "Rain";
  const shouldWater = !hasRainAlert && !recentRain && Math.random() > 0.3;

  return {
    current: {
      location: selectedLocation,
      temperature: Math.round(currentTemp),
      feelsLike: Math.round(currentTemp + (Math.random() - 0.5) * 4),
      condition: currentCondition,
      humidity: 40 + Math.round(Math.random() * 40),
      windSpeed: Math.round(Math.random() * 20 + 5),
      pressure: 1010 + Math.round(Math.random() * 20),
      sunrise: "06:15 AM",
      sunset: "06:45 PM",
    },
    daily,
    hourly,
    alerts,
    irrigationAdvice: {
      shouldWater,
      reason: shouldWater
        ? "No rain expected in next 48 hours. Soil moisture likely low."
        : hasRainAlert
          ? "Heavy rainfall predicted. Skip watering to avoid waterlogging."
          : "Recent rainfall detected. Soil moisture adequate.",
      amount: shouldWater ? "15-20mm per hectare" : undefined,
    },
  };
}
