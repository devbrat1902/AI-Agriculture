import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Agriculture-focused system instruction
const SYSTEM_INSTRUCTION = `You are an expert agricultural advisor specifically for Indian farmers. Your role is to provide practical, actionable farming advice.

Key responsibilities:
- Provide crop-specific guidance for Indian climate and soil conditions
- Offer pest and disease management solutions using both organic and chemical methods
- Give irrigation and water management advice
- Suggest fertilizer recommendations based on soil conditions
- Provide market insights and selling strategies
- Offer seasonal planting calendars
- Share weather-related farming tips
- Recommend government schemes and subsidies for farmers

Important guidelines:
- Always provide practical, implementable advice
- Consider Indian farming context (monsoons, local crops, regional practices)
- Suggest both traditional and modern farming techniques
- Be concise but thorough
- Use simple language that farmers can understand
- Recommend cost-effective solutions
- Prioritize sustainable and eco-friendly practices when possible
- Reference Indian crops: wheat, rice, cotton, sugarcane, pulses, vegetables, etc.

When asked about:
- Diseases: Identify symptoms, suggest treatments, and preventive measures
- Weather: Provide farming actions based on weather conditions
- Markets: Give guidance on best selling times and price trends
- Fertilizers: Recommend NPK ratios and organic alternatives
- Irrigation: Advise on water schedules and methods`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Initialize Gemini model with agriculture context
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Build conversation context if history exists
    let prompt = message;
    if (conversationHistory && conversationHistory.length > 0) {
      const context = conversationHistory
        .slice(-5) // Last 5 messages for context
        .map((msg: any) => `${msg.role === "user" ? "Farmer" : "Advisor"}: ${msg.content}`)
        .join("\n");
      prompt = `${context}\nFarmer: ${message}`;
    }

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      response: text,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);

    // Handle specific errors
    if (error.message?.includes("API key")) {
      return NextResponse.json(
        { error: "Invalid API key configuration" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate response. Please try again." },
      { status: 500 }
    );
  }
}
