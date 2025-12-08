"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { ImageUploader } from "@/components/disease/ImageUploader";
import { AnalysisResults } from "@/components/disease/AnalysisResults";
import { analyzeDiseaseImage, DiseaseAnalysis } from "@/lib/api/disease-detection";
import { Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function DiseaseDetectionPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DiseaseAnalysis | null>(null);

  const handleImageSelect = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const result = await analyzeDiseaseImage(file);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = () => {
    console.log("Save analysis:", analysis);
    // TODO: Implement save functionality
  };

  const handleShare = () => {
    console.log("Share analysis:", analysis);
    // TODO: Implement share functionality
  };

  const handleNewScan = () => {
    setAnalysis(null);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-400">
              AI-Powered Disease Detection
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Identify Crop Diseases Instantly
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Upload a photo of your crop and get accurate disease identification with treatment recommendations in seconds.
          </p>
        </div>

        {/* Main Content */}
        {!analysis && !isAnalyzing && (
          <div className="max-w-3xl mx-auto">
            <ImageUploader onImageSelect={handleImageSelect} />
          </div>
        )}

        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center py-12"
          >
            <div className="bg-agri-900/50 border border-white/10 rounded-2xl p-12 auth-form-glow">
              <Loader2 className="h-16 w-16 text-primary-400 animate-spin mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Analyzing Image...
              </h3>
              <p className="text-gray-400">
                Our AI is examining your crop for signs of disease
              </p>
              <div className="mt-6 space-y-2 text-sm text-gray-500">
                <p>✓ Image uploaded</p>
                <p>✓ Pre-processing complete</p>
                <p className="text-primary-400">⟳ Running AI analysis...</p>
              </div>
            </div>
          </motion.div>
        )}

        {analysis && (
          <div className="max-w-4xl mx-auto">
            <AnalysisResults
              analysis={analysis}
              onSave={handleSave}
              onShare={handleShare}
            />

            <div className="mt-8 text-center">
              <button
                onClick={handleNewScan}
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
              >
                ← Scan Another Image
              </button>
            </div>
          </div>
        )}

        {/* Info Section */}
        {!analysis && !isAnalyzing && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-agri-900/30 border border-white/10 rounded-xl">
              <div className="text-3xl font-bold text-primary-400 mb-2">98%</div>
              <p className="text-sm text-gray-400">Accuracy Rate</p>
            </div>
            <div className="text-center p-6 bg-agri-900/30 border border-white/10 rounded-xl">
              <div className="text-3xl font-bold text-primary-400 mb-2">50+</div>
              <p className="text-sm text-gray-400">Diseases Detected</p>
            </div>
            <div className="text-center p-6 bg-agri-900/30 border border-white/10 rounded-xl">
              <div className="text-3xl font-bold text-primary-400 mb-2">2sec</div>
              <p className="text-sm text-gray-400">Average Analysis Time</p>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
