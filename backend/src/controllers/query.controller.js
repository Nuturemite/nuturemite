import { generateQuery } from "./gemini.controller.js";
import * as models from "../models/model.js";

export const getAIAnalyticsQuery = async (req, res) => {
  try {
    const geminiResult = await generateQuery(req.body.query);
    const mongoResult = await models[geminiResult.model].aggregate(geminiResult.query);
    console.dir(geminiResult, { depth: null });
    const resData = {
      prompt: geminiResult.prompt,
      resStructure: geminiResult.resStructure,
      tableConfig: geminiResult.tableConfig,
      data: mongoResult,
    };
    res.json(resData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
