import { Vendor } from "../models/model.js";

export const updateVendorDetails = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    const response = await Vendor.findByIdAndUpdate(id, req.body);
    if (!response) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json({ message: "Vendor details updated", data: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json({ data: vendors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVendorDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findById(id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ data: vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyVendorDetails = async (req, res) => {
  try {
    const vendorId = req.user.vendorId;
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor with the given ID not found" });
    }
    res.status(200).json({ data: vendor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateMyVendorDetails = async (req, res) => {
  try {
    const vendorId = req.user.vendorId;
    const vendor = await Vendor.findByIdAndUpdate(vendorId, req.body);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor with the given ID not found" });
    }
    res.status(200).json({ data: vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
