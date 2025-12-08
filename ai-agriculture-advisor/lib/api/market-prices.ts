// Mock Market Prices API

export interface CropPrice {
  id: string;
  crop: string;
  category: "Grains" | "Vegetables" | "Fruits";
  market: string;
  price: number; // Rs per quintal
  change: number; // percentage
  history: number[]; // last 7 days
}

export interface MarketData {
  prices: CropPrice[];
  topGainers: CropPrice[];
  topLosers: CropPrice[];
  averageChange: number;
  prediction: {
    crop: string;
    currentPrice: number;
    predictedPrice: number;
    confidence: number;
    timeframe: string;
  };
}

const crops: Omit<CropPrice, "price" | "change" | "history">[] = [
  { id: "1", crop: "Wheat", category: "Grains", market: "APMC Pune" },
  { id: "2", crop: "Rice (Basmati)", category: "Grains", market: "APMC Delhi" },
  { id: "3", crop: "Maize", category: "Grains", market: "APMC Hyderabad" },
  { id: "4", crop: "Cotton", category: "Grains", market: "APMC Ahmedabad" },
  { id: "5", crop: "Soybean", category: "Grains", market: "APMC Indore" },
  { id: "6", crop: "Tomato", category: "Vegetables", market: "APMC Bangalore" },
  { id: "7", crop: "Onion", category: "Vegetables", market: "APMC Nashik" },
  { id: "8", crop: "Potato", category: "Vegetables", market: "APMC Agra" },
  { id: "9", crop: "Cabbage", category: "Vegetables", market: "APMC Pune" },
  { id: "10", crop: "Cauliflower", category: "Vegetables", market: "APMC Delhi" },
  { id: "11", crop: "Mango", category: "Fruits", market: "APMC Mumbai" },
  { id: "12", crop: "Banana", category: "Fruits", market: "APMC Chennai" },
  { id: "13", crop: "Apple", category: "Fruits", market: "APMC Shimla" },
  { id: "14", crop: "Grapes", category: "Fruits", market: "APMC Nashik" },
  { id: "15", crop: "Pomegranate", category: "Fruits", market: "APMC Solapur" },
];

const basePrices: Record<string, number> = {
  "Wheat": 2100,
  "Rice (Basmati)": 3500,
  "Maize": 1800,
  "Cotton": 6000,
  "Soybean": 4200,
  "Tomato": 1200,
  "Onion": 2500,
  "Potato": 1500,
  "Cabbage": 800,
  "Cauliflower": 1000,
  "Mango": 3000,
  "Banana": 2000,
  "Apple": 8000,
  "Grapes": 4500,
  "Pomegranate": 5000,
};

function generatePriceHistory(basePrice: number): number[] {
  const history: number[] = [];
  let currentPrice = basePrice;

  for (let i = 0; i < 7; i++) {
    const variation = (Math.random() - 0.5) * 0.1; //  ±10% variation
    currentPrice = currentPrice * (1 + variation);
    history.push(Math.round(currentPrice));
  }

  return history;
}

function generateCropPrices(): CropPrice[] {
  return crops.map((crop) => {
    const basePrice = basePrices[crop.crop] || 2000;
    const history = generatePriceHistory(basePrice);
    const currentPrice = history[history.length - 1];
    const previousPrice = history[history.length - 2];
    const change = ((currentPrice - previousPrice) / previousPrice) * 100;

    return {
      ...crop,
      price: currentPrice,
      change: Math.round(change * 10) / 10,
      history,
    };
  });
}

export async function getMarketPrices(): Promise<MarketData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  const prices = generateCropPrices();

  // Sort for top gainers/losers
  const sorted = [...prices].sort((a, b) => b.change - a.change);
  const topGainers = sorted.slice(0, 3);
  const topLosers = sorted.slice(-3).reverse();

  // Calculate average change
  const totalChange = prices.reduce((sum, p) => sum + p.change, 0);
  const averageChange = Math.round((totalChange / prices.length) * 10) / 10;

  // Generate prediction for a random high-value crop
  const predictableCrops = prices.filter((p) => p.price > 2000);
  const randomCrop = predictableCrops[Math.floor(Math.random() * predictableCrops.length)];
  const predictedChange = (Math.random() - 0.3) * 0.15; // Slight upward bias
  const predictedPrice = Math.round(randomCrop.price * (1 + predictedChange));

  return {
    prices,
    topGainers,
    topLosers,
    averageChange,
    prediction: {
      crop: randomCrop.crop,
      currentPrice: randomCrop.price,
      predictedPrice,
      confidence: 75 + Math.round(Math.random() * 15),
      timeframe: "next 7 days",
    },
  };
}
