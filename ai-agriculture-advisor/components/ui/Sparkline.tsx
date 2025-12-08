import React from "react";
import { motion } from "framer-motion";

interface SparklineProps {
  data: number[];
  color?: "success" | "danger";
  width?: number;
  height?: number;
}

export function Sparkline({
  data,
  color = "success",
  width = 80,
  height = 30,
}: SparklineProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  const strokeColor = color === "success" ? "#10b981" : "#ef4444";

  return (
    <svg width={width} height={height} className="inline-block">
      <motion.polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </svg>
  );
}
