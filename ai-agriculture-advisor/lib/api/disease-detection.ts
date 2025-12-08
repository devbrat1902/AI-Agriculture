// Mock Disease Detection API

export interface DiseaseAnalysis {
  disease: {
    name: string;
    scientificName: string;
    confidence: number;
    severity: "low" | "medium" | "high";
  };
  affectedArea: number;
  treatments: {
    immediate: string[];
    chemical: string[];
    organic: string[];
    prevention: string[];
  };
  additionalInfo: string;
}

const mockDiseases = [
  {
    disease: {
      name: "Tomato Leaf Blight",
      scientificName: "Phytophthora infestans",
      confidence: 89,
      severity: "high" as const,
    },
    affectedArea: 35,
    treatments: {
      immediate: [
        "Remove and destroy all infected leaves immediately",
        "Isolate affected plants from healthy ones",
        "Reduce watering and avoid overhead irrigation",
        "Improve air circulation around plants",
      ],
      chemical: [
        "Apply copper-based fungicide (Bordeaux mixture)",
        "Use Mancozeb 75% WP @ 2g/liter of water",
        "Spray Metalaxyl + Mancozeb combination",
        "Repeat application every 7-10 days",
      ],
      organic: [
        "Neem oil spray (5ml/liter) every 5 days",
        "Garlic extract solution",
        "Baking soda solution (1 tbsp/liter)",
        "Milk spray (1:9 ratio with water)",
      ],
      prevention: [
        "Use disease-resistant varieties",
        "Maintain proper plant spacing for air flow",
        "Avoid working with plants when wet",
        "Crop rotation with non-solanaceous plants",
        "Mulch to prevent soil splash",
      ],
    },
    additionalInfo:
      "Late blight spreads rapidly in cool, wet conditions. Act quickly to prevent total crop loss. Monitor weather forecasts and spray preventively during high-risk periods.",
  },
  {
    disease: {
      name: "Wheat Rust",
      scientificName: "Puccinia graminis",
      confidence: 92,
      severity: "medium" as const,
    },
    affectedArea: 22,
    treatments: {
      immediate: [
        "Scout fields regularly for early detection",
        "Remove volunteer wheat plants",
        "Document affected areas for monitoring",
      ],
      chemical: [
        "Apply Propiconazole 25% EC @ 1ml/liter",
        "Use Tebuconazole 50% + Trifloxystrobin 25%",
        "Spray Azoxystrobin 23% SC",
        "Apply at first sign of rust pustules",
      ],
      organic: [
        "Sulfur dust application",
        "Garlic-chili extract spray",
        "Wood ash dusting",
      ],
      prevention: [
        "Plant rust-resistant varieties",
        "Adjust planting dates to avoid peak rust season",
        "Balanced nitrogen fertilization",
        "Remove alternative rust hosts nearby",
      ],
    },
    additionalInfo:
      "Wheat rust can reduce yields by 40-50% if left untreated. Early application of fungicides is crucial for effective control.",
  },
  {
    disease: {
      name: "Rice Bacterial Leaf Blight",
      scientificName: "Xanthomonas oryzae",
      confidence: 85,
      severity: "high" as const,
    },
    affectedArea: 28,
    treatments: {
      immediate: [
        "Drain excess water from fields",
        "Remove infected plant debris",
        "Avoid nitrogen fertilizer application",
      ],
      chemical: [
        "Copper oxychloride 50% WP @ 3g/liter",
        "Streptocycline 500ppm + Copper oxychloride",
        "Spray Validamycin 3% SL",
      ],
      organic: [
        "Pseudomonas fluorescens seed treatment",
        "Azadirachtin-based products",
        "Biocontrol agents",
      ],
      prevention: [
        "Use certified disease-free seeds",
        "Avoid deep water and excessive nitrogen",
        "Plant resistant varieties",
        "Maintain balanced fertilization",
      ],
    },
    additionalInfo:
      "Bacterial blight is most severe during the monsoon season. Prevent by using resistant varieties and avoiding injury to plants during cultivation.",
  },
];

export async function analyzeDiseaseImage(imageFile: File): Promise<DiseaseAnalysis> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2500));

  // Randomly select a disease for demonstration
  const randomDisease = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];

  // Simulate some variation in confidence
  const confidenceVariation = Math.floor(Math.random() * 10) - 5;
  return {
    ...randomDisease,
    disease: {
      ...randomDisease.disease,
      confidence: Math.min(95, Math.max(75, randomDisease.disease.confidence + confidenceVariation)),
    },
  };
}
