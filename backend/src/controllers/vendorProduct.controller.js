import mongoose from "mongoose";
import { Category, VendorProduct } from "../models/model.js";
import { productPipeline } from "./pipeline/vendorProduct.pipeline.js";
// Create a new vendor product
export const createVendorProduct = async (req, res) => {
  try {
    req.body.vendor = req.user.id
    const vendorProduct = new VendorProduct(req.body);
    await vendorProduct.save();
    res.status(201).json({ message: "Vendor product created successfully!", data: vendorProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllVendorProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, minPrice, maxPrice, sortBy } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let sortStage;
    switch (sortBy) {
      case "pricelowtohigh":
        sortStage = { price: 1 };
        break;
      case "pricehightolow":
        sortStage = { price: -1 };
        break;
      case "discountlowtohigh":
        sortStage = { discount: 1 };
        break;
      case "discounthightolow":
        sortStage = { discount: -1 };
        break;
      case "latest":
        sortStage = { _id: -1 };
        break;
      default:
        sortStage = { _id: 1 };
        break;
    }

    const vendorProducts = await VendorProduct.aggregate([
      {
        $match: {
          $or: [
            minPrice ? { price: { $gte: parseFloat(minPrice) } } : {},
            maxPrice ? { price: { $lte: parseFloat(maxPrice) } } : {},
          ],
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $lookup: {
          from: "vendors",
          localField: "vendor",
          foreignField: "_id",
          as: "vendor",
        },
      },
      {
        $unwind: "$vendor",
      },
      {
        $lookup: {
          from: "categories",
          localField: "product.categories",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "product.brand",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        $addFields: {
          discount: { $subtract: ["$product.basePrice", "$price"] },
          isSale: { $gt: ["$discount", 0] },
          discountPercentage: {
            $multiply: [100, { $divide: ["$discount", "$product.basePrice"] }],
          },
        },
      },
      {
        $project: {
          _id: 1,
          vendor: {
            _id: "$vendor._id",
          },
          price: 1,
          inventory: 1,
          status: 1,
          productId: "$product._id",
          name: "$product.name",
          basePrice: "$product.basePrice",
          benefits: "$product.benefits",
          keywords: "$product.keywords",
          ingredients: "$product.ingredients",
          useInstructions: "$product.useInstructions",
          safetyPrecaution: "$product.safetyPrecaution",
          sku: "$product.sku",
          categories: "$categories",
          brand: { $arrayElemAt: ["$brand", 0] },
          images: "$product.images",
          isSale: "$product.isSale",
          slug: "$product.slug",
          description: "$product.description",
          discount: 1,
          discountPercentage: 1,
        },
      },
    ]);

    const totalItems = await VendorProduct.countDocuments({});

    res.json({
      data: vendorProducts,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single vendor product
export const getVendorProduct = async (req, res) => {
  try {
    const vendorProduct = await VendorProduct.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      ...productPipeline,
    ]);
    if (!vendorProduct.length) return res.status(404).json({ message: "Vendor product not found" });
    res.json({ data: vendorProduct[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a vendor product
export const updateVendorProduct = async (req, res) => {
  try {
    const vendorProduct = await VendorProduct.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!vendorProduct) return res.status(404).json({ message: "Vendor product not found" });
    res.json({ message: "Vendor product updated successfully!", data: vendorProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a vendor product
export const deleteVendorProduct = async (req, res) => {
  try {
    const vendorProduct = await VendorProduct.findByIdAndDelete(req.params.id);
    if (!vendorProduct) return res.status(404).json({ message: "Vendor product not found" });
    res.json({ message: "Vendor product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
