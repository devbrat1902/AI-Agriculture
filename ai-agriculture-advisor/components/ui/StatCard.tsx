import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  className,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "bg-agri-900/50 border border-white/10 p-6 rounded-2xl backdrop-blur-sm",
        "hover:border-primary-500/30 transition-all duration-200 auth-form-glow",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-primary-500/20 rounded-xl">
          <Icon className="h-6 w-6 text-primary-400" />
        </div>
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg",
              trend.isPositive
                ? "text-green-400 bg-green-500/10"
                : "text-red-400 bg-red-500/10"
            )}
          >
            <span>{trend.isPositive ? "↑" : "↓"}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
}
