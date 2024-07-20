export const productPipeline = [
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
        $multiply: [
          { $divide: [{ $subtract: ["$product.basePrice", "$price"] }, "$product.basePrice"] },
          100,
        ],
      },
    },
  },
  {
    $project: {
      _id: 1,
      vendor: {
        details: {
          displayName: "$vendor.details.displayName",
          name: "$vendor.details.name",
          phone: "$vendor.details.phone",
          email: "$vendor.details.email",
          description: "$vendor.details.description",
          logo: "$vendor.details.logo",
          vendorUrl: "$vendor.details.vendorUrl",
          address: "$vendor.details.address",
        },
        _id: "$vendor._id",
        userId: "$vendor.userId",
        domain: "$vendor.domain",
        status: "$vendor.status",
        active: "$vendor.active",
      },
      price: 1,
      inventory: 1,
      status: 1,
      productId: "$product._id",
      name: "$product.name",
      basePrice: "$product.basePrice",
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
];
