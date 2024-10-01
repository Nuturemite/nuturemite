import mongoose from "mongoose";

export const SettingsSchema = new mongoose.Schema({
  shippingCharges: {
    type: Number,
  },
  freeShippingThreshold: {
    type: Number,
  },
  commissionRate: {
    type: Number,
  },
  xpressEmail: {
    type: String,
  },
  xpressPassword: {
    type: String,
  },
});


