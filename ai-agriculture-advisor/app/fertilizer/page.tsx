"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { SoilAnalysis } from "@/components/fertilizer/SoilAnalysis";
import { getFertilizerRecommendation, SoilData, FertilizerRecommendation } from "@/lib/api/fertilizer";
import { Button } from "@/components/ui/Button";
import { Droplet, Loader2, Sprout, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function FertilizerPage() {
  const [formData, setFormData] = useState<SoilData>({
    soilType: "Loamy",
    pH: 7.0,
    crop: "Wheat",
  });
  const [recommendation, setRecommendation] = useState<FertilizerRecommendation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await getFertilizerRecommendation(formData);
      setRecommendation(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full mb-4">
            <Droplet className="h-4 w-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              Soil & Nutrient Analysis
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Fertilizer Recommendations
          </h1>
          <p className="text-lg text-gray-400">
            Get personalized fertilizer advice based on your soil conditions
          </p>
        </div>

        {/* Input Form */}
        <div className="mb-8 bg-agri-900/50 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Soil Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Soil Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Soil Type
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value as any })}
                className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-primary-500 focus:outline-none"
              >
                <option value="Loamy">Loamy</option>
                <option value="Clay">Clay</option>
                <option value="Sandy">Sandy</option>
                <option value="Silt">Silt</option>
              </select>
            </div>

            {/* pH Level */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                pH Level: {formData.pH.toFixed(1)}
              </label>
              <input
                type="range"
                min="4.0"
                max="9.0"
                step="0.1"
                value={formData.pH}
                onChange={(e) => setFormData({ ...formData, pH: parseFloat(e.target.value) })}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Acidic (4.0)</span>
                <span>Neutral (7.0)</span>
                <span>Alkaline (9.0)</span>
              </div>
            </div>

            {/* Crop Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Crop
              </label>
              <select
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-primary-500 focus:outline-none"
              >
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
                <option value="Maize">Maize</option>
                <option value="Tomato">Tomato</option>
                <option value="Potato">Potato</option>
                <option value="Cotton">Cotton</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Onion">Onion</option>
                <option value="Cabbage">Cabbage</option>
              </select>
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="mt-6 bg-primary-600 hover:bg-primary-500 w-full md:w-auto"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Analyzing Soil...
              </>
            ) : (
              <>
                <Sprout className="h-5 w-5 mr-2" />
                Get Recommendations
              </>
            )}
          </Button>
        </div>

        {/* Results */}
        {recommendation && (
          <div className="space-y-8">
            {/* NPK Analysis */}
            <SoilAnalysis npkLevels={recommendation.npkLevels} npkStatus={recommendation.npkStatus} />

            {/* Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Primary Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-agri-900/50 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sprout className="h-5 w-5 text-primary-400" />
                  Primary Fertilizers
                </h3>
                <ul className="space-y-2">
                  {recommendation.recommendations.primary.map((rec, index) => (
                    <li key={index} className="flex gap-2 text-sm text-gray-300">
                      <span className="text-primary-400">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Timing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-agri-900/50 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">Application Timing</h3>
                <ul className="space-y-2">
                  {recommendation.recommendations.timing.map((timing, index) => (
                    <li key={index} className="flex gap-2 text-sm text-gray-300">
                      <span className="text-cyan-400">{index + 1}.</span>
                      <span>{timing}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Organic Alternatives */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-green-400 mb-4">Organic Options</h3>
                <ul className="space-y-2">
                  {recommendation.recommendations.organic.map((organic, index) => (
                    <li key={index} className="flex gap-2 text-sm text-gray-300">
                      <span className="text-green-400">🌿</span>
                      <span>{organic}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Product Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-agri-900/50 border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Recommended Products</h3>
                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                  <DollarSign className="h-5 w-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">
                    ₹{recommendation.totalCost.toLocaleString()}/hectare
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendation.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <div>
                      <p className="font-bold text-white">{product.name}</p>
                      <p className="text-sm text-gray-400">
                        NPK: {product.npk} | {product.brand}
                      </p>
                      <p className="text-xs text-primary-400 mt-1">{product.applicationRate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">₹{product.price}/kg</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </Container>
    </div>
  );
}
