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
import addressRoutes from "./routes/address.route.js";
import { uploadImage } from "./utils/uploadFile.js";
import blogRoutes from "./routes/blog.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import subscribeRoutes from "./routes/subscribe.route.js";
import bannerRoutes from "./routes/banner.route.js";
import settingsRoutes from "./routes/settings.route.js";
dotenv.config();

const app = express();
let count = 0;
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json({ limit: "50mb", extended: true }));
app.use(fileUpload({ limits: { fileSize: 3 * 1024 * 1024 } }));
app.use("/", (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} ${new Date().toLocaleString()} ${count++}`);
  next();
});

app.use("/api/settings", settingsRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api", subscribeRoutes);
app.use("/api", addressRoutes);
app.use("/api", couponRoutes);
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
    if (req.files) {
      if (typeof req.files["images[]"] === "object") {
        const url = await uploadImage(req.files["images[]"].data, "nuturemite/products/uploads");
        const newUrl = "nuturemite/products/uploads/" + url.split("/").pop();
        console.log(newUrl);
        images.push(newUrl);
      } else if (req.files["images[]"]) {
        const uploadPromises = req.files["images[]"].map(async image => {
          console.log("images - image.data", image.data);
          const url = await uploadImage(image.data, "nuturemite/products/uploads");
          const newUrl = "nuturemite/products/uploads/" + url.split("/").pop();
          return newUrl;
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
