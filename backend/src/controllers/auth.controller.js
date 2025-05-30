import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, Vendor } from "../models/model.js";
import ejs from "ejs";
import path from "path";
import { sendEmail } from "../emails/sendMail.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import crypto from "crypto";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createActivationToken = (user) => {
  const token = jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: process.env.ACTIVATION_EXPIRE,
  });
  return token;
};

const sendVerficationEmail = async (user) => {
  const activationToken = createActivationToken(user);
  const activationUrl = `${process.env.SERVER_URL}/api/auth/verify-email?token=${activationToken}`;
  const data = { user: { name: user.name }, activationUrl };
  const html = await ejs.renderFile(
    path.join(__dirname, "../emails/activation-email.ejs"),
    data
  );
  await sendEmail({
    to: user.username,
    subject: "Activate Your Acount",
    html,
  });
};

export const register = async (req, res) => {
  try {
    req.body.email = req.body.username;
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    await sendVerficationEmail(req.body);

    res.status(201).json({
      success: true,
      message: "Please check your email to activate your account",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const decodeData = jwt.verify(token, process.env.ACTIVATION_SECRET);
    console.log(decodeData);
    const hashedPassword = await bcrypt.hash(decodeData.password, 10);
    decodeData.password = hashedPassword;
    await User.create(decodeData);

    res.redirect(`${process.env.CLIENT_URL}/auth/login`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    if (!user.active)
      return res.status(409).json({
        message: "Your account has been deactivated. Please contact support.",
      });
    if (user.blocked)
      return res.status(409).json({
        message: "Your account has been blocked. Please contact support.",
      });

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

export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Passowrd forgot------------------------>

// Send reset password email
export const sendResetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not registered" });

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  const resetUrl = `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`;
  const html = await ejs.renderFile(
    path.join(__dirname, "../emails/resetPassword.ejs"),
    { name: user.name, resetUrl }
  );

  await sendEmail({ to: user.email, subject: "Password Reset", html });
  await user.save();

  res.status(200).json({ message: "Please check your mail" });
};

// Reset password using token
export const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  const { newPassword: password, confirmNewPassword: confirmPassword } =
    req.body;
  if (!password || !confirmPassword || password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Passwords do not match or are missing" });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  const html = await ejs.renderFile(
    path.join(__dirname, "../emails/passwordSuccessfull.ejs"),
    { user }
  );
  await sendEmail({ to: user.email, subject: "Password Reset Success", html });

  await user.save();

  res.status(200).json({ message: "Password has been updated successfully" });
};
