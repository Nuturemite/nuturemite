import { Settings } from "../models/model.js";
import { refreshSettingsCache } from "./settings.cache.js";

export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.status(200).json({ data: settings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate({}, req.body, {
      new: true,
    });
    await refreshSettingsCache();
    res.status(200).json({ data: settings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
