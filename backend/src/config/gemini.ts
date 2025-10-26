import dotenv from 'dotenv';
dotenv.config();

export const API_CONFIG = {
  BASE_URL: "https://generativelanguage.googleapis.com/v1beta/models",
  MODEL: "gemini-2.0-flash",
  ENDPOINT: "generateContent",
  API_KEY: process.env.GEMINI_API_KEY as string
} as const;

export const GENERATION_CONFIG = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 1024,
} as const;