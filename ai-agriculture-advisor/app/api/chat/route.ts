import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini with error checking
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("⚠️ GEMINI_API_KEY is not set in environment variables");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

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
    // Check if Gemini is initialized
    if (!genAI) {
      console.error("❌ Gemini AI not initialized - API key missing");
      return NextResponse.json(
        { error: "AI service not configured. Please check server configuration." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { message, conversationHistory } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    console.log("📨 Received message:", message.substring(0, 50) + "...");

    // Initialize Gemini model with agriculture context
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
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

    console.log("🚀 Sending to Gemini API...");

    // Generate response with timeout
    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 30000)
      )
    ]) as any;

    const response = await result.response;
    const text = response.text();

    console.log("✅ Gemini response received:", text.substring(0, 50) + "...");

    return NextResponse.json({
      response: text,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("❌ Gemini API Error:", error);
    console.error("Error details:", {
      message: error.message,
      name: error.name,
      stack: error.stack?.substring(0, 200)
    });

    // Handle specific errors
    if (error.message?.includes("API key") || error.message?.includes("API_KEY_INVALID")) {
      return NextResponse.json(
        { error: "Invalid API key. Please check your Gemini API configuration." },
        { status: 500 }
      );
    }

    if (error.message?.includes("timeout")) {
      return NextResponse.json(
        { error: "Request took too long. Please try again with a shorter message." },
        { status: 504 }
      );
    }

    if (error.message?.includes("quota") || error.message?.includes("rate limit")) {
      return NextResponse.json(
        { error: "API quota exceeded. Please try again in a moment." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate response. Please try again in a moment." },
      { status: 500 }
    );
  }
}
