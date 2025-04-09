// src/lib/GeminiService.ts

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export type GeminiMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

export class GeminiService {
  private history: GeminiMessage[] = [];

  // Reset conversation history
  public resetConversation(): void {
    this.history = [];
  }

  // Generate a response from Gemini API
  public async getResponse(userMessage: string): Promise<string> {
    try {
      // Add user message to history
      this.history.push({
        role: "user",
        parts: [{ text: userMessage }],
      });

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: this.history,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.error?.message || "Failed to get response from Gemini";
        throw new Error(errorMessage);
      }

      const responseText =
        data?.candidates[0]?.content?.parts[0]?.text ||
        "Sorry, I couldn't generate a response";

      // Add model response to history
      this.history.push({
        role: "model",
        parts: [{ text: responseText }],
      });

      // Keep history limited to last 10 messages to avoid token limits
      if (this.history.length > 10) {
        this.history = this.history.slice(this.history.length - 10);
      }

      return responseText;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return `Sorry, I encountered an error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`;
    }
  }
}

// Create a singleton instance
const geminiService = new GeminiService();
export default geminiService;
