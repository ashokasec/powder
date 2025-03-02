import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "@/lib/env";
import { ARTIFACT_PROMPT, KEY_FEATURES_PROMPT, OUTPUT_STRUCTURE } from "./prompts";

const MODEL = "gemini-1.5-flash";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL });

export const generateFromPrompt = async (prompt: string) => {
  const result = await model.generateContent(`${ARTIFACT_PROMPT} Your goal is to create an email template for subject/topic ${prompt} that is both functional and visually engaging, providing a seamless experience for users on any device. ${KEY_FEATURES_PROMPT} ${OUTPUT_STRUCTURE}`);
  return result.response.text();
};
