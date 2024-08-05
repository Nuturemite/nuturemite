import { Product } from "../models/model.js";
import { uploadImage } from "../utils/uploadFile.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    let images = [];
    console.log(req.body);
    if (req.files) {
      if (req.files.image) {
        const url = await uploadImage(req.files.image.data, "nuturemite/product/uploads");
        req.body.image = url;
      }
      if (req.files["images[]"]) {
        const uploadPromises = req.files["images[]"].map(async image => {
          const url = await uploadImage(image.data, "nuturemite/product/uploads");
          return url;
        });
        images = await Promise.all(uploadPromises);
        req.body.images = images;
      }
    }
    req.body.vendor = req.user.vendorId;
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product created successfully!", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("categories", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await Product.find()
      .populate("categories", "name id")
      .populate({
        path: "brands",
        options: { strictPopulate: false },
      });

    const total = await Product.countDocuments();

    res.json({
      data: products,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    let images = [];
    if (req.files) {
      if (req.files.image) {
        const url = await uploadImage(req.files.image.data, "nuturemite/product/uploads");
        req.body.image = url;
      }
      if (req.files["images[]"]) {
        const uploadPromises = req.files["images[]"].map(async image => {
          const url = await uploadImage(image.data, "nuturemite/product/uploads");
          return url;
        });
        images = await Promise.all(uploadPromises);
        req.body.images = images;
      }
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated successfully!", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
