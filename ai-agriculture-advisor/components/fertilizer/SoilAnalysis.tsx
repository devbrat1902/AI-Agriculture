import React from "react";
import { motion } from "framer-motion";
import { NPKLevels, FertilizerRecommendation } from "@/lib/api/fertilizer";
import { AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SoilAnalysisProps {
  npkLevels: NPKLevels;
  npkStatus: FertilizerRecommendation["npkStatus"];
}

export function SoilAnalysis({ npkLevels, npkStatus }: SoilAnalysisProps) {
  const nutrients = [
    {
      name: "Nitrogen (N)",
      level: npkLevels.nitrogen,
      status: npkStatus.nitrogen,
      color: "blue",
      icon: "🌿",
    },
    {
      name: "Phosphorus (P)",
      level: npkLevels.phosphorus,
      status: npkStatus.phosphorus,
      color: "purple",
      icon: "🌱",
    },
    {
      name: "Potassium (K)",
      level: npkLevels.potassium,
      status: npkStatus.potassium,
      color: "orange",
      icon: "💪",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deficient":
        return { bg: "bg-red-500/20", text: "text-red-400", bar: "bg-red-500" };
      case "excess":
        return { bg: "bg-yellow-500/20", text: "text-yellow-400", bar: "bg-yellow-500" };
      default:
        return { bg: "bg-green-500/20", text: "text-green-400", bar: "bg-green-500" };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "deficient":
        return <AlertTriangle className="h-5 w-5" />;
      case "excess":
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <CheckCircle className="h-5 w-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-agri-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
    >
      <h3 className="text-2xl font-bold text-white mb-6">NPK Analysis</h3>

      <div className="space-y-6">
        {nutrients.map((nutrient, index) => {
          const colors = getStatusColor(nutrient.status);

          return (
            <motion.div
              key={nutrient.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{nutrient.icon}</span>
                  <span className="font-medium text-white">{nutrient.name}</span>
                </div>
                <div className={cn("flex items-center gap-2 px-3 py-1 rounded-lg", colors.bg, colors.text)}>
                  {getStatusIcon(nutrient.status)}
                  <span className="text-sm font-bold capitalize">{nutrient.status}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${nutrient.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className={cn("h-full", colors.bar)}
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                  {nutrient.level}%
                </span>
              </div>

              {/* Scale Labels */}
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Deficient</span>
                <span>Adequate</span>
                <span>Excess</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
