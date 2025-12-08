import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Info, ChevronDown, Save, Share2 } from "lucide-react";
import { DiseaseAnalysis } from "@/lib/api/disease-detection";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface AnalysisResultsProps {
  analysis: DiseaseAnalysis;
  onSave?: () => void;
  onShare?: () => void;
}

export function AnalysisResults({ analysis, onSave, onShare }: AnalysisResultsProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("immediate");

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30" };
      case "medium":
        return { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" };
      default:
        return { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" };
    }
  };

  const getConfidenceColor = (): "primary" | "success" | "warning" | "danger" => {
    if (analysis.disease.confidence >= 85) return "success";
    if (analysis.disease.confidence >= 70) return "primary";
    if (analysis.disease.confidence >= 50) return "warning";
    return "danger";
  };

  const severityColors = getSeverityColor(analysis.disease.severity);

  const treatmentSections = [
    { id: "immediate", title: "Immediate Actions", icon: AlertTriangle, items: analysis.treatments.immediate },
    { id: "chemical", title: "Chemical Treatments", icon: Info, items: analysis.treatments.chemical },
    { id: "organic", title: "Organic Alternatives", icon: CheckCircle, items: analysis.treatments.organic },
    { id: "prevention", title: "Prevention Tips", icon: Info, items: analysis.treatments.prevention },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Disease Info Card */}
      <div className="bg-agri-900/50 border border-white/10 rounded-2xl p-8 auth-form-glow">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Confidence Ring */}
          <div className="flex-shrink-0">
            <ProgressRing
              percentage={analysis.disease.confidence}
              size={140}
              strokeWidth={10}
              color={getConfidenceColor()}
            />
          </div>

          {/* Disease Details */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">
              {analysis.disease.name}
            </h2>
            <p className="text-gray-400 italic mb-4">
              {analysis.disease.scientificName}
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span
                className={cn(
                  "px-3 py-1 rounded-lg text-sm font-medium border",
                  severityColors.bg,
                  severityColors.text,
                  severityColors.border
                )}
              >
                {analysis.disease.severity.toUpperCase()} Severity
              </span>
              <span className="px-3 py-1 rounded-lg text-sm font-medium border bg-blue-500/20 text-blue-400 border-blue-500/30">
                {analysis.affectedArea}% Affected Area
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={onSave}
              variant="outline"
              className="border-gray-600 text-gray-300"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={onShare}
              variant="outline"
              className="border-gray-600 text-gray-300"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        {analysis.additionalInfo && (
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300">{analysis.additionalInfo}</p>
            </div>
          </div>
        )}
      </div>

      {/* Treatment Recommendations */}
      <div className="bg-agri-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-6">Treatment Recommendations</h3>

        <div className="space-y-3">
          {treatmentSections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSection === section.id;

            return (
              <div
                key={section.id}
                className="border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                  className="w-full p-4 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary-400" />
                    <span className="font-medium text-white">{section.title}</span>
                    <span className="text-xs text-gray-500">
                      ({section.items.length} steps)
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-gray-400 transition-transform",
                      isExpanded && "rotate-180"
                    )}
                  />
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 bg-black/20"
                  >
                    <ul className="space-y-2">
                      {section.items.map((item, index) => (
                        <li
                          key={index}
                          className="flex gap-3 text-sm text-gray-300"
                        >
                          <span className="text-primary-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
