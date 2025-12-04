import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProfileBio = async (
  name: string,
  education: string,
  profession: string,
  city: string,
  sect: string
): Promise<string> => {
  try {
    const prompt = `
      Write a respectful, concise, and appealing matrimonial profile bio (approx 30-50 words) for a person with these details:
      Name: ${name}
      Education: ${education}
      Profession: ${profession}
      City: ${city}
      Sect/Community: ${sect}
      
      Tone: Traditional, polite, and serious about marriage.
      Language: English (can have a slight South Asian touch).
      Do not include placeholders.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate bio.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating bio. Please write manually.";
  }
};