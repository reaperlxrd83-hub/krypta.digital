import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIAnalysisResponse } from "./types";

// Vercel'deki Environment Variables kısmına VITE_GEMINI_API_KEY adıyla anahtarını eklemelisin
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const getMarketAnalysis = async (coinName: string): Promise<AIAnalysisResponse> => {
  if (!genAI) throw new Error("API Key eksik!");
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Analyze the current hypothetical market sentiment for ${coinName} specifically for an OTC (Over-the-counter) physical exchange client. Provide a concise response in JSON format including sentiment, a brief summary of why someone might buy/sell at a physical desk now, key price levels for the day, and a risk factor assessment. Use this JSON structure: {"sentiment": "Bullish", "summary": "...", "keyLevels": ["...", "..."], "riskFactor": "..."}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleanJson) as AIAnalysisResponse;
};