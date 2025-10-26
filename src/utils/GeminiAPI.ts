import { ERROR_MESSAGES } from "../constants/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getGeminiResponse(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data);
      return `API Error: ${data.error || 'Unknown error'}`;
    }

    return data.response || ERROR_MESSAGES.UNEXPECTED_FORMAT;
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