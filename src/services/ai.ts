import { GoogleGenAI, Type } from "@google/genai";

let genAIInstance: GoogleGenAI | null = null;

function getGenAI() {
  if (!genAIInstance) {
    // @ts-ignore
    const apiKey = (process.env.GEMINI_API_KEY) || (import.meta as any).env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Neural Link Offline. Please configure your GEMINI_API_KEY in settings.");
    }
    genAIInstance = new GoogleGenAI(apiKey);
  }
  return genAIInstance;
}

export const aiService = {
  /**
   * Get personalized food recommendations based on mood, time, and budget.
   */
  async getRecommendations(prompt: string) {
    try {
      const genAI = getGenAI() as any;
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const systemInstruction = `
        You are G-Astra, the elite neural hospitality coordinator for GastroHub, a futuristic food platform.
        Output in JSON format only.
        
        Capabilities:
        1. Contextual recommendations (mood, diet, time).
        2. Order tracking status explanations.
        3. Reservation assistance.
        4. General FAQs about the GastroHub metropolitan grid.
        
        Tone: Professional, futuristic, slightly technical/neuromorphic.
      `;

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    dish: { type: Type.STRING },
                    restaurant: { type: Type.STRING },
                    reason: { type: Type.STRING },
                    priceRange: { type: Type.STRING },
                    estimatedTime: { type: Type.STRING }
                  },
                  required: ["dish", "restaurant", "reason"]
                }
              },
              summary: { type: Type.STRING }
            },
            required: ["recommendations", "summary"]
          }
        }
      });

      const responseText = result.response.text();
      return JSON.parse(responseText || "{}");
    } catch (error) {
      console.error("AI Recommendation Error:", error);
      const message = error instanceof Error ? error.message : "Failed to link with Metagrid. Attempting recalibration.";
      return { error: message };
    }
  },

  /**
   * Generate an AI review assistant response.
   */
  async getReviewAssistance(reviewTopic: string) {
    try {
      const genAI = getGenAI() as any;
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const response = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: `Help me write a professional yet engaging review about: ${reviewTopic}` }] }],
        generationConfig: {
          maxOutputTokens: 200,
        }
      });

      return response.response.text();
    } catch (error) {
      console.error("AI Review Error:", error);
      return "AI review assistant currently unavailable.";
    }
  }
};
