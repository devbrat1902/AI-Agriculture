import React from "react";
import { motion } from "framer-motion";
import { DailyForecast } from "@/lib/api/weather";
import { cn } from "@/lib/utils";

interface ForecastCardProps {
  forecast: DailyForecast;
  index: number;
}

export function ForecastCard({ forecast, index }: ForecastCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex-shrink-0 w-32 bg-agri-900/50 border border-white/10 rounded-xl p-4 text-center hover:border-primary-500/30 transition-colors"
    >
      <p className="text-sm font-medium text-gray-300 mb-2">{forecast.dayName}</p>
      <div className="text-4xl mb-2">{forecast.condition.icon}</div>
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
