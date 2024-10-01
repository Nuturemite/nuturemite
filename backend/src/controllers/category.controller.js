import { Category } from "../models/model.js";
import { uploadImage } from "../utils/uploadFile.js";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    if (req.files) {
      const url = await uploadImage(req.files.image.data, "nuturemite/category/uploads");
      req.body.image = url;
    }
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ message: "Category created successfully!", data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all categories with pagination
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single category
export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);  
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category updated successfully!", data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
