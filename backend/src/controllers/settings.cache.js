import NodeCache from "node-cache";
import { Settings } from "../models/model.js";

const cache = new NodeCache({ stdTTL: 3600000 });

export const getSettings = async () => {
  try {
    const cachedSettings = cache.get("settings");
    if (cachedSettings) {
      return cachedSettings;
    }
    const settings = await fetchSettings();
    cache.set("settings", settings);
    return settings;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const refreshSettingsCache = async () => {
  try {
    const settings = await fetchSettings();
    cache.set("settings", settings);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchSettings = async () => {
  try {
    const settings = await Settings.findOne();
    return settings;
  } catch (error) {
    console.error(error);
    throw error;
  }
};