import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_AI_KEY,
});

export async function AIChatSession(text) {
  const response = await ai.models.generateContent({
    model: 'learnlm-2.0-flash-experimental',
    contents: [
      {
        role: 'user',
        parts: [{ text }],
      },
    ],
  });

  const resultText = response.candidates[0].content.parts[0].text || '';
  return { text: resultText };
}
