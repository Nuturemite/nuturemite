import { User } from "../models/model.js";

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated successfully!", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.user.id;

    const user = await User.findById(id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile fetched successfully!", data: user.profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const users = await User.find(role ? { role } : {})
      .select("-password")
      .limit(1000);

    res.json({ message: "Users fetched successfully!", data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id , req.body);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully!", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
