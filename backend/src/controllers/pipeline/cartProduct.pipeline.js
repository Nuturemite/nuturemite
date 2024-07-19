export const cartPipeline = [
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
      discountPercentage: { $multiply: [100, { $divide: ["$discount", "$product.basePrice"] }] },
    },
  },
  {
    $project: {
      _id: 1,
      price: 1,
      inventory: 1,
      status: 1,
      productId: "$product._id",
      name: "$product.name",
      basePrice: "$product.basePrice",
      images: "$product.images",
      isSale: "$product.isSale",
      discount:1,
      discountPercentage:1
    },
  },
];
