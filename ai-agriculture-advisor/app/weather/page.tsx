"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { WeatherCard } from "@/components/weather/WeatherCard";
import { ForecastCard } from "@/components/weather/ForecastCard";
import { HourlyChart } from "@/components/weather/HourlyChart";
import { getWeatherData, WeatherData } from "@/lib/api/weather";
import { Loader2, AlertTriangle, Droplet, CheckCircle, CloudRain } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    setIsLoading(true);
    try {
      const data = await getWeatherData();
      setWeather(data);
    } catch (error) {
      console.error("Failed to load weather:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 border-red-500/30 text-red-400";
      case "medium":
        return "bg-yellow-500/20 border-yellow-500/30 text-yellow-400";
      default:
        return "bg-blue-500/20 border-blue-500/30 text-blue-400";
    }
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Failed to load weather data</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full mb-4">
            <CloudRain className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">
              Real-Time Weather Updates
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Weather Forecast
          </h1>
          <p className="text-lg text-gray-400">
            Stay ahead with accurate weather insights for better farm decisions
          </p>
        </div>

        {/* Weather Alerts */}
        {weather.alerts.length > 0 && (
          <div className="mb-8 space-y-4">
            {weather.alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "border rounded-xl p-6",
                  getSeverityColor(alert.severity)
                )}
              >
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{alert.type}</h3>
                      <span className="px-2 py-1 rounded text-xs font-bold uppercase border">
                        {alert.severity} Risk
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">{alert.message}</p>
                    <div>
                      <p className="font-medium mb-2">Recommended Actions:</p>
                      <ul className="space-y-1">
                        {alert.actions.map((action, i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            <span>•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Current Weather */}
        <div className="mb-8">
          <WeatherCard weather={weather.current} />
        </div>

        {/* 7-Day Forecast */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">7-Day Forecast</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-transparent">
            {weather.daily.map((forecast, index) => (
              <ForecastCard key={forecast.date} forecast={forecast} index={index} />
            ))}
          </div>
        </div>

        {/* Hourly Temperature Chart */}
        <div className="mb-8">
          <HourlyChart hourly={weather.hourly} />
        </div>

        {/* Irrigation Advice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "border rounded-xl p-6",
            weather.irrigationAdvice.shouldWater
              ? "bg-green-500/10 border-green-500/30"
              : "bg-blue-500/10 border-blue-500/30"
          )}
        >
          <div className="flex items-start gap-4">
            <div className={cn(
              "p-3 rounded-xl",
              weather.irrigationAdvice.shouldWater
                ? "bg-green-500/20"
                : "bg-blue-500/20"
            )}>
              {weather.irrigationAdvice.shouldWater ? (
                <Droplet className="h-6 w-6 text-green-400" />
              ) : (
                <CheckCircle className="h-6 w-6 text-blue-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className={cn(
                "text-xl font-bold mb-2",
                weather.irrigationAdvice.shouldWater ? "text-green-400" : "text-blue-400"
              )}>
                Irrigation Recommendation
              </h3>
              <p className="text-gray-300 mb-2">{weather.irrigationAdvice.reason}</p>
              {weather.irrigationAdvice.amount && (
                <p className="text-sm text-gray-400">
                  Suggested amount: <span className="font-bold text-white">{weather.irrigationAdvice.amount}</span>
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
