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
    address: [
      {
        fname: String,
        lname: String,
        email: String,
        phone: String,
        address: String,
        street: String,
        country: String,
        city: String,
        state: String,
        zipcode: String,
      },
    ],
  },
  { timestamps: true }
);
