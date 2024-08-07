import mongoose from "mongoose";
const Schema = mongoose.Schema;


export const InvoiceSchema = new Schema(
  {
    order: [{ type: Schema.Types.ObjectId, ref: "SubOrder" }],
    invoiceNumber: { type: String, required: true, unique: true },
    shippingAddress: { type: Schema.Types.ObjectId, ref: "Address", required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    issuedAt: { type: Date, required: true },
    paidAt: Date,
  },
  { timestamps: true }
);


const generateInvoiceNumber = async () => {
  const count = await mongoose.models.Invoice.countDocuments();
  const sequence = (count + 1).toString().padStart(6, '0'); // e.g., 000001
  return `INV-${sequence}`;
};

InvoiceSchema.pre('save', async function(next) {
  if (this.isNew) {
    this.invoiceNumber = await generateInvoiceNumber();
  }
  next();
});

export const Invoice = mongoose.model("Invoice", InvoiceSchema);
