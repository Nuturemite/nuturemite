import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import brandRoutes from "./routes/brand.route.js";
import categoryRoutes from "./routes/category.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import wishlistRoutes from "./routes/wishlist.route.js";
import paymentRoutes from "./routes/payment.route.js";
import reviewRoutes from "./routes/review.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js";
import vendorRoutes from "./routes/vendor.route.js";
import shippingRoutes from "./routes/shipping.route.js";
import refundRoutes from "./routes/refund.route.js";
import couponRoutes from "./routes/coupon.route.js";
import { stripePaymentListener } from "./controllers/payment.controller.js";
import { uploadImage } from "./utils/uploadFile.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), stripePaymentListener);

app.use(express.json({ limit: "50mb", extended: true }));
app.use(fileUpload({ limits: { fileSize: 3 * 1024 * 1024 } }));

app.use('/api', couponRoutes);
app.use("/api", refundRoutes);
app.use("/api", shippingRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoute);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);

app.use("/api/upload/images", async (req, res) => {
  try {
    let images = [];
    console.log(req.files);
    if (req.files) {
      if (typeof req.files["images[]"] === "object") {
        const url = await uploadImage(req.files["images[]"].data, "nuturemite/product/uploads");
        images.push(url);
      } else if (req.files["images[]"]) {
        const uploadPromises = req.files["images[]"].map(async image => {
          const url = await uploadImage(image.data, "nuturemite/product/uploads");
          return url;
        });
        images = await Promise.all(uploadPromises);
      }
    }
    res.json({ data: images });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

const port = process.env.PORT || 5000;
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch(() => {
    console.log("MongoDb connection failed");
  });
