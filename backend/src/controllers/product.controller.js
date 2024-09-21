import { Product, SubOrder } from "../models/model.js";
import slugify from "slugify";
// Create a new product
export const createProduct = async (req, res) => {
  try {
    req.body.vendor = req.user.vendorId;
    req.body.slug = await createSlug(req.body.name);
    const product = new Product(req.body);
    await product.save();
    console.log(product);
    res.status(201).json({ message: "Product created successfully!", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const findBySlug = async (slug) => {
  try {
    const product = await Product.findOne({ slug });
    return product;
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("categories", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (req.user) {
      product.hasUserBought = await hasUserBoughtProduct(req.params.id, req.user.id);
    }
    res.json({ data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await findBySlug(req.params.slug);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const hasUserBoughtProduct = async (productId, userId) => {
  try {
    const hasBought = await SubOrder.findOne({
      product: productId,
      user: userId,
    });
    return hasBought;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await Product.find({})
      .populate("categories", "name id")
      .populate({
        path: "brands",
        options: { strictPopulate: false },
      })
      .populate("vendor", "name id");

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
    if(req.body.name) {
      req.body.slug = await createSlug(req.body.name);
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


const createSlug = async (name) => {
  const slug = slugify(name, { lower: true, strict: true, trim: true });
  const product = await Product.findOne({ slug });
  if (product) {
    return slugify(name + " " + Date.now(), { lower: true, strict: true, trim: true });
  }
  return slug;
};
