import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "vendor"], default: "user" },
    dateOfBirth: Date,
    mobile: String,
    gender: { type: String, enum: ["male", "female", "others"] },
    active: { type: Boolean, default: true },
    blocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);
