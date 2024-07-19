export const location_pipeline = [
  {
    $lookup: {
      from: "states",
      localField: "state_id",
      foreignField: "id",
      as: "state",
    },
  },
  {
    $lookup: {
      from: "districts",
      localField: "dist_id",
      foreignField: "id",
      as: "district",
    },
  },
  {
    $lookup: {
      from: "blocks",
      localField: "block_id",
      foreignField: "id",
      as: "block",
    },
  },
  {
    $lookup: {
      from: "grampanchayats",
      localField: "gp_id",
      foreignField: "id",
      as: "gp",
    },
  },
  { $unwind: "$state" },
  { $unwind: "$district" },
  { $unwind: "$block" },
  { $unwind: "$gp" },
  {
    $addFields: {
      state_name: "$state.name",
      district_name: "$district.name",
      block_name: "$block.name",
      gp_name: "$gp.name",
    },
  },
];
