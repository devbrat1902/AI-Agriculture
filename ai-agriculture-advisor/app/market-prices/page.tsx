"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { PriceTable } from "@/components/market/PriceTable";
import { getMarketPrices, MarketData } from "@/lib/api/market-prices";
import { Loader2, TrendingUp, TrendingDown, BarChart3, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MarketPricesPage() {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMarketData();
  }, []);

  const loadMarketData = async () => {
    setIsLoading(true);
    try {
      const data = await getMarketPrices();
      setMarketData(data);
    } catch (error) {
      console.error("Failed to load market data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading market prices...</p>
        </div>
      </div>
    );
  }

  if (!marketData) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Failed to load market data</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full mb-4">
            <BarChart3 className="h-4 w-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-400">
              Live Market Updates
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Market Prices
          </h1>
          <p className="text-lg text-gray-400">
            Track real-time mandi prices and make informed selling decisions
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Top Gainers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="font-bold text-green-400">Top Gainers</h3>
            </div>
            <div className="space-y-3">
              {marketData.topGainers.map((crop) => (
                <div key={crop.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium text-sm">{crop.crop}</p>
                    <p className="text-gray-400 text-xs">{crop.market}</p>
                  </div>
                  <span className="text-green-400 font-bold">↑{crop.change}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Losers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <TrendingDown className="h-5 w-5 text-red-400" />
              </div>
              <h3 className="font-bold text-red-400">Top Losers</h3>
            </div>
            <div className="space-y-3">
              {marketData.topLosers.map((crop) => (
                <div key={crop.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium text-sm">{crop.crop}</p>
                    <p className="text-gray-400 text-xs">{crop.market}</p>
                  </div>
                  <span className="text-red-400 font-bold">↓{Math.abs(crop.change)}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Average Change */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "border rounded-2xl p-6",
              marketData.averageChange >= 0
                ? "bg-green-500/10 border-green-500/30"
                : "bg-red-500/10 border-red-500/30"
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={cn(
                "p-2 rounded-lg",
                marketData.averageChange >= 0 ? "bg-green-500/20" : "bg-red-500/20"
              )}>
                <BarChart3 className={cn(
                  "h-5 w-5",
                  marketData.averageChange >= 0 ? "text-green-400" : "text-red-400"
                )} />
              </div>
              <h3 className={cn(
                "font-bold",
                marketData.averageChange >= 0 ? "text-green-400" : "text-red-400"
              )}>
                Market Average
              </h3>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-white mb-2">
                {marketData.averageChange >= 0 ? "+" : ""}
                {marketData.averageChange}%
              </p>
              <p className="text-gray-400 text-sm">Overall market trend</p>
            </div>
          </motion.div>
        </div>

        {/* AI Price Prediction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Sparkles className="h-6 w-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                AI Price Prediction
              </h3>
              <p className="text-gray-300 mb-4">
                Based on historical trends and market analysis, we predict:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Crop</p>
                  <p className="text-lg font-bold text-white">{marketData.prediction.crop}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Current Price</p>
                  <p className="text-lg font-bold text-white">
                    ₹{marketData.prediction.currentPrice.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Predicted Price</p>
                  <p className={cn(
                    "text-lg font-bold",
                    marketData.prediction.predictedPrice > marketData.prediction.currentPrice
                      ? "text-green-400"
                      : "text-red-400"
                  )}>
                    ₹{marketData.prediction.predictedPrice.toLocaleString()}
                    <span className="text-sm ml-2">
                      ({marketData.prediction.predictedPrice > marketData.prediction.currentPrice ? "↑" : "↓"}
                      {Math.abs(
                        Math.round(
                          ((marketData.prediction.predictedPrice - marketData.prediction.currentPrice) /
                            marketData.prediction.currentPrice) *
                          100
                        )
                      )}%)
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="text-gray-400">Confidence:</span>
                <div className="flex-1 max-w-xs h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${marketData.prediction.confidence}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
                <span className="text-purple-400 font-bold">
                  {marketData.prediction.confidence}%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Timeframe: {marketData.prediction.timeframe}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Price Table */}
        <PriceTable prices={marketData.prices} />
      </Container>
    </div>
  );
}
