import { API_CONFIG, GENERATION_CONFIG, ERROR_MESSAGES } from "../constants/api";
import type { GeminiRequest, GeminiResponse } from "../types/api";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const buildApiUrl = (): string => {
  return `${API_CONFIG.BASE_URL}/${API_CONFIG.MODEL}:${API_CONFIG.ENDPOINT}`;
};

const buildRequestBody = (prompt: string): GeminiRequest => ({
  contents: [{
    parts: [{
      text: prompt
    }]
  }],
  generationConfig: GENERATION_CONFIG
});

const cleanMarkdownFormatting = (text: string): string => {
  return text.replace(/\*\*(.*?)\*\*/g, '$1');
};

const extractResponseText = (data: GeminiResponse): string | null => {
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return text ? cleanMarkdownFormatting(text) : null;
};

export async function getGeminiResponse(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${buildApiUrl()}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildRequestBody(prompt)),
    });

    const data: GeminiResponse = await response.json();

    if (!response.ok) {
      console.error("API Error:", data);
      
      if (data.error?.message) {
        return `API Error: ${data.error.message}`;
      }
      
      return ERROR_MESSAGES.API_KEY_ERROR;
    }

    const responseText = extractResponseText(data);
    if (responseText) {
      return responseText;
    }
    
    console.error("Unexpected response format:", data);
    return ERROR_MESSAGES.UNEXPECTED_FORMAT;
  } catch (error) {
    console.error("Network error:", error);
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
}

export async function testGeminiConnection(): Promise<boolean> {
  try {
    const testResponse = await getGeminiResponse("Hello");
    return !testResponse.includes("Error") && !testResponse.includes("configure");
  } catch (error) {
    console.error("Test connection failed:", error);
    return false;
  }
}