export const API_CONFIG = {
  BASE_URL: "https://generativelanguage.googleapis.com/v1beta/models",
  MODEL: "gemini-2.0-flash",
  ENDPOINT: "generateContent",
} as const;

export const GENERATION_CONFIG = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 1024,
} as const;

export const ERROR_MESSAGES = {
  API_KEY_ERROR: "Sorry, there was an error processing your request. Please check your API key.",
  NETWORK_ERROR: "Sorry, I couldn't connect to the AI service. Please check your internet connection.",
  UNEXPECTED_FORMAT: "Sorry, I received an unexpected response format from the API.",
  CONNECTION_FAILED: "Failed to connect to the chatbot service. Please check your API key and try again.",
  GENERAL_ERROR: "Sorry, I encountered an error. Please try again.",
} as const;