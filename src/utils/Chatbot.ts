import { Chatbot } from "supersimpledev";

export async function getChatbotResponse(input: string): Promise<string> {
  return await Chatbot.getResponseAsync(input);
}