"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { Container } from "@/components/layout/Container";
import { StatCard } from "@/components/ui/StatCard";
import { ActionCard } from "@/components/ui/ActionCard";
import {
  Sprout,
  Heart,
  CloudRain,
  TrendingUp,
  Camera,
  Droplet,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Crops Monitored",
      value: "12",
      icon: Sprout,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Health Score",
      value: "87%",
      icon: Heart,
      trend: { value: 5, isPositive: true },
    },
    {
      title: "Weather Alerts",
      value: "2",
      icon: CloudRain,
      trend: { value: 1, isPositive: false },
    },
    {
      title: "Market Trends",
      value: "+₹340",
      icon: TrendingUp,
      trend: { value: 12, isPositive: true },
    },
  ];

  const quickActions = [
    {
      title: "Detect Disease",
      description: "AI-powered crop analysis",
      icon: Camera,
      href: "/disease-detection",
    },
    {
      title: "Check Weather",
      description: "7-day forecast & alerts",
      icon: CloudRain,
      href: "/weather",
    },
    {
      title: "Market Prices",
      description: "Real-time mandi rates",
      icon: TrendingUp,
      href: "/market-prices",
    },
    {
      title: "Fertilizer Advice",
      description: "Soil & nutrient analysis",
      icon: Droplet,
      href: "/fertilizer",
    },
    {
      title: "Ask AI",
      description: "Get farming guidance",
      icon: MessageSquare,
      href: "/chatbot",
    },
    {
      title: "View Reports",
      description: "History & analytics",
      icon: FileText,
      href: "/reports",
    },
  ];

  const recentActivity = [
    {
      icon: Camera,
      title: "Disease scan completed",
      description: "Tomato leaf blight detected - 89% confidence",
      time: "2 hours ago",
      type: "success",
    },
    {
      icon: CloudRain,
      title: "Weather alert issued",
      description: "Heavy rainfall expected tomorrow",
      time: "5 hours ago",
      type: "warning",
    },
    {
      icon: TrendingUp,
      title: "Price update",
      description: "Wheat prices increased by ₹120/quintal",
      time: "1 day ago",
      type: "info",
    },
    {
      icon: MessageSquare,
      title: "AI consultation",
      description: "Asked about optimal irrigation schedule",
      time: "2 days ago",
      type: "info",
    },
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-400 bg-green-500/20";
      case "warning":
        return "text-yellow-400 bg-yellow-500/20";
      default:
        return "text-blue-400 bg-blue-500/20";
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, <span className="text-primary-400">{user?.name}</span>!
          </h1>
          <p className="text-gray-400">Here's what's happening with your crops today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <ActionCard
                key={action.title}
                title={action.title}
                description={action.description}
                icon={action.icon}
                href={action.href}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            <a href="/history" className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
              View All →
            </a>
          </div>
          <div className="bg-agri-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium mb-1">{activity.title}</h4>
                      <p className="text-gray-400 text-sm">{activity.description}</p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-xs whitespace-nowrap">
                      <Clock className="h-3 w-3" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
