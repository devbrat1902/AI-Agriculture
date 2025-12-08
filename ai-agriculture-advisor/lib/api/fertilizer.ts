// Mock Fertilizer Recommendation API

export interface SoilData {
  soilType: "Loamy" | "Clay" | "Sandy" | "Silt";
  pH: number;
  crop: string;
}

export interface NPKLevels {
  nitrogen: number; // 0-100
  phosphorus: number; // 0-100
  potassium: number; // 0-100
}

export interface FertilizerProduct {
  name: string;
  npk: string; // e.g., "20-20-20"
  price: number; // Rs per kg
  applicationRate: string; // kg/hectare
  brand: string;
}

export interface FertilizerRecommendation {
  npkLevels: NPKLevels;
  npkStatus: {
    nitrogen: "deficient" | "adequate" | "excess";
    phosphorus: "deficient" | "adequate" | "excess";
    potassium: "deficient" | "adequate" | "excess";
  };
  recommendations: {
    primary: string[];
    timing: string[];
    organic: string[];
  };
  products: FertilizerProduct[];
  totalCost: number; // Rs/hectare
}

const cropNPKRequirements: Record<string, { n: number; p: number; k: number }> = {
  wheat: { n: 120, p: 60, k: 40 },
  rice: { n: 80, p: 40, k: 40 },
  maize: { n: 120, p: 60, k: 40 },
  tomato: { n: 120, p: 80, k: 60 },
  potato: { n: 150, p: 75, k: 125 },
  cotton: { n: 120, p: 60, k: 60 },
  sugarcane: { n: 200, p: 60, k: 80 },
  onion: { n: 100, p: 50, k: 50 },
  cabbage: { n: 150, p: 75, k: 75 },
};

const fertilizerProducts: FertilizerProduct[] = [
  { name: "Urea", npk: "46-0-0", price: 6, applicationRate: "260 kg", brand: "IFFCO" },
  { name: "DAP", npk: "18-46-0", price: 27, applicationRate: "130 kg", brand: "IFFCO" },
  { name: "MOP", npk: "0-0-60", price: 17, applicationRate: "65 kg", brand: "IPL" },
  { name: "NPK Complex", npk: "20-20-20", price: 22, applicationRate: "200 kg", brand: "Coromandel" },
  { name: "SSP", npk: "0-16-0", price: 5, applicationRate: "375 kg", brand: "Tata" },
];

function calculateNPKLevels(data: SoilData): NPKLevels {
  const baseN = data.soilType === "Loamy" ? 60 : data.soilType === "Clay" ? 50 : 40;
  const baseP = data.soilType === "Loamy" ? 50 : data.soilType === "Clay" ? 60 : 30;
  const baseK = data.soilType === "Sandy" ? 30 : data.soilType === "Loamy" ? 55 : 50;

  // pH affects nutrient availability
  const pHFactor = Math.abs(7.0 - data.pH) / 3;

  return {
    nitrogen: Math.round(Math.max(20, Math.min(80, baseN - pHFactor * 15))),
    phosphorus: Math.round(Math.max(20, Math.min(80, baseP - pHFactor * 10))),
    potassium: Math.round(Math.max(20, Math.min(80, baseK - pHFactor * 10))),
  };
}

function getNPKStatus(levels: NPKLevels): FertilizerRecommendation["npkStatus"] {
  const getStatus = (level: number) => {
    if (level < 40) return "deficient";
    if (level > 70) return "excess";
    return "adequate";
  };

  return {
    nitrogen: getStatus(levels.nitrogen),
    phosphorus: getStatus(levels.phosphorus),
    potassium: getStatus(levels.potassium),
  };
}

export async function getFertilizerRecommendation(data: SoilData): Promise<FertilizerRecommendation> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const npkLevels = calculateNPKLevels(data);
  const npkStatus = getNPKStatus(npkLevels);
  const cropReq = cropNPKRequirements[data.crop.toLowerCase()] || cropNPKRequirements.wheat;

  const recommendations: FertilizerRecommendation["recommendations"] = {
    primary: [],
    timing: [],
    organic: [],
  };

  // Generate recommendations based on deficiencies
  if (npkStatus.nitrogen === "deficient") {
    recommendations.primary.push(`Apply Urea @ ${Math.round(cropReq.n * 0.6)} kg/hectare for Nitrogen`);
    recommendations.primary.push("Split nitrogen application: 50% basal, 25% at tillering, 25% at flowering");
  } else if (npkStatus.nitrogen === "adequate") {
    recommendations.primary.push(`Apply Urea @ ${Math.round(cropReq.n * 0.4)} kg/hectare for maintenance`);
  }

  if (npkStatus.phosphorus === "deficient") {
    recommendations.primary.push(`Apply DAP @ ${Math.round(cropReq.p * 1.2)} kg/hectare for Phosphorus`);
    recommendations.primary.push("Apply full phosphorus dose at sowing time");
  }

  if (npkStatus.potassium === "deficient") {
    recommendations.primary.push(`Apply MOP @ ${Math.round(cropReq.k * 1.3)} kg/hectare for Potassium`);
  }

  // Timing recommendations
  recommendations.timing.push("Basal application: 2-3 days before sowing");
  recommendations.timing.push("First top-dressing: 20-25 days after sowing");
  recommendations.timing.push("Second top-dressing: At flowering/grain formation");
  recommendations.timing.push("Irrigate immediately after each application");

  // Organic alternatives
  recommendations.organic.push("Farmyard Manure (FYM): 10-15 tons/hectare before sowing");
  recommendations.organic.push("Vermicompost: 5 tons/hectare as basal dose");
  recommendations.organic.push("Green manure: Grow Dhaincha/Sunhemp and incorporate before flowering");
  recommendations.organic.push("Neem cake: 250 kg/hectare for pest control + nutrients");

  // Select relevant products
  const selectedProducts = fertilizerProducts.filter((p) =>
    (npkStatus.nitrogen === "deficient" && p.npk.startsWith("46")) ||
    (npkStatus.phosphorus === "deficient" && p.npk.includes("46")) ||
    (npkStatus.potassium === "deficient" && p.npk.endsWith("60")) ||
    p.npk === "20-20-20"
  );

  const totalCost = selectedProducts.reduce((sum, p) => {
    const rate = parseInt(p.applicationRate);
    return sum + (rate * p.price);
  }, 0);

  return {
    npkLevels,
    npkStatus,
    recommendations,
    products: selectedProducts,
    totalCost: Math.round(totalCost),
  };
}
