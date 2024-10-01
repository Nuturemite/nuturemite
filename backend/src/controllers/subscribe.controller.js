import { Subscribe } from "../models/model.js";

export const createSubscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (await Subscribe.findOne({ email })) {
      return res.json({ message: "Already Subscribed" });
    }
    await Subscribe.create({ email });
    res.json({ message: "Subscribed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubscribes = async (req, res) => {
  try {
    const subscribes = await Subscribe.find();
    res.status(200).json(subscribes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;
    await Subscribe.findOneAndDelete({ email });
    res.status(200).json({ message: "Unsubscribed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
