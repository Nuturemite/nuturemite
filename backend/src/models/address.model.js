import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const AddressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
