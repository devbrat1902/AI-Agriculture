// Mock AI Chatbot API

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface QuickReply {
  id: string;
  text: string;
  category: string;
}

const quickReplies: QuickReply[] = [
  { id: "1", text: "How to prevent pests in wheat?", category: "pest" },
  { id: "2", text: "Best fertilizer for tomatoes?", category: "fertilizer" },
  { id: "3", text: "When to harvest rice?", category: "harvest" },
  { id: "4", text: "Symptoms of nitrogen deficiency", category: "soil" },
  { id: "5", text: "Organic pest control methods", category: "pest" },
  { id: "6", text: "Irrigation schedule for cotton", category: "water" },
];

const responses: Record<string, string> = {
  pest: `**Pest Management Tips:**

For effective pest control in crops, I recommend:

1. **Preventive Measures:**
   - Maintain crop rotation to break pest cycles
   - Remove crop residues after harvest
   - Use resistant varieties when available

2. **Organic Methods:**
   - Neem oil spray (5ml/liter water)
   - Introduce beneficial insects (ladybugs, lacewings)
   - Plant trap crops around main fields

3. **Chemical Control:**
   - Use only when pest threshold is exceeded
   - Follow recommended dosages
   - Rotate pesticide classes to prevent resistance

4. **Monitoring:**
   - Scout fields weekly
   - Use pheromone traps
   - Document pest populations

Would you like specific advice for a particular crop or pest?`,

  fertilizer: `**Fertilizer Recommendations:**

The right fertilizer depends on your crop and soil conditions. Here's a general guide:

1. **Nitrogen (N):** Essential for leaf growth
   - Urea (46% N)
   - Ammonium Sulfate (21% N)
   - Apply in split doses

2. **Phosphorus (P):** Promotes root development
   - DAP (18-46-0)
   - SSP (16% P2O5)
   - Apply at sowing time

3. **Potassium (K):** Improves disease resistance
   - MOP (60% K2O)
   - SOP (50% K2O)

4. **Application Tips:**
   - Soil test before application
   - Use balanced NPK ratios
   - Consider organic alternatives (compost, vermicompost)

For tomatoes specifically, use 120:80:60 NPK kg/hectare. Would you like details for another crop?`,

  harvest: `**Harvest Timing Guide:**

Harvesting at the right time is crucial for quality and yield:

**Key Indicators:**
1. **Grain Crops (Wheat/Rice):**
   - Moisture content: 20-25%
   - Golden yellow color
   - Hard dough stage
   - 80-90% maturity

2. **Vegetables:**
   - Firmness and color
   - Size appropriate for variety
   - Morning harvest preferred

3. **Best Practices:**
   - Use clean, sharp tools
   - Avoid harvesting in rain
   - Handle gently to prevent damage
   - Store in cool, dry place

**Rice Specific:**
- Harvest 25-30 days after flowering
- Panicles should bend down
- Grains should be 80% golden
- Moisture: 20-22%

Do you need harvesting guidelines for a specific crop?`,

  soil: `**Nitrogen Deficiency - Identification & Treatment:**

**Symptoms:**
- Yellowing of older leaves (chlorosis)
- Stunted plant growth
- Thin, spindly stems
- Reduced tillering in grains
- Poor yield

**Quick Fix:**
1. **Immediate Application:**
   - Urea @ 50 kg/hectare
   - Split into 2-3 doses
   - Water immediately after application

2. **Foliar Spray:**
   - 2% Urea solution
   - Spray in early morning
   - Repeat after 7-10 days

3. **Long-term Solution:**
   - Add compost (5-10 tons/hectare)
   - Grow green manure crops
   - Apply FYM before sowing

**Prevention:**
- Soil testing before planting
- Balanced fertilization
- Crop rotation with legumes

Would you like recommendations for other nutrient deficiencies?`,

  water: `**Irrigation Schedule Recommendations:**

Proper irrigation is essential for optimal crop growth:

**General Guidelines:**

1. **Critical Stages:**
   - Germination/seedling
   - Flowering
   - Grain filling
   - Never miss these stages!

2. **Irrigation Methods:**
   - **Drip:** 80-90% water efficiency
   - **Sprinkler:** 70-80% efficiency
   - **Flood:** 40-50% efficiency

3. **Schedule Factors:**
   - Soil type (sandy needs frequent, clay less)
   - Crop stage
   - Weather conditions
   - Soil moisture level

**Cotton Specific:**
- First irrigation: 3-4 weeks after sowing
- Frequency: Every 12-15 days
- Critical: Flowering & boll formation
- Stop 15-20 days before harvest

**Tips:**
- Irrigate in morning/evening
- Avoid water stress during flowering
- Check soil moisture at 6-inch depth

Need irrigation advice for another crop?`,

  default: `Thank you for your question! I'm here to help with:

🌾 **Crop Management**
- Planting schedules
- Growth stages
- Best varieties

🐛 **Pest & Disease Control**
- Identification
- Treatment options
- Prevention methods

💧 **Irrigation**
- Water requirements
- Scheduling
- Efficient methods

🌱 **Soil & Fertilizer**
- Nutrient management
- Soil testing
- Organic alternatives

📊 **Market Guidance**
- Price trends
- Selling strategies
- Storage tips

Could you please provide more details about your question? For example, which crop are you growing, and what specific issue are you facing?`,
};

function getResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  if (message.includes("pest") || message.includes("insect") || message.includes("bug")) {
    return responses.pest;
  }
  if (message.includes("fertilizer") || message.includes("npk") || message.includes("nutrient")) {
    return responses.fertilizer;
  }
  if (message.includes("harvest") || message.includes("when to cut")) {
    return responses.harvest;
  }
  if (message.includes("nitrogen") || message.includes("deficiency") || message.includes("yellow leaves")) {
    return responses.soil;
  }
  if (message.includes("irrigation") || message.includes("water") || message.includes("schedule")) {
    return responses.water;
  }

  return responses.default;
}

export async function sendMessage(userMessage: string): Promise<Message> {
  // Simulate typing delay
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1500));

  const response = getResponse(userMessage);

  return {
    id: Date.now().toString(),
    role: "assistant",
    content: response,
    timestamp: new Date(),
  };
}

export function getQuickReplies(): QuickReply[] {
  return quickReplies;
}
