import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/model.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const { username, password, name } = req.body;
    console.log(req.body);

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, name, email: username });

    await user.save();

    const token = signToken({
      id: user._id,
      username: user.username,
      name: user.name,
      role: user.role,
    });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.set("Access-Control-Expose-Headers", "Authorization");
    res.status(201).json({ message: "User registered successfully!", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken({
      id: user._id,
      username: user.username,
      name: user.name,
      role: user.role,
    });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.set("Access-Control-Expose-Headers", "Authorization");
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signToken = data => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "10d" });
  return token;
};
