import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, Vendor } from "../models/model.js";

const createActivationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );

  return { token, activationCode };
};

// Register a new user
export const register = async (req, res) => {
  try {
    const { username, password, name, role } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const userData = {
      username,
      password,
      name,
      username,
      role,
    };

    const activationToken = createActivationToken(userData);

    const activationCode = activationToken.activationCode;

    const data = { user: { name: userData.name }, activationCode };

    // Create the email template
    const html = await ejs.renderFile(
      path.join(__dirname, "../emails/activation-email.ejs"),
      data
    );

    await sendEmail({
      email: userData.username,
      subject: "Activate Your Acount",
      html,
    });

    res.setHeader("Authorization", `Bearer ${token}`);
    res.set("Access-Control-Expose-Headers", "Authorization");
    res.status(201).json({
      success: true,
      message: "Please check your email to activate your account",
      token: activationToken.token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyAuthCode = async (req, res) => {
  try {
    const { activationToken, activationCode } = req.body;

    // Verify the activation token
    const decodeData = jwt.verify(
      activationToken,
      process.env.ACTIVATION_SECRET
    );

    if (activationCode !== decodeData.activationCode) {
      return res.status(400).json({ message: "Invalid Activation code" });
    }

    const { name, username, password, role } = decodeData.user;

    const isEmailExists = await User.findOne({ username });

    if (isEmailExists) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      name,
      email: username,
      role,
    });

    await user.save();
    const token = signToken({
      id: user._id,
      username: user.username,
      name: user.name,
      role: user.role,
    });

    res.setHeader("Authorization", `Bearer ${token}`);
    res.set("Access-Control-Expose-Headers", "Authorization");
    res.status(201).json({
      success: true,
      message: "User Signed Up successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user.active)
      return res.status(409).json({
        message: "Your account has been deactivated. Please contact support.",
      });
    if (user.blocked)
      return res.status(409).json({
        message: "Your account has been blocked. Please contact support.",
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    let vendor;
    if (user.role == "vendor")
      vendor = await Vendor.findOne({ user: user._id });
    console.log(vendor);

    if (vendor && vendor.apvStatus === "pending")
      return res
        .status(401)
        .json({ message: "Please wait for admin approval" });

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
    const { email, password, name } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      name,
      username: email,
      role: "vendor",
    });

    await user.save();
    req.body.user = user._id;

    const vendor = await Vendor.create(req.body);
    res
      .status(201)
      .json({ message: "Vendor created successfully", data: vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "10d" });
  return token;
};
