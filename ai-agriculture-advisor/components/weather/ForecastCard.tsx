import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ForecastCardProps {
  forecast: {
    date: string;
    day: string;
    high: number;
    low: number;
    description: string;
    icon: string;
    precipitation: number;
  };
  index: number;
}

export function ForecastCard({ forecast, index }: ForecastCardProps) {
  // Map OpenWeatherMap icon codes to emojis
  const getWeatherEmoji = (icon: string) => {
    const iconMap: Record<string, string> = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '🌨️', '13n': '🌨️',
      '50d': '🌫️', '50n': '🌫️',
    };
    return iconMap[icon] || '☀️';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex-shrink-0 w-32 bg-agri-900/50 border border-white/10 rounded-xl p-4 text-center hover:border-primary-500/30 transition-colors"
    >
      <p className="text-sm font-medium text-gray-300 mb-2">{forecast.day}</p>
      <div className="text-4xl mb-2">{getWeatherEmoji(forecast.icon)}</div>
      <div className="mb-2">
        <p className="text-2xl font-bold text-white">{forecast.high}°</p>
        <p className="text-sm text-gray-500">{forecast.low}°</p>
      </div>
      <div className="flex items-center justify-center gap-1 text-xs text-cyan-400">
        <span>💧</span>
        <span>{forecast.precipitation}%</span>
      </div>
    </motion.div>
  );
}
