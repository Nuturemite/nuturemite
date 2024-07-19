import { Brand } from "../models/model.js";
import { uploadImage } from "../utils/uploadFile.js";

// Create a new brand
export const createBrand = async (req, res) => {
  try {
    if (req.files && req.files.image) {
      const url = await uploadImage(req.files.image.data, "nuturemite/brand/uploads");
      req.body.image = url;
    }
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json({ message: "Brand created successfully!", data: brand });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all brands
export const getAllBrands = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const brands = await Brand.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Brand.countDocuments();

    res.json({
      data: brands,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single brand
export const getBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.json({ data: brands });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a brand
export const updateBrand = async (req, res) => {
  try {
    if (req.files && req.files.image) {
      const url = await uploadImage(req.files.image.data, "nuturemite/brand/uploads");
      req.body.image = url;
    }
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.json({ message: "Brand updated successfully!", data: brand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a brand
export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.json({ message: "Brand deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
