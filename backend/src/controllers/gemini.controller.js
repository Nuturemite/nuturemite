import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
import { parts } from "../utils/part.js";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

export const generateQuery = async query => {
  parts.push({ text: query });
  parts.push({ text: "output: " });
  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
  });
  const data = result.response.text();
  console.log(data);
  const cleanData = data.trim().replaceAll("json", "").replaceAll("```", "").replaceAll("\\", "");
  const output = JSON.parse(cleanData);
  return output;
};
