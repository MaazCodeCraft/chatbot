import { Request, Response } from 'express';
import { API_CONFIG, GENERATION_CONFIG } from '../config/gemini.js';
import type { ChatRequest, GeminiRequest, GeminiResponse } from '../types/index.js';

const cleanMarkdownFormatting = (text: string): string => {
  return text.replace(/\*\*(.*?)\*\*/g, '$1');
};

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

export const getChatResponse = async (req: Request<{}, {}, ChatRequest>, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await fetch(`${buildApiUrl()}?key=${API_CONFIG.API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildRequestBody(message)),
    });

    const data: GeminiResponse = await response.json();

    if (!response.ok) {
      console.error("API Error:", data);
      return res.status(500).json({ 
        error: data.error?.message || 'API request failed' 
      });
    }

    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (responseText) {
      return res.json({ 
        response: cleanMarkdownFormatting(responseText) 
      });
    }

    return res.status(500).json({ 
      error: 'Unexpected response format from API' 
    });
  } catch (error) {
    console.error("Network error:", error);
    return res.status(500).json({ 
      error: 'Failed to connect to AI service' 
    });
  }
};