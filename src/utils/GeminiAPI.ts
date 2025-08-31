// Replace this with your actual API key from https://aistudio.google.com/apikey
const API_KEY = "AIzaSyAZk5OEZQqU5ZO6_QdIlGRS6vUNx1OGSQA"; // ← Replace this with your actual key
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";


export async function getGeminiResponse(prompt: string): Promise<string> {
  try {
    // console.log("Sending request to Gemini API");

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data);

      if (data.error?.message) {
        return `API Error: ${data.error.message}`;
      }

      return "Sorry, there was an error processing your request. Please check your API key.";
    }

    // Extract response text
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Unexpected response format:", data);
      return "Sorry, I received an unexpected response format from the API.";
    }
  } catch (error) {
    console.error("Network error:", error);
    return "Sorry, I couldn't connect to the AI service. Please check your internet connection.";
  }
}

// Test function to verify API connection
export async function testGeminiConnection(): Promise<boolean> {
  try {
    // Use a simple test prompt
    const testResponse = await getGeminiResponse("Hello");
    return !testResponse.includes("Error") && !testResponse.includes("configure");
  } catch (error) {
    console.error("Test connection failed:", error);
    return false;
  }
}