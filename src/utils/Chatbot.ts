import { getGeminiResponse } from "./GeminiAPI";

export async function getChatbotResponse(message: string): Promise<string> {
  return await getGeminiResponse(message);
}