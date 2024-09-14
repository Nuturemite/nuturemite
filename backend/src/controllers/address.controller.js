import { Address } from "../models/model.js";

export const createAddress = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const newAddress = new Address(req.body);
    const savedAddress = await newAddress.save();
    res.status(201).json({ message: "Address created successfully", data: savedAddress });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

export const getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id });
    res.json({ data: addresses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAddressById = async (req, res) => {
  try {
    console.log(req.params.id);
    const { id } = req.params;
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json({ data: address });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAddress = await Address.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json({ message: "Address updated successfully", data: updatedAddress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAddress = await Address.findByIdAndDelete(id);
    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
