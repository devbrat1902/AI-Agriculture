import React from "react";
import { motion } from "framer-motion";
import { Droplets, Wind, Gauge, Sunrise, Sunset } from "lucide-react";
import { CurrentWeather } from "@/lib/api/weather";

interface WeatherCardProps {
  weather: CurrentWeather;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-agri-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm auth-form-glow"
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Main Temperature */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-gray-400 text-lg mb-2">{weather.location}</p>
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <span className="text-7xl font-bold text-white">
              {weather.temperature}°
            </span>
            <span className="text-4xl">{weather.condition.icon}</span>
          </div>
          <p className="text-xl text-gray-300 mb-1">{weather.condition.description}</p>
          <p className="text-gray-500">Feels like {weather.feelsLike}°C</p>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Droplets className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Humidity</p>
              <p className="text-lg font-bold text-white">{weather.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/20 rounded-xl">
              <Wind className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Wind</p>
              <p className="text-lg font-bold text-white">{weather.windSpeed} km/h</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Gauge className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Pressure</p>
              <p className="text-lg font-bold text-white">{weather.pressure} hPa</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <Sunrise className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Sunrise</p>
              <p className="text-lg font-bold text-white">{weather.sunrise}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
