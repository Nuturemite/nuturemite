import { Banner } from "../models/model.js";
import { uploadImage } from "../utils/uploadFile.js";

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({ data: banners });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBanner = async (req, res) => {
  try {
    if (req.files && req.files.image) {
      const url = await uploadImage(req.files.image.data, "nuturemite/banner/uploads");
      req.body.image = url;
    }
    const banner = await Banner.create(req.body);
    res.status(201).json({ data: banner });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: banner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};