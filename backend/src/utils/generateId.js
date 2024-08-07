
export const generateModelId = async (Model) => {
  const count = await Model.countDocuments();
  return (count + 1).toString().padStart(6, "0");
};



