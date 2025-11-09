
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// This is a placeholder for the API key. In a real application,
// this should be stored securely and not hardcoded.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

const fileToGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
};

export const diagnoseProblem = async (prompt: string, image?: { base64: string, mimeType: string }): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("AI Service is not configured. Please set the API_KEY environment variable.");
  }
  
  try {
    const systemInstruction = `You are "Karbin," an expert AI car mechanic. Your role is to assist drivers by diagnosing car problems.
      When a user describes an issue, provide a clear, concise, and helpful response structured as follows:
      1.  **Probable Diagnosis:** Start with the most likely cause of the problem. Be direct and easy to understand.
      2.  **Step-by-Step Guidance:** Offer a simple, numbered list of steps the user can take to verify the issue or perform a basic fix. Prioritize safety and warn the user if a task is dangerous or requires professional tools.
      3.  **Recommendation:** Conclude with a recommendation. If it's a simple fix, say so. If the problem is complex or requires a professional, strongly advise them to contact a certified mechanic or a nearby service provider.

      Analyze any provided images to enhance the accuracy of your diagnosis. Your tone should be reassuring, professional, and helpful.`;
    
    const contents = [];
    if (image) {
      contents.push(fileToGenerativePart(image.base64, image.mimeType));
    }
    contents.push({ text: prompt });

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: { parts: contents },
      config: {
        systemInstruction: systemInstruction,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error while analyzing the problem. Please check your connection and try again.";
  }
};
