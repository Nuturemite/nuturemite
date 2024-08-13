import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, Vendor } from "../models/model.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const { username, password, name, role } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, name, email: username, role });

    await user.save();

    const token = signToken({
      id: user._id,
      username: user.username,
      name: user.name,
      role: user.role,
    });

    res.setHeader("Authorization", `Bearer ${token}`);
    res.set("Access-Control-Expose-Headers", "Authorization");
    res.status(201).json({ message: "User registered successfully!", token, user });
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

    let vendor;
    if (user.role == "vendor") vendor = await Vendor.findOne({ user: user._id });
    console.log(vendor);

    if (vendor && vendor.apvStatus === "pending")
      return res.status(401).json({ message: "Please wait for admin approval" });

    const token =
      user.role == "user" || user.role == "admin"
        ? signToken({
            id: user._id,
            username: user.username,
            name: user.name,
            role: user.role,
          })
        : signToken({
            id: user._id,
            username: user.username,
            name: user.name,
            role: user.role,
            vendorId: vendor?._id,
          });

    res.setHeader("Authorization", `Bearer ${token}`);
    res.set("Access-Control-Expose-Headers", "Authorization");
    res.json({ token, vendor: vendor || null, user });
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

export const registerVendor = async (req, res) => {
  try {
    const { email, password, name} = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name, username: email, role: "vendor" });

    await user.save();
    req.body.user = user._id;

    const vendor = await Vendor.create(req.body);
    res.status(201).json({ message: "Vendor created successfully", data: vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signToken = data => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "10d" });
  return token;
};
