"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Camera, Cloud, TrendingUp, MessageSquare, Droplet, Download, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HistoryItem {
  id: string;
  type: "disease" | "weather" | "market" | "chat" | "fertilizer";
  title: string;
  description: string;
  date: Date;
  result?: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    type: "disease",
    title: "Tomato Leaf Blight Detection",
    description: "89% confidence - High severity",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    result: "Treatment recommendations provided",
  },
  {
    id: "2",
    type: "weather",
    title: "Weather Forecast Query",
    description: "7-day forecast for Pune, Maharashtra",
    date: new Date(Date.now() - 5 * 60 * 60 * 1000),
    result: "Heavy rain alert issued",
  },
  {
    id: "3",
    type: "market",
    title: "Market Price Check",
    description: "Wheat prices - APMC Pune",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    result: "₹2,150/quintal (+2.4%)",
  },
  {
    id: "4",
    type: "chat",
    title: "AI Consultation",
    description: "Pest control methods for wheat",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    result: "Organic solutions recommended",
  },
  {
    id: "5",
    type: "fertilizer",
    title: "NPK Analysis",
    description: "Loamy soil - pH 7.0 - Wheat crop",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    result: "₹8,450/hectare fertilizer cost",
  },
];

export default function ReportsPage() {
  const [filter, setFilter] = useState<string>("all");

  const getTypeConfig = (type: string) => {
    switch (type) {
      case "disease":
        return { icon: Camera, color: "text-red-400", bg: "bg-red-500/20" };
      case "weather":
        return { icon: Cloud, color: "text-cyan-400", bg: "bg-cyan-500/20" };
      case "market":
        return { icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/20" };
      case "chat":
        return { icon: MessageSquare, color: "text-purple-400", bg: "bg-purple-500/20" };
      case "fertilizer":
        return { icon: Droplet, color: "text-yellow-400", bg: "bg-yellow-500/20" };
      default:
        return { icon: Camera, color: "text-gray-400", bg: "bg-gray-500/20" };
    }
  };

  const filteredHistory = filter === "all"
    ? mockHistory
    : mockHistory.filter((item) => item.type === filter);

  const filters = [
    { id: "all", label: "All" },
    { id: "disease", label: "Disease Scans" },
    { id: "weather", label: "Weather" },
    { id: "market", label: "Market" },
    { id: "fertilizer", label: "Fertilizer" },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Reports & History
          </h1>
          <p className="text-lg text-gray-400">
            Review your past analyses and consultations
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                filter === f.id
                  ? "bg-primary-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.map((item, index) => {
            const config = getTypeConfig(item.type);
            const Icon = config.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-agri-900/50 border border-white/10 rounded-2xl p-6 hover:border-primary-500/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={cn("p-3 rounded-xl", config.bg)}>
                    <Icon className={cn("h-6 w-6", config.color)} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                        {item.date.toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    {item.result && (
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-sm text-primary-400">
                          Result: {item.result}
                        </p>
                        <button className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 transition-colors">
                          <Download className="h-4 w-4" />
                          Export
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            No reports found for this filter
          </div>
        )}
      </Container>
    </div>
  );
}
