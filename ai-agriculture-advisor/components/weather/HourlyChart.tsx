"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { HourlyForecast } from "@/lib/api/weather";

interface HourlyChartProps {
  hourly: HourlyForecast[];
}

export function HourlyChart({ hourly }: HourlyChartProps) {
  // Show every 3 hours for better readability
  const filteredData = hourly.filter((_, index) => index % 3 === 0);

  return (
    <div className="bg-agri-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white mb-4">Hourly Temperature</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="time"
            stroke="#9ca3af"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="#9ca3af"
            style={{ fontSize: "12px" }}
            unit="°"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "8px",
              color: "#fff",
            }}
            labelStyle={{ color: "#10b981" }}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: "#10b981", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
